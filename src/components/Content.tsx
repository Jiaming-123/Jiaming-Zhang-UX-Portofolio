import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Check, Play, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { BoardGameMateCover } from './BoardGameMateCover'
import BorderGlow from './BorderGlow'

gsap.registerPlugin(ScrollTrigger)

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = gsap.fromTo(ref.current, { y: 46, opacity: 0 }, {
      y: 0, opacity: 1, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      onComplete: () => gsap.set(ref.current, { clearProps: 'transform,opacity' }),
    })
    return () => { animation.kill() }
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

export function SectionLabel({ number, children }: { number?: string; children: ReactNode }) {
  return <div className="section-label">{number && <span>{number}</span>}<p>{children}</p><i /></div>
}

export function MediaPlaceholder({ alt, className = '', label = 'IMAGE DIRECTION', variant = 'interface' }: { alt: string; className?: string; label?: string; variant?: 'interface' | 'mobile' | 'board' | 'poster' }) {
  return (
    <div className={`media-placeholder media-${variant} ${className}`} role="img" aria-label={alt} data-cursor="media">
      <div className="media-grid" aria-hidden="true" />
      <div className="media-art" aria-hidden="true">
        {variant === 'mobile' && <><i className="phone phone-one" /><i className="phone phone-two" /><i className="phone phone-three" /></>}
        {variant === 'interface' && <><i className="browser-frame" /><i className="browser-panel" /><i className="browser-card" /></>}
        {variant === 'board' && <><i className="board-shape board-one" /><i className="board-shape board-two" /><i className="board-shape board-three" /></>}
        {variant === 'poster' && <><i className="poster-type">Aa</i><i className="poster-line" /></>}
      </div>
      <div className="media-alt"><span>{label}</span><p>[ALT: {alt}]</p></div>
    </div>
  )
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'featured-card' : ''}`} style={{ '--project-color': project.color } as React.CSSProperties}>
      <BorderGlow
        className="project-border-glow"
        edgeSensitivity={32}
        glowColor="194 93 58"
        backgroundColor="#07101f"
        borderRadius={22}
        glowRadius={28}
        glowIntensity={0.72}
        coneSpread={22}
        colors={[project.color, '#0066ff', '#00d4ff']}
        fillOpacity={0.18}
      >
        <Link to={`/projects/${project.slug}`} className="project-visual-link" aria-label={`View ${project.title} case study`} data-cursor="media">
          {project.slug === 'boardgamemate' ? <BoardGameMateCover /> : project.slug === 'furniture' ? <img className="furniture-project-cover-image" src="/images/furniture/furniture-cover.png" width={3172} height={1984} loading="lazy" decoding="async" alt={project.heroAlt} /> : <MediaPlaceholder alt={project.heroAlt} variant={project.slug === 'crownlands' ? 'board' : 'mobile'} label={project.eyebrow.toUpperCase()} />}
          <span className="view-pill">VIEW CASE STUDY <ArrowRight size={15} /></span>
        </Link>
      </BorderGlow>
      <div className="project-meta">
        <span className="project-number">{project.number}</span>
        <div>
          <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
          <p>{project.summary}</p>
        </div>
        <ul>{project.categories.map((category) => <li key={category}>{category}</li>)}</ul>
      </div>
    </article>
  )
}

export function CaseStudySection({ number, label, title, children, aside }: { number: string; label: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="case-section">
      <Reveal>
        <SectionLabel number={number}>{label}</SectionLabel>
        <div className="case-section-grid">
          <h2>{title}</h2>
          <div className="case-copy">{children}</div>
          {aside && <aside>{aside}</aside>}
        </div>
      </Reveal>
    </section>
  )
}

export function VideoPlayer({ src, poster, title, alt }: { src: string; poster?: string; title: string; alt: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setLoad(true), { rootMargin: '240px' })
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div className="video-player" ref={wrapperRef} data-cursor="media">
      {load && !failed ? (
        <video controls preload="metadata" poster={poster} onError={() => setFailed(true)} aria-label={alt}>
          <source src={src} type="video/mp4" />
          Your browser does not support MP4 video.
        </video>
      ) : (
        <div className="video-fallback" role="img" aria-label={alt}>
          <span className="play-button"><Play size={22} fill="currentColor" /></span>
          <div><small>VIDEO MEDIA SLOT</small><p>[ALT: {alt}]</p></div>
        </div>
      )}
      <div className="video-caption"><span>{title}</span><span>MP4 · RESPONSIVE PLAYER</span></div>
    </div>
  )
}

const landingTasks = [
  { label: 'Arrival', note: 'Welcome & orientation' },
  { label: 'SIM Card', note: 'Compare verified options' },
  { label: 'Bank', note: 'Prepare required documents' },
  { label: 'University', note: 'Complete registration' },
  { label: 'Healthcare', note: 'Understand local access' },
  { label: 'Daily Life', note: 'Build local confidence' },
]

export function LandingDemo() {
  const [active, setActive] = useState(1)
  const [complete, setComplete] = useState<number[]>([0])
  const task = landingTasks[active]
  const markComplete = () => {
    if (!complete.includes(active)) setComplete([...complete, active])
    if (active < landingTasks.length - 1) setTimeout(() => setActive(active + 1), 300)
  }
  return (
    <div className="landing-demo" aria-label="Interactive Landing App timeline demo">
      <div className="demo-timeline" role="tablist" aria-label="Settlement timeline">
        {landingTasks.map((item, index) => (
          <button key={item.label} type="button" onClick={() => setActive(index)} className={active === index ? 'active' : ''} role="tab" aria-selected={active === index}>
            <span>{complete.includes(index) ? <Check size={14} /> : String(index + 1).padStart(2, '0')}</span><b>{item.label}</b><small>{item.note}</small>
          </button>
        ))}
      </div>
      <div className="demo-phone">
        <div className="demo-phone-top"><span>LANDING</span><i /><span>AI GUIDE</span></div>
        <AnimatePresence mode="wait">
          <motion.div key={active} className="demo-conversation" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <span className="demo-chip">{task.label.toUpperCase()} · STEP {active + 1}</span>
            <p className="user-message">What should I do about {task.label.toLowerCase()}?</p>
            <div className="ai-message"><Sparkles size={15} /><p>I&apos;ll help you understand the next step, check the official requirements, and prepare what you need.</p></div>
            <div className="action-card"><small>RECOMMENDED ACTION</small><b>{task.note}</b><span>Verified guidance · Bilingual support</span></div>
            <button type="button" onClick={markComplete} disabled={complete.includes(active)}>{complete.includes(active) ? 'TASK COMPLETE' : 'MARK AS COMPLETE'} <Check size={15} /></button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const boardGameScreens = [
  { title: 'Discover Players', index: '01', copy: 'Find compatible players through interests, style, and availability.' },
  { title: 'Tutorial', index: '02', copy: 'Learn the essentials before joining a table.' },
  { title: 'Community', index: '03', copy: 'Understand a group before taking the first social step.' },
  { title: 'Chat', index: '04', copy: 'Move from shared interest to a real game session.' },
]

const furnitureScreens = [
  { title: 'Homepage', index: '01', copy: 'A calm editorial entry into collections and rooms.' },
  { title: 'Product Browsing', index: '02', copy: 'Flexible filters with image-led comparison.' },
  { title: 'Product Detail', index: '03', copy: 'Materials, dimensions, and delivery at the right moment.' },
  { title: 'Cart', index: '04', copy: 'A clear review before committing to purchase.' },
]

export function HorizontalDemo({ type }: { type: 'boardgame' | 'furniture' }) {
  const screens = type === 'boardgame' ? boardGameScreens : furnitureScreens
  const [active, setActive] = useState(0)
  const touchStart = useRef(0)
  const next = () => setActive((value) => Math.min(value + 1, screens.length - 1))
  const previous = () => setActive((value) => Math.max(value - 1, 0))
  return (
    <div className={`horizontal-demo ${type}`}>
      <p className="sr-only">Use the previous and next buttons, drag with a mouse, or swipe on touch screens to explore this flow.</p>
      <div className="demo-toolbar">
        <span>INTERACTIVE FLOW · {String(active + 1).padStart(2, '0')} / 04</span>
        <div><button type="button" onClick={previous} disabled={active === 0} aria-label="Previous screen"><ArrowLeft /></button><button type="button" onClick={next} disabled={active === screens.length - 1} aria-label="Next screen"><ArrowRight /></button></div>
      </div>
      <div className="demo-window" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { const distance = event.changedTouches[0].clientX - touchStart.current; if (distance < -45) next(); if (distance > 45) previous() }}>
        <motion.div className="demo-track" animate={{ x: `-${active * 100}%` }} transition={{ type: 'spring', stiffness: 170, damping: 24 }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (info.offset.x < -45) next(); if (info.offset.x > 45) previous() }}>
          {screens.map((screen) => (
            <div className="demo-screen" key={screen.title}>
              <div className="screen-mock">
                <span>{screen.index}</span>
                <div className="mock-nav" />
                <div className="mock-hero" />
                <div className="mock-grid"><i /><i /><i /></div>
              </div>
              <div className="screen-copy"><small>KEY FLOW / {screen.index}</small><h3>{screen.title}</h3><p>{screen.copy}</p></div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="demo-dots">{screens.map((screen, index) => <button type="button" onClick={() => setActive(index)} className={active === index ? 'active' : ''} key={screen.title} aria-label={`Show ${screen.title}`} />)}</div>
    </div>
  )
}

export type GalleryItem = { title: string; year: string; category: string; alt: string; size?: string }

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return (
    <>
      <div className="masonry-gallery">
        {items.map((item, index) => (
          <button className={`gallery-item ${item.size ?? ''}`} key={item.title} type="button" onClick={() => setSelected(item)} data-cursor="media">
            <MediaPlaceholder alt={item.alt} variant="poster" label={`${String(index + 1).padStart(2, '0')} / ${item.category}`} />
            <span><b>{item.title}</b><small>{item.year} · {item.category}</small></span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} fullscreen viewer`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <button type="button" onClick={() => setSelected(null)} aria-label="Close fullscreen viewer"><X size={24} /></button>
            <motion.div initial={{ scale: .96 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}>
              <MediaPlaceholder alt={selected.alt} variant="poster" label={selected.category.toUpperCase()} />
              <div><h3>{selected.title}</h3><p>{selected.year} · {selected.category}</p></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
