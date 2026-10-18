import { zh } from '../i18n/中文版'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Layout'
import { ProjectCard, Reveal, SectionLabel } from '../components/Content'
import BorderGlow from '../components/BorderGlow'
import { projects } from '../data/projects'
import homepageCovers from '../data/homepage-covers.json'
import { useLanguage } from '../i18n/language-context'
import { chineseCoverDescriptions, localizeHomepageProject } from '../i18n/homepage'
import '../../public/home-project-reveal.css'

export default function HomePage() {
  const { language, isChinese } = useLanguage()
  const landing = localizeHomepageProject(projects[0], language)
  const cover = homepageCovers.unilink
  const selectedProjects = [projects[1], projects[3], projects[2], projects[4]]
  return (
    <>
      <Hero />
      <section className="home-featured home-landing-project" id="featured">
        <div className="reveal-block is-visible home-featured-content">
          <div className="home-landing-heading">
          <SectionLabel number="01">{isChinese ? zh.home.graduationProject : 'GRADUATION PROJECT'}</SectionLabel>
          <div className="home-landing-title-row">
            <h1>UniLink</h1>
            <p>{isChinese ? zh.home.featuredSummary : 'A research-led peer support platform connecting first-year international students with relevant communities and verified senior mentors.'}</p>
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
              <Link to="/projects/unilink" className="unilink-blank-cover project-visual-link" aria-label={isChinese ? zh.common.caseStudyLabel('UniLink') : 'View UniLink case study'} data-cursor="media"><img className="unilink-cover-image project-cover-image" {...cover} alt={isChinese ? chineseCoverDescriptions.unilink : cover.alt} loading="lazy" decoding="async" /><span className="view-pill">{isChinese ? zh.common.viewCaseStudy : 'VIEW CASE STUDY'} <ArrowRight size={15} /></span></Link>
            </BorderGlow>
          </Reveal>
          <div className="featured-footer">
            <ul>{landing.categories.map((category) => <li key={category}>{category}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="selected-work" id="work">
        <Reveal className="section-intro">
          <SectionLabel number="02">{isChinese ? zh.home.selectedLabel : 'DESIGN ACROSS SCREENS, SYSTEMS & SERVICES'}</SectionLabel>
          <div><h2>{isChinese ? <>{zh.home.selectedHeading[0]}<br />{zh.home.selectedHeading[1]}<br />{zh.home.selectedHeading[2]}<br /><span>{zh.home.selectedHeading[3]}</span></> : <>DESIGN ACROSS<br />SCREENS,<br />SYSTEMS<br /><span>&amp; SERVICES.</span></>}</h2><p>{isChinese ? zh.home.selectedIntro : 'Selected projects exploring how research, interaction, and visual systems can make complex experiences clear and human-centred.'}</p></div>
        </Reveal>
        <div className="project-list home-project-grid">
          {selectedProjects.map((project, index) => <Reveal variant="project" key={project.slug}><ProjectCard project={{ ...localizeHomepageProject(project, language), number: String(index + 1).padStart(2, '0') }} /></Reveal>)}
        </div>
      </section>

      <Footer />
    </>
  )
}
