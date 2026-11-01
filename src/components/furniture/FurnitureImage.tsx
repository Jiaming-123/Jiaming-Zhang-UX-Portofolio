import { useEffect, useId, useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { useLanguage } from '../../i18n/language-context'
import { furnitureVisualCopy } from '../../i18n/中文版'
import { furnitureFrames } from './visual-frames'
import './furniture-images.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }
const photoFills: Record<string, { x: number; y: number; width: number; height: number; brightness?: number }> = {
  poster: { x: 360, y: -5, width: 1228.8, height: 819.2, brightness: .74 },
  desktop: { x: -5, y: -77, width: 1443.84, height: 962.56 },
  mobile: { x: -220, y: -4, width: 768, height: 512 },
  journey: { x: -5, y: -76, width: 967.68, height: 645.12 },
  category: { x: 0, y: 64, width: 960, height: 183 },
}

/** Chinese type stays editable and sharp, while English uses the untouched original export. */
export function FurnitureImage(props: Props) {
  const { src, alt, width, height, className = '', style, loading } = props
  const { isChinese } = useLanguage()
  const frame = furnitureFrames[src.replace('/images/furniture/', '')]
  const ref = useRef<SVGSVGElement>(null)
  const id = `furniture-art-${useId().replace(/:/g, '')}`
  const [ready, setReady] = useState(loading !== 'lazy')

  useEffect(() => {
    if (!isChinese || !frame || ready || !ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect() }
    }, { rootMargin: '800px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isChinese, frame, ready])

  useLayoutEffect(() => {
    if (!isChinese || !frame) return
    let disposed = false
    const fit = () => {
      if (disposed) return
      ref.current?.querySelectorAll<HTMLElement>('foreignObject > div').forEach(element => {
        element.style.fontSize = `${element.dataset.size}px`
        for (let n = 0; n < 4 && (element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1); n++) {
          const ratio = Math.min(element.clientHeight / element.scrollHeight, element.clientWidth / element.scrollWidth)
          element.style.fontSize = `${parseFloat(element.style.fontSize) * ratio * .98}px`
        }
      })
    }
    fit(); void document.fonts.ready.then(fit)
    return () => { disposed = true }
  }, [isChinese, frame])

  if (!isChinese || !frame) return <img {...props} />

  return <svg ref={ref} className={`furniture-localized-image ${className}`} style={style} width={width ?? frame.width} height={height ?? frame.height} viewBox={`0 0 ${frame.width} ${frame.height}`} role="img" aria-label={alt}>
    <title>{alt}</title>
    <defs>
      <clipPath id={`${id}-bounds`}><rect width={frame.width} height={frame.height} /></clipPath>
      <linearGradient id={`${id}-shade`} x1="0" x2="1"><stop stopColor="#241f21" stopOpacity=".84" /><stop offset=".55" stopColor="#241f21" stopOpacity="0" /></linearGradient>
      {frame.photos.map((photo, index) => <clipPath key={index} id={`${id}-photo-${index}`}><rect x={photo.x} y={photo.y} width={photo.width} height={photo.height} /></clipPath>)}
    </defs>
    <g clipPath={`url(#${id}-bounds)`}>
      <image href={ready ? src : undefined} width={frame.width} height={frame.height} />
      {frame.photos.map((photo, index) => {
        const fill = photoFills[photo.kind]
        return <g key={index} clipPath={`url(#${id}-photo-${index})`}>
          <image href={ready ? `/images/furniture/localized/${photo.kind === 'category' ? 'living-clean' : 'hero-clean'}.webp` : undefined} x={fill.x} y={fill.y} width={fill.width} height={fill.height} preserveAspectRatio={photo.kind === 'category' ? 'xMidYMid slice' : 'none'} style={{ filter: fill.brightness ? `brightness(${fill.brightness})` : undefined }} />
          {photo.kind !== 'poster' && photo.kind !== 'category' && <rect x={photo.x} y={photo.y} width={photo.width} height={photo.height} fill={`url(#${id}-shade)`} />}
          {photo.kind === 'category' && <rect x={photo.x} y={photo.y} width={photo.width} height={photo.height} fill="#231f20" opacity=".24" />}
        </g>
      })}
      {frame.surfaces.map((surface, index) => <rect key={`surface-${index}`} x={surface.x} y={surface.y} width={surface.width} height={surface.height} rx={surface.radius ?? 0} fill={surface.fill} />)}
      {frame.patches.map((patch, index) => patch.background !== 'transparent' && <rect key={`erase-${index}`} x={patch.x} y={patch.y} width={patch.width} height={patch.height} fill={patch.background} />)}
      {frame.patches.map((patch, index) => <foreignObject key={`${patch.key}-${index}`} x={patch.x} y={patch.y} width={patch.width} height={patch.height}>
        <div data-size={patch.size} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: patch.align === 'center' ? 'center' : 'flex-start', boxSizing: 'border-box', fontFamily: 'Inter, PingFang SC, Microsoft YaHei, sans-serif', fontSize: patch.size, fontWeight: patch.weight, lineHeight: 1.25, color: patch.color, whiteSpace: 'pre-line', textAlign: patch.align === 'center' ? 'center' : 'left', overflowWrap: 'anywhere', overflow: 'hidden' }}>{furnitureVisualCopy[patch.key]}</div>
      </foreignObject>)}
    </g>
  </svg>
}
