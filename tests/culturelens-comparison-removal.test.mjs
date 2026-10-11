import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const modules = readFileSync(new URL('../src/components/culturelens/CaseStudyModules.tsx', import.meta.url), 'utf8')
const evidence = readFileSync(new URL('../src/components/culturelens/ProcessEvidence.tsx', import.meta.url), 'utf8')

test('CultureLens no longer renders the proposal comparison and selection checkpoint', () => {
  for (const removed of ['ComparisonProof', 'Compare all three proposals', 'Group project comparison', 'DECISION CHECKPOINT 02', 'MuseBand brought the system into the live moment.']) {
    assert.ok(!modules.includes(removed), `${removed} should be removed`)
  }
  assert.ok(!evidence.includes('export function ComparisonProof'))
})

test('CultureLens retains the three detailed proposals and their process evidence', () => {
  assert.ok(modules.includes('proposals.map((_, index) => <ProposalLayer'))
  assert.ok(modules.includes('<ProposalProcess active={active} />'))
  for (const retained of ['StoryboardEvidence', 'XrEvidence', 'MuseBandEvidence', 'ConversationEvidence']) {
    assert.ok(evidence.includes(retained))
  }
})
