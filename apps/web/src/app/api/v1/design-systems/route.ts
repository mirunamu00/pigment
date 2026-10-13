import { listTemplates } from "@pigment/content";
import { handle, json } from "@/lib/api";

export const dynamic = "force-dynamic";

/** GET /api/v1/design-systems?tone=minimal&appearance=dark */
export function GET(request: Request) {
  return handle(() => {
    const url = new URL(request.url);
    const tone = url.searchParams.get("tone");
    const appearance = url.searchParams.get("appearance");
    const items = listTemplates()
      .filter((t) => !tone || t.tags.tone === tone)
      .filter((t) => !appearance || t.tags.appearance.includes(appearance as "light" | "dark"))
      .map((t) => ({ id: t.id, name: t.name, latest: t.version, versions: t.versions, description: t.description, tags: t.tags }));
    return json({ items });
  });
}
