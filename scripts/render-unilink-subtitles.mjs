import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// The only editable Chinese subtitle copy lives in the site's central Chinese file.
const root = fileURLToPath(new URL('../', import.meta.url))
const args = process.argv.slice(2)
const option = name => args.includes(name) ? args[args.indexOf(name) + 1] : undefined
const ffmpeg = option('--ffmpeg') || process.env.FFMPEG_PATH || 'ffmpeg'
const input = option('--input') || path.join(root, 'public/media/unilink/unilink-presentation-20261015.mp4')
const output = path.join(root, 'public/media/unilink/unilink-presentation-zh-20261025.mp4')
const source = await fs.readFile(path.join(root, 'src/i18n/中文版.ts'), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { unilinkVideoSubtitles: cues } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const directory = path.join(root, 'output/unilink-subtitles')
await fs.mkdir(directory, { recursive: true })

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
PlayResX: 1916
PlayResY: 1080
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Hiragino Sans GB,52,&H00FFFFFF,&H00FFFFFF,&H00383838,&H00383838,0,0,0,0,100,100,0,0,1,0,0,5,40,40,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`
const events = []
let previousEnd = 0
for (const [start, end, text] of cues) {
  if (!(start >= previousEnd && end > start && end <= 240.1 && text.trim())) throw new Error(`Invalid subtitle at ${start}`)
  previousEnd = end
  // Small frame padding removes residual baked-in English at subtitle transitions.
  const maskStart = Math.max(0, start - .12)
  const maskEnd = Math.min(240.1, end + .12)
  events.push(`Dialogue: 0,${timestamp(maskStart)},${timestamp(maskEnd)},Default,,0,0,0,,{\\an7\\pos(0,0)\\p1\\1c&H383838&}m 0 980 l 1916 980 l 1916 1080 l 0 1080`)
  events.push(`Dialogue: 1,${timestamp(start)},${timestamp(end)},Default,,0,0,0,,{\\an5\\pos(958,1028)}${text.replaceAll('\n', '\\N')}`)
}
const assPath = path.join(directory, 'unilink-zh.ass')
await fs.writeFile(assPath, header + events.join('\n') + '\n')
await fs.writeFile(path.join(directory, 'unilink-zh.vtt'), 'WEBVTT\n\n' + cues.map(([s,e,t], i) => `${i+1}\n${timestamp(s,true)} --> ${timestamp(e,true)}\n${t}\n`).join('\n'))
console.log(`Prepared ${cues.length} Chinese subtitles from src/i18n/中文版.ts`)
if (!args.includes('--prepare-only')) {
  const filterPath = assPath.replaceAll('\\', '/').replaceAll(':', '\\:').replaceAll("'", "'\\''")
  const command = ['-hide_banner', '-y', '-i', input, '-map', '0:v:0', '-map', '0:a:0', '-vf', `ass=filename='${filterPath}'`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-maxrate', '2200k', '-bufsize', '4400k', '-g', '60', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', output]
  await new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, command, { stdio: 'inherit' })
    child.once('error', reject)
    child.once('exit', code => code === 0 ? resolve() : reject(new Error(`Video rendering exited ${code}`)))
  })
  console.log(`Created ${path.relative(root, output)}`)
}
