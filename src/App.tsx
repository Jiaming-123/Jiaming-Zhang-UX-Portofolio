import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CursorEffect, Navbar, PageTransition, ScrollToTop, SmoothScroll } from './components/Layout'
import HomePage from './pages/HomePage'
import { AboutPage, ContactPage, NotFoundPage, VisualsPage, WorkPage } from './pages/InfoPages'
import ProjectPage from './pages/ProjectPage'

function App() {
  const location = useLocation()
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SmoothScroll />
      <ScrollToTop />
      <CursorEffect />
      <Navbar />
      <div id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/work" element={<PageTransition><WorkPage /></PageTransition>} />
            <Route path="/projects/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
            <Route path="/visuals" element={<PageTransition><VisualsPage /></PageTransition>} />
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
