import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('BoardGameMate uses the supplied signed cover without a duplicate HTML signature', () => {
  const source = read('src/components/Content.tsx')
  assert.ok(source.includes("project.slug === 'boardgamemate' ? homepageCovers.boardgamemate"))
  assert.ok(!source.includes('boardgamemate-cover-signature'))
  const covers = JSON.parse(read('src/data/homepage-covers.json'))
  assert.match(covers.boardgamemate.alt, /2024 · BoardGameMate/)
  assert.equal(covers.boardgamemate.src, '/images/homepage-covers/boardgamemate-20261010-v2.webp')
})

test('production has no duplicate signature and preserves the original case-study artwork', () => {
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  const entry = read(`dist-production/${manifest.portfolioEntry}`)
  assert.ok(!entry.includes('boardgamemate-cover-signature'))
  assert.ok(!read('dist-production/index.html').includes('boardgamemate-cover-signature'))
  const image = 'images/boardgamemate/boardgamemate-cover.png'
  assert.deepEqual(fs.readFileSync(new URL(`../dist-production/${image}`, import.meta.url)), fs.readFileSync(new URL(`../production-baseline/${image}`, import.meta.url)))
})
