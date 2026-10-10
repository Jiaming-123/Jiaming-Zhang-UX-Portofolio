# Production website

The newer production portfolio is preserved in the checked-in `production-baseline/` directory (deployment `dpl_Cbxby6GsJLECfJc1o9iUKfJAjtfH`). The general React source in this checkout predates several homepage, BoardGameMate, Furniture and Crownlands updates. **Do not deploy `dist/` as the whole website.**

Use `npm run build` to assemble the preserved portfolio plus the standalone UniLink page into `dist-production/` and `.vercel/output/`. `scripts/stage-production.mjs` checks the baseline and verifies that unrelated project files remain unchanged. Deploy this output with `vercel deploy --prebuilt --prod`.

Keep the baseline read-only during routine edits. Current production changes to the preserved pages live in `scripts/stage-production.mjs` and `public/`. `build:source` is only for source development and is not the production release. Review and update the preservation manifest deliberately if an existing project needs to change. Run `npm run build` and `npm test` before publishing or pushing release changes.
