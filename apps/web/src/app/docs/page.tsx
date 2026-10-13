import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta("Docs", "How Pigment design systems are delivered to coding agents: prompts, the MCP server, a spec URL and the HTTP API.", "/docs");

export default function DocsOverview() {
  return (
    <DocsShell current="/docs">
      <p className="meta">Start / Overview</p>
      <h1>How Pigment works</h1>
      <p className="lead">
        A Pigment system is a complete design language — tokens, rules and component specs — written for coding agents. You pick one, your agent
        applies it to your codebase, and every screen it builds afterwards follows the same rules.
      </p>

      <h2 id="what">What you get</h2>
      <ul>
        <li>
          <strong>A spec your agent reads</strong> — one document (<span className="mono">agent.md</span>) with the character, the defining rules, every token and
          component state.
        </li>
        <li>
          <strong>Exact values</strong> — <span className="mono">tokens.css</span> and <span className="mono">tokens.json</span>, so nothing is retyped.
        </li>
        <li>
          <strong>Proof</strong> — every system is applied by an agent to four real apps before it is published, and again with every update. The screenshots in the gallery are that output,
          unedited.
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
        npm server, which carries every system with it.
      </p>

      <h2 id="versions">Your copy never changes under you</h2>
      <p>
        Applying a system copies its tokens and rules into your project&apos;s <span className="mono">design-system/</span> folder. Updates to the system never
        touch that copy: each system page has a dated changelog, and your agent applies an update only when you ask for it.
      </p>

      <h2 id="next">Next</h2>
      <p>
        <Link href="/docs/existing-project">Apply a system to an existing project</Link> · <Link href="/docs/new-project">Start a new project</Link>
      </p>
    </DocsShell>
  );
}
