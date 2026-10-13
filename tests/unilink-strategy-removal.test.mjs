import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {chapterProjects} from '../public/project-chapters.mjs'
test('UniLink removes Strategy and renumbers its remaining chapters without changing other projects',()=>{
 const source=readFileSync(new URL('../src/pages/UniLinkCaseStudy.tsx',import.meta.url),'utf8')
 assert.ok(!source.includes('One product. Two levels of peer support.'))
 assert.ok(!source.includes('ul-strategy'))
 assert.equal(chapterProjects.unilink.chapters.length,8)
 assert.equal(chapterProjects.unilink.chapters[4][0],'Final Design')
 assert.ok(source.includes('<Heading index={4} title="From a support model'))
 assert.ok(source.includes('<Heading index={7} title="Scope was'))
 assert.ok(chapterProjects.furniture.chapters.some(([c])=>c==='Strategy'))
})
