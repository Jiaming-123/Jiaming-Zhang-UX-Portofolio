import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('production build and tests only depend on repository-local inputs', () => {
  for (const directory of ['scripts', 'tests']) {
    for (const name of fs.readdirSync(path.join(repo, directory))) {
      if (!name.endsWith('.mjs') || name === 'repository-portability.test.mjs') continue
      const source = fs.readFileSync(path.join(repo, directory, name), 'utf8')
      assert.ok(!source.includes('../_work'), `${directory}/${name} requires an external project directory`)
    }
  }
  assert.ok(fs.existsSync(path.join(repo, 'production-baseline/index.html')))
  assert.ok(fs.readFileSync(path.join(repo, 'scripts/stage-production.mjs'), 'utf8').includes("path.join(repo, 'production-baseline')"))
})

test('Git-connected deployments build and serve the complete production site', () => {
  const config = JSON.parse(fs.readFileSync(path.join(repo, 'vercel.json'), 'utf8'))
  assert.equal(config.buildCommand, 'npm run build')
  assert.equal(config.outputDirectory, 'dist-production')
  assert.equal(config.cleanUrls, false)
  assert.ok(config.rewrites.some(rule => rule.source === '/projects/unilink' && rule.destination === '/projects/unilink/index.html'))
})
