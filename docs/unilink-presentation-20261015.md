# UniLink presentation replacement — 2026-10-15

The supplied `UniLink presentation.mp4` replaces the introduction video without changing the existing poster, section layout, or player controls.

- Original: 152,585,789 bytes; HEVC Main 10, 1916 × 1080, 30 fps.
- Web asset: `public/media/unilink/unilink-presentation-20261015.mp4`, 34,028,513 bytes (77.7% smaller).
- Full content retained: approximately 240.1 seconds.
- H.264 High level 4.1, yuv420p, CRF 23, slow preset; 2,200 kb/s maximum video rate, 4,400 kb buffer; 60-frame keyframes.
- AAC stereo at 128 kb/s. Average total bitrate approximately 1.13 Mb/s.
- MP4 faststart places metadata before media data for progressive playback and seeking.
- The player remains click-to-load, with native controls, inline mobile playback, retry fallback, and pause when offscreen or the document is hidden.
- Full audio/video decode completed without errors. SSIM over a matched 80–85 second sample: 0.996175. A frame at 130 seconds was visually checked for readable presentation text.
- Network conditions still affect buffering; compression cannot guarantee uninterrupted playback on every connection.

The original Desktop file is untouched. The old published MP4 is retained in local `output/media-backups/` and Git history rather than shipping an unused 89 MiB file.

Implementation: `src/components/unilink/UniLinkStory.tsx` changes the versioned source URL and intrinsic video dimensions. `tests/unilink-story.test.mjs` checks release assets, lazy loading, size budget and metadata ordering.
