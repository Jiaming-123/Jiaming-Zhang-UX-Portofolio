import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('home UniLink feature removes interactive grid while preserving content and cover link', () => {
  const page = read('src/pages/HomePage.tsx')
  assert.ok(!page.includes('CursorGrid'))
  assert.ok(!read('src/styles.css').includes('.home-cursor-grid'))
  for (const retained of ['<h1>UniLink</h1>', 'GRADUATION PROJECT', 'to="/projects/unilink"', 'unilink-cover-image', 'landing.categories.map', '<BorderGlow']) assert.ok(page.includes(retained))
  assert.ok(read('src/components/Hero.tsx').includes('<CursorGrid'))
})
