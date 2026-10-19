The restyle to margin-notes 1.2.0-rc.1 is done across every screen. The build passes, all 10 smoke tests pass, and nothing scrolls sideways at 390px. I checked screenshots of every page at 1440px and 390px in light and dark. I also checked the states the smoke tests don't screenshot: cart with items, checkout errors, order confirmation with its toast, the "no products match" state, a sold-out product and the not-found page. I used a temporary route to reach the cart states and removed it afterwards.

**Not committed.** You only allowed the npm/node commands, so I didn't create a branch or the per-screen commits the spec asks for. Everything is uncommitted in the working tree.

**What changed**
- **Tokens, fonts and the shell:** `tokens.css` is copied unedited into `src/styles/`, and the old variable names point at the new tokens. The four fonts load from Google Fonts. Dark mode follows the system setting. The header, footer and page width follow the spec (content starts at 40px on desktop).
- **Signature elements**, as reusable components in `src/components/Studio.tsx`: the shared watercolor filters, bloom, tape, pencil note and serif word with swash. They're all hidden from screen readers and never take clicks. Pencil notes hide below 1200px, and all motion stops under reduced motion.
- **Where they appear:**
  - Product grid: the bloom behind the header, "goods" in serif italic with the swash, and a pencil note "made for daily use" beside the lead.
  - Empty cart and not-found pages: a lifted panel with one tape strip, a small bloom and a pencil note beside the button.
  - Product page, cart, checkout and confirmation: none, as the spec says.
- **Components:** the buttons, inputs, select, checkbox, chips, badges and cards now follow the spec, with hover, focus and disabled states. On phones the category chips scroll in their own strip with a faded edge, and the selected chip scrolls into view.
- **Product page:** colour and size are now a segmented control, and the image is a plain hatched placeholder. On phones the title and price come before the image (nothing may sit between the breadcrumb and the title), and "Add to cart" moves to a fixed bottom bar.
- **Cart:**
  - Checkout errors show a danger box at the top ("3 fields need attention") and an icon on each field message.
  - On phones "Place order" sits in the fixed bottom bar.
  - Placing an order also shows an "Order placed" toast, and the confirmation gets a "Placed" success badge.
- **Docs:** `design-system/` with `VERSION`, the token files and `components.md`. `AGENTS.md` and `CLAUDE.md` now carry the pointer line.

All routes, labels, form fields, `data-testid`s, accessibility attributes and behaviour are unchanged.

**What I couldn't apply**
- **Tape and the featured-item pencil note:** they only go on a pinned or featured item, and the store has none. I didn't invent one, so tape only appears on the page-level empty states.
- **Update date in `VERSION`:** the spec gives no date, so I used today's.

**What I decided myself**
- **Cart title size:** the cart, confirmation and not-found titles use the smaller record-detail size, since the spec doesn't name a size for checkout.
- **"Added to cart" message:** the spec says in-place confirmations become a one- or two-word badge. It now reads "[✓ Added] 2 items (…) to your cart. View cart". The test text "Added 2 items" still matches.
- **Product cards:** 12px padding (8px on phones), with the image corner radius worked out from that. On phones the grid shows two cards per row, and between 860 and 1199px also two per row, because the 8-column grid there doesn't split into three.
- **Mono numbers:** line totals and the order summary use the mono font as totals. The word "Free" in the shipping row stays in the sans font.
- **Not-found page:** the panel has no title, because the page heading already says it.
- **Smaller calls:** breadcrumb links are grey rather than black and underlined. The empty-state top spacing respects both the bloom's 56px and the 64px maximum below the lead. I nudged the pencil note so its arrow lands about 8px from its target instead of the recipe's ~15px, to meet the 6–12px rule.