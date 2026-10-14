import { existsSync } from "node:fs";
import { join } from "node:path";
import { cleanUrl } from "../discover.ts";
import { pipelineDir, rel } from "../paths.ts";
import { fail, ok, timestamp, writeJson, writeText } from "../util.ts";

export interface Intake {
  slug: string;
  submittedAt: string;
  /** What the submitter gave: a domain or pages. Capture surveys the whole site from here. */
  urls: string[];
  /** Pages the survey picked for the deep capture besides the given ones. */
  discovered?: string[];
  /** Brand names, product names and marks found on the reference. The validator blocks them from the template. */
  brandTerms: string[];
  /** The reference is this platform itself: its brand may name the template. Prose still never mentions it. */
  ownBrand?: boolean;
  notes: string;
  status: "submitted" | "captured" | "analyzed" | "authored" | "evaluating" | "approved" | "published" | "rejected";
  template?: { id: string; version: string };
}

export function intake(slug: string, urls: string[], options: { notes?: string; brand?: string[] }): void {
  if (!/^[a-z][a-z0-9-]{1,40}$/.test(slug)) fail("slug: lowercase letters, digits and dashes");
  if (urls.length === 0) fail("give a domain or at least one reference URL");
  const cleaned: string[] = [];
  for (const u of urls) {
    try {
      cleaned.push(cleanUrl(u));
    } catch {
      fail(`not a URL or domain: ${u}`);
    }
  }
  const origins = new Set(cleaned.map((u) => new URL(u).origin));
  if (origins.size > 1) fail(`one site per intake — got ${[...origins].join(", ")}`);
  const dir = pipelineDir(slug);
  if (existsSync(join(dir, "intake.json"))) fail(`${rel(dir)} already exists — pick another slug or continue that one`);

  const record: Intake = {
    slug,
    submittedAt: timestamp(),
    urls: [...new Set(cleaned)],
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
  console.log(`  next: pnpm harness capture ${slug}   (surveys the whole site, then captures the selected pages in depth)`);
}
