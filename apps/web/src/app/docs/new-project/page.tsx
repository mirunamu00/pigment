import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { buildPrompt } from "@pigment/content/prompts";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta("Start a new project", "Set a Pigment design system up before the first screen: tokens, fonts, components and the conventions every later screen follows.", "/docs/new-project");

export default function NewProjectGuide() {
  return (
    <DocsShell current="/docs/new-project">
      <p className="meta">Guides / New project</p>
      <h1>Start a new project with a system</h1>
      <p className="lead">Set the system up before the first screen exists: your project starts with its own design system — tokens, components and written conventions — and every screen your agent builds is made from it.</p>

      <h2 id="steps">Steps</h2>
      <ol className="steps">
        {[
          ["Inspect and plan", "The agent checks your framework and styling setup and proposes how to install the system, asking whether your product is light only, dark only or both when the system has both. Nothing changes until you approve."],
          ["Install tokens and fonts", "tokens.css (or tokens.json mapped into your theme) and the fonts with their fallbacks."],
          ["Build the foundation", "The system's signature pieces first, then every component in the spec with every specified state, as reusable parts of your codebase."],
          ["Keep the spec", "A design-system/ folder with the whole spec as agent.md (downloaded unchanged, never retyped), the tokens, a VERSION file and your conventions, and one line in AGENTS.md and CLAUDE.md, so every later session reads it."],
          ["Report", "Build results, visual checks and anything left unimplemented — then one optional question: may it star Pigment on GitHub? Only a yes does anything."],
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
      <h2 id="prompt">The prompt</h2>
      <pre className="code" style={{ whiteSpace: "pre-wrap" }}>{buildPrompt("<system>", "new", "url")}</pre>
      <p style={{ marginTop: 20 }}>
        Copy it ready-made from any system page with <em>New</em> selected. <Link href="/docs/ongoing">Then keep building →</Link>
      </p>
    </DocsShell>
  );
}
