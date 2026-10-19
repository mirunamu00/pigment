import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { chromium, type Browser } from "playwright";
import type { CriticFinding, EvalReport } from "@pigment/schema";
import { copyApp } from "./appdir.ts";
import { candidateBlock, compareCore, familyCost, generationBlock, passedCandidates, versionFamily } from "./budget.ts";
import { swatchPage } from "./commands/check-analysis.ts";
import { judgeCritic, layoutCounts, shareOnScale } from "./commands/evaluate.ts";
import { runQueue, sampleRunIds } from "./commands/generate.ts";
import { galleryRuns } from "./commands/publish.ts";
import { layFixedLayers } from "./commands/shoot.ts";
import { estimateTokens } from "./commands/validate.ts";
import { layoutChecks } from "./layout.ts";
import { baseAppTerms, overfitMentions } from "./overfit.ts";

const tmp = () => mkdtempSync(join(tmpdir(), "pigment-pipeline-"));
const write = (file: string, data: unknown) => {
  mkdirSync(join(file, ".."), { recursive: true });
  writeFileSync(file, typeof data === "string" ? data : JSON.stringify(data));
};

// --- Verdict --------------------------------------------------------------------------------------------

const finding = (severity: CriticFinding["severity"], samples: number, of: number, specCaused = false): CriticFinding => ({
  severity,
  area: "polish",
  summary: `${severity} ${samples}/${of}`,
  samples,
  of,
  specCaused,
  evidence: [],
});
const critic = (findings: CriticFinding[]) => ({ findings, notes: [], promptFixes: [] });

test("critic verdict: a blocker fails wherever it appears", () => {
  assert.equal(judgeCritic(critic([finding("blocker", 1, 3)])).ok, false);
});

test("critic verdict: a major fails only when the prompt causes it", () => {
  assert.equal(judgeCritic(critic([finding("major", 1, 3)])).ok, true, "one-off in three samples is variance");
  assert.equal(judgeCritic(critic([finding("major", 2, 3)])).ok, false, "recurring");
  assert.equal(judgeCritic(critic([finding("major", 1, 3, true)])).ok, false, "the spec causes it");
  assert.equal(judgeCritic(critic([finding("major", 1, 1)])).ok, false, "one sample can't tell chance from cause");
});

test("critic verdict: minors never fail; reasons name what failed", () => {
  assert.equal(judgeCritic(critic([finding("minor", 3, 3), finding("minor", 3, 3)])).ok, true);
  const judged = judgeCritic(critic([finding("blocker", 1, 3), finding("major", 3, 3), finding("minor", 3, 3)]));
  assert.equal(judged.reasons.length, 2);
  assert.match(judged.summary, /1 blocker\(s\), 1 gating major\(s\), 1 minor\(s\)/);
});

test("critic verdict: older score-only files keep the score bar", () => {
  const scores = { referenceFidelity: 4, crossAppConsistency: 4, hierarchy: 4, spacingRhythm: 4, componentStates: 4, polish: 4, notes: [], promptFixes: [] };
  assert.equal(judgeCritic(scores).ok, true);
  assert.equal(judgeCritic({ ...scores, polish: 2 }).ok, false);
});

// --- Cost and stopping ----------------------------------------------------------------------------------

function evalReport(version: string, verdict: EvalReport["verdict"], apps: string[], samples: number): EvalReport {
  return {
    template: "demo",
    version,
    iteration: 1,
    evaluatedAt: "2026-10-18T00:00:00Z",
    runs: apps.flatMap((app) => Array.from({ length: samples }, (_, k) => ({ runId: `r${k}`, app: app as "blog", gates: [], metrics: {} }))),
    crossApp: [],
    verdict,
    reasons: [],
  };
}

function runsFixture(spend: Record<string, number>, evals: Record<string, EvalReport>) {
  const root = tmp();
  for (const [version, usd] of Object.entries(spend)) {
    write(join(root, "demo", version, "blog", "r1", "agent-meta.json"), { costUsd: usd / 2, durationMs: 60_000 });
    write(join(root, "demo", version, "settings", "r1", "agent-meta.json"), { costUsd: usd / 2, durationMs: 60_000 });
  }
  for (const [version, report] of Object.entries(evals)) write(join(root, "demo", version, "eval-1.json"), report);
  return root;
}

test("versions: family and core order", () => {
  assert.equal(versionFamily("1.1.0-rc.3"), "1.1.0");
  assert.ok(compareCore("1.0.0", "1.1.0-rc.1") < 0);
  assert.equal(compareCore("1.1.0", "1.1.0-rc.9"), 0);
});

test("spend sums every candidate of the family and decides nothing", () => {
  const root = runsFixture({ "1.1.0-rc.1": 300, "1.1.0-rc.2": 30, "1.0.0": 12 }, {});
  const cost = familyCost("demo", "1.1.0-rc.3", root);
  assert.equal(cost.usd, 330);
  assert.equal(cost.runs, 4);
  assert.equal(generationBlock("demo", "1.1.0-rc.3", root), null);
});

test("stopping: a confirmed pass blocks new candidates and more runs; a screen pass asks for its confirm", () => {
  const apps = ["blog", "settings"];
  const confirmed = runsFixture({ "1.1.0-rc.2": 10 }, { "1.1.0-rc.2": evalReport("1.1.0-rc.2", "pass", apps, 3) });
  assert.deepEqual(passedCandidates("demo", "1.1.0-rc.3", confirmed), [{ version: "1.1.0-rc.2", samples: 3 }]);
  assert.match(candidateBlock("demo", "1.1.0-rc.3", confirmed) ?? "", /passed on 3 samples/);
  assert.match(generationBlock("demo", "1.1.0-rc.2", confirmed) ?? "", /nothing left to confirm/);

  const screened = runsFixture({ "1.1.0-rc.2": 10 }, { "1.1.0-rc.2": evalReport("1.1.0-rc.2", "pass", apps, 1) });
  assert.match(candidateBlock("demo", "1.1.0-rc.3", screened) ?? "", /passed the screen/);
  assert.equal(generationBlock("demo", "1.1.0-rc.2", screened), null, "the screened candidate may be confirmed");
});

test("stopping: the fifth candidate is past the cap; failed candidates don't block", () => {
  const failed = runsFixture({ "1.1.0-rc.1": 5 }, { "1.1.0-rc.1": evalReport("1.1.0-rc.1", "fail", ["blog"], 1) });
  assert.equal(candidateBlock("demo", "1.1.0-rc.4", failed), null);
  assert.match(candidateBlock("demo", "1.1.0-rc.5", failed) ?? "", /past the cap/);
});

// --- Samples, gallery -----------------------------------------------------------------------------------

test("generate: sample run ids sort in order; holdout apps run once with the first sample", () => {
  assert.deepEqual(sampleRunIds("20261018-120000", 1), ["20261018-120000"]);
  const ids = sampleRunIds("20261018-120000", 2);
  assert.deepEqual(ids, ["20261018-120000-s1", "20261018-120000-s2"]);
  assert.deepEqual(runQueue(ids, ["blog", "settings"], ["docs"]), [
    { app: "blog", runId: ids[0] },
    { app: "settings", runId: ids[0] },
    { app: "blog", runId: ids[1] },
    { app: "settings", runId: ids[1] },
    { app: "docs", runId: ids[0] },
  ]);
});

test("publish: the gallery takes each main app's first listed run and never a holdout app", () => {
  const report = evalReport("1.0.0", "pass", ["blog", "settings"], 2);
  report.runs.push({ runId: "h1", app: "docs", gates: [], metrics: {} });
  assert.deepEqual(
    galleryRuns(report).map((r) => `${r.app}/${r.runId}`),
    ["blog/r0", "settings/r0"],
  );
});

// --- Measurements ---------------------------------------------------------------------------------------

test("spacing on the scale: within 1px counts, percentages count", () => {
  assert.equal(shareOnScale({ "8px": 2, "15px": 1, "50%": 1 }, [8, 16]), 1);
  assert.equal(shareOnScale({ "8px": 1, "13px": 1 }, [8, 16]), 0.5);
});

test("layout counts include the entries past the listing cap", () => {
  const counts = layoutCounts([
    {
      route: "/",
      viewport: "desktop",
      scheme: "light",
      findings: [
        { kind: "clipped-text", where: "p", detail: "x" },
        { kind: "clipped-text", where: "", detail: "5 more not listed" },
        { kind: "double-rule", where: "div", detail: "y" },
      ],
    },
  ]);
  assert.deepEqual(counts, { "clipped-text": 6, "double-rule": 1 });
});

let browser: Browser | undefined;
after(async () => browser?.close());

test("layout checks find each defect and skip hidden and deliberate cases", async () => {
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`<style>body{margin:0;font:16px sans-serif}.row{display:flex;gap:16px;padding:20px;align-items:flex-start}
    .card{border:1px solid #333;padding:12px;width:200px}.clip{width:80px;overflow:hidden;white-space:nowrap}
    .ell{width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
    .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
    .clamp{width:200px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
    .a{border-bottom:1px solid #000;height:30px}.b{border-top:1px solid #000;height:30px}
    .over{position:relative;height:40px}.over span{position:absolute;top:0;left:0}</style>
    <div class="row"><div class="card" style="height:100px">A</div><div class="card" style="height:104px">B</div></div>
    <div class="row"><div class="card" style="height:100px">C</div><div class="card" style="height:160px">D</div></div>
    <div class="clip">This text is far too long to fit</div>
    <div style="overflow:hidden;width:120px"><div style="overflow-x:auto"><table><tr><td style="white-space:nowrap">A wide table that scrolls sideways</td></tr></table></div></div>
    <table style="border-collapse:collapse;margin-top:20px"><tr style="border-bottom:1px solid #000"><td>r1</td></tr><tr style="border-top:1px solid #000"><td>r2</td></tr></table><div class="ell">This text is far too long to fit</div>
    <div class="sr">Hidden heading</div><div>Visible text</div>
    <div class="clamp">A long description that wraps onto several lines and is clamped to one line on purpose</div><span>$10</span>
    <div class="a">a</div><div class="b">b</div>
    <div style="display:flex;border-bottom:1px solid #000;margin-top:20px"><span style="border-bottom:2px solid #00f;width:80px">Tab</span><span style="width:80px">Two</span></div>
    <div class="over"><span>First label</span><span>Second label</span></div>
    <svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" fill="none"/></svg>
    <svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" fill="none"/></svg>`);
  const found = await layoutChecks(page);
  const kinds = found.map((f) => f.kind).sort();
  assert.deepEqual(kinds, ["clipped-text", "double-rule", "overlapping-text", "repeated-drawing", "uneven-row"]);
  assert.match(found.find((f) => f.kind === "clipped-text")!.where, /div\.clip/);
  assert.match(found.find((f) => f.kind === "uneven-row")!.where, /"A"/);
});

// --- Prompt hygiene -------------------------------------------------------------------------------------

test("overfit lint: demo-app names, products, test ids and routes; generic words pass", () => {
  const apps = tmp();
  write(join(apps, "store", "pigment.app.json"), { id: "store", name: "Harbor Goods store", port: 1, routes: [{ path: "/products/brass-desk-lamp", name: "p", capture: true }] });
  write(join(apps, "store", "src", "data", "products.ts"), "export const p = [{ slug: 'brass-desk-lamp', name: 'Brass Desk Lamp', label: 'Lighting' }, { name: 'Wool Throw' }];");
  write(join(apps, "store", "src", "pages", "Home.tsx"), '<div data-testid="product-card" /><div data-testid="search" />');
  const terms = baseAppTerms(apps);
  const names = terms.map((t) => t.term);
  for (const expected of ["Harbor Goods", "brass-desk-lamp", "Brass Desk Lamp", "Desk Lamp", "Lamp", "Wool Throw", "Throw", "product-card"]) {
    assert.ok(names.includes(expected), `${expected} in ${names.join(", ")}`);
  }
  assert.ok(!names.includes("search") && !names.includes("Lighting"), "single generic words are not terms");
  const hits = overfitMentions("Draw lamps with a 2px stroke; the product-card gets a hairline. A lampshade is fine.", terms).map((t) => t.term);
  assert.deepEqual(hits.sort(), ["Lamp", "product-card"]);
});

test("token estimate ignores whitespace, so squeezing spaces gains nothing", () => {
  assert.equal(estimateTokens("a  b\n\n\nc"), estimateTokens("a b c"));
  assert.equal(estimateTokens("x".repeat(400)), 100);
});

test("swatch page escapes analysis text and marks derived roles", () => {
  const html = swatchPage({
    slug: "s",
    color: { roles: [{ role: "bg.page (light, derived)", hex: "#FAFAFA", evidence: "<none>" }], appearance: ["light"], notes: "" },
    typography: { families: [], scale: [] },
    theming: { mechanism: "none", notes: "", evidence: [] },
    coverage: [],
  } as unknown as Parameters<typeof swatchPage>[0]);
  assert.match(html, /&lt;none&gt;/);
  assert.match(html, /class="d">derived/);
});

test("kept copies skip the app's build output and dependencies, never a design package's dist", () => {
  const from = tmp();
  for (const f of ["src/main.tsx", "dist/index.html", "node_modules/x/i.js", "test-results/r.txt", "design-packages/demo-1.0.0/dist/tokens.css"]) write(join(from, f), "x");
  const to = join(tmp(), "copy");
  copyApp(from, to);
  assert.ok(existsSync(join(to, "src/main.tsx")));
  assert.ok(existsSync(join(to, "design-packages/demo-1.0.0/dist/tokens.css")));
  for (const gone of ["dist", "node_modules", "test-results"]) assert.ok(!existsSync(join(to, gone)), gone);
});

test("full-page captures lay fixed and sticky layers out where a reader would see them", async () => {
  browser ??= await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  await page.setContent(`<style>body{margin:0}main{height:3000px}</style>
    <header id="h" style="position:sticky;top:0;height:40px;background:#000"></header>
    <div id="top" style="position:fixed;top:0;left:0;width:100px;height:20px"></div>
    <div id="bar" style="position:fixed;bottom:0;left:0;width:100%;height:50px"></div>
    <div id="toast" style="position:fixed;top:300px;left:0;width:100px;height:40px"></div>
    <div id="veil" style="position:fixed;inset:0;background:rgba(0,0,0,0.5)"></div>
    <main></main>`);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await layFixedLayers(page);
  const at = (id: string) => page.evaluate((i) => document.getElementById(i)!.getBoundingClientRect().top + window.scrollY, id);
  assert.equal(await at("h"), 0, "sticky header back in the flow at the top");
  assert.equal(await at("top"), 0, "top-pinned element at the page top");
  assert.equal(Math.round(await at("bar")), (await page.evaluate(() => document.documentElement.scrollHeight)) - 50, "bottom bar at the page end");
  assert.equal(await at("toast"), 1300, "a floating layer stays where it was seen");
  assert.equal(await at("veil"), 1000, "the overlay box stays in view");
  assert.match(await page.evaluate(() => getComputedStyle(document.getElementById("veil")!).boxShadow), /rgba\(0, 0, 0, 0\.5\)/);
  await page.close();
});
