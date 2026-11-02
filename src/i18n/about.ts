import { useCallback } from 'react'
import { useLanguage } from './language-context'
import { aboutChinese } from './中文版'

export function useAboutCopy() {
  const { isChinese } = useLanguage()
  return useCallback((text: string) => isChinese ? aboutChinese[text] ?? text : text, [isChinese])
}
