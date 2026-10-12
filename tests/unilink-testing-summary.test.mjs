import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('UniLink evaluation shows the confirmed 8 + 3 + 2 participant breakdown', () => {
  const page = read('src/pages/UniLinkCaseStudy.tsx')
  for (const text of ['8<span>first-year international students', '3<span>Current peer mentors', '2<span>Aspiring peer mentors', '13 participants in the team evaluation. The selected detail findings below are grounded in the student and mentor interviews.']) {
    assert.ok(page.includes(text), text)
  }
  assert.ok(!page.includes('12 participants'))
  assert.ok(!page.includes('Peer support has a boundary.'))
  assert.ok(!page.includes('className="ul-boundary"'))
})
