import { lazy, Suspense } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { BoardGameMateIteration } from '../components/BoardGameMateIteration'
import { FurnitureCaseStudy } from '../components/FurnitureCaseStudy'
import { projectBySlug } from '../data/projects'
import { NotFoundPage } from './InfoPages'
import '../styles/furniture-hero.css'

const CultureLensCaseStudy = lazy(() => import('./CultureLensCaseStudy'))
const CrownlandsPage = lazy(() => import('./CrownlandsPage'))

function FurnitureHero() {
  return (
    <header className="project-hero furniture-poster-hero">
      <h1 className="sr-only">My Furniture Store</h1>
      <figure className="furniture-poster-media"><img src="/images/furniture/hero-group38-20261013.png" alt="End-to-end commerce website redesign / 2025. My Furniture Store. A high-spec commerce prototype that keeps the original product photography and catalogue information with new palette and layout design by me, with a more editorial, accessible and smooth shopping experience. Australian made timber furniture." width={1302} height={814} fetchPriority="high" /></figure>
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
  if (slug === 'furniture') return <><FurnitureHero /><main className="case-study"><FurnitureCaseStudy /><NextProject slug="culturelens" title="CultureLens Concierge" theme="furniture" /></main></>
  return <NotFoundPage />
}
