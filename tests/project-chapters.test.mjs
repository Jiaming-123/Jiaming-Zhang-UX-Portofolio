import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { chapterProjects, activeChapterIndex, chapterRailScrollLeft } from '../public/project-chapters.mjs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('all five projects share chapter navigation without individual project marks', () => {
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
  assert.ok(module.includes("mark.setAttribute('aria-label', copy.homeLabel || 'Jiaming Zhang, home')"))
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
  assert.equal(activeChapterIndex([-6000, -3000, 400], 128, true), 2)
  assert.equal(activeChapterIndex([-6000, -3000, 400], 128, false), 1)
})

test('mobile rails center the active chapter using viewport-relative bounds', () => {
  assert.equal(chapterRailScrollLeft(0, 300, 900, 400, 100), 300)
  assert.equal(chapterRailScrollLeft(300, 300, 900, 100, 100), 300)
  assert.equal(chapterRailScrollLeft(300, 300, 900, -300, 100), 0)
  assert.equal(chapterRailScrollLeft(0, 300, 900, 800, 100), 600)
  assert.equal(chapterRailScrollLeft(0, 900, 900, 400, 100), 0)
  const module = read('public/project-chapters.mjs')
  assert.ok(module.includes('linkBox.left - listBox.left'))
  assert.ok(!module.includes('link.offsetLeft'))
  assert.ok(module.includes('changed || becameVisible || railWidth !== list.clientWidth'))
  assert.ok(!module.includes('scrollIntoView('))
  assert.ok(module.includes("document.body.style.removeProperty('--case-chapter-height')"))
})

test('desktop chapter rail fills the available navbar width without a wide-screen cap', () => {
  const css = read('public/project-chapters.css')
  const rail = css.match(/\.case-chapter-rail \{([^}]+)\}/)[1]
  assert.ok(rail.includes('flex:1'))
  assert.ok(rail.includes('min-width:0'))
  assert.ok(rail.includes('max-width:none'))
  assert.ok(!rail.includes('1280px'))
  assert.ok(css.includes('justify-content:space-between'))
  assert.ok(css.includes('overflow-x:auto'))
})

test('chapter bars keep the walker near the top edge and omit mobile current-chapter text', () => {
  const css = read('public/project-chapters.css')
  assert.ok(css.includes('padding:4px var(--side,4.4vw) 10px'))
  assert.ok(css.includes('.case-chapter-current { display:none; }'))
  const mobile = css.slice(css.indexOf('@media(max-width:760px)'), css.indexOf('@media(prefers-reduced-motion:reduce)'))
  assert.ok(mobile.includes('display:flex; align-items:flex-start; gap:12px; padding:4px 18px 8px'))
  assert.ok(!mobile.includes('.case-chapter-current { display:block'))
  assert.ok(!mobile.includes('margin-bottom:12px'))
  assert.ok(mobile.includes('--chapter-walk-lane:39px'))
  assert.ok(mobile.includes('height:39px'))
})

test('Crownlands primary navigation retains the shared navy and cyan palette without availability status', () => {
  const css = read('public/project-navbar.css')
  assert.match(css, /body\.crownlands-theme \.nav-shell \{[^}]*color: #fff;[^}]*background: #050b18;/)
  assert.ok(css.includes('.nav-shell .monogram span { color: #00d4ff; }'))
  assert.ok(!css.includes('.nav-status'))
  assert.ok(css.includes('.nav-shell .desktop-nav a:is(:hover, .active) { color: #fff; }'))
  assert.ok(!css.includes('display:'))
  assert.ok(read('public/project-chapters.css').includes('#b2955b'))
})

test('project palettes, mobile names and focus states are retained alongside the walking avatar', () => {
  const css = read('public/project-chapters.css')
  for (const slug of ['boardgamemate', 'furniture', 'culturelens', 'crownlands']) assert.ok(css.includes(`[data-project="${slug}"]`))
  assert.ok(css.includes('#fff8f0'))
  assert.ok(css.includes('#f7f5f1'))
  assert.ok(css.includes('#b2955b'))
  assert.ok(css.includes('overflow-x:auto'))
  assert.ok(css.includes(':focus-visible'))
  assert.ok(css.includes('.case-chapter-walker[data-facing="left"]'))
  assert.ok(!css.includes('.case-chapter-reading-progress'))
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

test('source build includes the shared runtime and cache-safe bundle', () => {
  const root = new URL('../',import.meta.url)
  const manifest = JSON.parse(fs.readFileSync(new URL('docs/production-restoration-manifest.json',root),'utf8'))
  const entry = fs.readFileSync(new URL('dist-production/' + manifest.portfolioEntry,root),'utf8')
  assert.equal(manifest.buildMode,'react-source')
  assert.ok(entry.includes("case-chapter-mark monogram"))
})
