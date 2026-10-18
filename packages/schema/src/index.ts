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
/**
 * Apps used only to confirm a candidate, never to steer it: structures the main four don't have, so they show
 * whether a system carries to products it was not tuned on. Never shown in the gallery.
 */
export const HoldoutAppId = z.enum(["landing", "docs"]);
export type HoldoutAppId = z.infer<typeof HoldoutAppId>;
export const RunAppId = z.union([AppId, HoldoutAppId]);
export type RunAppId = z.infer<typeof RunAppId>;

export const Scenario = z.enum(["new", "existing", "ongoing"]);
export type Scenario = z.infer<typeof Scenario>;

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

export const TemplateStatus = z.enum(["draft", "candidate", "published", "deprecated"]);

export const Manifest = z.object({
  id: TemplateId,
  version: SemVer,
  /** 2: the principles carry Signature elements, Interaction and Applying the concept (validate enforces them). */
  schemaVersion: z.union([z.literal(1), z.literal(2)]),
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

/**
 * Every area the analyst must account for — observed on the reference, derived for it, or absent with a
 * reason. `pnpm harness check-analysis` fails when one is missing.
 */
export const AUDIT_AREAS = [
  "color",
  "typography",
  "spacing",
  "layout-grid",
  "section-patterns",
  "shape",
  "borders",
  "elevation",
  "surfaces-and-backgrounds",
  "buttons",
  "links",
  "navigation",
  "forms",
  "cards",
  "disclosure",
  "tabs",
  "tables-and-data",
  "feedback",
  "overlays",
  "iconography",
  "illustration",
  "media",
  "motion-load",
  "motion-scroll",
  "motion-hover-and-press",
  "motion-loop",
  "theming",
  "responsive",
  "accessibility",
  "writing-style",
] as const;
export const AuditArea = z.enum(AUDIT_AREAS);
export type AuditArea = z.infer<typeof AuditArea>;

const Evidence = z.array(z.string()).min(1).describe("Files under pipeline/<slug>/reference or JSON paths that show it");

/** What makes the site recognizable beyond its tokens, written so an agent can rebuild it originally anywhere. */
export const Signature = z.object({
  name: z.string(),
  what: z.string().describe("What it is and how it looks, measured"),
  evidence: Evidence,
  frequency: z.string().describe("Where and how often it appears across the surveyed site"),
  recipe: z.string().describe("How to build an original one: construction, tokens, stroke and shape rules, code-level notes"),
  motion: z.string().describe("Trigger, keyframes, duration, easing, iterations — or 'static'"),
  applicationMap: z
    .array(z.object({ context: z.string(), use: z.string() }))
    .min(4)
    .describe("Where it goes in any product: page headers, empty states, loading, onboarding, FAQ, section breaks, data screens…"),
  limits: z.string().describe("How much per screen, where never, reduced-motion behavior"),
  derived: z.boolean().describe("true when the reference doesn't show it this way and it was derived"),
});

export const Analysis = z.object({
  slug: z.string(),
  references: z.array(z.object({ url: z.string().url(), pages: z.array(z.string()) })),
  capturedAt: z.string(),
  survey: z.object({ pagesSurveyed: z.number().int(), pageTypes: z.array(z.string()), notes: z.string() }),
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
  motion: z.object({
    durationsMs: z.array(z.number()),
    easings: z.array(z.string()),
    patterns: z
      .array(
        z.object({
          name: z.string(),
          trigger: z.enum(["load", "scroll", "hover", "focus", "press", "open", "loop", "state-change"]),
          target: z.string(),
          durationMs: z.number(),
          easing: z.string(),
          keyframes: z.string().describe("What changes, from → to"),
          evidence: Evidence,
        }),
      )
      .min(1),
    reducedMotion: z.string().describe("What the reference does under prefers-reduced-motion, and what the template will do"),
    notes: z.string(),
  }),
  layout: z.object({ grid: z.string(), density: Manifest.shape.tags.shape.density, maxWidthPx: z.number().optional(), notes: z.string() }),
  patterns: z
    .array(z.object({ name: z.string(), description: z.string(), frequency: z.string(), evidence: Evidence }))
    .min(3)
    .describe("Recurring layouts and UI patterns across pages: section rhythm, hero composition, card grids, logo walls, FAQ blocks…"),
  components: z.array(z.object({ name: z.string(), observations: z.string(), states: z.array(z.string()), evidence: Evidence })),
  interactions: z
    .array(z.object({ element: z.string(), hover: z.string(), focus: z.string(), press: z.string(), open: z.string().optional(), evidence: Evidence }))
    .min(3),
  theming: z.object({ mechanism: z.enum(["prefers-color-scheme", "toggle", "both", "none"]), notes: z.string(), evidence: Evidence }),
  imagery: z.object({ iconography: z.string(), illustration: z.string(), photography: z.string() }),
  signatures: z.array(Signature).min(1),
  writing: z.object({ casing: z.string(), tone: z.string(), notes: z.string() }).describe("Style only — never copy text"),
  coverage: z.array(z.object({ area: AuditArea, status: z.enum(["observed", "derived", "absent"]), note: z.string() })),
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
  app: RunAppId,
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

/**
 * One thing the critic saw. The verdict comes from findings, not from scores: a blocker fails a candidate, a
 * major fails it when the prompt causes it (it recurs, or the spec itself is at fault), a minor never does.
 */
export const CriticFinding = z.object({
  severity: z.enum(["blocker", "major", "minor"]),
  /** Rubric area: referenceFidelity, crossAppConsistency, hierarchy, spacingRhythm, componentStates, polish, signature. */
  area: z.string(),
  summary: z.string(),
  /** In how many of the evaluated samples it appears, and how many there were. */
  samples: z.number().int().min(0),
  of: z.number().int().min(1),
  /** The spec's own wording or recipe causes it (a missing, ambiguous or contradictory rule). */
  specCaused: z.boolean().default(false),
  evidence: z.array(z.string()).default([]),
  /** A general rule that would prevent it in any product — never a fix tied to one demo app's screen or data. */
  promptFix: z.string().optional(),
});
export type CriticFinding = z.infer<typeof CriticFinding>;

const score = z.number().min(0).max(5);
export const CriticScores = z.object({
  /** Descriptive only (the verdict comes from findings). Older critic files gate on them. */
  referenceFidelity: score.nullable().optional(),
  crossAppConsistency: score.optional(),
  hierarchy: score.optional(),
  spacingRhythm: score.optional(),
  componentStates: score.optional(),
  polish: score.optional(),
  signature: score.nullable().optional(),
  findings: z.array(CriticFinding).optional(),
  notes: z.array(z.string()).default([]),
  promptFixes: z.array(z.string()).default([]).describe("Concrete spec changes that would fix the observed problems"),
});
export type CriticScores = z.infer<typeof CriticScores>;

export const EvalReport = z.object({
  template: TemplateId,
  version: SemVer,
  iteration: z.number().int().min(1),
  evaluatedAt: z.string(),
  runs: z.array(
    z.object({
      runId: z.string(),
      app: RunAppId,
      gates: z.array(GateResult),
      metrics: z.record(z.string(), z.number()),
    }),
  ),
  crossApp: z.array(GateResult).default([]),
  /** Measured layout defects (clipped or overlapping text, near-miss alignment, doubled rules, repeated drawings). */
  layout: z
    .array(z.object({ app: RunAppId, runId: z.string(), route: z.string(), viewport: z.string(), kind: z.string(), where: z.string(), detail: z.string() }))
    .optional(),
  critic: CriticScores.optional(),
  /** Agent spend of this version and of its whole family (all candidates), against the family's budget. */
  cost: z
    .object({ versionUsd: z.number(), familyUsd: z.number(), familyRuns: z.number(), budgetUsd: z.number() })
    .optional(),
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
