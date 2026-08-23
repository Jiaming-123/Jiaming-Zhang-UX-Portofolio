import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Footer, MagneticButton } from '../components/Layout'
import { Gallery, MediaPlaceholder, ProjectCard, Reveal, SectionLabel } from '../components/Content'
import { projects, visualItems } from '../data/projects'

export function WorkPage() {
  return (
    <>
      <header className="page-hero work-hero">
        <span className="page-eyebrow">SELECTED UX / PRODUCT DESIGN</span>
        <h1>WORK<span>.</span></h1>
        <div><p>Five projects across AI, community, culture, commerce, and physical play.</p><ArrowDown /></div>
      </header>
      <main className="work-index">
        {projects.map((project) => <Reveal key={project.slug}><ProjectCard project={project} featured={project.slug === 'landing-app'} /></Reveal>)}
      </main>
      <Footer />
    </>
  )
}

export function VisualsPage() {
  const [featured, ...rest] = visualItems
  return (
    <>
      <header className="page-hero visuals-hero">
        <span className="page-eyebrow">SECONDARY PRACTICE / 2024—2026</span>
        <h1>VISUAL<br /><span>ARCHIVE.</span></h1>
        <p>Graphic design, typography, branding, and poster studies that sharpen the visual language behind my product work.</p>
      </header>
      <main className="visuals-page">
        <SectionLabel number="01">FEATURED STUDY</SectionLabel>
        <div className="visual-feature" data-cursor="media">
          <MediaPlaceholder alt={featured.alt} variant="poster" label="FEATURED / POSTER DESIGN" />
          <span><b>{featured.title}</b><small>{featured.year} · {featured.category}</small></span>
        </div>
        <SectionLabel number="02">ALL EXPLORATIONS</SectionLabel>
        <Gallery items={[featured, ...rest]} />
      </main>
      <Footer />
    </>
  )
}

const capabilityGroups = [
  { number: '01', title: 'Understand', items: ['UX Research', 'Interview Synthesis', 'Journey Mapping', 'Service Blueprinting'] },
  { number: '02', title: 'Shape', items: ['Product Strategy', 'Interaction Design', 'Information Architecture', 'Conversation Design'] },
  { number: '03', title: 'Make', items: ['Responsive Design', 'Prototyping', 'Visual Systems', 'Front-end Implementation'] },
]

export function AboutPage() {
  return (
    <>
      <header className="page-hero about-hero">
        <span className="page-eyebrow">ABOUT / JIAMING ZHANG</span>
        <h1>CURIOUS<br />BY <span>DESIGN.</span></h1>
        <p>I design meaningful interactions between people, products, and systems.</p>
      </header>
      <main className="about-page">
        <section className="about-profile">
          <Reveal><MediaPlaceholder alt="Portrait of Jiaming Zhang, UX and Product Designer in Melbourne" variant="poster" label="PORTRAIT DIRECTION" /></Reveal>
          <Reveal className="about-story"><SectionLabel number="01">PROFILE</SectionLabel><h2>Designing for the moment complexity becomes clear.</h2><p>I&apos;m Jiaming, a UX / Product Designer based in Melbourne. My practice moves between digital products, services, conversational AI, responsive interfaces, visual communication, and physical interaction.</p><p>I use research to understand what a system asks of people, then shape the information, interaction, and visual language that helps them move through it with confidence.</p><dl><div><dt>EDUCATION</dt><dd>Bachelor of Design (UX Design)<br />University of Melbourne</dd></div><div><dt>LOCATION</dt><dd>Melbourne, Australia</dd></div></dl></Reveal>
        </section>
        <section className="capabilities">
          <SectionLabel number="02">CAPABILITIES</SectionLabel>
          <div>{capabilityGroups.map((group) => <Reveal key={group.number} className="capability-row"><span>{group.number}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div>
        </section>
        <section className="principle-block"><Reveal><span>MY APPROACH</span><blockquote>“Make the system understandable. Make the interaction purposeful. Make the experience feel human.”</blockquote></Reveal></section>
      </main>
      <Footer />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <main className="contact-page">
        <span className="page-eyebrow">CONTACT / MELBOURNE</span>
        <h1>LET&apos;S MAKE<br />SOMETHING<br /><span>MEANINGFUL.</span></h1>
        <div className="contact-grid">
          <p>I&apos;m open to UX and product design opportunities, collaborations, and conversations about thoughtful technology.</p>
          <div className="contact-actions">
            <a href="mailto:" data-cursor="link"><span>EMAIL</span><small>Add preferred email address</small><ArrowUpRight /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-cursor="link"><span>LINKEDIN</span><small>Professional profile</small><ArrowUpRight /></a>
          </div>
        </div>
        <div className="contact-note"><i /><span>AVAILABLE FOR OPPORTUNITIES</span><span>MELBOURNE · AEST</span></div>
      </main>
      <Footer />
    </>
  )
}

export function NotFoundPage() {
  return <main className="not-found"><span>404 / PAGE NOT FOUND</span><h1>OFF THE<br />MAP.</h1><p>This path is outside the current experience.</p><MagneticButton to="/">RETURN HOME</MagneticButton></main>
}
