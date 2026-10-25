import test from 'node:test'
import assert from 'node:assert/strict'
import { read, builtJS, builtCSS } from './helpers/build.mjs'

const component = read('src/components/unilink/UniLinkEcosystem.tsx')
const page = read('src/pages/UniLinkCaseStudy.tsx')
const css = read('src/styles/unilink-ecosystem.css')

test('UniLink replaces the three-card incentive row with a central hub and a triangular arrow cycle', () => {
  assert.ok(page.includes('<UniLinkEcosystem />'))
  assert.ok(!page.includes('className="ul-value-loop"'))
  for (const item of ['<strong>UniLink</strong>', 'ul-ecosystem-node--${role}', 'markerMid=', 'useId()', 'Gift', 'GraduationCap', 'UsersRound', 'Link2', 'preserveAspectRatio="none"']) assert.ok(component.includes(item), item)
  assert.equal((component.split('className="ul-ecosystem-cycle"')[1].split('</g>')[0].match(/<path /g) || []).length, 3)
  assert.ok(component.includes('aria-label={t("UniLink at the centre of a triangular cycle'))
  assert.ok(component.includes('aria-hidden="true"'))
  assert.ok(component.includes('M150 520 L315 305 L440 145'))
  assert.ok(css.includes('.ul-ecosystem-connections .ul-ecosystem-spokes path { stroke-width:3.2; }'))
})

test('ecosystem keeps participant explanations and trust guardrails while removing the recognition caption', () => {
  for (const text of ['Receive relevant peer support and bookable mentor guidance.', 'Contribute lived experience, earn Link Points and redeem rewards.', 'Fund rewards and gain clearly labelled exposure around the Rewards experience.']) assert.ok(component.includes(text))
  for (const text of ['Sponsorship must never influence mentor ranking or be disguised as peer advice.', 'No partnerships are claimed.']) assert.ok(page.includes(text))
  assert.ok(!page.includes('Recognition supports continued contribution to the UniLink ecosystem.'))
  assert.ok(page.includes("gsap.from('.ul-ecosystem article'"))
})

test('desktop and mobile retain a triangle with readable small-screen clearance and source-built styles', () => {
  for (const value of ['.ul-ecosystem-node--sponsors { top:0; left:36%; }', '.ul-ecosystem-node--students { bottom:0; left:0; }', '.ul-ecosystem-node--mentors { bottom:0; right:0; }', 'max-width:820px', 'left:50%; top:52%', '@media(max-width:600px)', 'min-height:420px', 'width:46%', 'font-size:11px']) assert.ok(css.includes(value), value)
  const bundle = builtJS('src/pages/UniLinkCaseStudy.tsx')
  assert.ok(bundle.includes('ul-ecosystem-hub'))
  assert.ok(builtCSS('src/pages/UniLinkCaseStudy.tsx').includes('.ul-ecosystem'))
  assert.ok(!component.includes('<img'))
})
