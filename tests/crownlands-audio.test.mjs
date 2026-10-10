import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const repo = new URL('../', import.meta.url)
const source = fs.readFileSync(new URL('public/crownlands-audio.js', repo), 'utf8')
const baseline = fs.readFileSync(new URL('production-baseline/crownlands-audio.js', repo), 'utf8')

function harness() {
  const listeners = new Map()
  const windowListeners = new Map()
  const state = { active: false, hidden: false, muted: false }
  let music, observer
  class Audio {
    constructor(src) { this.src = src; this.paused = true; music = this }
    play() { this.paused = false; return Promise.resolve() }
    pause() { this.paused = true }
  }
  class HTMLVideoElement {}
  const document = {
    get hidden() { return state.hidden },
    body: { classList: { contains: () => state.active } },
    addEventListener: (name, listener) => listeners.set(name, listener),
    querySelector: () => ({ getAttribute: () => state.muted ? 'Turn Crownlands sound on' : 'Turn Crownlands sound off' }),
  }
  vm.runInNewContext(source, {
    Audio, HTMLVideoElement, document,
    window: {
      location: { pathname: '/projects/crownlands' },
      addEventListener: (name, listener) => windowListeners.set(name, listener),
      removeEventListener: name => windowListeners.delete(name),
      setTimeout: callback => callback(),
    },
    MutationObserver: class { constructor(callback) { observer = callback } observe() {} },
  })
  return { music, state, listeners, observer, HTMLVideoElement }
}

test('only game music volume changes, to the requested 50 percent setting', () => {
  assert.equal(source.replaceAll('0.5', '0.11'), baseline)
  assert.equal(harness().music.volume, 0.5)
})

test('music waits for game start and keeps the louder volume after mute, video and visibility changes', () => {
  const h = harness()
  assert.equal(h.music.paused, true)
  assert.equal(h.music.loop, true)
  assert.equal(h.music.volume, 0.5)
  h.state.active = true
  h.observer()
  assert.equal(h.music.paused, false)
  assert.equal(h.music.volume, 0.5)
  h.state.muted = true
  h.listeners.get('click')({ target: { closest: () => true } })
  assert.equal(h.music.paused, true)
  h.state.muted = false
  h.listeners.get('click')({ target: { closest: () => true } })
  assert.equal(h.music.paused, false)
  assert.equal(h.music.volume, 0.5)
  const video = new h.HTMLVideoElement()
  h.listeners.get('play')({ target: video })
  assert.equal(h.music.volume, 0.035)
  h.listeners.get('pause')({ target: video })
  assert.equal(h.music.volume, 0.5)
  h.state.hidden = true
  h.listeners.get('visibilitychange')()
  assert.equal(h.music.paused, true)
  h.state.hidden = false
  h.listeners.get('visibilitychange')()
  assert.equal(h.music.paused, false)
  assert.equal(h.music.volume, 0.5)
  h.state.active = false
  h.observer()
  assert.equal(h.music.paused, true)
})

test('production loads exactly one new cache-safe music controller', () => {
  const html = fs.readFileSync(new URL('dist-production/index.html', repo), 'utf8')
  const tags = [...html.matchAll(/<script type="module" src="\/(crownlands-audio-[a-f0-9]+\.js)"><\/script>/g)]
  assert.equal(tags.length, 1)
  assert.ok(!html.includes('src="/crownlands-audio.js"'))
  assert.equal(fs.readFileSync(new URL(`dist-production/${tags[0][1]}`, repo), 'utf8'), source)
  assert.equal(fs.readFileSync(new URL('dist-production/crownlands-audio.js', repo), 'utf8'), baseline)
})
