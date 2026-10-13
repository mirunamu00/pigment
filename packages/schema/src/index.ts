import { z } from "zod";

// ---------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------

export const TemplateId = z
  .string()
  .regex(/^[a-z][a-z0-9-]{1,40}$/, "lowercase letters, digits and dashes; starts with a letter");

export const SemVer = z
  .string()
  .regex(/^\d+\.\d+\.\d+(-[0-9a-z.-]+)?$/, "semantic version, e.g. 1.0.0 or 0.1.0-rc.1");

export const Hex = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "6 or 8 digit hex");

export const AppId = z.enum(["dashboard", "commerce", "blog", "settings"]);
export type AppId = z.infer<typeof AppId>;

export const Scenario = z.enum(["new", "existing", "ongoing"]);
export type Scenario = z.infer<typeof Scenario>;

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

export const TemplateStatus = z.enum(["draft", "candidate", "published", "deprecated"]);

export const Manifest = z.object({
  id: TemplateId,
  version: SemVer,
  schemaVersion: z.literal(1),
  name: z.string().min(2).max(40),
  description: z.string().min(20).max(240),
  status: TemplateStatus,
  tags: z.object({
    tone: z.enum(["minimal", "natural", "soft", "editorial", "brutalist", "technical", "playful", "luxury", "other"]),
    corners: z.enum(["square", "tight", "soft", "pill"]),
    density: z.enum(["compact", "regular", "airy"]),
    appearance: z.array(z.enum(["light", "dark"])).min(1),
    keywords: z.array(z.string()).max(8).default([]),
  }),
  license: z.object({
    code: z.string().default("MIT"),
    assets: z.string().default("CC-BY-4.0"),
  }),
  provenance: z.object({
    /** Reference sites studied. Pigment templates are derived design languages, never clones. */
    references: z.array(z.object({ url: z.string().url(), capturedAt: z.string() })).default([]),
    analysis: z.string().optional(),
    notes: z.string().optional(),
  }),
  fonts: z
    .array(
      z.object({
        role: z.enum(["display", "heading", "body", "mono", "accent"]),
        family: z.string(),
        fallback: z.string(),
        cjkFallback: z.string().optional(),
        license: z.string(),
        source: z.string().optional(),
      }),
    )
    .min(1),
  artifacts: z.object({
    tokens: z.object({
      primitives: z.string(),
      light: z.string().optional(),
      dark: z.string().optional(),
    }),
    principles: z.string(),
    components: z.string(),
    instructions: z.string(),
  }),
});
export type Manifest = z.infer<typeof Manifest>;

// ---------------------------------------------------------------------------
// Tokens (W3C DTCG format subset)
// ---------------------------------------------------------------------------

export const DtcgType = z.enum([
  "color",
  "dimension",
  "fontFamily",
  "fontWeight",
  "duration",
  "cubicBezier",
  "number",
  "shadow",
  "typography",
  "border",
  "strokeStyle",
  "transition",
  "gradient",
]);

export const DtcgToken = z.object({
  $value: z.unknown(),
  $type: DtcgType.optional(),
  $description: z.string().optional(),
  $extensions: z.record(z.string(), z.unknown()).optional(),
});

export type TokenTree = { [key: string]: TokenTree | z.infer<typeof DtcgToken> | string | undefined };

export function isToken(node: unknown): node is z.infer<typeof DtcgToken> {
  return typeof node === "object" && node !== null && "$value" in node;
}

/** Flattens a DTCG tree into dot paths. `$type` is inherited from groups, as the spec allows. */
export function flattenTokens(
  tree: TokenTree,
  prefix = "",
  inheritedType?: string,
): Array<{ path: string; value: unknown; type?: string; description?: string }> {
  const out: Array<{ path: string; value: unknown; type?: string; description?: string }> = [];
  const groupType = typeof tree.$type === "string" ? tree.$type : inheritedType;
  for (const [key, node] of Object.entries(tree)) {
    if (key.startsWith("$")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (isToken(node)) {
      out.push({ path, value: node.$value, type: node.$type ?? groupType, description: node.$description });
    } else if (typeof node === "object" && node !== null) {
      out.push(...flattenTokens(node as TokenTree, path, groupType));
    }
  }
  return out;
}

/** Resolves `{group.token}` aliases against primitives + one mode's semantic tokens. */
export function resolveTokens(primitives: TokenTree, semantic?: TokenTree): Map<string, { value: unknown; type?: string }> {
  const all = new Map<string, { value: unknown; type?: string }>();
  for (const t of flattenTokens(primitives)) all.set(t.path, { value: t.value, type: t.type });
  if (semantic) for (const t of flattenTokens(semantic)) all.set(t.path, { value: t.value, type: t.type });

  const resolveValue = (value: unknown, seen: Set<string>): unknown => {
    if (typeof value !== "string") return value;
    const match = /^\{([^}]+)\}$/.exec(value);
    if (!match) return value;
    const ref = match[1]!;
    if (seen.has(ref)) throw new Error(`Circular token alias at ${ref}`);
    const target = all.get(ref);
    if (!target) throw new Error(`Unresolvable token alias {${ref}}`);
    return resolveValue(target.value, new Set([...seen, ref]));
  };

  const resolved = new Map<string, { value: unknown; type?: string }>();
  for (const [path, token] of all) resolved.set(path, { value: resolveValue(token.value, new Set([path])), type: token.type });
  return resolved;
}

/**
 * Semantic tokens every template must define, per appearance mode.
 * Agents rely on these names being present in every Pigment system.
 */
export const REQUIRED_SEMANTIC_TOKENS = [
  "color.surface.default",
  "color.surface.subtle",
  "color.surface.raised",
  "color.text.primary",
  "color.text.secondary",
  "color.text.onAction",
  "color.border.default",
  "color.border.strong",
  "color.action.primary",
  "color.action.primaryHover",
  "color.focus.ring",
  "color.status.success",
  "color.status.warning",
  "color.status.danger",
  "color.status.info",
] as const;

export const REQUIRED_PRIMITIVE_GROUPS = [
  "font.family",
  "font.size",
  "font.weight",
  "font.lineHeight",
  "space",
  "radius",
  "border.width",
  "shadow",
  "motion.duration",
  "motion.easing",
  "breakpoint",
] as const;

/** Foreground/background pairs that must meet WCAG contrast. `min` is the ratio. */
export const CONTRAST_PAIRS: Array<{ fg: string; bg: string; min: number; label: string }> = [
  { fg: "color.text.primary", bg: "color.surface.default", min: 7, label: "body text" },
  { fg: "color.text.secondary", bg: "color.surface.default", min: 4.5, label: "secondary text" },
  { fg: "color.text.primary", bg: "color.surface.subtle", min: 4.5, label: "text on subtle surface" },
  { fg: "color.text.onAction", bg: "color.action.primary", min: 4.5, label: "primary button label" },
  { fg: "color.focus.ring", bg: "color.surface.default", min: 3, label: "focus ring" },
  { fg: "color.status.danger", bg: "color.surface.default", min: 4.5, label: "error text" },
];

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export const ComponentCategory = z.enum(["action", "form", "navigation", "data-display", "feedback", "overlay", "surface"]);

export const ComponentEntry = z.object({
  name: z.string(),
  category: ComponentCategory,
  status: z.enum(["specified", "partial", "unsupported"]),
  file: z.string().optional(),
  states: z.array(z.enum(["default", "hover", "focus-visible", "active", "disabled", "loading", "error", "selected"])).default([]),
});

export const ComponentIndex = z.object({
  components: z.array(ComponentEntry).min(1),
});
export type ComponentIndex = z.infer<typeof ComponentIndex>;

/** Components every template must at least specify (status != unsupported). */
export const REQUIRED_COMPONENTS = [
  "button",
  "text-field",
  "select",
  "checkbox",
  "switch",
  "tabs",
  "card",
  "table",
  "badge",
  "dialog",
  "navigation",
  "toast",
] as const;

// ---------------------------------------------------------------------------
// Reference analysis (output of the reference-analyst)
// ---------------------------------------------------------------------------

export const Analysis = z.object({
  slug: z.string(),
  references: z.array(z.object({ url: z.string().url(), pages: z.array(z.string()) })),
  capturedAt: z.string(),
  character: z.object({
    summary: z.string(),
    keywords: z.array(z.string()).min(3).max(8),
    tone: Manifest.shape.tags.shape.tone,
  }),
  color: z.object({
    roles: z.array(z.object({ role: z.string(), hex: Hex, evidence: z.string() })),
    appearance: z.array(z.enum(["light", "dark"])),
    notes: z.string(),
  }),
  typography: z.object({
    families: z.array(z.object({ role: z.string(), observed: z.string(), substitute: z.string(), reason: z.string() })),
    scale: z.array(z.object({ role: z.string(), sizePx: z.number(), lineHeight: z.number(), weight: z.number(), letterSpacing: z.string().optional() })),
  }),
  spacing: z.object({ basePx: z.number(), scale: z.array(z.number()), notes: z.string() }),
  shape: z.object({ radii: z.array(z.object({ role: z.string(), px: z.number() })), borderWidths: z.array(z.number()), notes: z.string() }),
  elevation: z.array(z.object({ role: z.string(), css: z.string() })),
  motion: z.object({ durationsMs: z.array(z.number()), easings: z.array(z.string()), notes: z.string() }),
  layout: z.object({ grid: z.string(), density: Manifest.shape.tags.shape.density, maxWidthPx: z.number().optional(), notes: z.string() }),
  components: z.array(z.object({ name: z.string(), observations: z.string(), states: z.array(z.string()) })),
  imagery: z.object({ iconography: z.string(), illustration: z.string(), photography: z.string() }),
  doNot: z.array(z.string()).describe("Things that would break the character"),
  ipRisks: z.array(z.string()).describe("Brand assets, proprietary fonts or distinctive marks that must NOT be carried over"),
});
export type Analysis = z.infer<typeof Analysis>;

// ---------------------------------------------------------------------------
// Demo runs
// ---------------------------------------------------------------------------

export const RunRecord = z.object({
  runId: z.string(),
  template: TemplateId,
  version: SemVer,
  app: AppId,
  scenario: Scenario,
  agent: z.enum(["claude", "codex"]),
  model: z.string().optional(),
  promptFile: z.string(),
  startedAt: z.string(),
  finishedAt: z.string().optional(),
  agentExitCode: z.number().nullable().optional(),
  build: z.object({ ok: z.boolean(), durationMs: z.number().optional() }).optional(),
  screenshots: z.array(z.object({ route: z.string(), viewport: z.enum(["desktop", "mobile"]), scheme: z.enum(["light", "dark"]), file: z.string() })).default([]),
});
export type RunRecord = z.infer<typeof RunRecord>;

// ---------------------------------------------------------------------------
// Evaluation
// ---------------------------------------------------------------------------

export const GateResult = z.object({
  name: z.string(),
  pass: z.boolean(),
  value: z.union([z.number(), z.string(), z.boolean()]).optional(),
  threshold: z.union([z.number(), z.string()]).optional(),
  detail: z.string().optional(),
});

export const CriticScores = z.object({
  referenceFidelity: z.number().min(0).max(5).nullable(),
  crossAppConsistency: z.number().min(0).max(5),
  hierarchy: z.number().min(0).max(5),
  spacingRhythm: z.number().min(0).max(5),
  componentStates: z.number().min(0).max(5),
  polish: z.number().min(0).max(5),
  notes: z.array(z.string()),
  promptFixes: z.array(z.string()).describe("Concrete spec changes that would fix the observed problems"),
});

export const EvalReport = z.object({
  template: TemplateId,
  version: SemVer,
  iteration: z.number().int().min(1),
  evaluatedAt: z.string(),
  runs: z.array(
    z.object({
      runId: z.string(),
      app: AppId,
      gates: z.array(GateResult),
      metrics: z.record(z.string(), z.number()),
    }),
  ),
  crossApp: z.array(GateResult).default([]),
  critic: CriticScores.optional(),
  verdict: z.enum(["pass", "fail", "pending-review"]),
  reasons: z.array(z.string()),
});
export type EvalReport = z.infer<typeof EvalReport>;

// ---------------------------------------------------------------------------
// Registry of published versions (content/registry.json)
// ---------------------------------------------------------------------------

export const Registry = z.object({
  templates: z.array(
    z.object({
      id: TemplateId,
      latest: SemVer.nullable(),
      versions: z.array(
        z.object({
          version: SemVer,
          status: TemplateStatus,
          publishedAt: z.string().optional(),
          sha256: z.string().optional(),
        }),
      ),
    }),
  ),
});
export type Registry = z.infer<typeof Registry>;

export const SCHEMAS = { Manifest, ComponentIndex, Analysis, RunRecord, EvalReport, Registry } as const;
