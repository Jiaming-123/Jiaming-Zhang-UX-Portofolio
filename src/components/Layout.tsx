import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Work', to: '/work' },
  { label: 'Visuals', to: '/visuals' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
  return null
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav-shell ${compact ? 'is-compact' : ''}`} aria-label="Primary navigation">
        <Link className="monogram" to="/" aria-label="Jiaming Zhang, home" data-cursor="link">JZ<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Main menu">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} data-cursor="link" className={({ isActive }) => isActive ? 'active' : ''}>{item.label}</NavLink>
          ))}
        </nav>
        <span className="nav-status"><i />AVAILABLE FOR OPPORTUNITIES</span>
        <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu size={22} /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mobile-menu-head">
              <span>JZ<span className="cyan">.</span></span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
            </div>
            <nav aria-label="Mobile menu">
              {navItems.map((item, index) => (
                <motion.div key={item.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}>
                  <Link to={item.to}><small>0{index + 1}</small>{item.label}<ArrowUpRight size={25} /></Link>
                </motion.div>
              ))}
            </nav>
            <p>UX / PRODUCT DESIGNER<br />MELBOURNE, AUSTRALIA</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function MagneticButton({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setOffset({ x: (event.clientX - rect.left - rect.width / 2) * .14, y: (event.clientY - rect.top - rect.height / 2) * .14 })
  }
  const inner = <motion.span animate={offset} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>{children}<ArrowUpRight size={16} /></motion.span>
  return to.startsWith('http') || to.startsWith('mailto:') ? (
    <a className={`magnetic-button ${className}`} href={to} onMouseMove={onMove} onMouseLeave={() => setOffset({ x: 0, y: 0 })} data-cursor="link">{inner}</a>
  ) : (
    <Link className={`magnetic-button ${className}`} to={to} onMouseMove={onMove} onMouseLeave={() => setOffset({ x: 0, y: 0 })} data-cursor="link">{inner}</Link>
  )
}

export function CursorEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setVisible(true)
      setHovering(Boolean((event.target as HTMLElement).closest('[data-cursor]')))
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <motion.div
      className="custom-cursor"
      animate={{ x: position.x - (hovering ? 25 : 5), y: position.y - (hovering ? 25 : 5), width: hovering ? 50 : 10, height: hovering ? 50 : 10, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', mass: .14, stiffness: 500, damping: 32 }}
      aria-hidden="true"
    />
  )
}

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-kicker"><span>HAVE A PROJECT IN MIND?</span><span>MELBOURNE · 2026</span></div>
      <h2>LET&apos;S CREATE<br /><span>MEANINGFUL</span><br />EXPERIENCES.</h2>
      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/contact" data-cursor="link">EMAIL <ArrowUpRight size={15} /></Link>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-cursor="link">LINKEDIN <ArrowUpRight size={15} /></a>
        </div>
        <p>Jiaming Zhang<br />UX / Product Designer</p>
        <button type="button" onClick={toTop} data-cursor="link">BACK TO TOP <span>↑</span></button>
      </div>
    </footer>
  )
}
