import { ContentError } from "@pigment/content";

const STATUS: Record<string, number> = {
  unknown_template: 404,
  unknown_version: 404,
  invalid_component: 404,
  unavailable_artifact: 404,
  invalid_mode: 400,
};

const HEADERS = {
  "access-control-allow-origin": "*",
  // Pinned versions never change; "latest" is short-lived.
  "cache-control": "public, max-age=300, s-maxage=3600",
};

export function json(data: unknown, init?: { immutable?: boolean }): Response {
  return Response.json(data, {
    headers: init?.immutable ? { ...HEADERS, "cache-control": "public, max-age=31536000, immutable" } : HEADERS,
  });
}

/** Runs a content lookup and turns ContentError into a stable JSON error body. */
export function handle(fn: () => Response): Response {
  try {
    return fn();
  } catch (e) {
    if (e instanceof ContentError) {
      return Response.json({ error: { code: e.code, message: e.message } }, { status: STATUS[e.code] ?? 400, headers: HEADERS });
    }
    console.error(e);
    return Response.json({ error: { code: "internal", message: "Unexpected error" } }, { status: 500, headers: HEADERS });
  }
}

export const isPinned = (version: string) => version !== "latest";
