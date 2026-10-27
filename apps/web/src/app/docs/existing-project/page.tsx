import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { Bloom, Note } from "@/components/details";
import { buildPrompt } from "@pigment/content/prompts";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta("Apply a system to an existing project", "Move a working product onto a Pigment design system screen by screen, without changing behavior, routes or tests.", "/docs/existing-project");

const STEPS = [
  ["Audit", "The agent maps your styling approach, shared components, routes and tests, and lists what the change would touch."],
  ["Plan, then wait for approval", "You get the affected areas, what will be preserved, and the order of work, and are asked whether your product is light only, dark only or both when the system has both. Nothing changes until you approve."],
  ["Bring in the tokens", "Tokens are mapped onto your existing variables and theme, then the first screen is restyled as a sample — and the agent stops again for review."],
  ["Restyle screen by screen", "One commit per screen, so any step can be reverted on its own. Layouts adapt to your information structure — they are never forced to match a reference image."],
  ["Keep the spec", "The whole spec goes into design-system/agent.md, downloaded unchanged, with the tokens and a VERSION file, and AGENTS.md and CLAUDE.md point at it — so the product keeps its design system after the migration."],
  ["Verify and report", "Build, tests and a visual pass. The report lists changed files, risks and anything left unfinished — then one optional question: may it star Pigment on GitHub? Only a yes does anything."],
] as const;

export default function ExistingProjectGuide() {
  return (
    <DocsShell
      current="/docs/existing-project"
      toc={[
        { id: "steps", label: "Steps" },
        { id: "prompt", label: "The prompt" },
        { id: "files", label: "What lands in your repo" },
      ]}
    >
      <Bloom size={300} style={{ right: -120, top: 10, opacity: 0.8 }} />
      <p className="meta" style={{ position: "relative" }}>
        Guides / Existing project
      </p>
      <h1 style={{ position: "relative" }}>Apply a system to an existing project</h1>
      <p className="lead" style={{ position: "relative" }}>
        Your product gets a design system of its own: the agent moves what you already have onto it, screen by screen, without touching routes, data flow
        or business logic. Expect a plan before any file changes.
      </p>

      <div className="panel" style={{ marginTop: 36, padding: "20px 22px" }}>
        <p style={{ margin: "0 0 12px", fontWeight: 600, color: "var(--ink)" }}>Before you start</p>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>Your working tree is clean, so every change can be reviewed and reverted.</li>
          <li>The project builds and its tests pass today.</li>
          <li>
            Your agent is <Link href="/connect">connected over MCP</Link>, or you have the spec URL from the system page.
          </li>
        </ul>
      </div>

      <h2 id="steps">Steps</h2>
      <ol className="steps">
        {STEPS.map(([title, text], i) => (
          <li key={title}>
            <span className="mono meta" style={{ paddingTop: 3 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <strong>{title}</strong>
              <span style={{ display: "block", marginTop: 6 }}>{text}</span>
            </span>
          </li>
        ))}
      </ol>

      <div style={{ position: "relative", marginTop: 32 }}>
        <div className="callout">
          <p style={{ fontWeight: 600, color: "var(--ink)" }}>Two approval points</p>
          <p>The agent pauses after the plan (step 02) and after the first restyled screen (step 03). After that it works screen by screen without stopping.</p>
        </div>
        <Note arrow="left" arrowFirst style={{ right: -150, top: 4 }}>
          <span>
            you stay
            <br />
            in control
          </span>
        </Note>
      </div>

      <h2 id="prompt">The prompt</h2>
      <pre className="code" style={{ whiteSpace: "pre-wrap" }}>{buildPrompt("<system>", "existing", "url")}</pre>
      <p className="meta">Copy it ready-made from any system page.</p>

      <h2 id="files">What lands in your repo</h2>
      <pre className="code code--light">
        {`design-system/
├── agent.md          `}
        <span style={{ color: "var(--ink-4)" }}>the whole spec, kept for every later session</span>
        {`
├── tokens.css        `}
        <span className="c" style={{ color: "var(--ink-4)" }}>
          CSS variables, light and dark
        </span>
        {`
├── tokens.json       `}
        <span style={{ color: "var(--ink-4)" }}>machine-readable source</span>
        {`
├── components.md     `}
        <span style={{ color: "var(--ink-4)" }}>conventions your agent follows</span>
        {`
└── VERSION           `}
        <span style={{ color: "var(--ink-4)" }}>the system and the date of this copy</span>
        {`
AGENTS.md             `}
        <span style={{ color: "var(--ink-4)" }}>one line pointing at design-system/agent.md</span>
        {`
CLAUDE.md             `}
        <span style={{ color: "var(--ink-4)" }}>same pointer, for Claude Code</span>
      </pre>
      <p>That pointer is what keeps future screens on-system: every new session reads it before building UI.</p>

      <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 14 }}>
        <Link href="/docs/new-project">← New project</Link>
        <Link href="/docs/ongoing" style={{ fontWeight: 500 }}>
          Ongoing development →
        </Link>
      </div>
    </DocsShell>
  );
}
