import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('rotating spheres are the default hero without the legacy grid or particles', () => {
  const hero = read('src/components/Hero.tsx')
  assert.ok(hero.includes('hero hero--rotating-spheres'))
  assert.ok(!hero.includes('CursorGrid'))
  assert.ok(!hero.includes('spherePreview'))
  assert.ok(!hero.includes('particles'))
  assert.ok(hero.includes('useReducedMotion'))
})

test('sphere gradients use the supplied stops, opposite rotations and reduced motion', () => {
  const css = read('src/styles/hero-spheres.css')
  for(const value of ['rgba(255,255,255,.3) 0%', 'rgba(0,102,255,.13) 38%', 'rgba(0,102,255,0) 72%', 'rotate(540deg)', 'rotate(-360deg)', 'prefers-reduced-motion', 'animation-play-state: paused']) assert.ok(css.includes(value))
})

test('sphere top navbar has no gradient seam while compact navigation remains unchanged', () => {
  const css = read('src/styles/hero-spheres.css')
  assert.match(css, /body:has\(\.hero--rotating-spheres\) \.nav-shell:not\(\.is-compact\) \{[^}]*background: transparent;[^}]*border-bottom-color: transparent;/)
  assert.ok(read('src/styles.css').includes('.nav-shell.is-compact { height: 64px; background: rgba(5, 11, 24, .97)'))
})

test('hero implementation document contains the current complete component and sphere stylesheet', () => {
  const doc = read('docs/hero-spheres-implementation.md')
  assert.ok(doc.includes(read('src/components/Hero.tsx').trim()))
  assert.ok(doc.includes(read('src/styles/hero-spheres.css').trim()))
})
