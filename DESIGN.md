# Fofonka Site Design Contract

## Tokens

- `--color-mark`: primary interactive/highlight accent on dark surfaces.
  Use the CTS dashboard marker-bright direction: warm editorial yellow, not
  default saturated yellow. Current dark value: `#F0C757`.
- `--color-mark-soft`: low-emphasis ambient accent. Keep below 14% alpha on
  dark backgrounds so the hero keeps its quiet terminal feel.
- `--color-mark-glow`: line, focus, and text glow accent. Keep below 22% alpha
  to avoid neon yellow.

## Hero Layout

- Desktop hero uses a two-column grid inside `.container-q4`.
- The text column owns the main reading path; the terminal is supportive proof.
- The terminal must stay within its grid column, never absolute-positioned
  outside the container.
- Terminal lines can wrap at narrow desktop widths. Preserve rhythm over exact
  monospace line length.

## Rationale

The site is an editorial personal page, not a dashboard. The CTS dashboard
informs the accent discipline: restrained tokens, sharp borders, and warm
Brazilian editorial colors. Yellow is used as a marker/highlighter, while
terracotta remains available for brand assets and light-mode emphasis.
