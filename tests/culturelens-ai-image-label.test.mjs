import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = file => fs.readFileSync(path.join(repo, file), 'utf8')

test('the generated-image component labels images, not real process evidence', () => {
  const visual = read('src/components/culturelens/ConceptVisual.tsx')
  assert.match(visual, /<span className="culturelens-cv-badge" lang="en">AI-generated concept image<\/span>/)
  assert.ok(visual.includes("import '../../../public/culturelens-ai-image-label.css'"))
  assert.ok(visual.includes('AI-generated later iteration'))
  assert.ok(visual.includes('Not manufactured or optically validated hardware.'))
  assert.ok(!read('src/components/culturelens/ProcessEvidence.tsx').includes('culturelens-cv-badge'))
})

test('production contains all four generated images and the shared disclosure', () => {
  const assets = fs.readdirSync(path.join(repo, 'dist-production/assets'))
  const filename = assets.find(file => /^culturelens-case-study-[a-f0-9]+\.js$/.test(file))
  assert.ok(filename)
  const module = read(`dist-production/assets/${filename}`)
  assert.equal(module.split('AI-generated concept image').length - 1, 1)
  assert.ok(module.includes('className: "culturelens-cv-badge", lang: "en"'))
  assert.ok(!module.includes('ai生成的概念图片'))
  for (const image of ['culturelens-xr-scenario.webp', 'culturelens-xr-system.webp', 'culturelens-museband-scenario.webp', 'culturelens-museband-product-projection-20260914.webp']) {
    assert.ok(module.includes(image), image)
  }
  for (const disclosure of ['AI-generated later iteration', 'AI-generated head-worn concept', 'Not manufactured or optically validated hardware.']) {
    assert.ok(module.includes(disclosure), disclosure)
  }
})

test('source and production share bottom-right styles with a readable mobile label', () => {
  const css = read('public/culturelens-ai-image-label.css')
  assert.match(css, /\.culturelens-concept-visual \.culturelens-cv-frame > \.culturelens-cv-badge/)
  assert.match(css, /inset: auto 12px 12px auto/)
  assert.match(css, /inset: auto 8px 8px auto/)
  assert.match(css, /pointer-events: none/)
  const html = read('dist-production/index.html')
  const stylesheet = html.match(/href="\/(culturelens-ai-image-label-[a-f0-9]+\.css)"/)
  assert.ok(stylesheet)
  assert.equal(read(`dist-production/${stylesheet[1]}`), css)
})
