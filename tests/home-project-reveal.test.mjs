import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { observeProjectReveal } from '../public/home-project-reveal.mjs'

function fixture({ reduced = false, supported = true } = {}) {
  const motionListeners = new Map()
  const elementListeners = new Map()
  let observer
  let count = 0
  const motion = {
    matches: reduced,
    addEventListener: (name, listener) => motionListeners.set(name, listener),
    removeEventListener: name => motionListeners.delete(name),
  }
  const view = {
    matchMedia: () => motion,
    IntersectionObserver: supported ? class {
      constructor(callback, options) {
        Object.assign(this, { callback, options, disconnected: false })
        observer = this
      }
      observe(target) { this.target = target }
      disconnect() { this.disconnected = true }
    } : undefined,
  }
  const element = {
    ownerDocument: { defaultView: view },
    addEventListener: (name, listener) => elementListeners.set(name, listener),
    removeEventListener: name => elementListeners.delete(name),
  }
  const cleanup = observeProjectReveal(element, () => count++)
  return { element, observer, motionListeners, elementListeners, cleanup, count: () => count }
}

test('each card reveals only on viewport entry, once, then releases its observer', () => {
  const card = fixture()
  assert.equal(card.observer.target, card.element)
  assert.deepEqual(card.observer.options, { rootMargin: '0px 0px -64px 0px', threshold: 0.01 })
  card.observer.callback([{ isIntersecting: false }])
  assert.equal(card.count(), 0)
  card.observer.callback([{ isIntersecting: true }])
  card.observer.callback([{ isIntersecting: true }])
  assert.equal(card.count(), 1)
  assert.equal(card.observer.disconnected, true)
  assert.equal(card.motionListeners.size, 0)
  assert.equal(card.elementListeners.size, 0)
})

test('reduced-motion preference and unsupported observers show cards immediately', () => {
  for (const options of [{ reduced: true }, { supported: false }]) {
    const card = fixture(options)
    assert.equal(card.count(), 1)
    assert.equal(card.observer, undefined)
    assert.equal(card.elementListeners.size, 0)
    card.cleanup()
  }
})

test('changing reduced-motion preference and keyboard focus reveal pending cards', () => {
  const preference = fixture()
  preference.motionListeners.get('change')({ matches: true })
  assert.equal(preference.count(), 1)
  assert.equal(preference.observer.disconnected, true)
  const keyboard = fixture()
  keyboard.elementListeners.get('focusin')()
  assert.equal(keyboard.count(), 1)
  assert.equal(keyboard.observer.disconnected, true)
})

test('unmount cleanup cancels queued callbacks and a new visit can reveal again', () => {
  const outgoing = fixture()
  outgoing.cleanup()
  outgoing.observer.callback([{ isIntersecting: true }])
  assert.equal(outgoing.count(), 0)
  assert.equal(outgoing.observer.disconnected, true)
  const returning = fixture()
  returning.observer.callback([{ isIntersecting: true }])
  assert.equal(returning.count(), 1)
})

test('source build includes the shared runtime and cache-safe bundle', () => {
  const root = new URL('../',import.meta.url)
  const manifest = JSON.parse(fs.readFileSync(new URL('docs/production-restoration-manifest.json',root),'utf8'))
  const entry = fs.readFileSync(new URL('dist-production/' + manifest.portfolioEntry,root),'utf8')
  assert.equal(manifest.buildMode,'react-source')
  assert.ok(entry.includes("home-project-reveal"))
})
