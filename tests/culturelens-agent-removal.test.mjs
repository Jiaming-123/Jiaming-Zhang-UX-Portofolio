import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('Screenshot section is removed while original Voiceflow evidence and chapter links remain', () => {
  const source = read('src/pages/CultureLensCaseStudy.tsx')
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  const entry = read(`dist-production/${manifest.portfolioEntry}`)
  const asset = entry.match(/import\("\.\/(culturelens-case-study-[a-f0-9]+\.js)"\)/)[1]
  const production = read(`dist-production/assets/${asset}`)
  for (const page of [source, production]) {
    assert.ok(!page.includes('#culturelens-simulation'))
    assert.ok(!page.includes('AGENT / ARCHITECTURE & INTERACTION'))
    assert.ok(!page.includes('className: "culturelens-autonomy"'))
    assert.ok(!page.includes('React simulation above'))
    assert.ok(page.includes('#culturelens-agent'))
    assert.ok(page.includes('AGENT / ORIGINAL VOICEFLOW BUILD'))
    assert.ok(page.includes('THE ORIGINAL VOICEFLOW BUILD'))
    assert.ok(page.includes('The recordings document the original Voiceflow project.'))
  }
  assert.ok(!source.includes('<AgentArchitecture'))
  assert.ok(!source.includes('<AgentSimulation'))
  assert.ok(!production.includes('/* @__PURE__ */ e(We, {}),'))
  assert.ok(!production.includes('/* @__PURE__ */ e(Te, {}),'))
  assert.ok(source.includes('<PrototypeEvidence />'))
  assert.ok(source.includes('<ConversationEvidence />'))
  assert.ok(production.includes('/* @__PURE__ */ e(Ye, {})'))
  assert.ok(production.includes('/* @__PURE__ */ e(Fe, {})'))
})
