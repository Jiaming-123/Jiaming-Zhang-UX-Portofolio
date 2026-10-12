import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, Expand, X, ZoomIn } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type Artifact, type Screen } from '../../data/unilink'

gsap.registerPlugin(ScrollTrigger)

export function ScreenImage({ screen, eager = false }: { screen: Screen; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  return screen.pending || failed ? <div className="ul-screen-pending" role="img" aria-label={`${screen.title}: authentic Figma export pending`}>
    <span>UNILINK / FINAL PROTOTYPE</span><Expand size={26} aria-hidden="true" /><strong>{screen.title}</strong><p>Figma screen — export pending</p><small>The original screen is available in the full prototype.</small>
  </div> : <img src={`/images/unilink/${screen.path}`} width={screen.width || 393} height={screen.height || 852} alt={`UniLink ${screen.title}`} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
}

export function FeatureStory({ flow }: { flow: { id: string; label: string; title: string; intro: string; screens: Screen[] } }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const mm = gsap.matchMedia()
    const setupStory = (reduced: boolean) => {
      const track = root.querySelector('.ul-screen-track')
      const layers = Array.from(root.querySelectorAll('.ul-screen-layer'))
      if (!track) return
      gsap.set(track, {yPercent:0})
      const show = (i: number) => {
        setActive(i)
        gsap.to(track, {yPercent:-100*i, duration:reduced?0:.4, ease:'power2.out', overwrite:true})
      }
      const steps = Array.from(root.querySelectorAll('.ul-flow-step'))
      let current = -1
      const sync = () => {
        let next = 0
        steps.forEach((step,i) => { if(step.getBoundingClientRect().top < window.innerHeight * .55) next=i })
        if(next !== current) { current=next; show(next) }
        const bounds = root.getBoundingClientRect()
        if (bounds.top < window.innerHeight * 1.5 && bounds.bottom > 0) {
          for (const layer of layers.slice(next, next+2)) layer.querySelector('img')?.setAttribute('loading', 'eager')
        }
      }
      ScrollTrigger.create({trigger:root,start:'top bottom',end:'bottom top',onUpdate:sync,onRefresh:sync})
      sync()
    }
    mm.add('(prefers-reduced-motion: no-preference)', () => setupStory(false), ref)
    mm.add('(prefers-reduced-motion: reduce)', () => setupStory(true), ref)
    return () => mm.revert()
  }, [flow.id])
  return <div className="ul-feature" id={`flow-${flow.id}`} ref={ref}>
    <header className="ul-feature-heading"><span className="ul-kicker">{flow.label}</span><h3>{flow.title}</h3><p>{flow.intro}</p></header>
    <div className="ul-flow-layout">
      <div className="ul-product-stage">
        <div className="ul-stage-index"><span>UNILINK / {flow.id.toUpperCase()}</span><span>{String(active + 1).padStart(2,'0')} / {String(flow.screens.length).padStart(2,'0')}</span></div>
        <div className="ul-screen-stack"><div className="ul-screen-track">{flow.screens.map((s, i) => <div className="ul-screen-layer" key={s.path} aria-hidden={active!==i}><div className="ul-screen-window"><ScreenImage screen={s} /></div></div>)}</div></div>
        <span className="ul-stage-caption">Original Figma frames · Scroll to follow the decisions</span>
        <ArtifactGallery className="ul-stage-zoom" actionLabel="Enlarge screen" items={[{src:flow.screens[active].path,title:flow.screens[active].title,caption:flow.screens[active].why,width:flow.screens[active].width,height:flow.screens[active].height}]} />
      </div>
      <div className="ul-flow-text">{flow.screens.map((s, i) => <article className={`ul-flow-step ${active===i?'is-active':''}`} key={s.path} aria-current={active===i?'step':undefined}>
        <span className="ul-step-number">{String(i+1).padStart(2,'0')} <i /> {flow.id.toUpperCase()}</span><h4>{s.title}</h4><p>{s.why}</p>
      </article>)}</div>
    </div>
  </div>
}

export function ArtifactGallery({ items, className = '', actionLabel = 'View evidence' }: { items: Artifact[]; className?: string; actionLabel?: string }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const item = selected === null ? null : items[selected]
  const isOpen = selected !== null
  useEffect(() => {
    if (!isOpen) return
    const el = dialog.current
    if (!el) return
    el.showModal()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { el.close(); document.body.style.overflow = oldOverflow; opener.current?.focus({preventScroll:true}) }
  }, [isOpen])
  const close = () => { setSelected(null); setZoom(false) }
  const move = (direction: number) => { setSelected(i => i === null ? null : (i + direction + items.length) % items.length); setZoom(false) }
  return <>
    <div className={`ul-artifacts ${className}`}>{items.map((a, i) => <figure key={a.src}>
      <button type="button" onClick={e => { opener.current=e.currentTarget; setSelected(i) }} aria-label={`Enlarge ${a.title}`}>
        <img src={`/images/unilink/${a.src}`} alt={a.title} loading="lazy" width={a.width || (a.wide ? 1940 : 1120)} height={a.height || (a.wide ? 1130 : a.src.startsWith('persona-') ? 960 : 790)} /><span><Expand size={16} /> {actionLabel}</span>
      </button><figcaption><strong>{a.title}</strong><span>{a.caption}</span></figcaption>
    </figure>)}</div>
    {item && createPortal(<dialog className={`ul-lightbox ${zoom?'is-zoomed':''}`} ref={dialog} aria-labelledby="ul-lightbox-title" onCancel={close} onClick={e => {if(e.target===e.currentTarget)close()}} onKeyDown={e=> {if(e.key==='Tab'){const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])'));const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}} if(e.key==='ArrowRight'){e.preventDefault();move(1)} if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}}}>
      <div className="ul-lightbox-bar"><div><h2 id="ul-lightbox-title">{item.title}</h2><p>{item.caption}</p></div><button type="button" onClick={close} aria-label="Close image viewer" autoFocus><X /></button></div>
      <div className="ul-lightbox-image"><img src={`/images/unilink/${item.src}`} alt={item.title} /></div>
      <div className="ul-lightbox-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous image"><ArrowLeft /></button><span>{(selected || 0)+1} / {items.length}</span><button type="button" onClick={()=>setZoom(!zoom)} aria-pressed={zoom}><ZoomIn size={18} />{zoom?'Fit image':'Zoom image'}</button><button type="button" onClick={()=>move(1)} aria-label="Next image"><ArrowRight /></button></div>
    </dialog>,document.body)}
  </>
}
