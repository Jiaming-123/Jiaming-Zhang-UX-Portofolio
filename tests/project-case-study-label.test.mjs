import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = fs.readFileSync(path.join(repo, 'src/pages/ProjectPage.tsx'), 'utf8')
const manifest = JSON.parse(fs.readFileSync(path.join(repo, 'docs/production-restoration-manifest.json'), 'utf8'))
const entry = fs.readFileSync(path.join(repo, 'dist-production', manifest.portfolioEntry), 'utf8')

test('shared source heroes omit the numbered case-study label but retain project metadata', () => {
  assert.ok(!source.includes('<span>CASE STUDY · {project.number} / 05</span>'))
  assert.ok(source.includes('<span>{project.eyebrow.toUpperCase()} / {project.year}</span>'))
  assert.ok(source.includes('<h1>{project.title.toUpperCase()}</h1>'))
})

test('the active production entry omits the numbered label, retaining metadata and case-study buttons', () => {
  assert.ok(!entry.includes('"CASE STUDY · "'))
  assert.ok(entry.includes('className:"project-hero-top",children:[l.jsxs("span",{children:[t.eyebrow.toUpperCase()," / ",t.year]}),null]'))
  assert.ok(entry.includes('VIEW CASE STUDY'))
})
