import { ArrowUpRight } from 'lucide-react'

import { Footer, MagneticButton } from '../components/Layout'

import { Reveal, SectionLabel } from '../components/Content'


const capabilityGroups = [
  { number: '01', title: 'Understand', items: ['UX Research', 'Interview Synthesis', 'Journey Mapping', 'Service Blueprinting'] },
  { number: '02', title: 'Shape', items: ['Product Strategy', 'Interaction Design', 'Information Architecture', 'Conversation Design'] },
  { number: '03', title: 'Make', items: ['Responsive Design', 'Prototyping', 'Visual Systems', 'Front-end Implementation'] },
]

export function AboutPage() {
  return (
    <>
      <main className="about-page">
        <section className="about-profile">
          <Reveal><img className="about-portrait" src="/images/jiaming-portrait.jpg" alt="Jiaming Zhang at the University of Melbourne" loading="lazy" decoding="async" /></Reveal>
          <Reveal className="about-story"><SectionLabel number="01">PROFILE</SectionLabel><h2>Designing for the moment complexity becomes clear.</h2><p>I&apos;m Jiaming, a UX / Product Designer based in Melbourne. My practice moves between digital products, service design, AI-enable design, responsive interfaces, visual communication, and physical interaction.</p><p>I use research to understand what a system asks of people, then shape the information, interaction, and visual language that helps them move through it with confidence.</p><dl><div><dt>EDUCATION</dt><dd>Bachelor of Design (UX Design)<br />University of Melbourne</dd></div><div><dt>LOCATION</dt><dd>Shenzhen, China<br />Melbourne, Australia</dd></div></dl></Reveal>
        </section>
        <section className="capabilities">
          <SectionLabel number="02">CAPABILITIES</SectionLabel>
          <div>{capabilityGroups.map((group) => <Reveal key={group.number} className="capability-row"><span>{group.number}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div>
        </section>
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
            <div className="contact-row contact-email"><span className="contact-label">EMAIL</span><div className="contact-email-addresses"><span>jiamingz1113@163.com</span><span>jiamingz1113@gmail.com</span></div></div>
            <a href="https://www.linkedin.com/in/jiaming-zhang-996b52280/" target="_blank" rel="noopener noreferrer" data-cursor="link" className="contact-row contact-linkedin"><span className="contact-label">LINKEDIN</span><ArrowUpRight /></a>
          </div>
        </div>
        <div className="contact-note"><i /><span>AVAILABLE FOR OPPORTUNITIES</span><span>MELBOURNE · AEST</span></div>
      </main>
    </>
  )
}

export function NotFoundPage() {
  return <main className="not-found"><span>404 / PAGE NOT FOUND</span><h1>OFF THE<br />MAP.</h1><p>This path is outside the current experience.</p><MagneticButton to="/">RETURN HOME</MagneticButton></main>
}
