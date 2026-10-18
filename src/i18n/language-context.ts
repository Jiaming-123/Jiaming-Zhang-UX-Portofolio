import { createContext, useContext } from 'react'

export type Language = 'en' | 'zh'
export const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void } | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage requires LanguageProvider')
  return { ...context, isChinese: context.language === 'zh' }
}
