import { useCallback } from 'react'
import { useLanguage } from './language-context'
import { boardGameMateChinese } from './中文版'

export function useBoardGameMateCopy() {
  const { isChinese } = useLanguage()
  return useCallback((text: string) => isChinese ? boardGameMateChinese[text] ?? text : text, [isChinese])
}
