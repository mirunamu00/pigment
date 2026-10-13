#!/usr/bin/env node
import { Command } from "commander";
import { AppId } from "@pigment/schema";
import { parseRef } from "./paths.ts";
import { bundle } from "./commands/bundle.ts";
import { capture } from "./commands/capture.ts";
import { checkAnalysis } from "./commands/check-analysis.ts";
import { evaluate, mergeCritic } from "./commands/evaluate.ts";
import { makeFixture } from "./commands/fixture.ts";
import { baseline, generate, type Agent } from "./commands/generate.ts";
import { intake } from "./commands/intake.ts";
import { checkAll, publish } from "./commands/publish.ts";
import { scaffold } from "./commands/scaffold.ts";
import { validate } from "./commands/validate.ts";

const program = new Command("pnpm harness").description("Pigment template pipeline. See docs/harness/README.md.");

program
  .command("intake")
  .description("1. register a reference submission")
  .argument("<slug>", "work-area name, e.g. linear-study")
  .argument("<urls...>", "a domain (example.com) or pages of one site; tracking parameters are stripped")
  .option("--brand <terms...>", "brand/product names that must never appear in the template")
  .option("--notes <text>", "what the submitter liked about it")
  .action((slug: string, urls: string[], opts) => intake(slug, urls, opts));

program
  .command("capture")
  .description("2. survey the site, then capture the selected pages: screenshots, styles, motion, interactions, illustrations")
  .argument("<slug>")
  .option("--max-pages <n>", "most pages to survey (robots.txt is respected)", "150")
  .option("--patience <n>", "stop surveying once this many pages in a row add no new feature or page type", "20")
  .option("--deep <n>", "pages to capture in depth, chosen so every surveyed feature is covered", "16")
  .option("--no-survey", "capture only the given pages")
  .option("--headed", "show the browser")
  .action((slug: string, opts) => capture(slug, { headed: opts.headed, survey: opts.survey, maxPages: Number(opts.maxPages), patience: Number(opts.patience), deep: Number(opts.deep) }));

program
  .command("check-analysis")
  .description("3. check the analyst's output: schema, every audit area, evidence files, survey consistency")
  .argument("<slug>")
  .action((slug: string) => {
    process.exitCode = checkAnalysis(slug) ? 0 : 1;
  });

program
  .command("scaffold")
  .description("4. create a template package from the skeleton (or from a previous version with --from)")
  .argument("<ref>", "<id>@<version>")
  .requiredOption("--name <name>", "display name")
  .option("--from <ref>", "copy an existing version, e.g. calm-ledger@0.1.0-rc.1")
  .action((ref: string, opts) => {
    const { id, version } = parseRef(ref);
    scaffold(id, version, opts);
  });

program
  .command("validate")
  .description("5. schema, required tokens, contrast and prompt-writing lint")
  .argument("<ref>")
  .action((ref: string) => {
    const { id, version } = parseRef(ref);
    process.exitCode = validate(id, version) ? 0 : 1;
  });

program
  .command("bundle")
  .description("build agent.md, tokens.css, tokens.json and the offline zip")
  .argument("<ref>")
  .action((ref: string) => {
    const { id, version } = parseRef(ref);
    bundle(id, version);
  });

program
  .command("baseline")
  .description("capture the unstyled base apps once (accessibility and style baseline)")
  .option("--force", "recapture")
  .action((opts) => baseline(!!opts.force));

program
  .command("generate")
  .description("6. let a coding agent apply the template to the base apps, then build and capture")
  .argument("<ref>")
  .option("--apps <apps...>", `subset of ${AppId.options.join(", ")}`)
  .option("--agent <agent>", "claude | codex (experimental)", "claude")
  .option("--concurrency <n>", "apps in parallel", "2")
  .option("--timeout <minutes>", "per-app agent timeout", "45")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    await generate(id, version, {
      apps: opts.apps?.map((a: string) => AppId.parse(a)),
      agent: opts.agent as Agent,
      concurrency: Number(opts.concurrency),
      timeoutMinutes: Number(opts.timeout),
    });
  });

program
  .command("evaluate")
  .description("7. hard gates, cross-app consistency and reference similarity for the latest runs")
  .argument("<ref>")
  .option("--skip-e2e", "skip the smoke tests (faster, not valid for publishing)")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    const report = await evaluate(id, version, { skipE2e: !!opts.skipE2e });
    process.exitCode = report.verdict === "fail" ? 1 : 0;
  });

program
  .command("critic")
  .description("7b. merge the design-critic's scores into the latest evaluation")
  .argument("<ref>")
  .argument("<file>", "critic JSON (CriticScores schema)")
  .action((ref: string, file: string) => {
    const { id, version } = parseRef(ref);
    mergeCritic(id, version, file);
  });

program
  .command("publish")
  .description("10. freeze a passing, human-approved version and export gallery assets")
  .argument("<ref>")
  .requiredOption("--approved-by <name>", "the person who approved the evaluation")
  .action((ref: string, opts) => {
    const { id, version } = parseRef(ref);
    publish(id, version, opts.approvedBy);
  });

program
  .command("check-all")
  .description("CI: validate every template and verify published versions are unchanged")
  .action(() => {
    process.exitCode = checkAll() ? 0 : 1;
  });

program
  .command("fixture")
  .description("write a content folder with one published test template (for e2e tests only)")
  .argument("<dir>")
  .action((dir: string) => makeFixture(dir));

await program.parseAsync(process.argv);
