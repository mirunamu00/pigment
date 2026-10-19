### Text field

**Use.** Single-line input, including search. Textarea: min height 96px, padding `space.10` `space.12`, vertical resize.

**Anatomy.** Label above (`font.size.small`, medium, `color.text.primary`), optional hint (`font.size.small`, `color.text.secondary`). Input height per rule 8, `box-sizing: border-box`, padding 0 `space.12`, `font.size.ui`, `radius.control`, `color.surface.raised`, 1px `color.border.control`, placeholder `color.text.tertiary`; in a flex row `flex: 1 1 240px; min-width: 0`. Gaps `space.6`; fields `space.20` apart.

**Search.** `input::-webkit-search-cancel-button, input::-webkit-search-decoration { -webkit-appearance: none }`. A clear control, if the app has one: 24px ghost icon button in the right padding (input `padding-right: space.32`), 16px x `color.text.secondary`, `aria-label="Clear search"`, only with a value.

**States.** Hover: border `color.border.strong`. Read-only: `color.surface.subtle`.

**A11y.** Visible `<label for>`, never placeholder-only.
