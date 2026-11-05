# Crownlands Chinese artwork

The Chinese page selects sibling raster artwork from `public/crownlands/zh/`. English mode continues to use the original files. Layout, image containers and existing enlargement interactions are shared between languages.

Localized assets:

- `rules-01.webp` and `rules-02.webp`: two original portrait rule sheets, with the same section arrangement, diagrams and rule values.
- `sellsheet.webp`: original portrait sell sheet, retaining the board render, components, card fan, overview, six features and designer credits.
- `reinforce.webp`, `expand.webp`, `reposition.webp`, `contest.webp`: original action-card design and diagrams with Chinese lettering.
- `tracker.webp` and `card-back.webp`: Chinese labels within the original card design.

Artwork was localized using the built-in image editing tool in `text-localization` mode. The prompt set requires translation of lettering only, preserving composition, illustrations, paper texture, borders, numbers and aspect ratio, with no visible cover blocks. The exact local prompt record is `output/crownlands-chinese-artwork-prompts.json`.

Maintain all Chinese wording in `crownlandsArtifacts` and `crownlandsChinese` in `src/i18n/中文版.ts`. For future wording changes within raster artwork, use the corresponding original image as the edit target and update its Chinese sibling. Original sketches, physical prototype and playtest photographs remain original.

The discarded SVG/HTML recreations are not used. The generated PNG masters remain in the tool's generated-images directory; web copies use WebP to keep loading lightweight.
