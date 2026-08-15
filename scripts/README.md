# scripts/

Build-time art sources. **Nothing here runs during `npm run build`** — these are
rendered by hand, once, into committed PNGs in `public/`. Re-run only when the
artwork changes.

| Source | Renders to | Used by |
| --- | --- | --- |
| `og-card.html` | `public/og.png` (1200×630) | `og:image` / `twitter:image` |
| `../public/favicon.svg` | `public/favicon-32.png` (32×32) | `<link rel="icon">` PNG fallback |
| `icon-apple.svg` | `public/apple-touch-icon.png` (180×180) | `<link rel="apple-touch-icon">` |

`public/favicon.svg` is also shipped as-is — it's the primary favicon for every
modern browser. `icon-apple.svg` is the same mark full-bleed (no rounded
corners), because iOS applies its own mask.

## Rendering

Requires Google Chrome. Run from the repo root.

```bash
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 1. Share card. Loads the headshot and the self-hosted fonts as file://
#    subresources, hence --allow-file-access-from-files.
"$CH" --headless --disable-gpu --force-device-scale-factor=1 \
  --allow-file-access-from-files --hide-scrollbars \
  --window-size=1200,630 --screenshot=public/og.png \
  "file://$PWD/scripts/og-card.html"
```

The icons need one extra step. Chrome renders a standalone `.svg` document at
its *intrinsic* size and ignores `--window-size`, so an SVG carrying only a
`viewBox` screenshots as a crop. Inject a matching `width`/`height` into a
throwaway copy first, then the window size and the render agree:

```bash
# 2. Favicon PNG. Rendered at 128 and downscaled 4:1 for a clean box filter.
sed 's|<svg |<svg width="128" height="128" |' public/favicon.svg > /tmp/fav128.svg
"$CH" --headless --disable-gpu --force-device-scale-factor=1 --hide-scrollbars \
  --window-size=128,128 --screenshot=public/favicon-32.png "file:///tmp/fav128.svg"
sips -z 32 32 public/favicon-32.png

# 3. Apple touch icon, rendered at its final size.
sed 's|<svg |<svg width="180" height="180" |' scripts/icon-apple.svg > /tmp/apple180.svg
"$CH" --headless --disable-gpu --force-device-scale-factor=1 --hide-scrollbars \
  --window-size=180,180 --screenshot=public/apple-touch-icon.png "file:///tmp/apple180.svg"
```

Verify with `sips -g pixelWidth -g pixelHeight public/og.png` — the OG image
must be exactly 1200×630 or LinkedIn will letterbox it.

`og.png` is ~375KB. That is fine: it is fetched only by crawlers and unfurlers,
never by a page visitor, so it is not on any user-facing critical path.
