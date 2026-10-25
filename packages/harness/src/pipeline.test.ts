import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { chromium, type Browser } from "playwright";
import type { CriticFinding, EvalReport, ReviewItem } from "@pigment/schema";
import { copyApp } from "./appdir.ts";
import { candidateBlock, candidateStage, compareCore, familyCost, generationBlock, latestEval, passedCandidates, versionFamily } from "./budget.ts";
import { buildPlan, planUnits } from "./review/plan.ts";
import { checkUnit, extractJson, UNIT_MINOR_CAP } from "./review/run.ts";
import { sheetHtml } from "./review/sheets.ts";
import { paths } from "./paths.ts";
import { swatchPage } from "./commands/check-analysis.ts";
import { cropFirstScreens } from "./crop.ts";
import { expandScrollContainers } from "./fullpage.ts";
import { layoutTemplate, selectDeep, type Survey, type SurveyPage } from "./survey.ts";
import { applyOverrides, GATING_CHECKS, judgeCritic, layoutCounts, promptInduced, shareOnScale } from "./commands/evaluate.ts";
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

test("quality verdict: the scores against the reference decide, and only prompt-induced defects count", () => {
  const scores = { mode: "quality" as const, referenceFidelity: 4, signature: 4, crossAppConsistency: 3, hierarchy: 3, spacingRhythm: 3, componentStates: 3, polish: 3, notes: [], promptFixes: [] };
  const defect = (specCaused: boolean, specRule?: string, severity: CriticFinding["severity"] = "blocker"): CriticFinding => ({ ...finding(severity, 3, 3, specCaused), kind: "defect", specRule });
  const gap = (severity: CriticFinding["severity"]): CriticFinding => ({ ...finding(severity, 3, 3), kind: "gap" });
  assert.equal(judgeCritic({ ...scores, findings: [] }).ok, true, "at the bar");
  assert.equal(judgeCritic({ ...scores, findings: [], referenceFidelity: 3 }).ok, false, "not close enough to the reference");
  assert.equal(judgeCritic({ ...scores, findings: [], polish: 2 }).ok, false);
  assert.equal(judgeCritic({ ...scores, findings: [gap("major"), gap("major")] }).ok, true, "gaps lower the scores; they do not fail by themselves");
  assert.equal(judgeCritic({ ...scores, findings: [defect(false)] }).ok, true, "a blocker the agent made on its own does not count");
  assert.equal(judgeCritic({ ...scores, findings: [defect(true)] }).ok, true, "a spec cause without the quoted rule does not count");
  assert.equal(judgeCritic({ ...scores, findings: [defect(true, "toasts sit over the action row")] }).ok, false, "a defect the spec's words induce counts");
  assert.equal(promptInduced(defect(true, "rule", "minor")), false, "a minor never counts");
  assert.match(judgeCritic({ ...scores, findings: [], signature: undefined }).reasons.join(), /no signature score/);
});

test("capture: pages that share a layout are one template; brand pages and new layouts come before more of the same", () => {
  const band = (bg: string) => [`${bg}|h1|-`, "·|h2|media", "·|h2|media", "·|h2|media", "·|-|-"];
  assert.equal(layoutTemplate(band("rgb(1, 2, 3)"), ["layout:card-grid"]), layoutTemplate(band("rgb(9, 9, 9)"), ["layout:card-grid"]), "a header colour is not a layout");
  const page = (path: string, sections: string[], features: string[], imageShare = 0): SurveyPage => ({ url: `https://x.test${path}`, group: path.split("/")[1] || "home", title: "", features, buttons: [], counts: {}, sections, imageShare });
  const pages = [
    page("/", ["·|h1|media", "·|h2|-"], ["svg:icon"]),
    ...["3d", "design", "films", "music", "games"].map((c) => page(`/${c}`, band(`rgb(${c.length}, 0, 0)`), ["layout:card-grid", "ui:tabs"], 0.6)),
    page("/pricing", ["·|h1|-", "·|h2|-", "·|h2|-"], ["ui:table"]),
    page("/about", ["·|h1|media", "·|h2|media"], []),
  ];
  const survey = { origin: "https://x.test", pages, frequency: [], groups: [] } as unknown as Survey;
  pages.push(page("/.well-known/oauth-authorization-server", ["·|-|-", "·|-|-"], ["ui:code-block"]), page("/features", ["·|h1|media", "·|h2|-"], []));
  const picked = selectDeep(survey, [], 5).map((p) => new URL(p.url).pathname);
  assert.ok(!picked.some((p) => p.startsWith("/.well-known")), "machine files are never captured");
  assert.ok(picked.includes("/pricing") && picked.includes("/about"), `brand pages with new layouts are captured: ${picked}`);
  assert.equal(picked.filter((p) => ["/3d", "/design", "/films", "/music", "/games"].includes(p)).length, 1, "one capture of the repeated category layout");
});

test("crops keep a full page's first screen at native resolution", async () => {
  const { chromium } = await import("playwright");
  const dir = tmp();
  const full = join(dir, "full.png");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.setContent('<body style="margin:0"><div style="height:3000px;background:linear-gradient(#f00,#00f)"></div></body>');
    await page.screenshot({ path: full, fullPage: true });
    const [job] = await cropFirstScreens([{ src: full, out: join(dir, "crop.png"), viewport: "desktop" }], browser);
    assert.ok(job, "the crop was written");
    const png = readFileSync(join(dir, "crop.png"));
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1440, 900]);
  } finally {
    await browser.close();
  }
});

test("full-page captures reach the end of a page that scrolls inside a box", async () => {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.setContent('<style>html,body{margin:0;height:100%;overflow:hidden}#app{height:100vh;overflow-y:auto}</style><div id="app"><div style="height:4000px">long page</div></div>');
    assert.ok(((await expandScrollContainers(page)) ?? 0) >= 4000, "the document now carries the whole page");
    await page.setContent('<div style="height:3000px">a normal page</div>');
    assert.equal(await expandScrollContainers(page), null, "a page that scrolls on its own is left alone");
  } finally {
    await browser.close();
  }
});

test("only a finished agent and a building app gate a run; every other check is evidence", () => {
  assert.deepEqual([...GATING_CHECKS].sort(), ["agent-finished", "build"]);
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

test("stages: screen, confirm on 3 samples, then the holdout check; each blocks what comes out of order", () => {
  const apps = ["blog", "settings"];
  const holdoutReport = (verdict: EvalReport["verdict"]) => ({ ...evalReport("1.1.0-rc.2", verdict, ["landing", "docs"], 1), iteration: 2, scope: "holdout" as const });

  const screened = runsFixture({ "1.1.0-rc.2": 10 }, { "1.1.0-rc.2": evalReport("1.1.0-rc.2", "pass", apps, 1) });
  assert.equal(candidateStage("demo", "1.1.0-rc.2", screened, true).stage, "confirm");
  assert.match(candidateBlock("demo", "1.1.0-rc.3", screened, true) ?? "", /passed the screen/);
  assert.match(generationBlock("demo", "1.1.0-rc.2", screened, "main", true) ?? "", /approves its direction/, "the user looks at the screen first");
  write(join(screened, "demo", "1.1.0-rc.2", "direction.json"), { approvedBy: "user", at: "t" });
  assert.equal(generationBlock("demo", "1.1.0-rc.2", screened, "main", true), null, "then the screened candidate may be confirmed");
  assert.match(generationBlock("demo", "1.1.0-rc.2", screened, "holdout", true) ?? "", /holdout check comes after/);

  const confirmed = runsFixture({ "1.1.0-rc.2": 10 }, { "1.1.0-rc.2": evalReport("1.1.0-rc.2", "pass", apps, 3) });
  assert.deepEqual(passedCandidates("demo", "1.1.0-rc.3", confirmed, true), [{ version: "1.1.0-rc.2", samples: 3, stage: "holdout" }]);
  assert.match(candidateBlock("demo", "1.1.0-rc.3", confirmed, true) ?? "", /holdout check/);
  assert.match(generationBlock("demo", "1.1.0-rc.2", confirmed, "main", true) ?? "", /no more main-app samples/);
  assert.equal(generationBlock("demo", "1.1.0-rc.2", confirmed, "holdout", true), null);
  assert.equal(candidateStage("demo", "1.1.0-rc.2", confirmed, false).stage, "done", "without holdout apps the confirm is the end");
  const mixed = evalReport("1.1.0-rc.2", "pass", apps, 3);
  mixed.runs.push({ ...mixed.runs[0]!, runId: "h1", app: "landing" });
  const legacy = runsFixture({ "1.1.0-rc.2": 10 }, { "1.1.0-rc.2": mixed });
  assert.equal(candidateStage("demo", "1.1.0-rc.2", legacy, true).stage, "holdout", "a holdout run in an older main evaluation doesn't lower its samples");

  write(join(confirmed, "demo", "1.1.0-rc.2", "eval-2.json"), holdoutReport("pass"));
  assert.equal(candidateStage("demo", "1.1.0-rc.2", confirmed, true).stage, "done");
  assert.equal(latestEval("demo", "1.1.0-rc.2", confirmed)?.iteration, 1, "the main evaluation is not hidden by a newer holdout one");
  assert.match(candidateBlock("demo", "1.1.0-rc.3", confirmed, true) ?? "", /publishing/);

  write(join(confirmed, "demo", "1.1.0-rc.2", "eval-2.json"), holdoutReport("fail"));
  assert.equal(candidateStage("demo", "1.1.0-rc.2", confirmed, true).stage, "failed");
  assert.equal(candidateBlock("demo", "1.1.0-rc.3", confirmed, true), null, "a candidate that failed the holdout check doesn't block the next");
});

test("critic verdict: a holdout-only major counts only when the spec causes it", () => {
  const holdout = (specCaused: boolean): CriticFinding => ({ ...finding("major", 1, 1, specCaused), holdoutOnly: true });
  assert.equal(judgeCritic(critic([holdout(false)])).ok, true);
  assert.equal(judgeCritic(critic([holdout(true)])).ok, false);
  assert.equal(judgeCritic(critic([{ ...finding("blocker", 1, 1), holdoutOnly: true }])).ok, false);
});

test("overrides change one finding's severity and are recorded with their reason", () => {
  const base = critic([finding("minor", 2, 3), { ...finding("major", 1, 3), summary: "checkout heading becomes the page close" }]);
  const out = applyOverrides(base, [{ match: "checkout heading", to: "blocker", reason: "pushes the form below the fold" }], "t");
  assert.equal(out.findings!.find((f) => f.summary.includes("checkout"))!.severity, "blocker");
  assert.deepEqual(out.overrides, [{ summary: "checkout heading becomes the page close", from: "major", to: "blocker", reason: "pushes the form below the fold", at: "t" }]);
  assert.throws(() => applyOverrides(base, [{ match: "o", to: "minor", reason: "x" }], "t"), "a phrase matching several findings is refused");
});

// --- Review --------------------------------------------------------------------------------------------

const item = (id: string): ReviewItem => ({ id, app: "blog", holdout: false, kind: "page", subject: "/", viewport: "desktop", scheme: "light", sheet: `${id}.png`, sources: [[`${id}-a.png`]], questions: ["?"] });

test("review: a unit answer counts only with a note about what is on every item", () => {
  const items = [item("a"), item("b"), item("c"), item("d")];
  const good = checkUnit(items, {
    items: [
      { id: "a", status: "ok", fidelity: 4, note: "Hero headline left, dot field under the close, three samples alike." },
      { id: "b", status: "finding", fidelity: 3, note: "Pinned column covers the budget figures in samples 1 and 3." },
      { id: "c", status: "ok", fidelity: 4, note: "ok" },
      { id: "d", status: "ok", note: "A real note about the screen, but no fidelity mark at all." },
      { id: "zzz", status: "ok", fidelity: 4, note: "An item that is not on this checklist at all." },
    ],
    findings: [{ severity: "major", area: "polish", summary: "covered figures", samples: 2, of: 3, items: ["b", "nope"] }],
  });
  assert.deepEqual(good.missing, ["c", "d"], "a contentless note or a missing fidelity mark counts as missing");
  assert.deepEqual(good.review!.findings[0]!.items, ["b"], "findings only point at checklist items");
  assert.ok(good.problems.some((p) => /unknown item ids: zzz/.test(p)));
  assert.deepEqual(checkUnit(items, { nonsense: true }).missing, ["a", "b", "c", "d"]);
  const minors = Array.from({ length: 12 }, (_, i) => ({ severity: "minor", area: "polish", summary: `m${i}`, samples: 1, of: 3 }));
  assert.equal(checkUnit(items, { items: [], findings: minors }).review!.findings.length, UNIT_MINOR_CAP);
});

test("review: the answer's JSON is read from a fenced block or the outermost braces", () => {
  assert.deepEqual(extractJson('Done.\n```json\n{"a": 1}\n```\n'), { a: 1 });
  assert.deepEqual(extractJson('Here: {"a": {"b": 2}} end'), { a: { b: 2 } });
  assert.throws(() => extractJson("no json here"));
});

test("review: the checklist covers every screen, state, drawing set and motion set, samples side by side", () => {
  const runsRoot = tmp();
  const runs = ["r2", "r1"];
  for (const runId of runs) {
    write(join(runsRoot, "graphite-blueprint", "1.2.0", "blog", runId, "shots.json"), {
      screenshots: [
        { route: "/", viewport: "desktop", scheme: "light", file: "screenshots/home-desktop-light.png" },
        { route: "/", viewport: "desktop", scheme: "dark", file: "screenshots/home-desktop-dark.png" },
        { route: "state:search-empty", viewport: "mobile", scheme: "light", file: "screenshots/state-search-empty-mobile-light.png" },
      ],
      consoleErrors: [], overflow: [], stateFailures: [], axe: [],
      drawings: [{ route: "/", file: "drawings/home-d1.png", w: 100, h: 100 }],
      motion: { animations: 1, loops: 0, inSvg: 0, keyframes: [], illustrations: 0, lineDrawings: 0, frames: ["motion/motion-m1.png"] },
    });
  }
  const report = { ...evalReport("9.9.9-rc.1", "pending-review", ["blog"], 2), template: "graphite-blueprint" };
  report.runs = runs.map((runId) => ({ runId, app: "blog" as const, gates: [], metrics: {} }));
  const plan = buildPlan({ id: "graphite-blueprint", version: "1.2.0", report, reviewDir: join(runsRoot, "review"), runsRoot, appearance: ["light", "dark"] });
  const ids = plan.items.map((i) => i.id).sort();
  // A system with light and dark: both page appearances, the state, drawings and motion.
  assert.deepEqual(ids, ["blog--drawings--home", "blog--motion", "blog--page--home--desktop-dark", "blog--page--home--desktop-light", "blog--state--search-empty--mobile-light"]);
  const page = plan.items.find((i) => i.id === "blog--page--home--desktop-light")!;
  assert.equal(page.sources.length, 2, "one column per sample");
  assert.match(page.sources[0]![0]!, /r2[\\/]screenshots[\\/]home-desktop-light\.png$/);
  assert.equal(plan.samples, 2);
  assert.deepEqual(plan.units, [{ id: "blog", app: "blog", items: plan.items.map((i) => i.id) }]);
});

test("review: an app with many items is split between two reviewers", () => {
  const items = Array.from({ length: 40 }, (_, i) => ({ ...item(`x${i}`), kind: (i < 20 ? "page" : "state") as ReviewItem["kind"] }));
  assert.deepEqual(planUnits(items).map((u) => [u.id, u.items.length]), [["blog-pages", 20], ["blog-details", 20]]);
});

test("review: a comparison sheet puts every sample side by side and lists the originals", () => {
  const html = sheetHtml("blog · page · /", [{ label: "sample 1", images: ["showcase/runs/x/a.png"] }, { label: "sample 2", images: [] }], 560, paths.root);
  assert.match(html, /sample 1[\s\S]*sample 2/);
  assert.match(html, /no capture in this sample/);
  assert.match(html, /showcase\/runs\/x\/a\.png/);
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
