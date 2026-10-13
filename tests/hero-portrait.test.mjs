import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
test('portrait emerges from a clipped text-edge window before its greeting',()=>{
 const hero=readFileSync(new URL('../src/components/Hero.tsx',import.meta.url),'utf8')
 const css=readFileSync(new URL('../src/styles/hero-spheres.css',import.meta.url),'utf8')
 assert.ok(hero.includes("{ y: '100%' }"))
 assert.ok(hero.includes("definition.y === '0%'"))
 assert.ok(hero.includes('reducedMotion || portraitEntered ? 1 : 0'))
 assert.ok(hero.includes('onLoad={() => setPortraitReady(true)}'))
 assert.match(css,/\.hero-portrait-window \{ overflow: hidden;/)
 assert.ok(css.includes('bottom: 100%'))
 assert.ok(css.includes('width: 34vw; order: 0'))
})
