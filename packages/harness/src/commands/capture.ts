import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { cleanUrl } from "../discover.ts";
import { extractStyles, mergeSamples, settle, type StyleSample } from "../extract.ts";
import { pipelineDir, paths, rel } from "../paths.ts";
import { deepCapture, watchLottie, type DeepCapture, type LottieSummary } from "../probe.ts";
import { CONTENT_HEAVY_SHARE, layoutTemplate, selectDeep, surveySite, type Survey } from "../survey.ts";
import { fail, info, ok, readJson, writeJson, writeText } from "../util.ts";
import type { Intake } from "./intake.ts";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, isMobile: false },
  mobile: { width: 390, height: 844, isMobile: true },
} as const;

/** Elements worth cropping for the analyst. The first few visible matches of each kind are kept. */
const COMPONENT_PROBES: Array<{ kind: string; selector: string }> = [
  { kind: "button", selector: "button, a[role=button], [class*=btn i], [class*=button i]" },
  { kind: "input", selector: "input[type=text], input[type=email], input[type=search], input:not([type]), textarea, select" },
  { kind: "nav", selector: "nav, header" },
  { kind: "card", selector: "[class*=card i], article" },
  { kind: "disclosure", selector: "details, [aria-expanded]" },
  { kind: "tab", selector: "[role=tab], [role=tablist]" },
  { kind: "table", selector: "table" },
  { kind: "badge", selector: "[class*=badge i], [class*=tag i], [class*=chip i], [class*=pill i]" },
  { kind: "quote", selector: "blockquote, figure:has(blockquote)" },
  { kind: "code", selector: "pre" },
  { kind: "footer", selector: "footer" },
];

async function open(browser: Browser, url: string, viewport: keyof typeof VIEWPORTS, scheme: "light" | "dark", motion: boolean, before?: (page: Page) => void) {
  const v = VIEWPORTS[viewport];
  const context = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    isMobile: v.isMobile,
    deviceScaleFactor: viewport === "mobile" ? 2 : 1,
    colorScheme: scheme,
    reducedMotion: motion ? "no-preference" : "reduce",
  });
  const page = await context.newPage();
  before?.(page);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
  } catch {
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  }
  return { context, page };
}

async function cropComponents(page: Page, outDir: string, prefix: string): Promise<void> {
  for (const probe of COMPONENT_PROBES) {
    const handles = await page.$$(probe.selector).catch(() => []);
    let kept = 0;
    for (const handle of handles) {
      if (kept >= 3) break;
      const box = await handle.boundingBox();
      if (!box || box.width < 16 || box.height < 12 || box.width > 1600 || box.height > 900) continue;
      try {
        await handle.screenshot({ path: join(outDir, `${prefix}-${probe.kind}-${kept + 1}.png`) });
        kept++;
      } catch {
        // detached or covered — skip
      }
    }
  }
}

/** Replaces absolute paths under the repo with repo-relative ones, so the JSON reads the same anywhere. */
function relative<T>(value: T): T {
  return JSON.parse(JSON.stringify(value, (_k, v) => (typeof v === "string" && v.startsWith(paths.root) ? rel(v) : v)));
}

export async function capture(slug: string, options: { headed?: boolean; maxPages?: number; patience?: number; deep?: number; survey?: boolean }): Promise<void> {
  const dir = pipelineDir(slug);
  let record: Intake;
  try {
    record = readJson<Intake>(join(dir, "intake.json"));
  } catch {
    fail(`no intake for "${slug}". Run: pnpm harness intake ${slug} <url...>`);
  }
  const seeds = record.urls.map(cleanUrl);
  const outDir = join(dir, "reference");
  const browser = await chromium.launch({ headless: !options.headed });
  const samples: StyleSample[] = [];
  const pages: Array<{ key: string; url: string; reason: string; shots: string[]; darkDiffers: boolean }> = [];
  const deep: Array<{ key: string } & DeepCapture> = [];
  let survey: Survey | null = null;

  try {
    // 1. Survey: as many of the site's pages as the budget allows, and what each one uses.
    let selected: Array<{ url: string; reason: string }> = seeds.map((url) => ({ url, reason: "given" }));
    if (options.survey !== false) {
      info(`surveying ${new URL(seeds[0]!).origin} (up to ${options.maxPages ?? 150} pages)`);
      survey = await surveySite(browser, seeds, { maxPages: options.maxPages ?? 150, patience: options.patience ?? 20, log: (m) => info(m) });
      writeJson(join(outDir, "survey.json"), survey);
      selected = selectDeep(survey, seeds, options.deep ?? 16);
      record.discovered = selected.map((s) => s.url).filter((u) => !seeds.some((s) => cleanUrl(s).replace(/\/+$/, "") === u));
      ok(`surveyed ${survey.pages.length} of ${survey.known} known page(s); ${selected.length} selected for the deep capture`);
    }

    // 2. Per selected page: static screenshots (reduced motion) and the deep capture (motion allowed).
    for (const [index, { url, reason }] of selected.entries()) {
      const key = `p${index + 1}`;
      info(`capturing ${key} ${url} (${reason})`);
      const shots: string[] = [];
      let lightBg = "";
      let darkDiffers = false;
      for (const scheme of ["light", "dark"] as const) {
        for (const viewport of ["desktop", "mobile"] as const) {
          try {
            const { context, page } = await open(browser, url, viewport, scheme, false);
            await settle(page);
            const sample = await extractStyles(page, scheme);
            if (scheme === "light" && viewport === "desktop") lightBg = sample.bodyBackground;
            if (scheme === "dark" && viewport === "desktop") darkDiffers = sample.bodyBackground !== lightBg;
            // Dark captures only count when the site actually reacts to prefers-color-scheme.
            if (scheme === "light" || darkDiffers) {
              samples.push(sample);
              const file = join(outDir, "screenshots", `${key}-${viewport}-${scheme}.png`);
              await page.screenshot({ path: file, fullPage: true });
              shots.push(rel(file));
              if (viewport === "desktop") await cropComponents(page, join(outDir, "components"), `${key}-${scheme}`);
            }
            await context.close();
          } catch (e) {
            info(`  ${viewport} ${scheme} failed: ${(e as Error).message.split("\n")[0]}`);
          }
        }
      }
      pages.push({ key, url, reason, shots, darkDiffers });
      try {
        let lottie: (() => Promise<LottieSummary[]>) | undefined;
        const { context, page } = await open(browser, url, "desktop", "light", true, (p) => (lottie = watchLottie(p, join(outDir, "raw"), key)));
        await page.waitForTimeout(1500);
        const result = await deepCapture(page, outDir, key, { darkDiffers, lottie });
        if (result.theme.toggled?.changed) samples.push(await extractStyles(page, "dark"));
        deep.push({ key, ...result });
        info(
          `  ${result.motion.animations.length} animation(s), ${result.motion.frames.length + result.motion.visual.length} frame sequence(s), ${result.motion.lottieFiles.length} Lottie file(s), ${result.interactions.length} interaction(s), ${result.inventory.svgs.filter((s) => s.role === "illustration").length} illustration(s)`,
        );
        await context.close();
      } catch (e) {
        info(`  deep capture failed: ${(e as Error).message.split("\n")[0]}`);
      }
    }
  } finally {
    await browser.close();
  }

  const supportsDark = pages.some((p) => p.darkDiffers) || deep.some((d) => d.theme.toggled?.changed);
  writeJson(join(outDir, "samples.json"), samples);
  writeJson(join(outDir, "styles.json"), { capturedAt: new Date().toISOString(), pages, supportsDark, ...mergeSamples(samples) });
  writeJson(join(outDir, "pages.json"), pages);
  writeJson(join(outDir, "motion.json"), relative(deep.map((d) => ({ key: d.key, url: d.url, ...d.motion }))));
  writeJson(join(outDir, "interactions.json"), relative(deep.map((d) => ({ key: d.key, url: d.url, interactions: d.interactions }))));
  writeJson(join(outDir, "inventory.json"), relative(deep.map((d) => ({ key: d.key, url: d.url, ...d.inventory }))));
  writeJson(join(outDir, "structure.json"), relative(deep.map((d) => ({ key: d.key, url: d.url, ...d.structure }))));
  writeJson(join(outDir, "theme.json"), relative({ supportsDark, pages: deep.map((d) => ({ key: d.key, url: d.url, ...d.theme })) }));
  writeText(join(outDir, "capture-report.md"), report(slug, survey, pages, deep, supportsDark));

  record.status = "captured";
  writeJson(join(dir, "intake.json"), record);
  ok(`captured ${pages.length} page(s) → ${rel(outDir)} (start with capture-report.md)`);
  console.log("  next: ask the reference-analyst agent to analyze it (or run the template-intake skill)");
}

/** The analyst's map of the evidence: what the site does how often, and where each piece of evidence is. */
function report(slug: string, survey: Survey | null, pages: Array<{ key: string; url: string; reason: string; shots: string[] }>, deep: Array<{ key: string } & DeepCapture>, supportsDark: boolean): string {
  const lines = [`# ${slug} — capture report`, ""];
  if (survey) {
    lines.push(
      "## Site survey",
      "",
      `${survey.pages.filter((p) => !p.error).length} pages surveyed of ${survey.known} known in ${survey.origin}${survey.locale ? `/${survey.locale}` : ""} (robots.txt ${survey.robots.found ? "respected" : "absent"}, ${survey.sitemapUrls} sitemap URLs). Collections were sampled, not exhausted.`,
      "",
      survey.stoppedBy === "saturated"
        ? `Stopped at saturation: the last new feature turned up on page ${survey.lastNewAt}; the pages after it added nothing, and every page type found was opened at least once.`
        : survey.stoppedBy === "exhausted"
          ? "Stopped when no in-scope page was left to open."
          : `Stopped at the page budget; the last new feature turned up on page ${survey.lastNewAt} — raise --max-pages if that is close to the end.`,
      "",
      "| Feature | Pages | Share |",
      "| --- | --- | --- |",
      ...survey.frequency.map((f) => `| ${f.feature} | ${f.pages} | ${Math.round(f.share * 100)}% |`),
      "",
      "Page types (path groups):",
      "",
      ...survey.groups.slice(0, 40).map((g) => `- \`${g.key}\` — ${g.known} known, ${g.surveyed} surveyed${g.collection ? " (collection)" : ""}`),
      "",
      "Layouts (pages that share a structure, whatever their path; one capture per layout is enough):",
      "",
      ...layoutGroups(survey).map((g) => `- ${g.pages} page(s)${g.contentHeavy ? ", mostly other people's images" : ""}: ${g.examples.map((u) => `\`${new URL(u).pathname}\``).join(", ")}`),
      "",
      "Most used button styles (background / color / border / radius / padding / size / weight):",
      "",
      ...survey.buttonStyles.slice(0, 10).map((b) => `- ${b.pages} page(s): \`${b.style}\``),
      "",
    );
  }
  lines.push("## Captured pages", "", `Dark appearance: ${supportsDark ? "yes" : "no"} (prefers-color-scheme or a toggle).`, "");
  for (const p of pages) {
    const d = deep.find((x) => x.key === p.key);
    lines.push(`### ${p.key} — ${p.url}`, "", `Why: ${p.reason}.`, "", `- Screenshots: ${p.shots.map((s) => `\`${s}\``).join(", ") || "none"}`);
    if (d) {
      const illus = d.inventory.svgs.filter((s) => s.role === "illustration");
      const graphics = d.inventory.svgs.filter((s) => s.role === "graphic");
      const loops = d.motion.animations.filter((a) => a.iterations === "infinite").length;
      lines.push(
        `- Motion: ${d.motion.animations.length} animations (${loops} looping, ${d.motion.animations.filter((a) => a.inSvg).length} in SVG), ${d.motion.keyframeRules.filter((k) => k.used).length} keyframe rules in use, ${d.motion.smil.length} SMIL, ${d.motion.reveals.length} scroll reveals, ${d.motion.lottie.length} Lottie, ${d.motion.videos.length} videos`,
        ...d.motion.frames.map((f) => `  - frames \`${rel(f.file)}\` — ${f.name || "animation"} ${f.durationMs}ms × ${f.iterations}`),
        ...d.motion.visual.map((v) => `  - frames \`${rel(v.file)}\` — ${v.kind}, pixels change (script- or canvas-driven), ${v.box.w}×${v.box.h}`),
        ...d.motion.lottieFiles.map(
          (l) =>
            `  - Lottie ${l.size}, ${l.durationMs}ms at ${l.fps}fps, ${l.shapeLayers} shape layers (${Math.round(l.frameByFrame * 100)}% shown ≤ 2 frames: ${l.frameByFrame >= 0.5 ? "frame-by-frame, cel-style" : "tweened"}), lines drawn as ${l.drawing}, trim paths: ${l.trimPaths ? "yes (draws itself)" : "no"}, stroke widths ${JSON.stringify(l.strokeWidths)}, stroke colors ${JSON.stringify(l.strokeColors)}, fill colors ${JSON.stringify(l.fillColors)}, caps ${JSON.stringify(l.lineCaps)}${l.raw ? ` — \`${rel(l.raw)}\`` : ""}`,
        ),
        `- Interactions: ${d.interactions.length}`,
        ...d.interactions.filter((i) => i.file).map((i) => `  - ${i.kind}: \`${rel(i.file!)}\` (hover changes: ${Object.keys(i.hover ?? {}).join(", ") || "none"})`),
        `- Illustrations: ${illus.length}${illus.length ? ` — ${illus.filter((s) => s.file).map((s) => `\`${rel(s.file!)}\``).join(", ")}` : ""}`,
        `- Small drawings (33–95px): ${graphics.length}${graphics.some((s) => s.file) ? ` — ${graphics.filter((s) => s.file).map((s) => `\`${rel(s.file!)}\``).join(", ")}` : ""}`,
        `- Icons: ${d.inventory.svgs.filter((s) => s.role === "icon").length}${d.inventory.files.icons ? ` — \`${rel(d.inventory.files.icons)}\`` : ""}`,
        `- Button variants: ${d.inventory.buttons.length}${d.inventory.files.buttons ? ` — \`${rel(d.inventory.files.buttons)}\`` : ""}`,
        `- Sections: ${d.structure.sections.length}; header ${d.structure.header?.position ?? "none"}; content width ${d.structure.maxContentWidth}px`,
        `- Theme: ${d.theme.toggles.length ? `toggle "${d.theme.toggles[0]!.label}"${d.theme.toggled ? ` (changed: ${d.theme.toggled.changed})` : ""}` : "no toggle"}, ${d.theme.prefersDarkRules} prefers-color-scheme rules, ${d.theme.themeSelectors.length} theme selectors`,
      );
    }
    lines.push("");
  }
  lines.push(
    "## Files",
    "",
    "`survey.json` (every surveyed page and its features) · `styles.json` (measured histograms) · `motion.json` (animations, keyframes, reveals, frame sequences) · `interactions.json` (hover/focus/press/open diffs) · `inventory.json` (illustrations, icons, images, type by role, button variants) · `structure.json` (sections, header, footer) · `theme.json` · `screenshots/` · `components/` · `motion/` · `interactions/` · `illustrations/` (`-i` large, `-g` small drawings) · `icons/` · `raw/svg/` (illustration markup, evidence only — never copied).",
    "",
  );
  return lines.join("\n");
}

/** Surveyed pages grouped by layout, largest first, with a few example paths. */
function layoutGroups(survey: Survey): Array<{ pages: number; examples: string[]; contentHeavy: boolean }> {
  const groups = new Map<string, string[]>();
  const heavy = new Map<string, number>();
  for (const p of survey.pages.filter((x) => !x.error)) {
    const key = p.template ?? layoutTemplate(p.sections, p.features);
    groups.set(key, [...(groups.get(key) ?? []), p.url]);
    if ((p.imageShare ?? 0) > CONTENT_HEAVY_SHARE) heavy.set(key, (heavy.get(key) ?? 0) + 1);
  }
  return [...groups.entries()]
    .map(([key, urls]) => ({ pages: urls.length, examples: urls.slice(0, 4), contentHeavy: (heavy.get(key) ?? 0) * 2 > urls.length }))
    .sort((a, b) => b.pages - a.pages)
    .slice(0, 30);
}
