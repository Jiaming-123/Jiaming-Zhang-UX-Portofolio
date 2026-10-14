# Homepage pixel headings

The homepage display typography is now real, selectable text in Pixelify Sans
700 rather than the previously generated bitmap previews. The font retains
mixed-case project names, scales with the viewport and keeps existing heading
semantics and links. Body text and case-study/About/Contact typography are not
changed.

## Scope and code

- `src/styles/home-pixel-headings.css`: self-hosted font, the five scoped heading
  selectors covering eight display groups, outline treatment and mobile sizes.
- `src/main.tsx`: imports the heading stylesheet after existing visual layers.
- `src/pages/HomePage.tsx`: separates the selected-work display heading into
  DESIGN ACROSS / SCREENS, / SYSTEMS / & SERVICES. No copy is removed.
- `src/components/Layout.tsx`: adds `data-pixel-headings` only on the Home footer.
  The About footer keeps its existing font; case studies still omit footers.
- `index.html`: preloads the local WOFF2 font.
- `public/fonts/pixelify-sans-bold-latin-v1.woff2`: 7,924-byte Latin font.
- `public/fonts/pixelify-sans-OFL.txt`: upstream SIL Open Font License.
- `tests/home-pixel-headings.test.mjs`: font, text, scope and build-copy regression
  checks. No screenshot assets are required at runtime.

The eight groups are JIAMING / ZHANG, UniLink, DESIGN ACROSS…, BoardGameMate,
My Furniture Store, CultureLens Concierge, Crownlands, and LET'S CREATE….
ZHANG, & SERVICES. and MEANINGFUL retain a 1px outline with transparent fill.
The original project covers, link destinations, spheres, portrait entrance,
keyword carousel, navigation and flying mascot are unchanged.

## Parameters

- Font: Pixelify Sans, weight 700, font-display swap, no synthetic weight.
- Normal heading tracking: −0.02em; hero name tracking: −0.045em.
- Hero and UniLink retain their existing responsive font-size rules.
- Selected-work desktop size: clamp(2.8rem, 6vw, 6.5rem); line-height 0.98.
- Project-title desktop size: clamp(1.35rem, 2.4vw, 2.75rem); line-height 1.12.
- Home footer line-height: 0.95; existing desktop size and outline indent remain.
- Mobile ≤767px: selected-work clamp(1.85rem, 11.8vw, 3.9rem), project titles
  clamp(1.25rem, 6.6vw, 2.25rem), footer clamp(2rem, 12.3vw, 5.6rem).

Font source: [Google Fonts upstream metadata](https://github.com/google/fonts/blob/main/ofl/pixelifysans/METADATA.pb)
and [upstream license](https://github.com/google/fonts/blob/main/ofl/pixelifysans/OFL.txt).
The downloaded Google Fonts Latin WOFF2 is self-hosted; no font CDN is contacted
by visitors.

## Verification

- Full main and standalone UniLink builds plus TypeScript and zero-warning lint.
- 100 tracked/new regression tests pass, including the compact-navigation test.
- Full local glob: 103 tests, 101 pass; two pre-existing failures in the user's
  untracked CultureLens test refer to obsolete compiled-chunk filenames. That
  file is preserved and excluded from the release commit.
- Local browser: 1440px desktop and 390px / 320px mobile Home; font loaded, all
  eight display groups match the scoped font, no heading or document horizontal
  overflow. Mobile footer keeps all three lines and its links.
- Case-study heading typography remains Space Grotesk; chapter-bar spacing is
  documented separately in `chapter-walker-implementation.md`.
