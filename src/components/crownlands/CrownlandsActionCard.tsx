import type { ActionName } from '../../crownlands/boardData'

export function CrownlandsActionCard({ action, className = '' }: { action: ActionName; className?: string }) {
  const name = action.toLowerCase()
  return <span className={`cl-action-card-art ${className}`}>
    <img src={`/crownlands/elements/${name}.webp`} alt={`${action} original action card`} />
  </span>
}
