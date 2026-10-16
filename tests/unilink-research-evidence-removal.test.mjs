import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS } from './helpers/build.mjs'

test('UniLink removes the research evidence disclosure and its exclusive files from source and releases', () => {
  const page = read('src/pages/UniLinkCaseStudy.tsx')
  const data = read('src/data/unilink.ts')
  for (const content of [page, data, builtJS('src/pages/UniLinkCaseStudy.tsx')]) {
    assert.ok(!content.includes('Explore the original research evidence'))
    assert.ok(!content.includes('researchArtifacts'))
    for (const name of ['interview-evidence-01.webp', 'interview-evidence-02.webp', 'synthesis.webp', 'rich-picture.webp']) assert.ok(!content.includes(name))
  }
  for (const root of ['public', 'dist-production', '.vercel/output/static']) {
    for (const name of ['interview-evidence-01.webp', 'interview-evidence-02.webp', 'synthesis.webp', 'rich-picture.webp']) {
      assert.ok(!fs.existsSync(new URL(`../${root}/images/unilink/research/${name}`, import.meta.url)))
    }
  }
  for (const retained of ['ul-research-method', 'ul-evidence-field', '<Personas />', 'Explore more prototype screens', 'When the ideal path breaks']) assert.ok(page.includes(retained))
})
