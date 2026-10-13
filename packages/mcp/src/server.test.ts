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

test("advertises the six tools and the apply prompt", async () => {
  const tools = (await client.listTools()).tools.map((t) => t.name).sort();
  assert.deepEqual(tools, ["get_component_spec", "get_design_system", "get_installation_guide", "get_references", "get_tokens", "list_design_systems"]);
  const prompts = (await client.listPrompts()).prompts.map((p) => p.name);
  assert.deepEqual(prompts, ["apply"]);
});

test("lists systems and filters them", async () => {
  const all = JSON.parse(textOf(await client.callTool({ name: "list_design_systems", arguments: {} })));
  assert.equal(all[0].id, "fixture-system");
  const none = textOf(await client.callTool({ name: "list_design_systems", arguments: { tone: "brutalist" } }));
  assert.match(none, /No published system/);
});

test("get_design_system serves the spec with components moved to their own tool", async () => {
  const spec = textOf(await client.callTool({ name: "get_design_system", arguments: { id: "fixture-system", version: "latest" } }));
  assert.match(spec, /fixture-system@1\.0\.0/);
  assert.match(spec, /get_component_spec/);
  assert.match(spec, /call get_tokens/);
});

test("tokens, components and guides come from the pinned version", async () => {
  const css = textOf(await client.callTool({ name: "get_tokens", arguments: { id: "fixture-system", version: "1.0.0" } }));
  assert.match(css, /--color-/);
  const guide = textOf(await client.callTool({ name: "get_installation_guide", arguments: { id: "fixture-system", version: "1.0.0", mode: "existing" } }));
  assert.match(guide, /## Existing project/);
  assert.match(guide, /## Verification/);
});

test("the version can be left out: latest is served and the exact version is named for the project to record", async () => {
  const spec = textOf(await client.callTool({ name: "get_design_system", arguments: { id: "fixture-system" } }));
  assert.match(spec, /Record exactly `fixture-system@1\.0\.0` in design-system\/VERSION/);
  const css = textOf(await client.callTool({ name: "get_tokens", arguments: { id: "fixture-system" } }));
  assert.match(css, /--color-/);
  assert.match(client.getInstructions() ?? "", /design-system\/VERSION/);
});

test("unknown versions are tool errors with a stable code, not crashes", async () => {
  const r = (await client.callTool({ name: "get_design_system", arguments: { id: "fixture-system", version: "9.9.9" } })) as Text;
  assert.equal(r.isError, true);
  assert.match(textOf(r), /^unknown_version: .*Available: 1\.0\.0/);
});

test("the apply prompt pins the latest version", async () => {
  const p = await client.getPrompt({ name: "apply", arguments: { id: "fixture-system", mode: "new" } });
  const msg = p.messages[0]?.content as { text: string };
  assert.match(msg.text, /Set up design system fixture-system@1\.0\.0/);
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
    assert.equal((await stdio.listTools()).tools.length, 6);
  } finally {
    await stdio.close();
  }
});
