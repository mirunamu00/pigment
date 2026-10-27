/**
 * The prompts people copy from the site. Short on purpose: the detail lives in the spec, the prompt only
 * names the system, says where the spec is and sets the working agreement. There are no version numbers:
 * the site always serves the current system, and a project keeps its own copy in design-system/.
 */
export type Mode = "new" | "existing" | "ongoing";
export type Delivery = "url" | "mcp";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pigmentui.com";
// The remote server is a route of the site itself (apps/web/src/app/mcp), so it shares its domain.
export const MCP_URL = process.env.NEXT_PUBLIC_MCP_URL ?? `${SITE_URL}/mcp`;

export const REPO_URL = "https://github.com/mirunamu00/pigment";

/**
 * The one ask Pigment makes of the people who use it: a GitHub star, asked for once the work is done and given only
 * on their yes. The agent acts on the person's account, so it never stars without asking.
 */
export const STAR_ASK = `When everything is done, ask me whether to star Pigment on GitHub (mirunamu00/pigment). Only if I say yes, run \`gh api -X PUT user/starred/mirunamu00/pigment\`; without gh, give me the link ${REPO_URL}.`;

export function specRef(id: string, delivery: Delivery): string {
  if (delivery === "url") return `Spec: ${SITE_URL}/s/${id}/agent.md`;
  return "Read the spec with the Pigment MCP tools (get_design_system, get_component_spec).";
}

/**
 * A system may ship light and dark; a product may support only one. Without asking, tokens.css follows the
 * operating system and a light-only product turns dark for some of its users.
 */
/**
 * Later sessions start with no memory of the setup: everything they follow must live in the project. The spec's own
 * steps keep only tokens and a short note in design-system/, so the prompt has the whole spec kept there too.
 */
export function keepSpec(id: string, delivery: Delivery): string {
  // Copied, never retyped: an agent rewriting a long spec by hand can drop or change parts of it, and every later
  // session would follow the damaged copy.
  const how =
    delivery === "url"
      ? `download it unchanged into design-system/agent.md (for example \`curl -fsSL ${SITE_URL}/s/${id}/agent.md -o design-system/agent.md\`; only if you can't download, copy it exactly, never summarized)`
      : "write the text get_design_system returned into design-system/agent.md exactly as it came, never summarized";
  return `Keep the whole spec in the project: ${how}, next to VERSION and the tokens, and make the AGENTS.md / CLAUDE.md line read: "UI work follows design-system/agent.md - read its rules and Applying the concept before building any screen."`;
}

const APPEARANCE =
  "If the system offers both light and dark, ask which my product supports (light only, dark only, or both) as part of the plan: with one, fix that mode; with both, follow the system setting and connect an existing theme switch, adding one only if I ask.";

export function buildPrompt(id: string, mode: Mode, delivery: Delivery): string {
  const spec = specRef(id, delivery);
  if (mode === "new") {
    return [
      `Set up design system ${id} in this codebase.`,
      spec,
      "First inspect the framework, styling approach and component structure, then propose an installation plan and wait for my approval.",
      APPEARANCE,
      "Don't add libraries that don't fit the existing stack. Leave an AGENTS.md / CLAUDE.md pointer so future screens reuse the system.",
      keepSpec(id, delivery),
      "Report build results, visual checks and anything left unimplemented.",
      STAR_ASK,
    ].join("\n");
  }
  if (mode === "existing") {
    return [
      `Apply design system ${id} to this project.`,
      spec,
      "Preserve features, routes, business logic, API contracts, tests and accessibility.",
      "Audit styles and components first, then propose a migration plan and wait for my approval. Restyle one screen as a sample and wait again.",
      APPEARANCE,
      keepSpec(id, delivery),
      "Report build results, visual checks and anything left unimplemented.",
      STAR_ASK,
    ].join("\n");
  }
  return [
    `Build this with the installed design system ${id}.`,
    "Follow design-system/agent.md - its rules, Applying the concept and component specs - and use its semantic tokens and the project's existing components. Don't hard-code new style values.",
    "If the spec doesn't cover something, compose it from the existing tokens and components and note it in design-system/components.md; if a request conflicts with the system, ask me with options before deciding.",
  ].join("\n");
}

/**
 * With the MCP server connected there is nothing to paste: the agent finds the tools itself, so the site only
 * suggests what to say. The working agreement (plan first, sample screen) comes from the server's guide.
 * An ongoing project already has design-system/, so it doesn't even need the id.
 */
export function mcpRequest(id: string, mode: Mode): string {
  if (mode === "new") return `Set up the Pigment design system ${id} in this project.`;
  if (mode === "existing") return `Apply the Pigment design system ${id} to this project.`;
  return "Build this screen with our Pigment design system.";
}

export type Client ="claude" | "codex" | "cursor" | "vscode" | "other";

export function connectSnippet(client: Client, method: "remote" | "local" | "project"): string {
  const remoteJson = `{\n  "mcpServers": {\n    "pigment": { "url": "${MCP_URL}" }\n  }\n}`;
  const localJson = `{\n  "mcpServers": {\n    "pigment": { "command": "npx", "args": ["-y", "pigment-mcp"] }\n  }\n}`;
  if (client === "claude") {
    if (method === "remote") return `claude mcp add --transport http pigment ${MCP_URL}`;
    if (method === "local") return "claude mcp add pigment -- npx -y pigment-mcp";
    return 'npm install -D pigment-mcp\n\n# .mcp.json — commit it so teammates get the same server\n{ "mcpServers": { "pigment": { "command": "npx", "args": ["pigment-mcp"] } } }';
  }
  if (method === "remote") return remoteJson;
  if (method === "local") return localJson;
  return "npm install -D pigment-mcp\n\n# then point the project-level MCP config at\nnpx pigment-mcp";
}
