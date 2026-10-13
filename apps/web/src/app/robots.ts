import type { MetadataRoute } from "next";
import { SITE_URL } from "@pigment/content/prompts";

export default function robots(): MetadataRoute.Robots {
  return {
    // The MCP endpoint is for agents, not crawlers; the JSON API and agent.md stay crawlable on purpose.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/mcp"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
