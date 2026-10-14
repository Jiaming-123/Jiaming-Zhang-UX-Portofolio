import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { chapterProjects, chapterReadingProgress, chapterWalkerOffset } from '../public/project-chapters.mjs'

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8')

test('reading progress moves continuously within a chapter instead of jumping only at chapter boundaries', () => {
  assert.equal(chapterReadingProgress([200, 1000, 3000], 100), 0)
  assert.equal(chapterReadingProgress([-500, 500, 2500], 0), .25)
  assert.equal(chapterReadingProgress([-500, 500, 2500], 500), .5)
  assert.equal(chapterReadingProgress([-500, 500, 2500], 1500), .75)
  assert.equal(chapterReadingProgress([-500, 500, 2500], 2600), 1)
  assert.equal(chapterReadingProgress([-500, 500, 2500], 100, true), 1)
  assert.equal(chapterReadingProgress([], 100), 0)
  assert.equal(chapterReadingProgress([0], 100), 0)
  for (const project of Object.values(chapterProjects)) {
    let previous = -1
    const positions = project.chapters.map((_, i) => i * 1000)
    for (let line = -100; line <= positions.at(-1) + 100; line += 17) {
      const progress = chapterReadingProgress(positions, line)
      assert.ok(progress >= 0 && progress <= 1)
      assert.ok(progress >= previous)
      previous = progress
    }
  }
})

test('walking avatar interpolates chapter markers and stays fully within an overflowing mobile rail', () => {
  assert.equal(chapterWalkerOffset(0, [30, 130, 230], 300, 32), 14)
  assert.equal(chapterWalkerOffset(.25, [30, 130, 230], 300, 32), 64)
  assert.equal(chapterWalkerOffset(.5, [30, 130, 230], 300, 32), 114)
  assert.equal(chapterWalkerOffset(1, [30, 130, 230], 300, 32), 214)
  assert.equal(chapterWalkerOffset(0, [-30, 90, 200], 180, 32), 0)
  assert.equal(chapterWalkerOffset(1, [-30, 90, 200], 180, 32), 148)
  assert.equal(chapterWalkerOffset(.5, [], 180, 32), 0)
  for (const width of [284, 354, 724, 900, 1280]) {
    for (let p = 0; p <= 1; p += .01) {
      const x = chapterWalkerOffset(p, [-120, -30, 60, 150, 240, 330, 420], width, 26)
      assert.ok(x >= 0 && x + 26 <= width)
    }
  }
})

test('all chapter markers remove digits and the upper half, while labels and active highlighting remain', () => {
  const module = read('public/project-chapters.mjs')
  const css = read('public/project-chapters.css')
  assert.ok(module.includes("marker.setAttribute('aria-hidden', 'true')"))
  assert.ok(!module.includes('number.textContent'))
  assert.ok(!module.includes('padStart'))
  assert.ok(module.includes('link.append(marker, label)'))
  assert.ok(module.includes("link.setAttribute('aria-current', 'location')"))
  assert.ok(css.includes('width:30px; height:15px'))
  assert.ok(css.includes('border-top:0'))
  assert.ok(css.includes('border-radius:0 0 15px 15px'))
  assert.ok(css.includes('a[aria-current] .case-chapter-dot'))
})

test('avatar uses side-profile walking and front-view waving frames without changing the flying mascot', () => {
  const module = read('public/project-chapters.mjs')
  assert.ok(module.includes("['walk-a', 'walk-b', 'wave-a', 'wave-b']"))
  assert.ok(module.includes("pose.startsWith('wave') ? 2 : 1"))
  assert.ok(module.includes('chapter-${pose}-v${version}.webp'))
  assert.ok(module.includes("walker.setAttribute('aria-hidden', 'true')"))
  assert.ok(!module.includes('mascot-copter'))
  assert.ok(read('src/components/FlyingMascot.tsx').includes('mascot-copter-blades'))
  for (const pose of ['walk-a', 'walk-b', 'wave-a', 'wave-b']) {
    const version = pose.startsWith('wave') ? 2 : 1
    const file = new URL(`../public/images/mascot/chapter-${pose}-v${version}.webp`, import.meta.url)
    const bytes = fs.readFileSync(file)
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
    assert.ok(bytes.length < 45000)
  }
})

test('scroll direction controls facing, idle switches to waving, and reduced motion and cleanup are explicit', () => {
  const module = read('public/project-chapters.mjs')
  const css = read('public/project-chapters.css')
  for (const text of ["walker.dataset.state = 'walking'", "walker.dataset.state = 'idle'", "delta < 0 ? 'left' : 'right'", 'setTimeout(stopWalking, 280)', 'clearTimeout(idleTimer)', "list?.removeEventListener('scroll', schedule)", "document.removeEventListener('visibilitychange', visibility)"]) assert.ok(module.includes(text), text)
  for (const text of ['image-rendering:pixelated', 'pointer-events:none', 'scaleX(-1)', '.36s steps(1,end)', '.8s steps(1,end)', 'animation-play-state:paused', 'prefers-reduced-motion:reduce']) assert.ok(css.includes(text), text)
  assert.ok(css.includes('[data-facing="left"][data-state="walking"] .case-chapter-walker-sprite { transform:scaleX(-1)'))
  assert.ok(css.includes('animation:chapter-turn-front .18s ease-out both'))
  assert.ok(css.includes('rotateY(0)'))
  assert.ok(module.includes("new CustomEvent('portfolio:chapter-scroll'"))
  assert.ok(module.includes('section.focus({ preventScroll: true })'))
})
