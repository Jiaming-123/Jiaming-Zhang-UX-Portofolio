import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import ts from 'typescript'
import { read } from './helpers/build.mjs'

const source = read('src/lib/mascotFlight.ts')
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const flight = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))

test('one persistent mascot is attached to both application entry points, outside route transitions', () => {
  for (const file of ['src/App.tsx', 'src/unilink-entry.tsx']) {
    const entry = read(file)
    assert.equal(entry.match(/<FlyingMascot\s*\/>/g)?.length, 1)
    assert.ok(entry.indexOf('<FlyingMascot />') < entry.indexOf('<div id="main-content">'))
  }
  assert.ok(read('src/components/FlyingMascot.tsx').includes('createPortal('))
})

test('each flight explores the screen for five seconds, with a separate gentle return and four turn styles', () => {
  assert.equal(flight.MASCOT_CONFIG.flightMs, 5000)
  assert.equal(flight.MASCOT_CONFIG.returnMs, 650)
  assert.equal(flight.FLIGHT_STYLES.length, 4)
  for (const style of flight.FLIGHT_STYLES) {
    const turns = flight.mascotOrientation(style, 1)
    assert.equal(turns[0].transform, 'rotate(0deg) rotateY(0deg)')
    assert.equal(turns.at(-1).offset, 1)
    assert.ok(turns.some(frame => frame.transform !== turns[0].transform))
  }
})

test('random flight curves stay in the rotation-safe viewport at phone, tablet and desktop sizes', () => {
  for (const [width, height] of [[320, 568], [390, 844], [760, 600], [820, 1180], [1440, 900]]) {
    const viewport = { width, height }
    const size = width <= 760 ? { width: 72, height: 108 } : { width: 100, height: 150 }
    const home = flight.mascotHome(viewport, size)
    const bounds = flight.mascotFlightBounds(viewport, size)
    for (let run = 0; run < 40; run++) {
      const points = flight.createMascotFlight(home, viewport, size)
      assert.deepEqual(points[0], { ...home, offset: 0 })
      assert.equal(points.at(-1).offset, 1)
      points.forEach((point, index) => {
        assert.ok(point.x >= 0 && point.x + size.width <= width)
        assert.ok(point.y >= 0 && point.y + size.height <= height)
        if (index > 12) {
          assert.ok(point.x >= bounds.minX && point.x <= bounds.maxX)
          assert.ok(point.y >= bounds.minY && point.y <= bounds.maxY)
        }
        if (index) assert.ok(point.offset > points[index - 1].offset)
      })
      assert.ok(Math.min(...points.map(p => p.x)) < width / 3)
      assert.ok(Math.max(...points.map(p => p.y)) > height / 2)
    }
  }
})

test('home avoids the chapter navigation and stays anchored to the top right', () => {
  assert.deepEqual(flight.mascotHome({ width: 390, height: 844 }, { width: 72, height: 108 }), { x: 306, y: 80 })
  assert.equal(flight.mascotHome({ width: 390, height: 844 }, { width: 72, height: 108 }, 110).y, 122)
  assert.deepEqual(flight.mascotHome({ width: 1440, height: 900 }, { width: 100, height: 150 }), { x: 1312, y: 88 })
})

test('three genuine expression/pose images are lightweight transparent WebP assets, not placeholder glyphs', () => {
  for (const pose of ['wink', 'hug', 'surprise']) {
    const file = new URL(`../public/images/mascot/jiaming-${pose}-v1.webp`, import.meta.url)
    const buffer = readFileSync(file)
    assert.equal(buffer.toString('ascii', 0, 4), 'RIFF')
    assert.equal(buffer.toString('ascii', 8, 12), 'WEBP')
    assert.ok(statSync(file).size < 80000)
    assert.ok(read('src/components/FlyingMascot.tsx').includes(`name: '${pose}'`))
  }
})

test('rotor never depends on the flight phase; hover bobs in place and reduced-motion stops animation', () => {
  const css = read('src/styles/flying-mascot.css')
  assert.ok(css.includes('animation: mascot-rotor .28s linear infinite'))
  assert.ok(css.includes('animation: mascot-hover 2.8s ease-in-out infinite'))
  assert.ok(css.includes('translateY(-10px)'))
  assert.ok(css.includes('rotateY(360deg)'))
  assert.ok(css.includes('prefers-reduced-motion: reduce'))
  assert.ok(css.includes('animation-play-state: paused'))
  const component = read('src/components/FlyingMascot.tsx')
  for (const value of ['visibilitychange', 'window.clearInterval(timer)', 'animation.cancel()', 'observer.disconnect()', 'pointerType', 'onClick', 'aria-label', "phaseRef.current !== 'idle'"]) assert.ok(component.includes(value), value)
})
