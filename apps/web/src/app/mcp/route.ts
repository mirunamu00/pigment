import { createMcpHandler } from "@modelcontextprotocol/server";
import { createServer } from "@pigment/mcp";

// Remote MCP endpoint: `claude mcp add --transport http pigment <site>/mcp`. Stateless — every request gets a
// fresh server over the same content the site serves, so it scales like any other route.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const handler = createMcpHandler(() => createServer());

export function POST(request: Request): Promise<Response> {
  return handler.fetch(request);
}
export { POST as GET, POST as DELETE };
