import { existsSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { AppId, type EvalReport, type ReviewItem, type ReviewPlan, type ReviewUnit } from "@pigment/schema";
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
    "Does the screen carry the reference's character (compare with the reference sheet)?",
    "Hierarchy: is it obvious what matters first, the way the reference makes it obvious?",
    "Spacing, alignment and rhythm: on the scale, consistent, nothing cramped or stranded?",
    "Signature elements: present where the spec's Applying the concept puts them for this kind of screen, built to their recipes?",
    "Anything broken for people: cut-off or overlapping content, unreadable text, a layout that falls apart?",
  ],
  state: [
    "Is the state designed in the system's language (focus, hover, error, empty, dialog, toast), not a browser default?",
    "Can a person tell what happened and what to do next?",
    "Anything broken: hidden messages, overlapping layers, unreadable contrast?",
  ],
  drawings: [
    "Is each drawing built to its signature recipe (construction, stroke, colour by token)?",
    "Does it read as what it stands for at its shown size (compare with the reference crops)?",
    "Is it as well crafted as the reference's drawings at the same size?",
  ],
  motion: [
    "Does the motion follow the spec (what moves, how, how often)?",
    "Do the frames show the signature motion, and nothing that loops where the spec says it should not?",
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
      items.push({ id: itemId, app, holdout, kind: k.kind, subject: k.subject, viewport: k.viewport, scheme: k.scheme, sheet: sheet(itemId), sources, questions: QUESTIONS[k.kind] });
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

/** Reference screenshots and drawing crops every reviewer compares against (desktop captures first). */
export function referenceImages(id: string, version: string): string[] {
  const analysis = loadTemplate(id, version).manifest.provenance.analysis;
  if (!analysis) return [];
  const ref = join(paths.root, analysis, "..", "reference");
  const list = (dir: string, pick: (f: string) => boolean, n: number) =>
    existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".png") && pick(f)).sort().slice(0, n).map((f) => rel(join(dir, f))) : [];
  return [
    ...list(join(ref, "screenshots"), (f) => /desktop/.test(f) && !/toggled/.test(f), 6),
    ...list(join(ref, "illustrations"), (f) => /-i\d/.test(basename(f)), 6),
    ...list(join(ref, "illustrations"), (f) => /-g\d/.test(basename(f)), 6),
  ];
}

