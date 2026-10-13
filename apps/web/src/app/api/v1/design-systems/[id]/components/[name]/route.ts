import { getComponentSpec } from "@pigment/content";
import { handle, json } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string; name: string }> }) {
  const { id, name } = await params;
  return handle(() => {
    const spec = getComponentSpec(id, "latest", name);
    return json({ id, component: spec.entry, markdown: spec.markdown });
  });
}
