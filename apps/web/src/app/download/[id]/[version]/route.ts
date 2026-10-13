import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { packageFile } from "@pigment/content";
import { handle } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Old package links that carried a version (kept so links already shared keep working). */
export async function GET(_: Request, { params }: { params: Promise<{ id: string; version: string }> }) {
  const { id, version } = await params;
  return handle(() => {
    const bytes = readFileSync(packageFile(id, version));
    const sha = createHash("sha256").update(bytes).digest("hex");
    return new Response(new Uint8Array(bytes), {
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${id}.zip"`,
        "x-content-sha256": sha,
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  });
}
