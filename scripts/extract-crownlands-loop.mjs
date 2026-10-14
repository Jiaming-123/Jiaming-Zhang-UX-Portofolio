// Subtitle-free excerpts from the supplied Introduction.mp4. Source stays untouched.
import { mkdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const [source, ffmpeg = 'ffmpeg'] = process.argv.slice(2)
if (!source) throw new Error('Usage: node scripts/extract-crownlands-loop.mjs input.mp4 [ffmpeg]')
const output = resolve('public/crownlands/loop')
mkdirSync(output, { recursive: true })
const clips = [
  ['read-board', 6.1, 1.8],
  ['choose-secretly', 31, 3.6],
  ['reveal', 34.6, 3],
  ['resolve', 38.1, 5.4],
  ['update-power', 43.6, 3.5],
  ['repeat', 47.2, 3.3],
]
const crop = 'crop=1920:936:0:0,scale=480:-1:flags=lanczos'
function run(args) {
  const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-nostdin', ...args], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error('Media extraction failed')
}
for (const [name, start, duration] of clips) {
  const base = resolve(output, `${name}-20261015`)
  run(['-y', '-ss', String(start), '-t', String(duration), '-i', source, '-an', '-filter_complex', `${crop},fps=10,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3`, '-loop', '0', `${base}.gif`])
  run(['-y', '-ss', String(start + duration / 2), '-i', source, '-an', '-vf', crop, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '84', `${base}.webp`])
}
