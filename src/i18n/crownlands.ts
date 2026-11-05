import { useCallback } from 'react'
import { useLanguage } from './language-context'
import { crownlandsChinese } from './中文版'

type Values = Record<string, string | number>

export function useCrownlandsCopy() {
  const { isChinese } = useLanguage()
  return useCallback((text: string, values: Values = {}) => {
    // Match state retains its original English messages; localize at the UI boundary.
    const handoff = /^Pass the device to (Blue|Red|Yellow|Black) Kingdom\.$/.exec(text)
    if (isChinese && handoff) return crownlandsChinese['Pass the device to {kingdom} Kingdom.'].replace('{kingdom}', crownlandsChinese[handoff[1]])
    const copy = isChinese ? crownlandsChinese[text] ?? text : text
    return copy.replace(/\{(\w+)\}/g, (token, key: string) => String(values[key] ?? token))
  }, [isChinese])
}
