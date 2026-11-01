import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const compiled = ts.transpileModule(read('src/i18n/中文版.ts'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
const { furnitureChinese: copy } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('Furniture translation covers article text, dynamic cards, audit rows and image descriptions', () => {
  const file = 'src/components/FurnitureCaseStudy.tsx'
  const source = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const required = new Set()
  const addStrings = node => {
    if (ts.isStringLiteralLike(node)) required.add(node.text)
    ts.forEachChild(node, addStrings)
  }
  const visit = node => {
    if (ts.isCallExpression(node) && node.expression.getText(source) === 't') {
      if (ts.isStringLiteralLike(node.arguments[0])) required.add(node.arguments[0].text)
      if (ts.isConditionalExpression(node.arguments[0])) {
        addStrings(node.arguments[0].whenTrue)
        addStrings(node.arguments[0].whenFalse)
      }
    }
    if (ts.isPropertyAssignment(node) && ['title', 'question', 'alt', 'note'].includes(node.name.getText(source)) && ts.isStringLiteralLike(node.initializer)) required.add(node.initializer.text)
    if (ts.isVariableDeclaration(node) && ['auditRows'].includes(node.name.getText(source))) addStrings(node.initializer)
    if (ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, ' ').trim()
      if (/[A-Za-z]/.test(value)) assert.equal(value, 'Figma · React · TypeScript · CSS · Codex · ChatGPT · Vercel', `Untranslated visible text: ${value}`)
    }
    if (ts.isJsxAttribute(node) && ['alt', 'aria-label'].includes(node.name.getText(source))) assert.ok(!node.initializer || !ts.isStringLiteral(node.initializer), `Untranslated accessibility text: ${node.getText(source)}`)
    ts.forEachChild(node, visit)
  }
  visit(source)
  for (const key of ['Visual hierarchy', 'Interaction clarity', 'Responsive consistency', 'Conversion confidence']) required.add(key)
  assert.ok(required.size > 150)
  for (const key of required) assert.ok(copy[key]?.trim(), `Missing Furniture translation: ${key}`)
})

test('Furniture chapters and persistent compact language control use the existing shared language state', () => {
  const article = read('src/components/FurnitureCaseStudy.tsx')
  const hook = read('src/i18n/furniture.ts')
  const layout = read('src/components/Layout.tsx')
  assert.ok(article.includes('<div className="furniture-language-control"><LanguageSwitch /></div>'))
  assert.ok(hook.includes('useLanguage()'))
  assert.ok(hook.includes('isChinese ? furnitureChinese[text] ?? text : text'))
  for (const key of ['Overview', 'Audit', 'Strategy', 'Process', 'Architecture', 'Experience', 'Interaction', 'Build', 'Testing', 'Outcome', 'My Furniture Store chapters', 'NEXT PROJECT']) assert.ok(copy[key], key)
  assert.ok(layout.includes("navLabel: furnitureChinese['My Furniture Store chapters']"))
  assert.ok(read('src/styles/language.css').includes('body:has(.case-chapter-nav[data-project="furniture"].is-visible) .furniture-language-control'))
})

test('Furniture hero retains the original poster and live prototype while localizing its link and alt text', () => {
  const source = read('src/pages/ProjectPage.tsx')
  const hero = source.split('function FurnitureHero()')[1].split('function NextProject')[0]
  assert.ok(hero.includes('hero-group38-20261013.png'))
  assert.ok(hero.includes('https://my-furniture-store-delta.vercel.app/'))
  assert.ok(hero.includes('alt={t('))
  assert.ok(hero.includes("t('Link to explore My Furniture Store full website')"))
  assert.ok(copy['Link to explore My Furniture Store full website'].includes('My Furniture Store'))
  assert.ok(source.includes("theme === 'furniture' ? furnitureChinese['NEXT PROJECT']"))
})
