import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import './BorderGlow.css'

interface BorderGlowProps {
  children: ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  animated?: boolean
  colors?: string[]
  fillOpacity?: number
}

interface AnimationOptions {
  start?: number
  end?: number
  duration?: number
  delay?: number
  ease?: (value: number) => number
  onUpdate: (value: number) => void
  onEnd?: () => void
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven']
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]
const DEFAULT_COLORS = ['#c084fc', '#f472b6', '#38bdf8']

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const easeInCubic = (value: number) => value * value * value

function parseHSL(hslString: string) {
  const match = hslString.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return { h: Number.parseFloat(match[1]), s: Number.parseFloat(match[2]), l: Number.parseFloat(match[3]) }
}

function buildGlowVars(glowColor: string, intensity: number): Record<string, string> {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const variables: Record<string, string> = {}
  for (let index = 0; index < opacities.length; index += 1) {
    variables[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(opacities[index] * intensity, 100)}%)`
  }
  return variables
}

function buildGradientVars(colors: string[]): Record<string, string> {
  const palette = colors.length > 0 ? colors : DEFAULT_COLORS
  const variables: Record<string, string> = {}
  for (let index = 0; index < GRADIENT_KEYS.length; index += 1) {
    const color = palette[Math.min(COLOR_MAP[index], palette.length - 1)]
    variables[GRADIENT_KEYS[index]] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`
  }
  variables['--gradient-base'] = `linear-gradient(${palette[0]} 0 100%)`
  return variables
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimationOptions) {
  let frame = 0
  let timer = 0
  const startedAt = performance.now() + delay

  const tick = () => {
    const elapsed = performance.now() - startedAt
    const progress = Math.min(Math.max(elapsed / duration, 0), 1)
    onUpdate(start + (end - start) * ease(progress))
    if (progress < 1) frame = requestAnimationFrame(tick)
    else onEnd?.()
  }

  timer = window.setTimeout(() => {
    frame = requestAnimationFrame(tick)
  }, delay)

  return () => {
    window.clearTimeout(timer)
    cancelAnimationFrame(frame)
  }
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = DEFAULT_COLORS,
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card || event.pointerType === 'touch') return
    const bounds = card.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const centerX = bounds.width / 2
    const centerY = bounds.height / 2
    const distanceX = x - centerX
    const distanceY = y - centerY
    const scaleX = distanceX === 0 ? Number.POSITIVE_INFINITY : centerX / Math.abs(distanceX)
    const scaleY = distanceY === 0 ? Number.POSITIVE_INFINITY : centerY / Math.abs(distanceY)
    const edge = Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1)
    const rawAngle = distanceX === 0 && distanceY === 0 ? 0 : Math.atan2(distanceY, distanceX) * (180 / Math.PI) + 90
    const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle
    card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!animated || !card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const angleStart = 110
    const angleEnd = 465
    card.classList.add('sweep-active')
    card.style.setProperty('--cursor-angle', `${angleStart}deg`)

    const cancelAnimations = [
      animateValue({ duration: 500, onUpdate: (value) => card.style.setProperty('--edge-proximity', `${value}`) }),
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: (value) => card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`),
      }),
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: (value) => card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`),
      }),
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: (value) => card.style.setProperty('--edge-proximity', `${value}`),
        onEnd: () => card.classList.remove('sweep-active'),
      }),
    ]

    return () => {
      cancelAnimations.forEach((cancel) => cancel())
      card.classList.remove('sweep-active')
    }
  }, [animated])

  const style = {
    '--card-bg': backgroundColor,
    '--edge-sensitivity': edgeSensitivity,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  } as CSSProperties

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card${className ? ` ${className}` : ''}`}
      style={style}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
