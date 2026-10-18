import { zh } from '../i18n/中文版'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import BorderGlow from './BorderGlow'
import homepageCovers from '../data/homepage-covers.json'
import { observeProjectReveal } from '../../public/home-project-reveal.mjs'
import { useLanguage } from '../i18n/language-context'
import { chineseCoverDescriptions } from '../i18n/homepage'

export function Reveal({ children, className = '', variant = 'default' }: { children: ReactNode; className?: string; variant?: 'default' | 'project' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (variant === 'project') return observeProjectReveal(element, () => setVisible(true))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { rootMargin: '0px 0px 32% 0px', threshold: 0.01 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [variant])

  return <div ref={ref} className={`reveal-block${variant === 'project' ? ' home-project-reveal' : ''}${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>{children}</div>
}

export function SectionLabel({ number, children }: { number?: string; children: ReactNode }) {
  return <div className="section-label">{number && <span>{number}</span>}<p>{children}</p><i /></div>
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { isChinese } = useLanguage()
  const cover = project.slug === 'unilink' ? homepageCovers.unilink : project.slug === 'culturelens' ? homepageCovers.culturelens : project.slug === 'boardgamemate' ? homepageCovers.boardgamemate : project.slug === 'furniture' ? homepageCovers.furniture : project.slug === 'crownlands' ? homepageCovers.crownlands : undefined
  const isFurniture = project.slug === 'furniture'

  return (
    <article className={`project-card ${featured ? 'featured-card' : ''}`} style={{ '--project-color': project.color } as React.CSSProperties}>
      <BorderGlow
        className={`project-border-glow${isFurniture ? ' project-border-glow-furniture' : ''}`}
        edgeSensitivity={32}
        glowColor="194 93 58"
        backgroundColor="#07101f"
        borderRadius={22}
        glowRadius={isFurniture ? 40 : 28}
        glowIntensity={isFurniture ? 1.15 : 0.72}
        coneSpread={22}
        colors={isFurniture ? ['#38bdf8', '#00d4ff', project.color] : [project.color, '#0066ff', '#00d4ff']}
        fillOpacity={0.18}
      >
        <Link to={`/projects/${project.slug}`} className="project-visual-link" aria-label={isChinese ? zh.common.caseStudyLabel(project.title) : `View ${project.title} case study`} data-cursor="media">
          {cover ? <img className="project-cover-image" {...cover} alt={isChinese ? chineseCoverDescriptions[project.slug] : cover.alt} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 'inherit' }} /> : null}
          <span className="view-pill">{isChinese ? zh.common.viewCaseStudy : 'VIEW CASE STUDY'} <ArrowRight size={15} /></span>
        </Link>
      </BorderGlow>
      <div className="project-meta">
        <span className={`project-number${isFurniture ? ' project-number-furniture' : ''}`}>{project.number}</span>
        <div>
          <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
          <p>{project.summary}</p>
        </div>
        <ul>{project.categories.map((category) => <li key={category}>{category}</li>)}</ul>
      </div>
    </article>
  )
}
