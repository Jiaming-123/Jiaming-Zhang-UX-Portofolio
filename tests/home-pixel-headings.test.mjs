import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const asset = file => fs.readFileSync(new URL('../' + file, import.meta.url))

test('home pixel headings use one small self-hosted WOFF2 with text-safe loading', () => {
  const css = read('src/styles/home-pixel-headings.css')
  const font = asset('public/fonts/pixelify-sans-bold-latin-v1.woff2')
  assert.equal(font.toString('ascii', 0, 4), 'wOF2')
  assert.ok(font.length < 12000)
  assert.ok(css.includes("font-family: 'Pixelify Sans'"))
  assert.ok(css.includes('font-display: swap'))
  assert.ok(css.includes('font-synthesis: none'))
  assert.ok(!css.includes('https://'))
  assert.ok(read('index.html').includes('as="font" type="font/woff2" crossorigin'))
  assert.ok(read('src/main.tsx').includes("import './styles/home-pixel-headings.css'"))
  assert.ok(read('public/fonts/pixelify-sans-OFL.txt').includes('SIL OPEN FONT LICENSE Version 1.1'))
})

test('all eight home display headings retain real text, case, links and the original outline roles', () => {
  const css = read('src/styles/home-pixel-headings.css')
  for (const selector of ['.hero.hero--rotating-spheres h1', '.home-landing-project .home-landing-title-row h1', '.selected-work .section-intro h2', '.home-project-grid .project-meta h3', '.site-footer[data-pixel-headings] h2']) assert.ok(css.includes(selector), selector)
  const home = read('src/pages/HomePage.tsx')
  assert.ok(home.includes('<h1>UniLink</h1>'))
  assert.ok(home.includes('DESIGN ACROSS<br />SCREENS,<br />SYSTEMS<br /><span>&amp; SERVICES.</span>'))
  assert.ok(home.includes('[projects[1], projects[3], projects[2], projects[4]]'))
  const data = read('src/data/projects.ts')
  for (const title of ['BoardGameMate', 'My Furniture Store', 'CultureLens Concierge', 'Crownlands']) assert.ok(data.includes("title: '" + title + "'"))
  assert.ok(read('src/components/Content.tsx').includes('{project.title}</Link></h3>'))
  assert.ok(read('src/components/Hero.tsx').includes('>JIAMING</motion.span>'))
  assert.ok(read('src/components/Hero.tsx').includes('>ZHANG</motion.span>'))
  assert.ok(css.includes('-webkit-text-stroke: 1px'))
  assert.ok(css.includes('@media (max-width: 767px)'))
})

test('pixel typography remains home-only without changing body copy, case studies or About footer', () => {
  const css = read('src/styles/home-pixel-headings.css')
  assert.ok(!css.includes('.case-study'))
  assert.ok(!css.includes('body {'))
  assert.ok(!css.includes('.contact-page'))
  assert.ok(!css.includes('.hero-foot'))
  assert.ok(read('src/components/Layout.tsx').includes("data-pixel-headings={pathname === '/' ? '' : undefined}"))
  assert.ok(read('src/components/Layout.tsx').includes("if (pathname.startsWith('/projects/')) return null"))
})

test('production includes the exact font, license and compiled heading styles', () => {
  for (const dir of ['dist-production', '.vercel/output/static']) {
    for (const file of ['pixelify-sans-bold-latin-v1.woff2', 'pixelify-sans-OFL.txt']) assert.deepEqual(asset(dir + '/fonts/' + file), asset('public/fonts/' + file))
  }
  assert.ok(read('dist-production/index.html').includes('/fonts/pixelify-sans-bold-latin-v1.woff2'))
})
