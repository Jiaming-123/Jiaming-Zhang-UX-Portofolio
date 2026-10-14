import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { chapterProjects, chapterMobileRailMotion } from '../public/project-chapters.mjs'

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8')

test('mobile camera and avatar advance monotonically across every chapter boundary in all five cases', () => {
  for (const [slug, project] of Object.entries(chapterProjects)) for (const viewport of [244, 314, 684]) {
    let edge = 0
    const centers = project.chapters.map(([label]) => {
      const width = Math.max(66, label.length * 6.2)
      const center = edge + width / 2
      edge += width + 14
      return center
    })
    const contentWidth = edge - 14
    let previous = { scrollLeft: -1, walkerLeft: -1 }
    for (let i = 0; i <= 2000; i++) {
      const motion = chapterMobileRailMotion(i / 2000, centers, viewport, contentWidth, 26)
      assert.ok(motion.scrollLeft >= previous.scrollLeft - 1e-8, slug + ' camera must not recenter backward')
      assert.ok(motion.walkerLeft >= previous.walkerLeft - 1e-8, slug + ' walker must not jump backward')
      assert.ok(motion.walkerLeft >= 0 && motion.walkerLeft + 26 <= viewport)
      assert.ok(motion.scrollLeft <= Math.max(0, contentWidth - viewport))
      previous = motion
    }
    for (let chapter = 1; chapter < centers.length - 1; chapter++) {
      const p = chapter / (centers.length - 1)
      const before = chapterMobileRailMotion(p - 1e-6, centers, viewport, contentWidth, 26)
      const after = chapterMobileRailMotion(p + 1e-6, centers, viewport, contentWidth, 26)
      assert.ok(after.scrollLeft - before.scrollLeft < .01)
      assert.ok(after.walkerLeft - before.walkerLeft < .01)
    }
  }
})

test('reverse reading reverses continuously, short rails do not scroll, and degenerate inputs are safe', () => {
  const centers = [33, 113, 215, 295, 375, 460]
  let previous = { scrollLeft: Infinity, walkerLeft: Infinity }
  for (let i = 1000; i >= 0; i--) {
    const motion = chapterMobileRailMotion(i / 1000, centers, 314, 493, 26)
    assert.ok(motion.scrollLeft <= previous.scrollLeft + 1e-8)
    assert.ok(motion.walkerLeft <= previous.walkerLeft + 1e-8)
    previous = motion
  }
  assert.deepEqual(chapterMobileRailMotion(.5, [], 314, 493, 26), { scrollLeft: 0, walkerLeft: 0 })
  assert.equal(chapterMobileRailMotion(.5, [33], 314, 66, 26).scrollLeft, 0)
  assert.equal(chapterMobileRailMotion(.5, centers, 600, 493, 26).scrollLeft, 0)
  assert.equal(chapterMobileRailMotion(-1, centers, 314, 493, 26).scrollLeft, 0)
  assert.equal(chapterMobileRailMotion(2, centers, 314, 493, 26).scrollLeft, 179)
})

test('only mobile switches to one reading-driven camera; idle wave, manual swipes and desktop behavior stay intact', () => {
  const module = read('public/project-chapters.mjs')
  const css = read('public/project-chapters.css')
  assert.ok(module.includes("matchMedia('(max-width:760px)')"))
  assert.ok(module.includes('if (!mobile.matches && (changed || becameVisible || railWidth !== list.clientWidth))'))
  assert.ok(module.includes('chapterMobileRailMotion(progress, contentCenters'))
  assert.ok(module.includes('if (delta !== 0 || changed || becameVisible || railResized)'))
  assert.ok(module.includes('const manuallyPanned'))
  assert.ok(module.includes('setTimeout(stopWalking, 280)'))
  assert.ok(module.includes('label.dataset.label'))
  assert.ok(css.includes('width:26px; height:39px; transition:none'))
  assert.ok(css.includes('content:attr(data-label)'))
  assert.ok(css.includes('visibility:hidden; font-weight:600'))
})
