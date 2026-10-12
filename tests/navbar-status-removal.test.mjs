import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('shared navbar removes the availability status without changing Contact content', () => {
  const layout = read('src/components/Layout.tsx')
  assert.ok(!layout.includes('AVAILABLE FOR OPPORTUNITIES'))
  assert.ok(!layout.includes('nav-status'))
  for (const retained of ['aria-label="Main menu"', 'aria-label="Open menu"', 'aria-label="Mobile menu"', 'className="monogram"']) assert.ok(layout.includes(retained))
  assert.ok(read('src/pages/InfoPages.tsx').includes('AVAILABLE FOR OPPORTUNITIES'))
  for (const path of ['src/styles.css', 'src/crownlands.css', 'public/project-navbar.css']) assert.ok(!read(path).includes('.nav-status'))
})
