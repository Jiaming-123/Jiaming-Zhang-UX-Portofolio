import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/language-context'
import { unilinkVisualCopy } from '../../i18n/中文版'
import { journeyBubbles, visualTranslations } from './visual-translations'
import { nativePhoneFrames } from './native-phone-frames'
import { nativeConceptFrames } from './native-concept-frames'
import '../../styles/unilink-translation.css'

/** Keep source artwork intact; localize its text in a responsive vector layer. */
export default function TranslatedImage({ src, alt, width, height, eager = false, preserveEnglish = false, onError }: {
  src: string; alt: string; width: number; height: number; eager?: boolean; preserveEnglish?: boolean; onError?: () => void
}) {
  const { isChinese } = useLanguage()
  const visual = preserveEnglish ? undefined : visualTranslations[src.replace('/images/unilink/', '')]
  const nativeFrame = preserveEnglish ? undefined : nativePhoneFrames[src.replace('/images/unilink/', '')] ?? nativeConceptFrames[src.replace('/images/unilink/', '')]
  const bubbles = src.endsWith('/user-journey-20261025.webp') ? journeyBubbles : undefined
  const id = `ul-art-${useId().replace(/:/g,'')}`
  const svg = useRef<SVGSVGElement>(null)
  const [ready, setReady] = useState(eager)
  useLayoutEffect(() => {
    if (!isChinese || !visual) return
    let disposed = false
    const fitText = () => {
      if (disposed) return
      svg.current?.querySelectorAll<HTMLElement>('foreignObject>div').forEach(element => {
        const size = Number(element.dataset.fontSize)
        element.style.fontSize = `${size}px`
        for (let attempt = 0; attempt < 3 && element.scrollHeight > element.clientHeight + 1; attempt++) {
          const ratio = (element.clientHeight - 4) / Math.max(1, element.scrollHeight - 4)
          element.style.fontSize = `${parseFloat(element.style.fontSize) * ratio * .98}px`
        }
      })
    }
    fitText()
    document.fonts.ready.then(fitText)
    return () => { disposed = true }
  }, [isChinese, visual])
  useEffect(() => {
    if (!isChinese || !visual || ready || !svg.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect() }
    }, { rootMargin: '800px' })
    observer.observe(svg.current)
    return () => observer.disconnect()
  }, [isChinese, visual, ready])
  if (!isChinese || !visual) return <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={onError} />
  return <svg className="ul-translated-image" ref={svg} viewBox={`0 0 ${visual.width} ${visual.height}`} width={width} height={height} role="img" aria-label={alt}>
    <title>{alt}</title>
    {nativeFrame ? <>
      <defs>
        <clipPath id={`${id}-frame`}><rect width={visual.width} height={visual.height} rx={nativeFrame.cornerRadius ?? 100} /></clipPath>
        <clipPath id={`${id}-crops`}>{nativeFrame.crops.map((c,i)=><rect key={i} x={c.x} y={c.y} width={c.width} height={c.height} rx={c.radius ?? 0}/>)}</clipPath>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#17283a" floodOpacity=".22"/></filter>
        <linearGradient id={`${id}-gradient-navy`}><stop stopColor="#1b355b"/><stop offset="1" stopColor="#203f6b"/></linearGradient>
        <linearGradient id={`${id}-gradient-pale`}><stop stopColor="#e1e2f0"/><stop offset="1" stopColor="#e3e9f1"/></linearGradient>
        <linearGradient id={`${id}-gradient-lilac`}><stop stopColor="#efeeff"/><stop offset="1" stopColor="#ece7ff"/></linearGradient>
        <linearGradient id={`${id}-gradient-white`}><stop stopColor="#fff"/><stop offset="1" stopColor="#fcf8ff"/></linearGradient>
        <linearGradient id={`${id}-gradient-persona`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#153f83"/><stop offset="1" stopColor="#0c254c"/></linearGradient>
      </defs>
      <g clipPath={`url(#${id}-frame)`}>
        <rect width={visual.width} height={visual.height} fill="#fff"/>
        {nativeFrame.surfaces.map((s,i)=><rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.radius} fill={s.fill.startsWith('#gradient-')?`url(#${id}-${s.fill.slice(1)})`:s.fill} stroke={s.stroke} filter={s.shadow?`url(#${id}-shadow)`:undefined}/>) }
        {nativeFrame.paths?.map((path,i)=><path key={i} d={path.d} fill={path.fill}/>)}
        <image href={ready ? src : undefined} width={visual.width} height={visual.height} clipPath={`url(#${id}-crops)`} onError={onError}/>
      </g>
    </> : <image href={ready ? src : undefined} width={visual.width} height={visual.height} onError={onError} />}
    {visual.clearAreas?.map((area,i)=><rect key={i} x={area.x} y={area.y} width={area.width} height={area.height} fill={area.fill}/>)}
    {bubbles && <><defs>{bubbles.map((b,i)=><clipPath key={i} id={`${id}-bubble-${i}`}><ellipse cx={b.cx} cy={b.cy} rx={b.rx-4} ry={b.ry-4}/></clipPath>)}</defs>{bubbles.map((b,i)=><ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="#fff" stroke="#111" strokeWidth="6"/>)}</>}
    {visual.patches.filter(p=>!nativeFrame?.hasNavigation || !p.key.startsWith('phone.nav.')).map((p, index) => <foreignObject key={p.key+index} x={p.x} y={p.y} width={p.width} height={p.height} clipPath={bubbles?`url(#${id}-bubble-${index})`:undefined}>
      <div data-font-size={p.size} style={{ width:'100%',height:'100%',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:p.align==='center'?'center':'flex-start',background:(nativeFrame||bubbles)?'transparent':p.background,color:p.color,fontFamily:'Inter, PingFang SC, Microsoft YaHei, sans-serif',fontSize:p.size,fontWeight:p.weight,lineHeight:1.25,whiteSpace:'pre-line',textAlign:p.align,overflow:'hidden',padding:'2px 3px' }}>{unilinkVisualCopy[p.key]}</div>
    </foreignObject>)}
    {nativeFrame?.hasNavigation && <g clipPath={`url(#${id}-frame)`}>
      <defs><clipPath id={`${id}-navigation`}>{[[72,1569,58,56,0],[217,1569,60,56,0],[512,1569,58,56,0],[660,1569,59,56,0],[309,1506,170,170,85]].map(([x,y,w,h,r],i)=><rect key={i} x={x} y={y} width={w} height={h} rx={r}/>)}</clipPath></defs>
      <rect y="1544" width="786" height={visual.height-1544} fill="#f8f8f8"/>
      <path d="M0 1545H786" stroke="#d6d6d6" strokeWidth="3"/>
      <image href={ready?src:undefined} width={visual.width} height={visual.height} clipPath={`url(#${id}-navigation)`}/>
      <rect x="260" y={visual.height-32} width="268" height="10" rx="5" fill="#c9c9c9"/>
      {visual.patches.filter(p=>p.key.startsWith('phone.nav.')).map(p=><foreignObject key={p.key} x={p.x} y={p.y} width={p.width} height={p.height}><div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter, PingFang SC, Microsoft YaHei, sans-serif',fontSize:p.size,lineHeight:1.25,color:p.color}}>{unilinkVisualCopy[p.key]}</div></foreignObject>)}
    </g>}
    {bubbles && <g pointerEvents="none">{bubbles.map((b,i)=><ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="none" stroke="#111" strokeWidth="6"/>)}</g>}
  </svg>
}
