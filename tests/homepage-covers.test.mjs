import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const covers = JSON.parse(fs.readFileSync(path.join(repo, 'src/data/homepage-covers.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'docs/production-restoration-manifest.json'), 'utf8'))
const entry = fs.readFileSync(path.join(repo, 'dist-production', manifest.portfolioEntry), 'utf8')

for (const [slug, cover] of Object.entries(covers)) {
  test(`${slug}: the homepage uses the new cover, retains dimensions and meets the 2 MB budget`, () => {
    const source = fs.readFileSync(path.join(repo, 'public', cover.src))
    assert.ok(source.length <= 2_000_000)
    assert.equal(source.toString('ascii', 0, 4), 'RIFF')
    assert.equal(source.toString('ascii', 8, 12), 'WEBP')
    for (const directory of ['dist-production', '.vercel/output/static']) {
      assert.deepEqual(fs.readFileSync(path.join(repo, directory, cover.src)), source)
    }
    const attributes = `src:${JSON.stringify(cover.src)},width:${cover.width},height:${cover.height}`
    assert.equal(entry.split(attributes).length - 1, 1)
    assert.ok(entry.includes(`alt:${JSON.stringify(cover.alt)}`))
  })
}

test('the original case-study cover files remain unchanged', () => {
  const baseline = path.join(repo, 'production-baseline')
  for (const file of ['media/culturelens/culturelens-cover-agentic-20260914.webp', 'images/crownlands-cover.png', 'images/furniture/myfurniturestore-cover.png', 'images/boardgamemate/boardgamemate-cover.png']) {
    assert.deepEqual(fs.readFileSync(path.join(repo, 'dist-production', file)), fs.readFileSync(path.join(baseline, file)))
  }
})
