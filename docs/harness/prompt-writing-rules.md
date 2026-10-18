# Prompt writing rules

The "design prompt" is the template package in `content/templates/<id>/<version>/` plus the bundled
`agent.md` generated from it. Coding agents read it and must reproduce the same design language in any
product. These rules exist because agents fill every gap with their own defaults — and those defaults are
what make AI-built UIs look alike.

`pnpm harness validate` enforces every rule marked **[lint]**. The rest are checked by the reviewer.

## 1. Measurable, never adjectival

- Every visual statement carries a value: hex, px/rem, ratio, weight, ms, easing curve. **[lint]**
  "Generous whitespace" → "section spacing `space.16` (64px) on desktop, `space.10` (40px) on mobile".
- Adjectives are allowed only as a one-line character summary at the top of `visual-language.md`.
- Ranges are fine when the rule is a range: "line length 60–75 characters".

## 2. Tokens are the vocabulary

- Primitives (`tokens/primitives.json`) hold raw values; semantic tokens (`tokens/semantic.light.json`,
  `semantic.dark.json`) reference primitives with `{path}` aliases. **[lint]**
- Every name in `REQUIRED_SEMANTIC_TOKENS` and every group in `REQUIRED_PRIMITIVE_GROUPS` exists. **[lint]**
- Prose and component specs refer to tokens by name, never raw values. **[lint: hex outside tokens]**
- Contrast pairs in `CONTRAST_PAIRS` pass. **[lint]**
- Fonts: each role has a family, a generic fallback, a CJK fallback and a license. Only fonts that may be
  redistributed (OFL, Apache, or system fonts). **[lint: manifest.fonts]**

## 3. Rules, not pictures

- Describe how decisions are made, so the agent can make new ones: hierarchy, density, when to use
  elevation vs. borders, how many accent uses per screen, how layouts adapt.
- Each principle = rule + reason + one do + one don't.
- No page templates. Layout guidance is about grid, rhythm, content priority and breakpoints — the system
  must fit a dashboard, a store, a blog and a settings page equally. **[review]**

## 4. The concept travels as recipes

A template is more than its tokens: the reference's signature elements, the way it moves and the way it
responds are what make people recognize it. They must reach every screen an agent builds. Packages with
`schemaVersion: 2` carry three more sections in `principles/visual-language.md`: **[lint]**

- `## Signature elements` — one `###` per element with **What.**, **Recipe.** (with a code block),
  **Motion.**, **Where.** and **Limits.** The recipe lets an agent build an original instance from nothing
  — construction, technique, stroke and color by token — never the reference's artwork.
- `## Interaction` — per element type, what hover, focus-visible, press and open change, by how much,
  with which motion tokens.
- `## Applying the concept` — a table of at least six contexts, product screens included (dashboard,
  form, settings, data table, empty, error, loading), saying which elements each uses and how strongly.
  Dense screens get less, never nothing.

Motion is specified like any other value: keyframes, durations and easings as tokens or exact values,
triggers, iterations, and what happens under `prefers-reduced-motion: reduce` (loops stop; content stays
readable). New projects build the signature elements first, as reusable pieces; existing projects show
them on the sample screen.

## 5. Components are complete or honestly incomplete

- Every component in `REQUIRED_COMPONENTS` is `specified` or `partial`. **[lint]**
- A spec covers: purpose, anatomy, sizes, variants, states (default, hover, focus-visible, active,
  disabled, loading, error where relevant), token mapping, keyboard and screen-reader behavior.
- Anything not specified is listed as such — agents must not invent it silently.

## 6. Agent instructions

`agent/instructions.md` has these sections, in order: **[lint]**
`## New project`, `## Existing project`, `## Ongoing development`, `## Verification`, `## Rollback`.

- Existing project: audit first, plan, wait for approval, map tokens onto existing variables, restyle one
  screen as a sample, wait again, then go screen by screen with one commit each.
- Preservation list: routes, business logic, API contracts, form semantics, test ids, accessibility.
- Ongoing: install the pointer lines in `AGENTS.md`/`CLAUDE.md`; never hard-code new values.
- Agent-neutral wording: no tool names, slash commands or vendor-specific syntax. **[lint]**

## 7. Provenance — derived, not cloned

- No brand names, product names, logos, wordmarks or trademarks from the reference. **[lint: names in intake.json]**
- No copied text, illustrations, photos or icons. Describe the style of imagery and give a recipe for
  making original ones instead.
- Proprietary fonts are replaced with the closest redistributable family; the substitution is recorded
  in `analysis.json`.
- The template gets its own name. It must not contain the reference's name.
- Distinctive signature elements (a unique logo-like shape, a trademarked color name) are generalized.

## 8. Budget

- `agent.md` (the bundle) stays under about 13,000 tokens (20,000 for `schemaVersion: 2`, which carries
  recipes), counted as characters ÷ 4 with whitespace collapsed — squeezing spaces out of a recipe gains
  nothing. Details beyond that are served on demand by MCP (`get_component_spec`). **[lint]**
- Lead with what matters most: character summary, the 10 rules that define the look, then tokens.
- When the budget is tight, cut instance detail (one demo screen's numbers, an extra example), never a
  general rule or a check in Verification.

## 9. Generalize — the demo apps are samples, not the target

The harness tests a package on four demo apps (a blog, a store, a dashboard, settings). People will build
everything else. A rule that only makes sense on one demo screen makes the package worse for every other
product, and the lab cannot see it: the same four apps are the test.

- Never name a demo app's products, posts, projects, people, routes or test ids, or describe one of its
  screens ("the tote", "the billing page", "`product-card`"). **[lint: prose.overfit]**
- Turn every review finding into the general principle it is missing: not "the skillet's handle is too
  short" but "a drawn object's defining part is at least 2 units thick and 30% of its width". Ask: would
  this rule help a product the harness has never seen — a booking flow, a CRM, a docs site?
- Name kinds of content and screens (a product image, a data table, a form, an empty state), never
  instances.
- If a finding cannot be stated generally, it is variance or taste: log it in `iterations.md` and leave the
  package alone.

## 10. Change discipline

- Every iteration records what changed and why in `pipeline/<slug>/iterations.md`.
- Published versions never change. A fix is a new version with a `CHANGELOG.md` entry
  (`updating.md` has the whole process).
- The changelog entry of a final version is public: an opening paragraph of what people will notice, then
  one concrete bullet per change. No version numbers, candidate names or pipeline notes — people only see
  dates. **[lint]**
- Versions are internal everywhere else too: never refer to a version number in the package's prose.
