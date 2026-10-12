import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import '../public/crownlands-mobile-20260913.css'
import '../public/furniture-mobile-hero-20260918.css'
import '../public/project-mobile-grids-20260918.css'
import '../public/unilink-blank-cover-20260918.css'
import '../public/profile-contact-20261002.css'
import '../public/unilink-featured-layout-20261002.css'
import '../public/case-next-project-20261002.css'
import '../public/home-project-reveal.css'
import '../public/furniture-warm-palette.css'
import '../public/furniture-cover-fill.css'
import '../public/project-footer-themes-20261003.css'
import '../public/culturelens-hero-overview.css'
import '../public/culturelens-ai-image-label.css'
import '../public/project-navbar.css'
import '../public/project-chapters.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
