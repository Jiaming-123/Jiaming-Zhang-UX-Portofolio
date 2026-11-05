import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const compiled = ts.transpileModule(read('src/i18n/中文版.ts'), { compilerOptions: { target:ts.ScriptTarget.ES2022, module:ts.ModuleKind.ESNext } }).outputText
const { crownlandsChinese: copy, crownlandsArtifacts: artifacts } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('Crownlands translations cover the article, metadata, action descriptions, component tabs and game labels', () => {
  const required = new Set()
  for (const file of ['src/pages/CrownlandsPage.tsx','src/components/crownlands/CrownlandsElements.tsx','src/components/crownlands/CrownlandsActionCard.tsx','src/components/crownlands/CrownlandsGame.tsx','src/crownlands/boardData.ts']) {
    const ast = ts.createSourceFile(file,read(file),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
    const strings = n => {
      if (ts.isStringLiteralLike(n) && /[A-Za-z]/.test(n.text) && !n.text.includes('/crownlands/') && !/\.(png|webp|jpg)$/.test(n.text)) required.add(n.text)
      ts.forEachChild(n,strings)
    }
    const visit = n => {
      if (ts.isCallExpression(n) && n.expression.getText(ast)==='t') {
        const value = n.arguments[0]
        if (ts.isStringLiteralLike(value)) strings(value)
        if (ts.isConditionalExpression(value)) { strings(value.whenTrue);strings(value.whenFalse) }
      }
      if (ts.isVariableDeclaration(n) && ['actions','items'].includes(n.name.getText(ast))) strings(n.initializer)
      if (ts.isArrayLiteralExpression(n) && ts.isPropertyAccessExpression(n.parent) && n.parent.name.text==='map') strings(n)
      if (ts.isJsxAttribute(n) && ['title','eyebrow','alt'].includes(n.name.getText(ast)) && n.initializer && ts.isStringLiteral(n.initializer) && n.initializer.text) required.add(n.initializer.text)
      if (ts.isPropertyAssignment(n) && n.name.getText(ast)==='label' && ts.isStringLiteral(n.initializer)) strings(n.initializer)
      if (ts.isJsxText(n) && /[A-Za-z]/.test(n.text)) assert.equal(n.text.trim(),'CROWNLANDS',`Untranslated visible text: ${n.text}`)
      ts.forEachChild(n,visit)
    }
    visit(ast)
  }
  assert.ok(required.size > 200)
  for (const key of required) assert.ok(copy[key]?.trim(),`Missing translation: ${key}`)
})

test('Chinese rules and cards retain numerical limits and original English artwork remains available', () => {
  for (const action of ['REINFORCE','EXPAND','REPOSITION','CONTEST']) assert.ok(artifacts.action[action].includes('2'))
  assert.equal(artifacts.rules.round.length,6)
  assert.ok(artifacts.rules.scoring.includes('村庄 1 分，兵营 2 分，中央王城 4 分'))
  assert.ok(artifacts.rules.setup[1].includes('7'))
  assert.ok(artifacts.rules.setup[2].includes('5'))
  const page=read('src/pages/CrownlandsPage.tsx')
  assert.ok(page.includes("isChinese ? '/crownlands/zh/rules-01.webp'"))
  assert.ok(page.includes("isChinese ? '/crownlands/zh/rules-02.webp'"))
  assert.ok(page.includes('/crownlands/rules/rules-01.jpg'))
  assert.ok(page.includes("isChinese ? '/crownlands/zh/sellsheet.webp'"))
  const cards=read('src/components/crownlands/CrownlandsActionCard.tsx')
  assert.ok(cards.includes('isChinese ? `/crownlands/zh/${name}.webp` : `/crownlands/elements/${name}.webp`'))
  assert.ok(!page.includes('CrownlandsChineseArtifacts'))
  for (const name of ['rules-01','rules-02','sellsheet','reinforce','expand','reposition','contest','tracker']) {
    assert.ok(fs.statSync(new URL(`../public/crownlands/zh/${name}.webp`,import.meta.url)).size > 1000)
  }
  assert.ok(read('src/i18n/crownlands.ts').includes('Match state retains its original English messages'))
  assert.ok(page.includes('<div className="crownlands-language-control"><LanguageSwitch /></div>'))
})
