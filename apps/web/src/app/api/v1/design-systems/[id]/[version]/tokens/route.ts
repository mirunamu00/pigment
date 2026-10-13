import { getTokens } from "@pigment/content";
import { handle, isPinned, json } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Resolved token values per appearance mode, keyed by dot path. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string }> }) {
  const { id, version } = await params;
  return handle(() => json({ id, version, modes: getTokens(id, version) }, { immutable: isPinned(version) }));
}
