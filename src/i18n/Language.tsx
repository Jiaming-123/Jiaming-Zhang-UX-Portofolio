import { zh } from './中文版'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, useLanguage, type Language } from './language-context'
import '../styles/language.css'

const storageKey = 'portfolio.language.v1'

function readLanguage(): Language {
  try { return localStorage.getItem(storageKey) === 'zh' ? 'zh' : 'en' } catch { return 'en' }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readLanguage)
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    try { localStorage.setItem(storageKey, language) } catch { /* Language still works when storage is unavailable. */ }
  }, [language])
  useEffect(() => {
    const syncLanguage = (event: StorageEvent) => {
      if (event.key === storageKey) setLanguage(event.newValue === 'zh' ? 'zh' : 'en')
    }
    window.addEventListener('storage', syncLanguage)
    return () => window.removeEventListener('storage', syncLanguage)
  }, [])
  const value = useMemo(() => ({ language, setLanguage }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  return <div className="language-switch" role="group" aria-label={language === 'zh' ? zh.language.label : 'Website language'}>
    <button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>ENGLISH</button>
    <button type="button" lang="zh-CN" aria-pressed={language === 'zh'} onClick={() => setLanguage('zh')}>{zh.language.name}</button>
  </div>
}

export function LanguageSkipLink() {
  const { isChinese } = useLanguage()
  return <a className="skip-link" href="#main-content">{isChinese ? zh.common.skipToContent : 'Skip to content'}</a>
}
