import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../public/portfolio-navigation.js', import.meta.url), 'utf8')
function navigate({ app = 'portfolio', href, ...options }) {
  const assigned = []
  let listener
  class Element {
    closest() { return { href, target: options.target || '', hasAttribute: () => Boolean(options.download) } }
  }
  const event = { target: new Element(), button: 0, defaultPrevented: false, ...options,
    preventDefault() { this.defaultPrevented = true }, stopPropagation() {} }
  const pathname = app === 'unilink' ? '/projects/unilink' : '/'
  vm.runInNewContext(source, { Element, URL, requestAnimationFrame: () => 1,
    MutationObserver: class { observe() {} },
    document: { body: {}, documentElement: { dataset: { app } }, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener(type, handler) { listener = handler } },
    window: { addEventListener() {}, location: { origin: 'https://portfolio.test', pathname, hash: '', href: `https://portfolio.test${pathname}`, assign(url) { assigned.push(url) } } },
  })
  listener(event)
  return assigned
}
test('portfolio links open the standalone UniLink document', () => {
  assert.deepEqual(navigate({href:'https://portfolio.test/projects/unilink'}), ['https://portfolio.test/projects/unilink'])
  assert.deepEqual(navigate({href:'https://portfolio.test/projects/landing-app#unilink-concepts'}), ['https://portfolio.test/projects/unilink#unilink-concepts'])
})
test('UniLink returns to the preserved portfolio for home and other projects', () => {
  for (const path of ['/', '/work', '/contact', '/projects/boardgamemate', '/projects/furniture']) {
    assert.deepEqual(navigate({app:'unilink',href:'https://portfolio.test'+path}), [path === '/work' ? '/#featured' : 'https://portfolio.test'+path])
  }
})
test('local section navigation and existing portfolio routes keep their handlers', () => {
  assert.deepEqual(navigate({app:'unilink',href:'https://portfolio.test/projects/unilink#unilink-concepts'}), [])
  assert.deepEqual(navigate({href:'https://portfolio.test/projects/culturelens'}), [])
})
test('external links, downloads and modified clicks retain browser behaviour', () => {
  for (const options of [{metaKey:true},{ctrlKey:true},{shiftKey:true},{altKey:true},{button:1},{target:'_blank'},{download:true},{defaultPrevented:true}]) {
    assert.deepEqual(navigate({href:'https://portfolio.test/projects/unilink',...options}), [])
  }
  assert.deepEqual(navigate({app:'unilink',href:'https://www.figma.com/example'}), [])
})
