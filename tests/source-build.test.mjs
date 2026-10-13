import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { read, builtJS, builtCSS } from './helpers/build.mjs'

const main = builtJS()
const culture = builtJS('src/pages/CultureLensCaseStudy.tsx')
const crown = builtJS('src/pages/CrownlandsPage.tsx')
const repo = new URL('../', import.meta.url)
const bytes = file => fs.readFileSync(new URL(file, repo))

test('every production page is built from repository-local React source', () => {
  const manifest = JSON.parse(read('docs/production-restoration-manifest.json'))
  assert.equal(manifest.buildMode, 'react-source')
  assert.deepEqual(manifest.sourceEntries, ['src/main.tsx', 'src/unilink-entry.tsx'])
  assert.ok(!fs.existsSync(new URL('production-baseline', repo)))
  const stage = read('scripts/stage-production.mjs')
  assert.ok(!stage.includes('production-baseline'))
  assert.ok(!stage.includes('replaceOnce'))
  const config = JSON.parse(read('vercel.json'))
  assert.equal(config.buildCommand, 'npm run build')
  assert.equal(config.outputDirectory, 'dist-production')
  assert.ok(config.rewrites.some(r => r.source === '/projects/unilink' && r.destination === '/projects/unilink/index.html'))
  for (const folder of ['scripts','tests']) for (const file of fs.readdirSync(new URL(folder + '/',repo))) {
    if (!file.endsWith('.mjs')) continue
    assert.ok(!read(folder + '/' + file).includes('/Documents/' + 'Codex/'), file)
  }
})

test('homepage source uses the live layout and four-project grid, not the older design', () => {
  const source = read('src/pages/HomePage.tsx')
  for (const text of ['home-landing-project','home-landing-heading','home-landing-title-row','home-project-grid','<h1>UniLink</h1>']) assert.ok(source.includes(text), text)
  assert.ok(source.includes('[projects[1], projects[3], projects[2], projects[4]]'))
  assert.ok(!source.includes('featured-heading'))
  assert.ok(!read('src/components/Content.tsx').includes('LandingDemo'))
  assert.ok(!read('src/pages/InfoPages.tsx').includes('VisualsPage'))
  assert.ok(!read('src/data/projects.ts').includes('finalExperience'))
})

test('case studies omit footers; Home and About retain them; Contact does not duplicate them', () => {
  assert.ok(read('src/components/Layout.tsx').includes("if (pathname.startsWith('/projects/')) return null"))
  assert.ok(main.includes('.startsWith("/projects/")'))
  assert.ok(read('src/pages/HomePage.tsx').includes('<Footer />'))
  const info = read('src/pages/InfoPages.tsx')
  const about = info.slice(info.indexOf('export function AboutPage()'), info.indexOf('export function ContactPage()'))
  const contact = info.slice(info.indexOf('export function ContactPage()'), info.indexOf('export function NotFoundPage()'))
  assert.ok(about.includes('<Footer />'))
  assert.ok(!contact.includes('<Footer'))
  for (const text of ['contact-page','contact-note','jiamingz1113@163.com','jiamingz1113@gmail.com','LINKEDIN','site-footer','case-next-project']) assert.ok(main.includes(text), text)
})

test('numbered case-study labels remain removed without losing project metadata', () => {
  assert.ok(!main.includes('CASE STUDY · '))
  assert.ok(!culture.includes('SELECTED CASE STUDY / 03'))
  assert.ok(main.includes('furniture-poster-hero'))
  assert.ok(main.includes('End-to-end commerce website redesign / 2025'))
  assert.ok(main.includes('VIEW CASE STUDY'))
  assert.ok(culture.includes('— Agentic Museum Concierge'))
  assert.ok(culture.includes('PROJECT OVERVIEW'))
})

const covers = JSON.parse(read('src/data/homepage-covers.json'))
for (const [slug, cover] of Object.entries(covers)) test(slug + ': latest signed cover and dimensions are retained', () => {
  const image = bytes('public' + cover.src)
  assert.ok(image.length <= 2_000_000)
  assert.equal(image.toString('ascii',0,4), 'RIFF')
  assert.equal(image.toString('ascii',8,12), 'WEBP')
  for (const directory of ['dist-production','.vercel/output/static']) assert.deepEqual(bytes(directory + cover.src), image)
  for (const value of [cover.src,cover.alt]) assert.ok(main.includes(value), value)
  assert.ok(main.includes('width:' + cover.width))
  assert.ok(main.includes('height:' + cover.height))
})

test('case-study artwork and rule sheets are copied without altering their bytes', () => {
  for (const file of ['media/culturelens/culturelens-cover-agentic-20260914.webp','images/crownlands-cover.png','images/furniture/myfurniturestore-cover.png','images/boardgamemate/boardgamemate-cover.png','crownlands/rules/rules-01.jpg','crownlands/rules/rules-02.jpg']) assert.deepEqual(bytes('dist-production/' + file), bytes('public/' + file), file)
  assert.ok(!main.includes('boardgamemate-cover-signature'))
  assert.match(covers.boardgamemate.alt, /2024 · BoardGameMate/)
})

test('Crownlands restores the real game and native scrolling rules, without its deleted credit', () => {
  const source = read('src/pages/CrownlandsPage.tsx')
  assert.ok(source.includes('data-lenis-prevent tabIndex={0} role="dialog"'))
  assert.ok(source.includes('<CrownlandsGame'))
  assert.ok(crown.includes('cl-rules-modal'))
  assert.ok(crown.includes('data-lenis-prevent'))
  assert.ok(crown.includes('tabIndex:0'))
  assert.equal(crown.split('What We Wanted Players to Feel').length - 1, 1)
  for (const text of ['Experience North Star','cl-credit','/CREDITS.md','Project assets supplied by the Crownlands design team']) assert.ok(!crown.includes(text), text)
  for (const text of ['Start match','Next round','Play again','REINFORCE','EXPAND','CONTEST','REPOSITION']) assert.ok(crown.includes(text), text)
})

test('CultureLens retains original evidence but excludes the removed simulation and Test chapter', () => {
  for (const text of ['#culturelens-simulation','AGENT / ARCHITECTURE & INTERACTION','React simulation above','Make the next move.']) assert.ok(!culture.includes(text), text)
  for (const text of ['culturelens-chapter-nav','AGENT / ORIGINAL VOICEFLOW BUILD','THE ORIGINAL VOICEFLOW BUILD','The recordings document the original Voiceflow project.','Leave the meaningful decisions with people.']) assert.ok(culture.includes(text), text)
  assert.ok(!fs.existsSync(new URL('src/components/culturelens/AgentSimulation.tsx',repo)))
  assert.ok(!read('src/pages/CultureLensCaseStudy.tsx').includes('<Chapter id="test"'))
  assert.ok(read('src/pages/CultureLensCaseStudy.tsx').includes('<PrototypeEvidence />'))
  assert.ok(read('src/pages/CultureLensCaseStudy.tsx').includes('<ConversationEvidence />'))
})

test('only generated CultureLens images receive their readable corner disclosure', () => {
  const visual = read('src/components/culturelens/ConceptVisual.tsx')
  assert.match(visual, /<span className="culturelens-cv-badge" lang="en">AI-generated concept image<\/span>/)
  assert.ok(!read('src/components/culturelens/ProcessEvidence.tsx').includes('culturelens-cv-badge'))
  assert.equal(culture.split('AI-generated concept image').length - 1, 1)
  for (const image of ['culturelens-xr-scenario.webp','culturelens-xr-system.webp','culturelens-museband-scenario.webp','culturelens-museband-product-projection-20260914.webp']) assert.ok(culture.includes(image), image)
  for (const disclosure of ['AI-generated later iteration','AI-generated head-worn concept','Not manufactured or optically validated hardware.']) assert.ok(culture.includes(disclosure), disclosure)
  const css = read('public/culturelens-ai-image-label.css')
  assert.match(css, /inset: auto 12px 12px auto/)
  assert.match(css, /inset: auto 8px 8px auto/)
  assert.match(css, /pointer-events: none/)
  assert.ok((builtCSS() + builtCSS('src/pages/CultureLensCaseStudy.tsx')).includes('.culturelens-cv-badge'))
})
