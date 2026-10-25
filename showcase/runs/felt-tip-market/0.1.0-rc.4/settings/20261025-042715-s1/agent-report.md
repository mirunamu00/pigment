I've restyled every screen with Felt-tip Market 0.1.0-rc.4. The build passes, all 8 smoke tests pass, and the final screenshots (1440px and 390px, light and dark) show no page scrolling sideways. Every route, behavior, label text, form field, `data-testid` and accessibility attribute is unchanged.

## What changed

**Foundations**
- **Tokens:** an unmodified copy of `tokens.css` is in `design-system/tokens.css`. The old variable names in `src/styles/base.css` now point to the new tokens, so nothing that used them breaks.
- **Dark mode:** follows the system setting, and `data-theme="light"` or `"dark"` forces a mode.
- **Fonts:** Space Grotesk (400–700) and JetBrains Mono (400) are bundled with the app through two `@fontsource` packages, so no font is fetched from the web at runtime.

**Signature elements** (reusable pieces in `src/components/ft/` and `src/styles/felt-tip.css`)
- **Lift and slam:** every button rises on a hard shadow on hover and slams flat when pressed. The plate stack is used once, on the 404 recovery link. The motion stops under reduced motion.
- **Sticker kit:** seven original objects built with the spec's five-step recipe: name badge, bell, key, coin, laptop, folder and magnifier. Every strip is about 13% of the object at each size, and none is used twice on a screen.
- **Area colors:** Profile is lemon (badge), Notifications periwinkle (bell), Security teal (key), Billing marigold (coin). Each screen opens on a header band in its color, with breadcrumb, title, lead and one sticker. I measured the sticker at 200px on desktop and 120px on phones, 75% visible and taller than the title block.
- **Other pieces:** ink-framed boxes, ruled rows and pills, the notched price flag, and a black footer. The footer has a search box with a pink arrow button that jumps to the matching section.

**Per screen**
- **Profile:** form in one white panel, avatar as a dashed placeholder box showing the initials, custom select arrow, pink Save button.
- **Notifications:** the "3 of 6 notifications on" count is a price flag in the band; switches follow the spec.
- **Security:** password strength is shown as ink text with a coloured status dot. The sessions table has an ink frame, a scrolling sticky first column on phones, and an empty state with a laptop drawing.
- **Billing:** the current plan gets the pink selected border and check disc. Flags mark plan prices and each invoice amount. The dialog has a hard shadow, ruled header and footer, a new close button, and turns into a bottom sheet on phones.
- **404:** a full-height band with two drawings (folder and magnifier) and the plate-stack recovery button.

I checked the error, saved, strength, empty and dialog states and every sticker on its own using temporary routes, then removed them.

The `design-system/` folder has `VERSION` and `components.md` (area map, sticker list, where each element is used), and `AGENTS.md` and `CLAUDE.md` contain the one-line pointer.

## Could not apply
- **One commit per screen:** git was not on the list of commands I was allowed to run, so all changes are uncommitted in the working tree.
- **Word badge and rocking loading sticker:** both are built, but no screen has a success page or a loading state to use them.
- **Hero, hero action row, split bands, pink closing band, charts:** no screen in this app calls for them.

## Decisions I made myself
- **Stickers in every header band:** the spec puts header stickers only on overview screens. Each settings section is its area's only screen, so I treated each as that area's overview and gave it one.
- **Header band placement:** the bands sit in the content column beside the 240px sidebar rather than spanning the whole window.
- **Sidebar links:** underlined links, with the current section as a filled pill. Below 768px the sidebar becomes a scrolling row of pills.
- **Pink on Billing:** at rest it is used for buttons, the flag and the selected border, which is the limit of three. Focusing the footer input adds the pink focus ring as a fourth.
- **Footer contrast:** I made its focus ring white and its hover shadow the dark-mode shadow, so both stay visible on the black footer in light mode.
- **Footer seam:** in dark mode the footer's top edge uses the 35% white border so it doesn't merge with the black page.
- **New text:** I added the "Personal details" panel title on Profile and the footer wording ("Your account, sorted." and the shortcut links).
- **Sessions empty state:** it has no action button, because there is nothing sensible to offer there.
- **`VERSION` date:** the spec gives no update date, so it records the date I applied it.