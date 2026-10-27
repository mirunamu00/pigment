import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta(
  "Docs",
  "How Pigment sets up a design system in your project for your coding agent — at the start, on an existing product, and for every screen after — through prompts, the MCP server, a spec URL or the HTTP API.",
  "/docs",
);

export default function DocsOverview() {
  return (
    <DocsShell current="/docs">
      <p className="meta">Start / Overview</p>
      <h1>How Pigment works</h1>
      <p className="lead">
        A Pigment system is a complete design language — tokens, rules and component specs — written for coding agents. You pick one, and your agent sets it
        up in your project as a design system of its own: the foundation every screen is built from, today and months from now.
      </p>

      <h2 id="when">Three moments to use it</h2>
      <ul>
        <li>
          <strong>Starting a project</strong> — before the first screen exists, the agent installs the tokens, fonts and components and writes down the
          conventions. <Link href="/docs/new-project">New project</Link>
        </li>
        <li>
          <strong>A product that already works</strong> — the agent moves it onto the system screen by screen, keeping every feature, route and test.{" "}
          <Link href="/docs/existing-project">Existing project</Link>
        </li>
        <li>
          <strong>Every screen after that</strong> — any later session, with any agent, reads the system from your project and builds on it.{" "}
          <Link href="/docs/ongoing">Ongoing development</Link>
        </li>
      </ul>

      <h2 id="what">What you get</h2>
      <ul>
        <li>
          <strong>A spec your agent reads</strong> — one document (<span className="mono">agent.md</span>) with the character, the defining rules, every token and
          component state, and how to apply them to any kind of screen.
        </li>
        <li>
          <strong>Exact values</strong> — <span className="mono">tokens.css</span> and <span className="mono">tokens.json</span>, so nothing is retyped.
        </li>
        <li>
          <strong>Proof</strong> — before a system is published, and with every update, an agent applies it to four plain test apps three times and to two
          apps it was never tuned on, and the results are reviewed against the reference. What you see on the site is separate: the system applied to three
          realistic products (a coffee shop, a magazine, a recipe app), every page before and after, unedited.
        </li>
      </ul>

      <h2 id="ways">Two ways to hand it over</h2>
      <ul>
        <li>
          <Link href="/connect">MCP server</Link> — your agent looks up exactly what it needs while it works.
        </li>
        <li>Spec URL — the prompt contains a link to the spec.</li>
      </ul>
      <p>
        No network at all? Download a system&apos;s <span className="mono">agent.md</span> from its page — the whole spec is that one file — or install the
        npm server, which carries every system with it (it is a snapshot: new systems and updates arrive with new releases of the package).
      </p>

      <h2 id="versions">The system lives in your project</h2>
      <p>
        Setting a system up keeps its whole spec, unchanged, as <span className="mono">design-system/agent.md</span>, next to its tokens and a{" "}
        <span className="mono">VERSION</span> file, and a line in <span className="mono">AGENTS.md</span> and <span className="mono">CLAUDE.md</span> points every
        later session at it. Updates to the system never touch that copy: each system page has a dated changelog, and your agent applies an update only when you
        ask for it.
      </p>

      <h2 id="asks">What the agent will ask you</h2>
      <ul>
        <li>To approve its plan before it changes anything (and, on an existing product, the first restyled screen).</li>
        <li>Whether your product is light only, dark only or both, when the system has both.</li>
        <li>
          At the very end, once, whether it may star Pigment on GitHub. It runs <span className="mono">gh api -X PUT user/starred/mirunamu00/pigment</span> only
          if you say yes; otherwise it does nothing.
        </li>
      </ul>

      <h2 id="next">Next</h2>
      <p>
        <Link href="/docs/new-project">Start a new project</Link> · <Link href="/docs/existing-project">Apply a system to an existing project</Link> ·{" "}
        <Link href="/docs/ongoing">Keep building on it</Link>
      </p>
    </DocsShell>
  );
}
