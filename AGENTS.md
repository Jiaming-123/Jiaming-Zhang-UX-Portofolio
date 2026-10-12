# Source-built portfolio

The current website is built from React / TypeScript in `src/` and assets/helpers in `public/`. Do not reintroduce a separate minified production baseline or patch compiled JavaScript by string replacement.

Use `npm run build` for the full portfolio and standalone UniLink document. The release output is `dist-production/` and `.vercel/output/`; these generated directories are ignored by Git. `scripts/stage-production.mjs` integrates the UniLink document, cache-safe browser helpers and deployment routes only.

Keep the current visual design, page content, project cover images, removed sections, prototype links and navigation behaviour unchanged unless the user requests otherwise. Crownlands game source is in `src/crownlands/` and `src/components/crownlands/`.

Run TypeScript, `npm run build`, `npm test` and lint after relevant changes. Verify page layouts and game interactions in a local preview for release-impacting changes.

For user-requested website changes, explain which code changed, then sync GitHub and publish to Vercel without asking for a separate publication confirmation. The user explicitly requested this workflow on 2026-10-12. This does not authorize unrelated changes or releases for read-only questions. A GitHub push can automatically deploy; verify the intended commit is live, and initiate deployment from that same commit if Git integration does not trigger it.

The pre-migration state is recoverable from commit `589f33c6f940d1c41729d8b7744fe089938eea56`. Historical design/asset documentation may remain as reference; it is not an alternative production implementation.
