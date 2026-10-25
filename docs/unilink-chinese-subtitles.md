# UniLink Chinese video subtitles — 2026-10-25

The Chinese case study uses `public/media/unilink/unilink-presentation-zh-20261025.mp4`; the English page retains its original video. The 94 translated subtitle cues are maintained exclusively in `src/i18n/中文版.ts` as `unilinkVideoSubtitles`.

The source presentation has English subtitles baked into the picture. The Chinese asset therefore renders a single Chinese subtitle band over that existing subtitle area, rather than displaying two overlapping languages. Names and UniLink remain in English. Original narration, scenes, duration, slide content and phone demonstrations are retained. Subtitles remain visible in native fullscreen and inline playback.

The Chinese asset was encoded from the supplied Desktop original, without modifying that original or the English web asset. It is 33,561,393 bytes (33.6 MB decimal), approximately 240.1 seconds, 1916 × 1080 at 30 fps, H.264/yuv420p with AAC stereo 128 kb/s. CRF 23, slow preset, 2,200 kb/s video maximum, 4,400 kb buffer and 60-frame keyframes retain the existing web compression settings. Faststart places MP4 metadata before the media data. A full decode completed without errors.

`UniLinkStory.tsx` selects the video from the page language. When the language changes during playback, it restores the current position and the playing/paused state after the new source loads. Click-to-load, native controls, mobile inline playback, offscreen pause and retry behaviour are retained.

To change subtitle wording, edit the central Chinese file, then regenerate using an installed FFmpeg with libass:

```sh
node scripts/render-unilink-subtitles.mjs --ffmpeg /path/to/ffmpeg --input '/path/to/UniLink presentation.mp4'
```

If `--input` is omitted, the renderer uses the checked-in English web video. The original higher-quality source is preferred for regeneration. `--prepare-only` creates ASS and WebVTT review files under ignored `output/unilink-subtitles/` without encoding. Generated review files are not alternative sources of Chinese copy.

Production publication of the Chinese case study, subtitles and cleaned cover was requested on 2026-10-25 after the local preview review.
