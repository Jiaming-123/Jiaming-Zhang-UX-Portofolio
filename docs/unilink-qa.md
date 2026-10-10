# UniLink QA

Validated 1 October 2026 against the local development server and the production build.

## PNG replacement verification — 1 October 2026

- All 34 PNG URLs return HTTP 200 from the production preview. SHA-256 hashes of the served bytes match the supplied originals.
- All 18 main-flow screens are PNGs; no main-flow placeholders remain. All three hero screens also use PNGs.
- The supplementary gallery contains the other 16 PNGs. Open, next image, zoom, fit, Escape, focus restoration and 12 successive Tab presses were verified.
- Representative group, mentor, booking and service stages select the matching screen after scrolling and fit the full image inside the stage.
- Visual checks passed for the desktop booking stage, mobile booking screenshot, hero, cover and enlarged supplemental screen.
- No horizontal document overflow at widths 320, 390, 768, 1440 and 1920px. Reduced motion displays the static mobile sequence.
- Home cover and Open Graph metadata point to the newly rendered `cover.png`.
- No captured page errors. TypeScript, Vite production build, metadata generation, repository ESLint and whitespace checks pass.
- The existing in-app browser could not be refreshed automatically because its browser security-policy verification was unavailable. The independent local Chrome verification above completed before that attempt. Refreshing the existing preview remains a manual UI step.

## Existing implementation checks

- TypeScript project build.
- Vite production build and route-specific HTML metadata generation.
- Full repository ESLint with zero warnings.
- Git diff whitespace check.
- Production page returns HTTP 200 with the expected title and Open Graph cover.
- Homepage UniLink link navigates to `/projects/unilink`.
- Legacy `/projects/landing-app` redirects to the new case study.
- Normal and trailing-slash URLs use native scrolling on UniLink.
- Header remains visible in the hero and gives way to chapter navigation afterwards.
- Chapter click lands approximately 110px below the viewport top, with the correct active chapter (Testing checked after a long smooth jump).
- Booking screenshot index matches the corresponding explanation after direct scrolling.
- Student/mentor persona switch.
- Image lightbox opens, advances via arrow keys, closes with Escape and restores focus to the opener.
- Explicit keyboard focus wrapping in the lightbox, including repeated Tab cycles.
- Reduced motion removes pinned animated stages and renders static screen sequences.
- Chrome viewport checks at 320, 390, 768, 1280 and 1920px: no horizontal document overflow.
- No captured page errors, failed local network requests or broken loaded images.
- Research and evaluation images remain the original document evidence; product screenshots have been replaced by the 34 supplied PNGs above.
- Visual inspection of hero, homepage cover, concept layout, research/personas, enlarged journey, booking sequence, narrow-mobile testing and static booking layouts.

## Fixes made during verification

- Replaced full-height fitting of long product frames with readable-width framing and controlled vertical reveal.
- Synchronized screenshot selection using the current scroll position, avoiding stale state on fast jumps.
- Removed image-load refreshes that interrupted smooth chapter scrolling; image geometry is reserved and evidence expansion triggers layout refresh.
- Corrected reserved persona image dimensions to avoid a 133px shift during chapter navigation.
- Normalized trailing-slash route checks for header behavior and native scrolling.
- Added explicit first/last control focus wrapping to supplement the native dialog's modal behavior.

## Limits

The agent-browser executable was not installed; browser verification used the bundled Playwright library with local headless Chrome. Safari was not run, and no laboratory frame-rate/Lighthouse score is claimed. CSS uses native scrolling, modern sticky positioning, responsive layouts and a reduced-motion fallback.

The shared portfolio JavaScript bundle emits Vite's size warning at 525.9 kB (174.1 kB gzip). UniLink is loaded separately at approximately 42.1 kB (13.6 kB gzip), plus approximately 26.2 kB CSS (6.0 kB gzip). Refactoring unrelated portfolio code was outside this change.

Three recovery screenshots remain labelled placeholders in their optional disclosure because mentor-unavailable, backup and handover exports were not included in the supplied batch. Two optional evidence panels await the affinity map and consolidated 12-person evaluation record. See `unilink-implementation.md` for exact replacement paths and Figma node IDs.

The implementation is local and build-ready. No production deployment was performed.
