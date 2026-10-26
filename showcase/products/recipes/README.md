# Panful (showcase product)

A fictional recipe and meal-planning service, shown signed in as Hannah Reid of the Reid household (two adults and
a child, nut-free, metric, UK). It is a Pigment showcase product — a realistic web app with its own conventional
house design that coding agents restyle with a design system, so the gallery can show before and after. Everything
here (company, people, recipes, ratings, reviews) is invented. The date is fixed at Monday 26 October 2026.

React 19 + Vite + react-router 7, plain CSS (`src/styles.css`, custom properties on `:root`). Saved recipes, the
meal plan, the shopping list, settings and toasts run on in-memory state (`src/store.tsx`); recipe data lives in
`src/data/`.

```
npm install
npm run dev       # http://localhost:4320
npm run build
npm run preview   # port 4320
```

## Screens

App shell on every page: sidebar navigation on desktop, bottom tab bar under 900 px, top bar with recipe search
(`/` focuses it) and the user's avatar, toasts.

| Route | What |
| --- | --- |
| `/` | Today: greeting, tonight's dinner with start-cooking, monthly cooking stat with chart, shopping list summary, this week's dinners, "use it up" pantry suggestions, recently saved |
| `/recipes` | Browse 22 recipes: all / saved, filter chips (diet, time, cuisine, good for), sort, search from the top bar, save toggles with toast, empty state |
| `/recipes/chickpea-spinach-curry` | Recipe page (any `/recipes/<slug>` works): hero, rating, meta, add to plan (day and meal picker), cook mode, servings stepper that rescales quantities, ingredient checklist, nutrition with reference intakes, Method / Notes / Reviews tabs, related recipes |
| `/plan` | Weekly planner (Mon–Sun × lunch/dinner): add via recipe picker dialog, move/swap dialog, remove, summary stats, generate shopping list |
| `/shopping` | Shopping list grouped by aisle: checkboxes, quantities, progress, hide checked, clear checked, add-item form with validation |
| `/settings` | Profile, household steppers, dietary switches, units and oven, notifications; save with success banner, inline email validation |
| anything else | 404 |

Routes, `data-testid`s and behaviour are the restyle contract; `pigment.app.json` lists the captured routes and
states.

## Photos

All images are in `public/photos/` and listed in `photos.json` with their alt text. No other images are used; the
logo and icons are drawn inline SVG.

| File | Alt | Credit | License | Source |
| --- | --- | --- | --- | --- |
| `salad-greens.jpg` | A small bowl of green salad with a fork, from above | unknown | CC0 | https://www.rawpixel.com/image/5918718/photo-image-white-background-public-domain-plant |
| `pasta-skillet.jpg` | Tomato pasta served in a cast-iron skillet | unknown | CC0 | https://www.rawpixel.com/image/5970196/pasta-dish |
| `pasta-tagliatelle.jpg` | Creamy tagliatelle with black olives | ChrisEdwardsCE | CC0 | https://wordpress.org/photos/photo/7276329e1a/ |
| `pasta-herb.jpg` | Pasta with herbs and lemon on a white plate | unknown | CC0 | https://www.rawpixel.com/image/3304074/free-photo-image-cheese-vegetables-pasta-gnocchi |
| `pasta-salad.jpg` | Bow-tie pasta salad with tomatoes and rocket | unknown | CC0 | https://www.rawpixel.com/image/3282840/free-photo-image-dish-sauce-pasta |
| `soup-squash.jpg` | Golden squash soup in a white pot | unknown | CC0 | https://www.rawpixel.com/image/5922901/photo-image-public-domain-leaf-fruit |
| `soup-noodle.jpg` | Chicken noodle soup with carrots and parsley | unknown | CC0 | https://www.rawpixel.com/image/5924545/photo-image-public-domain-food-water |
| `stew-seafood.jpg` | A seafood stew with prawns and greens in a pan | unknown | CC0 | https://www.rawpixel.com/image/6031672/asian-soup-bowl-free-public-domain-cc0-image |
| `chicken-roast.jpg` | A golden roast chicken leg | unknown | CC0 | https://www.rawpixel.com/image/5904464/photo-image-public-domain-wood-food |
| `chicken-carving.jpg` | Carving roast meat on a board with potatoes | unknown | CC0 | https://www.rawpixel.com/image/5908643/image-public-domain-hand-lemon |
| `pancakes.jpg` | A stack of pancakes with berries on a yellow table | unknown | CC0 | https://www.rawpixel.com/image/5970222/pancakes-breakfast |
| `prep-greens.jpg` | Washed greens and limes on a chopping board | unknown | CC0 | https://www.rawpixel.com/image/5907539/photo-image-public-domain-plant-greens |
| `prep-carrots.jpg` | Carrots cut into sticks on a wooden board | unknown | CC0 | https://www.rawpixel.com/image/5912681/image-public-domain-wooden-free |
| `prep-peppers.jpg` | Red peppers and tomatoes on a chopping board with a knife | unknown | CC0 | https://www.rawpixel.com/image/5921837/photo-image-public-domain-plant-green |
| `veg-mixed.jpg` | Aubergine, courgette, peppers and onions on a board | unknown | CC0 | https://www.rawpixel.com/image/5963090/free-public-domain-cc0-photo |
| `bread-sourdough.jpg` | A round sourdough loaf on a board | unknown | CC0 | https://www.rawpixel.com/image/3282698/free-photo-image-food-bread-knife-baking |
| `bread-hands.jpg` | Hands holding a fresh crusty loaf | unknown | CC0 | https://www.rawpixel.com/image/5906410/photo-image-public-domain-hand-person |
| `rice-curry-plate.jpg` | Yellow rice with curries and salad on one plate | unknown | CC0 | https://www.rawpixel.com/image/5940627/vegan-curry-lunch-tokyo-japan |
| `veg-broccoli.jpg` | Roasted vegetables with broccoli in a square bowl | unknown | CC0 | https://www.rawpixel.com/image/5943288/free-public-domain-cc0-photo |
| `tacos-soft.jpg` | Soft tacos with filling, from above | unknown | CC0 | https://www.rawpixel.com/image/5917508/free-taco-image-public-domain-food-cc0-photo |
| `tacos-row.jpg` | A row of loaded tacos on a dark plate | Jakub Kapusnak | CC0 | https://www.rawpixel.com/image/448314/free-photo-image-tacos-healthy-cheese |
| `tacos-plate.jpg` | Crispy tacos with lettuce on a blue plate | unknown | CC0 | https://www.rawpixel.com/image/5925753/free-taco-image-public-domain-food-cc0-photo |
| `herbs-basil.jpg` | A pile of fresh basil leaves | Jakub Kapusnak | CC0 | https://www.rawpixel.com/image/448349/freshly-chopped-herb |
| `herbs-chopping.jpg` | Chopping parsley on a wooden board | unknown | CC0 | https://www.rawpixel.com/image/6025767/photo-image-public-domain-hand-green |
| `tart-lemon.jpg` | A lemon meringue tart with raspberries | unknown | CC0 | https://www.rawpixel.com/image/5914672/free-lemon-tart-image-public-domain-cc0-photo |
| `grocery-veg.jpg` | Rows of vegetables at a market | unknown | CC0 | https://www.rawpixel.com/image/6082353/vegetables-supermarket |
| `kitchen-pans.jpg` | Cast-iron pans and a red casserole dish | unknown | CC0 | https://www.rawpixel.com/image/6020086/photo-image-public-domain-kitchen-free |
| `bowl-smoothie.jpg` | A smoothie bowl topped with mango and berries | unknown | CC0 | https://www.rawpixel.com/image/5918694/image-public-domain-hand-green |
| `bowl-granola.jpg` | A berry bowl with granola and a spoon | unknown | CC0 | https://www.rawpixel.com/image/5921785/photo-image-public-domain-blue-purple |
| `pizza.jpg` | A sliced pizza on a dark board, from above | igorovsyannykov | CC0 | https://commons.wikimedia.org/w/index.php?curid=69850719 |
