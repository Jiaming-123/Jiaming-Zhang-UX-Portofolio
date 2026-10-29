import { useEffect, useId, useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { useLanguage } from '../../i18n/language-context'
import { boardGameMateResearchVisualCopy } from '../../i18n/中文版'
import { earlyInterfaceFrame, personaFrames, type ResearchCrop, type ResearchText } from './research-frames'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>,'src'|'alt'|'width'|'height'> & {src:string;alt:string;width:number;height:number}

/** Localized historical research artwork. Source images and sketches remain unchanged. */
export function BoardGameMateResearchImage({src,alt,width,height,className,...imageProps}:Props) {
  const {isChinese}=useLanguage()
  const persona=src.includes('boardgamemate-persona-alice')?personaFrames.alice:src.includes('boardgamemate-persona-leo')?personaFrames.leo:undefined
  const early=src.includes('boardgamemate-early-design')?earlyInterfaceFrame:undefined
  const frame=persona??early
  const id=`bgm-research-${useId().replace(/:/g,'')}`
  const channelRange=(from:number,to:number)=>Array.from({length:32},(_,i)=>i>=from&&i<=to?1:0).join(' ')
  const svg=useRef<SVGSVGElement>(null)
  const [sourceReady,setSourceReady]=useState(imageProps.loading!=='lazy')
  useEffect(()=>{
    if(!isChinese||!frame||sourceReady||!svg.current)return
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setSourceReady(true);observer.disconnect()}
    },{rootMargin:'800px'})
    observer.observe(svg.current)
    return()=>observer.disconnect()
  },[isChinese,frame,sourceReady])
  useLayoutEffect(()=>{
    if(!isChinese||!frame)return
    let active=true
    const fit=()=>{
      if(!active)return
      svg.current?.querySelectorAll<HTMLElement>('foreignObject>div').forEach(e=>{
        e.style.fontSize=`${e.dataset.size}px`
        for(let n=0;n<4&&e.scrollHeight>e.clientHeight+1;n++)e.style.fontSize=`${parseFloat(e.style.fontSize)*(e.clientHeight-2)/Math.max(1,e.scrollHeight-2)*.98}px`
      })
    }
    fit();void document.fonts.ready.then(fit)
    return()=>{active=false}
  },[isChinese,frame])
  if(!isChinese||!frame)return <img {...imageProps} src={src} alt={alt} width={width} height={height} className={className}/>
  const text=(p:ResearchText,i:number)=><foreignObject key={`${p.key}-${i}`} x={p.x} y={p.y} width={p.width} height={p.height}><div data-size={p.size} style={{width:'100%',height:'100%',boxSizing:'border-box',display:'flex',alignItems:'flex-start',justifyContent:p.align==='center'?'center':'flex-start',color:p.color,fontFamily:'Inter, PingFang SC, Microsoft YaHei, sans-serif',fontSize:p.size,fontWeight:p.weight,lineHeight:p.lineHeight??1.5,whiteSpace:'pre-line',textAlign:p.align??'left',overflow:'hidden'}}>{boardGameMateResearchVisualCopy[p.key]}</div></foreignObject>
  return <svg ref={svg} className={`bgm-research-translated-image ${className??''}`} role="img" aria-label={alt} viewBox={`0 0 ${frame.width} ${frame.height}`} width={width} height={height} style={{display:'block',width:'100%',height:'auto'}}>
    <title>{alt}</title>
    <defs>
      <clipPath id={`${id}-crops`}>{frame.crops.map((c:ResearchCrop,i)=><rect key={i} x={c.x} y={c.y} width={c.width} height={c.height} rx={c.radius??0}/>)}</clipPath>
      <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#4038b4" stopOpacity="0"/><stop offset=".4" stopColor="#4038b4" stopOpacity="0"/><stop offset=".64" stopColor="#4038b4"/><stop offset="1" stopColor="#4038b4"/></linearGradient>
      <linearGradient id={`${id}-gradient-phone`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#fceced"/><stop offset="1" stopColor="#e9eaf1"/></linearGradient>
      <linearGradient id={`${id}-gradient-button`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#dfb2e8"/><stop offset="1" stopColor="#b38bbd"/></linearGradient>
      {early&&<filter id={`${id}-connections`} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0" result="redChannel"/>
        <feComponentTransfer in="redChannel" result="redMask"><feFuncA type="discrete" tableValues={channelRange(22,26)}/></feComponentTransfer>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 1 0 0 0" result="greenChannel"/>
        <feComponentTransfer in="greenChannel" result="greenMask"><feFuncA type="discrete" tableValues={channelRange(27,31)}/></feComponentTransfer>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 1 0 0" result="blueChannel"/>
        <feComponentTransfer in="blueChannel" result="blueMask"><feFuncA type="discrete" tableValues={channelRange(31,31)}/></feComponentTransfer>
        <feComposite in="redMask" in2="greenMask" operator="in" result="redGreenMask"/><feComposite in="redGreenMask" in2="blueMask" operator="in" result="connectionMask"/>
        <feFlood floodColor="#b9e3ff" result="connectionColour"/><feComposite in="connectionColour" in2="connectionMask" operator="in"/>
      </filter>}
    </defs>
    <rect width={frame.width} height={frame.height} fill={early?'#f5f5f5':'#fff'}/>
    {early&&<>{early.surfaces.map((s,i)=><rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.radius??0} fill={s.fill.startsWith('#gradient-')?`url(#${id}-${s.fill.slice(1)})`:s.fill} stroke={s.stroke}/>)}</>}
    {persona&&<>
      <svg width={persona.portraitWidth} height={persona.portraitHeight} viewBox={`0 0 ${persona.portraitWidth} ${persona.portraitHeight}`} overflow="hidden"><image href={sourceReady?src.replace(/-960\.png$/,'.png'):undefined} width={persona.width} height={persona.height}/></svg>
      <rect width={persona.portraitWidth} height={persona.portraitHeight} fill={`url(#${id}-fade)`}/>
      <rect y={persona.quoteY} width="907" height={persona.height-persona.quoteY} fill="#3e36b5"/>
      <text x="22" y={persona.quoteY+79} fontSize="90" fill="#746ed5" fontFamily="Georgia,serif">“</text>
      <path d="M129 792C122 792 120 801 129 811C138 801 136 792 129 792Z" fill="none" stroke="#fff" strokeWidth="1.5"/><circle cx="129" cy="798" r="2" fill="#fff"/>
    </>}
    <image href={sourceReady?src.replace(/-(720|960|1200)\.png$/,'.png'):undefined} width={frame.width} height={frame.height} clipPath={`url(#${id}-crops)`}/>
    {frame.texts.map(text)}
    {early&&<image href={sourceReady?src.replace(/-(720|960|1200)\.png$/,'.png'):undefined} width={frame.width} height={frame.height} filter={`url(#${id}-connections)`}/>}
  </svg>
}
