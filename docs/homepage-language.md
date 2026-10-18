# Homepage language switch — 2026-10-18

This is the first translation pass: homepage content and common navigation / footer controls. About, Contact and case-study bodies are not translated in this pass. Original project artwork and embedded image text remain unchanged.

## Chinese copy maintenance

All existing Chinese website copy now lives in `src/i18n/中文版.ts`, grouped into common controls, navigation, hero, homepage, footer, mascot, project summaries and image descriptions. This is the single maintenance file for future Chinese wording changes and new page translations. Page components import the copy; `homepage.ts` only adapts project data and re-exports cover descriptions. English text and language-independent English exceptions remain in their existing components. This consolidation changes no text, layout or language-switch behaviour.

The consolidation passes the production build, lint and all 132 tracked tests, including a TypeScript syntax-tree check rejecting Chinese UI strings outside the central file (module import paths and comments are excluded). Local preview confirms the existing Chinese homepage renders from the shared dictionary. The same two unrelated failures in the pre-existing untracked CultureLens test remain unchanged.

- The top-centred ENGLISH / 中文 pill is 112 × 28 CSS pixels on desktop and 108 × 28 on mobile, reduced at the user's request.
- Language is remembered using the versioned `portfolio.language.v1` key, shared by the main app and the standalone UniLink document. Storage access is guarded and the storage listener is cleaned up.
- Chinese copy covers the hero introduction, locations, rotating keywords, selected-project introductions, category labels, image descriptions, common navigation and footer actions.
- Jiaming Zhang and all five project names remain English. The user additionally requested that `Hi!` and `LET'S CREATE MEANINGFUL EXPERIENCES.` remain English in Chinese mode. The footer headline retains its original pixel typography.
- The original English version, project order, cover assets, links, animation timing and removed content are preserved.
- The user initially requested local-only preview, then explicitly authorized production publication after the final refinements.

Verification: TypeScript / production build and lint passed. All 131 tracked and newly added tests passed. A separate pre-existing untracked CultureLens test has two stale-build-filename failures; it is not changed or included in this release. Local browser checks cover both language directions, refresh persistence, cross-route persistence, original footer typography, menu labels, and 390 / 320 pixel mobile layouts without horizontal overflow.
