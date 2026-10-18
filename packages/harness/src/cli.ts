#!/usr/bin/env node
import { Command } from "commander";
import { RunAppId } from "@pigment/schema";
import { parseRef } from "./paths.ts";
import { bundle } from "./commands/bundle.ts";
import { capture } from "./commands/capture.ts";
import { checkAnalysis } from "./commands/check-analysis.ts";
import { criticBrief } from "./commands/critic-brief.ts";
import { evaluate, mergeCritic } from "./commands/evaluate.ts";
import { makeFixture } from "./commands/fixture.ts";
import { baseline, generate, reshoot, type Agent } from "./commands/generate.ts";
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
  .option("--notes <text>", "optional: the submitter's own words about the site — a hint for the analyst, never required or guessed")
  .action((slug: string, urls: string[], opts) => intake(slug, urls, opts));

program
  .command("capture")
  .description("2. survey the site, then capture the selected pages: screenshots, styles, motion, interactions, illustrations")
  .argument("<slug>")
  .option("--max-pages <n>", "most pages to survey (robots.txt is respected)", "150")
  .option("--patience <n>", "once this many pages in a row add no new feature, open only unseen page types, then stop", "20")
  .option("--deep <n>", "pages to capture in depth, chosen so every surveyed feature is covered", "16")
  .option("--no-survey", "capture only the given pages")
  .option("--headed", "show the browser")
  .action((slug: string, opts) => capture(slug, { headed: opts.headed, survey: opts.survey, maxPages: Number(opts.maxPages), patience: Number(opts.patience), deep: Number(opts.deep) }));

program
  .command("check-analysis")
  .description("3. check the analyst's output: schema, every audit area, evidence files, survey consistency")
  .argument("<slug>")
  .action(async (slug: string) => {
    process.exitCode = (await checkAnalysis(slug)) ? 0 : 1;
  });

program
  .command("scaffold")
  .description("4. create a template package from the skeleton (or from a previous version with --from)")
  .argument("<ref>", "<id>@<version>")
  .requiredOption("--name <name>", "display name")
  .option("--from <ref>", "copy an existing version, e.g. calm-ledger@0.1.0-rc.1")
  .option("--after-pass", "make a candidate although one in the family already passed — only when the user asked for it")
  .option("--past-cap", "make a candidate past the iteration cap — only when the user asked for it")
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
  .option("--apps <apps...>", "subset of the main apps (dashboard, commerce, blog, settings)")
  .option("--holdout", "also run each holdout app once — for the confirm step only")
  .option("--agent <agent>", "claude | codex (experimental)", "claude")
  .option("--concurrency <n>", "apps in parallel (one sample of four apps runs in one wave at 4)", "4")
  .option("--timeout <minutes>", "per-app agent timeout", "45")
  .option("--samples <n>", "independent runs per app (judge the prompt, not one lucky or unlucky run)", "1")
  .option("--over-budget", "run although the version family's budget would be exceeded — only when the user agreed to the cost")
  .option("--after-pass", "run although a candidate already passed — only when the user asked for it")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    await generate(id, version, {
      overBudget: !!opts.overBudget,
      afterPass: !!opts.afterPass,
      apps: opts.apps?.map((a: string) => RunAppId.parse(a)),
      holdout: !!opts.holdout,
      agent: opts.agent as Agent,
      concurrency: Number(opts.concurrency),
      timeoutMinutes: Number(opts.timeout),
      samples: Number(opts.samples),
    });
  });

program
  .command("reshoot")
  .description("6b. capture the latest runs again with the current capture code (no agent run)")
  .argument("<ref>")
  .option("--apps <apps...>", "subset of the apps (main and holdout)")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    await reshoot(id, version, opts.apps?.map((a: string) => RunAppId.parse(a)));
  });

program
  .command("evaluate")
  .description("7. hard gates, cross-app consistency and reference similarity for the latest runs")
  .argument("<ref>")
  .option("--skip-e2e", "skip the smoke tests (faster, not valid for publishing)")
  .option("--samples <n>", "evaluate the latest n runs of each app; every gate must pass in every sample", "1")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    const report = await evaluate(id, version, { skipE2e: !!opts.skipE2e, samples: Number(opts.samples) });
    process.exitCode = report.verdict === "fail" ? 1 : 0;
  });

program
  .command("critic-brief")
  .description("7a. write the design-critic's assignment for the latest evaluation (give it to the agent verbatim)")
  .argument("<ref>")
  .action((ref: string) => {
    const { id, version } = parseRef(ref);
    criticBrief(id, version);
  });

program
  .command("critic")
  .description("7b. merge the design-critic's findings into the latest evaluation and settle the verdict")
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
  .option("--carry-from <version>", "reuse the evaluation and screenshots of the passing candidate this version was scaffolded from, or of a published version for a name/description change; refused if any design file differs")
  .action((ref: string, opts) => {
    const { id, version } = parseRef(ref);
    publish(id, version, opts.approvedBy, opts.carryFrom);
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
