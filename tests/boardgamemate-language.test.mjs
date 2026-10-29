import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const load = async file => {
  const source = ts.transpileModule(read(file), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
}
const { boardGameMateChinese: copy, boardGameMateVisualCopy: phoneCopy, boardGameMateResearchVisualCopy: researchCopy } = await load('src/i18n/中文版.ts')
const { bgmPhoneVisuals } = await load('src/components/boardgamemate/phone-visuals.ts')
const { personaFrames, earlyInterfaceFrame } = await load('src/components/boardgamemate/research-frames.ts')

test('both BoardGameMate article components have Chinese copy for every rendered text and flow instruction', () => {
  const fields = new Set(['label', 'title', 'goal', 'description', 'principle', 'startInstruction', 'action', 'detail', 'alt'])
  for (const file of ['src/components/BoardGameMateIteration.tsx', 'src/components/BoardGameMateFinalShowcase.tsx']) {
    const source = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const required = new Set()
    const visit = node => {
      if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && ts.isStringLiteralLike(node.arguments[0])) required.add(node.arguments[0].text)
      if (ts.isPropertyAssignment(node) && fields.has(node.name.getText(source)) && ts.isStringLiteralLike(node.initializer)) required.add(node.initializer.text)
      if (ts.isPropertyAssignment(node) && node.name.getText(source) === 'visualJourney' && ts.isArrayLiteralExpression(node.initializer)) node.initializer.elements.forEach(item => { if (ts.isStringLiteralLike(item)) required.add(item.text) })
      ts.forEachChild(node, visit)
    }
    visit(source)
    for (const key of required) assert.ok(copy[key]?.trim(), `Missing Chinese copy in ${file}: ${key}`)
  }
  assert.match(copy['BoardGameMate is a tabletop companion designed to make playing together easier.'], /BoardGameMate/)
  assert.equal(copy['Complete lesson'], '完成本课')
})

test('all 16 final phone screens and 20 guide crops have complete Chinese text within the original image bounds', () => {
  assert.equal(Object.keys(bgmPhoneVisuals).filter(file => !file.startsWith('guides/')).length, 16)
  assert.equal(Object.keys(bgmPhoneVisuals).filter(file => file.startsWith('guides/')).length, 20)
  for (const [file, visual] of Object.entries(bgmPhoneVisuals)) {
    assert.ok(fs.existsSync(new URL('../public/images/boardgamemate/final-ui/' + file, import.meta.url)), file)
    for (const patch of visual.patches) {
      assert.ok(phoneCopy[patch.key]?.trim(), `${file}: missing ${patch.key}`)
      assert.ok(patch.x >= 0 && patch.y >= 0 && patch.width > 0 && patch.height > 0, `${file}: invalid region`)
      assert.ok(patch.x + patch.width <= visual.width && patch.y + patch.height <= visual.height, `${file}: text outside image bounds`)
    }
  }
})

test('Persona and early UI localization is complete; sketches and English images continue using the source exports', () => {
  for (const frame of [...Object.values(personaFrames), earlyInterfaceFrame]) {
    for (const text of frame.texts) assert.ok(researchCopy[text.key]?.trim(), `Missing research text: ${text.key}`)
  }
  const research = read('src/components/boardgamemate/BoardGameMateResearchImage.tsx')
  const phone = read('src/components/boardgamemate/BoardGameMateImage.tsx')
  assert.ok(research.includes('if(!isChinese||!frame)return <img'))
  assert.ok(!research.includes("src.includes('boardgamemate-sketch"))
  assert.ok(phone.includes('if (!isChinese || !visual) return <img {...props} />'))
})

test('BoardGameMate shares the existing language state, translates chapters and keeps the original external Figma prototype', () => {
  const article = read('src/components/BoardGameMateIteration.tsx')
  const showcase = read('src/components/BoardGameMateFinalShowcase.tsx')
  assert.ok(article.includes('<div className="bgm-language-control"><LanguageSwitch /></div>'))
  assert.ok(showcase.includes('<LanguageSwitch />'))
  for (const chapter of ['Overview', 'DISCOVER PHASE', 'Research', 'Early UI', 'Reframe', 'Final Design', 'Outcome']) assert.ok(copy[chapter])
  assert.ok(read('src/components/Layout.tsx').includes('navLabel: boardGameMateChinese[\'BoardGameMate chapters\']'))
  assert.ok(showcase.includes("const FIGMA_FILE_KEY = 'n7Zgb0nVXh4GQt9G4fFqbz'"))
  assert.ok(copy['The original Figma prototype is in English; follow the Chinese guidance alongside it.'])
})
