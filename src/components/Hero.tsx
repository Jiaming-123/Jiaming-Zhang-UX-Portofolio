import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import '../styles/hero-spheres.css'
import { useLanguage } from '../i18n/language-context'

const keywords = ['PRODUCT', 'SERVICE', 'AI', 'INTERACTION', 'EXPERIENCE']
const chineseKeywords = ['产品', '服务', '人工智能', '交互', '体验']

export function Hero() {
  const { isChinese } = useLanguage()
  const visibleKeywords = isChinese ? chineseKeywords : keywords
  const heroRef = useRef<HTMLElement>(null)
  const isInView = useInView(heroRef, { amount: .08 })
  const reducedMotion = useReducedMotion()
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [keyword, setKeyword] = useState(0)
  const [portraitReady, setPortraitReady] = useState(false)
  const [portraitEntered, setPortraitEntered] = useState(false)

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
        <div className="hero-kicker"><span className="hero-location">{isChinese ? <>中国 · 深圳<br />澳大利亚 · 墨尔本</> : <>SHENZHEN, CN<br />MELBOURNE, AU</>}</span></div>
        <h1 aria-label="Jiaming Zhang">
          <motion.span initial={reducedMotion ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .1 }}>JIAMING</motion.span>
          <motion.span className="outline-type" initial={reducedMotion ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .18 }}>ZHANG</motion.span>
        </h1>
        <div className="hero-foot">
          <p>{isChinese ? '以设计连接人与产品和系统，创造有意义的互动体验。' : 'I design meaningful interactions between people, products, and systems.'}</p>
          <div className="hero-intro-wrap">
            <div className="hero-portrait">
              <div className="hero-portrait-window">
                <motion.img src="/images/hero-profile-20261013.png" alt={isChinese ? 'Jiaming Zhang 身穿毕业礼服，怀抱泰迪熊' : 'Jiaming Zhang in graduation robes holding a teddy bear'} width={1024} height={1536} fetchPriority="high" onLoad={() => setPortraitReady(true)} initial={reducedMotion ? false : { y: '100%' }} animate={{ y: reducedMotion || portraitReady ? '0%' : '100%' }} transition={{ duration: reducedMotion ? 0 : .95, delay: reducedMotion ? 0 : .35, ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={definition => { if (portraitReady && typeof definition === 'object' && !Array.isArray(definition) && definition.y === '0%') setPortraitEntered(true) }} />
              </div>
              <motion.span className="hero-portrait-hi" lang="en" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: reducedMotion || portraitEntered ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : .5 }}>Hi! 👋</motion.span>
            </div>
            <p className="hero-intro">{isChinese ? 'Hi! 我是墨尔本大学用户体验设计专业的学生，热衷于通过交互、系统与游戏，打造数字与实体体验。' : 'Hi! I am a UX Design student at the University of Melbourne, interesting in creating digital and physical experiences through interaction, systems and play.'}</p>
            <div className="keyword-line">
              <span>{isChinese ? '设计领域' : 'DESIGNING'}</span>
              {reducedMotion ? <b>{visibleKeywords[0]}</b> : <AnimatePresence mode="wait" initial={false}><motion.b key={visibleKeywords[keyword]} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .3 }}>{visibleKeywords[keyword]}</motion.b></AnimatePresence>}
            </div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#featured" aria-label={isChinese ? '向下浏览精选作品' : 'Scroll to featured work'} data-cursor="link"><ArrowDown size={16} /><span>{isChinese ? '探索作品' : 'EXPLORE WORK'}</span></a>
    </section>
  )
}
