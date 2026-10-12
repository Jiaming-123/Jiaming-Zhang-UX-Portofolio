import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = path => fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8')

test('Crownlands mobile Outcome overrides the shared two-column grid only for its learning cards', () => {
  const css = read('public/project-mobile-grids-20260918.css')
  assert.ok(css.includes('@media (max-width: 760px)'))
  assert.match(css, /\.crownlands-page \.cl-learnings\s*\{\s*grid-template-columns: minmax\(0,1fr\) !important;/)
  assert.match(css, /\.crownlands-page \.cl-learnings > h3\s*\{[^}]*font-size: clamp\(14px,4\.5vw,26px\);[^}]*white-space: nowrap;/)
  assert.ok(css.indexOf('.crownlands-page .cl-learnings {') > css.indexOf('grid-template-columns: repeat(2,minmax(0,1fr)) !important'))
  const page = read('src/pages/CrownlandsPage.tsx')
  for(const text of ['What I Learned About Designing Play','MECHANICS SHAPE EXPERIENCE','CLARITY CREATES STRATEGIC DEPTH','GOOD UNCERTAINTY PRESERVES AGENCY']) assert.ok(page.includes(text))
  assert.ok(read('src/crownlands.css').includes('.cl-learnings{display:grid;grid-template-columns:repeat(3,1fr)'))
})
