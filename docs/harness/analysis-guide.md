# Reference analysis guide

How the `reference-analyst` turns a captured site into `analysis.md` + `analysis.json`.
Inputs come from `pnpm harness capture`: full-page screenshots (desktop 1440, mobile 390, light and dark
when the site supports it), component crops, and `styles.json` with measured computed styles.

## Order of work

1. **Look first.** Read every screenshot before any numbers. Write the character in three sentences and
   pick 3–8 keywords. What would you lose if you changed one thing?
2. **Measure.** Use `styles.json` for facts: color frequency by painted area, font families and size
   histogram, line heights, letter spacing, radii, border widths, shadows, spacing values, transitions,
   CSS custom properties, breakpoints from media queries.
3. **Assign roles.** Map measured values to roles (surface, text, action, border, status, focus). A color
   that appears on 0.2% of the area may still be the action color — use component crops to decide.
4. **Find the system.** Infer the spacing base (4 or 8?), the type scale ratio, the radius set, the
   elevation strategy (borders vs. shadows vs. tone). Note values that break the system — usually noise.
5. **Components.** For each visible component: anatomy, size, padding, radius, states you can see
   (hover/focus need interaction captures), and what makes it characteristic.
6. **Gaps.** List what the reference does not show (dark mode, error states, dense tables). The template
   must still specify them — derived from the character, and flagged as derived.
7. **Provenance.** List brand assets, proprietary fonts, distinctive marks and copy that must not be
   carried over, and the substitutes chosen.

## analysis.md structure

`# <slug>` · `## Character` · `## Color` · `## Typography` · `## Spacing and layout` · `## Shape and depth` ·
`## Motion` · `## Components` · `## Imagery and icons` · `## What the reference does not show` ·
`## Must not carry over` · `## Proposed template` (name, tags, the 10 defining rules).

Each claim cites evidence: a screenshot file, a `styles.json` path, or a crop.

## Checkpoint

The analysis is shown to the user before authoring starts. The user confirms the character summary,
the proposed name and the 10 defining rules.
