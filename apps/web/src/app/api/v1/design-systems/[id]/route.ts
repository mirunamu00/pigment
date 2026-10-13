import { getComponents, getManifest, listTemplates } from "@pigment/content";
import { handle, json } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Manifest + an index of every artifact of the current system. Versions are internal, so the manifest's is dropped. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handle(() => {
    const { version: _internal, ...manifest } = getManifest(id, "latest");
    const base = `/api/v1/design-systems/${id}`;
    return json({
      manifest: { ...manifest, updated: listTemplates().find((t) => t.id === id)?.updated },
      artifacts: {
        tokens: `${base}/tokens`,
        components: getComponents(id, "latest").components.map((c) => ({ name: c.name, status: c.status, href: `${base}/components/${c.name}` })),
        guides: ["new", "existing", "ongoing"].map((m) => `${base}/guides/${m}`),
        spec: `/s/${id}/agent.md`,
        package: `/download/${id}`,
      },
    });
  });
}
