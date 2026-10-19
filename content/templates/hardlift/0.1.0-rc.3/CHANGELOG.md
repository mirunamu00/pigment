# Changelog

## 0.1.0-rc.3

Internal: linked-card lift sits on the outer bordered box; exactly one pink action in view (component-owned buttons, open triggers and selected controls yield); photo placeholders and figures are distinct sticker objects or scenes, never a generic image glyph. Checkbox and switch selected fill is now `color.action.inverse`; select selected option is `color.surface.subtle`.

## 0.1.0-rc.2

Internal: text inside bands and colored fills must be ink (`color.text.onBand`, new); secondary, muted and link colors are restricted to paper and raised surfaces, answering an automated color-contrast failure.

## 0.1.0-rc.1

First candidate of Hardlift: warm paper, ink outlines and one loud pink, with buttons that lift off the page on hover, color-flooded section headers, outline-on-demand pills and flat sticker art.

- Hard-lift buttons: hover translates -4px -4px with a solid `shadow.md` in `color.shadow.hard`, 150ms `motion.easing.standard`; hero CTA lifts 8px over an ink plate.
- Section headers flood with one `color.band.*`; pills show their outline on hover and fill with `color.surface.raised` when selected.
- Tables, toasts, dialogs, loading, empty and error states are derived from the same rules.
