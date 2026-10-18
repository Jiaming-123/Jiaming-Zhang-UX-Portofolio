import { zh } from '../i18n/中文版'
import { useEffect, useLayoutEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { setupProjectNavbar } from '../../public/project-navbar.mjs'
import '../../public/project-navbar.css'
import '../../public/project-chapters.css'
import { LanguageSwitch } from '../i18n/Language'
import { useLanguage } from '../i18n/language-context'

const navItems = [
  { label: 'Work', zh: zh.navigation.work, to: '/#featured' },
  { label: 'About', zh: zh.navigation.about, to: '/about' },
  { label: 'Contact', zh: zh.navigation.contact, to: '/contact' },
]

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname.replace(/\/$/, '') === '/projects/unilink' || pathname.replace(/\/$/, '') === '/projects/landing-app' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: .82, smoothWheel: true, wheelMultiplier: .84, syncTouch: false })
    const updateScrollTriggers = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    const resetScroll = () => lenis.scrollTo(0, { immediate: true, force: true })
    const chapterScroll = (event: Event) => {
      const request = event as CustomEvent<{ top: number; immediate: boolean; onComplete?: () => void }>
      event.preventDefault()
      lenis.scrollTo(request.detail.top, { immediate: request.detail.immediate, duration: .65, force: true, onComplete: request.detail.onComplete })
    }

    lenis.on('scroll', updateScrollTriggers)
    gsap.ticker.add(updateLenis)
    window.addEventListener('portfolio:reset-scroll', resetScroll)
    window.addEventListener('portfolio:chapter-scroll', chapterScroll)

    return () => {
      lenis.off('scroll', updateScrollTriggers)
      gsap.ticker.remove(updateLenis)
      window.removeEventListener('portfolio:reset-scroll', resetScroll)
      window.removeEventListener('portfolio:chapter-scroll', chapterScroll)
      lenis.destroy()
    }
  }, [pathname])
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
  const { isChinese } = useLanguage()
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 36)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => setupProjectNavbar(pathname, setHidden), [pathname])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav-shell ${compact ? 'is-compact' : ''} ${hidden ? 'ul-nav-hidden' : ''}`} aria-label={isChinese ? zh.navigation.primaryLabel : 'Primary navigation'}>
        <Link className="monogram" to="/" aria-label={isChinese ? zh.navigation.homeLabel : 'Jiaming Zhang, home'} data-cursor="link">JZ<span>.</span></Link>
        <nav className="desktop-nav" aria-label={isChinese ? zh.navigation.menuLabel : 'Main menu'}>
          {navItems.map((item) => (
            item.label === 'Work'
              ? <a key={item.to} href={item.to} data-cursor="link">{isChinese ? item.zh : item.label}</a>
              : <NavLink key={item.to} to={item.to} data-cursor="link" className={({ isActive }) => isActive ? 'active' : ''}>{isChinese ? item.zh : item.label}</NavLink>
          ))}
        </nav>
        <LanguageSwitch />
        <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label={isChinese ? zh.navigation.openMenu : 'Open menu'} aria-expanded={open}><Menu size={22} /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mobile-menu-head">
              <span>JZ<span className="cyan">.</span></span>
              <button type="button" onClick={() => setOpen(false)} aria-label={isChinese ? zh.navigation.closeMenu : 'Close menu'}><X size={24} /></button>
            </div>
            <nav aria-label={isChinese ? zh.navigation.mobileMenu : 'Mobile menu'}>
              {navItems.map((item, index) => (
                <motion.div key={item.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}>
                  {item.label === 'Work' ? <a href={item.to}><small>0{index + 1}</small>{isChinese ? item.zh : item.label}<ArrowUpRight size={25} /></a> : <Link to={item.to}><small>0{index + 1}</small>{isChinese ? item.zh : item.label}<ArrowUpRight size={25} /></Link>}
                </motion.div>
              ))}
            </nav>
            <p>{isChinese ? <>{zh.footer.role}<br />{zh.navigation.location}</> : <>UX / PRODUCT DESIGNER<br />MELBOURNE, AUSTRALIA</>}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function useProjectEntryReset() {
  const { pathname, hash } = useLocation()
  // AnimatePresence waits for the outgoing page. Reset on the incoming page's
  // actual mount, not only when the URL changes while the old page is visible.
  useLayoutEffect(() => {
    if (!pathname.startsWith('/projects/') || hash) return
    const restoration = history.scrollRestoration
    const anchoring = document.documentElement.style.overflowAnchor
    history.scrollRestoration = 'manual'
    document.documentElement.style.overflowAnchor = 'none'
    const reset = () => {
      window.dispatchEvent(new Event('portfolio:reset-scroll'))
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    window.addEventListener('pageshow', reset)
    reset()
    return () => {
      window.removeEventListener('pageshow', reset)
      history.scrollRestoration = restoration
      document.documentElement.style.overflowAnchor = anchoring
    }
  }, [pathname, hash])
}

export function ProjectEntryReset() {
  useProjectEntryReset()
  return null
}

export function PageTransition({ children }: { children: ReactNode }) {
  useProjectEntryReset()
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
  const targetX = useMotionValue(-100)
  const targetY = useMotionValue(-100)
  const size = useMotionValue(10)
  const opacity = useMotionValue(0)
  const x = useSpring(targetX, { mass: .14, stiffness: 500, damping: 32 })
  const y = useSpring(targetY, { mass: .14, stiffness: 500, damping: 32 })

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    const onMove = (event: PointerEvent) => {
      const hovering = Boolean((event.target as HTMLElement).closest('[data-cursor]'))
      const nextSize = hovering ? 50 : 10
      targetX.set(event.clientX - nextSize / 2)
      targetY.set(event.clientY - nextSize / 2)
      size.set(nextSize)
      opacity.set(1)
    }
    const onLeave = () => opacity.set(0)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [opacity, size, targetX, targetY])

  return (
    <motion.div
      className="custom-cursor"
      style={{ x, y, width: size, height: size, opacity }}
      aria-hidden="true"
    />
  )
}

export function Footer() {
  const { isChinese } = useLanguage()
  const { pathname } = useLocation()
  if (pathname.startsWith('/projects/')) return null

  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <footer className="site-footer" id="contact" data-pixel-headings={pathname === '/' ? '' : undefined}>
      <h2 lang="en">LET&apos;S CREATE<br /><span>MEANINGFUL</span><br />EXPERIENCES.</h2>
      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/contact" data-cursor="link">{isChinese ? zh.footer.email : 'EMAIL'} <ArrowUpRight size={15} /></Link>
          <a href="https://www.linkedin.com/in/jiaming-zhang-996b52280/" target="_blank" rel="noopener noreferrer" data-cursor="link">{isChinese ? zh.footer.linkedIn : 'LINKEDIN'} <ArrowUpRight size={15} /></a>
        </div>
        <p>Jiaming Zhang<br />{isChinese ? zh.footer.role : 'UX / Product Designer'}</p>
        <button type="button" onClick={toTop} data-cursor="link">{isChinese ? zh.footer.backToTop : 'BACK TO TOP'} <span>↑</span></button>
      </div>
    </footer>
  )
}
