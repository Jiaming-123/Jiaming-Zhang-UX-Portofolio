import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
test('About removes its introductory hero and approach quotation, preserving profile and capabilities', () => {
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  for (const page of [read('src/pages/InfoPages.tsx'), read(`dist-production/${manifest.portfolioEntry}`)]) {
    for (const text of ['CURIOUS', 'MY APPROACH', 'Make the system understandable.', 'page-hero about-hero']) assert.ok(!page.includes(text), text)
    for (const text of ['about-profile', 'about-story', 'CAPABILITIES', 'EDUCATION', 'LOCATION']) assert.ok(page.includes(text), text)
  }
})
