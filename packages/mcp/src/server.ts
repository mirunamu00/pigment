import { McpServer } from "@modelcontextprotocol/server";
import { ContentError, getAgentMd, getComponents, getComponentSpec, getGuide, getHistory, getShots, getTokenFile, listTemplates } from "@pigment/content";
import { buildPrompt, SITE_URL } from "@pigment/content/prompts";
import { z } from "zod";
import pkg from "../package.json" with { type: "json" };

export const SERVER_VERSION = pkg.version;

// Systems have no user-facing versions: every tool serves the current system. Releases stay immutable
// internally (content/templates/<id>/<version>), but agents and people only ever see update dates.
const CURRENT = "latest";

const id = z.string().describe("Design system id (see list_design_systems)");
const mode = z.enum(["new", "existing", "ongoing"]);

// Sent to the client at connection time; most hosts put it in the agent's context.
const INSTRUCTIONS = [
  "Pigment serves design systems for coding agents. Every tool returns the current system; there is nothing to choose or pin.",
  "Applying a system copies it into the project's design-system/ folder (tokens, component notes and a VERSION file naming the system and its update date).",
  "If the system offers both light and dark, ask the user which their product supports (light only, dark only, or both) before applying it: with one, fix that mode; with both, follow the system setting and connect an existing theme switch, adding one only if asked.",
  "From then on design-system/ is the project's source of truth: build new screens from it and don't re-fetch tokens unless the user asks to update.",
  "To update, call get_changelog, apply only the entries dated after the date in design-system/VERSION, and then write the new date.",
].join("\n");

type ToolResult = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

function text(body: string): ToolResult {
  return { content: [{ type: "text", text: body }] };
}

/** Content errors are answers, not crashes: the agent gets the stable code and what is available. */
function guard(fn: () => string): ToolResult {
  try {
    return text(fn());
  } catch (e) {
    if (e instanceof ContentError) return { content: [{ type: "text", text: `${e.code}: ${e.message}` }], isError: true };
    throw e;
  }
}

function updated(systemId: string): string {
  const t = listTemplates().find((x) => x.id === systemId);
  if (!t) throw new ContentError("unknown_template", `No published system "${systemId}". Call list_design_systems.`);
  return t.updated;
}

/**
 * The spec without its component chapter (served one component at a time by get_component_spec), with a
 * header that maps the files agent.md mentions to the tools that deliver them over MCP.
 */
function specForMcp(systemId: string): string {
  const date = updated(systemId);
  const md = getAgentMd(systemId, CURRENT);
  const index = getComponents(systemId, CURRENT).components;
  const start = md.indexOf("\n## Components");
  const end = start < 0 ? -1 : md.indexOf("\n## ", start + 4);
  const specified = index.filter((c) => c.status !== "unsupported").map((c) => c.name);
  const unsupported = index.filter((c) => c.status === "unsupported").map((c) => c.name);
  const chapter = [
    "\n## Components\n",
    `Specified: ${specified.join(", ")}. Read each with get_component_spec before building it.`,
    unsupported.length ? `Not specified in this system: ${unsupported.join(", ")} — compose them from tokens and say so in your report.` : "",
  ].join("\n");
  const body = start < 0 ? md : md.slice(0, start) + chapter + (end < 0 ? "" : md.slice(end));
  return [
    `> Pigment system ${systemId}, updated ${date}. Write \`${systemId}, updated ${date}\` in design-system/VERSION.`,
    "> Where this document says tokens.css or tokens.json, call get_tokens and copy the file verbatim.",
    "",
    body,
  ].join("\n");
}

/** One server instance per connection (stdio) or per request (HTTP); content is read on demand. */
export function createServer(): McpServer {
  const server = new McpServer({ name: "pigment", title: "Pigment design systems", version: SERVER_VERSION }, { instructions: INSTRUCTIONS });

  server.registerTool(
    "list_design_systems",
    {
      title: "List design systems",
      description: "Browse the Pigment design systems with their tone, appearance, keywords and when each was last updated. Use it to pick a system.",
      inputSchema: z.object({
        tone: z.string().optional().describe("Filter by tone: minimal, natural, soft, editorial, brutalist, technical, playful, luxury"),
        appearance: z.enum(["light", "dark"]).optional().describe("Only systems that support this appearance"),
      }),
      annotations: { readOnlyHint: true },
    },
    async ({ tone, appearance }) =>
      guard(() => {
        const items = listTemplates()
          .filter((t) => !tone || t.tags.tone === tone)
          .filter((t) => !appearance || t.tags.appearance.includes(appearance))
          .map((t) => ({ id: t.id, name: t.name, updated: t.updated, description: t.description, tags: t.tags, page: `${SITE_URL}/s/${t.id}` }));
        return items.length ? JSON.stringify(items, null, 2) : "No system matches that filter.";
      }),
  );

  server.registerTool(
    "get_design_system",
    {
      title: "Get design system",
      description:
        "The full specification of a system: character, the defining rules, color, type, spacing and motion rules, semantic and primitive token tables, setup and verification. Read it before changing any UI.",
      inputSchema: z.object({ id }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => specForMcp(args.id)),
  );

  server.registerTool(
    "get_tokens",
    {
      title: "Get token file",
      description: "The exact token values, light and dark, as tokens.css (CSS custom properties) or tokens.json. Copy the file into the project unchanged; never retype values.",
      inputSchema: z.object({ id, format: z.enum(["css", "json"]).default("css") }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => getTokenFile(args.id, CURRENT, args.format)),
  );

  server.registerTool(
    "get_component_spec",
    {
      title: "Get component spec",
      description: "Anatomy, variants, every state, accessibility and token mapping for one component (e.g. button, table, dialog). Read it before building or restyling that component.",
      inputSchema: z.object({ id, component: z.string().describe("Component name from the Components list in get_design_system") }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => getComponentSpec(args.id, CURRENT, args.component).markdown),
  );

  server.registerTool(
    "get_installation_guide",
    {
      title: "Get installation guide",
      description:
        "Steps, approval points and checks for one scenario: new (set up a fresh project), existing (restyle a working app without changing behavior) or ongoing (build new screens in a project that already uses the system).",
      inputSchema: z.object({ id, mode }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => getGuide(args.id, CURRENT, args.mode)),
  );

  server.registerTool(
    "get_changelog",
    {
      title: "Get changelog",
      description:
        "What changed in a system, newest first, by date. Use it to update a project: apply only the entries dated after the date in the project's design-system/VERSION.",
      inputSchema: z.object({ id }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => JSON.stringify(getHistory(args.id), null, 2)),
  );

  server.registerTool(
    "get_references",
    {
      title: "Get references",
      description:
        "Screenshots of four reference apps (dashboard, store, blog, settings) restyled with this system by an agent — desktop and mobile, light and dark — plus links to the system page and the spec.",
      inputSchema: z.object({ id, app: z.string().optional().describe("Only one app: dashboard, commerce, blog or settings") }),
      annotations: { readOnlyHint: true },
    },
    async (args) =>
      guard(() => {
        const shots = Object.entries(getShots(args.id, CURRENT))
          .filter(([key]) => !args.app || key.startsWith(`${args.app}.`))
          .map(([key, path]) => ({ view: key, url: SITE_URL + path }));
        return JSON.stringify(
          {
            system: args.id,
            updated: updated(args.id),
            page: `${SITE_URL}/s/${args.id}`,
            spec: `${SITE_URL}/s/${args.id}/agent.md`,
            screenshots: shots,
          },
          null,
          2,
        );
      }),
  );

  // Shows up in clients as a slash command (Claude Code: /mcp__pigment__apply) — the working agreement without copying a prompt.
  server.registerPrompt(
    "apply",
    {
      title: "Apply a design system",
      description: "Install or apply a Pigment design system with a plan, an approval step and a verification report.",
      argsSchema: z.object({
        id: z.string().describe("Design system id (see list_design_systems)"),
        mode: z.string().optional().describe("new, existing (default) or ongoing"),
      }),
    },
    ({ id: systemId, mode: scenario }) => {
      const m = mode.safeParse(scenario ?? "existing");
      return {
        messages: [{ role: "user" as const, content: { type: "text" as const, text: buildPrompt(systemId, m.success ? m.data : "existing", "mcp") } }],
      };
    },
  );

  return server;
}
