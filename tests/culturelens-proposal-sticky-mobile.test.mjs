import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('CultureLens mobile three-proposal rail touches the actual shared nav without a top spacer', () => {
  const css = fs.readFileSync(new URL('../src/styles/culturelens-process.css', import.meta.url), 'utf8')
  const mobile = css.slice(css.lastIndexOf('@media(max-width:760px)'))
  const rule = mobile.match(/\.culturelens-sequential-proposals>aside\{([^}]+)\}/)?.[1]
  assert.ok(rule)
  assert.ok(rule.includes('position:sticky'))
  assert.ok(rule.includes('top:var(--case-chapter-height,86px)'))
  assert.ok(rule.includes('padding:0 0 10px'))
  assert.ok(!rule.includes('top:117px'))
  assert.ok(mobile.includes('.culturelens-proposal-tabs{margin:0}'))
  assert.ok(mobile.includes('scroll-margin-top:calc(var(--case-chapter-height,86px) + var(--culturelens-proposal-bar-height,70px) + 12px)'))
})

test('proposal jump clearance follows the measured bar height when mobile labels wrap', () => {
  const source = fs.readFileSync(new URL('../src/components/culturelens/CaseStudyModules.tsx', import.meta.url), 'utf8')
  assert.ok(source.includes("querySelector<HTMLElement>(':scope > aside')"))
  assert.ok(source.includes('proposalBar?.offsetHeight'))
  assert.ok(source.includes("style.setProperty('--culturelens-proposal-bar-height'"))
  assert.ok(source.includes('observer.observe(proposalBar)'))
  assert.ok(source.includes('observer.disconnect()'))
})
