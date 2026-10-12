import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const css = fs.readFileSync(new URL('../src/crownlands.css', import.meta.url), 'utf8')

test('Crownlands fullscreen cards scale with the sidebar instead of a fixed 220px column', () => {
  assert.ok(css.includes('grid-template-columns:clamp(260px,28vw,720px) minmax(0,1fr)'))
  assert.ok(!css.includes('grid-template-columns:220px minmax(0,1fr)'))
  assert.ok(css.includes('.cl-game-full .cl-image-hand .cl-action-card-art{height:100%}'))
  assert.ok(css.includes('max-height:none;object-fit:contain'))
})

test('Crownlands touch layout places the map before a four-card row', () => {
  const mobile = css.slice(css.indexOf('/* Touch layouts keep the map first'))
  assert.ok(mobile.includes('@media(max-width:900px)'))
  assert.ok(mobile.includes('.cl-game-v2 .cl-board-wrap{order:0;'))
  assert.ok(mobile.includes('.cl-hand-sidebar{order:1;'))
  assert.ok(mobile.includes('grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:auto'))
})
