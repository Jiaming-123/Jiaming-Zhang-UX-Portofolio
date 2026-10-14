import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const source = read('src/components/BoardGameMateIteration.tsx')
const css = read('src/styles/boardgamemate-hero.css')
const hero = source.slice(source.indexOf('<IterationReveal className="boardgamemate-overview-hero">'), source.indexOf('<IterationReveal className="boardgamemate-discover-section">'))

test('BoardGameMate overview uses the supplied uncropped illustration above its compact four-line heading', () => {
  assert.ok(source.includes("import '../styles/boardgamemate-hero.css'"))
  assert.ok(hero.includes('/images/boardgamemate/hero-overview-20261014.png'))
  assert.ok(hero.indexOf('<figure') < hero.indexOf('<h1'))
  assert.ok(!hero.includes('BOARDGAMEMATE / PROJECT OVERVIEW'))
  assert.ok(!hero.includes('<SectionLabel'))
  assert.match(css, /\.boardgamemate-overview-hero \.boardgamemate-meta\s*\{[^}]*padding-top: 0;/)
  assert.ok(hero.includes('width={716} height={400} fetchPriority="high"'))
  for (const line of ['BoardGameMate is a', 'tabletop companion', 'designed to make', 'playing together easier.']) assert.ok(hero.includes(`<span>${line}</span>`))
  assert.ok(css.includes('aspect-ratio: 716 / 400'))
  assert.ok(css.includes('object-fit: contain'))
  assert.ok(css.includes('letter-spacing: -.025em'))
})

test('mobile keeps the desktop two columns with scaling type, all project metadata, and the reference paragraph order', () => {
  assert.ok(css.includes('grid-template-columns: minmax(0, 1.46fr) minmax(0, 1fr)'))
  assert.ok(!css.slice(css.indexOf('@media')).includes('grid-template-columns: 1fr'))
  assert.ok(css.includes('container-type: inline-size'))
  assert.ok(css.includes('2.75cqw'))
  assert.ok(css.includes('min-width: 0'))
  assert.ok(hero.indexOf('BoardGameMate focuses') < hero.indexOf('It helps players'))
  for (const field of ['PROJECT', 'DISCIPLINES', 'YEAR', 'TEAM', 'MY CONTRIBUTION', 'RESEARCH METHODS']) assert.ok(hero.includes(`<dt>${field}</dt>`))
  for (const method of ['User interviews', 'Focus groups', 'Cognitive walkthrough', 'Heuristic evaluation']) assert.ok(hero.includes(method))
})

test('production ships the new overview illustration unchanged without replacing the homepage cover', () => {
  const file = 'images/boardgamemate/hero-overview-20261014.png'
  assert.deepEqual(fs.readFileSync(new URL('../dist-production/' + file, import.meta.url)), fs.readFileSync(new URL('../public/' + file, import.meta.url)))
  const covers = JSON.parse(read('src/data/homepage-covers.json'))
  assert.equal(covers.boardgamemate.src, '/images/homepage-covers/boardgamemate-20261010-v2.webp')
})
