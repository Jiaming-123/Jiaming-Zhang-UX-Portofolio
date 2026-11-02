import test from 'node:test'
import assert from 'node:assert/strict'
import { read, builtJS, builtCSS } from './helpers/build.mjs'

test('MuseBand mode changes no longer mount or animate a white specular sweep', () => {
  const visual = read('src/components/culturelens/ConceptVisual.tsx')
  const css = read('src/styles/culturelens-concepts.css')
  for (const removed of ['culturelens-cv-specular', 'culturelens-cv-sweep']) {
    assert.ok(!visual.includes(removed))
    assert.ok(!css.includes(removed))
    assert.ok(!builtJS('src/pages/CultureLensCaseStudy.tsx').includes(removed))
    assert.ok(!builtCSS('src/pages/CultureLensCaseStudy.tsx').includes(removed))
  }
})

test('requested proposal endings, tension disclosures and concept controls are removed', () => {
  const modules = read('src/components/culturelens/CaseStudyModules.tsx')
  const process = read('src/components/culturelens/ProcessEvidence.tsx')
  const page = read('src/pages/CultureLensCaseStudy.tsx')
  for (const text of ['END OF LAYER', 'Design tension → response', 'setMode', 'culturelens-mode-rail']) assert.ok(!modules.includes(text), text)
  for (const text of ['NEXT ITERATION', 'SYSTEM LEARNING → PROPOSAL DECISION', 'The refined images retain']) assert.ok(!process.includes(text), text)
  assert.ok(!page.includes('DECISION CHECKPOINT 01'))
  for (const file of ['draft-storyboard', 'xr-original-sketch', 'museband-physical-prototype', 'museband-walkthrough-']) assert.ok(process.includes(file), file)
})
