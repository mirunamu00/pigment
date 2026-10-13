import { getGuide } from "@pigment/content";
import { handle, json } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string; mode: string }> }) {
  const { id, mode } = await params;
  return handle(() => json({ id, mode, markdown: getGuide(id, "latest", mode) }));
}
