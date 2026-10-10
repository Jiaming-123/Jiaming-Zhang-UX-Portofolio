import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baseline = path.join(repo, 'production-baseline')
const target = path.join(repo, 'dist-production')
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'docs/production-restoration-manifest.json'), 'utf8'))
const entry = fs.readFileSync(path.join(target, manifest.portfolioEntry), 'utf8')
const crownEntry = fs.readdirSync(path.join(target, 'assets')).find(file => /^CrownlandsPage-rules-scroll-[a-f0-9]+\.js$/.test(file))
const originalName = 'CrownlandsPage-CultureLens-20260913.js'
const creditNode = 'e.jsxs("p",{className:"cl-credit",children:["Project assets supplied by the Crownlands design team · Procedural page audio generated in-browser · ",e.jsx("a",{href:"/CREDITS.md",children:"Credits"})]})'

test('the production route loads the cache-safe corrected Crownlands module', () => {
  assert.ok(crownEntry)
  assert.equal(entry.split(crownEntry).length - 1, 2)
  assert.ok(!entry.includes(originalName))
})

test('full rules use native nested scrolling without changing game logic or sheets', () => {
  const module = fs.readFileSync(path.join(target, 'assets', crownEntry), 'utf8')
  const patchedNode = 'className:"cl-rules-modal","data-lenis-prevent":"",tabIndex:0,role:"dialog"'
  assert.equal(module.split(patchedNode).length - 1, 1)
  const restored = module.replace(patchedNode, 'className:"cl-rules-modal",role:"dialog"')
    .replace('children:"What We Wanted Players to Feel"', 'children:"Experience North Star"')
    .replaceAll(path.basename(manifest.portfolioEntry), 'index-UniLinkEmpty-20260925.js')
  assert.equal(restored, fs.readFileSync(path.join(baseline, 'assets', originalName), 'utf8').replace(creditNode, 'null'))
  for (const sheet of ['rules-01.jpg', 'rules-02.jpg']) {
    assert.deepEqual(fs.readFileSync(path.join(target, 'crownlands/rules', sheet)), fs.readFileSync(path.join(baseline, 'crownlands/rules', sheet)))
  }
})

test('the player-experience heading uses the requested wording exactly once', () => {
  const module = fs.readFileSync(path.join(target, 'assets', crownEntry), 'utf8')
  assert.equal(module.split('children:"What We Wanted Players to Feel"').length - 1, 1)
  assert.ok(!module.includes('Experience North Star'))
})

test('the requested footer credit and its Credits link are removed completely', () => {
  const module = fs.readFileSync(path.join(target, 'assets', crownEntry), 'utf8')
  assert.ok(!module.includes('cl-credit'))
  assert.ok(!module.includes('Project assets supplied by the Crownlands design team'))
  assert.ok(!module.includes('Procedural page audio generated in-browser'))
  assert.ok(!module.includes('href:"/CREDITS.md"'))
})
