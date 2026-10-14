import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS } from './helpers/build.mjs'

const clips = ['read-board', 'choose-secretly', 'reveal', 'resolve', 'update-power', 'repeat']
const source = read('src/pages/CrownlandsPage.tsx')
const css = read('src/crownlands.css')

test('six rule GIFs have fixed subtitle-free dimensions, animation and release copies', () => {
  let total = 0
  for (const clip of clips) {
    assert.ok(source.includes(`'${clip}'`))
    const asset = `crownlands/loop/${clip}-20261015`
    const gif = fs.readFileSync(new URL(`../public/${asset}.gif`, import.meta.url))
    assert.equal(gif.toString('ascii', 0, 6), 'GIF89a')
    assert.equal(gif.readUInt16LE(6), 480)
    assert.equal(gif.readUInt16LE(8), 234)
    assert.ok(gif.includes(Buffer.from('NETSCAPE2.0')), 'GIF loops')
    assert.ok(gif.length < 2_500_000)
    total += gif.length
    for (const ext of ['gif', 'webp']) {
      const original = fs.readFileSync(new URL(`../public/${asset}.${ext}`, import.meta.url))
      for (const output of ['dist-production', '.vercel/output/static']) {
        assert.deepEqual(fs.readFileSync(new URL(`../${output}/${asset}.${ext}`, import.meta.url)), original)
      }
    }
  }
  assert.ok(total < 8_000_000)
  assert.ok(read('scripts/extract-crownlands-loop.mjs').includes('crop=1920:936:0:0'))
  assert.ok(builtJS('src/pages/CrownlandsPage.tsx').includes('/crownlands/loop/'))
})

test('Core Loop retains rule copy, lazy images, a pause control and reduced-motion fallback', () => {
  for (const expected of ['PAUSE GIFS', 'PLAY GIFS', 'aria-pressed={paused}', "prefers-reduced-motion: reduce", 'observer.disconnect()', 'loading="lazy"', "animate ? 'gif' : 'webp'", 'Control only updates after the current player’s full action has resolved.']) {
    assert.ok(source.includes(expected), expected)
  }
  assert.ok(source.indexOf('className="cl-loop-clip"') < source.indexOf('<h4>{title}</h4><p>{text}</p>'))
})

test('Four Actions reuse original card art before titles and support hover, keyboard and touch enlargement', () => {
  const rows = source.split('className="cl-actions"')[1].split('<blockquote>')[0]
  assert.ok(rows.indexOf('<CrownlandsActionCard action={title}') < rows.indexOf('<h4>{title}</h4>'))
  for (const expected of ['aria-pressed={enlargedAction === title}', 'Enlarge ${title.toLowerCase()} action card', 'setEnlargedAction']) assert.ok(rows.includes(expected))
  for (const action of ['reinforce', 'expand', 'reposition', 'contest']) assert.ok(fs.existsSync(new URL(`../public/crownlands/elements/${action}.webp`, import.meta.url)))
  for (const expected of ['.cl-action-preview:hover', '.cl-action-preview:focus-visible', '.cl-action-preview[aria-pressed=true]', 'transform:scale(2)', 'transform:scale(1.65)']) assert.ok(css.includes(expected))
})
