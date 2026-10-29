import { useEffect, useId, useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { useLanguage } from '../../i18n/language-context'
import { boardGameMateVisualCopy } from '../../i18n/中文版'
import { bgmPhoneVisuals } from './phone-visuals'
import './boardgamemate-image.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }

type Photo = { x: number; y: number; width: number; height: number; kind: 'banner' | 'detail' | 'joined' | 'create' | 'review' }
const cleanPhoto = '/images/boardgamemate/final-ui/localized/photo-stardew-valley-clean-690.webp'
const photos: Record<string, Photo> = {
  'flow-01-discover.png': { x: 48, y: 408, width: 690, height: 128, kind: 'banner' },
  'flow-02-nearby-map.png': { x: 48, y: 1076, width: 690, height: 128, kind: 'banner' },
  'guides/flow-01-card-join.png': { x: 24, y: 16, width: 690, height: 128, kind: 'banner' },
  'guides/flow-02-join.png': { x: 24, y: 16, width: 690, height: 128, kind: 'banner' },
  'flow-01-session-detail.png': { x: 48, y: 208, width: 690, height: 296, kind: 'detail' },
  'flow-01-joined.png': { x: 48, y: 360, width: 690, height: 296, kind: 'joined' },
  'flow-04-create-game.png': { x: 48, y: 288, width: 690, height: 460, kind: 'create' },
  'flow-04-review.png': { x: 48, y: 308, width: 690, height: 224, kind: 'review' },
}

/** Reuses the original Figma image fill, with its centred crop, instead of masking photograph text. */
function CleanPhoto({ photo, source, fullWidth, fullHeight, id, ready }: { photo: Photo; source: string; fullWidth: number; fullHeight: number; id: string; ready: boolean }) {
  const { x, y, width, height, kind } = photo
  const banner = kind === 'banner'
  const filter = banner ? 'brightness(1.18) contrast(.92) saturate(1.01)' : kind === 'review' ? 'brightness(1.1) contrast(.94) saturate(1.01)' : 'brightness(.84) contrast(1.06) saturate(1.04)'
  return <>
    <defs>
      <clipPath id={id}><path d={banner ? `M${x + 36} ${y}H${x + width - 36}Q${x + width} ${y} ${x + width} ${y + 36}V${y + height}H${x}V${y + 36}Q${x} ${y} ${x + 36} ${y}Z` : `M${x + 48} ${y}H${x + width - 48}Q${x + width} ${y} ${x + width} ${y + 48}V${y + height - 48}Q${x + width} ${y + height} ${x + width - 48} ${y + height}H${x + 48}Q${x} ${y + height} ${x} ${y + height - 48}V${y + 48}Q${x} ${y} ${x + 48} ${y}Z`}/></clipPath>
      {banner && <clipPath id={`${id}-avatar`}><circle cx={x + 78} cy={y + 60} r="44"/></clipPath>}
    </defs>
    <g clipPath={`url(#${id})`}>
      <image href={ready ? cleanPhoto : undefined} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid slice" style={{ filter }}/>
      {banner && <>
        <image href={ready ? source : undefined} width={fullWidth} height={fullHeight} clipPath={`url(#${id}-avatar)`}/>
        <rect x={x + 132} y={y + 16} width="344" height="96" rx="24" fill="#fbf7ee" opacity=".85"/>
      </>}
      {(kind === 'detail' || kind === 'joined') && <>
        <rect x="576" y={y + 36} width="162" height="60" rx="30" fill={kind === 'detail' ? '#3e8b63' : '#e8a7b6'}/>
        <text x="88" y={y + 148} fill="#fff" fontFamily="Inter, sans-serif" fontSize="52" fontWeight="700">STARDEW VALLEY</text>
      </>}
      {kind === 'review' && <text x="80" y="390" fill="#fff" fontFamily="Inter, sans-serif" fontSize="44" fontWeight="700">STARDEW VALLEY</text>}
      {kind === 'create' && <path d="M370 616H738V720H370A52 52 0 0 1 370 616Z" fill="#b98745"/>}
    </g>
  </>
}

/** Chinese text stays vector-sharp while the original imagery and English exports remain intact. */
export function BoardGameMateImage(props: Props) {
  const { src, alt, width, height, loading, className = '', style } = props
  const { isChinese } = useLanguage()
  const name = src.replace('/images/boardgamemate/final-ui/', '')
  const visual = bgmPhoneVisuals[name]
  const photo = photos[name]
  const svg = useRef<SVGSVGElement>(null)
  const id = `bgm-ui-${useId().replace(/:/g, '')}`
  const [ready, setReady] = useState(loading !== 'lazy')

  useEffect(() => {
    if (!isChinese || !visual || ready || !svg.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect() }
    }, { rootMargin: '800px' })
    observer.observe(svg.current)
    return () => observer.disconnect()
  }, [isChinese, visual, ready])

  useLayoutEffect(() => {
    if (!isChinese || !visual) return
    let cancelled = false
    const fit = () => {
      if (cancelled) return
      svg.current?.querySelectorAll<HTMLElement>('foreignObject > div').forEach(element => {
        const original = Number(element.dataset.size)
        element.style.fontSize = `${original}px`
        for (let attempt = 0; attempt < 4 && (element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1); attempt++) {
          const ratio = Math.min(element.clientHeight / element.scrollHeight, element.clientWidth / element.scrollWidth)
          element.style.fontSize = `${parseFloat(element.style.fontSize) * ratio * .97}px`
        }
      })
    }
    fit()
    document.fonts.ready.then(fit)
    return () => { cancelled = true }
  }, [isChinese, visual])

  if (!isChinese || !visual) return <img {...props} />

  return <svg ref={svg} className={`bgm-localized-image ${className}`} style={style} width={width ?? visual.width} height={height ?? visual.height} viewBox={`0 0 ${visual.width} ${visual.height}`} role="img" aria-label={alt}>
    <title>{alt}</title>
    <defs><clipPath id={id}><rect width={visual.width} height={visual.height}/></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <image href={ready ? src : undefined} width={visual.width} height={visual.height}/>
      {photo && <CleanPhoto photo={photo} source={src} fullWidth={visual.width} fullHeight={visual.height} id={`${id}-photo`} ready={ready}/>}
      {visual.patches.map((patch, index) => patch.background !== 'transparent' && <rect key={`surface-${index}`} x={patch.x} y={patch.y} width={patch.width} height={patch.height} fill={patch.background} rx={name === 'flow-04-create-game.png' && patch.key === 'JOST A GAN' ? 20 : 0}/>)}
      {visual.patches.map((patch, index) => <foreignObject key={`${patch.key}-${index}`} x={patch.x} y={patch.y} width={patch.width} height={patch.height}>
        <div data-size={patch.size} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', boxSizing: 'border-box', fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif', fontSize: patch.size, fontWeight: patch.weight, lineHeight: 1.15, color: patch.color, padding: '0 4px', overflow: 'hidden', overflowWrap: 'anywhere' }}>{boardGameMateVisualCopy[patch.key] ?? patch.key}</div>
      </foreignObject>)}
    </g>
  </svg>
}
