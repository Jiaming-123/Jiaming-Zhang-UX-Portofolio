import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('mobile menu uses a clipped homepage-style circle below interactive content', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
  const menu = css.match(/\.mobile-menu \{([^}]+)\}/)?.[1]
  const sphere = css.match(/\.mobile-menu::before \{([^}]+)\}/)?.[1]
  assert.match(menu, /isolation: isolate/)
  assert.match(menu, /overflow: clip/)
  assert.match(menu, /background: #050b18/)
  assert.match(sphere, /width: 125vw; height: 125vw/)
  assert.match(sphere, /border-radius: 50%/)
  assert.match(sphere, /z-index: -1/)
  assert.match(sphere, /pointer-events: none/)
  assert.match(sphere, /rgba\(255, 255, 255, \.3\) 0%, rgba\(0, 102, 255, \.13\) 38%, rgba\(0, 102, 255, 0\) 72%/)
})
