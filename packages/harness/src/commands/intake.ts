import { existsSync } from "node:fs";
import { join } from "node:path";
import { pipelineDir, rel } from "../paths.ts";
import { fail, ok, timestamp, writeJson, writeText } from "../util.ts";

export interface Intake {
  slug: string;
  submittedAt: string;
  urls: string[];
  /** Brand names, product names and marks found on the reference. The validator blocks them from the template. */
  brandTerms: string[];
  notes: string;
  status: "submitted" | "captured" | "analyzed" | "authored" | "evaluating" | "approved" | "published" | "rejected";
  template?: { id: string; version: string };
}

export function intake(slug: string, urls: string[], options: { notes?: string; brand?: string[] }): void {
  if (!/^[a-z][a-z0-9-]{1,40}$/.test(slug)) fail("slug: lowercase letters, digits and dashes");
  if (urls.length === 0) fail("give at least one reference URL");
  for (const u of urls) {
    try {
      new URL(u);
    } catch {
      fail(`not a URL: ${u}`);
    }
  }
  const dir = pipelineDir(slug);
  if (existsSync(join(dir, "intake.json"))) fail(`${rel(dir)} already exists — pick another slug or continue that one`);

  const record: Intake = {
    slug,
    submittedAt: timestamp(),
    urls,
    brandTerms: options.brand ?? [],
    notes: options.notes ?? "",
    status: "submitted",
  };
  writeJson(join(dir, "intake.json"), record);
  writeText(
    join(dir, "iterations.md"),
    `# ${slug} — iteration log\n\nOne entry per authoring iteration: what changed in the package, why, and which gate or critic note it answers.\n`,
  );
  ok(`intake recorded at ${rel(dir)}/intake.json`);
  console.log(`  next: pnpm harness capture ${slug}`);
}
