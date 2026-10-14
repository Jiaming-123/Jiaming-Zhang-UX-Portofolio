# Crownlands rule demonstrations — 2026-10-15

Source: the user-supplied `Introduction.mp4` (89.47 seconds, 1920 × 1080 at 60 fps). The source file and existing full gameplay film are unchanged.

Six actual GIF excerpts sit above each Core Loop rule. Crop: keep the top 1920 × 936 pixels, removing the bottom narration subtitle band without painting over the board. The on-board Round 2 label remains because it demonstrates the next round.

| Rule | Source excerpt |
| --- | --- |
| Read the board | 6.10–7.90 s |
| Choose secretly | 31.00–34.60 s |
| Reveal | 34.60–37.60 s |
| Resolve | 38.10–43.50 s |
| Update power | 43.60–47.10 s |
| Repeat | 47.20–50.50 s |

GIFs are 480 × 234, 10 fps, 96-colour optimized palettes, without audio. Lazy loading, offscreen static previews, a shared pause button and system reduced-motion static WebP fallbacks limit motion and decoding work. `scripts/extract-crownlands-loop.mjs` reproduces only these named generated outputs from the original file.

Four Actions reuse the original Reinforce, Expand, Reposition and Contest WebP card assets. Desktop pointer hover enlarges 2×; keyboard focus also enlarges; clicking toggles enlargement, with a 1.65× mobile limit. These styles are scoped to `.cl-action-preview`, not the playable game's action hand. Existing rule copy, rules modal, game mechanics and music behavior are unchanged.
