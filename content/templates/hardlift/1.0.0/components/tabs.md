### Tabs

**Purpose.** Switch between peer views in the same page; use navigation for pages. The same pill is used for filters and single-choice options.

**Anatomy.** A row of pills (`role="tablist"`), then the panel.

**Sizes.** Pill padding `space.8` `space.12`, `font.size.md`, `radius.full`, gap `space.4`; about 12 per row, then the strip scrolls.

**Variants.** Tabs (one selected), filter chips (`aria-pressed`, multi), sort tabs. On a band the selected pill is `color.surface.raised`.

**States.**

| State | What changes (tokens) |
| --- | --- |
| default | transparent 1px border, `color.text.primary` |
| hover | 1px `color.border.default` border appears, `motion.duration.fast` |
| focus-visible | 2px `color.focus.ring` outline, 2px offset |
| selected | `color.surface.raised` fill with ink border |

**Token mapping.** `radius.full`, `border.width.thin`, no shadow, no sliding indicator.

**Keyboard and screen readers.** Arrow keys move, Home/End jump, Enter/Space select (automatic activation for tabs); `aria-selected`, `aria-controls`, panel `role="tabpanel"`.

**Do / Don't.** Do keep labels 1-2 words. Don't use a pill as a primary action.
