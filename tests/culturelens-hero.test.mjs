import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('CultureLens hero follows the simplified green composition', () => {
  const source = read('src/pages/CultureLensCaseStudy.tsx')
  const hero = source.slice(source.indexOf('<header className="culturelens-hero">'), source.indexOf('<nav className="culturelens-chapter-nav"'))
  for (const removed of ['culturelens-hero-top', 'culturelens-edition', 'culturelens-hero-grid', 'EXHIBITION 03', 'Explore the prototype evidence', 'THE MUSEUM IS THE CONTEXT.', '6 CHAPTERS']) {
    assert.ok(!hero.includes(removed), removed)
  }
  assert.ok(hero.includes('Culture<span>Lens</span>'))
  assert.ok(hero.includes('Shared<br />meaning.'))
  assert.ok(hero.includes('culturelens-interface-result'))
  for (const label of ['Context', 'Disciplines', 'Evidence', 'Scope']) assert.ok(hero.includes(`<strong>${label}</strong>`))
  const css = read('src/styles/culturelens.css')
  assert.match(css, /background:#19675b/)
  assert.match(css, /\.culturelens-exhibit-label strong\{[^}]*color:#f8f8f0/)
})
