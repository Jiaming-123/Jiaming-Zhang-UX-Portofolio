import { useEffect, useRef, useState } from 'react'
import { chapters, chapterId } from '../../data/unilink'
export default function CaseStudyTimeline() {
  const ref = useRef<HTMLElement>(null)
  const [active,setActive] = useState(0)
  const [visible,setVisible] = useState(false)
  useEffect(()=>{
    const sections=chapters.map(c=>document.getElementById(chapterId(c)))
    let frame=0
    const update=()=>{
      frame=0
      let next=0
      sections.forEach((s,i)=>{if(s && s.getBoundingClientRect().top<=150)next=i})
      setActive(next)
      setVisible(Boolean(sections[0] && sections[0].getBoundingClientRect().bottom<=160))
      const s=sections[next], following=sections[next+1]
      const start=s ? s.getBoundingClientRect().top+window.scrollY : 0
      const end=following ? following.getBoundingClientRect().top+window.scrollY : (document.getElementById('unilink-end')?.offsetTop || document.body.scrollHeight)
      const local=Math.max(0,Math.min(1,(window.scrollY+150-start)/(end-start)))
      ref.current?.style.setProperty('--ul-progress',String(Math.min(1,(next+local)/8)))
    }
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)}
    update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll)
    return ()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(frame)}
  },[])
  return <nav className={`ul-timeline ${visible?'is-visible':''}`} ref={ref} aria-label="Case study chapters">
    <div className="ul-mobile-chapter"><span>UNILINK</span><strong>{String(active+1).padStart(2,'0')} / {chapters[active]}</strong></div>
    <ol>{chapters.map((c,i)=><li key={c} className={i<=active?'is-complete':''}><a href={`#${chapterId(c)}`} aria-label={`${String(i+1).padStart(2,'0')} ${c}`} aria-current={active===i?'step':undefined} onClick={e=>{e.preventDefault();const target=document.getElementById(chapterId(c));target?.focus({preventScroll:true});target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});history.replaceState(null,'',`#${chapterId(c)}`)}}><span className="ul-nav-dot">{String(i+1).padStart(2,'0')}</span><span className="ul-nav-name">{c}</span></a></li>)}</ol>
  </nav>
}
