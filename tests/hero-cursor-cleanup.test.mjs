import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('home hero removes the role kicker while retaining right-aligned location', () => {
  assert.ok(!read('src/components/Hero.tsx').includes('UX / PRODUCT DESIGNER'))
  assert.ok(read('src/components/Hero.tsx').includes('SHENZHEN, CN<br />MELBOURNE, AU'))
  assert.match(read('src/styles.css'), /\.hero-kicker \{[^}]*justify-content: flex-end/)
})

test('Crownlands cursor inherits the shared blue appearance', () => {
  assert.ok(!read('src/crownlands.css').includes('.custom-cursor'))
  assert.match(read('src/styles.css'), /\.custom-cursor \{[^}]*background: rgba\(0, 212, 255, .18\); border: 1px solid rgba\(0, 212, 255, .9\)/)
})
