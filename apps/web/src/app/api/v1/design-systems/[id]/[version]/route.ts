import { getComponents, getManifest } from "@pigment/content";
import { handle, isPinned, json } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Manifest + an index of every artifact for one version. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string }> }) {
  const { id, version } = await params;
  return handle(() => {
    const manifest = getManifest(id, version);
    const base = `/api/v1/design-systems/${id}/${manifest.version}`;
    return json(
      {
        manifest,
        artifacts: {
          tokens: `${base}/tokens`,
          components: getComponents(id, manifest.version).components.map((c) => ({ name: c.name, status: c.status, href: `${base}/components/${c.name}` })),
          guides: ["new", "existing", "ongoing"].map((m) => `${base}/guides/${m}`),
          spec: `/s/${id}/${manifest.version}/agent.md`,
          package: `/download/${id}/${manifest.version}`,
        },
      },
      { immutable: isPinned(version) },
    );
  });
}
