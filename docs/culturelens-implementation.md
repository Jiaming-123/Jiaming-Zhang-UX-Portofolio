# CultureLens case study — implementation notes

> Historical implementation / release notes from September 2026, not current build instructions. The October React-source migration retired the minified `production-baseline`, compatibility adapter, simulation and Test chapter. Current CultureLens keeps six chapters and original prototype recordings. Use the repository README for the current source map, `npm run build`, `npm test` and deployment workflow; do not follow the historical commands below.

## Scope

Only `/projects/culturelens` is redesigned. `ProjectPage.tsx` selects a lazy, dedicated page. The existing Navbar, Footer, portfolio typefaces, route transitions and other project pages remain shared and unchanged. All new visual selectors are CultureLens-specific. No dependency was added.

The page moves from museum-paper editorial design to a navy/cyan agent-system section, then returns to a quiet reflection. Seven sticky chapter links, a reading-progress line, touch/keyboard controls, native disclosure elements and reduced-motion styles support the narrative.

## Code map

- `src/pages/CultureLensCaseStudy.tsx`: narrative, chapters, progress and navigation lifecycle.
- `src/components/culturelens/CaseStudyModules.tsx`: museum relationships, proposals, principle transfer, service blueprint, routing, failure lab and original recordings.
- `src/components/culturelens/AgentSimulation.tsx`: accessible deterministic simulation UI and product-visible state drawer.
- `src/components/culturelens/simulationState.ts`: reducer, confirmation guards and ticket parsing.
- `src/data/cultureLensData.ts`: source-grounded narrative and prototype data.
- `src/styles/culturelens.css`: scoped responsive visual system.
- `tests/culturelens-state.test.mjs`: six dependency-free Node test cases, using the existing TypeScript compiler to load the reducer.

## Evidence and boundaries

Primary supplied documents: `A2.G2.pdf` and `INFO30005_A2.G3_G2.5-1.pdf`. Only these PDFs and the user's supplied context are used. The process assets are embedded originals extracted from G2 pp. 3, 7, 11, 26, 30 and G3 pp. 4, 14, 25, 26. Full-slide thumbnails were removed from the page. Diagram transformations and the service blueprint are labelled portfolio synthesis. Proposed HCD evaluations are not claimed as completed research.

G2's real forehead-worn paper prototype is the form-factor source of truth. All four generated concepts now follow the user's later private near-eye direction: a slim forehead band, no physical lens/visor, no public wall projection. The visible light fields are explanatory representations of wearer-only perception, not claims of working optics. The original G2 XR sketch is retained unchanged and explicitly distinguished from this later iteration.

The simulation is frontend-only: no LLM, camera access, payment, staff messaging, real reservation or live museum data. It offers E01 and E02 from the supplied dummy catalogue. Under-5s count toward total attendance, and an adult is required. Unsupported ticket inputs ask for repair. Edit invalidates confirmation, and cancel/reset clears visit data. Temporary preferences are not persisted or sent anywhere.

## Original video mapping

The two legacy URLs were referenced in source but had no files in this checkout. The user then explicitly supplied `Happy path.mp4` and `Deviation path.mp4`. Both recordings were visually checked and encoded as fast-start H.264/AAC webpage copies; originals are untouched.

| Stable URL | Actual supplied recording | Duration |
| --- | --- | --- |
| `/media/CultureLens-Discover-Exhibition.mp4` | Happy path — discovery, reservation review, explanation adjustment | 107.3 s |
| `/media/CultureLens-Plan-Museum-Visit.mp4` | Deviation path — ambiguity and capability limits | 54.03 s |

The second legacy URL is retained for compatibility, but its on-page title accurately says Deviation path. Videos are mounted and fetched only on click, with native controls and inline playback. They are not background autoplay media.

## Integrated concept assets

All four WebPs are present in `public/media/culturelens/`, generated with the built-in image generation tool and explicitly revised to the user's private near-eye direction. No pending-image placeholders remain. Scenario slots are 16:10 and system/product slots are 4:3. Total payload is about 339 KiB.

- `culturelens-xr-scenario.webp`
- `culturelens-xr-system.webp`
- `culturelens-museband-scenario.webp`
- `culturelens-museband-product.webp`

All must remain labelled concept visualisation, not field evidence.

## Checks

Run `pnpm run build`, `pnpm run lint`, `pnpm run test:culturelens`.

Chrome checks cover missing-exhibition repair, comparison, both exhibition selections, ticket parsing, invalid input, explicit confirmation, edit/cancel, adjustable comfort needs, camera fallback, all proposal modes, six blueprint stages, four intent routes, four before/after failures, both playable videos, genuine PDF artefacts, keyboard activation and reduced motion. Tested widths: 320, 390, 768, 1024 and 1440 px. Unrelated route smoke checks include home, work, Crownlands, BoardGameMate, Landing App and Furniture.

## Existing deployment/source mismatch — important

The repository snapshot predates the currently deployed dedicated Crownlands page, game and some homepage changes. Replacing the whole production site with this checkout's normal `dist/` would roll those changes back. Recovering that unrelated source is outside this page-only task.

For this release, `vite.culturelens.config.ts` builds the dedicated page as an ES module (`pnpm run build:culturelens`). A compatibility adapter reuses the verified live shell's React runtime and Footer, avoiding a second React instance. A versioned copy of the live entry adds only a CultureLens lazy-route branch; the Crownlands module changes only its import reference to that versioned entry. The original shell and Crownlands bundles are retained for recovery.

The September release used a local staging utility outside the repository. As of the October code sync, the preserved live site is checked in at `production-baseline/` and the current staging utility is `scripts/stage-production.mjs`. `npm run build` assembles the complete website into `dist-production/` and `.vercel/output/`, without requiring any external project directory. The utility guards exact route markers before applying bounded mechanical changes. The release stays linked to the existing `jiamingzhang_portfolio` Vercel project and original production aliases. It does not modify deployment protection or global styles.

Do not deploy the older normal app build over production. Use the full production build described in the repository README. The original September page-only release did not include a Git push; the October sync checks in the complete build inputs and later website changes.

## Release verification — 13 September 2026

- Production: `https://jiamingzhang-portfolio.vercel.app/projects/culturelens`
- Vercel deployment: `dpl_8moZgDdtJQkQbY18uDFjbSbmPjWR`, target production, status READY.
- Deployment URL: `https://jiamingzhangportfolio-hadugbf22-jiaming-zhang.vercel.app`.
- TypeScript and full Vite build: passed. Existing shared app chunk remains about 529 kB and produces Vite’s non-blocking size advisory. CultureLens is lazy-loaded separately.
- ESLint: passed with zero warnings. Reducer tests: 6/6 passed.
- Browser: all documented interaction cases passed, no local page exceptions or failed HTTP responses; both videos decoded successfully at 504 × 720, with source durations intact.
- Responsive: no unintended overflow at 320, 390, 768, 1024 or 1440 px. Mobile chapter bar sits flush below the compact global header. Keyboard activation, active chapters, normal/reduced motion and SPA route remount passed.
- Unrelated pages: home, work and all four other project detail routes rendered their expected headings. Global visual CSS was not changed.
- Post-deploy: SHA-256 of production HTML, entry, CultureLens JS/CSS/runtime and Crownlands import-only module matched the verified local release exactly. Both video URLs returned HTTP 200 with `video/mp4`.
- Platform error-log query returned no logs for the new static deployment; this is not a claim of ongoing monitoring.
- This historical release preceded the visual supplements; see the 14 September supplement report for current assets and verification.
