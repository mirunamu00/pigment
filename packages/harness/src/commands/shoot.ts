import { join, relative } from "node:path";
import { AxeBuilder } from "@axe-core/playwright";
import { chromium, type Page } from "playwright";
import { appMeta, preview } from "../appdir.ts";
import { extractStyles, mergeSamples, settle, type StyleSample } from "../extract.ts";
import { layoutChecks, type LayoutReport } from "../layout.ts";
import { drawingCrops, motionEvidence } from "../probe.ts";
import { writeJson } from "../util.ts";

export interface ShotResult {
  screenshots: Array<{ route: string; viewport: "desktop" | "mobile"; scheme: "light" | "dark"; file: string }>;
  consoleErrors: Array<{ route: string; message: string }>;
  /** Pages wider than the viewport: content the user has to scroll sideways to reach. */
  overflow: Array<{ route: string; viewport: "desktop" | "mobile"; scheme: "light" | "dark"; px: number }>;
  stateFailures: Array<{ state: string; viewport: string; scheme: string; message: string }>;
  axe: Array<{ route: string; id: string; impact: string | null; nodes: number }>;
  /** Looping animations still running with prefers-reduced-motion: reduce (should be none). */
  reducedMotionLoops?: Array<{ route: string; count: number }>;
  /** What moves on the app's first route with motion allowed, and frame sequences of it. */
  motion?: Awaited<ReturnType<typeof motionEvidence>>;
  /** Native-resolution crops of every drawing per route (desktop, light, final frames). */
  drawings?: Array<{ route: string; file: string; w: number; h: number }>;
  /** Measured layout defects per route, desktop and mobile, light (see layout.ts). */
  layout?: LayoutReport[];
  /** Motion on every other capture route (the first is `motion`). */
  motionRoutes?: Array<{ route: string } & Awaited<ReturnType<typeof motionEvidence>>>;
}

/**
 * A full-page capture keeps fixed elements where they sit in the first viewport, so a bar pinned to the bottom
 * of the screen lands in the middle of a long page. Moves bottom-pinned elements to the end of the page for the
 * capture (the page itself is unchanged for every measurement before it).
 */
async function pinFixedToPageEnd(page: Page): Promise<void> {
  await page.evaluate(() => {
    const docH = document.documentElement.scrollHeight;
    if (docH <= innerHeight + 1) return;
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      if (getComputedStyle(el).position !== "fixed") continue;
      const r = el.getBoundingClientRect();
      if (r.height === 0 || r.top < innerHeight / 2) continue;
      el.style.setProperty("position", "absolute", "important");
      el.style.setProperty("top", `${docH - (innerHeight - r.top)}px`, "important");
      el.style.setProperty("bottom", "auto", "important");
    }
  });
}

/**
 * Opens a page and waits for the network to go quiet. A slow third-party request (a font CDN) can keep it
 * from ever going quiet; then the page is taken as loaded once its load event fires, plus a moment for fonts.
 */
async function open(page: Page, url: string): Promise<void> {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 20_000 });
  } catch {
    await page.goto(url, { waitUntil: "load", timeout: 30_000 });
    await page.waitForTimeout(1500);
  }
}

/**
 * Serves a built app and records what it looks like: screenshots of every capture route at
 * desktop/mobile × light/dark, measured styles, console errors and axe violations.
 */
export async function shootApp(appDir: string, outDir: string): Promise<ShotResult> {
  const meta = appMeta(appDir);
  const server = await preview(appDir, meta.port);
  const browser = await chromium.launch();
  const result: ShotResult = { screenshots: [], consoleErrors: [], overflow: [], stateFailures: [], axe: [] };
  const samples: StyleSample[] = [];
  try {
    for (const route of meta.routes.filter((r) => r.capture)) {
      const slug = route.path === "/" ? "home" : route.path.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-");
      for (const scheme of ["light", "dark"] as const) {
        for (const viewport of ["desktop", "mobile"] as const) {
          const context = await browser.newContext({
            viewport: viewport === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 },
            isMobile: viewport === "mobile",
            deviceScaleFactor: viewport === "mobile" ? 2 : 1,
            colorScheme: scheme,
            reducedMotion: "reduce",
          });
          const page = await context.newPage();
          page.on("console", (msg) => {
            if (msg.type() === "error") result.consoleErrors.push({ route: route.path, message: msg.text() });
          });
          page.on("pageerror", (e) => result.consoleErrors.push({ route: route.path, message: e.message }));
          await open(page, server.url + route.path);
          await settle(page);
          // Compare against the requested viewport, not clientWidth: on emulated mobile, content that is too
          // wide widens the layout viewport itself, so scrollWidth and clientWidth grow together.
          const expected = viewport === "desktop" ? 1440 : 390;
          const px = await page.evaluate(
            `Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) - ${expected}`,
          );
          if (typeof px === "number" && px > 1) result.overflow.push({ route: route.path, viewport, scheme, px });
          if (scheme === "light") {
            const findings = await layoutChecks(page).catch(() => null);
            if (findings) (result.layout ??= []).push({ route: route.path, viewport, scheme, findings });
          }
          const file = join(outDir, "screenshots", `${slug}-${viewport}-${scheme}.png`);
          await pinFixedToPageEnd(page).catch(() => {});
          await page.screenshot({ path: file, fullPage: true });
          result.screenshots.push({ route: route.path, viewport, scheme, file: `screenshots/${slug}-${viewport}-${scheme}.png` });
          if (viewport === "desktop") samples.push(await extractStyles(page, scheme));
          if (viewport === "desktop" && scheme === "light") {
            const loops = await page.evaluate(
              () => document.getAnimations().filter((a) => a.playState === "running" && a.effect?.getTiming().iterations === Infinity).length,
            );
            (result.reducedMotionLoops ??= []).push({ route: route.path, count: loops });
            const axe = await new AxeBuilder({ page }).analyze();
            for (const v of axe.violations) result.axe.push({ route: route.path, id: v.id, impact: v.impact ?? null, nodes: v.nodes.length });
            for (const d of await drawingCrops(page, outDir, slug).catch(() => [])) {
              (result.drawings ??= []).push({ route: route.path, ...d, file: relative(outDir, d.file).replaceAll("\\", "/") });
            }
          }
          await context.close();
        }
      }
    }
    // Motion with motion allowed, on every capture route — what the system's signature motion became. The first
    // route's is `motion` (frames named motion-m*.png), the others' `motionRoutes`.
    for (const [i, route] of meta.routes.filter((r) => r.capture).entries()) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "no-preference" });
      const page = await context.newPage();
      try {
        await open(page, server.url + route.path);
        await page.waitForTimeout(600);
        const slug = route.path === "/" ? "home" : route.path.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-");
        const evidence = await motionEvidence(page, outDir, i === 0 ? "motion" : `motion-${slug}`);
        evidence.frames = evidence.frames.map((f) => relative(outDir, f).replaceAll("\\", "/"));
        if (i === 0) result.motion = evidence;
        else (result.motionRoutes ??= []).push({ route: route.path, ...evidence });
      } catch {
        // motion evidence is best-effort; the gates above don't depend on it
      } finally {
        await context.close();
      }
    }

    // Interaction states: desktop light and dark, plus mobile light. Full-page captures so a message or
    // panel below the fold is never cut off.
    const variants = [
      { viewport: "desktop", scheme: "light" },
      { viewport: "desktop", scheme: "dark" },
      { viewport: "mobile", scheme: "light" },
    ] as const;
    for (const state of meta.states ?? []) {
      // A state that exists at one width only (a drawer opened by a mobile menu button) lists its viewports.
      for (const { viewport, scheme } of variants.filter((v) => !state.viewports || state.viewports.includes(v.viewport))) {
        const context = await browser.newContext({
          viewport: viewport === "desktop" ? { width: 1440, height: 900 } : { width: 390, height: 844 },
          isMobile: viewport === "mobile",
          deviceScaleFactor: viewport === "mobile" ? 2 : 1,
          colorScheme: scheme,
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        try {
          await open(page, server.url + state.route);
          for (const step of state.steps) {
            const target = step.testid ? page.getByTestId(step.testid).first() : null;
            if (step.action === "goto") await open(page, server.url + (step.value ?? "/"));
            else if (step.action === "press") await page.keyboard.press(step.value ?? "Tab");
            else if (!target) continue;
            else if (step.action === "click") await target.click();
            else if (step.action === "hover") await target.hover();
            else if (step.action === "focus") await target.focus();
            else if (step.action === "fill") await target.fill(step.value ?? "");
          }
          await page.waitForTimeout(300);
          const file = `screenshots/state-${state.name}-${viewport}-${scheme}.png`;
          await page.screenshot({ path: join(outDir, file), fullPage: true });
          result.screenshots.push({ route: `state:${state.name}`, viewport, scheme, file });
        } catch (e) {
          // A step that cannot run (e.g. a control that is hidden on mobile) is a capture gap, not an app error.
          result.stateFailures.push({ state: state.name, viewport, scheme, message: (e as Error).message.split("\n")[0] ?? "" });
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
    await server.stop();
  }
  writeJson(join(outDir, "samples.json"), samples);
  writeJson(join(outDir, "styles.json"), mergeSamples(samples));
  writeJson(join(outDir, "shots.json"), result);
  return result;
}
