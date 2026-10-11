import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(repo, 'dist-production')
const hash = data => createHash('sha256').update(data).digest('hex')
const unilink = path.join(repo, 'dist-unilink')
let html = fs.readFileSync(path.join(target, 'index.html'), 'utf8')
let uniLinkHtml = fs.readFileSync(path.join(unilink, 'unilink.html'), 'utf8')
if (!uniLinkHtml.includes('data-app="unilink"')) throw new Error('Build the standalone UniLink entry first.')
// Hash the plain browser helpers as well as Vite's compiled assets, so existing
// visitors receive the current navigation, motion and game music controller.
for (const file of ['portfolio-navigation.js', 'hero-orb-motion.mjs', 'crownlands-audio.js']) {
  const content = fs.readFileSync(path.join(repo, 'public', file))
  const extension = path.extname(file)
  const cacheSafe = path.basename(file, extension) + '-' + hash(content).slice(0,12) + extension
  fs.writeFileSync(path.join(target, cacheSafe), content)
  html = html.replace('src="/' + file + '"', 'src="/' + cacheSafe + '"')
  uniLinkHtml = uniLinkHtml.replace('src="/' + file + '"', 'src="/' + cacheSafe + '"')
}
fs.writeFileSync(path.join(target, 'index.html'), html)
fs.cpSync(path.join(unilink, 'unilink-assets'), path.join(target, 'unilink-assets'), { recursive: true })
fs.mkdirSync(path.join(target, 'projects/unilink'), { recursive: true })
fs.writeFileSync(path.join(target, 'projects/unilink/index.html'), uniLinkHtml)

// The portfolio is built from src/main.tsx. Staging only integrates the separate
// UniLink document and deployment routes; it never rewrites compiled React code.
function files(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(item => item.isDirectory()
    ? files(path.join(directory, item.name), `${prefix}${item.name}/`)
    : [`${prefix}${item.name}`])
}
const portfolioEntry = html.match(/<script[^>]+type="module"[^>]+src="\/([^"]+\.js)"/)?.[1]
if (!portfolioEntry) throw new Error('Missing source-built portfolio entry.')
const manifest = {
  buildMode: 'react-source',
  portfolioEntry,
  sourceEntries: ['src/main.tsx', 'src/unilink-entry.tsx'],
  files: files(target).map(file => ({ path: file, sha256: hash(fs.readFileSync(path.join(target, file))) })),
}
fs.writeFileSync(path.join(repo, 'docs/production-restoration-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
const output = path.join(repo, '.vercel/output')
fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(output, { recursive: true })
fs.cpSync(target, path.join(output, 'static'), { recursive: true })
fs.writeFileSync(path.join(output, 'config.json'), JSON.stringify({ version: 3, routes: [
  { src: '^/work/?$', status: 308, headers: { Location: '/#featured' } },
  { src: '^/projects/landing-app/?$', status: 308, headers: { Location: '/projects/unilink' } },
  { src: '^/projects/unilink/?$', dest: '/projects/unilink/index.html' },
  { handle: 'filesystem' },
  { src: '/.*', dest: '/index.html' },
] }, null, 2) + '\n')
console.log('Staged source-built portfolio and UniLink: dist-production/ and .vercel/output/.')
