import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
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

test('provided SUS chart appears immediately above the participant explanation in the summary column', () => {
  const page = read('src/pages/UniLinkCaseStudy.tsx')
  const css = read('src/styles/unilink.css')
  const summary = page.split('className="ul-test-summary"')[1].split('</div>')[0]
  assert.ok(summary.includes('/images/unilink/sus-score-76-7-20261018.webp'))
  assert.ok(summary.indexOf('<img') < summary.indexOf('<p>13 participants'))
  assert.ok(summary.includes('Average SUS score for 13 participants: 76.7'))
  assert.ok(css.includes('.ul-test-summary>img { display:block; width:100%; height:auto;'))
  const asset = 'images/unilink/sus-score-76-7-20261018.webp'
  const original = fs.readFileSync(new URL(`../public/${asset}`, import.meta.url))
  for (const output of ['dist-production', '.vercel/output/static']) {
    assert.deepEqual(fs.readFileSync(new URL(`../${output}/${asset}`, import.meta.url)), original)
  }
})
