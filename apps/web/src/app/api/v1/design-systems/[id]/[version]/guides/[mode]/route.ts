import { getGuide } from "@pigment/content";
import { handle, isPinned, json } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string; mode: string }> }) {
  const { id, version, mode } = await params;
  return handle(() => json({ id, version, mode, markdown: getGuide(id, version, mode) }, { immutable: isPinned(version) }));
}
