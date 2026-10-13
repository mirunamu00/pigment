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

## 4. Components are complete or honestly incomplete

- Every component in `REQUIRED_COMPONENTS` is `specified` or `partial`. **[lint]**
- A spec covers: purpose, anatomy, sizes, variants, states (default, hover, focus-visible, active,
  disabled, loading, error where relevant), token mapping, keyboard and screen-reader behavior.
- Anything not specified is listed as such — agents must not invent it silently.

## 5. Agent instructions

`agent/instructions.md` has these sections, in order: **[lint]**
`## New project`, `## Existing project`, `## Ongoing development`, `## Verification`, `## Rollback`.

- Existing project: audit first, plan, wait for approval, map tokens onto existing variables, restyle one
  screen as a sample, wait again, then go screen by screen with one commit each.
- Preservation list: routes, business logic, API contracts, form semantics, test ids, accessibility.
- Ongoing: install the pointer lines in `AGENTS.md`/`CLAUDE.md`; never hard-code new values.
- Agent-neutral wording: no tool names, slash commands or vendor-specific syntax. **[lint]**

## 6. Provenance — derived, not cloned

- No brand names, product names, logos, wordmarks or trademarks from the reference. **[lint: names in intake.json]**
- No copied text, illustrations, photos or icons. Describe the style of imagery instead.
- Proprietary fonts are replaced with the closest redistributable family; the substitution is recorded
  in `analysis.json`.
- The template gets its own name. It must not contain the reference's name.
- Distinctive signature elements (a unique logo-like shape, a trademarked color name) are generalized.

## 7. Budget

- `agent.md` (the bundle) stays under ~6,000 words. Details beyond that are served on demand by MCP
  (`get_component_spec`). **[lint]**
- Lead with what matters most: character summary, the 10 rules that define the look, then tokens.

## 8. Change discipline

- Every iteration records what changed and why in `pipeline/<slug>/iterations.md`.
- Published versions never change. A fix is a new version with a `CHANGELOG.md` entry
  (`updating.md` has the whole process).
- The changelog entry of a final version is public: an opening paragraph of what people will notice, then
  one concrete bullet per change. No version numbers, candidate names or pipeline notes — people only see
  dates. **[lint]**
- Versions are internal everywhere else too: never refer to a version number in the package's prose.
