### Avatar

**Anatomy.** A `size.control` (40px) square tile, `radius.tile`, serif initials `font.size.h5`, 400,
`color.text.primary`; a photo fills the tile, clipped. Tile color: (sum of the name's char codes) mod 3 picks
`color.stage.sage`, `color.stage.lilac` or `color.stage.apricot` (header account avatar too).
Never smaller, except the header account button (`size.controlSm`). Stacks overlap by `space.8` with a 2px `color.surface.default` ring.

**States.** Linked: focus-visible outline, no hover change. `alt=""` beside a visible name, otherwise the name.
