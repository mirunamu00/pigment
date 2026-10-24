# Changelog

## 0.1.0-rc.2

Chunkier type, fuller scenes and a ground strip that reads at full width; tighter rules for cards, dashboards and menus.

- `font.family.pixel`: Galmuri11 → NeoDunggeunmo (16px grid); `font.family.pixelMono`: GalmuriMono11 → NeoDunggeunmo Code; Galmuri is now the alternative; font smoothing off on the root.
- Rules 1, 3 and 8: every drawn object has an outline, a top-left highlight and a bottom-right shade; the pixel face is a 16px-grid face; every stage has 3 depth layers, 6 to 12 varied props and 3 to 8 lights.
- Pixel stage recipe: three-layer construction, a `row()` helper for uneven prop rows, `.base`, `.hi` and `.shade` classes for object shading, lights on props, a fill check; focal subject never one lone building.
- Ground strip: `color.art.groundHi` raised one step lighter and laid over the whole band, new `color.art.edgeHi` dotted edge row, new `size.groundSprite` (48px) layer with sprites 24 to 48px tall.
- Card: the marker hangs in the left padding; titles stay flush with icon and meta. Dashboard panels: titles outside, bullet captions inside, equal heights; n-of-m progress as a block meter.
- Navigation: dropdowns are marker menus; search placeholders never clip. Badge: the selected chip's marker replaces its bullet.
- Game-window limits: inline figures and the newsletter use 2px frames. Never: a single centred building in the hero; marker plus bullet; a 32px title inside a panel. Verification: stem, scene, light, ground-strip and frame counts.

## 0.1.0-rc.1

First candidate of the night-console pixel system: night ground and parchment day appearance, one pixel typeface for Hangul and Latin, game-window chrome, the RPG marker, and pixel scenes that move in stepped frames.

- Tokens: night and day semantic colours, 12-bit scene colours (`color.art.*`), eight identity hues (`color.hue.*`), the 12/16/32/48 type scale at weight 400, 2px and 4px borders, `radius.none`, `shadow.hard`, stepped motion durations and easings.
- Signature elements: pixel stage, stepped motion, RPG marker with instant physical response, game-window chrome, pixel type with a readable-body switch.
- Components: button, text field, select, checkbox and radio, switch, tabs, navigation, card, table, badge, dialog, toast, empty state.
