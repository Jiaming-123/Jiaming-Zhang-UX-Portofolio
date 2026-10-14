# Case-study semicircle navigation and reading avatar

The shared chapter navigation for UniLink, BoardGameMate, My Furniture Store,
CultureLens and Crownlands uses lower semicircles without numbers. Existing
chapter labels, palettes, click-to-jump, active highlighting and mobile rail
auto-centering are preserved. No project content is added back or removed.

## Source files

- `public/project-chapters.mjs`: shared mounting, continuous reading progress,
  avatar position, scroll-direction facing, idle timer, responsive rail tracking
  and event cleanup. UniLink's standalone document also uses this helper.
- `public/project-chapters.css`: lower semicircle markers and walking, front-turn
  and waving animations.
- `public/images/mascot/chapter-walk-{a,b}-v1.webp`: side-profile walking frames.
- `public/images/mascot/chapter-wave-{a,b}-v2.webp`: standing, front-facing wave
  frames. Both feet stay planted. There is no propeller on these four sprites.
- `tests/chapter-walker.test.mjs`: progress, geometry, asset and motion regression
  tests. `tests/project-chapters.test.mjs` keeps the existing navigation tests.

The existing larger global flying mascot is a separate component and is unchanged.

## Adjustable parameters

| Setting | Value / location |
| --- | --- |
| Desktop avatar | 32 × 48 CSS px, `.case-chapter-walker` |
| Mobile avatar (≤760 px) | 26 × 39 CSS px |
| Lower semicircle | 30 × 15 CSS px, no top border or number |
| Walking lane | 48 px desktop / 39 px mobile, above the track |
| Avatar top clearance | 4 px on desktop and mobile |
| Navigation padding | Desktop 4 px top / 10 px bottom; mobile 4 px top / 8 px bottom |
| Mobile bar layout | Logo beside the rail, no separate heading row or top-right current-chapter text |
| Side-walk cycle | 0.36 seconds, two discrete frames |
| Stationary front-wave cycle | 0.8 seconds, two discrete frames |
| Delay after the last vertical scroll | 280 ms, `setTimeout(stopWalking, 280)` |
| Turn toward the viewer | 0.18 seconds, `chapter-turn-front` |
| Turn angle | +55° after right-facing walking / −55° after left-facing walking |
| Track position easing | 0.06 seconds, linear |
| Navigation show/hide | 0.3 seconds (existing behavior) |
| Source / delivered frame size | 1024 × 1536 PNG / 128 × 192 lossless WebP |

The avatar's position is not a timed autopilot: it interpolates from the current
chapter marker toward the next marker using the reading line's position inside
the actual section. Scrolling down makes it walk right; scrolling up makes it
walk left. When motion stops, the sprite switches to front-view waving frames,
with a short CSS turn. The front-view sprite is never mirrored, so its teddy
bear stays on the correct side.

On narrow screens the label rail remains horizontally scrollable and auto-centers
the active chapter. The avatar is separately clamped inside the visible rail,
and scroll-driven movement brings its corresponding track position into view.
It is decorative, pointer-transparent and hidden from assistive technology.
Chapter links retain accessible labels, keyboard focus and `aria-current`.

The compact mobile bar is 86 CSS px high at 390px, with the 26 × 39px avatar
starting 4px below the top edge. Desktop uses the same 4px top clearance with
the 32 × 48px avatar. The existing rail stays full-width on wide screens and
scrollable on narrow screens; the actual bar height still drives anchor landing
and the reading line, so the reduced height does not introduce a hardcoded
scroll offset. The duplicated top-right chapter caption is not displayed.

Reduced-motion preferences disable walking, waving, turning and position
transitions, leaving a static appropriate frame. Hidden tabs pause the animation.
Leaving a project removes its navigation and clears the timer, animation-frame
callback, event handlers and observers.

## Sprite preparation

Mode: built-in image generation, identity reference:
`output/imagegen/flying-mascot-v1/jiaming-wink-v1.png`.
Generated originals are preserved locally under
`output/imagegen/chapter-walker-v1/`; only four optimized WebP assets ship.
The final four frames total 89,298 bytes (about 87.2 KiB).
Packaging uses a common crop, nearest-neighbor resizing and lossless WebP;
transparent alpha is preserved.

### Exact generation prompts

#### Side walk A

```text
Use case: identity-preserve.
Asset type: one transparent pixel-art walking mascot animation frame for a website chapter navigation.
Input Image 1 is the character identity and pixel style reference. Recreate the same young East Asian graduate: same short black side-parted hair, large cute head, navy black graduation gown, orange hood with white V sash, navy trousers, black shoes and the same small teddy bear held securely in one arm.
Primary request: STRICT SIDE PROFILE, facing RIGHT, exactly like a classic 2D side-scroller character. The nose points right and only one eye is visible. Not front view, not three-quarter view. Friendly smile.
Pose: grounded walking contact pose A. Front leg steps forward to the right, back leg extends behind to the left, both shoes at the same horizontal ground baseline. Free arm swings naturally downward. Robe hem lifts enough to show both legs.
No bamboo-copter, propeller, hat, flying, floating, crossed knees or seated pose.
Composition: one whole-body character on a 1024x1536 portrait canvas, centered, roughly 85% canvas height with 8% padding, fully visible, generous clear margin around head and feet. Simple chunky square pixel clusters and a limited palette, crisp readable silhouette at 32px width. Same original identity/outfit, not a different person.
Genuinely transparent background, no checkerboard, no black rectangle, no halo, glow or ground shadow. No text or watermark.
```

#### Side walk B (passing leg)

```text
Use case: precise-object-edit. Image 1 is the edit target, matching side-profile pixel walking frame A. Change ONLY the legs below the robe and a very slight free-arm swing to make a clearly different walking PASSING frame B. One leg must be vertically straight and its foot PLANTED DIRECTLY UNDER THE HIP at the original ground baseline. The other knee bends FORWARD toward the right, with that shoe lifted off the ground by roughly the height of one shoe. The feet must NOT remain widely split left and right like the source. This is a normal side-scroller walking mid-step, NOT crossed legs, not sitting, not flying. Keep the head, right-facing profile, hair, eye, mouth, teddy, entire upper robe, colors, exact scale and 1024x1536 framing completely unchanged. Full body and both shoes visible. No propeller, bamboo-copter, hat, background, checkerboard, halo, glow, shadow, text or watermark. Genuinely transparent alpha background.
```

#### Front wave A

```text
Use case: identity-preserve. Asset type: transparent pixel-art website navigation mascot standing wave frame. Image 1 is the character identity reference: same graduate, same hair, cute head proportions, navy black robe, orange hood, white V sash, navy tie, trousers and black shoes, same teddy bear held in his left arm (on the viewer's right).
Change view to STRICT FRONT VIEW, both eyes visible, nose centered, smiling directly at viewer. Entire body faces forward, not side view and not three-quarter. Stand naturally on two parallel planted feet, no crossed knees, no flying or floating. His free right hand (on viewer's left) is raised beside his head in a friendly wave.
No bamboo-copter or propeller, no hat. Match original chunky square pixel art, limited colors, crisp silhouette readable as a tiny 32px character. Full body on 1024x1536 portrait canvas, head top near y140 and planted shoes baseline near y1450, same scale and roughly 85% canvas height as the reference, centered with clear margins. Genuinely transparent alpha background, no black rectangle, checkerboard, halo, glow, shadow, text or watermark.
Wave pose A: raised open palm upright, fingers pointing upward, elbow bent. Keep shoulders, teddy and feet still.
```

#### Front wave B

```text
Use case: identity-preserve. Asset type: transparent pixel-art website navigation mascot standing wave frame. Image 1 is the character identity reference: same graduate, same hair, cute head proportions, navy black robe, orange hood, white V sash, navy tie, trousers and black shoes, same teddy bear held in his left arm (on the viewer's right).
Change view to STRICT FRONT VIEW, both eyes visible, nose centered, smiling directly at viewer. Entire body faces forward, not side view and not three-quarter. Stand naturally on two parallel planted feet, no crossed knees, no flying or floating. His free right hand (on viewer's left) is raised beside his head in a friendly wave.
No bamboo-copter or propeller, no hat. Match original chunky square pixel art, limited colors, crisp silhouette readable as a tiny 32px character. Full body on 1024x1536 portrait canvas, head top near y140 and planted shoes baseline near y1450, same scale and roughly 85% canvas height as the reference, centered with clear margins. Genuinely transparent alpha background, no black rectangle, checkerboard, halo, glow, shadow, text or watermark.
Wave pose B: same raised arm and elbow position, open palm tilted outward toward the viewer's left by 35 degrees, a friendly hand wave. Keep head, shoulders, teddy and planted feet at the same positions.
```

## Verification

- Both portfolio and standalone UniLink production builds, TypeScript and lint.
- Shared navigation and new reading-avatar regression tests.
- Local browser verification at desktop, 390 px mobile and 320 px narrow mobile:
  chapter navigation, active labels, sprite asset loading, horizontal bounds,
  scroll direction, front-view idle wave and route cleanup.
- The user's unrelated untracked CultureLens image-label test is not modified or
  included in this feature's commit. Its obsolete compiled-chunk expectations
  are reported separately if the full test glob is run.
