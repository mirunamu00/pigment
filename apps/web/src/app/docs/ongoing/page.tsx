import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { buildPrompt } from "@pigment/content/prompts";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = pageMeta("Ongoing development", "Every later session, with any agent, builds new screens from the design system kept in your project.", "/docs/ongoing");

export default function OngoingGuide() {
  return (
    <DocsShell current="/docs/ongoing">
      <p className="meta">Guides / Ongoing development</p>
      <h1>Keep new screens on-system</h1>
      <p className="lead">Once a system is installed, the pointer in AGENTS.md and CLAUDE.md makes every new session read design-system/agent.md, the whole spec kept in your project, before building UI.</p>

      <h2 id="rules">What your agent does</h2>
      <ul>
        <li>Uses semantic tokens and existing components; never hard-codes colors, sizes, radii or shadows.</li>
        <li>Gives every new screen the signature pieces its kind of screen calls for, as the spec&apos;s Applying the concept says.</li>
        <li>Composes what the system does not cover from existing tokens and components, and notes it in design-system/components.md.</li>
        <li>Asks you with options when a request conflicts with the system.</li>
      </ul>

      <h2 id="prompt">The prompt</h2>
      <p>With the pointer in place you can just ask for a screen. To be explicit:</p>
      <pre className="code" style={{ whiteSpace: "pre-wrap" }}>{buildPrompt("<system>", "ongoing", "url")}</pre>

      <h2 id="upgrade">Updating</h2>
      <p>
        Your project keeps the copy it installed. When the system is updated, its page shows a dated changelog. Ask your agent to update: it reads the
        changelog entries dated after design-system/VERSION, proposes what to adopt, waits for your approval, then replaces
        design-system/agent.md with the current spec and writes the new date.
      </p>
    </DocsShell>
  );
}
