import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta("Start a new project", "Start a new project on a Pigment design system: install tokens, set up the base styles and build every screen on-system.", "/docs/new-project");

export default function NewProjectGuide() {
  return (
    <DocsShell current="/docs/new-project">
      <p className="meta">Guides / New project</p>
      <h1>Start a new project with a system</h1>
      <p className="lead">Install the system before the first screen exists, and every screen your agent builds starts on-system.</p>

      <h2 id="steps">Steps</h2>
      <ol className="steps">
        {[
          ["Inspect and plan", "The agent checks your framework and styling setup and proposes how to install the system. You approve the plan."],
          ["Install tokens and fonts", "tokens.css (or tokens.json mapped into your theme) and the fonts with their fallbacks."],
          ["Build the base components", "Every component in the spec, with every specified state."],
          ["Keep the spec", "A design-system/ folder with the whole spec as agent.md, and one line in AGENTS.md and CLAUDE.md, so every later session reads it."],
        ].map(([title, text], i) => (
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
      <p style={{ marginTop: 32 }}>
        Copy the prompt from any system page with <em>New</em> selected. <Link href="/docs/ongoing">Then keep building →</Link>
      </p>
    </DocsShell>
  );
}
