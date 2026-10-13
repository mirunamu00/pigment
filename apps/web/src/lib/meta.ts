import type { Metadata } from "next";

/**
 * Per-page metadata: title, description, canonical URL, and the same title and description on the share
 * cards (Open Graph and X do not fall back to the page title). The share image comes from the nearest
 * opengraph-image file.
 */
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} — Pigment`, description, url: path },
    twitter: { card: "summary_large_image", title: `${title} — Pigment`, description },
  };
}
