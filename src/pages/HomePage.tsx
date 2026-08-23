import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Hero } from '../components/Hero'
import { Footer, MagneticButton } from '../components/Layout'
import { Gallery, MediaPlaceholder, ProjectCard, Reveal, SectionLabel } from '../components/Content'
import { projects, visualItems } from '../data/projects'

export default function HomePage() {
  const landing = projects[0]
  return (
    <>
      <Hero />
      <section className="home-featured" id="featured">
        <Reveal>
          <SectionLabel number="01">FEATURED / GRADUATION PROJECT</SectionLabel>
          <div className="featured-heading">
            <div><span>LANDING</span><span>APP</span></div>
            <p>An AI-powered transition assistant helping international students navigate their first steps in a new country.</p>
          </div>
          <div className="featured-stage" data-cursor="media">
            <div className="feature-halo" aria-hidden="true" />
            <div className="feature-timeline glass-panel">
              <div className="mini-label"><span>YOUR ARRIVAL PLAN</span><span>02 / 06</span></div>
              {['Arrival', 'SIM Card', 'Bank', 'University', 'Healthcare', 'Daily Life'].map((item, index) => <div className={index < 2 ? 'done' : index === 2 ? 'current' : ''} key={item}><i>{index < 2 ? <Check size={11} /> : index + 1}</i><span>{item}</span></div>)}
            </div>
            <div className="feature-phone">
              <div className="phone-status"><span>9:41</span><i /><span>•••</span></div>
              <div className="phone-head"><b>Landing</b><span>AI settlement guide</span></div>
              <div className="phone-chat user">How do I open a bank account?</div>
              <div className="phone-chat ai"><Sparkles size={14} /><span>You&apos;ll need your passport, local address and enrolment document. I can compare nearby branches and help you prepare.</span></div>
              <div className="phone-action"><small>NEXT ACTION</small><b>Prepare your documents</b><span>View verified checklist <ArrowRight size={12} /></span></div>
            </div>
            <div className="feature-assistant glass-panel">
              <div className="mini-label"><span>AI GUIDANCE</span><i /></div>
              <Sparkles size={22} />
              <h3>One clear next step.</h3>
              <p>Personal, verified, bilingual support that moves with every completed task.</p>
              <div><span>OFFICIAL SOURCES</span><span>HUMAN ESCALATION</span></div>
            </div>
          </div>
          <div className="featured-footer">
            <ul>{landing.categories.map((category) => <li key={category}>{category}</li>)}</ul>
            <MagneticButton to="/projects/landing-app">VIEW CASE STUDY</MagneticButton>
          </div>
        </Reveal>
      </section>

      <section className="selected-work" id="work">
        <Reveal className="section-intro">
          <SectionLabel number="02">SELECTED WORK</SectionLabel>
          <div><h2>DESIGN ACROSS<br />SCREENS, SYSTEMS<br /><span>&amp; SERVICES.</span></h2><p>Selected projects exploring how research, interaction, and visual systems can make complex experiences feel clear and human.</p></div>
        </Reveal>
        <div className="project-list">
          {projects.slice(1).map((project, index) => <Reveal key={project.slug}><ProjectCard project={{ ...project, number: String(index + 1).padStart(2, '0') }} /></Reveal>)}
        </div>
        <div className="section-action"><MagneticButton to="/work" className="button-secondary">VIEW ALL PROJECTS</MagneticButton></div>
      </section>

      <section className="visual-preview" id="visuals">
        <Reveal className="section-intro visual-intro">
          <SectionLabel number="03">VISUAL ARCHIVE</SectionLabel>
          <div><h2>VISUAL<br />EXPERIMENTS.</h2><p>A collection of graphic experiments, typography and visual explorations. A supporting practice that sharpens composition, hierarchy, and craft.</p></div>
        </Reveal>
        <Gallery items={visualItems.slice(0, 4)} />
        <div className="section-action"><MagneticButton to="/visuals" className="button-secondary">EXPLORE THE ARCHIVE</MagneticButton></div>
      </section>

      <section className="about-preview" id="about">
        <Reveal>
          <SectionLabel number="04">ABOUT</SectionLabel>
          <div className="about-preview-grid">
            <div><span>JIAMING<br />ZHANG</span><MediaPlaceholder alt="Portrait of Jiaming Zhang, UX Designer based in Melbourne" variant="poster" label="PORTRAIT DIRECTION" /></div>
            <div className="about-preview-copy"><h2>UX Designer<br />based in Melbourne.</h2><p>I explore the space between people, products, and systems—using research to understand what matters and design to make the next interaction feel natural.</p><ul>{['UX Research', 'Product Design', 'Interaction Design', 'Service Design', 'AI Experience Design', 'Visual Communication'].map((skill) => <li key={skill}>{skill}</li>)}</ul><MagneticButton to="/about">MORE ABOUT ME</MagneticButton></div>
          </div>
        </Reveal>
      </section>
      <Footer />
    </>
  )
}
