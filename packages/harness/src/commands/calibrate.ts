import { existsSync } from "node:fs";
import { join } from "node:path";
import { latestEval } from "../budget.ts";
import { parseRef, paths, rel, templateDir } from "../paths.ts";
import { info, ok, readJson, writeText } from "../util.ts";
import { review } from "./review.ts";

/**
 * Calibration: the review run on candidates the user has already judged, to see whether it agrees. A review that
 * passes what the user called crude, or fails what the user accepted, is not ready to decide anything; its
 * scores are then advice and the user's direction check decides.
 */
export interface CalibrationCase {
  /** `<id>@<version>` with a main evaluation and its runs on this machine. */
  ref: string;
  expect: "pass" | "fail";
  /** The user's judgement, in their words. */
  why: string;
}

export const CALIBRATION_FILE = join(paths.root, "showcase", "calibration.json");

export async function calibrate(execution: import("../agent-runtime.ts").AgentExecution, only?: string): Promise<boolean> {
  if (!existsSync(CALIBRATION_FILE)) {
    info(`no ${rel(CALIBRATION_FILE)} — list the candidates the user has judged there`);
    return false;
  }
  const cases = readJson<CalibrationCase[]>(CALIBRATION_FILE).filter((c) => !only || c.ref === only);
  const rows: string[] = [];
  let agreed = 0;
  let ran = 0;
  for (const c of cases) {
    const { id, version } = parseRef(c.ref);
    if (!existsSync(templateDir(id, version)) || !latestEval(id, version)) {
      rows.push(`| ${c.ref} | ${c.expect} | — | missing on this machine (template or evaluation) | ${c.why} |`);
      continue;
    }
    info(`calibration: reviewing ${c.ref} (the user said ${c.expect}: ${c.why})`);
    const { critic, judged } = await review(id, version, { ...execution, record: false });
    const got = judged.ok ? "pass" : "fail";
    ran++;
    if (got === c.expect) agreed++;
    const scores = (["referenceFidelity", "signature", "crossAppConsistency", "hierarchy", "spacingRhythm", "componentStates", "polish"] as const).map((a) => critic[a] ?? "-").join(" / ");
    rows.push(`| ${c.ref} | ${c.expect} | ${got} | ${scores} | ${c.why} |`);
  }
  const report = [
    "# Review calibration",
    "",
    `${new Date().toISOString()} · the review agreed with the user on ${agreed} of ${ran} case(s) run.`,
    "",
    "| Candidate | User | Review | Scores (fidelity / signature / family / hierarchy / spacing / states / polish) | User's reason |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
    "",
    agreed === ran && ran > 0
      ? "The review agrees with every judged case."
      : "The review disagrees with the user: its verdict is advice until this is fixed; the user's direction check decides.",
    "",
  ].join("\n");
  const file = join(paths.root, "showcase", "calibration-report.md");
  writeText(file, report);
  ok(`calibration: ${agreed}/${ran} agree → ${rel(file)}`);
  return agreed === ran && ran > 0;
}
