import { useUniLinkCopy } from '../../i18n/unilink'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, ShieldCheck, Users, X, ZoomIn } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { chapterId } from '../../data/unilink'
import { ArtifactGallery } from './CaseStudyMedia'
import TranslatedImage from './TranslatedImage'
import { LanguageSwitch } from '../../i18n/Language'
import '../../styles/unilink-concepts.css'

gsap.registerPlugin(ScrollTrigger)

const concepts = [
  {
    id: 'navi-ai-guide', category: 'PROACTIVE GUIDANCE', title: 'Navi / AI Guide',
    description: 'Anticipates common transition needs and turns fragmented information into timely, contextual next steps.',
    detail: 'This direction explored whether proactive guidance could reduce the cognitive load of constantly searching for what to do next.',
    page: 7, width: 1588, height: 1172,
  },
  {
    id: 'same-speak', category: 'LANGUAGE ACCESS', title: 'Same Speak',
    description: 'Uses shared language as a low-friction entry point to peer support.',
    detail: 'The concept explored how language similarity could make asking questions feel more comfortable, particularly during the early stages of adapting to a new environment.',
    page: 15, width: 1028, height: 706,
  },
  {
    id: 'do-it-together', category: 'SOCIAL CONNECTION', title: 'Do It Together',
    description: 'Creates peer relationships through small shared activities rather than direct help-seeking alone.',
    detail: 'This direction reframed support as participation, using shared experiences to reduce the pressure of approaching unfamiliar people.',
    page: 22, width: 838, height: 622,
  },
  {
    id: 'recap-school', category: 'SUPPORT CONTINUITY', title: 'Recap School',
    description: 'Keeps useful guidance, decisions and next actions visible after a support interaction ends.',
    detail: 'The concept investigated how advice could remain actionable over time instead of disappearing inside one-off conversations.',
    page: 29, width: 1796, height: 870,
  },
  {
    id: 'uni-matcher', category: 'CONTEXTUAL MATCHING', title: 'Uni-Matcher',
    description: 'Connects students with senior peers whose background and experience are relevant to the question at hand.',
    detail: 'Matching considered factors such as study context, language, lived experience and support topic so students could understand why a particular person was relevant.',
    page: 41, width: 1579, height: 1092,
  },
  {
    id: 'sure-u', category: 'TRUST & CREDIBILITY', title: 'Sure U',
    description: 'Makes identity and credibility visible before students decide who to approach.',
    detail: 'This direction explored how verification and profile signals could reduce uncertainty when support comes from unfamiliar peers.',
    page: 47, width: 1841, height: 1308,
  },
]
const principles = [
  ['LOW-PRESSURE PARTICIPATION', 'Support should be easy to enter without requiring an immediate one-to-one commitment.'],
  ['CONTEXTUAL RELEVANCE', 'Students should understand why a group or mentor is relevant before deciding to engage.'],
  ['VISIBLE TRUST', 'Identity, experience and contribution should be legible before support begins.'],
]
const sketchPath = (id: string) => `/images/unilink/early-design/${id}.webp`

export default function ConceptExploration() {
  const t = useUniLinkCopy()
  const [revealed, setRevealed] = useState<string | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const convergence = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const isOpen = selected !== null
  const selectedConcept = selected === null ? null : concepts[selected]

  useEffect(() => {
    const stage = convergence.current
    if (!stage) return
    const media = gsap.matchMedia()
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const principles = stage.querySelectorAll('.ul-exploration-principles article')
      const outcome = stage.querySelector('.ul-exploration-outcomes')
      if (!outcome) return
      // Keep the whole stage readable when the viewport is too short to pin it.
      const canPin = stage.offsetHeight <= window.innerHeight - 140
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: canPin ? 'top 110px' : 'top 75%',
          end: canPin ? () => `+=${Math.min(window.innerHeight, 900)}` : 'bottom 85%',
          pin: canPin,
          scrub: .6,
          invalidateOnRefresh: true,
        },
      })
      timeline
        .to(principles, { y: -16, scale: .94, opacity: .48, stagger: .03 })
        .fromTo(outcome, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6 }, '<.25')
        .to(outcome, { scale: 1.015, duration: .4 })
    }, stage)
    return () => media.revert()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const element = dialog.current
    if (!element) return
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = overflow
      opener.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  const close = () => { setSelected(null); setZoomed(false) }
  const move = (direction: number) => {
    setSelected(index => index === null ? null : (index + direction + concepts.length) % concepts.length)
    setZoomed(false)
  }

  return <section className="ul-section ul-concepts ul-concept-exploration" id={chapterId('Concepts')} tabIndex={-1}>
    <header className="ul-heading ul-exploration-heading">
      <span className="ul-kicker">{t("04 / CONCEPTS")}</span>
      <h2>{t("Exploring the Solution Space")}</h2>
      <div className="ul-lead">
        <p>{t("We translated the research into six distinct product hypotheses, each addressing a different barrier to seeking support — from uncertainty and language friction to trust, continuity and peer connection.")}</p>
        <p>{t("Rather than committing to the first viable idea, we used these concepts to understand which interaction models could create the clearest and most sustainable support experience.")}</p>
      </div>
    </header>

    <div className="ul-hypothesis-grid">
      {concepts.map((concept, index) => {
        const expanded = revealed === concept.id
        const previewId = `concept-sketch-${concept.id}`
        return <article className={`ul-hypothesis ul-hypothesis--${concept.id}${expanded ? ' is-revealed' : ''}`} key={concept.id}
          onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) setRevealed(concept.id) }}
          onPointerLeave={event => { if (event.pointerType === 'mouse' && !dialog.current?.open && !event.currentTarget.contains(document.activeElement)) setRevealed(current => current === concept.id ? null : current) }}
          onBlur={event => { if (!dialog.current?.open && !event.currentTarget.contains(event.relatedTarget)) setRevealed(current => current === concept.id ? null : current) }}
          onKeyDown={event => { if (event.key === 'Escape') { setRevealed(null); event.stopPropagation() } }}>
          <div className="ul-hypothesis-heading">
            <div className="ul-hypothesis-category"><span>{t(concept.category)}</span><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
            <h3>{concept.title}</h3>
          </div>
          <div className="ul-hypothesis-rest" aria-hidden={expanded}>
            <p>{t(concept.description)}</p>
          </div>
          <button type="button" className="ul-hypothesis-toggle" aria-expanded={expanded} aria-controls={previewId}
            aria-label={`${expanded ? t("Hide") : t("Reveal")} ${t("early concept:")} ${concept.title}`}
            onClick={() => setRevealed(current => current === concept.id ? null : concept.id)}>
            <span className="ul-hypothesis-hint">{expanded ? t("Close early concept") : t("View early concept")}<span aria-hidden="true">{expanded ? '−' : '↗'}</span></span>
          </button>
          <div className="ul-hypothesis-preview" id={previewId} aria-hidden={!expanded}>
            <div className="ul-hypothesis-image"><TranslatedImage src={sketchPath(concept.id)} width={concept.width} height={concept.height} alt={`${t("Original")} ${concept.title} ${t("early-design sketch")}`} /></div>
            <p>{t(concept.detail)}</p>
          </div>
          <button type="button" className="ul-sketch-expand" tabIndex={expanded ? 0 : -1} aria-hidden={!expanded} aria-label={`${t("Enlarge original")} ${concept.title} ${t("sketch")}`}
            onClick={event => { opener.current = event.currentTarget; setSelected(index) }}><Expand size={15} aria-hidden="true" /></button>
        </article>
      })}
    </div>

    <div className="ul-exploration-convergence">
      <header><span className="ul-kicker">{t("CONCEPT CONVERGENCE")}</span><h3>{t("From six hypotheses to two core behaviours")}</h3><p>{t("The exploration revealed that the strongest opportunities were not isolated features, but recurring behaviours across several concepts.")}</p></header>
      <div className="ul-convergence-stage" ref={convergence}>
      <div className="ul-exploration-principles">{principles.map(([title, copy], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><h4>{t(title)}</h4><p>{t(copy)}</p></article>)}</div>
      <p className="ul-exploration-bridge">{t("These principles shaped UniLink around two complementary experiences.")}</p>
      <div className="ul-exploration-outcomes">
        <article><Users size={22} aria-hidden="true" /><h4>{t("GROUPS")}</h4><p>{t("A low-pressure space for shared questions, practical knowledge and peer connection.")}</p></article>
        <article><ShieldCheck size={22} aria-hidden="true" /><h4>{t("MENTORS")}</h4><p>{t("A more focused path to relevant, verified and bookable one-to-one support.")}</p></article>
      </div>
      </div>
      <div className="ul-exploration-close">
        <p>{t("The final direction did not emerge from a single concept. It combined the strongest behaviours across the exploration: low-pressure participation, contextual matching and visible trust.")}</p>
        <p>{t("These principles became the foundation of UniLink’s two core experiences —")} <strong>{t("Groups")}</strong> {t("and")} <strong>{t("Mentors")}</strong>.</p>
        <small>{t("Proactive AI guidance and other secondary directions remained valuable explorations, but were kept outside the core product to preserve clarity and focus.")}</small>
      </div>
      <div className="ul-concept-user-journey" id="unilink-user-journey">
        <h3 className="ul-kicker">{t("User Journey")}</h3>
        <ArtifactGallery className="ul-user-journey-gallery" items={[{src:'user-journey-20261025.webp',title:t("User Journey"),caption:'',width:4800,height:2438}]} />
      </div>
    </div>

    {selectedConcept && <dialog className={`ul-concept-dialog${zoomed ? ' is-zoomed' : ''}`} ref={dialog} aria-labelledby="ul-concept-dialog-title" onCancel={close}
      onClick={event => { if (event.target === event.currentTarget) close() }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
        if (event.key === 'Tab') {
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'))
          const first = buttons[0], last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }
      }}>
      <header className="ul-concept-dialog-header"><div><span>{t(selectedConcept.category)}</span><h2 id="ul-concept-dialog-title">{selectedConcept.title}</h2></div><div className="ul-dialog-language"><LanguageSwitch /></div><button type="button" aria-label={t("Close concept sketch")} onClick={close} autoFocus><X size={20} /></button></header>
      <div className="ul-concept-dialog-image"><TranslatedImage src={sketchPath(selectedConcept.id)} width={selectedConcept.width} height={selectedConcept.height} alt={`${t("Original")} ${selectedConcept.title} ${t("early-design sketch")}`} eager /></div>
      <p className="ul-concept-dialog-detail">{t(selectedConcept.detail)}</p>
      <div className="ul-concept-dialog-controls"><button type="button" onClick={() => move(-1)} aria-label={t("Previous concept")}><ArrowLeft size={18} /></button><span>{(selected || 0) + 1} / 6</span><button type="button" onClick={() => setZoomed(current => !current)} aria-pressed={zoomed}><ZoomIn size={17} />{zoomed ? t("Fit sketch") : t("Zoom sketch")}</button><button type="button" onClick={() => move(1)} aria-label={t("Next concept")}><ArrowRight size={18} /></button></div>
    </dialog>}
  </section>
}
