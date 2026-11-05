import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// Edit subtitle wording only in the central Chinese copy file.
const root = fileURLToPath(new URL('../', import.meta.url))
const args = process.argv.slice(2)
const option = name => args.includes(name) ? args[args.indexOf(name) + 1] : undefined
const ffmpeg = option('--ffmpeg') || process.env.FFMPEG_PATH || 'ffmpeg'
const input = option('--input') || path.join(root, 'public/crownlands/video/introduction.mp4')
const output = path.join(root, 'public/crownlands/video/introduction-zh-style-20261105.mp4')
const directory = path.join(root, 'output/crownlands-subtitles')
await fs.mkdir(directory, { recursive: true })
const source = await fs.readFile(path.join(root, 'src/i18n/中文版.ts'), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { crownlandsVideoSubtitles: cues } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)

function timestamp(time, vtt = false) {
  const precision = vtt ? 1000 : 100
  const ticks = Math.round(time * precision)
  const h = Math.floor(ticks / (3600 * precision))
  const m = Math.floor(ticks / (60 * precision)) % 60
  const s = Math.floor(ticks / precision) % 60
  const fraction = ticks % precision
  return `${String(h).padStart(vtt ? 2 : 1, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(fraction).padStart(vtt ? 3 : 2, '0')}`
}

const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 1280
PlayResY: 720
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Hiragino Sans GB,38,&H00000000,&H00000000,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,5,32,32,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`
// Match each original caption box: light rounded backing with black, single-line text.
const regions = JSON.parse(await fs.readFile(path.join(root, 'scripts/crownlands-subtitle-regions.json'), 'utf8'))
if (regions.length !== cues.length) throw new Error('Each cue requires its original caption region')
const events = []
let previousEnd = 0
for (const [index, [start, end, text]] of cues.entries()) {
  if (!(start >= previousEnd && end > start && end <= 89.47 && text.trim())) throw new Error(`Invalid subtitle at ${start}`)
  previousEnd = end
  const region = regions[index]
  const x = region.x - 7, y = 640, width = region.width + 14, height = 55, r = 9
  const right = x + width, bottom = y + height
  const shape = `m ${x+r} ${y} l ${right-r} ${y} b ${right-4} ${y} ${right} ${y+4} ${right} ${y+r} l ${right} ${bottom-r} b ${right} ${bottom-4} ${right-4} ${bottom} ${right-r} ${bottom} l ${x+r} ${bottom} b ${x+4} ${bottom} ${x} ${bottom-4} ${x} ${bottom-r} l ${x} ${y+r} b ${x} ${y+4} ${x+4} ${y} ${x+r} ${y}`
  events.push(`Dialogue: 0,${timestamp(Math.max(0,start-.14))},${timestamp(end+.14)},Default,,0,0,0,,{\\an7\\pos(0,0)\\p1\\1c&HF0F2F2&}${shape}`)
  events.push(`Dialogue: 1,${timestamp(start)},${timestamp(end)},Default,,0,0,0,,{\\an5\\pos(640,667)}${text.replaceAll('\n', '\\N')}`)
}
const assPath = path.join(directory, 'crownlands-zh.ass')
await fs.writeFile(assPath, header + events.join('\n') + '\n')
await fs.writeFile(path.join(directory, 'crownlands-zh.vtt'), 'WEBVTT\n\n' + cues.map(([s,e,t], i) => `${i+1}\n${timestamp(s,true)} --> ${timestamp(e,true)}\n${t}\n`).join('\n'))
console.log(`Prepared ${cues.length} Chinese cues from src/i18n/中文版.ts`)
if (!args.includes('--prepare-only')) {
  const filterPath = assPath.replaceAll('\\', '/').replaceAll(':', '\\:').replaceAll("'", "'\\''")
  const command = ['-hide_banner' , '-y', '-nostdin', '-loglevel', 'warning', '-i', input, '-map', '0:v:0', '-map', '0:a:0', '-vf', `scale=1280:720:flags=lanczos,fps=30,ass=filename='${filterPath}'`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-maxrate', '2200k', '-bufsize', '4400k', '-g', '60', '-threads', '4', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-progress', path.join(directory,'encode-progress.txt'), '-nostats', output]
  await new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, command, { stdio: 'inherit' })
    child.once('error', reject)
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`Video rendering exited ${code}`)))
  })
  console.log(`Created ${path.relative(root, output)}`)
}

