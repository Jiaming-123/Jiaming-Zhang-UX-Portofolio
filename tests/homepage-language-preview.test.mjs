import test from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
import { read, builtJS, builtCSS } from './helpers/build.mjs'

const transpile = source => ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
}).outputText
const moduleURL = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
const chineseModuleURL = moduleURL(transpile(read('src/i18n/中文版.ts')))
const { zh } = await import(chineseModuleURL)

test('language switch keeps the compact centred design and accessible selection state', () => {
  const component = read('src/i18n/Language.tsx')
  const css = read('src/styles/language.css')
  assert.match(component, /role="group"/)
  assert.match(component, /aria-pressed=\{language === 'en'\}/)
  assert.match(component, /aria-pressed=\{language === 'zh'\}/)
  assert.match(component, />ENGLISH<\/button>/)
  assert.ok(component.includes('>{zh.language.name}</button>'))
  assert.equal(zh.language.name, '中文')
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
  const source = transpile(read('src/i18n/homepage.ts')).replaceAll('./中文版', chineseModuleURL)
  const { localizeHomepageProject } = await import(moduleURL(source))
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
  for (const key of ['zh.hero.headline', 'zh.hero.exploreWork', 'zh.hero.designing']) assert.ok(hero.includes(key))
  for (const key of ['zh.home.graduationProject', 'zh.home.selectedLabel', 'zh.common.viewCaseStudy']) assert.ok(home.includes(key))
  for (const key of ['zh.navigation.work', 'zh.navigation.about', 'zh.navigation.contact', 'zh.footer.backToTop', 'zh.footer.role']) assert.ok(layout.includes(key))
  assert.equal(zh.hero.headline, '以设计连接人与产品和系统，创造有意义的互动体验。')
  assert.equal(zh.home.graduationProject, '毕业设计')
  assert.equal(zh.footer.backToTop, '回到顶部')
  assert.ok(builtJS().includes('以设计连接人与产品和系统，创造有意义的互动体验。'))
})

test('footer headline and Hi stay English in Chinese mode, with the original headline typography', () => {
  const hero = read('src/components/Hero.tsx')
  const layout = read('src/components/Layout.tsx')
  const css = read('src/styles/language.css')
  assert.ok(layout.includes('<h2 lang="en">LET&apos;S CREATE<br /><span>MEANINGFUL</span><br />EXPERIENCES.</h2>'))
  assert.ok(!layout.includes('携手创造'))
  assert.ok(hero.includes('>Hi! 👋</motion.span>'))
  assert.ok(hero.includes('isChinese ? zh.hero.intro'))
  assert.ok(zh.hero.intro.startsWith('Hi! 我是'))
  assert.ok(!hero.includes('嗨！'))
  assert.ok(!css.includes('.site-footer[data-pixel-headings] h2'))
})

test('all Chinese website strings are maintained in the single 中文版 file, not components', () => {
  const root = new URL('../src/', import.meta.url)
  const files = fs.readdirSync(root, { recursive: true }).filter(file => /\.tsx?$/.test(file))
  for (const file of files) {
    if (file === path.join('i18n', '中文版.ts')) continue
    const source = ts.createSourceFile(file, fs.readFileSync(new URL(file, root), 'utf8'), ts.ScriptTarget.Latest, true)
    const visit = node => {
      const textNode = ts.isStringLiteralLike(node) || ts.isJsxText(node) || [ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail].includes(node.kind)
      const isModulePath = node.parent && (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent)) && node.parent.moduleSpecifier === node
      if (textNode && !isModulePath) assert.ok(!/[\u3400-\u9fff]/u.test(node.text), `Move Chinese copy in ${file} to src/i18n/中文版.ts: ${node.text}`)
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  assert.equal(zh.common.caseStudyLabel('UniLink'), '查看 UniLink 项目案例')
  assert.ok(read('AGENTS.md').includes('src/i18n/中文版.ts'))
})
