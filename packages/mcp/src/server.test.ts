import assert from "node:assert/strict";
import { dirname, join, resolve } from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { InMemoryTransport } from "@modelcontextprotocol/server";

// The site's fixture content: one published system, fixture-system@1.0.0.
const here = dirname(fileURLToPath(import.meta.url));
const fixtures = resolve(here, "..", "..", "..", "apps", "web", "tests", "fixtures", "content");
process.env.PIGMENT_CONTENT_DIR = fixtures;
const { createServer } = await import("./server.ts");

type Text = { content: Array<{ type: string; text?: string }>; isError?: boolean };
const textOf = (r: unknown) => ((r as Text).content[0]?.text ?? "") as string;

let client: Client;
before(async () => {
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  await createServer().connect(serverSide);
  client = new Client({ name: "test", version: "0.0.0" });
  await client.connect(clientSide);
});
after(() => client.close());

test("advertises the seven tools and the apply prompt", async () => {
  const tools = (await client.listTools()).tools.map((t) => t.name).sort();
  assert.deepEqual(tools, ["get_changelog", "get_component_spec", "get_design_system", "get_installation_guide", "get_references", "get_tokens", "list_design_systems"]);
  const prompts = (await client.listPrompts()).prompts.map((p) => p.name);
  assert.deepEqual(prompts, ["apply"]);
});

test("no tool takes or reveals a version", async () => {
  for (const tool of (await client.listTools()).tools) assert.equal("version" in (tool.inputSchema.properties ?? {}), false, tool.name);
  const outputs = [
    textOf(await client.callTool({ name: "list_design_systems", arguments: {} })),
    textOf(await client.callTool({ name: "get_design_system", arguments: { id: "fixture-system" } })),
    textOf(await client.callTool({ name: "get_tokens", arguments: { id: "fixture-system", format: "json" } })),
    textOf(await client.callTool({ name: "get_installation_guide", arguments: { id: "fixture-system", mode: "new" } })),
    textOf(await client.callTool({ name: "get_references", arguments: { id: "fixture-system" } })),
    textOf(await client.callTool({ name: "get_changelog", arguments: { id: "fixture-system" } })),
  ];
  for (const out of outputs) assert.doesNotMatch(out.replace(/\/products\/[^"]+/g, ""), /1\.0\.0|"version"|"versions"|"latest"/);
});

test("lists systems with their update date and filters them", async () => {
  const all = JSON.parse(textOf(await client.callTool({ name: "list_design_systems", arguments: {} })));
  assert.equal(all[0].id, "fixture-system");
  assert.equal(all[0].updated, "2026-10-11");
  const none = textOf(await client.callTool({ name: "list_design_systems", arguments: { tone: "brutalist" } }));
  assert.match(none, /No system matches/);
});

test("get_design_system serves the spec with components moved to their own tool and the date to record", async () => {
  const spec = textOf(await client.callTool({ name: "get_design_system", arguments: { id: "fixture-system" } }));
  assert.match(spec, /Write `fixture-system, updated 2026-10-11` in design-system\/VERSION/);
  assert.match(spec, /get_component_spec/);
  assert.match(spec, /call get_tokens/);
  assert.match(client.getInstructions() ?? "", /get_changelog/);
});

test("tokens and guides come from the current system", async () => {
  const css = textOf(await client.callTool({ name: "get_tokens", arguments: { id: "fixture-system" } }));
  assert.match(css, /--color-/);
  const guide = textOf(await client.callTool({ name: "get_installation_guide", arguments: { id: "fixture-system", mode: "existing" } }));
  assert.match(guide, /## Existing project/);
  assert.match(guide, /## Verification/);
});

test("the changelog is dated, newest first", async () => {
  const log = JSON.parse(textOf(await client.callTool({ name: "get_changelog", arguments: { id: "fixture-system" } })));
  assert.equal(log[0].date, "2026-10-11");
});

test("unknown systems are tool errors with a stable code, not crashes", async () => {
  const r = (await client.callTool({ name: "get_design_system", arguments: { id: "nope" } })) as Text;
  assert.equal(r.isError, true);
  assert.match(textOf(r), /^unknown_template: /);
});

test("the apply prompt names the system only", async () => {
  const p = await client.getPrompt({ name: "apply", arguments: { id: "fixture-system", mode: "new" } });
  const msg = p.messages[0]?.content as { text: string };
  assert.match(msg.text, /Set up design system fixture-system in this codebase/);
  assert.match(msg.text, /Pigment MCP tools/);
});

test("the stdio entry answers a real client over stdin/stdout", async () => {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["--import", "tsx", join(here, "cli.ts")],
    env: { ...process.env, PIGMENT_CONTENT_DIR: fixtures } as Record<string, string>,
    stderr: "ignore",
  });
  const stdio = new Client({ name: "stdio-test", version: "0.0.0" });
  await stdio.connect(transport);
  try {
    assert.equal((await stdio.listTools()).tools.length, 7);
  } finally {
    await stdio.close();
  }
});
