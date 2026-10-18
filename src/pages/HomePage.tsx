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
          <SectionLabel number="01">{isChinese ? '毕业设计' : 'GRADUATION PROJECT'}</SectionLabel>
          <div className="home-landing-title-row">
            <h1>UniLink</h1>
            <p>{isChinese ? '一个以研究为基础的同伴支持平台，帮助初入大学的国际学生找到契合自身需求的社群与经过认证的高年级导师。' : 'A research-led peer support platform connecting first-year international students with relevant communities and verified senior mentors.'}</p>
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
              <Link to="/projects/unilink" className="unilink-blank-cover project-visual-link" aria-label={isChinese ? '查看 UniLink 项目案例' : 'View UniLink case study'} data-cursor="media"><img className="unilink-cover-image project-cover-image" {...cover} alt={isChinese ? chineseCoverDescriptions.unilink : cover.alt} loading="lazy" decoding="async" /><span className="view-pill">{isChinese ? '查看项目案例' : 'VIEW CASE STUDY'} <ArrowRight size={15} /></span></Link>
            </BorderGlow>
          </Reveal>
          <div className="featured-footer">
            <ul>{landing.categories.map((category) => <li key={category}>{category}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="selected-work" id="work">
        <Reveal className="section-intro">
          <SectionLabel number="02">{isChinese ? '以设计贯通界面、系统与服务' : 'DESIGN ACROSS SCREENS, SYSTEMS & SERVICES'}</SectionLabel>
          <div><h2>{isChinese ? <>以设计贯通<br />界面、<br />系统<br /><span>与服务。</span></> : <>DESIGN ACROSS<br />SCREENS,<br />SYSTEMS<br /><span>&amp; SERVICES.</span></>}</h2><p>{isChinese ? '这些精选项目探索如何通过研究、交互与视觉系统，让复杂的体验清晰易懂，并真正以人为本。' : 'Selected projects exploring how research, interaction, and visual systems can make complex experiences clear and human-centred.'}</p></div>
        </Reveal>
        <div className="project-list home-project-grid">
          {selectedProjects.map((project, index) => <Reveal variant="project" key={project.slug}><ProjectCard project={{ ...localizeHomepageProject(project, language), number: String(index + 1).padStart(2, '0') }} /></Reveal>)}
        </div>
      </section>

      <Footer />
    </>
  )
}
