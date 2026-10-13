import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = { title: "Ongoing development" };

export default function OngoingGuide() {
  return (
    <DocsShell current="/docs/ongoing">
      <p className="meta">Guides / Ongoing development</p>
      <h1>Keep new screens on-system</h1>
      <p className="lead">Once a system is installed, the pointer in AGENTS.md and CLAUDE.md makes every new session read design-system/ before building UI.</p>

      <h2 id="rules">What your agent does</h2>
      <ul>
        <li>Uses semantic tokens and existing components; never hard-codes colors, sizes, radii or shadows.</li>
        <li>Composes what the system does not cover from existing tokens, and notes it in design-system/components.md.</li>
        <li>Asks you with options when a request conflicts with the system.</li>
      </ul>

      <h2 id="upgrade">Upgrading</h2>
      <p>
        Your project stays on the version it installed. To upgrade, ask your agent to apply the new version as an existing-project change: it reads the
        changelog, proposes what to adopt, and waits for your approval.
      </p>
    </DocsShell>
  );
}
