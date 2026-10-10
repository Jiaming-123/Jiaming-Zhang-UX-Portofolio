import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
test('Furniture removes Foundations and Component Library image area, preserving adjacent sections', () => {
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  for (const page of [read('src/components/FurnitureCaseStudy.tsx'), read(`dist-production/${manifest.portfolioEntry}`)]) {
    for (const text of ['furniture-figma-visual', 'FIGMA · FOUNDATIONS', 'FIGMA · COMPONENT LIBRARY', '/images/furniture/foundations.png', '/images/furniture/components.png']) assert.ok(!page.includes(text), text)
    for (const text of ['DESIGN THESIS', 'DESIGN PROCESS', 'furniture-flow']) assert.ok(page.includes(text), text)
  }
})
