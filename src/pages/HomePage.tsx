import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Layout'
import { ProjectCard, Reveal, SectionLabel } from '../components/Content'
import BorderGlow from '../components/BorderGlow'
import CursorGrid from '../components/CursorGrid'
import { projects } from '../data/projects'
import homepageCovers from '../data/homepage-covers.json'
import '../../public/home-project-reveal.css'

export default function HomePage() {
  const landing = projects[0]
  const cover = homepageCovers.unilink
  const selectedProjects = [projects[1], projects[3], projects[2], projects[4]]
  return (
    <>
      <Hero />
      <section className="home-featured home-landing-project" id="featured">
        <CursorGrid className="home-cursor-grid" cellSize={70} color="#38BDF8" radius={170} falloff="smooth" holdTime={320} fadeDuration={760} lineWidth={1.1} maxOpacity={0.62} fillOpacity={0.02} gridOpacity={0} cellRadius={2} clickPulse pulseSpeed={620} />
        <div className="reveal-block is-visible home-featured-content">
          <div className="home-landing-heading">
          <SectionLabel number="01">GRADUATION PROJECT</SectionLabel>
          <div className="home-landing-title-row">
            <h1>UniLink</h1>
            <p>A research-led peer support platform connecting first-year international students with relevant communities and verified senior mentors.</p>
          </div>
          </div>
          <Reveal variant="project">
            <BorderGlow
              className="featured-border-glow project-border-glow"
              edgeSensitivity={32}
              glowColor="194 93 58"
              backgroundColor="#07101f"
              borderRadius={22}
              glowRadius={28}
              glowIntensity={0.72}
              coneSpread={22}
              colors={[landing.color, '#0066ff', '#00d4ff']}
              fillOpacity={0.18}
            >
              <Link to="/projects/unilink" className="unilink-blank-cover project-visual-link" aria-label="View UniLink case study" data-cursor="media"><img className="unilink-cover-image project-cover-image" {...cover} loading="lazy" decoding="async" /><span className="view-pill">VIEW CASE STUDY <ArrowRight size={15} /></span></Link>
            </BorderGlow>
          </Reveal>
          <div className="featured-footer">
            <ul>{landing.categories.map((category) => <li key={category}>{category}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="selected-work" id="work">
        <Reveal className="section-intro">
          <SectionLabel number="02">DESIGN ACROSS SCREENS, SYSTEMS &amp; SERVICES</SectionLabel>
          <div><h2>DESIGN ACROSS<br />SCREENS, SYSTEMS<br /><span>&amp; SERVICES.</span></h2><p>Selected projects exploring how research, interaction, and visual systems can make complex experiences feel clear and human.</p></div>
        </Reveal>
        <div className="project-list home-project-grid">
          {selectedProjects.map((project, index) => <Reveal variant="project" key={project.slug}><ProjectCard project={{ ...project, number: String(index + 1).padStart(2, '0') }} /></Reveal>)}
        </div>
      </section>

      <Footer />
    </>
  )
}
