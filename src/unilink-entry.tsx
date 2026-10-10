import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CursorEffect, Navbar, ProjectEntryReset, ScrollToTop } from './components/Layout'
import UniLinkCaseStudy from './pages/UniLinkCaseStudy'
import './styles.css'

// UniLink has its own document so its build cannot replace the newer portfolio shell.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ScrollToTop />
        <ProjectEntryReset />
        <CursorEffect />
        <Navbar />
        <div id="main-content"><UniLinkCaseStudy /></div>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)
