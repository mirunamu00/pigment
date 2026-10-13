/**
 * The prompts people copy from the site. Short on purpose: the detail lives in the spec, the prompt only
 * pins the version, says where the spec is and sets the working agreement.
 */
export type Mode = "new" | "existing" | "ongoing";
export type Delivery = "url" | "mcp" | "offline";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pigmentui.com";
// The remote server is a route of the site itself (apps/web/src/app/mcp), so it shares its domain.
export const MCP_URL = process.env.NEXT_PUBLIC_MCP_URL ?? `${SITE_URL}/mcp`;

export function specRef(id: string, version: string, delivery: Delivery): string {
  if (delivery === "url") return `Spec: ${SITE_URL}/s/${id}/${version}/agent.md`;
  if (delivery === "mcp") return "Read the spec with the Pigment MCP tools (get_design_system, get_component_spec).";
  return `Spec: ./design-packages/${id}-${version}/dist/agent.md`;
}

export function buildPrompt(id: string, version: string, mode: Mode, delivery: Delivery): string {
  const ref = `${id}@${version}`;
  const spec = specRef(id, version, delivery);
  if (mode === "new") {
    return [
      `Set up design system ${ref} in this codebase.`,
      spec,
      "First inspect the framework, styling approach and component structure, then propose an installation plan and wait for my approval.",
      "Don't add libraries that don't fit the existing stack. Leave an AGENTS.md / CLAUDE.md pointer so future screens reuse the system.",
      "Report build results, visual checks and anything left unimplemented.",
    ].join("\n");
  }
  if (mode === "existing") {
    return [
      `Apply design system ${ref} to this project.`,
      spec,
      "Preserve features, routes, business logic, API contracts, tests and accessibility.",
      "Audit styles and components first, then propose a migration plan and wait for my approval. Restyle one screen as a sample and wait again.",
      "Report build results, visual checks and anything left unimplemented.",
    ].join("\n");
  }
  return [
    `Build this with the installed design system ${ref}.`,
    "Use its semantic tokens and component conventions from design-system/. Don't hard-code new style values.",
    "If the spec doesn't cover something, ask me with options before deciding.",
  ].join("\n");
}

/**
 * With the MCP server connected there is nothing to paste: the agent finds the tools itself, so the site only
 * suggests what to say. The working agreement (plan first, sample screen) comes from the server's guide.
 */
export function mcpRequest(id: string, mode: Mode, version?: string): string {
  // No version: the agent takes the latest and records it in design-system/VERSION. An ongoing project
  // already has that file, so it never needs the id either.
  const ref = version ? `${id}@${version}` : id;
  if (mode === "new") return `Set up the Pigment design system ${ref} in this project.`;
  if (mode === "existing") return `Apply the Pigment design system ${ref} to this project.`;
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
