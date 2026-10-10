import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('CultureLens removes its selected case-study label while retaining right-aligned disciplines', () => {
  const source = read('src/pages/CultureLensCaseStudy.tsx')
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  const entry = read(`dist-production/${manifest.portfolioEntry}`)
  const cultureAsset = entry.match(/import\("\.\/(culturelens-case-study-[a-f0-9]+\.js)"\)/)[1]
  const production = read(`dist-production/assets/${cultureAsset}`)
  for (const page of [source, production]) {
    assert.ok(!page.includes('SELECTED CASE STUDY / 03'))
    assert.ok(page.includes('FUTURES THINKING → SERVICE DESIGN → AGENTIC AI'))
    assert.ok(page.includes('culturelens-hero-top'))
  }
  for (const file of ['public/culturelens-hero-overview.css', 'src/styles/culturelens.css']) {
    assert.match(read(file), /culturelens-hero-top\s*>\s*span:only-child\s*\{\s*margin-left:\s*auto/)
  }
})
