import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS } from './helpers/build.mjs'

const source = read('src/components/FurnitureCaseStudy.tsx')
const css = read('src/styles.css')
const steps = ['home', 'category', 'product', 'cart', 'checkout', 'confirmation']
const assets = steps.map(step => `images/furniture/journey/${step}-provided-20261018.webp`)

test('six furniture journey cards use matching user-supplied captures instead of step numbers', () => {
  for (const step of steps) assert.ok(source.includes(`image: '${step}'`))
  const cards = source.split('<div className="journey-track">')[1].split('</article>)}</div>')[0]
  assert.ok(cards.includes('journeySteps.map'))
  assert.ok(cards.includes('journey-step-media'))
  assert.ok(cards.includes('alt={alt}'))
  assert.ok(cards.includes('loading="lazy" decoding="async"'))
  assert.ok(cards.includes('${image}-provided-20261018.webp'))
  assert.ok(!cards.includes('<span>0'))
  for (const text of ['What does this brand offer?', 'Where can I begin?', 'Is this right for my home?', 'What have I selected?', 'How do I complete the order?', 'Was the purchase successful?']) assert.ok(source.includes(text))
})

test('screenshots occupy the old blank area without changing card dimensions or title spacing', () => {
  assert.ok(css.includes('.journey-step-media { height: 24px; }'))
  assert.ok(css.includes('height: 88px; object-fit: contain;'))
  assert.ok(css.includes('.journey-step-media img { top: 6px; height: 44px; }'))
  assert.match(css, /\.journey-track article \{[^}]*min-height: 210px; padding: 22px;/)
  assert.match(css, /\.journey-track h3 \{ margin: 62px 0 14px;/)
})

test('all six compressed WebP captures ship unchanged in the production build', () => {
  let total = 0
  for (const asset of assets) {
    const original = fs.readFileSync(new URL(`../public/${asset}`, import.meta.url))
    const deployed = fs.readFileSync(new URL(`../dist-production/${asset}`, import.meta.url))
    assert.equal(original.toString('ascii', 0, 4), 'RIFF')
    assert.equal(original.toString('ascii', 8, 12), 'WEBP')
    assert.deepEqual(deployed, original)
    total += original.length
  }
  assert.ok(total < 220_000, `six thumbnails should stay lightweight: ${total} bytes`)
  assert.ok(builtJS().includes('/images/furniture/journey/'))
})
