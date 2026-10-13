import { getAgentMd } from "@pigment/content";
import { handle } from "@/lib/api";

export const dynamic = "force-dynamic";

/** The spec URL used in prompts: one markdown document an agent can fetch and read — always the current system. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handle(
    () =>
      new Response(getAgentMd(id, "latest"), {
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          "access-control-allow-origin": "*",
          "cache-control": "public, max-age=300, s-maxage=3600",
        },
      }),
  );
}
