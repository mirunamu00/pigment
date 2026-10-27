# Motion banner

The README GIF (`docs/assets/pigment-motion.gif`) and the site's home video (`apps/web/public/pigment-motion.mp4`)
are rendered from `index.html` with [HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP → MP4).

The frames are unedited showcase captures of the coffee-shop product (`apps/web/public/products/roastery/`): the
original and four systems picked as examples. Swap a system by replacing its image in `assets/` and its name,
colors and image path in `index.html`.

```bash
cd showcase/banner
HYPERFRAMES_TELEMETRY=0 npx --yes hyperframes@0.8.206 render -o renders/banner.mp4 --quality delivery

# README GIF (keep it under 10 MB)
ffmpeg -i renders/banner.mp4 -filter_complex "fps=12,scale=960:-2:flags=lanczos,split[a][b];[a]palettegen=max_colors=192:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" -loop 0 ../../docs/assets/pigment-motion.gif

# Site video and poster
ffmpeg -i renders/banner.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an ../../apps/web/public/pigment-motion.mp4
ffmpeg -ss 13.6 -i renders/banner.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 3 ../../apps/web/public/pigment-motion-poster.jpg
```
