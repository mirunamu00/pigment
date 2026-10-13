import { getTokens } from "@pigment/content";
import { handle, json } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Resolved token values per appearance mode, keyed by dot path. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handle(() => json({ id, modes: getTokens(id, "latest") }));
}
