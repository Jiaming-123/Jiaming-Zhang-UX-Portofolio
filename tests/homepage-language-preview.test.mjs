import test from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'
import { read, builtJS, builtCSS } from './helpers/build.mjs'

test('language switch keeps the compact centred design and accessible selection state', () => {
  const component = read('src/i18n/Language.tsx')
  const css = read('src/styles/language.css')
  assert.match(component, /role="group"/)
  assert.match(component, /aria-pressed=\{language === 'en'\}/)
  assert.match(component, /aria-pressed=\{language === 'zh'\}/)
  assert.match(component, />ENGLISH<\/button>/)
  assert.match(component, />中文<\/button>/)
  assert.match(css, /\.language-switch \{[^}]*left:50%;[^}]*width:112px;[^}]*padding:3px;/)
  assert.match(css, /\.language-switch button \{[^}]*min-height:22px;/)
  assert.match(css, /\.language-switch button:focus-visible/)
  assert.ok(!css.includes('width:170px'))
  assert.ok(builtCSS().includes('width:112px'))
})

test('language is shared by both documents, safely persisted and cleaned up', () => {
  const provider = read('src/i18n/Language.tsx')
  for (const entry of ['src/main.tsx', 'src/unilink-entry.tsx']) {
    assert.ok(read(entry).includes('<LanguageProvider>'))
  }
  assert.ok(provider.includes("const storageKey = 'portfolio.language.v1'"))
  assert.ok(provider.includes('useState<Language>(readLanguage)'))
  assert.ok(provider.includes("document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'"))
  assert.ok(provider.includes('try { localStorage.setItem(storageKey, language) } catch'))
  assert.ok(provider.includes("window.removeEventListener('storage', syncLanguage)"))
})

test('Chinese project descriptions preserve names, links, covers and original English data', async () => {
  const source = ts.transpileModule(read('src/i18n/homepage.ts'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
  }).outputText
  const { localizeHomepageProject } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
  const names = {
    unilink: 'UniLink', boardgamemate: 'BoardGameMate', furniture: 'My Furniture Store',
    culturelens: 'CultureLens Concierge', crownlands: 'Crownlands',
  }
  for (const [slug, name] of Object.entries(names)) {
    const original = Object.freeze({ slug, name, summary: 'English summary', categories: ['English category'], cover: '/original.webp', number: '01' })
    const localized = localizeHomepageProject(original, 'zh')
    assert.equal(localized.name, name)
    assert.equal(localized.slug, slug)
    assert.equal(localized.cover, original.cover)
    assert.equal(localized.number, original.number)
    assert.match(localized.summary, /[\u4e00-\u9fff]/)
    assert.ok(localized.categories.every(category => /[\u4e00-\u9fff]/.test(category)))
    assert.equal(original.summary, 'English summary')
    assert.equal(localizeHomepageProject(original, 'en'), original)
  }
})

test('homepage, common navigation and footer include the reviewed Chinese copy', () => {
  const hero = read('src/components/Hero.tsx')
  const home = read('src/pages/HomePage.tsx')
  const layout = read('src/components/Layout.tsx')
  for (const text of ['以设计连接人与产品和系统，创造有意义的互动体验。', '探索作品', '设计领域']) assert.ok(hero.includes(text))
  for (const text of ['毕业设计', '以设计贯通界面、系统与服务', '查看项目案例']) assert.ok(home.includes(text))
  for (const text of ["zh: '作品'", "zh: '关于'", "zh: '联系'", '回到顶部', '用户体验／产品设计师']) assert.ok(layout.includes(text))
  assert.ok(builtJS().includes('以设计连接人与产品和系统，创造有意义的互动体验。'))
})

test('footer headline and Hi stay English in Chinese mode, with the original headline typography', () => {
  const hero = read('src/components/Hero.tsx')
  const layout = read('src/components/Layout.tsx')
  const css = read('src/styles/language.css')
  assert.ok(layout.includes('<h2 lang="en">LET&apos;S CREATE<br /><span>MEANINGFUL</span><br />EXPERIENCES.</h2>'))
  assert.ok(!layout.includes('携手创造'))
  assert.ok(hero.includes('>Hi! 👋</motion.span>'))
  assert.ok(hero.includes("isChinese ? 'Hi! 我是"))
  assert.ok(!hero.includes('嗨！'))
  assert.ok(!css.includes('.site-footer[data-pixel-headings] h2'))
})
