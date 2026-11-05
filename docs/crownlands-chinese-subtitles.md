# Crownlands Chinese video subtitles — 2026-11-05

The Chinese case study selects `public/crownlands/video/introduction-zh-style-20261105.mp4`. English mode continues to use the original `introduction.mp4`. The 39 translated subtitle cues are maintained exclusively in `src/i18n/中文版.ts` as `crownlandsVideoSubtitles`.

The source film has English captions baked into the picture. Chinese captions follow the original black, single-line text and light rounded backing, centered in the same lower caption area. Each backing follows the width of its original English caption, recorded in `scripts/crownlands-subtitle-regions.json`; it cleanly replaces the baked English without a full-width band. This also works in native fullscreen playback. The original narration, game footage, title artwork, cards and end credits are retained. Cue timing was checked against quarter-second samples of the original English captions.

The Chinese asset is about 17 MB, compared with 75 MB for the existing English web video. It is 1280 × 720, 30 fps, H.264/yuv420p with AAC stereo audio, approximately 89.47 seconds. Faststart places MP4 metadata before the media data. The source recording on the Desktop was used for encoding; the Desktop recording and English web asset remain untouched.

`GameplayVideo` selects the video from the shared page language and restores the current playback position and playing/paused state when the language changes. Native controls, inline playback, fullscreen captions and music ducking remain available. The game owns a single looping background audio element shared across languages. Starting the match starts music directly from the user gesture; the music button appears during a match and controls this track independently of short game effects. Resetting to setup or leaving the page pauses music.

Regenerate after editing the central subtitle copy:

```sh
node scripts/render-crownlands-subtitles.mjs --ffmpeg /path/to/ffmpeg --input '/path/to/Introduction.mp4'
```

Without `--input`, the renderer uses the existing English web video. `--prepare-only` writes ASS and WebVTT review files under ignored `output/crownlands-subtitles/` without encoding. These generated review files are not separate sources of Chinese wording.
