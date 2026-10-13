import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { SCHEMAS } from "./index.ts";

// Publishes the contracts as plain JSON Schema so agents and external tools can validate without TypeScript.
const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "json");
mkdirSync(outDir, { recursive: true });

for (const [name, schema] of Object.entries(SCHEMAS)) {
  const json = z.toJSONSchema(schema, { io: "input" });
  writeFileSync(join(outDir, `${name}.schema.json`), JSON.stringify(json, null, 2) + "\n");
  console.log(`wrote json/${name}.schema.json`);
}
