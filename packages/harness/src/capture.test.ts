import assert from "node:assert/strict";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";
import { chromium, type Browser } from "playwright";
import { allowedByRobots, cleanUrl, groupKey, localeOf, parseRobots } from "./discover.ts";
import { startFixtureSite } from "./fixtures/site.ts";
import { deepCapture, watchLottie } from "./probe.ts";
import { selectDeep, surveySite, type Survey } from "./survey.ts";

test("urls: domains become URLs, tracking parameters go", () => {
  assert.equal(cleanUrl("example.com"), "https://example.com/");
  assert.equal(
    cleanUrl("https://claude.com/ko/product/overview?utm_source=google&utm_term=x&gclid=abc&gbraid=1&page=2#top"),
    "https://claude.com/ko/product/overview?page=2",
  );
  assert.equal(localeOf("/ko/product/overview"), "ko");
  assert.equal(localeOf("/product/overview"), null);
  assert.equal(groupKey("https://x.com/ko/blog/a-post", "ko"), "/blog/*");
  assert.equal(groupKey("https://x.com/ko", "ko"), "home");
});

test("robots.txt: the * group's rules and every sitemap", () => {
  const robots = parseRobots("User-agent: Googlebot\nDisallow: /g\n\nUser-agent: *\nDisallow: /private\nDisallow: /*.json$\nSitemap: https://x.com/s.xml\n");
  assert.deepEqual(robots.disallow, ["/private", "/*.json$"]);
  assert.deepEqual(robots.sitemaps, ["https://x.com/s.xml"]);
  assert.equal(allowedByRobots("/private/a", robots.disallow), false);
  assert.equal(allowedByRobots("/data.json", robots.disallow), false);
  assert.equal(allowedByRobots("/g", robots.disallow), true);
});

let site: Awaited<ReturnType<typeof startFixtureSite>>;
let browser: Browser;
let survey: Survey;
before(async () => {
  site = await startFixtureSite();
  browser = await chromium.launch();
  survey = await surveySite(browser, [`${site.url}/`], { maxPages: 30, perCollection: 3 });
});
after(async () => {
  await browser.close();
  site.server.close();
});

test("survey: finds the site's pages from one URL, skips what it must, samples collections", () => {
  const paths = survey.pages.map((p) => new URL(p.url).pathname);
  for (const p of ["/", "/features", "/faq", "/blog"]) assert.ok(paths.includes(p), `surveyed ${p}`);
  for (const p of ["/login", "/legal/privacy", "/private/secret"]) assert.ok(!paths.includes(p), `skipped ${p}`);
  assert.ok(!site.requested.includes("/private/secret"), "never requests a disallowed page");
  assert.equal(paths.filter((p) => p.startsWith("/blog/")).length, 3, "a collection is sampled");
  const features = survey.frequency.map((f) => f.feature);
  for (const f of ["motion:rotate", "motion:loop", "motion:draw-on", "svg:line-drawing", "ui:disclosure", "ui:tabs", "ui:table", "ui:form", "ui:theme-toggle", "layout:card-grid", "layout:sticky-header"]) {
    assert.ok(features.includes(f), `feature ${f}`);
  }
});

test("deep selection covers every surveyed feature", () => {
  const selected = selectDeep(survey, [`${site.url}/`], 10);
  const covered = new Set(selected.flatMap((s) => survey.pages.find((p) => p.url === s.url)!.features));
  for (const f of survey.frequency) assert.ok(covered.has(f.feature), `covers ${f.feature}`);
});

test("deep capture: motion with frames, scroll reveals, interactions, inventory, theme toggle", async () => {
  const out = mkdtempSync(join(tmpdir(), "pigment-capture-"));
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto(`${site.url}/`);
  await page.waitForTimeout(300);
  const home = await deepCapture(page, out, "p1", { darkDiffers: false });

  const draw = home.motion.animations.find((a) => a.name === "draw");
  assert.ok(draw && draw.inSvg, "line drawing animation found");
  assert.ok(home.motion.keyframeRules.some((k) => k.name === "draw" && k.used));
  assert.ok(home.motion.reducedMotionRules.length > 0, "prefers-reduced-motion rules recorded");
  assert.ok(home.motion.reveals.length > 0, "scroll reveal recorded");
  assert.ok(home.motion.frames.length > 0 && home.motion.frames.every((f) => existsSync(f.file)), "frame sheets written");

  const button = home.interactions.find((i) => i.kind === "button" && i.hover?.backgroundColor);
  assert.ok(button, "button hover changes the background");
  assert.ok(button!.hover!.transform, "and lifts it");
  assert.ok(home.interactions.some((i) => typeof i.focus === "object" && (i.focus.outlineStyle || i.focus.outlineColor)), "focus ring recorded");

  const illustration = home.inventory.svgs.find((s) => s.role === "illustration");
  assert.ok(illustration && illustration.strokeWidths["3px"], "illustration with its stroke width");
  assert.ok(illustration!.file && existsSync(illustration!.file));
  assert.ok(home.inventory.buttons.length >= 2, "button variants");
  assert.ok(home.theme.themeSelectors.some((t) => t.selector.includes("data-theme")));
  assert.equal(home.theme.toggled?.changed, true, "the theme toggle was tried and changed the page");
  assert.equal(home.structure.header?.position, "sticky");

  // Script-driven motion and Lottie files are invisible to the animation list: pixels and the network show them.
  const scriptedPage = await context.newPage();
  const lottie = watchLottie(scriptedPage, join(out, "raw"), "p3");
  await scriptedPage.goto(`${site.url}/download`);
  await scriptedPage.waitForTimeout(300);
  const scripted = await deepCapture(scriptedPage, out, "p3", { darkDiffers: false, lottie });
  assert.ok(scripted.motion.visual.some((v) => v.kind === "svg" && existsSync(v.file)), "script-driven SVG filmed");
  const file = scripted.motion.lottieFiles[0];
  assert.ok(file, "Lottie file summarized");
  assert.equal(file!.trimPaths, true);
  assert.deepEqual(file!.strokeWidths, { "2.5": 1 });
  assert.deepEqual(file!.lineCaps, { round: 1 });
  assert.equal(file!.durationMs, 3000);

  await page.goto(`${site.url}/faq`);
  await page.waitForTimeout(300);
  const faq = await deepCapture(page, out, "p2", { darkDiffers: false });
  assert.ok(faq.motion.animations.some((a) => a.name === "spin" && a.iterations === "infinite"), "rotating icon found");
  const disclosure = faq.interactions.find((i) => i.kind === "disclosure");
  assert.ok(disclosure?.open && !disclosure.open.navigated, "accordion opened in place");
  assert.ok(disclosure!.file && existsSync(disclosure!.file));
  await context.close();
});
