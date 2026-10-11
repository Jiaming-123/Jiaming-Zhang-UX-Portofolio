# UniLink implementation and asset handoff

Implemented in the existing React 18 / Vite 5 / React Router 6 portfolio. The page lives at `/projects/unilink`; `/projects/landing-app` redirects there. Home and Work put UniLink first and use an authentic Figma composition. Existing unrelated working-tree changes were preserved.

## Integration

- `src/pages/UniLinkCaseStudy.tsx`: nine-chapter English narrative, source-based testing, team contribution callouts, two research perspectives, evidence disclosures, reflection and prototype CTA.
- `src/components/unilink/CaseStudyMedia.tsx`: original screenshot sequences, native dialog lightbox, keyboard navigation and focus restoration.
- `src/components/unilink/CaseStudyTimeline.tsx`: chapter anchors, active chapter and progress.
- `src/data/unilink.ts`: screen paths, sequence rationale, research sources and iteration stories.
- `src/styles/unilink.css`: scoped editorial design and responsive/static layouts.
- `public/images/unilink`: 34 original PNG screen exports, report/notes evidence, two composite-persona SVGs, two synthesized journey SVGs and cover.
- `unilink.html` and `vite.unilink.config.ts`: define and compile the standalone page, including its route-specific title, description, canonical and Open Graph metadata. `scripts/stage-production.mjs` integrates that entry into the full-site build. `vercel.json` routes this URL to that HTML entry, preserving the existing SPA fallback elsewhere. The former `scripts/build-unilink-meta.mjs` compatibility helper was retired in the October React-source migration.

Existing Inter and Space Grotesk fonts, outer header/footer, card treatment and project listing remain in use. The final Figma's navy/warm-neutral/gold palette takes precedence over the brief's older purple description; restrained lilac is used for editorial annotations.

## Motion and responsive decisions

GSAP matchMedia scopes and cleans up animations. Concept convergence uses a bounded desktop pin. Product sequences use native CSS sticky stages, GSAP transitions between complete, uncropped PNG viewport screenshots. Hero screens reveal gradually; research motion is quieter. The timeline takes over after the hero. Native page scrolling is preserved; the existing Lenis instance is disabled only on this route.

At 900px and below, and whenever reduced motion is requested, product stages become static vertical sequences. Mobile chapter navigation uses a current-chapter label and nine compact numbered dots. Evidence is expandable with fit/zoom controls. Persona and journey files are explicitly labelled synthesis; their names, thoughts and emotions are not presented as participant records.

## Source interpretation

The A1 report documents 12 stakeholder interviews and six early-concept interviews. These are distinct from the later evaluation's 6 students + 6 mentors specified in the user's project brief. The supplied Week 9 interview responses and notes document two individual participants; their comments are not generalized to all twelve. No SUS aggregate, usability percentage or live outcome is claimed.

Week 6 / early concept slides and the Week 8 / Week 9 development slides provide historical context, not authority for final UI. The final Figma remains the product source of truth. The Week 9 slides explicitly credit the During-Service work to Jiaming Zhang and Weilinge Gong; this collaboration is acknowledged.

Student evidence emphasizes status, points clarity, low-pressure group participation and support boundaries. Mentor evidence emphasizes request controls, consistent identity, availability and intrinsic motivation. The page distinguishes visible final improvements from unresolved requests and future validation.

## PNG replacement pass — 1 October 2026

All product screenshots now use the 34 PNG files supplied by the user in the original `unilink` folder. Each screenshot was copied byte-for-byte: no screenshot content, transparency or resolution was edited. All are 786px wide, with original heights of 1704–1728px. The source filenames, destination paths, exact dimensions and SHA-256 hashes are recorded in `unilink-assets.json`.

- 18 PNGs replace every main-flow screen, including seven previously pending exports.
- 16 additional PNGs are available in the collapsed supplementary screen gallery, with fit/zoom, previous/next navigation and keyboard controls.
- Hero images and the Home / Work cover use these PNGs. `cover.png` is a browser-rendered composition of the supplied student home and Housing Help chat; Open Graph metadata uses the same new cover.
- The desktop stage fits each complete screenshot within the available height. The old vertical panning treatment for long Figma canvases was removed because these exports are fixed viewports. Mobile sequences remain static.
- The old 11 product WebPs and old cover were removed. Original research-report and evaluation-evidence WebPs remain source documents.

`Mentor Profile-1.png` is the student-facing mentor detail. `Mentor Profile.png` is the mentor account screen and appears in the supplementary gallery. `Housing Help_副本.png` is the group chat. The main membership step uses `Group chat entry.png`; the hero uses the supplied joined student home.

The supplied `Confirmation.png` contains both “You’re booked” and “Waiting for confirm”. The adjacent explanation now identifies this unresolved status inconsistency. Pixels remain exactly as supplied. Prototype names, balances, reviews, statistics and rewards remain illustrative content, not live results or partnership claims.

## Final UI exports still pending

The supplied batch does not include the three recovery states below. Their labelled placeholders remain in the optional recovery disclosure:

| Screen | Previously identified Figma node |
| --- | --- |
| Mentor unavailable | 7:14502 |
| Backup recommendations | 7:14539 |
| Mentor detail / handover | 7:14587 |

When supplied, copy each original image into `public/images/unilink/during-service/`, set its full filename and actual dimensions in `src/data/unilink.ts`, and remove `pending: true`. These recovery states are not substituted with unrelated mentor profiles.

## Research and evaluation placeholders

The page uses actual A1 report pages, original student/mentor notes, and Week 9 booking/service development slides. Two additional source items remain explicitly pending in their evidence disclosures:

- `research/affinity-map.webp` — original affinity/synthesis board.
- `testing/ube-overview.webp` — consolidated evidence for the full 12-person evaluation.

When supplied, add each as an `ArtifactGallery` entry and remove its corresponding pending panel. No invented research board, fabricated quote or invented quantitative result was used.

## Validation

See `unilink-qa.md` for final checks. The public Vercel site is not changed by local implementation; deployment remains a separate action. No dependency installation was needed.
