# Custom C/c/Z and editable Figma typography

## One outline source

`scripts/build-home-pixel-font.py` derives the website's Jiaming Pixel Bold
WOFF2 and `design/home-pixel-glyphs-v2.json` from the preserved upstream Pixelify
Sans font. CI uses the committed font; Python/fonttools/brotli are only needed
for offline preparation. No project dependencies changed.

- C aperture: 34 → 205 font units (205 / 649 ≈ 31.6% of cap height).
- c aperture: 35 → 137 font units.
- Z: flat top-left / bottom-right terminals, three broad steps, 18 corners.
  No return hooks or self-intersecting outlines.
- Lowercase z already has flat terminals, so it is unchanged.
- All advance widths and side bearings stay identical. C-with-cedilla composite
  glyphs naturally inherit the revised base C/c; unrelated outlines are kept.
- Runtime font: `/fonts/jiaming-pixel-bold-latin-v2.woff2`, 7,936 bytes.
- License and attribution stay in `public/fonts/pixelify-sans-OFL.txt`.

## Figma sync

Account: user-selected edu.
File: `mAurgbvWJkTQ9YVJ7lJGVo`, Page 1 (`0:1`).

- Desktop Home (`74:1190`) and Mobile / Home (`94:1449`) are updated.
- The other Home draft (`173:234`), case-study boards, body copy, photos, covers,
  gradients and navigation are not edited.
- Every new title is a `Pixel vectors v2 / …` auto-layout frame containing
  native VECTOR glyph paths, not bitmap fills or font-dependent text layers.
- Original title text layers are retained in place but hidden for recovery.
- Nine title frames per viewport (the two hero lines are separate), with 148
  editable letter vectors each: 296 letters in total. C has 20 anchors; Z has 18.
- White solid lines and transparent 1px outline lines remain distinct.
- Title line breaks, mixed-case project names and Footer wording are retained.
  Figma placement follows each existing board; it is not a replacement full-page
  web capture or a rebuild of unrelated content.

`scripts/create-home-pixel-figma-script.mjs` emits the retry-safe Plugin API
script. Existing v2 title groups are skipped, preserving manual anchor edits.
The final Z update mutates only vectors `239:15` and `239:204`.

Representative vector groups:

| Content | Desktop | Mobile |
| --- | --- | --- |
| JIAMING | 239:2 | 239:191 |
| ZHANG | 239:12 | 239:201 |
| UniLink | 239:20 | 239:209 |
| DESIGN ACROSS… | 239:30 | 239:219 |
| BoardGameMate | 239:76 | 239:265 |
| My Furniture Store | 239:92 | 239:281 |
| CultureLens Concierge | 239:113 | 239:302 |
| Crownlands | 239:138 | 239:327 |
| Footer | 239:151 | 239:340 |

To edit: expand a `Pixel vectors v2 / …` group, select `Glyph / C` or another
letter, and enter vector edit mode to move its individual corners. Figma does
not need the custom font installed. This is a snapshot sync: later Figma anchor
edits are not automatically compiled back into the live website font.

## Validation

Figma structural inspection confirms 296 letter VECTOR nodes with editable
networks and zero image fills inside the new titles. Desktop/mobile composition
screenshots and final C/Z close-ups were inspected. Build, TypeScript, lint and
101 tracked regression tests pass. The full glob's two pre-existing failures
from the user's untracked CultureLens test remain unchanged.
