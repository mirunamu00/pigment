### Avatar

**Anatomy.** A `size.control` (40px) square tile, `radius.tile`, serif initials `font.size.h5`, 400,
`color.text.primary`; a photo fills the tile, clipped. Tile color: (sum of the name's char codes) mod 3 picks
`color.stage.sage`, `color.stage.lilac` or `color.stage.apricot`, so a list spreads across all three (header
account avatar too).
40px in cards, lists and grids, never smaller; only the header account button uses
`size.controlSm`. Stacks overlap by `space.8` with a 2px `color.surface.default` ring.

**States.** Linked: focus-visible outline, no hover change. `alt=""` beside a visible name, otherwise the name.
