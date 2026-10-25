import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
test('UniLink removes the entire shared design language block while retaining final flows and ownership',()=>{
 const source=readFileSync(new URL('../src/pages/UniLinkCaseStudy.tsx',import.meta.url),'utf8')
 for(const text of ['A SHARED DESIGN LANGUAGE','Consistency across a six-person design team.','ul-system-strip','component-library export is pending']) assert.ok(!source.includes(text))
 assert.ok(source.includes('flows.map(flow=><FeatureStory'))
 assert.ok(source.includes('<Contribution label={t("Design ownership")}>'))
 assert.ok(source.includes('Testing both sides of the service.'))
})
