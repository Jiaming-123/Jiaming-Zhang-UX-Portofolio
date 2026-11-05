import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const read = file => fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const compiled = ts.transpileModule(read('src/i18n/中文版.ts'), { compilerOptions: { module:ts.ModuleKind.ESNext } }).outputText
const { crownlandsVideoSubtitles:cues } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('Crownlands subtitles cover the film with ordered, readable Chinese cues', () => {
  assert.equal(cues.length,30)
  let previousEnd=0
  for (const [start,end,copy] of cues) {
    assert.ok(start>=previousEnd && end>start && end<=89.47)
    assert.ok(/[\u3400-\u9fff]/.test(copy))
    assert.ok(copy.split('\n').every(line=>line.length<=30))
    previousEnd=end
  }
  assert.ok(cues[0][0]<0.5 && previousEnd>89)
  const text=cues.map(c=>c[2]).join(' ')
  for (const word of ['Crownlands','八轮','村庄','兵营','王城','增援','扩张','调动','争夺','并列','补给格','事件格']) assert.ok(text.includes(word))
})

test('Chinese film has faststart metadata and language switching preserves playback', () => {
  const media=fs.readFileSync(new URL('../public/crownlands/video/introduction-zh-20261105.mp4',import.meta.url))
  const atoms=[]
  for (let offset=0;offset+8<=media.length;) {
    let size=media.readUInt32BE(offset)
    if (size===1) size=Number(media.readBigUInt64BE(offset+8))
    if (!size) break
    atoms.push(media.toString('ascii',offset+4,offset+8))
    offset+=size
  }
  assert.ok(atoms.indexOf('moov')>=0 && atoms.indexOf('moov')<atoms.indexOf('mdat'))
  assert.ok(media.length<fs.statSync(new URL('../public/crownlands/video/introduction.mp4',import.meta.url)).size)
  const page=read('src/pages/CrownlandsPage.tsx')
  assert.ok(page.includes("isChinese ? '/crownlands/video/introduction-zh-20261105.mp4' : '/crownlands/video/introduction.mp4'"))
  assert.ok(page.includes('onLoadedMetadata={restorePlayback}'))
  assert.ok(page.includes('player.currentTime = Math.min(resume.time'))
  assert.ok(page.includes('if (resume.playing)'))
})
