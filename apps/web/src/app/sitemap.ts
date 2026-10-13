import type { MetadataRoute } from "next";
import { listTemplates, registry } from "@pigment/content";
import { SITE_URL } from "@pigment/content/prompts";

const PAGES = ["/", "/compare", "/connect", "/docs", "/docs/new-project", "/docs/existing-project", "/docs/ongoing", "/docs/package"];

export default function sitemap(): MetadataRoute.Sitemap {
  const published = new Map(registry().templates.map((t) => [t.id, t.versions.find((v) => v.version === t.latest)?.publishedAt]));
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.6 })),
    ...listTemplates().map((t) => ({
      url: `${SITE_URL}/s/${t.id}`,
      lastModified: published.get(t.id),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
