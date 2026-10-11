import { lazy, Suspense } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { BoardGameMateIteration } from '../components/BoardGameMateIteration'
import { FurnitureCaseStudy } from '../components/FurnitureCaseStudy'
import { projectBySlug, type Project } from '../data/projects'
import { NotFoundPage } from './InfoPages'

const CultureLensCaseStudy = lazy(() => import('./CultureLensCaseStudy'))
const CrownlandsPage = lazy(() => import('./CrownlandsPage'))

function FurnitureHero({ project }: { project: Project }) {
  return (
    <header className="project-hero" style={{ '--project-color': project.color } as React.CSSProperties}>
      <div className="project-hero-top"><span>{project.eyebrow.toUpperCase()} / {project.year}</span></div>
      <h1>{project.title.toUpperCase()}</h1>
      <div className="project-hero-intro"><p>{project.heroStatement}</p><ul>{project.categories.map((category) => <li key={category}>{category}</li>)}</ul></div>
      <a className="furniture-live-link" href="https://my-furniture-store-delta.vercel.app/" target="_blank" rel="noreferrer" data-cursor="link"><span>VIEW THE LIVE EXPERIENCE</span><strong>My Furniture Store Redesign Project Link</strong><ArrowRight /></a>
      <figure className="furniture-hero-media"><img src="/images/furniture/cover.png" alt={project.heroAlt} /></figure>
      <a href="#overview" className="project-scroll" data-cursor="link">SCROLL TO EXPLORE <ArrowDown size={15} /></a>
    </header>
  )
}

function NextProject({ slug, title, theme }: { slug: string; title: string; theme: string }) {
  return <Link className="case-next-project" data-case-theme={theme} to={`/projects/${slug}`}><span>NEXT PROJECT</span><strong>{title}</strong><ArrowUpRight aria-hidden="true" /></Link>
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projectBySlug(slug)
  if (!project) return <NotFoundPage />
  if (slug === 'culturelens') return <Suspense fallback={<p role="status">Opening CultureLens…</p>}><CultureLensCaseStudy /></Suspense>
  if (slug === 'crownlands') return <Suspense fallback={<p role="status">Opening Crownlands…</p>}><CrownlandsPage /></Suspense>
  if (slug === 'boardgamemate') return <main className="case-study"><BoardGameMateIteration /><NextProject slug="furniture" title="My Furniture Store" theme="boardgamemate" /></main>
  if (slug === 'furniture') return <><FurnitureHero project={project} /><main className="case-study"><FurnitureCaseStudy /><NextProject slug="culturelens" title="CultureLens Concierge" theme="furniture" /></main></>
  return <NotFoundPage />
}
