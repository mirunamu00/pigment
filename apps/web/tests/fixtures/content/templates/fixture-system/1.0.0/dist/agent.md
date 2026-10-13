# Fixture System 1.0.0

Design system `fixture-system@1.0.0`. A neutral test system used by end-to-end tests of the site, the API and the MCP server.

This document is the complete design specification. Use the values and rules here instead of your own defaults. Where something is not specified, choose the option most consistent with the rules below and say so in your report. Token values are also provided as `tokens.css` and `tokens.json` next to this file — copy them, do not retype them.

## Character

three sentences: what this system feels like, what it is for, what it refuses to do

## The ten rules that define this look

Each rule: the rule, then why, in one line each. Reference tokens by name.

1. rule — why
2. rule — why
3. rule — why
4. rule — why
5. rule — why
6. rule — why
7. rule — why
8. rule — why
9. rule — why
10. rule — why

## Never

Defaults a coding agent tends to add that would break this look.

- e.g. "No gradients on surfaces or buttons."

## Color use

how much accent per screen, where status colors may appear, how surfaces stack

## Typography

which size for what, maximum sizes per screen, weight usage, line length

## Spacing and density

base unit, component padding, section spacing, how density changes on dense data screens

## Shape and depth

radius per component size, when to use border vs shadow, elevation levels

## Motion

durations and easing per interaction type; what never animates

## Layout adaptation

grid, max content width, content priority on narrow screens, touch targets; no page templates

## Imagery and icons

icon style, stroke width, size grid; illustration and photo treatment

## Accessibility

Text contrast at least 4.5:1 (7:1 for body text on the default surface), visible focus using `color.focus.ring`
at 2px with 2px offset, touch targets at least 44px, motion reduced when the user asks for it.

## Semantic color tokens — light

| Token | CSS variable | Value |
| --- | --- | --- |
| `color.neutral.0` | `--color-neutral-0` | `#ffffff` |
| `color.neutral.50` | `--color-neutral-50` | `#f7f7f8` |
| `color.neutral.100` | `--color-neutral-100` | `#eeeef0` |
| `color.neutral.200` | `--color-neutral-200` | `#dedee2` |
| `color.neutral.300` | `--color-neutral-300` | `#c4c4ca` |
| `color.neutral.500` | `--color-neutral-500` | `#6e6e78` |
| `color.neutral.600` | `--color-neutral-600` | `#55555e` |
| `color.neutral.700` | `--color-neutral-700` | `#3f3f46` |
| `color.neutral.800` | `--color-neutral-800` | `#27272a` |
| `color.neutral.900` | `--color-neutral-900` | `#18181b` |
| `color.neutral.950` | `--color-neutral-950` | `#0c0c0e` |
| `color.accent.400` | `--color-accent-400` | `#5b8cff` |
| `color.accent.500` | `--color-accent-500` | `#2f6bff` |
| `color.accent.600` | `--color-accent-600` | `#1f55e0` |
| `color.accent.700` | `--color-accent-700` | `#1a45b8` |
| `color.green.400` | `--color-green-400` | `#3fbf75` |
| `color.green.600` | `--color-green-600` | `#167a3e` |
| `color.amber.400` | `--color-amber-400` | `#e0a84a` |
| `color.amber.600` | `--color-amber-600` | `#8a5300` |
| `color.red.400` | `--color-red-400` | `#f27272` |
| `color.red.600` | `--color-red-600` | `#c42b2b` |
| `color.blue.400` | `--color-blue-400` | `#6aa2ff` |
| `color.blue.600` | `--color-blue-600` | `#1d5fbf` |
| `color.surface.default` | `--color-surface-default` | `#ffffff` |
| `color.surface.subtle` | `--color-surface-subtle` | `#f7f7f8` |
| `color.surface.raised` | `--color-surface-raised` | `#ffffff` |
| `color.text.primary` | `--color-text-primary` | `#18181b` |
| `color.text.secondary` | `--color-text-secondary` | `#55555e` |
| `color.text.onAction` | `--color-text-on-action` | `#ffffff` |
| `color.border.default` | `--color-border-default` | `#dedee2` |
| `color.border.strong` | `--color-border-strong` | `#c4c4ca` |
| `color.action.primary` | `--color-action-primary` | `#1f55e0` |
| `color.action.primaryHover` | `--color-action-primary-hover` | `#1a45b8` |
| `color.focus.ring` | `--color-focus-ring` | `#2f6bff` |
| `color.status.success` | `--color-status-success` | `#167a3e` |
| `color.status.warning` | `--color-status-warning` | `#8a5300` |
| `color.status.danger` | `--color-status-danger` | `#c42b2b` |
| `color.status.info` | `--color-status-info` | `#1d5fbf` |

## Semantic color tokens — dark

| Token | CSS variable | Value |
| --- | --- | --- |
| `color.neutral.0` | `--color-neutral-0` | `#ffffff` |
| `color.neutral.50` | `--color-neutral-50` | `#f7f7f8` |
| `color.neutral.100` | `--color-neutral-100` | `#eeeef0` |
| `color.neutral.200` | `--color-neutral-200` | `#dedee2` |
| `color.neutral.300` | `--color-neutral-300` | `#c4c4ca` |
| `color.neutral.500` | `--color-neutral-500` | `#6e6e78` |
| `color.neutral.600` | `--color-neutral-600` | `#55555e` |
| `color.neutral.700` | `--color-neutral-700` | `#3f3f46` |
| `color.neutral.800` | `--color-neutral-800` | `#27272a` |
| `color.neutral.900` | `--color-neutral-900` | `#18181b` |
| `color.neutral.950` | `--color-neutral-950` | `#0c0c0e` |
| `color.accent.400` | `--color-accent-400` | `#5b8cff` |
| `color.accent.500` | `--color-accent-500` | `#2f6bff` |
| `color.accent.600` | `--color-accent-600` | `#1f55e0` |
| `color.accent.700` | `--color-accent-700` | `#1a45b8` |
| `color.green.400` | `--color-green-400` | `#3fbf75` |
| `color.green.600` | `--color-green-600` | `#167a3e` |
| `color.amber.400` | `--color-amber-400` | `#e0a84a` |
| `color.amber.600` | `--color-amber-600` | `#8a5300` |
| `color.red.400` | `--color-red-400` | `#f27272` |
| `color.red.600` | `--color-red-600` | `#c42b2b` |
| `color.blue.400` | `--color-blue-400` | `#6aa2ff` |
| `color.blue.600` | `--color-blue-600` | `#1d5fbf` |
| `color.surface.default` | `--color-surface-default` | `#0c0c0e` |
| `color.surface.subtle` | `--color-surface-subtle` | `#18181b` |
| `color.surface.raised` | `--color-surface-raised` | `#27272a` |
| `color.text.primary` | `--color-text-primary` | `#f7f7f8` |
| `color.text.secondary` | `--color-text-secondary` | `#c4c4ca` |
| `color.text.onAction` | `--color-text-on-action` | `#ffffff` |
| `color.border.default` | `--color-border-default` | `#27272a` |
| `color.border.strong` | `--color-border-strong` | `#3f3f46` |
| `color.action.primary` | `--color-action-primary` | `#1f55e0` |
| `color.action.primaryHover` | `--color-action-primary-hover` | `#2f6bff` |
| `color.focus.ring` | `--color-focus-ring` | `#5b8cff` |
| `color.status.success` | `--color-status-success` | `#3fbf75` |
| `color.status.warning` | `--color-status-warning` | `#e0a84a` |
| `color.status.danger` | `--color-status-danger` | `#f27272` |
| `color.status.info` | `--color-status-info` | `#6aa2ff` |

## Primitive tokens

| Token | CSS variable | Value |
| --- | --- | --- |
| `font.family.body` | `--font-family-body` | `Inter, system-ui, -apple-system, "Segoe UI", Pretendard, "Noto Sans KR", sans-serif` |
| `font.family.mono` | `--font-family-mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace` |
| `font.size.xs` | `--font-size-xs` | `12px` |
| `font.size.sm` | `--font-size-sm` | `14px` |
| `font.size.md` | `--font-size-md` | `16px` |
| `font.size.lg` | `--font-size-lg` | `18px` |
| `font.size.xl` | `--font-size-xl` | `24px` |
| `font.size.2xl` | `--font-size-2xl` | `32px` |
| `font.size.3xl` | `--font-size-3xl` | `48px` |
| `font.weight.regular` | `--font-weight-regular` | `400` |
| `font.weight.medium` | `--font-weight-medium` | `500` |
| `font.weight.semibold` | `--font-weight-semibold` | `600` |
| `font.lineHeight.tight` | `--font-line-height-tight` | `1.15` |
| `font.lineHeight.normal` | `--font-line-height-normal` | `1.5` |
| `font.lineHeight.relaxed` | `--font-line-height-relaxed` | `1.7` |

| Token | CSS variable | Value |
| --- | --- | --- |
| `space.1` | `--space-1` | `4px` |
| `space.2` | `--space-2` | `8px` |
| `space.3` | `--space-3` | `12px` |
| `space.4` | `--space-4` | `16px` |
| `space.6` | `--space-6` | `24px` |
| `space.8` | `--space-8` | `32px` |
| `space.12` | `--space-12` | `48px` |
| `space.16` | `--space-16` | `64px` |

| Token | CSS variable | Value |
| --- | --- | --- |
| `radius.sm` | `--radius-sm` | `4px` |
| `radius.md` | `--radius-md` | `8px` |
| `radius.lg` | `--radius-lg` | `12px` |
| `radius.full` | `--radius-full` | `9999px` |

| Token | CSS variable | Value |
| --- | --- | --- |
| `border.width.thin` | `--border-width-thin` | `1px` |
| `border.width.thick` | `--border-width-thick` | `2px` |

| Token | CSS variable | Value |
| --- | --- | --- |
| `shadow.sm` | `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.06)` |
| `shadow.md` | `--shadow-md` | `0 8px 24px -8px rgba(0, 0, 0, 0.18)` |

| Token | CSS variable | Value |
| --- | --- | --- |
| `motion.duration.fast` | `--motion-duration-fast` | `120ms` |
| `motion.duration.base` | `--motion-duration-base` | `200ms` |
| `motion.easing.standard` | `--motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` |

| Token | CSS variable | Value |
| --- | --- | --- |
| `breakpoint.sm` | `--breakpoint-sm` | `640px` |
| `breakpoint.md` | `--breakpoint-md` | `768px` |
| `breakpoint.lg` | `--breakpoint-lg` | `1024px` |
| `breakpoint.xl` | `--breakpoint-xl` | `1280px` |

## Components

### Button

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Text field

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Select

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Checkbox

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Switch

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Tabs

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Navigation

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Card

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Table

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Badge

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Dialog

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

### Toast

**Purpose.** when to use it, and when to use something else

**Anatomy.** parts, in order

**Sizes.** height, padding, gap, text size — as tokens

**Variants.** each variant and when it is used

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | Specified for the test fixture. |
| hover | Specified for the test fixture. |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| disabled | Specified for the test fixture. |

**Token mapping.** surface, text, border, radius, shadow, motion tokens per part

**Keyboard and screen readers.** keys, roles, labels, announcements

**Do / Don't.** one of each

## New project

1. Inspect the framework, styling approach and component structure. Propose an installation plan and wait for approval.
2. Install the tokens: copy `dist/tokens.css` into the project's global styles (or map `dist/tokens.json` into the theme system the project already uses). Do not retype values.
3. Load the fonts listed in the manifest with their fallbacks, including the CJK fallback.
4. Build the base components in the order of the component list, each with every specified state.
5. Create `design-system/` in the repository with `VERSION`, the tokens, and a short `components.md` describing the conventions you established.
6. Add one line to `AGENTS.md` and `CLAUDE.md` (create them if missing): "UI work follows design-system/ — read it before building screens."

## Existing project

1. Audit: styling approach, global styles, shared components, routes, tests. List what the change would touch and what must be preserved.
2. Propose a migration plan and wait for approval.
3. Map the tokens onto the project's existing variables or theme. Keep existing variable names working (alias them) so nothing breaks mid-migration.
4. Restyle one representative screen as a sample and wait for review.
5. Continue screen by screen, one commit per screen. Adapt to the existing information structure; never force a layout from a reference image.
6. Preserve: routes, business logic, API contracts, form fields and validation, test ids, labels used by tests, accessibility attributes.
7. Finish with the `design-system/` folder and the `AGENTS.md` / `CLAUDE.md` pointer described under New project.

## Ongoing development

- Before building UI, read `design-system/`. Use semantic tokens and existing components; do not hard-code colors, sizes, radii or shadows.
- If a need is not covered by the system, compose from existing tokens, then note it in `design-system/components.md`.
- If a request conflicts with the system, present the options instead of deciding silently.

## Verification

- The project builds and its tests pass.
- Every screen was checked at 1440px and 390px wide, in light and dark if both are defined.
- Focus is visible on every interactive element; text meets the contrast rules in this document.
- No raw color, size or radius values were introduced outside the token files.
- Report: files changed, anything in this document you could not apply, decisions you made yourself.

## Rollback

- Each screen is its own commit, so any step can be reverted alone.
- Token installation is a separate commit; reverting it restores the previous look once the screen commits are reverted.
