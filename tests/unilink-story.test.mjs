import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS } from './helpers/build.mjs'

const component = read('src/components/unilink/UniLinkStory.tsx')
const page = read('src/pages/UniLinkCaseStudy.tsx')
const videoPath = 'media/unilink/unilink-story-20261012.mp4'
const posterPath = 'media/unilink/unilink-story-poster-v2-20261012.webp'

test('UniLink story matches the requested introduction and precedes Problem', () => {
  assert.ok(component.includes('01 / INTRODUCTION'))
  assert.ok(component.includes('The UniLink Story'))
  assert.ok(component.includes('An introduction video to our Background &amp; Motivation, Main Design Concept, Prototype Demonstration and User Based Evaluation evidence.'))
  assert.ok(page.indexOf('<UniLinkStory />') < page.indexOf('className="ul-section ul-problem"'))
})

test('UniLink video mounts only after play, with native controls and offscreen cleanup', () => {
  for (const required of ['useState(false)', 'started && !failed', 'preload="none"', 'controls', 'playsInline', 'IntersectionObserver', 'visibilitychange', 'observer.disconnect()', 'video.pause()', 'loading="lazy"', 'role="status"']) {
    assert.ok(component.includes(required), required)
  }
  assert.ok(!component.includes('onTimeUpdate'))
})

test('UniLink clean cover keeps the existing play overlay and click behaviour', () => {
  assert.ok(component.includes('width={3428} height={1926}'))
  assert.ok(component.includes('className="ul-story-play-icon"'))
  assert.ok(component.includes('setFailed(false); setStarted(true)'))
  const css = read('src/styles/unilink-story.css')
  assert.ok(css.includes('left: 48.35%'))
  assert.ok(css.includes('top: 54.25%'))
  assert.ok(css.includes('pointer-events: none'))
})

test('UniLink video and poster are included unchanged in both release outputs', () => {
  const root = new URL('../', import.meta.url)
  for (const asset of [videoPath, posterPath]) {
    const source = fs.readFileSync(new URL('public/' + asset, root))
    for (const output of ['dist-production', '.vercel/output/static']) {
      assert.deepEqual(fs.readFileSync(new URL(output + '/' + asset, root)), source)
    }
  }
  const size = fs.statSync(new URL('public/' + videoPath, root)).size
  assert.ok(size < 95_000_000, 'video stays under the GitHub single-file limit with headroom')
  const html = read('dist-production/projects/unilink/index.html')
  const bundlePath = html.match(/src="\/(unilink-assets\/[^" ]+\.js)"/)?.[1]
  assert.ok(bundlePath)
  for (const bundle of [builtJS('src/pages/UniLinkCaseStudy.tsx'), read('dist-production/' + bundlePath)]) {
    assert.ok(bundle.includes('/' + videoPath))
    assert.ok(bundle.includes('The UniLink Story'))
  }
})

test('UniLink MP4 metadata is ahead of media data for progressive playback', () => {
  const video = fs.readFileSync(new URL('../public/' + videoPath, import.meta.url))
  const boxes = []
  for (let offset = 0; offset + 8 <= video.length;) {
    const size = video.readUInt32BE(offset)
    boxes.push(video.toString('ascii', offset + 4, offset + 8))
    const length = size === 1 ? Number(video.readBigUInt64BE(offset + 8)) : size || video.length - offset
    assert.ok(length >= 8)
    offset += length
  }
  assert.ok(boxes.includes('moov') && boxes.includes('mdat'))
  assert.ok(boxes.indexOf('moov') < boxes.indexOf('mdat'))
})
