import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('case study footers are omitted without removing Home and About footers', () => {
  const source = read('src/components/Layout.tsx')
  assert.ok(source.includes("if (pathname.startsWith('/projects/')) return null"))
  assert.ok(source.includes('<footer className="site-footer"'))
  assert.ok(read('src/pages/HomePage.tsx').includes('<Footer />'))
  const info = read('src/pages/InfoPages.tsx')
  assert.ok(info.slice(info.indexOf('export function AboutPage()'), info.indexOf('export function ContactPage()')).includes('<Footer />'))
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  const entry = read(`dist-production/${manifest.portfolioEntry}`)
  assert.ok(entry.includes('function oa(){const {pathname:footerPath}=Ji();if(footerPath.startsWith("/projects/"))return null;'))
  assert.ok(entry.includes('className:"site-footer"'))
  assert.ok(entry.includes('className:"case-next-project"'))
})
