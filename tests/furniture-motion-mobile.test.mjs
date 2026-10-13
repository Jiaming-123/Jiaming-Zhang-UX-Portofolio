import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
test('furniture interaction examples retain one compact two-card row on narrow screens',()=>{
 const css=readFileSync(new URL('../src/styles/furniture-hero.css',import.meta.url),'utf8')
 assert.match(css,/\.furniture-motion \.motion-grid \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/)
 assert.ok(css.includes('height: clamp(150px, 42vw, 280px)'))
 assert.ok(css.includes('font-size: clamp(16px, 4.2vw, 24px)'))
 assert.ok(!css.includes('line-clamp'))
})
