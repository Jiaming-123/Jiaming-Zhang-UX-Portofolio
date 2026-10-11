import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS } from './helpers/build.mjs'

test('Furniture hero uses the supplied October poster without changing the homepage cover', () => {
  const path = '/images/furniture/hero-poster-20261011.png'
  const source = read('src/pages/ProjectPage.tsx')
  assert.ok(source.includes(path))
  assert.ok(source.includes('width={1302} height={814}'))
  assert.ok(!source.includes('src="/images/furniture/cover.png"'))
  assert.ok(builtJS().includes(path))
  const original = fs.readFileSync(new URL('../public' + path, import.meta.url))
  assert.equal(original.readUInt32BE(16), 1302)
  assert.equal(original.readUInt32BE(20), 814)
  for (const folder of ['dist-production', '.vercel/output/static']) {
    assert.deepEqual(fs.readFileSync(new URL('../' + folder + path, import.meta.url)), original)
  }
  const covers = JSON.parse(read('src/data/homepage-covers.json'))
  assert.equal(covers.furniture.src, '/images/homepage-covers/furniture-20261010-v2.webp')
})
