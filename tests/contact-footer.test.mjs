import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('Contact omits the footer while preserving contact information and other page footers', () => {
  const source = read('src/pages/InfoPages.tsx')
  const contact = source.slice(source.indexOf('export function ContactPage()'), source.indexOf('export function NotFoundPage()'))
  assert.ok(!contact.includes('<Footer'))
  for (const content of ['contact-page', 'contact-note', 'jiamingz1113@163.com', 'jiamingz1113@gmail.com', 'LINKEDIN']) assert.ok(contact.includes(content))
  const about = source.slice(source.indexOf('export function AboutPage()'), source.indexOf('export function ContactPage()'))
  assert.ok(about.includes('<Footer />'))
  assert.ok(read('src/pages/HomePage.tsx').includes('<Footer />'))
})

test('the published Contact component has no footer, without changing the shared footer', () => {
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  const entry = read(`dist-production/${manifest.portfolioEntry}`)
  const contact = entry.slice(entry.indexOf('function SA()'), entry.indexOf('function Oj()'))
  assert.ok(contact.includes('className:"contact-page"'))
  assert.ok(!contact.includes('l.jsx(oa,'))
  for (const content of ['jiamingz1113@163.com', 'jiamingz1113@gmail.com', 'contact-note', 'LINKEDIN']) assert.ok(contact.includes(content))
  assert.ok(entry.includes('function oa()'))
  assert.ok(entry.includes('className:"site-footer"'))
  assert.ok(entry.includes('l.jsx(oa,{})'))
})
