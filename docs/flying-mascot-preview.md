# Flying pixel mascot — v1 implementation

This version was first reviewed in a local preview, then approved by the user for publication on 2026-10-14. Existing page content, the hero portrait, removed sections and navigation are unchanged.

Website: https://jiamingzhang-portfolio.vercel.app/ · Local preview: http://127.0.0.1:4173/

## Behaviour and adjustable parameters

| Setting | Preview value | Source |
| --- | --- | --- |
| Desktop size | 100 × 150 CSS px | `src/styles/flying-mascot.css` |
| Phone size (≤760px) | 72 × 108 CSS px | `src/styles/flying-mascot.css` |
| Desktop home | 28px from right, 88px from top | `mascotHome` in `src/lib/mascotFlight.ts` |
| Phone home | 12px from right, 80px from top | `mascotHome` |
| Chapter-bar clearance | Home moves below a visible chapter bar, with 12px gap | `mascotHome` + `FlyingMascot.geometry` |
| Floating | Up/down 10px, slight ±3° tilt, 2.8-second cycle | `mascot-hover` CSS keyframes |
| Bamboo-copter spin | One revolution every .28 seconds, independent of body movement | `mascot-rotor` CSS keyframes |
| Idle expression interval | 2.4 seconds | `MASCOT_CONFIG.idlePoseMs` |
| Flying expression interval | .65 seconds | `MASCOT_CONFIG.flyingPoseMs` |
| Random flight | 5 seconds | `MASCOT_CONFIG.flightMs` |
| Return to home | .65 seconds | `MASCOT_CONFIG.returnMs` |
| Retrigger cooldown | .9 seconds after returning | `MASCOT_CONFIG.cooldownMs` |

Mouse entry triggers a flight. Touch/click and keyboard activation also work. During flight, the mascot's hit target is disabled, so it does not block content or queue more flights. Each trigger makes a new six-target, smooth curved route across the viewport. Rotation-safe margins keep the body inside the screen. Four styles rotate through: left/right slalom, two full spins, two horizontal turns, and banked swoops; spin direction is randomized. After five seconds it gently returns, straightens and resumes floating.

Normal expressions/poses: wink + wave, closed-eye smile + teddy hug, excited surprise + flying kick. All three use separated, uncrossed legs rather than a permanently crossed-knee pose. The rotor is a separate small pixel-styled CSS element so it continues turning during every pose, flight and return.

The component is mounted once outside route transitions in `src/App.tsx`, and also in the separately built UniLink entry, `src/unilink-entry.tsx`. It is portalled to `document.body` so page animations cannot change its fixed-position reference. Visibility changes pause the animations; resize cancels an in-progress route and safely resets home. With reduced-motion enabled, the mascot is static and activation changes its expression without full-screen flight.

## Files

- `src/components/FlyingMascot.tsx`: persistent avatar, pose switching, triggers, animation lifecycle and cleanup.
- `src/lib/mascotFlight.ts`: timing constants, home position, safe bounds, curved routes and four orientation styles.
- `src/styles/flying-mascot.css`: sizes, hover float, independently rotating copter, responsive and reduced-motion rules.
- `src/App.tsx`, `src/unilink-entry.tsx`: shared integration.
- `public/images/mascot/jiaming-wink-v1.webp` (54,684 bytes).
- `public/images/mascot/jiaming-hug-v1.webp` (49,360 bytes).
- `public/images/mascot/jiaming-surprise-v1.webp` (59,022 bytes).
- `tests/flying-mascot.test.mjs`: six focused regression tests.

Web assets are 256 × 384 transparent WebP, total 163,066 bytes (159.24 KiB). Generated alpha is retained; nearest-neighbour size packaging preserves crisp pixel edges and WebP encoding is lossless at the packaged size. Full-resolution generated PNGs are preserved non-destructively in `output/imagegen/flying-mascot-v1/`.

## Image generation provenance and final prompt set

The built-in image generation tool was used, not the CLI/API fallback. Source reference/edit target: the user's `/Users/charliezhang/Desktop/fly.png`. Transparent-background output was requested for every frame. No user photo or source PNG was overwritten. Earlier bent-leg variants were discarded from the implementation.

Each final frame used the following complete shared prompt with the respective pose paragraph substituted for `{POSE}`:

```text
Use case: identity-preserve. Image 1 is the edit target for one transparent pixel-art website mascot animation frame. Preserve exact character identity, hair, face proportions, chunky square pixels, navy graduation robe, orange and white sash, blue tie, same teddy bear. Change pose/expression to: {POSE} Remove the entire bamboo-copter including stem and all blades, the webpage supplies an independently spinning copter. Above hair is truly transparent. Remove all background, halo, glow and shadows. Full-body completely visible on the same 1024x1536 canvas, head in the original position, character at the same scale with shoes near the bottom. Do not crop or enlarge head. One character only. Genuinely transparent alpha background, no black rectangle or checkerboard, no text or watermark.
```

Wink pose:

```text
One eye closed in a playful wink. Free hand in a friendly wave. IMPORTANT leg pose: both legs hang naturally downward, knees only slightly bent, feet side-by-side and clearly separated, toes down. Do not cross legs or ankles; no raised or folded crossed knee.
```

Hug pose:

```text
Joyful closed-eyes smile, hugging the teddy bear close with both arms. IMPORTANT leg pose: both legs are straight and parallel, separated a little, pointing naturally downward. No crossed legs, no crossed ankles, no knee raised across the other leg.
```

Surprise pose:

```text
Excited surprised face with wide open eyes and O mouth, free arm extended like a wing, holding teddy in the other arm. IMPORTANT leg pose: a lively flying kick with two separate legs stretching diagonally backward in different directions, athletic flight stance, no crossing, no crossed ankles, no seated legs.
```

## Verification

TypeScript + both production builds pass. Lint passes. All 83 previously tracked tests and the six mascot tests pass (89 total). Running the full test glob gives 90 passing and two existing failures in the untracked `tests/culturelens-ai-image-label.test.mjs`, which belongs to the user. That file is unchanged; its two legacy bundle-name assumptions are outside this feature's scope. Only the mascot source, WebP assets, focused tests, documentation and the source-built release manifest are included in the publication commit; local PNG originals and screenshots are not shipped.

Chrome browser checks passed at desktop 1440 × 900 and touch phone 390 × 844: exactly one mascot on Home, About, Contact, UniLink, CultureLens, Crownlands, BoardGameMate and Furniture; no new horizontal overflow; rotor and hover continue; poses change; all four turn styles finish five-second flights and return; scrolling does not cancel a flight; client-side navigation retains the avatar instance; menu close and chapter navigation remain usable; keyboard, reduced-motion and resize cleanup behave correctly; no page errors.

Additional pure route tests cover widths 320, 390, 760, 820 and 1440. Safari was not browser-tested.

Local screenshots are in the parent workspace's `output/mascot-preview/` directory. An interactive local preview is open in the in-app browser. Optional video recording could not start because the Playwright FFmpeg runtime was absent; no recording was uploaded or published.
