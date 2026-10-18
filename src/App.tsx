import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CursorEffect, Navbar, PageTransition, ProjectEntryReset, ScrollToTop, SmoothScroll } from './components/Layout'
import HomePage from './pages/HomePage'
import { AboutPage, ContactPage, NotFoundPage } from './pages/InfoPages'
import ProjectPage from './pages/ProjectPage'
import FlyingMascot from './components/FlyingMascot'
import { useLanguage } from './i18n/language-context'

const UniLinkCaseStudy = lazy(() => import('./pages/UniLinkCaseStudy'))

function App() {
  const location = useLocation()
  const { isChinese } = useLanguage()
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{isChinese ? '跳转到正文' : 'Skip to content'}</a>
      <SmoothScroll />
      <ScrollToTop />
      <CursorEffect />
      <Navbar />
      <FlyingMascot />
      <div id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/work" element={<Navigate to="/#featured" replace />} />
            <Route path="/projects/unilink" element={<Suspense fallback={<main style={{minHeight:'100svh',padding:'160px 5vw'}}>Loading UniLink…</main>}><ProjectEntryReset /><UniLinkCaseStudy /></Suspense>} />
            <Route path="/projects/landing-app" element={<Navigate to="/projects/unilink" replace />} />
            <Route path="/projects/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
