# Kiln Street Coffee (showcase product)

A fictional small-batch coffee roaster in Sheffield: marketing site and shop. It is a Pigment showcase product —
a realistic site with its own conventional house design that coding agents restyle with a design system, so the
gallery can show before and after. Everything here (company, people, farms, prices, reviews) is invented.

React 19 + Vite + react-router 7, plain CSS (`src/styles.css`, custom properties on `:root`). Cart, filters,
plan picker and newsletter run on in-memory state.

```
npm install
npm run dev       # http://localhost:4320
npm run build
npm run preview   # port 4320
```

## Pages

| Route | What |
| --- | --- |
| `/` | Home: photo hero, how the subscription works, this month's coffees, farm-to-cup story, reviews, roastery photo strip, FAQ, final CTA |
| `/shop` | All ten coffees: origin and roast filter chips, sort, product cards with roast meter |
| `/shop/kochere-washed` | Product page (any `/shop/<slug>` works): gallery, origin facts, size/grind/quantity, add to bag, brewing guide tabs, related coffees |
| `/subscribe` | Three plans, per-delivery / yearly billing toggle, plan builder with live summary, subscription FAQ |
| `/about` | Story, the roastery, sourcing principles, team, visit us (address and hours) |
| `/privacy`, `/terms`, `/cookies`, `/shipping` | Short legal and help pages linked from the footer |
| anything else | 404 |

Every page shares the header (nav, cart count and bag drawer, mobile menu) and the footer (newsletter signup with
inline validation, legal links). Routes, `data-testid`s and behaviour are the restyle contract; `pigment.app.json`
lists the captured routes and interaction states.

## Photos

All photos are CC0 / public domain (see `photos.json` for alt text and sizes). No other images are used; the
logo mark and icons are drawn SVG.

| File | Credit | License | Source |
| --- | --- | --- | --- |
| `roaster-drum.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039167/photo-image-background-public-domain-coffee |
| `roaster-cooling.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039161/photo-image-background-public-domain-coffee |
| `roastery-machine.jpg` | Robert-brook | CC0 | https://commons.wikimedia.org/w/index.php?curid=162991563 |
| `beans-dark.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039153/photo-image-background-public-domain-coffee |
| `beans-medium.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039170/photo-image-background-public-domain-coffee |
| `beans-plate.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039162/photo-image-background-public-domain-coffee |
| `brew-pourover.jpg` | Kim Sanso | CC0 | https://commons.wikimedia.org/w/index.php?curid=70214599 |
| `brew-chemex.jpg` | unknown | CC0 | https://www.rawpixel.com/image/3283223/free-photo-image-coffee-maker-banister |
| `brew-drip.jpg` | unknown | CC0 | https://www.rawpixel.com/image/3283278/free-photo-image-coffee-dessert-table |
| `sacks-origin.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039511/photo-image-public-domain-coffee-free |
| `sack-colombia.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6039515/coffee-sack-free-public-domain-cc0-photo |
| `beans-scoop.jpg` | unknown | CC0 | https://www.rawpixel.com/image/5944452/free-public-domain-cc0-photo |
| `beans-sack-open.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6066157/free-public-domain-cc0-photo |
| `farm-cherries.jpg` | Francisco Herrera | CC0 | https://wordpress.org/photos/photo/301666ac5b/ |
| `farm-shrub.jpg` | Moses Cursor Ssebunya | CC0 | https://wordpress.org/photos/photo/7546780328/ |
| `farm-drying.jpg` | Roberto Vazquez | CC0 | https://wordpress.org/photos/photo/34679696ab/ |
| `cafe-counter.jpg` | unknown | CC0 | https://www.rawpixel.com/image/6113061/busy-coffee-shop-cafe-unknown-date-location |
| `grinder.jpg` | unknown | CC0 | https://www.rawpixel.com/image/5948122/free-public-domain-cc0-photo |
