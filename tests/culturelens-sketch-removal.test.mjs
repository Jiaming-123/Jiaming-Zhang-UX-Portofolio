import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const evidence = readFileSync(new URL('../src/components/culturelens/ProcessEvidence.tsx', import.meta.url), 'utf8')

test('CultureLens removes the earlier sketch and state wiring block', () => {
  for (const removed of ['Earlier sketch and state wiring', 'file="conversation-sketch"', 'file="voiceflow-state-canvas"', 'culturelens-source-pair']) {
    assert.ok(!evidence.includes(removed), `${removed} should not be rendered`)
  }
})

test('CultureLens keeps the request, recommendation and confirmation evidence', () => {
  for (const retained of ['voiceflow-request', 'voiceflow-recommendation', 'voiceflow-confirmation']) {
    assert.ok(evidence.includes(retained), `${retained} should remain`)
  }
})
