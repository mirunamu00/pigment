import { existsSync } from "node:fs";
import { join } from "node:path";
import { AppId, type Analysis, type EvalReport, type ReviewItem, type ReviewPlan, type ReviewUnit } from "@pigment/schema";
import type { ShotResult } from "../commands/shoot.ts";
import { paths, rel } from "../paths.ts";
import { loadTemplate } from "../template.ts";
import { readJson } from "../util.ts";

/**
 * The review checklist: everything a reviewer must look at, as a finite list. One item is one screen (or
 * interaction state, drawing set, motion set) of one app at one viewport and appearance, with every sample of
 * it side by side — so recurrence across samples is judged on the same item, and nothing is left to a
 * reviewer's choice of what to open.
 */

const QUESTIONS: Record<ReviewItem["kind"], string[]> = {
  page: [
    "Next to the reference sheet: would someone who knows the reference take this screen for the same team's work?",
    "Hierarchy: is it as clear as the reference what matters first?",
    "Spacing, type and rhythm: as considered as the reference, or cruder?",
    "Signature elements: present where the spec's Applying the concept puts them for this kind of screen, and built as well as the reference builds them?",
  ],
  state: [
    "Is the state designed in the system's language (focus, hover, error, empty, dialog, toast), as carefully as the reference designs its states?",
    "Does it read clearly: can a person tell what happened and what to do next?",
  ],
  drawings: [
    "Are the drawings built to their signature recipe and as well crafted as the reference's crops at the same size?",
    "Does each read as what it stands for, and is each its own drawing?",
  ],
  motion: [
    "Does the motion feel like the reference's (what moves, how, how often), as the spec describes it?",
  ],
};

/** Above this many items, an app is split between two reviewers (pages / states and details). */
const UNIT_MAX_ITEMS = 30;

export interface PlanInput {
  id: string;
  version: string;
  report: EvalReport;
  /** Where the review's files go (sheets are planned under it). */
  reviewDir: string;
  runsRoot?: string;
}

/** The runs of each app in the evaluation, in sample order (the report lists each app's newest run first). */
export function samplesByApp(report: EvalReport): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const r of report.runs) out.set(r.app, [...(out.get(r.app) ?? []), r.runId]);
  return out;
}

const slug = (s: string) => s.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "home";

export function buildPlan({ id, version, report, reviewDir, runsRoot = paths.runs }: PlanInput): ReviewPlan {
  const appearance = loadTemplate(id, version).manifest.tags.appearance as string[];
  const items: ReviewItem[] = [];
  const byApp = samplesByApp(report);
  const samples = Math.max(1, ...[...byApp.entries()].filter(([a]) => AppId.safeParse(a).success).map(([, v]) => v.length));
  const sheet = (itemId: string) => rel(join(reviewDir, "sheets", `${itemId}.png`));

  // A main evaluation is reviewed on the main apps only; a holdout evaluation on the holdout apps only (older
  // evaluations listed both).
  const holdoutScope = [...byApp.keys()].every((a) => !AppId.safeParse(a).success);
  for (const [app, runIds] of byApp) {
    const holdout = !AppId.safeParse(app).success;
    if (holdout !== holdoutScope) continue;
    const runDirs = runIds.map((runId) => join(runsRoot, id, version, app, runId));
    const shots = runDirs.map((d) => (existsSync(join(d, "shots.json")) ? readJson<ShotResult>(join(d, "shots.json")) : null));
    const file = (k: number, f: string) => rel(join(runDirs[k]!, f));

    // Screens and states: one item per subject × viewport × appearance the system has.
    const keys = new Map<string, { kind: "page" | "state"; subject: string; viewport: "desktop" | "mobile"; scheme: "light" | "dark" }>();
    for (const s of shots) {
      for (const shot of s?.screenshots ?? []) {
        if (!appearance.includes(shot.scheme)) continue;
        const state = shot.route.startsWith("state:");
        const subject = state ? shot.route.slice(6) : shot.route;
        keys.set(`${state ? "state" : "page"}|${subject}|${shot.viewport}|${shot.scheme}`, {
          kind: state ? "state" : "page",
          subject,
          viewport: shot.viewport,
          scheme: shot.scheme,
        });
      }
    }
    for (const k of keys.values()) {
      const itemId = `${app}--${k.kind}--${slug(k.subject)}--${k.viewport}-${k.scheme}`;
      const sources = shots.map((s, i) => {
        const shot = s?.screenshots.find((x) => (k.kind === "state" ? x.route === `state:${k.subject}` : x.route === k.subject) && x.viewport === k.viewport && x.scheme === k.scheme);
        return shot ? [file(i, shot.file)] : [];
      });
      const crops = sources.map((s, i) => (s.length ? rel(join(reviewDir, "crops", `${itemId}--s${i + 1}.png`)) : ""));
      items.push({ id: itemId, app, holdout, kind: k.kind, subject: k.subject, viewport: k.viewport, scheme: k.scheme, sheet: sheet(itemId), sources, crops, questions: QUESTIONS[k.kind] });
    }

    // Drawings: one item per route that has any, all crops of every sample.
    const drawingRoutes = new Set(shots.flatMap((s) => (s?.drawings ?? []).map((d) => d.route)));
    for (const route of drawingRoutes) {
      const itemId = `${app}--drawings--${slug(route)}`;
      const sources = shots.map((s, i) => (s?.drawings ?? []).filter((d) => d.route === route).map((d) => file(i, d.file)));
      items.push({ id: itemId, app, holdout, kind: "drawings", subject: route, sheet: sheet(itemId), sources, questions: QUESTIONS.drawings });
    }

    // Motion: one item per app, every frame sequence.
    const motionSources = shots.map((s, i) => [...(s?.motion?.frames ?? []), ...(s?.motionRoutes ?? []).flatMap((m) => m.frames)].map((f) => file(i, f)));
    if (motionSources.some((m) => m.length)) {
      const itemId = `${app}--motion`;
      items.push({ id: itemId, app, holdout, kind: "motion", subject: "motion", sheet: sheet(itemId), sources: motionSources, questions: QUESTIONS.motion });
    }
  }

  return { template: id, version, evaluation: report.iteration, samples, referenceSheet: null, items, units: planUnits(items) };
}

/** One reviewer per app; an app with many items is split between two (pages, then states and details). */
export function planUnits(items: ReviewItem[]): ReviewUnit[] {
  const units: ReviewUnit[] = [];
  const apps = [...new Set(items.map((i) => i.app))];
  for (const app of apps) {
    const own = items.filter((i) => i.app === app);
    if (own.length <= UNIT_MAX_ITEMS) {
      units.push({ id: app, app, items: own.map((i) => i.id) });
      continue;
    }
    units.push({ id: `${app}-pages`, app, items: own.filter((i) => i.kind === "page").map((i) => i.id) });
    units.push({ id: `${app}-details`, app, items: own.filter((i) => i.kind !== "page").map((i) => i.id) });
  }
  return units;
}

export interface ReferenceShot {
  /** Repo-relative image to show (a first-screen crop or a close-up). */
  file: string;
  shows: string;
  /** A full-page screenshot still to crop to its first screen, and its viewport. */
  cropFrom?: { src: string; viewport: "desktop" | "mobile" };
}

/**
 * The quality bar every reviewer compares with: the analysis's reference set (cropped by check-analysis), or, for
 * an older analysis without one, the signature evidence and the home page's first screens. Never a sorted pick of
 * full pages: those were mostly other people's content, shrunk until nothing could be judged.
 */
export function referenceImages(id: string, version: string, reviewDir: string): ReferenceShot[] {
  const analysisPath = loadTemplate(id, version).manifest.provenance.analysis;
  if (!analysisPath) return [];
  const pipeline = join(paths.root, analysisPath, "..");
  const ref = join(pipeline, "reference");
  const index = join(ref, "set", "index.json");
  if (existsSync(index)) return readJson<Array<{ file: string; shows: string }>>(index).filter((r) => existsSync(join(paths.root, r.file)));

  const analysis = existsSync(join(paths.root, analysisPath)) ? readJson<Analysis>(join(paths.root, analysisPath)) : null;
  const find = (f: string) => [join(pipeline, f), join(ref, f), join(paths.root, f)].find((p) => existsSync(p) && /\.png$/i.test(p));
  const out: ReferenceShot[] = [];
  const seen = new Set<string>();
  const add = (src: string, shows: string, viewport: "desktop" | "mobile") => {
    if (seen.has(src)) return;
    seen.add(src);
    const n = String(out.length + 1).padStart(2, "0");
    if (/screenshots[\\/]/.test(src)) out.push({ file: rel(join(reviewDir, "reference", `${n}-${viewport}.png`)), shows, cropFrom: { src, viewport } });
    else out.push({ file: rel(src), shows });
  };
  for (const r of analysis?.referenceSet ?? []) {
    const src = find(r.image);
    if (src) add(src, r.shows, r.viewport);
  }
  if (out.length) return out;
  for (const s of analysis?.signatures ?? []) {
    for (const e of s.evidence.slice(0, 2)) {
      const src = find(e.split("#")[0]!.trim());
      if (src && out.length < 8) add(src, `signature: ${s.name}`, /mobile/.test(src) ? "mobile" : "desktop");
    }
  }
  const home = (name: string) => (existsSync(join(ref, "screenshots", name)) ? join(ref, "screenshots", name) : null);
  for (const [name, shows, vp] of [
    ["p1-desktop-light.png", "home, first screen", "desktop"],
    ["p1-desktop-dark.png", "home, first screen, dark", "desktop"],
    ["p1-mobile-light.png", "home on a phone", "mobile"],
  ] as const) {
    const src = home(name);
    if (src) add(src, shows, vp);
  }
  return out;
}

