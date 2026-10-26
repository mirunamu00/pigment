# Halfpenny — showcase product

A realistic website for **Halfpenny**, a fictional independent, reader-funded online magazine about food, design, music
and neighbourhoods in the fictional city of Calder. It is a Pigment showcase product: coding agents restyle this exact
site with a published design system, and the gallery shows the before and after. Its own house design is deliberately
competent and conventional.

React 19 + Vite + react-router 7, plain CSS with custom properties, Newsreader + Inter from Google Fonts. No UI
libraries. All content is hard-coded (no dates computed at runtime); images are never lazy-loaded.

```
npm install
npm run dev       # or: npm run build && npm run preview
```

## Pages

| Route | What |
| --- | --- |
| `/` | Front page: lead story, latest rail, latest by section, most read, long reads, weekend listings strip, photo essay teaser, newsletter band |
| `/stories/the-last-hour-at-tanner-street` | The long-read (captured): standfirst, byline, hero photo, subheads, inline photos with credits, pull quote, share row, author box, related stories. Every other `/stories/<slug>` also works |
| `/section/food` | Section front (captured): header, featured story, type filters, load more, sidebar. `/section/design`, `/music`, `/neighbourhoods` work too |
| `/events` | Listings by day with category chips and a picks-only toggle |
| `/about` | About, principles, numbers, team (initials, no portraits), membership plans with monthly/yearly billing |
| `/search?q=` | Client-side search over all stories |
| `/newsletters`, `/sign-in`, `/contact`, `/pitch`, `/advertise`, `/corrections`, `/privacy`, `/terms`, `/accessibility` | Simple footer pages |
| anything else | 404 |

Captured routes and interaction states are listed in `pigment.app.json`.

## Photos

All photographs are CC0 / public domain. Captions on the site carry a credit line.

| File | Alt | Credit | License | Source |
| --- | --- | --- | --- | --- |
| `food-noodle-soup.jpg` | A bowl of curried noodle soup topped with crispy noodles | DsouzaSohan | CC0 | https://commons.wikimedia.org/w/index.php?curid=185579035 |
| `design-bar-stools.jpg` | Metal stools along a white-tiled bar counter | unknown | CC0 | https://www.rawpixel.com/image/5903531/tall-wooden-chairs-free-public-domain-cc0-photo |
| `design-cafe-window.jpg` | A long table by tall windows in a brick-walled cafe | unknown | CC0 | https://www.rawpixel.com/image/3283757/free-photo-image-living-room-cafe-floor |
| `design-chair-shadows.jpg` | Cafe chairs casting long afternoon shadows on a wooden floor | unknown | CC0 | https://www.rawpixel.com/image/5920935/photo-image-light-public-domain-shadow |
| `music-cassette.jpg` | An old cassette tape with a hand-written label | unknown | CC0 | https://www.rawpixel.com/image/5907587/photo-image-tape-public-domain-black |
| `hood-painted-terraces.jpg` | A row of brightly painted terraced houses | Carol M Highsmith | CC0 | https://www.rawpixel.com/image/3090824/free-photo-image-building-city-street |
| `hood-colour-cottages.jpg` | Colourful cottages with red roofs climbing a street | unknown | CC0 | https://www.rawpixel.com/image/5907767/photo-image-public-domain-houses-windows |
| `hood-red-row.jpg` | A long row of red and white houses under a blue sky | Carol M Highsmith | CC0 | https://www.rawpixel.com/image/421792/row-houses-florida-ave |
| `hood-flea-table.jpg` | Glassware and brass laid out on a flea market table | unknown | CC0 | https://www.rawpixel.com/image/5920856/free-antique-glassware-flea-market |
| `hood-flea-clothes.jpg` | Piles of second-hand clothes at an outdoor flea market | unknown | CC0 | https://www.rawpixel.com/image/5925812/clothes-hanging-rack-flea-market |
| `hood-flea-crowd.jpg` | Browsers crowding round stalls at a weekend market | U.S. National Archives | CC0 | https://www.rawpixel.com/image/8765596/photo-image-vintage-books-woman |
| `hood-market-street.jpg` | A busy market street under striped awnings | unknown | CC0 | https://www.rawpixel.com/image/6113547/flea-market-utrecht-netherlands-04132021 |
| `music-record-racks.jpg` | Racks of records in a record shop | unknown | CC0 | https://www.rawpixel.com/image/5921492/photo-image-public-domain-vintage-room |
| `music-record-crates.jpg` | Crates of vinyl records, shot low | unknown | CC0 | https://www.rawpixel.com/image/3304143/free-photo-image-music-png-archives-filing-room |
| `music-digging.jpg` | A hand flicking through a box of records | unknown | CC0 | https://www.rawpixel.com/image/3284165/free-photo-image-file-folder-vinyl-records-store |
| `music-shop-aisle.jpg` | The aisle of a small record shop with yellow racks | unknown | CC0 | https://www.rawpixel.com/image/5943157/free-public-domain-cc0-photo |
| `food-baguettes.jpg` | Baguettes cooling on a rack | Jackson Monichan | CC0 | https://wordpress.org/photos/photo/7406a28fc9/ |
| `food-loaf.jpg` | A rustic fruit loaf in a basket | unknown | CC0 | https://www.rawpixel.com/image/5928055/photo-image-public-domain-food-free |
| `food-pastries.jpg` | Pastries piled on the counter of a bakery | unknown | CC0 | https://www.rawpixel.com/image/5918528/image-public-domain-food-free |
| `food-street-tray.jpg` | A street vendor's tray of spiced snacks in coloured stripes | unknown | CC0 | https://www.rawpixel.com/image/5923193/photo-image-public-domain-free-nuts |
| `food-night-stall.jpg` | A lit-up street food stall at night | unknown | CC0 | https://www.rawpixel.com/image/6074537/street-food-bangkok-thailand-asia |
| `music-gig.jpg` | A crowd under purple lights at a gig | unknown | CC0 | https://www.rawpixel.com/image/5970282/music-concert-crowd |
| `hood-greengrocer.jpg` | A greengrocer's display of fruit and vegetables | unknown | CC0 | https://www.rawpixel.com/image/3284018/free-photo-image-farmers-market-vegetables-store-fruit-shop |
| `design-neon-enter.jpg` | A red neon sign reading ENTER in a dark doorway | unknown | CC0 | https://www.rawpixel.com/image/3300578/free-photo-image-scoreboard-cc0-creative-commons |
| `design-red-stair.jpg` | Looking down a red-carpeted spiral staircase | unknown | CC0 | https://www.rawpixel.com/image/6029754/photo-image-public-domain-vintage-interior |
| `design-concrete-stair.jpg` | A curving concrete staircase | unknown | CC0 | https://www.rawpixel.com/image/6031698/photo-image-public-domain-interior-free |
| `design-square-stair.jpg` | A square stairwell with an iron railing, seen from below | unknown | CC0 | https://www.rawpixel.com/image/6018215/photo-image-public-domain-vintage-interior |
