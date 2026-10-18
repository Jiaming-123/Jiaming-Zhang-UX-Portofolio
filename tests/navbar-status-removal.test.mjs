import test from 'node:test'
import assert from 'node:assert/strict'
import { read } from './helpers/build.mjs'

test('shared navbar and Contact both omit the removed availability status', () => {
  const layout = read('src/components/Layout.tsx')
  assert.ok(!layout.includes('AVAILABLE FOR OPPORTUNITIES'))
  assert.ok(!layout.includes('nav-status'))
  for (const retained of ["aria-label={isChinese ? zh.navigation.menuLabel : 'Main menu'}", "aria-label={isChinese ? zh.navigation.openMenu : 'Open menu'}", "aria-label={isChinese ? zh.navigation.mobileMenu : 'Mobile menu'}", 'className="monogram"']) assert.ok(layout.includes(retained))
  assert.ok(!read('src/pages/InfoPages.tsx').includes('AVAILABLE FOR OPPORTUNITIES'))
  for (const path of ['src/styles.css', 'src/crownlands.css', 'public/project-navbar.css']) assert.ok(!read(path).includes('.nav-status'))
})
