import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { Bloom } from "@/components/details";
import { MeasureScene, ProjectScene, ShowcaseScene, SpecScene, SurveyScene, TestScene } from "@/components/how-scenes";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta(
  "How it's made",
  "How a Pigment design system is made: a reference site surveyed and measured, a spec written as rules, tested by agents on plain apps until it holds, shown on real products, and kept in your project.",
  "/how",
);

const STEPS: Array<{ title: string; body: ReactNode; scene: ReactNode }> = [
  {
    title: "Study a site people love",
    body: (
      <>
        A harness surveys a reference site — up to 150 pages — until it stops finding anything new, then captures in depth the pages that together cover
        every feature: screenshots, styles, motion, interactions and illustrations.
      </>
    ),
    scene: <SurveyScene />,
  },
  {
    title: "Measure the language, leave the brand",
    body: (
      <>
        An analyst agent turns the captures into measured values — colors, type, spacing, shape, motion — and the signature elements that make the site look
        like itself, each with a recipe. Logos, names, copy, characters and proprietary fonts never carry over: the result is a derived language, not a clone.
      </>
    ),
    scene: <MeasureScene />,
  },
  {
    title: "Write it as rules",
    body: (
      <>
        The spec, <span className="mono">agent.md</span>, is written for coding agents: ten defining rules, a Never list, exact tokens, every component state,
        and how to apply the system to any kind of screen — dashboards, forms, tables, empty and error states — for products it has never seen.
      </>
    ),
    scene: <SpecScene />,
  },
  {
    title: "Test it until it holds",
    body: (
      <>
        A coding agent applies each candidate to four plain test apps, three times, and to two apps it was never tuned on. The apps must build and pass their
        tests, and a review scores how close the results come to the reference&apos;s quality. Every fix is written as a general rule — never for the test
        apps — and the candidate is tried again until it passes.
      </>
    ),
    scene: <TestScene />,
  },
  {
    title: "Show it on real products",
    body: (
      <>
        Once published, the system is applied by an agent to three realistic products with their own design and photos — a coffee shop, a magazine, a recipe
        app. That is what you see on every system page: every page, before and after, unedited.
      </>
    ),
    scene: <ShowcaseScene />,
  },
  {
    title: "Kept in your project",
    body: (
      <>
        When your agent sets a system up — at the start of a project or on one that already works — the whole spec stays in your project as{" "}
        <span className="mono">design-system/agent.md</span>, and AGENTS.md and CLAUDE.md point at it. Any later session, with any agent, builds new screens
        from it. We test that too: a fresh session with no memory of the setup builds screens from what the project kept.
      </>
    ),
    scene: <ProjectScene />,
  },
];

export default function HowPage() {
  return (
    <>
      <SiteHeader active="how" />
      <main className="page how-page">
        <Bloom size={680} style={{ right: -220, top: -40 }} />
        <div className="how-page__intro">
          <p className="eyebrow">How it&apos;s made</p>
          <h1>From a site people love to a system your agent follows.</h1>
          <p className="lead">
            Every Pigment system goes through the same pipeline before it is published, and again with every update. A person approves the analysis and the
            result; agents do the rest, and every step leaves its evidence behind.
          </p>
        </div>
        <ol className="how-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="how-step">
              <div className="how-step__text">
                <span className="mono meta">{String(i + 1).padStart(2, "0")}</span>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
              <div className="how-step__scene">{s.scene}</div>
            </li>
          ))}
        </ol>
        <div className="how-page__end">
          <Link href="/" className="btn btn--primary btn--lg">
            Browse systems
          </Link>
          <Link href="/docs" className="btn btn--lg">
            Read the docs
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
