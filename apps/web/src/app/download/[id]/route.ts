import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { packageFile } from "@pigment/content";
import { handle } from "@/lib/api";

export const dynamic = "force-dynamic";

/** The offline package of the current system. */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handle(() => {
    const bytes = readFileSync(packageFile(id, "latest"));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${id}.zip"`,
        "x-content-sha256": createHash("sha256").update(bytes).digest("hex"),
        "cache-control": "public, max-age=300, s-maxage=3600",
      },
    });
  });
}
