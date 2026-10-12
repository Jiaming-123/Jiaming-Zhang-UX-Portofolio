import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('six concept cards retain two columns on mobile, with original sketch controls', () => {
  const css = read('src/styles/unilink-concepts.css')
  const mobile = css.slice(css.indexOf('@media(max-width:600px)'))
  assert.match(mobile, /\.ul-hypothesis-grid\s*\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/)
  assert.ok(!mobile.includes('grid-template-columns:1fr; gap:16px'))
  assert.ok(mobile.includes('width:44px; height:44px'))
  const component = read('src/components/unilink/ConceptExploration.tsx')
  assert.ok(component.includes('aria-expanded={expanded}'))
  assert.ok(component.includes('ul-concept-dialog'))
})

test('Final Design has one clipped vertical screen track rather than repeated mobile images', () => {
  const component = read('src/components/unilink/CaseStudyMedia.tsx')
  const css = read('src/styles/unilink.css')
  assert.ok(component.includes('className="ul-screen-track"'))
  assert.ok(component.includes('yPercent:-100*i'))
  assert.ok(component.includes('aria-hidden={active!==i}'))
  assert.ok(component.includes('aria-current={active===i'))
  assert.ok(!component.includes('ul-mobile-screen'))
  assert.ok(!component.includes('(min-width:901px)'))
  assert.ok(component.includes('duration:reduced?0:.4'))
  assert.match(css, /\.ul-screen-stack\s*\{[^}]*overflow:hidden/)
  assert.match(css, /\.ul-product-stage\s*\{[^}]*position:sticky;[^}]*--case-chapter-height/)
  assert.ok(!css.includes('.ul-product-stage { display:none; }'))
  assert.ok(css.includes('grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)'))
  assert.ok(component.includes('actionLabel="Enlarge screen"'))
  assert.ok(css.includes('.ul-stage-zoom figure>button { min-height:44px'))
})

test('mobile peer-support card groups use two columns and compact readable type', () => {
  const css = read('src/styles/unilink.css')
  const mobile = css.slice(css.indexOf('@media(max-width:600px)'))
  for (const selector of ['.ul-source-field', '.ul-evidence-field', '.ul-two-lanes', '.ul-value-loop', '.ul-future>div']) {
    const rule = mobile.slice(mobile.indexOf(selector)).split('}')[0]
    assert.ok(rule.includes('grid-template-columns:repeat(2,minmax(0,1fr))'), selector)
  }
  assert.ok(mobile.includes('.ul-insight h3 { font-size:clamp(18px,4.8vw,23px)'))
  assert.ok(mobile.includes('.ul-insight p { font-size:12.5px; line-height:1.65'))
  assert.ok(css.includes('.ul-lane-connector { display:none; }'))
  const concepts = read('src/styles/unilink-concepts.css').split('@media(max-width:600px)')[1]
  assert.match(concepts, /\.ul-exploration-principles \{ grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/)
  assert.match(concepts, /\.ul-exploration-outcomes \{ grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/)
  assert.ok(!mobile.includes('line-clamp'))
  assert.ok(css.includes('.ul-persona-sequence { display:block; }'))
})
