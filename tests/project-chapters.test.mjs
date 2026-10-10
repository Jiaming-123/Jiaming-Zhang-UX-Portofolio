import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { chapterProjects, activeChapterIndex } from '../public/project-chapters.mjs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('all five projects share numbered chapters without individual project marks', () => {
  assert.deepEqual(Object.keys(chapterProjects), ['unilink', 'boardgamemate', 'furniture', 'culturelens', 'crownlands'])
  for (const project of Object.values(chapterProjects)) {
    assert.ok(!('mark' in project))
    assert.ok(project.chapters.length >= 6)
    assert.equal(new Set(project.chapters.map(c => c[1])).size, project.chapters.length)
    assert.ok(project.hero)
  }
})

test('every chapter bar uses the homepage JZ monogram and cyan dot at the same size', () => {
  const module = read('public/project-chapters.mjs')
  const css = read('public/project-chapters.css')
  assert.ok(module.includes("mark.className = 'case-chapter-mark monogram'"))
  assert.ok(module.includes("mark.href = '/'"))
  assert.ok(module.includes("mark.setAttribute('aria-label', 'Jiaming Zhang, home')"))
  assert.ok(module.includes("mark.textContent = 'JZ'"))
  assert.ok(module.includes("dot.textContent = '.'"))
  assert.ok(module.includes('mark.append(dot)'))
  assert.ok(!module.includes('project.mark'))
  assert.ok(css.includes("font:600 1.25rem/1 'Space Grotesk'"))
  assert.ok(css.includes('.case-chapter-mark span { color:#00d4ff; }'))
  assert.ok(!css.includes('.case-chapter-mark { font-size:16px; }'))
})

test('Furniture primary navigation stays navy without changing its warm chapter palette', () => {
  const css = read('public/furniture-warm-palette.css')
  const primary = css.match(/body:has\(\.furniture-case\) \.nav-shell \{([^}]+)\}/)[1]
  assert.ok(primary.includes('background: #050b18'))
  assert.ok(primary.includes('color: #fff'))
  assert.ok(primary.includes('--cyan: #00d4ff'))
  assert.ok(css.includes('.nav-shell.is-compact { background: rgba(5, 11, 24, .97)'))
  assert.ok(read('public/project-chapters.css').includes('--chapter-bg:#fff8f0'))
  assert.ok(read('src/components/Layout.tsx').includes('setCompact(window.scrollY > 36)'))
  assert.ok(read('public/project-navbar.mjs').includes('<= 160'))
})

test('scroll spy and anchor landing use the same responsive reading line', () => {
  assert.equal(activeChapterIndex([-500, 106, 1800], 106), 1)
  assert.equal(activeChapterIndex([-500, 109, 1800], 106), 0)
  assert.equal(activeChapterIndex([-6000, -3000, 154], 154), 2)
  assert.equal(activeChapterIndex([200, 1800], 106), 0)
})

test('Crownlands primary navigation matches the shared navy, cyan and green palette', () => {
  const css = read('public/project-navbar.css')
  assert.match(css, /body\.crownlands-theme \.nav-shell \{[^}]*color: #fff;[^}]*background: #050b18;/)
  assert.ok(css.includes('.nav-shell .monogram span { color: #00d4ff; }'))
  assert.match(css, /body\.crownlands-theme \.nav-shell \.nav-status i \{[^}]*background: #5df2af;/)
  assert.ok(css.includes('.nav-shell .desktop-nav a:is(:hover, .active) { color: #fff; }'))
  assert.ok(!css.includes('display:'))
  assert.ok(read('public/project-chapters.css').includes('#b2955b'))
})

test('project palettes, mobile names and focus states are retained without a progress bar', () => {
  const css = read('public/project-chapters.css')
  for (const slug of ['boardgamemate', 'furniture', 'culturelens', 'crownlands']) assert.ok(css.includes(`[data-project="${slug}"]`))
  assert.ok(css.includes('#fff8f0'))
  assert.ok(css.includes('#f7f5f1'))
  assert.ok(css.includes('#b2955b'))
  assert.ok(css.includes('overflow-x:auto'))
  assert.ok(css.includes(':focus-visible'))
  assert.ok(!css.includes('scaleX'))
  assert.ok(!css.includes('.case-chapter-name { display:none'))
})

test('navigation cleans up on route exit and keeps Lenis in sync with clicks', () => {
  const module = read('public/project-chapters.mjs')
  assert.ok(module.includes("new CustomEvent('portfolio:chapter-scroll'"))
  assert.ok(module.includes('nav?.remove()'))
  assert.ok(module.includes('mounted.disconnect(); resize.disconnect()'))
  assert.ok(module.includes("window.removeEventListener('scroll', schedule)"))
  assert.ok(module.includes("document.removeEventListener('transitionend', schedule)"))
  assert.ok(read('src/components/Layout.tsx').includes("window.removeEventListener('portfolio:chapter-scroll', chapterScroll)"))
})

test('the production output uses cache-safe chapter modules and styling', () => {
  const html = read('dist-production/index.html')
  assert.match(html, /project-chapters-[a-f0-9]+\.css/)
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  const entry = read(`dist-production/${manifest.portfolioEntry}`)
  assert.ok(entry.includes('portfolio:chapter-scroll'))
  const dir = new URL('../dist-production/assets/', import.meta.url)
  const navbar = fs.readdirSync(dir).find(f => /^project-navbar-[a-f0-9]+\.mjs$/.test(f))
  assert.match(fs.readFileSync(new URL(navbar, dir), 'utf8'), /\.\/project-chapters-[a-f0-9]+\.mjs/)
})
