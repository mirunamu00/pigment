All five screens (Home, Pricing, Customers, Sign up and the 404 page) now use margin-notes@1.1.0, in light and dark. The build passes and all 15 smoke tests pass. The final screenshot run (1440 and 390px, light and dark) shows no sideways scrolling on any page. Nothing is committed: the spec asks for one commit per screen, but git isn't one of the commands I was allowed to run, so all changes are in the working tree.

**What changed**
- **Setup:** `tokens.css` is copied unchanged into `src/styles/`, and the old CSS variables now point at the new tokens. The four fonts load from Google Fonts with `display=swap`. The shared watercolor filters render once in `Layout`. The page uses the spec's root settings, including a global focus ring and no horizontal scroll. Under `prefers-reduced-motion` all transitions and animations drop to 0ms.
- **Reusable pieces:**
  - The three studio marks (bloom, tape, pencil note), built to their recipes.
  - A set of 1.5px outline icons.
  - A toast: auto-dismisses after 5s, pauses on hover, Escape closes it, at most 3 show at once.
  - Styles for buttons, fields, the select chevron, checkbox, callout, badge, chips, segmented control, cards, the image placeholder frame, the empty state and the header menu sheet.
- **Studio marks per screen:**

  | Screen | Bloom | Serif word | Tape | Pencil note |
  | --- | --- | --- | --- | --- |
  | Home | Hero | "themselves" | First testimonial | Lead: "the time that works" |
  | Pricing | Header | none | Team plan | Lead: "a trial on every plan" |
  | Customers | Header | "run" | Featured quote | Lead: "days kept in order" |
  | Sign up | none | none | none | none (forms get no marks) |
  | 404 | Empty-state bloom | none | Empty panel | Button: "back home" |

- **Per screen:**
  - **Home:** the gray section backgrounds are gone and sections sit on a 12-column grid. Stats are cards and the FAQ is a hairline list. The illustrated hero image is replaced by the spec's hatched placeholder frame.
  - **Pricing:** the Monthly/Yearly toggle is a segmented control. The comparison table sits in a framed region that fades its edge and shows a "Scroll sideways" hint if it overflows.
  - **Customers:** the industry filters are chips that scroll in their own strip on mobile and keep the selected one in view.
  - **Sign up:** fields are 40px tall with an icon on each error message. A failed submit adds a "N fields need attention" callout at the top. Success shows an "Account created" badge plus a toast.
- **Newsletter:** a valid email now also triggers a toast.
- Every `data-testid`, route, label text, form field and ARIA attribute is unchanged.
- I added `design-system/` (`VERSION`, the token files, `components.md`) and one-line pointers in new `AGENTS.md` and `CLAUDE.md` files.

**Not applied**
- **Fixed mobile action bar:** the header's Sign up button is always visible on mobile, so I didn't add one.
- **Radiogroup roles on the toggle and filters:** they keep their `aria-pressed` buttons because the tests rely on them.
- **The menu breakpoint:** the nav still collapses at 720px as the README requires, not at the spec's 860px. Everything else uses 860px.

**Decisions I made**
- **Which marks a landing page gets:** a landing site isn't on the spec's per-app list. I treated it like the "Store" pattern (bloom, serif word and note on index headers, tape on featured cards).
- **Pricing gets no serif word:** I counted pricing as close to checkout, where the spec doesn't allow one.
- **Pencil notes:** I hung lead notes from the lead's top edge instead of its middle. Otherwise a single-line lead pushed the note into the h1. The arrow tip still lands about 10px from the lead (measured).
- **Hero layout:** the copy now sits above the image frame instead of beside it, so the bloom doesn't sit behind the image.
- **Added text:** the 404 panel has a new title, "Nothing lives at this address", because the empty-state pattern needs one. The new toast messages ("Account created", "Subscribed to product updates") are also new text.
- **Comparison table:** the ✓/— marks are centered rather than right-aligned, since they aren't numbers.