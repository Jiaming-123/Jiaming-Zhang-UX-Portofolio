import { useCallback } from 'react'
import { useLanguage } from './language-context'
import { furnitureChinese } from './中文版'

export function useFurnitureCopy() {
  const { isChinese } = useLanguage()
  return useCallback((text: string) => isChinese ? furnitureChinese[text] ?? text : text, [isChinese])
}
