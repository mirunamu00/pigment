import { getAgentMd } from "@pigment/content";
import { handle, isPinned } from "@/lib/api";

export const dynamic = "force-dynamic";

/** The spec URL used in prompts: one markdown document an agent can fetch and read. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string }> }) {
  const { id, version } = await params;
  return handle(
    () =>
      new Response(getAgentMd(id, version), {
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          "access-control-allow-origin": "*",
          "cache-control": isPinned(version) ? "public, max-age=31536000, immutable" : "public, max-age=300",
        },
      }),
  );
}
