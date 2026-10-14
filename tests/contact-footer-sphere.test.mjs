import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = path => fs.readFileSync(new URL(`../${path}`,import.meta.url),'utf8')

test('Footer and Contact share one right-aligned CSS sphere with the reference gradient', () => {
  const css = read('src/styles.css')
  assert.ok(css.includes('.site-footer,.contact-page { position:relative; isolation:isolate; overflow:clip;'))
  assert.ok(css.includes('--contact-sphere-size:58vw; --contact-sphere-right:0px; --contact-sphere-top:0px'))
  assert.ok(css.includes('.site-footer::before,.contact-page::before'))
  assert.ok(css.includes('right:var(--contact-sphere-right); top:var(--contact-sphere-top); border-radius:50%'))
  assert.ok(css.includes('z-index:-1; pointer-events:none'))
  assert.ok(css.includes('rgba(122,154,204,.3) 0%,rgba(0,102,255,.13) 38%,rgba(0,102,255,0) 72%'))
  assert.ok(css.includes('--contact-sphere-size:140vw; --contact-sphere-right:-48vw; --contact-sphere-top:48px'))
  assert.ok(css.includes('body:has(.contact-page) .nav-shell:not(.is-compact) { background:transparent'))
  assert.ok(css.includes('.site-footer h2 { margin: 70px 0 90px; font-size: min(15vw, 5.6rem)'))
  assert.ok(css.includes('.contact-page h1 { margin: 55px 0 65px; font-size: min(15vw, 6.2rem)'))
  assert.ok(!css.includes('radial-gradient(circle at 50% 120%'))
  assert.ok(!css.includes('radial-gradient(circle at 74% 45%'))
})

test('background changes retain Footer links, back-to-top and Contact addresses', () => {
  const footer = read('src/components/Layout.tsx')
  const contact = read('src/pages/InfoPages.tsx')
  assert.ok(footer.includes('BACK TO TOP'))
  assert.ok(footer.includes('LET&apos;S CREATE'))
  assert.ok(footer.includes('if (pathname.startsWith(\'/projects/\')) return null'))
  assert.ok(contact.includes('jiamingz1113@163.com'))
  assert.ok(contact.includes('jiamingz1113@gmail.com'))
  assert.ok(contact.includes('LET&apos;S MAKE'))
})

test('Contact removes the requested location, introduction and availability row while preserving action placement', () => {
  const contact = read('src/pages/InfoPages.tsx').split('export function ContactPage()')[1].split('export function NotFoundPage()')[0]
  for (const removed of ['CONTACT / MELBOURNE', 'open to UX and product design opportunities', 'AVAILABLE FOR OPPORTUNITIES', 'MELBOURNE · AEST', 'contact-note']) {
    assert.ok(!contact.includes(removed), removed)
  }
  assert.ok(contact.includes('contact-actions'))
  assert.ok(contact.includes('https://www.linkedin.com/in/jiaming-zhang-996b52280/'))
  const css = read('src/styles.css')
  assert.ok(css.includes('.contact-actions { display: grid; grid-column: 2; }'))
  assert.ok(css.includes('.contact-actions { grid-column: 1; }'))
})
