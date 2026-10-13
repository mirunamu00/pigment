#!/usr/bin/env node
// Local MCP server over stdio: `npx -y pigment-mcp`. The client starts this process and talks JSON-RPC on
// stdin/stdout, so nothing else may write to stdout — diagnostics go to stderr.
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";

// Content comes from, in order: PIGMENT_CONTENT_DIR, the snapshot bundled next to the built cli.js, or the
// repository's content/ when run from source. Never the client's working directory, which is the user's project.
const here = dirname(fileURLToPath(import.meta.url));
if (!process.env.PIGMENT_CONTENT_DIR) {
  const dir = [join(here, "content"), resolve(here, "..", "..", "..", "content")].find((d) => existsSync(join(d, "registry.json")));
  if (!dir) {
    console.error("pigment-mcp: no content found; set PIGMENT_CONTENT_DIR");
    process.exit(1);
  }
  process.env.PIGMENT_CONTENT_DIR = dir;
}

// Imported after the content directory is settled: @pigment/content resolves it on first use.
const { createServer } = await import("./server.ts");
await createServer().connect(new StdioServerTransport());
console.error(`pigment-mcp: ready (content ${process.env.PIGMENT_CONTENT_DIR})`);
