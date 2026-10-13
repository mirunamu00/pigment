import { McpServer } from "@modelcontextprotocol/server";
import {
  ContentError,
  getAgentMd,
  getComponents,
  getComponentSpec,
  getGuide,
  getManifest,
  getShots,
  getTokenFile,
  listTemplates,
  resolveVersion,
} from "@pigment/content";
import { buildPrompt, SITE_URL } from "@pigment/content/prompts";
import { z } from "zod";
import pkg from "../package.json" with { type: "json" };

export const SERVER_VERSION = pkg.version;

const id = z.string().describe('Design system id, e.g. "margin-notes" (see list_design_systems)');
const version = z.string().describe('Exact version such as "1.0.0". Pin the version a project installed; "latest" only when starting fresh.');
const mode = z.enum(["new", "existing", "ongoing"]);

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

/**
 * The spec without its component chapter (served one component at a time by get_component_spec), with a
 * header that maps the files agent.md mentions to the tools that deliver them over MCP.
 */
function specForMcp(systemId: string, pinned: string): string {
  const md = getAgentMd(systemId, pinned);
  const index = getComponents(systemId, pinned).components;
  const start = md.indexOf("\n## Components");
  const end = start < 0 ? -1 : md.indexOf("\n## ", start + 4);
  const specified = index.filter((c) => c.status !== "unsupported").map((c) => c.name);
  const unsupported = index.filter((c) => c.status === "unsupported").map((c) => c.name);
  const chapter = [
    "\n## Components\n",
    `Specified: ${specified.join(", ")}. Read each with get_component_spec before building it.`,
    unsupported.length ? `Not specified in this version: ${unsupported.join(", ")} — compose them from tokens and say so in your report.` : "",
  ].join("\n");
  const body = start < 0 ? md : md.slice(0, start) + chapter + (end < 0 ? "" : md.slice(end));
  return [
    `> Delivered over MCP as ${systemId}@${pinned}. Where this document says tokens.css or tokens.json, call get_tokens and copy the file verbatim.`,
    "",
    body,
  ].join("\n");
}

/** One server instance per connection (stdio) or per request (HTTP); content is read on demand. */
export function createServer(): McpServer {
  const server = new McpServer({ name: "pigment", title: "Pigment design systems", version: SERVER_VERSION });

  server.registerTool(
    "list_design_systems",
    {
      title: "List design systems",
      description:
        "Browse the published Pigment design systems with their tone, appearance, keywords and latest stable version. Use it to pick a system or check which versions exist.",
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
          .map((t) => ({ id: t.id, name: t.name, latest: t.version, versions: t.versions, description: t.description, tags: t.tags, page: `${SITE_URL}/s/${t.id}` }));
        return items.length ? JSON.stringify(items, null, 2) : "No published system matches that filter.";
      }),
  );

  server.registerTool(
    "get_design_system",
    {
      title: "Get design system",
      description:
        "The full specification of one pinned version: character, the defining rules, color, type, spacing and motion rules, semantic and primitive token tables, setup and verification. Read it before changing any UI.",
      inputSchema: z.object({ id, version }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => specForMcp(args.id, resolveVersion(args.id, args.version))),
  );

  server.registerTool(
    "get_tokens",
    {
      title: "Get token file",
      description: "The exact token values, light and dark, as tokens.css (CSS custom properties) or tokens.json. Copy the file into the project unchanged; never retype values.",
      inputSchema: z.object({ id, version, format: z.enum(["css", "json"]).default("css") }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => getTokenFile(args.id, args.version, args.format)),
  );

  server.registerTool(
    "get_component_spec",
    {
      title: "Get component spec",
      description: "Anatomy, variants, every state, accessibility and token mapping for one component (e.g. button, table, dialog). Read it before building or restyling that component.",
      inputSchema: z.object({ id, version, component: z.string().describe("Component name from the Components list in get_design_system") }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => getComponentSpec(args.id, args.version, args.component).markdown),
  );

  server.registerTool(
    "get_installation_guide",
    {
      title: "Get installation guide",
      description:
        "Steps, approval points and checks for one scenario: new (set up a fresh project), existing (restyle a working app without changing behavior) or ongoing (build new screens in a project that already uses the system).",
      inputSchema: z.object({ id, version, mode }),
      annotations: { readOnlyHint: true },
    },
    async (args) => guard(() => getGuide(args.id, args.version, args.mode)),
  );

  server.registerTool(
    "get_references",
    {
      title: "Get references",
      description:
        "Screenshots of four reference apps (dashboard, store, blog, settings) restyled with this version by an agent — desktop and mobile, light and dark — plus links to the system page, spec and offline package.",
      inputSchema: z.object({ id, version, app: z.string().optional().describe("Only one app: dashboard, commerce, blog or settings") }),
      annotations: { readOnlyHint: true },
    },
    async (args) =>
      guard(() => {
        const pinned = resolveVersion(args.id, args.version);
        const shots = Object.entries(getShots(args.id, pinned))
          .filter(([key]) => !args.app || key.startsWith(`${args.app}.`))
          .map(([key, path]) => ({ view: key, url: SITE_URL + path }));
        return JSON.stringify(
          {
            system: `${args.id}@${pinned}`,
            page: `${SITE_URL}/s/${args.id}/${pinned}`,
            spec: `${SITE_URL}/s/${args.id}/${pinned}/agent.md`,
            package: `${SITE_URL}/download/${args.id}/${pinned}`,
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
      description: "Install or apply a pinned Pigment design system with a plan, an approval step and a verification report.",
      argsSchema: z.object({
        id: z.string().describe('Design system id, e.g. "margin-notes"'),
        version: z.string().optional().describe("Version to pin; defaults to the latest stable version"),
        mode: z.string().optional().describe("new, existing (default) or ongoing"),
      }),
    },
    ({ id: systemId, version: wanted, mode: scenario }) => {
      const pinned = getManifest(systemId, wanted ?? "latest").version;
      const m = mode.safeParse(scenario ?? "existing");
      return {
        messages: [
          {
            role: "user" as const,
            content: { type: "text" as const, text: buildPrompt(systemId, pinned, m.success ? m.data : "existing", "mcp") },
          },
        ],
      };
    },
  );

  return server;
}
