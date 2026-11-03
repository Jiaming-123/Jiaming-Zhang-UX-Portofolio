import { useCallback } from 'react'
import { useLanguage } from './language-context'
import { cultureLensChinese } from './中文版'

export function useCultureLensCopy() {
  const { isChinese } = useLanguage()
  return useCallback((text: string, context?: string) => isChinese ? cultureLensChinese[context ?? text] ?? cultureLensChinese[text] ?? text : text, [isChinese])
}
