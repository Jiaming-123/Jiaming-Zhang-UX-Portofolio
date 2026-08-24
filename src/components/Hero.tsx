import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const keywords = ['PRODUCT', 'SERVICE', 'AI', 'INTERACTION', 'EXPERIENCE']

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { amount: .08 })
  const [keyword, setKeyword] = useState(0)

  useEffect(() => {
    if (!isInView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => setKeyword((current) => (current + 1) % keywords.length), 1700)
    return () => window.clearInterval(interval)
  }, [isInView])

  return (
    <section ref={heroRef} className={`hero ${isInView ? 'is-in-view' : ''}`} id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="particles" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ '--i': index } as React.CSSProperties} />)}</div>
      <div className="hero-content">
        <div className="hero-kicker"><span>UX / PRODUCT DESIGNER</span><span>MELBOURNE, AU</span><span>SHENZHEN, CN</span></div>
        <h1 aria-label="Jiaming Zhang">
          <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .1 }}>JIAMING</motion.span>
          <motion.span className="outline-type" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .18 }}>ZHANG</motion.span>
        </h1>
        <div className="hero-foot">
          <p>I design meaningful interactions between people, products, and systems.</p>
          <div className="hero-intro-wrap">
            <p className="hero-intro">UX Design student at the University of Melbourne, creating digital and physical experiences through interaction, systems and play.</p>
            <div className="keyword-line"><span>DESIGNING</span><AnimatePresence mode="wait"><motion.b key={keywords[keyword]} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .3 }}>{keywords[keyword]}</motion.b></AnimatePresence></div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#featured" aria-label="Scroll to featured work" data-cursor="link"><ArrowDown size={16} /><span>EXPLORE WORK</span></a>
    </section>
  )
}
