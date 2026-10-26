#!/usr/bin/env node
import { Command } from "commander";
import { RunAppId } from "@pigment/schema";
import { parseRef, rel } from "./paths.ts";
import { directionFile } from "./budget.ts";
import { ok, writeJson } from "./util.ts";
import { bundle } from "./commands/bundle.ts";
import { calibrate } from "./commands/calibrate.ts";
import { capture } from "./commands/capture.ts";
import { authorBrief } from "./commands/author-brief.ts";
import { checkAnalysis } from "./commands/check-analysis.ts";
import { criticBrief } from "./commands/critic-brief.ts";
import { evaluate, mergeCritic } from "./commands/evaluate.ts";
import { makeFixture } from "./commands/fixture.ts";
import { baseline, generate, reshoot, type Agent } from "./commands/generate.ts";
import { intake } from "./commands/intake.ts";
import { checkAll, publish } from "./commands/publish.ts";
import { review } from "./commands/review.ts";
import { scaffold } from "./commands/scaffold.ts";
import { exportOriginals, exportShowcase, reshootShowcase, showcase, showcaseOriginals } from "./commands/showcase.ts";
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
  .option("--after-pass", "run although a candidate already passed — only when the user asked for it")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    await generate(id, version, {
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
  .command("showcase")
  .description("gallery: a coding agent applies a published system to each showcase product (showcase/products) — never scored")
  .argument("[ref]", "a published <id>@<version>; omit with --originals")
  .option("--products <products...>", "subset of the products")
  .option("--originals", "capture the products as they are (the before), no agent")
  .option("--export", "only copy the latest captures to the site (apps/web/public/products), no agent")
  .option("--carry-from <version>", "with --export: a metadata-only version shows this version's runs")
  .option("--reshoot", "build and capture the latest runs again, without the agent (a build or capture that failed outside its work)")
  .option("--agent <agent>", "claude | codex (experimental)", "claude")
  .option("--timeout <minutes>", "per-product agent timeout", "75")
  .action(async (ref: string | undefined, opts) => {
    if (opts.originals && opts.export) return exportOriginals(opts.products);
    if (opts.originals) return showcaseOriginals(opts.products);
    if (!ref) throw new Error("give a published <id>@<version>, or --originals");
    const { id, version } = parseRef(ref);
    if (opts.export) return exportShowcase(id, version, opts.products, opts.carryFrom);
    if (opts.reshoot) return reshootShowcase(id, version, opts.products);
    await showcase(id, version, { products: opts.products, agent: opts.agent as Agent, timeoutMinutes: Number(opts.timeout) });
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
  .option("--holdout", "evaluate the holdout apps (the final check, after the main apps passed the confirm)")
  .option("--apps <apps...>", "evaluate only these apps")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    const report = await evaluate(id, version, {
      skipE2e: !!opts.skipE2e,
      samples: Number(opts.samples),
      apps: opts.apps?.map((a: string) => RunAppId.parse(a)),
      holdout: !!opts.holdout,
    });
    process.exitCode = report.verdict === "fail" ? 1 : 0;
  });

program
  .command("author-brief")
  .description("8. write the prompt-author's assignment for the next candidate from the latest failed evaluation")
  .argument("<ref>", "the candidate that failed")
  .requiredOption("--next <version>", "the candidate to write, e.g. 0.1.0-rc.2")
  .option("--direction <words>", "the user's answer at the direction check, in their words, when they turned the screen down")
  .action((ref: string, opts) => {
    const { id, version } = parseRef(ref);
    authorBrief(id, version, opts.next, opts.direction);
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
  .command("review")
  .description("7. review every checklist item of the latest evaluation (reviewers run by the harness), then settle the verdict")
  .argument("<ref>")
  .option("--holdout", "review the holdout evaluation (only after the main apps passed the confirm)")
  .option("--concurrency <n>", "reviewers in parallel", "6")
  .action(async (ref: string, opts) => {
    const { id, version } = parseRef(ref);
    await review(id, version, { holdout: !!opts.holdout, concurrency: Number(opts.concurrency) });
  });

program
  .command("calibrate")
  .description("8c. run the review on candidates the user already judged (showcase/calibration.json) and report whether it agrees")
  .option("--case <ref>", "one case only")
  .action(async (opts) => {
    const agrees = await calibrate(opts.case);
    if (!agrees) process.exitCode = 1;
  });

program
  .command("direction")
  .description("8b. record the user's approval of a screened candidate's direction against the reference (before the confirm)")
  .argument("<ref>")
  .requiredOption("--approved-by <name>", "the person who looked at review-*/direction.html and approved it")
  .option("--note <text>", "what they said")
  .action((ref: string, opts) => {
    const { id, version } = parseRef(ref);
    const file = directionFile(id, version);
    writeJson(file, { approvedBy: opts.approvedBy, at: new Date().toISOString(), ...(opts.note ? { note: opts.note } : {}) });
    ok(`direction approved for ${id}@${version} by ${opts.approvedBy} → ${rel(file)}`);
  });

program
  .command("critic")
  .description("7b. merge a critic file into the latest evaluation of its scope and settle the verdict")
  .argument("<ref>")
  .argument("<file>", "critic JSON (CriticScores schema)")
  .option("--holdout", "the critic file judges the holdout evaluation")
  .option(
    "--override <change...>",
    'change one finding\'s severity, recorded with its reason: "<phrase from its summary>=<blocker|major|minor>=<reason>"',
  )
  .action((ref: string, file: string, opts) => {
    const { id, version } = parseRef(ref);
    const overrides = ((opts.override as string[] | undefined) ?? []).map((o) => {
      const [match, to, ...reason] = o.split("=");
      if (!match || !to || !["blocker", "major", "minor"].includes(to)) throw new Error(`--override "${o}": expected "<phrase>=<severity>=<reason>"`);
      return { match, to: to as "blocker" | "major" | "minor", reason: reason.join("=") };
    });
    mergeCritic(id, version, file, { holdout: !!opts.holdout, overrides });
  });

program
  .command("publish")
  .description("10. freeze a passing, human-approved version (then: pnpm harness showcase)")
  .argument("<ref>")
  .requiredOption("--approved-by <name>", "the person who approved the evaluation")
  .option("--carry-from <version>", "reuse the evaluation and screenshots of the passing candidate this version was scaffolded from, or of a published version for a name/description change; refused if any design file differs")
  .option("--accept-stage <reason>", "the person ships a candidate that passed the screen but not the confirm or holdout check; the reason is recorded")
  .action((ref: string, opts) => {
    const { id, version } = parseRef(ref);
    publish(id, version, opts.approvedBy, opts.carryFrom, opts.acceptStage);
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
