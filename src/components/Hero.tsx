import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import '../styles/hero-spheres.css'

const keywords = ['PRODUCT', 'SERVICE', 'AI', 'INTERACTION', 'EXPERIENCE']

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { amount: .08 })
  const reducedMotion = useReducedMotion()
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [keyword, setKeyword] = useState(0)

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!isInView || !pageVisible || reducedMotion) return
    const interval = window.setInterval(() => setKeyword(current => (current + 1) % keywords.length), 1700)
    return () => window.clearInterval(interval)
  }, [isInView, pageVisible, reducedMotion])

  return (
    <section ref={heroRef} className={`hero hero--rotating-spheres ${isInView ? 'is-in-view' : ''} ${pageVisible ? '' : 'hero--page-hidden'}`} id="top">
      <div className="hero-spheres" aria-hidden="true">
        <div className="hero-sphere hero-sphere--left" />
        <div className="hero-sphere hero-sphere--right" />
      </div>
      <div className="hero-content">
        <div className="hero-kicker"><span className="hero-location">SHENZHEN, CN<br />MELBOURNE, AU</span></div>
        <h1 aria-label="Jiaming Zhang">
          <motion.span initial={reducedMotion ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .1 }}>JIAMING</motion.span>
          <motion.span className="outline-type" initial={reducedMotion ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .18 }}>ZHANG</motion.span>
        </h1>
        <div className="hero-foot">
          <p>I design meaningful interactions between people, products, and systems.</p>
          <div className="hero-intro-wrap">
            <p className="hero-intro">Hi! I am a UX Design student at the University of Melbourne, interesting in creating digital and physical experiences through interaction, systems and play.</p>
            <div className="keyword-line">
              <span>DESIGNING</span>
              {reducedMotion ? <b>{keywords[0]}</b> : <AnimatePresence mode="wait" initial={false}><motion.b key={keywords[keyword]} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .3 }}>{keywords[keyword]}</motion.b></AnimatePresence>}
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#featured" aria-label="Scroll to featured work" data-cursor="link"><ArrowDown size={16} /><span>EXPLORE WORK</span></a>
    </section>
  )
}
