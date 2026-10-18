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

test('Focus, Story, Flow and Control keep pointer, focus and click selection and concept details', () => {
  const modules = read('src/components/culturelens/CaseStudyModules.tsx')
  const visual = read('src/components/culturelens/ConceptVisual.tsx')
  assert.ok(modules.includes("['Focus', 'Story', 'Flow', 'Control']"))
  for (const handler of ['setMode(item)', 'onFocus={() => setMode(item)}', 'onClick={() => setMode(item)}']) assert.ok(modules.includes(handler))
  for (const retained of ['culturelens-cv-led', 'culturelens-cv-mode-point', 'Explore concept features', 'AI-generated concept image']) assert.ok(visual.includes(retained))
})
