import type { NextConfig } from "next";

const config: NextConfig = {
  // e2e tests build against fixture content into a separate folder.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // Workspace packages ship TypeScript source.
  transpilePackages: ["@pigment/content", "@pigment/schema", "@pigment/mcp"],
  // Template files are read from the repository's content/ folder at request/build time.
  outputFileTracingIncludes: {
    "/api/**": ["../../content/**"],
    "/s/**": ["../../content/**"],
    "/download/**": ["../../content/**"],
    // The MCP route reads content and the screenshot index (cover.json) from disk at request time.
    "/mcp": ["../../content/**", "./public/showcase/**/cover.json"],
  },
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
