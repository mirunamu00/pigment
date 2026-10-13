import { getComponentSpec } from "@pigment/content";
import { handle, isPinned, json } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string; name: string }> }) {
  const { id, version, name } = await params;
  return handle(() => {
    const spec = getComponentSpec(id, version, name);
    return json({ id, version, component: spec.entry, markdown: spec.markdown }, { immutable: isPinned(version) });
  });
}
