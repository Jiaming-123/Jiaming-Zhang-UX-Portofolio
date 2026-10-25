import { useCallback } from 'react'
import { useLanguage } from './language-context'
import { unilinkChinese } from './中文版'

export function useUniLinkCopy() {
  const { isChinese } = useLanguage()
  return useCallback((text: string) => isChinese ? unilinkChinese[text] ?? text : text, [isChinese])
}
