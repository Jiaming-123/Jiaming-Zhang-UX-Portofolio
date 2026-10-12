import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import '../styles/hero-spheres.css'

const keywords = ['PRODUCT', 'INTERACTION', 'EXPERIENCE', 'SERVICE', 'AI']

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { amount: .08 })
  const reducedMotion = useReducedMotion()
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

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
            <p className="hero-intro">UX Design student at the University of Melbourne, creating digital and physical experiences through interaction, systems and play.</p>
            <div className="keyword-line keyword-line--list">
              <span>DESIGNING</span>
              <div>{keywords.map(word => <b key={word}>{word}</b>)}</div>
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#featured" aria-label="Scroll to featured work" data-cursor="link"><ArrowDown size={16} /><span>EXPLORE WORK</span></a>
    </section>
  )
}
