import test from 'node:test'
import assert from 'node:assert/strict'
import { read, builtJS } from './helpers/build.mjs'

test('UniLink omits the complete hero top-label row while retaining the title and project metadata', () => {
  const page = read('src/pages/UniLinkCaseStudy.tsx')
  for (const content of [page, builtJS('src/pages/UniLinkCaseStudy.tsx')]) {
    for (const removed of ['UX RESEARCH · PRODUCT DESIGN · 12-WEEK TEAM PROJECT', 'CASE STUDY / 6–8 MIN READ', 'ul-hero-top']) assert.ok(!content.includes(removed))
    for (const retained of ['Peer Support for', 'International Students', '12 weeks / one semester', 'UX Designer · UX Researcher']) assert.ok(content.includes(retained))
  }
})

test('UniLink removes the work-in-progress notice and its box in both application builds', () => {
  const html = read('dist-production/projects/unilink/index.html')
  const bundlePath = html.match(/src="\/(unilink-assets\/[^" ]+\.js)"/)?.[1]
  assert.ok(bundlePath)
  for (const content of [read('src/pages/UniLinkCaseStudy.tsx'), builtJS('src/pages/UniLinkCaseStudy.tsx'), read('dist-production/' + bundlePath)]) {
    assert.ok(!content.includes('UniLink is a work in progress, not a finished product.'))
    assert.ok(!content.includes('ul-project-status'))
    assert.ok(content.includes('When information is everywhere,'))
    assert.ok(content.includes('12 weeks / one semester'))
  }
})
