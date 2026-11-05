import { useCrownlandsCopy } from '../../i18n/crownlands'
import { useLanguage } from '../../i18n/language-context'
import type { ActionName } from '../../crownlands/boardData'

export function CrownlandsActionCard({ action, className = '' }: { action: ActionName; className?: string }) {
  const t = useCrownlandsCopy()
  const { isChinese } = useLanguage()
  const name = action.toLowerCase()
  return <span className={`cl-action-card-art ${className}`}>
    <img src={isChinese ? `/crownlands/zh/${name}.webp` : `/crownlands/elements/${name}.webp`} alt={t("{action} original action card", { action: t(action) })} />
  </span>
}
