### Code block

**Use.** Code, commands, raw data. Inline code: mono `font.size.small` on `color.surface.subtle`, padding 0 `space.4`, `radius.swatch`.

**Anatomy.** Optional header (mono `font.size.caption` file name in `color.code.muted`, copy button). Body mono `font.size.small`, `font.lineHeight.code`, padding `space.16` `space.20`, `radius.media`, horizontal scroll.

**Variants.** Dark (default): `color.code.bg`, `color.code.text`, strings `color.code.string`, comments and prompt `color.code.muted`, 1px ring `color.code.ring`. Featured panel: plus `radius.codePanel` and `shadow.codePanel`, max 1 per screen. Light: `color.surface.inset`, `color.text.primary`, `elevation.rest`.

**States.** Copy: a ghost button in `color.code.text`; reads "Copied" for 2s. Focus on the dark ground: outline in `color.code.text`.

**Do / Don't.** Do limit syntax colors to the 4 code tokens. Don't use a rainbow theme.
