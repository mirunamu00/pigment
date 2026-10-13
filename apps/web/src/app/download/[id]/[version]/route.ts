import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { packageFile } from "@pigment/content";
import { handle } from "@/lib/api";

export const dynamic = "force-dynamic";

/** The offline package. Served from the same content folder as the page, so the version always matches. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string }> }) {
  const { id, version } = await params;
  return handle(() => {
    const bytes = readFileSync(packageFile(id, version));
    const sha = createHash("sha256").update(bytes).digest("hex");
    return new Response(new Uint8Array(bytes), {
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${id}-${version}.zip"`,
        "x-content-sha256": sha,
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  });
}
