# Jiaming Zhang — UX / Product Design Portfolio

Live website: https://jiamingzhang-portfolio.vercel.app

All current pages are built from the editable React / TypeScript source in this repository. The development homepage and production homepage now use the same implementation. There is no separate preserved, minified implementation to patch.

## Open in VS Code

Open this repository folder, install Node.js 20 or newer, then run:

```sh
npm install
npm run dev
```

For a release-equivalent preview:

```sh
npm run build
npm test
npm run preview
```

The VS Code **Terminal → Run Task** menu provides full-site build, tests and preview tasks.

## Where to edit

| Website area | Source |
| --- | --- |
| Homepage layout and project order | `src/pages/HomePage.tsx` |
| Homepage name, introduction and motion | `src/components/Hero.tsx` |
| About and Contact | `src/pages/InfoPages.tsx` |
| Navigation, scrolling and shared footer | `src/components/Layout.tsx` |
| UniLink | `src/pages/UniLinkCaseStudy.tsx`, `src/components/unilink/`, `src/data/unilink.ts` |
| BoardGameMate | `src/components/BoardGameMateIteration.tsx`, `src/components/BoardGameMateFinalShowcase.tsx` |
| My Furniture Store | `src/components/FurnitureCaseStudy.tsx`, furniture hero in `src/pages/ProjectPage.tsx` |
| CultureLens | `src/pages/CultureLensCaseStudy.tsx`, `src/components/culturelens/` |
| Crownlands case study | `src/pages/CrownlandsPage.tsx`, `src/crownlands.css` |
| Crownlands game interface | `src/components/crownlands/CrownlandsGame.tsx` |
| Crownlands board and scoring | `src/crownlands/boardData.ts` |
| Crownlands legal moves and AI | `src/crownlands/gameRules.ts` |
| Crownlands rounds and match state | `src/crownlands/matchState.ts` |
| Covers and homepage project metadata | `src/data/homepage-covers.json`, `src/data/projects.ts` |
| Shared styles | `src/styles.css`, `src/styles/`, imported CSS in `public/` |
| Images, videos and game resources | `public/` |

`index.html` is the React entry document, not the entire website. `dist-production/`, `dist-unilink/`, `node_modules/` and `.vercel/output/` are generated; do not edit them.

## Build and deployment

`npm run build` compiles the main portfolio and the standalone UniLink document, then combines them into `dist-production/` and Vercel Build Output in `.vercel/output/`. UniLink retains its separate document so its navigation and scroll behaviour remain unchanged.

`scripts/stage-production.mjs` integrates the compiled UniLink entry, gives browser helpers cache-safe filenames, and writes route/output metadata. It does not perform string replacements in compiled React code. `docs/production-restoration-manifest.json` records the current build's source entries and output hashes.

Build and test before publishing. A GitHub push may trigger automatic Vercel deployment: first review the changes and obtain publication approval. Do not commit credentials, `.env`, generated output or `node_modules`.

## Cleanup and recovery

The obsolete `production-baseline/` runtime, old generic placeholder case studies, unused Visual Archive, removed CultureLens simulation and its compatibility build were retired when the current pages were migrated to source.

The previous repository state is recoverable from commit `589f33c6f940d1c41729d8b7744fe089938eea56`. The migration keeps the live design, covers, content removals and prototype links as its reference; it is not a redesign.
