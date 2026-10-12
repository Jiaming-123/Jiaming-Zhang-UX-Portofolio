# UniLink mobile layout and shared chapter navigation

## Source locations

- `src/styles/unilink-concepts.css`: the six Concept Exploration cards.
- `src/components/unilink/CaseStudyMedia.tsx`: `FeatureStory`, screen selection, vertical transitions and the existing image viewer.
- `src/styles/unilink.css`: left sticky screen stage, right narrative and mobile viewer button.
- `src/styles/unilink-palette.css`: retains the sky-blue stage and removes the obsolete mobile-image selector.
- `public/project-chapters.mjs` and `public/project-chapters.css`: shared chapter rail for UniLink, BoardGameMate, Furniture, CultureLens and Crownlands.
- `tests/unilink-responsive.test.mjs` and `tests/project-chapters.test.mjs`: regression checks.

These are source files. Do not edit the generated `dist-production` or `.vercel/output` bundles.

## Concept cards: two columns, three rows

The six cards remain in their original order with unchanged text, original sketches and reveal/enlarge controls.

| Viewport | Columns | Rows | Card height |
| --- | --- | --- | --- |
| Above 900px | 3 | 2 | 466px |
| 601–900px | 2 | 3 | 466px |
| Up to 600px | 2 | 3 | 400px |

The smallest layout uses a 12px grid gap, 14px internal horizontal insets, 20px headings and 12.5px body text. The card height leaves space for the complete longest description even at 320px wide; text is not truncated. Mobile enlarge buttons are 44×44px.

```css
@media(max-width:600px) {
 .ul-hypothesis-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
 .ul-hypothesis { height:400px; }
 .ul-hypothesis-heading { inset:16px 14px auto; }
 .ul-hypothesis-heading h3 { font-size:20px; margin-top:12px; }
 .ul-hypothesis-rest { inset:118px 14px 62px; }
 .ul-case .ul-hypothesis-rest p { font-size:12.5px; line-height:1.6; }
}
```

## Other parallel mobile card groups

Mobile two-column rules also cover official/social/peer source summaries, the four Research insights, concept-convergence principles, Groups/Mentors outcomes, the two Strategy cards, the student/mentor/sponsor incentive cards, and future metrics. Research and supplementary evidence galleries retain two columns with their existing enlarge controls. Body text is 12.5px with a 1.65 line height in the compact text-card groups; Research insight headings scale from 18 to 23px. All descriptions remain complete, without line clamping.

Personas and their journey images stay full-width. Detailed testing findings remain editorial rows rather than being squeezed into narrow cards. Desktop layouts and the confirmed 8 + 3 + 2 participant summary are unchanged.

## Final Design: one screen stage and a scrolling narrative

Previously, the stage was hidden at 900px and below, and every narrative article contained a second full-size screenshot. Those duplicate `.ul-mobile-screen` elements and their fallback CSS are removed.

Every flow now has one left stage and its narrative steps on the right. The stage uses `position:sticky`, not `position:fixed`, so it stays under the chapter navigation while reading that flow, then naturally gives way to the next flow. Its top offset uses the actual chapter bar height plus 12px.

Inside the stage, a clipped `.ul-screen-stack` contains one vertical `.ul-screen-track`. Each original exported UI occupies one track slot. When a narrative step crosses 55% of the viewport height, its matching UI becomes active and the track moves by one slot. This is a sequence of authentic static Figma exports, not a live embedded app or a fabricated long screenshot.

```tsx
const show = (i: number) => {
  setActive(i)
  gsap.to(track, {
    yPercent: -100 * i,
    duration: reduced ? 0 : .4,
    ease: 'power2.out',
    overwrite: true,
  })
}
```

- Normal motion: 0.4-second vertical transition, `power2.out` easing.
- Reduced motion: the same paired layout and correct active UI, switching immediately without animation.
- Mobile/tablet: left/right ratio `0.9fr / 1.1fr`, gap 16px. The phone viewport uses `393 / 852` aspect ratio and is height-capped on short landscape screens.
- Mobile text steps: minimum height `max(45svh, 240px)`; desktop remains `60svh`.
- Original images retain their bytes and aspect ratio, with `object-fit:contain`.
- Images load lazily; the current and next UI are made eager when the flow approaches the viewport.
- A mobile “Enlarge screen” button opens the existing modal viewer for the currently selected original frame, with zoom, Escape-to-close and focus restoration. It compensates for the smaller two-column preview without duplicating large screenshots down the page.

## All case-study chapter rails: keep the highlighted chapter visible

The previous centering calculation used the anchor's `offsetLeft`. Each anchor is inside a positioned `li`, so that value is local to the item rather than the entire scrollable rail. Later highlighted chapters therefore stayed offscreen.

The new calculation uses the anchor and rail bounding rectangles, then clamps the result to the rail's scroll range:

```js
export function chapterRailScrollLeft(scrollLeft, viewportWidth, contentWidth, relativeLeft, itemWidth) {
  return Math.min(
    Math.max(0, contentWidth - viewportWidth),
    Math.max(0, scrollLeft + relativeLeft - (viewportWidth - itemWidth) / 2)
  );
}
```

`relativeLeft` is `linkBox.left - listBox.left`. The rail updates when the active chapter changes, when the chapter bar first appears, or when its visible width changes. It uses horizontal `scrollTo` only, not `scrollIntoView`, so chapter centering does not move the page vertically. Manual horizontal browsing is not continually forced back between chapter changes.

The existing chapter names, numbering, project colours, anchor links and Lenis coordination remain intact. Navigation cleanup restores the previous `--case-chapter-height` value when leaving a project.

If the final chapter is shorter than the viewport, it cannot reach the usual reading line before the page stops scrolling. At the document bottom, the visible final chapter is therefore selected, ensuring short Outcome sections can also highlight and appear in the rail.

## Verification

Build both the portfolio and standalone UniLink entry, then run the repository test and lint scripts. Browser checks cover two-column cards, all four Final Design flows and every exported frame, touch reveal/enlarge controls, normal and reduced motion, resizing, and active chapter visibility in both scroll directions for all five case studies. Mobile previews must not produce horizontal page overflow.
