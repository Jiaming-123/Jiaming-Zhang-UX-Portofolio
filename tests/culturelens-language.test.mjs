import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const compiled = ts.transpileModule(read('src/i18n/中文版.ts'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
const { cultureLensChinese: copy, cultureLensConversations: conversations } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('CultureLens covers every chapter, interactive data state, image description and visible caption', () => {
  const required = new Set()
  const files = ['src/pages/CultureLensCaseStudy.tsx', ...['CaseStudyModules', 'ConceptVisual', 'ProcessEvidence'].map(name => `src/components/culturelens/${name}.tsx`), 'src/data/cultureLensData.ts']
  const names = new Set(['chapters', 'signals', 'journey', 'transfers', 'blueprint', 'panels', 'stages', 'features', 'labels'])
  const fields = new Set(['name', 'detail', 'consequence', 'title', 'short', 'layer', 'thesis', 'stage', 'why', 'label', 'text', 'nodes', 'rows'])
  const properNames = new Set(['Culture', 'Lens', 'CultureLens', 'MuseBand', 'Crownlands', 'C', 'L'])
  for (const file of files) {
    const source = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const strings = node => {
      if (ts.isStringLiteralLike(node) && /[A-Za-z]/.test(node.text)) required.add(node.text)
      ts.forEachChild(node, strings)
    }
    const visit = node => {
      if (ts.isCallExpression(node) && node.expression.getText(source) === 't') strings(node.arguments[0])
      if (ts.isJsxAttribute(node) && ['title', 'label', 'alt'].includes(node.name.getText(source)) && node.initializer && ts.isStringLiteral(node.initializer)) required.add(node.initializer.text)
      if (ts.isPropertyAssignment(node) && fields.has(node.name.getText(source))) strings(node.initializer)
      if (ts.isVariableDeclaration(node) && names.has(node.name.getText(source))) strings(node.initializer)
      if (ts.isArrayLiteralExpression(node) && node.elements.length === 3 && node.elements.every(ts.isStringLiteral) && node.elements[1].text.startsWith('/media/')) {
        required.add(node.elements[0].text); required.add(node.elements[2].text)
      }
      if (ts.isJsxText(node) && /[A-Za-z]/.test(node.text)) assert.ok(properNames.has(node.text.trim()), `Untranslated visible text: ${node.text}`)
      if (ts.isJsxAttribute(node) && ['aria-label', 'alt'].includes(node.name.getText(source))) assert.ok(!node.initializer || !ts.isStringLiteral(node.initializer), `Untranslated accessible text: ${node.getText(source)}`)
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  assert.ok(required.size > 260)
  for (const key of required) assert.ok(copy[key]?.trim(), `Missing CultureLens translation: ${key}`)
})

test('Language switching keeps stable anchors and uses the shared persistent language state', () => {
  const page = read('src/pages/CultureLensCaseStudy.tsx')
  assert.ok(page.includes('<div className="culturelens-language-control"><LanguageSwitch /></div>'))
  assert.ok(page.includes('href={`#culturelens-${label.toLowerCase()}`}'))
  assert.ok(page.includes('aria-current={active === label.toLowerCase()'))
  assert.ok(read('src/components/Layout.tsx').includes("navLabel: cultureLensChinese['CultureLens case study chapters']"))
  assert.ok(read('src/i18n/culturelens.ts').includes('isChinese ? cultureLensChinese[context ?? text] ?? cultureLensChinese[text] ?? text : text'))
})

test('Translated conversations reflow as whole bubbles; original sketches and English evidence stay available', () => {
  assert.deepEqual(Object.keys(conversations), ['voiceflow-request', 'voiceflow-recommendation', 'voiceflow-confirmation'])
  assert.ok(conversations['voiceflow-confirmation'].paragraphs.join(' ').includes('$40'))
  assert.equal(conversations['voiceflow-request'].choices.length, 6)
  assert.equal(conversations['voiceflow-confirmation'].choices.length, 3)
  const media = read('src/components/culturelens/ProcessEvidence.tsx')
  assert.ok(media.includes('if (isChinese && cultureLensConversations[file])'))
  assert.ok(media.includes('src={`${base}${file}.webp`}'))
  for (const sketch of ['idea-portfolio', 'draft-storyboard', 'xr-original-sketch']) assert.ok(media.includes(`file="${sketch}"`))
  const translated = read('src/components/culturelens/ConversationTranslation.tsx')
  assert.ok(!translated.includes('<img'))
  assert.ok(translated.includes('conversation.paragraphs.map'))
  assert.ok(read('src/styles/culturelens-process.css').includes('white-space:pre-line'))
})
