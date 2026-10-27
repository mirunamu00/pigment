# Motion banner

The README GIF (`docs/assets/pigment-motion.gif`) is rendered from `index.html` with [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP → MP4).

Three films in one, as on the home page: starting a project, restyling a product, and a later session building
on the system. The frames are unedited agent output: showcase captures of the coffee-shop product
(`apps/web/public/products/roastery/`, the original and four systems picked as examples) and the setup and
ongoing screens of a `pnpm harness flow` run (`flow-today`, then `flow-goal-detail`, `flow-insights` and `flow-habits`, built by a later session in `showcase/flows/morning-shapes/20261027-064611-more`). Swap a system by replacing its image in `assets/` and its name,
colors and image path in `index.html`.

```bash
cd showcase/banner
HYPERFRAMES_TELEMETRY=0 npx --yes hyperframes@0.8.206 render -o renders/banner.mp4 --quality delivery

# README GIF (keep it under 10 MB)
ffmpeg -i renders/banner.mp4 -filter_complex "fps=10,scale=840:-2:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 ../../docs/assets/pigment-motion.gif

```

The site plays the same film live, as HTML (`apps/web/src/components/motion-hero.tsx`, images in
`apps/web/public/motion/`). Change the examples in both places.
