import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const baseline = path.join(repo, 'production-baseline')
const target = path.join(repo, 'dist-production')
const hash = data => createHash('sha256').update(data).digest('hex')
const baselineEntry = 'assets/index-UniLinkEmpty-20260925.js'
const expected = {
  'index.html': '9017e47d03941ae55e935dbf66e9e4a89cf5b6c0427c00b0aae8c8779979fec7',
  [baselineEntry]: '7a9e265f4a9ab82ec5c618b7aa17fb10861aacfdb56cf2264667498b9b8997a8',
  'assets/index-LtrsLnHK.css': '9f9968fbc669d891ddcbcc5fcd53110f951328ea501efa1ecc731621d927353f',
}
for (const [file, digest] of Object.entries(expected)) {
  if (hash(fs.readFileSync(path.join(baseline, file))) !== digest) throw new Error(`Production baseline changed: ${file}. Review the newer baseline before publishing.`)
}
const uniLinkHtml = fs.readFileSync(path.join(repo, 'dist-unilink/unilink.html'), 'utf8')
if (!uniLinkHtml.includes('data-app="unilink"')) throw new Error('Build the standalone UniLink entry first.')
fs.rmSync(target, { recursive: true, force: true })
fs.cpSync(baseline, target, { recursive: true })

let entry = fs.readFileSync(path.join(baseline, baselineEntry), 'utf8')
const replaceOnce = (before, after) => {
  if (entry.split(before).length !== 2) throw new Error(`Ambiguous baseline patch: ${before.slice(0, 80)}`)
  entry = entry.replace(before, after)
}
// Case studies end at Next Project; retain the shared footer on Home and About.
replaceOnce('function oa(){', 'function oa(){const {pathname:footerPath}=Ji();if(footerPath.startsWith("/projects/"))return null;')
// Remove only the two requested About sections; retain profile and capabilities.
replaceOnce('l.jsxs("header",{className:"page-hero about-hero",children:[l.jsx("span",{className:"page-eyebrow",children:"ABOUT / JIAMING ZHANG"}),l.jsxs("h1",{children:["CURIOUS",l.jsx("br",{}),"BY ",l.jsx("span",{children:"DESIGN."})]}),l.jsx("p",{children:"I design meaningful interactions between people, products, and systems."})]}),', '')
replaceOnce('l.jsx("section",{className:"principle-block",children:l.jsxs(pe,{children:[l.jsx("span",{children:"MY APPROACH"}),l.jsx("blockquote",{children:"“Make the system understandable. Make the interaction purposeful. Make the experience feel human.”"})]})})', 'null')
// Remove the numbered case-study label from every shared project hero.
replaceOnce('l.jsxs("span",{children:["CASE STUDY · ",t.number," / 05"]})', 'null')
// Share the same navbar visibility logic with the standalone UniLink entry.
const chapterSource = fs.readFileSync(path.join(repo, 'public/project-chapters.mjs'), 'utf8')
const chapterFile = `assets/project-chapters-${hash(chapterSource).slice(0,12)}.mjs`
fs.writeFileSync(path.join(target, chapterFile), chapterSource)
const navbarSource = fs.readFileSync(path.join(repo, 'public/project-navbar.mjs'), 'utf8').replace('./project-chapters.mjs', `./${path.basename(chapterFile)}`)
const navbarFile = `assets/project-navbar-${hash(navbarSource).slice(0,12)}.mjs`
fs.writeFileSync(path.join(target, navbarFile), navbarSource)
replaceOnce('function rA(){const[t,e]=E.useState(!1),[n,r]=E.useState(!1),{pathname:i}=Ji();', 'function rA(){const[t,e]=E.useState(!1),[n,r]=E.useState(!1),[navHidden,setNavHidden]=E.useState(!1),{pathname:i}=Ji();E.useEffect(()=>setupProjectNavbar(i,setNavHidden),[i]);')
replaceOnce('className:`nav-shell ${n?"is-compact":""}`', 'className:`nav-shell ${n?"is-compact":""} ${navHidden?"ul-nav-hidden":""}`')
entry = `import { setupProjectNavbar } from "./${path.basename(navbarFile)}";\n${entry}`
// Home cards share the source implementation: trigger inside the viewport,
// animate once, respect reduced motion, and stop observing after entry.
const revealSource = fs.readFileSync(path.join(repo, 'public/home-project-reveal.mjs'), 'utf8')
const revealFile = `assets/home-project-reveal-${hash(revealSource).slice(0,12)}.mjs`
fs.writeFileSync(path.join(target, revealFile), revealSource)
entry = `import { observeProjectReveal } from "./${path.basename(revealFile)}";\n${entry}`
replaceOnce('function pe({children:t,className:e=""}){', 'function pe({children:t,className:e="",variant:v="default"}){')
replaceOnce('function pe({children:t,className:e="",variant:v="default"}){const n=E.useRef(null),[r,i]=E.useState(!1);return E.useEffect(()=>{const s=n.current;if(!s)return;', 'function pe({children:t,className:e="",variant:v="default"}){const n=E.useRef(null),[r,i]=E.useState(!1);return E.useEffect(()=>{const s=n.current;if(!s)return;if(v==="project")return observeProjectReveal(s,()=>i(!0));')
replaceOnce('return o.observe(s),()=>o.disconnect()},[]),l.jsx("div",{ref:n,className:`reveal-block${r?" is-visible":""}${e?` ${e}`:""}`', 'return o.observe(s),()=>o.disconnect()},[v]),l.jsx("div",{ref:n,className:`reveal-block${v==="project"?" home-project-reveal":""}${r?" is-visible":""}${e?` ${e}`:""}`')
replaceOnce('l.jsxs(pe,{children:[l.jsxs("div",{className:"home-landing-heading"', 'l.jsxs("div",{className:"reveal-block is-visible home-featured-content",children:[l.jsxs("div",{className:"home-landing-heading"')
replaceOnce('children:e.map((n,r)=>l.jsx(pe,{children:l.jsx(Mj,{project:{...n,number:String(r+1).padStart(2,"0")}})},n.slug))', 'children:e.map((n,r)=>l.jsx(pe,{variant:"project",children:l.jsx(Mj,{project:{...n,number:String(r+1).padStart(2,"0")}})},n.slug))')
const featuredGlowStart = entry.indexOf('l.jsx(Nj,{className:"featured-border-glow",')
const featuredGlowEnd = entry.indexOf(',l.jsxs("div",{className:"featured-footer"', featuredGlowStart)
if (featuredGlowStart < 0 || featuredGlowEnd <= featuredGlowStart) throw new Error('Homepage featured cover boundary not found')
const featuredGlowNode = entry.slice(featuredGlowStart, featuredGlowEnd)
replaceOnce(featuredGlowNode, `l.jsx(pe,{variant:"project",children:${featuredGlowNode}})`)
// Every project must start at the top after the outgoing route finishes exiting.
// Reset Lenis's target as well as the native scroll position, so its next tick
// cannot put the newly mounted page back at the previous page's scroll offset.
replaceOnce('t.on("scroll",e),Kc.ticker.add(n),()=>{t.off("scroll",e),Kc.ticker.remove(n),t.destroy()}', 't.on("scroll",e),Kc.ticker.add(n),window.addEventListener("portfolio:reset-scroll",r),()=>{window.removeEventListener("portfolio:reset-scroll",r),t.off("scroll",e),Kc.ticker.remove(n),t.destroy()}')
replaceOnce('n=r=>t.raf(r*1e3);return t.on("scroll",e)', 'n=r=>t.raf(r*1e3),r=()=>t.scrollTo(0,{immediate:!0,force:!0});return t.on("scroll",e)')
replaceOnce('r=()=>t.scrollTo(0,{immediate:!0,force:!0});return t.on("scroll",e)', 'r=()=>t.scrollTo(0,{immediate:!0,force:!0}),chapterScroll=s=>{s.preventDefault();t.scrollTo(s.detail.top,{immediate:s.detail.immediate,duration:.65,force:!0,onComplete:s.detail.onComplete})};window.addEventListener("portfolio:chapter-scroll",chapterScroll);return t.on("scroll",e)')
replaceOnce('window.removeEventListener("portfolio:reset-scroll",r),t.off("scroll",e)', 'window.removeEventListener("portfolio:reset-scroll",r),window.removeEventListener("portfolio:chapter-scroll",chapterScroll),t.off("scroll",e)')
replaceOnce('function us({children:t}){return l.jsx(pn.div,', 'function us({children:t}){const{pathname:e,hash:n}=Ji();E.useLayoutEffect(()=>{if(!e.startsWith("/projects/")||n)return;const s=history.scrollRestoration,o=document.documentElement.style.overflowAnchor;history.scrollRestoration="manual";document.documentElement.style.overflowAnchor="none";const r=()=>{window.dispatchEvent(new Event("portfolio:reset-scroll"));window.scrollTo({top:0,left:0,behavior:"instant"})};window.addEventListener("pageshow",r);r();return()=>{window.removeEventListener("pageshow",r);history.scrollRestoration=s;document.documentElement.style.overflowAnchor=o}},[e,n]);return l.jsx(pn.div,')
// Work is now the homepage project section, beginning with UniLink.
replaceOnce('l.jsx("div",{className:"section-action",children:l.jsx(La,{to:"/work",className:"button-secondary",children:"VIEW ALL PROJECTS"})})', 'null')
replaceOnce('l.jsx(hi,{path:"/work",element:l.jsx(us,{children:l.jsx(yA,{})})}),', '')
replaceOnce('G0.map(s=>l.jsx(mk,{to:s.to,"data-cursor":"link",className:({isActive:o})=>o?"active":"",children:s.label},s.to))', 'G0.map(s=>s.label==="Work"?l.jsx("a",{href:s.to,"data-cursor":"link",children:s.label},s.to):l.jsx(mk,{to:s.to,"data-cursor":"link",className:({isActive:o})=>o?"active":"",children:s.label},s.to))')
entry = entry.replaceAll('to:"/work"', 'to:"/#featured"')
replaceOnce('className:"unilink-blank-cover","aria-label":"View UniLink case study","data-cursor":"media"}', 'className:"unilink-blank-cover","aria-label":"View UniLink case study","data-cursor":"media",children:l.jsx("img",{src:"/images/unilink/cover.png",width:1586,height:992,alt:"UniLink peer support, with authentic home and Housing Help screens",loading:"lazy",style:{display:"block",width:"100%",height:"100%",objectFit:"cover",borderRadius:"inherit"}})}')
replaceOnce('title:"Landing App",eyebrow:"Graduation project",year:"2026",categories:["UX Product Design","AI Agent","Service Design"],summary:"An AI-powered transition assistant helping international students navigate their first steps in a new country."', 'title:"UniLink",eyebrow:"UX case study",year:"2026",categories:["UX Research","Product Design","Service Design"],summary:"A research-led peer support platform connecting international students with relevant communities and verified senior mentors."')
replaceOnce('children:"GRADUATION PROJECT / AI SERVICE"', 'children:"GRADUATION PROJECT"')
replaceOnce('l.jsx(La,{to:"/projects/landing-app",children:"VIEW CASE STUDY"})', 'null')
replaceOnce('UniLink is a peer-support app that matches first-year international students into small, specific chat groups led by senior mentors for low-pressure guidance, while featuring a seamless escalation tool to route complex queries directly to official university staff.', 'A research-led peer support platform connecting first-year international students with relevant communities and verified senior mentors.')
replaceOnce('l.jsx(Ir,{alt:"Portrait of Jiaming Zhang, UX and Product Designer in Melbourne",variant:"poster",label:"PORTRAIT DIRECTION"})', 'l.jsx("img",{className:"about-portrait",src:"/images/jiaming-portrait.jpg",alt:"Jiaming Zhang at the University of Melbourne",loading:"lazy",decoding:"async"})')
replaceOnce('My practice moves between digital products, services, conversational AI, responsive interfaces, visual communication, and physical interaction.', 'My practice moves between digital products, service design, AI-enable design, responsive interfaces, visual communication, and physical interaction.')
replaceOnce('l.jsx("dd",{children:"Melbourne, Australia"})', 'l.jsxs("dd",{children:["Shenzhen, China",l.jsx("br",{}),"Melbourne, Australia"]})')
// Contact already contains the contact information; omit its duplicate footer
// only, retaining the shared footer on Home and About.
replaceOnce('l.jsx(oa,{})]})}function Oj()', 'null]})}function Oj()')
replaceOnce('l.jsxs("a",{href:"mailto:","data-cursor":"link",children:[l.jsx("span",{children:"EMAIL"}),l.jsx("small",{children:"Add preferred email address"}),l.jsx(si,{})]})', 'l.jsxs("div",{className:"contact-row contact-email",children:[l.jsx("span",{className:"contact-label",children:"EMAIL"}),l.jsxs("div",{className:"contact-email-addresses",children:[l.jsx("span",{children:"jiamingz1113@163.com"}),l.jsx("span",{children:"jiamingz1113@gmail.com"})]})]})')
replaceOnce('l.jsxs("a",{href:"https://www.linkedin.com/in/jiaming-zhang-996b52280/",target:"_blank",rel:"noopener noreferrer","data-cursor":"link",children:[l.jsx("span",{children:"LINKEDIN"}),l.jsx("small",{children:"Professional profile"}),l.jsx(si,{})]})', 'l.jsxs("a",{href:"https://www.linkedin.com/in/jiaming-zhang-996b52280/",target:"_blank",rel:"noopener noreferrer","data-cursor":"link",className:"contact-row contact-linkedin",children:[l.jsx("span",{className:"contact-label",children:"LINKEDIN"}),l.jsx(si,{})]})')
// Remove the entire homepage About preview; the dedicated About page remains.
replaceOnce("l.jsx(\"section\",{className:\"about-preview\",id:\"about\",children:l.jsxs(pe,{children:[l.jsx(ye,{number:\"03\",children:\"ABOUT\"}),l.jsxs(\"div\",{className:\"about-preview-grid\",children:[l.jsxs(\"div\",{children:[l.jsxs(\"span\",{children:[\"JIAMING\",l.jsx(\"br\",{}),\"ZHANG\"]}),l.jsx(Ir,{alt:\"Portrait of Jiaming Zhang, UX Designer based in Melbourne\",variant:\"poster\",label:\"PORTRAIT DIRECTION\"})]}),l.jsxs(\"div\",{className:\"about-preview-copy\",children:[l.jsxs(\"h2\",{children:[\"UX Designer\",l.jsx(\"br\",{}),\"based in Melbourne.\"]}),l.jsx(\"p\",{children:\"I explore the space between people, products, and systems—using research to understand what matters and design to make the next interaction feel natural.\"}),l.jsx(\"ul\",{children:[\"UX Research\",\"Product Design\",\"Interaction Design\",\"Service Design\",\"AI Experience Design\",\"Visual Communication\"].map(n=>l.jsx(\"li\",{children:n},n))}),l.jsx(La,{to:\"/about\",children:\"MORE ABOUT ME\"})]})]})]})}),", "")
// Explicitly requested next-project navigation, preserving each case study body.
const nextLink = (slug, title, theme) => `l.jsxs(ti,{className:"case-next-project","data-case-theme":"${theme}",to:"/projects/${slug}",children:[l.jsx("span",{children:"NEXT PROJECT"}),l.jsx("strong",{children:"${title}"}),l.jsx(si,{"aria-hidden":true})]})`
replaceOnce('children:i?l.jsx(IA,{}):e.slug==="furniture"?', `children:i?l.jsxs(l.Fragment,{children:[l.jsx(IA,{}),${nextLink('furniture', 'My Furniture Store', 'boardgamemate')}]}):e.slug==="furniture"?`)
replaceOnce('l.jsx(zA,{}),l.jsxs(ti,{className:"next-project",to:`/projects/${r.slug}`,"data-cursor":"media",children:[l.jsxs("span",{children:["NEXT CASE STUDY · ",r.number]}),l.jsx("h2",{children:r.title}),l.jsx(Zn,{})]})', `l.jsx(zA,{}),${nextLink('culturelens', 'CultureLens Concierge', 'furniture')}`)

// BoardGameMate is a three-person group project. Keep the preserved case study
// and update only its team metadata and first-person project narration.
replaceOnce('l.jsxs("div",{children:[l.jsx("dt",{children:"YEAR"}),l.jsx("dd",{children:"2024"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"MY CONTRIBUTION"})', 'l.jsxs("div",{children:[l.jsx("dt",{children:"YEAR"}),l.jsx("dd",{children:"2024"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"TEAM"}),l.jsx("dd",{children:"3-person group project"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"MY CONTRIBUTION"})')
replaceOnce('I began by looking beyond the interface to understand what makes tabletop play feel inviting, difficult or socially uncertain.', 'We began by looking beyond the interface to understand what makes tabletop play feel inviting, difficult or socially uncertain.')
replaceOnce('I therefore reframed the product around the complete journey of getting people to the same table.', 'We therefore reframed the product around the complete journey of getting people to the same table.')
replaceOnce('The most important outcome of this iteration was a shift in how I approached the product. I centred the work on one question:', 'The most important outcome of this iteration was a shift in how we approached the product. We centred the work on one question:')

// Remove the requested Foundations / Component Library image area entirely.
const foundationsStart = entry.indexOf('l.jsx("section",{className:"furniture-figma-visual",')
const foundationsEnd = entry.indexOf('l.jsx("section",{className:"furniture-section furniture-process",', foundationsStart)
const componentsStart = entry.indexOf('l.jsx("section",{className:"furniture-figma-visual furniture-components-visual",')
const componentsEnd = entry.indexOf('l.jsx("section",{className:"furniture-section furniture-flow",', componentsStart)
if ([foundationsStart, foundationsEnd, componentsStart, componentsEnd].some(value => value < 0) || foundationsEnd <= foundationsStart || componentsEnd <= componentsStart) throw new Error('Furniture design-system sections not found')
const oldFoundations = entry.slice(foundationsStart, foundationsEnd)
const oldComponents = entry.slice(componentsStart, componentsEnd)
replaceOnce(oldComponents, '')
replaceOnce(oldFoundations, '')

const cultureBaseline = fs.readFileSync(path.join(baseline, 'assets/culturelens-case-study.js'), 'utf8')
const cultureStart = cultureBaseline.indexOf('/* @__PURE__ */ n("a", { className: "culturelens-next-project"')
const cultureEnd = cultureBaseline.indexOf('] })', cultureStart) + 4
if (cultureStart < 0 || cultureEnd < cultureStart) throw new Error('CultureLens next-project anchor not found')
const cultureAnchor = cultureBaseline.slice(cultureStart, cultureEnd)
const cultureNewAnchor = cultureAnchor.replace('className: "culturelens-next-project"', 'className: "case-next-project", "data-case-theme": "culturelens"').replace('/projects/furniture', '/projects/crownlands').replace('NEXT CASE STUDY · 04', 'NEXT PROJECT').replace('My Furniture Store', 'Crownlands')
// Move navigation out of the reflection chapter to the end of the case study.
const cultureFooter = '/* @__PURE__ */ e(ue, {})'
if (cultureBaseline.split(cultureFooter).length !== 2) throw new Error('Ambiguous CultureLens footer')
let cultureModule = cultureBaseline.replace(cultureAnchor, 'null').replace(cultureFooter, `${cultureNewAnchor},\n    ${cultureFooter}`)
const cultureCaseLabel = '/* @__PURE__ */ e("span", { children: "SELECTED CASE STUDY / 03" })'
if (cultureModule.split(cultureCaseLabel).length !== 2) throw new Error('Ambiguous CultureLens case-study label')
cultureModule = cultureModule.replace(cultureCaseLabel, 'null')
// Remove the requested synthesis/validation fine print without rebuilding the
// preserved CultureLens page or changing its interaction logic.
const copyCleanup = JSON.parse(fs.readFileSync(path.join(repo, 'scripts/portfolio-copy-cleanup.json'), 'utf8'))
for (const { from, to, removeElement } of copyCleanup) {
  if (cultureModule.split(from).length !== 2) throw new Error(`Ambiguous CultureLens copy cleanup: ${from}`)
  if (removeElement) {
    const node = `/* @__PURE__ */ e("${removeElement}", { children: ${JSON.stringify(from)} })`
    if (cultureModule.split(node).length !== 2) throw new Error(`Fine-print element not found: ${from}`)
    cultureModule = cultureModule.replace(node, 'null')
  } else {
    cultureModule = cultureModule.replace(from, to)
  }
}
const cultureCopyPatch = (before, after) => {
  if (cultureModule.split(before).length !== 2) throw new Error(`Ambiguous report-credit removal: ${before.slice(0, 100)}`)
  cultureModule = cultureModule.replace(before, after)
}
cultureCopyPatch('/* @__PURE__ */ n("figcaption", { children: [\n      a,\n      " · Authentic process evidence"\n    ] })', 'null')
cultureCopyPatch('/* @__PURE__ */ n("p", { children: [\n        r,\n        " · ",\n        a\n      ] })', '/* @__PURE__ */ e("p", { children: r })')
cultureCopyPatch('/* @__PURE__ */ e("small", { children: a.source })', 'null')
cultureCopyPatch('/* @__PURE__ */ n("small", { children: [\n        i.source,\n        " · Build → test → diagnose → refine"\n      ] })', '/* @__PURE__ */ e("small", { children: "Build → test → diagnose → refine" })')
cultureCopyPatch('A2.G3 prototype catalogue and dummy data', 'Prototype catalogue and dummy data')
// Only generated ConceptVisual images receive the requested corner disclosure.
// The original sketches, physical prototypes and Voiceflow evidence stay intact.
cultureCopyPatch('className: "culturelens-cv-badge", children: "CONCEPT VISUALISATION"', 'className: "culturelens-cv-badge", lang: "en", children: "AI-generated concept image"')
// These data fields are report citations only. AI/concept disclosures are
// intentionally left byte-for-byte intact, including the full hardware caption.
cultureModule = cultureModule.replace(/"A2\.G[23]\s*(?:·\s*)?p{1,2}\.\s*[\d,–\- ]+"/g, '""')
// Relocate the complete overview to the hero, above the chapter navigation.
const overviewPrefix = '/* @__PURE__ */ e(U, { title: "Project overview & evidence boundaries", children: '
const overviewStart = cultureModule.indexOf(overviewPrefix)
const overviewEnd = cultureModule.indexOf('] }) })', overviewStart) + '] }) })'.length
if (overviewStart < 0 || overviewEnd < overviewStart) throw new Error('CultureLens overview not found')
const overviewNode = cultureModule.slice(overviewStart, overviewEnd)
const overviewGrid = overviewNode.slice(overviewPrefix.length, -3).replace('2026 · University of Melbourne · Group project', '2026 · University of Melbourne · 3-person group project')
const heroBottomPrefix = '/* @__PURE__ */ n("div", { className: "culturelens-hero-bottom", children: ['
const heroBottomStart = cultureModule.indexOf(heroBottomPrefix)
const heroBottomEnd = cultureModule.indexOf('\n        ] })', heroBottomStart) + '\n        ] })'.length
if (heroBottomStart < 0 || heroBottomEnd < heroBottomStart) throw new Error('CultureLens hero bottom not found')
const heroBottom = cultureModule.slice(heroBottomStart, heroBottomEnd)
const chapterAnchorStart = heroBottom.indexOf('/* @__PURE__ */ n("a",')
const chapterAnchor = heroBottom.slice(chapterAnchorStart, heroBottom.lastIndexOf('\n        ] })')).trim()
cultureCopyPatch(overviewNode, 'null')
cultureCopyPatch(heroBottom, `/* @__PURE__ */ n("section", { className: "culturelens-hero-bottom culturelens-hero-overview", "aria-label": "Project overview", children: [/* @__PURE__ */ n("div", { className: "culturelens-overview-heading", children: [/* @__PURE__ */ e("span", { children: "PROJECT OVERVIEW" }), ${chapterAnchor}] }), ${overviewGrid}] })`)
// Remove the entire Test chapter, not just its navigation or visual visibility.
const testPrefix = '/* @__PURE__ */ n(x, { id: "test", number: "06",'
const testStart = cultureModule.indexOf(testPrefix)
const testClose = '\n        ] })\n      ] }),\n      /* @__PURE__ */ n(x, { id: "reflect",'
const testEnd = cultureModule.indexOf(testClose, testStart) + '\n        ] })'.length
if (testStart < 0 || testEnd < testStart) throw new Error('CultureLens Test chapter boundary not found')
cultureCopyPatch(cultureModule.slice(testStart, testEnd), 'null')
cultureCopyPatch('["Frame", "Explore", "Evolve", "Service", "Agent", "Test", "Reflect"]', '["Frame", "Explore", "Evolve", "Service", "Agent", "Reflect"]')
cultureCopyPatch('id: "reflect", number: "07"', 'id: "reflect", number: "06"')
cultureCopyPatch('7 CHAPTERS · 5 MIN MAINLINE', '6 CHAPTERS · 5 MIN MAINLINE')
// Remove the screenshot's architecture, autonomy ladder and simulation only.
// Keep the original Voiceflow recordings and conversation evidence below it.
const agentHeading = '/* @__PURE__ */ n(x, { id: "agent", number: "05",'
const agentStart = cultureModule.indexOf(agentHeading)
const evidenceStart = cultureModule.indexOf('/* @__PURE__ */ n("div", { className: "culturelens-prototype-evidence",', agentStart)
if (agentStart < 0 || evidenceStart <= agentStart) throw new Error('CultureLens agent removal boundaries not found')
cultureCopyPatch(cultureModule.slice(agentStart, evidenceStart), `${agentHeading} label: "AGENT / ORIGINAL VOICEFLOW BUILD", title: "From conversation logic to project evidence.", children: [\n          `)
cultureCopyPatch('/* @__PURE__ */ e("h3", { children: "From conversation logic to project evidence." }),', '')
cultureCopyPatch('The recordings document the original project. The React simulation above makes the refined interaction logic directly explorable.', 'The recordings document the original Voiceflow project.')
cultureCopyPatch('href: "#culturelens-simulation"', 'href: "#culturelens-agent"')
cultureCopyPatch('Experience the prototype ', 'Explore the prototype evidence ')
// Source and preserved production share one navigation implementation. Keep
// chapter activation, anchor landing and late-loading layout changes in sync.
const navigationSource = fs.readFileSync(path.join(repo, 'public/culturelens-navigation.mjs'), 'utf8')
const navigationFile = `assets/culturelens-navigation-${hash(navigationSource).slice(0,12)}.mjs`
fs.writeFileSync(path.join(target, navigationFile), navigationSource)
const navigationStart = cultureModule.indexOf('    const c = Array.from(i.querySelectorAll("[data-culturelens-chapter]"))')
const navigationEnd = cultureModule.indexOf('  }, []),', navigationStart)
if (navigationStart < 0 || navigationEnd <= navigationStart) throw new Error('CultureLens navigation implementation not found')
cultureCopyPatch(cultureModule.slice(navigationStart, navigationEnd), '    const stopNavigation = setupChapterNavigation(i, l);\n    return () => { d.disconnect(); stopNavigation(); };\n')
cultureCopyPatch('const t = S(null), r = S(null), [a, l] = m("frame");', 'const t = S(null), [a, l] = m("frame");')
cultureCopyPatch('/* @__PURE__ */ e("div", { className: "culturelens-reading-progress", ref: r }),', '')
cultureModule = `import { setupChapterNavigation } from "./${path.basename(navigationFile)}";\n${cultureModule}`
const cultureEntry = `assets/culturelens-case-study-${hash(cultureModule).slice(0,12)}.js`
fs.writeFileSync(path.join(target, cultureEntry), cultureModule)
replaceOnce('import("./culturelens-case-study.js")', `import("./${path.basename(cultureEntry)}")`)
// Match the featured cover to the existing project-card interaction and artwork.
entry = entry.replaceAll('/images/unilink/cover.png', '/images/unilink/cover-20261003.png')
replaceOnce('className:"featured-border-glow",edgeSensitivity:32,glowColor:"194 93 58",backgroundColor:"#070e1b",borderRadius:32,glowRadius:30,glowIntensity:.78,coneSpread:22,colors:[t.color,"#0066ff","#00d4ff"],fillOpacity:.16', 'className:"featured-border-glow project-border-glow",edgeSensitivity:32,glowColor:"194 93 58",backgroundColor:"#07101f",borderRadius:22,glowRadius:28,glowIntensity:.72,coneSpread:22,colors:[t.color,"#0066ff","#00d4ff"],fillOpacity:.18')
replaceOnce('className:"unilink-blank-cover","aria-label":"View UniLink case study","data-cursor":"media",children:l.jsx("img",{src:"/images/unilink/cover-20261003.png",width:1586,height:992,alt:"UniLink peer support, with authentic home and Housing Help screens",loading:"lazy",style:{display:"block",width:"100%",height:"100%",objectFit:"cover",borderRadius:"inherit"}})', 'className:"unilink-blank-cover project-visual-link","aria-label":"View UniLink case study","data-cursor":"media",children:l.jsxs(l.Fragment,{children:[l.jsx("img",{className:"project-cover-image",src:"/images/unilink/cover-20261003.png",width:2379,height:1488,alt:"UniLink — peer support connecting students to the right help",loading:"lazy",decoding:"async"}),l.jsxs("span",{className:"view-pill",children:["VIEW CASE STUDY ",l.jsx(Zn,{size:15})]})]})')
entry = entry.replaceAll('/projects/landing-app', '/projects/unilink')
// Update only the homepage cover nodes. Keep the original case-study assets,
// including the baseline Crownlands and CultureLens artwork, byte-identical.
const homepageCovers = JSON.parse(fs.readFileSync(path.join(repo, 'src/data/homepage-covers.json'), 'utf8'))
const previousCovers = {
  furniture: { src: '/images/furniture/myfurniturestore-cover.png', width: 3172, height: 1984 },
  boardgamemate: { src: '/images/boardgamemate/boardgamemate-cover.png', width: 3172, height: 1984 },
  unilink: { src: '/images/unilink/cover-20261003.png', width: 2379, height: 1488 },
  culturelens: { src: '/media/culturelens/culturelens-cover-agentic-20260914.webp', width: 1586, height: 992 },
  crownlands: { src: '/images/crownlands-cover.png', width: 1586, height: 992 },
}
for (const [slug, previous] of Object.entries(previousCovers)) {
  const cover = homepageCovers[slug]
  const source = path.join(repo, 'public', cover.src)
  const data = fs.readFileSync(source)
  if (data.length > 2_000_000) throw new Error(`Homepage cover exceeds 2 MB: ${slug}`)
  replaceOnce(`src:${JSON.stringify(previous.src)},width:${previous.width},height:${previous.height}`, `src:${JSON.stringify(cover.src)},width:${cover.width},height:${cover.height}`)
  const destination = path.join(target, cover.src)
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.copyFileSync(source, destination)
}
replaceOnce('alt:"UniLink — peer support connecting students to the right help"', `alt:${JSON.stringify(homepageCovers.unilink.alt)}`)
const furnitureCover = homepageCovers.furniture
replaceOnce(`src:${JSON.stringify(furnitureCover.src)},width:${furnitureCover.width},height:${furnitureCover.height},loading:"lazy",decoding:"async",alt:t.heroAlt`, `src:${JSON.stringify(furnitureCover.src)},width:${furnitureCover.width},height:${furnitureCover.height},loading:"lazy",decoding:"async",alt:${JSON.stringify(furnitureCover.alt)}`)
const boardCover = homepageCovers.boardgamemate
replaceOnce(`src:${JSON.stringify(boardCover.src)},width:${boardCover.width},height:${boardCover.height},loading:"lazy",decoding:"async",alt:t.heroAlt`, `src:${JSON.stringify(boardCover.src)},width:${boardCover.width},height:${boardCover.height},loading:"lazy",decoding:"async",alt:${JSON.stringify(boardCover.alt)}`)
replaceOnce('alt:"CultureLens Concierge: a customized immersive museum journey with agentic AI and a wraparound MuseBand"', `alt:${JSON.stringify(homepageCovers.culturelens.alt)}`)
const crownCover = homepageCovers.crownlands
replaceOnce(`src:${JSON.stringify(crownCover.src)},width:${crownCover.width},height:${crownCover.height},loading:"lazy",decoding:"async",alt:t.heroAlt`, `src:${JSON.stringify(crownCover.src)},width:${crownCover.width},height:${crownCover.height},loading:"lazy",decoding:"async",alt:${JSON.stringify(crownCover.alt)}`)
// Let the full-rules dialog scroll natively instead of sending wheel/touch
// gestures to the background page's Lenis instance. Keep both original sheets
// and all game logic unchanged, with a content-addressed module for cache safety.
const crownBaselineEntry = 'assets/CrownlandsPage-CultureLens-20260913.js'
const crownBaselineModule = fs.readFileSync(path.join(baseline, crownBaselineEntry), 'utf8')
const rulesDialogNode = 'className:"cl-rules-modal",role:"dialog"'
if (crownBaselineModule.split(rulesDialogNode).length !== 2) throw new Error('Ambiguous Crownlands full-rules dialog')
let crownModule = crownBaselineModule.replace(rulesDialogNode, 'className:"cl-rules-modal","data-lenis-prevent":"",tabIndex:0,role:"dialog"')
const crownFeelHeading = 'children:"Experience North Star"'
if (crownModule.split(crownFeelHeading).length !== 2) throw new Error('Ambiguous Crownlands player-experience heading')
crownModule = crownModule.replace(crownFeelHeading, 'children:"What We Wanted Players to Feel"')
const crownCreditNode = 'e.jsxs("p",{className:"cl-credit",children:["Project assets supplied by the Crownlands design team · Procedural page audio generated in-browser · ",e.jsx("a",{href:"/CREDITS.md",children:"Credits"})]})'
if (crownModule.split(crownCreditNode).length !== 2) throw new Error('Ambiguous Crownlands footer credit')
crownModule = crownModule.replace(crownCreditNode, 'null')
const crownEntry = `assets/CrownlandsPage-rules-scroll-${hash(crownModule).slice(0,12)}.js`
fs.writeFileSync(path.join(target, crownEntry), crownModule)
if (entry.split(path.basename(crownBaselineEntry)).length !== 3) throw new Error('Crownlands import/dependency anchors changed')
entry = entry.replaceAll(path.basename(crownBaselineEntry), path.basename(crownEntry))
const newEntry = `assets/index-portfolio-${hash(entry).slice(0, 12)}.js`
fs.writeFileSync(path.join(target, newEntry), entry)

// The existing project modules share the portfolio's runtime. Only their import
// filename changes; their code, assets, layouts and interactions remain intact.
const patched = new Set(['index.html'])
for (const name of fs.readdirSync(path.join(target, 'assets'))) {
  if (!name.endsWith('.js') || name === path.basename(baselineEntry) || name === path.basename(newEntry)) continue
  const file = path.join(target, 'assets', name)
  const text = fs.readFileSync(file, 'utf8')
  if (text.includes(path.basename(baselineEntry))) {
    fs.writeFileSync(file, text.replaceAll(path.basename(baselineEntry), path.basename(newEntry)))
    patched.add(`assets/${name}`)
  }
}
let html = fs.readFileSync(path.join(baseline, 'index.html'), 'utf8')
// Replace the old music controller with a content-addressed copy so returning
// visitors get the louder game music while the preserved baseline stays intact.
const crownAudio = fs.readFileSync(path.join(repo, 'public/crownlands-audio.js'))
const crownAudioFile = `crownlands-audio-${hash(crownAudio).slice(0,12)}.js`
const crownAudioTag = '<script type="module" src="/crownlands-audio.js"></script>'
if (html.split(crownAudioTag).length !== 2) throw new Error('Crownlands audio script not found or duplicated')
fs.writeFileSync(path.join(target, crownAudioFile), crownAudio)
html = html.replace(crownAudioTag, `<script type="module" src="/${crownAudioFile}"></script>`)
html = html.replace(baselineEntry, newEntry).replace('</head>', '  <link rel="stylesheet" href="/profile-contact-20261002.css" />\n  <link rel="stylesheet" href="/unilink-featured-layout-20261002.css" />\n  <link rel="stylesheet" href="/case-next-project-20261002.css?v=project-palettes" />\n  <script src="/portfolio-navigation.js" defer></script>\n  </head>')
// Content-addressed page enhancements avoid stale styles or motion after a release.
for (const [filename, type] of [['home-project-reveal.css', 'style'], ['hero-orb-motion.css', 'style'], ['hero-orb-motion.mjs', 'module'], ['furniture-warm-palette.css', 'style'], ['furniture-cover-fill.css', 'style'], ['project-footer-themes-20261003.css', 'style'], ['culturelens-hero-overview.css', 'style'], ['culturelens-ai-image-label.css', 'style'], ['furniture-design-system.css', 'style'], ['project-navbar.css', 'style'], ['project-chapters.css', 'style']]) {
  const content = fs.readFileSync(path.join(repo, 'public', filename))
  const extension = path.extname(filename)
  const asset = `${path.basename(filename, extension)}-${hash(content).slice(0, 12)}${extension}`
  fs.writeFileSync(path.join(target, asset), content)
  const tag = type === 'style' ? `<link rel="stylesheet" href="/${asset}" />` : `<script type="module" src="/${asset}"></script>`
  html = html.replace('</head>', `  ${tag}\n</head>`)
}
fs.writeFileSync(path.join(target, 'index.html'), html)
fs.cpSync(path.join(repo, 'dist-unilink/unilink-assets'), path.join(target, 'unilink-assets'), { recursive: true })
fs.mkdirSync(path.join(target, 'projects/unilink'), { recursive: true })
fs.writeFileSync(path.join(target, 'projects/unilink/index.html'), uniLinkHtml)
fs.cpSync(path.join(repo, 'public/images/unilink'), path.join(target, 'images/unilink'), { recursive: true })
fs.copyFileSync(path.join(repo, 'public/portfolio-navigation.js'), path.join(target, 'portfolio-navigation.js'))
fs.copyFileSync(path.join(repo, 'public/project-footer-themes-20261003.css'), path.join(target, 'project-footer-themes-20261003.css'))

fs.copyFileSync(path.join(repo, 'public/images/jiaming-portrait.jpg'), path.join(target, 'images/jiaming-portrait.jpg'))
fs.copyFileSync(path.join(repo, 'public/profile-contact-20261002.css'), path.join(target, 'profile-contact-20261002.css'))

fs.copyFileSync(path.join(repo, 'public/unilink-featured-layout-20261002.css'), path.join(target, 'unilink-featured-layout-20261002.css'))

fs.copyFileSync(path.join(repo, 'public/case-next-project-20261002.css'), path.join(target, 'case-next-project-20261002.css'))

function files(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(item => item.isDirectory()
    ? files(path.join(directory, item.name), `${prefix}${item.name}/`)
    : [`${prefix}${item.name}`])
}
const retained = []
for (const file of files(baseline)) {
  const original = fs.readFileSync(path.join(baseline, file))
  const restored = fs.readFileSync(path.join(target, file))
  if (patched.has(file)) {
    if (file !== 'index.html' && restored.toString().replaceAll(path.basename(newEntry), path.basename(baselineEntry)) !== original.toString()) throw new Error(`Unexpected project change: ${file}`)
  } else if (hash(original) !== hash(restored)) throw new Error(`Existing project file changed: ${file}`)
  retained.push({ path: file, sha256: hash(restored), unchanged: !patched.has(file) })
}
const manifest = {
  baselineDeployment: 'dpl_Cbxby6GsJLECfJc1o9iUKfJAjtfH',
  portfolioEntry: newEntry,
  retained,
  files: files(target).map(file => ({ path: file, sha256: hash(fs.readFileSync(path.join(target, file))) })),
}
fs.writeFileSync(path.join(repo, 'docs/production-restoration-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
const output = path.join(repo, '.vercel/output')
fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(output, { recursive: true })
fs.cpSync(target, path.join(output, 'static'), { recursive: true })
fs.writeFileSync(path.join(output, 'config.json'), JSON.stringify({ version: 3, routes: [
  { src: '^/work/?$', status: 308, headers: { Location: '/#featured' } },
  { src: '^/projects/landing-app/?$', status: 308, headers: { Location: '/projects/unilink' } },
  { src: '^/projects/unilink/?$', dest: '/projects/unilink/index.html' },
  { handle: 'filesystem' },
  { src: '/.*', dest: '/index.html' },
] }, null, 2) + '\n')
console.log(`Restored ${retained.length} baseline files (${retained.filter(file => file.unchanged).length} byte-identical); staged UniLink separately. Production output: dist-production/ and .vercel/output/.`)
