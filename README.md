# Jiaming Zhang — UX / Product Design Portfolio

Live website: https://jiamingzhang-portfolio.vercel.app

This repository contains the full inputs needed to build the current portfolio: Home, About, Contact, UniLink, BoardGameMate, My Furniture Store, CultureLens Concierge and Crownlands.

## Open and run in VS Code

Open this repository folder in VS Code. Install Node.js 20 or newer, then use the terminal:

```sh
npm install
npm run build
npm test
npm run preview
```

Open the local URL printed by the preview command. The VS Code **Terminal → Run Task** menu also includes production build, tests and preview tasks. This is the current full website preview; `npm run dev` is only the source-development app and does not reproduce all preserved production pages.

## Where the website lives

| Folder / file | Purpose |
| --- | --- |
| `src/` | React / TypeScript page, component, data and style source, including the standalone UniLink case study. |
| `public/` | Current covers, screenshots, videos, game resources, navigation helpers and supplementary CSS. |
| `production-baseline/` | Preserved production HTML, JavaScript, CSS and resources from the newer live portfolio. Keep this snapshot unchanged during routine edits. |
| `scripts/stage-production.mjs` | Applies the current full-site changes to that preserved snapshot and integrates the rebuilt UniLink page. |
| `tests/` | Regression tests for current website content, assets, navigation and interactions. Run after building. |
| `docs/` | Implementation notes, asset provenance and production preservation manifest. Older dated reports describe historical releases. |
| `vercel.json` | Full-site build output and route configuration for Git-connected deployments. |

Important: some historical React source is older than the production website. The newer compiled pages are preserved in `production-baseline/`; they are not a reconstruction of the original missing TypeScript source. Current changes to those preserved pages are explicitly recorded in the staging script and public assets. Everything required for the production build is now inside this repository; no external `_work` directory is needed.

## Build and publish

`npm run build` creates the complete site in `dist-production/` and Vercel Build Output in `.vercel/output/`. Both are generated and ignored by Git. `vercel.json` explicitly selects `dist-production` for Git-connected builds.

For a manually linked Vercel checkout, build and test first, then publish the prebuilt output:

```sh
npm run build
npm test
vercel deploy --prebuilt --prod
```

Do not publish `dist/` as the whole website: `npm run build:source` is only for general source development and can omit newer preserved pages.

Do not commit `.env` files, `.vercel` project credentials or `node_modules`. GitHub file timestamps show the last commit that changed each file; unchanged configuration files can legitimately retain older dates.
