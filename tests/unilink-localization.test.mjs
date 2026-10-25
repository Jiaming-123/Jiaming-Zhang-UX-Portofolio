import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const load = async path => import('data:text/javascript;base64,' + Buffer.from(ts.transpileModule(read(path), {
  compilerOptions: { target:ts.ScriptTarget.ES2022, module:ts.ModuleKind.ES2022 },
}).outputText).toString('base64'))
const { unilinkChinese:copy, unilinkVisualCopy:visualCopy } = await load('src/i18n/中文版.ts')
const { flows, insights, iterations, chapters, recoveryScreens, supplementaryScreens } = await load('src/data/unilink.ts')
const { visualTranslations } = await load('src/components/unilink/visual-translations.ts')
const { nativePhoneFrames } = await load('src/components/unilink/native-phone-frames.ts')
const { nativeConceptFrames } = await load('src/components/unilink/native-concept-frames.ts')

test('all chapter names, flow explanations and evaluation evidence have reviewed Chinese copy', () => {
  const strings = [
    ...chapters,
    ...flows.flatMap(flow => [flow.label,flow.title,flow.intro,...flow.screens.flatMap(screen => [screen.title,screen.why])]),
    ...insights.flat(),...iterations.flatMap(Object.values),
    ...recoveryScreens.flatMap(screen => [screen.title,screen.why]),
    ...supplementaryScreens.flatMap(screen => [screen.title,screen.caption]),
  ]
  const properNames = new Set(['Link Points'])
  for (const text of strings) if (!properNames.has(text)) {
    assert.ok(copy[text], `Missing translation: ${text}`)
    assert.match(copy[text], /[\u3400-\u9fff]/u)
  }
})

test('every primary interface and non-exempt illustration has complete text-layer data', () => {
  const paths = [...flows.flatMap(flow=>flow.screens.map(screen=>screen.path)),
    'persona-student-20261025.png','persona-mentor-20261025.png','user-journey-20261025.webp','sus-score-76-7-20261018.webp',
    ...['navi-ai-guide','same-speak','do-it-together','recap-school','uni-matcher','sure-u'].map(id=>`early-design/${id}.webp`),
  ]
  for (const path of paths) {
    const visual=visualTranslations[path]
    assert.ok(visual,`Missing image localization: ${path}`)
    for (const patch of visual.patches) {
      assert.ok(visualCopy[patch.key],`Missing visual text: ${path}: ${patch.key}`)
      assert.ok(patch.x>=0 && patch.y>=0 && patch.x+patch.width<=visual.width && patch.y+patch.height<=visual.height, `Text outside artwork: ${path}: ${patch.key}`)
    }
  }
  const page = read('src/pages/UniLinkCaseStudy.tsx')
  assert.match(page,/items=\{supplementaryScreens\} preserveEnglishImages/)
  assert.match(page,/items=\{recoveryArtifacts\} preserveEnglishImages/)
})

test('English artwork and wording remain the default, with Chinese text in the central file', () => {
  const component=read('src/components/unilink/TranslatedImage.tsx')
  assert.match(component,/if \(!isChinese \|\| !visual\) return <img/)
  const hook=read('src/i18n/unilink.ts')
  assert.match(hook,/isChinese \? unilinkChinese\[text\] \?\? text : text/)
  const css=read('src/styles/unilink-translation.css')
  assert.match(css,/\.ul-screen-window>\.ul-translated-image[^}]*max-height:100%/)
  assert.match(css,/\.ul-stage-zoom figure>button>\.ul-translated-image \{ display:none/)
})

test('every Chinese UI uses continuous surfaces and one clock, with footer text above the floating navigation', () => {
  for (const screen of flows.flatMap(flow=>flow.screens)) {
    assert.ok(nativePhoneFrames[screen.path], `UI must be rebuilt without text masks: ${screen.path}`)
    const clocks=visualTranslations[screen.path].patches.filter(p=>p.key.startsWith('phone.time')&&p.x<100&&p.y<100)
    assert.equal(clocks.length,1,`Exactly one clock: ${screen.path}`)
  }
  for (const id of ['navi-ai-guide','same-speak','do-it-together','recap-school','uni-matcher','sure-u']) assert.ok(nativeConceptFrames[`early-design/${id}.webp`])
  for (const [path,key] of [['during-service/complete.png','phone.next3'],['during-service/feedback.png','phone.reviewPartial']]) {
    const patch=visualTranslations[path].patches.find(p=>p.key===key)
    assert.ok(patch.y+patch.height<=1506,`${key} must end above the raised centre button`)
  }
  assert.match(read('src/components/unilink/TranslatedImage.tsx'),/bubble-\$\{index\}/)
})
