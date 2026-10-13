import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";
import { extractStyles, mergeSamples, settle, type StyleSample } from "../extract.ts";
import { pipelineDir, rel } from "../paths.ts";
import { fail, info, ok, readJson, writeJson } from "../util.ts";
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
  { kind: "tab", selector: "[role=tab], [role=tablist]" },
  { kind: "table", selector: "table" },
  { kind: "badge", selector: "[class*=badge i], [class*=tag i], [class*=chip i], [class*=pill i]" },
  { kind: "footer", selector: "footer" },
];

async function open(browser: Browser, url: string, viewport: keyof typeof VIEWPORTS, scheme: "light" | "dark") {
  const v = VIEWPORTS[viewport];
  const context = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    isMobile: v.isMobile,
    deviceScaleFactor: viewport === "mobile" ? 2 : 1,
    colorScheme: scheme,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
  } catch {
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  }
  await settle(page);
  return { context, page };
}

async function cropComponents(page: Page, outDir: string, prefix: string): Promise<string[]> {
  const files: string[] = [];
  for (const probe of COMPONENT_PROBES) {
    const handles = await page.$$(probe.selector);
    let kept = 0;
    for (const handle of handles) {
      if (kept >= 3) break;
      const box = await handle.boundingBox();
      if (!box || box.width < 16 || box.height < 12 || box.width > 1600 || box.height > 900) continue;
      const file = join(outDir, `${prefix}-${probe.kind}-${kept + 1}.png`);
      try {
        await handle.screenshot({ path: file });
        files.push(file);
        kept++;
      } catch {
        // detached or covered — skip
      }
    }
  }
  // Interaction states for the first visible button: hover and keyboard focus.
  const button = (await page.$$("button, a[role=button]"))[0];
  if (button && (await button.boundingBox())) {
    try {
      await button.hover();
      await page.waitForTimeout(250);
      await button.screenshot({ path: join(outDir, `${prefix}-button-hover.png`) });
      await page.mouse.move(0, 0);
      await button.focus();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await page.waitForTimeout(150);
      await button.screenshot({ path: join(outDir, `${prefix}-button-focus.png`) });
      files.push(join(outDir, `${prefix}-button-hover.png`), join(outDir, `${prefix}-button-focus.png`));
    } catch {
      // not interactive enough — fine
    }
  }
  return files;
}

export async function capture(slug: string, options: { headed?: boolean }): Promise<void> {
  const dir = pipelineDir(slug);
  let record: Intake;
  try {
    record = readJson<Intake>(join(dir, "intake.json"));
  } catch {
    fail(`no intake for "${slug}". Run: pnpm harness intake ${slug} <url...>`);
  }
  const outDir = join(dir, "reference");
  const shotsDir = join(outDir, "screenshots");
  const cropsDir = join(outDir, "components");
  const browser = await chromium.launch({ headless: !options.headed });
  const samples: StyleSample[] = [];
  const pages: Array<{ url: string; shots: string[]; darkDiffers: boolean }> = [];

  try {
    for (const [index, url] of record.urls.entries()) {
      const pageKey = `p${index + 1}`;
      info(`capturing ${url}`);
      const shots: string[] = [];
      let lightBg = "";
      let darkDiffers = false;
      for (const scheme of ["light", "dark"] as const) {
        for (const viewport of ["desktop", "mobile"] as const) {
          const { context, page } = await open(browser, url, viewport, scheme);
          const sample = await extractStyles(page, scheme);
          if (scheme === "light" && viewport === "desktop") lightBg = sample.bodyBackground;
          if (scheme === "dark" && viewport === "desktop") darkDiffers = sample.bodyBackground !== lightBg;
          // Dark captures only count when the site actually reacts to prefers-color-scheme.
          if (scheme === "light" || darkDiffers) {
            samples.push(sample);
            const file = join(shotsDir, `${pageKey}-${viewport}-${scheme}.png`);
            await page.screenshot({ path: file, fullPage: true });
            shots.push(rel(file));
            if (viewport === "desktop") await cropComponents(page, cropsDir, `${pageKey}-${scheme}`);
          }
          await context.close();
        }
      }
      pages.push({ url, shots, darkDiffers });
    }
  } finally {
    await browser.close();
  }

  writeJson(join(outDir, "samples.json"), samples);
  writeJson(join(outDir, "styles.json"), {
    capturedAt: new Date().toISOString(),
    pages,
    supportsDark: pages.some((p) => p.darkDiffers),
    ...mergeSamples(samples),
  });
  record.status = "captured";
  writeJson(join(dir, "intake.json"), record);
  ok(`captured ${pages.length} page(s) → ${rel(outDir)}`);
  console.log("  next: ask the reference-analyst agent to analyze it (or run the template-intake skill)");
}
