import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Code2, Layers3, MousePointer2, Smartphone, TestTube2, Workflow } from 'lucide-react'
import { Reveal, SectionLabel } from './Content'
import { useFurnitureCopy } from '../i18n/furniture'
import { LanguageSwitch } from '../i18n/Language'
import { FurnitureImage } from './furniture/FurnitureImage'

const desktopFlow = [
  { title: 'Discover', note: 'An editorial homepage balances brand storytelling, room-based navigation, new arrivals and social proof.', image: '/images/furniture/desktop-home.png' },
  { title: 'Evaluate', note: 'Product imagery remains prominent while price, material, dimensions and purchasing controls form one decision system.', image: '/images/furniture/desktop-product.png' },
  { title: 'Checkout', note: 'A two-column checkout keeps form completion and order verification visible at the same time.', image: '/images/furniture/desktop-checkout.png' },
  { title: 'Confirmation', note: 'The journey closes with reassurance: order number, purchased items, total paid and clear next steps.', image: '/images/furniture/desktop-confirmation.png' },
]

const mobileFlow = [
  { title: 'Home', image: '/images/furniture/mobile-home.png' },
  { title: 'Product', image: '/images/furniture/mobile-product.png' },
  { title: 'Cart', image: '/images/furniture/mobile-cart.png' },
  { title: 'Checkout', image: '/images/furniture/mobile-checkout.png' },
  { title: 'Confirmation', image: '/images/furniture/mobile-confirmation.png' },
]

const journeySteps = [
  { title: 'Home', question: 'What does this brand offer?', image: 'home', alt: 'Furniture store homepage with its timber bedroom hero' },
  { title: 'Search / Category', question: 'Where can I begin?', image: 'category', alt: 'Living category with popular product search suggestions and product grid' },
  { title: 'Product', question: 'Is this right for my home?', image: 'product', alt: 'Shiloah sofa product page with photography, details and buying controls' },
  { title: 'Cart', question: 'What have I selected?', image: 'cart', alt: 'Shopping cart showing Shiloah and Sonoma sofas with the order summary' },
  { title: 'Checkout', question: 'How do I complete the order?', image: 'checkout', alt: 'Demo checkout showing delivery fields beside the order summary' },
  { title: 'Confirmation', question: 'Was the purchase successful?', image: 'confirmation', alt: 'Demo order confirmation with both selected sofas and the total paid' },
]

function AutoShowcase({ items, mobile = false }: { items: { title: string; note?: string; image: string }[]; mobile?: boolean }) {
  const t = useFurnitureCopy()
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % items.length), 3200)
    return () => window.clearInterval(timer)
  }, [items.length])
  return (
    <div className={`furniture-showcase ${mobile ? 'is-mobile' : ''}`}>
      <div className="furniture-showcase-tabs" role="tablist" aria-label={t(mobile ? 'Mobile shopping flow' : 'Desktop shopping flow')}>
        {items.map((item, index) => <button key={item.title} type="button" className={active === index ? 'active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={active === index}><span>0{index + 1}</span>{t(item.title)}</button>)}
      </div>
      <div className="furniture-showcase-stage">
        <AnimatePresence mode="wait">
          <motion.figure key={items[active].title} initial={{ opacity: 0, y: 24, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: .99 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
            <div className="furniture-showcase-image"><FurnitureImage src={items[active].image} alt={`${t(items[active].title)} · ${t('responsive furniture store interface')}`} /></div>
            <figcaption><span>{t(mobile ? 'MOBILE 393PX' : 'DESKTOP 1440PX')} · {t('AUTO PLAYS EVERY 3.2S')}</span><h3>{t(items[active].title)}</h3>{items[active].note && <p>{t(items[active].note)}</p>}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  )
}

function ScrollablePreview({ image, alt }: { image: string; alt: string }) {
  const t = useFurnitureCopy()
  const screenRef = useRef<HTMLDivElement>(null)
  const [showCue, setShowCue] = useState(false)

  useEffect(() => {
    const screen = screenRef.current
    if (!screen) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setShowCue(true)
      observer.disconnect()
    }, { threshold: .25 })
    observer.observe(screen)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={screenRef} className={`responsive-screen${showCue ? ' show-scroll-cue' : ''}`}>
      <div className="responsive-scroll" tabIndex={0} data-lenis-prevent data-lenis-prevent-wheel aria-label={t("Scrollable full-page interface preview")}>
        <FurnitureImage src={image} alt={alt} />
      </div>
    </div>
  )
}

const auditRows = [
  ['Visual consistency', 'Competing colours, low-resolution imagery and inconsistent product presentation weakened the perceived quality of the brand.', 'A controlled warm-neutral palette, consistent image ratios and a unified component language.'],
  ['Information hierarchy', 'Search, prices and order totals lacked emphasis, forcing users to work harder to find commercial information.', 'Clear typographic levels, stronger price treatment and explicit primary/secondary CTA hierarchy.'],
  ['Interaction clarity', 'Some controls needed clearer interaction feedback and stronger visual differentiation.', 'Predictable controls, visible hover/focus/pressed states and feedback after add-to-cart and payment actions.'],
  ['Responsive continuity', 'Mobile and desktop layouts behaved like different products, with inconsistent navigation and content priority.', 'One shared information architecture, re-composed for horizontal desktop comparison and vertical mobile scanning.'],
  ['Purchase confidence', 'Sparse product detail and a weak cart summary made it difficult to verify a decision before checkout.', 'Product facts, quantity controls, delivery cues, order summary and confirmation are connected as one purchase flow.'],
]

export function FurnitureCaseStudy() {
  const t = useFurnitureCopy()
  return (
    <div className="furniture-case">
      <div className="furniture-language-control"><LanguageSwitch /></div>
      <section className="furniture-intro" id="overview">
        <Reveal>
          <SectionLabel number="01">{t("PROJECT OVERVIEW")}</SectionLabel>
          <div className="furniture-intro-grid">
            <p>{t("I independently led the complete process: competitor review, heuristic analysis, information architecture, art direction, prototyping, responsive UI design, front-end implementation, testing and deployment.")}</p>
            <dl><div><dt>{t("ROLE")}</dt><dd>{t("UI/UX Designer & Front-end Developer")}</dd></div><div><dt>{t("SCOPE")}</dt><dd>{t("Desktop 1440 · Mobile 393")}</dd></div><div><dt>{t("TOOLS")}</dt><dd>Figma · React · TypeScript · CSS · Codex · ChatGPT · Vercel</dd></div><div><dt>{t("YEAR")}</dt><dd>2025</dd></div><div><dt>{t("DELIVERABLE")}</dt><dd>{t("End-to-end responsive shopping prototype")}</dd></div></dl>
          </div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-audit">
        <Reveal>
          <SectionLabel number="02">{t("AUDITING THE ORIGINAL EXPERIENCE")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("Clearer interfaces make product decisions easier.")}</h2><p>{t("I reviewed the original My Furniture Store alongside furniture competitors, then traced visual inconsistencies back to the decisions they affected: finding a product, understanding its value, selecting an action and confirming a purchase.")}</p></div>
          <div className="audit-lenses">{['Visual hierarchy', 'Interaction clarity', 'Responsive consistency', 'Conversion confidence'].map((item, index) => <article key={item}><span>0{index + 1}</span><b>{t(item)}</b></article>)}</div>
          <div className="audit-table"><div className="audit-table-head"><span>{t("OBSERVATION")}</span><span>{t("USER / BRAND IMPACT")}</span><span>{t("REDESIGN RESPONSE")}</span></div>{auditRows.map(([title, impact, response], index) => <article key={title}><div><span>0{index + 1}</span><h3>{t(title)}</h3></div><p>{t(impact)}</p><p>{t(response)}</p></article>)}</div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-principles">
        <Reveal>
          <SectionLabel number="03">{t("DESIGN THESIS")}</SectionLabel>
          <blockquote>{t("“The interface should feel as considered as the furniture itself.”")}</blockquote>
          <p className="principles-lead">{t("The redesign uses warm materiality to establish trust and quiet hierarchy to support decisions. The existing gold, cream and dark brown palette was retained, then given clear semantic roles throughout the interface.")}</p>
          <div className="principle-grid"><article><Layers3 /><span>01</span><h3>{t("Warm materiality")}</h3><p>{t("Timber-inspired colour and image-led composition connect the digital experience to the physical product.")}</p></article><article><Workflow /><span>02</span><h3>{t("Quiet hierarchy")}</h3><p>{t("Scale, spacing and contrast guide attention without competing visual treatments.")}</p></article><article><MousePointer2 /><span>03</span><h3>{t("Commerce with confidence")}</h3><p>{t("Every screen explains where users are, what they are viewing and what happens next.")}</p></article><article><Smartphone /><span>04</span><h3>{t("Responsive continuity")}</h3><p>{t("Mobile re-prioritises the content model for smaller screens and touch.")}</p></article></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-process">
        <Reveal>
          <SectionLabel number="04">{t("DESIGN PROCESS")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("Research moved into structure, then into a testable system.")}</h2><p>{t("The project progressed from inspiration analysis and low-fidelity sketches to three visual directions, high-fidelity responsive prototypes, qualitative peer testing and implementation refinement.")}</p></div>
          <ol className="process-track"><li><span>01</span><b>{t("Audit")}</b><p>{t("Compare the original journey and identify hierarchy, consistency and accessibility failures.")}</p></li><li><span>02</span><b>{t("Frame")}</b><p>{t("Define a complete path from discovery and search to payment and confirmation.")}</p></li><li><span>03</span><b>{t("Explore")}</b><p>{t("Test layout, type and colour directions before selecting warm minimalism.")}</p></li><li><span>04</span><b>{t("Prototype")}</b><p>{t("Build high-fidelity desktop and mobile flows with documented states.")}</p></li><li><span>05</span><b>{t("Validate")}</b><p>{t("Use peer testing and browser comparison to refine labels, sizing and navigation.")}</p></li><li><span>06</span><b>{t("Implement")}</b><p>{t("Translate the design into reusable, responsive code and deploy it.")}</p></li></ol>
        </Reveal>
      </section>

      <section className="furniture-section furniture-journey">
        <Reveal>
          <SectionLabel number="05">{t("INFORMATION ARCHITECTURE")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("One continuous shopping loop.")}</h2><p>{t("Each page answers one primary question and prepares the next decision, reducing uncertainty as commitment increases.")}</p></div>
          <div className="journey-track">{journeySteps.map(({ title, question, image, alt }, index) => <article key={title}><div className="journey-step-media"><FurnitureImage src={`/images/furniture/journey/${image}-provided-20261018.webp`} alt={t(alt)} width={960} height={540} loading="lazy" decoding="async" /></div><h3>{t(title)}</h3><p>{t(question)}</p>{index < 5 && <ArrowRight aria-hidden="true" />}</article>)}</div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-responsive">
        <Reveal>
          <SectionLabel number="06">{t("RESPONSIVE EXPERIENCE")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("Desktop supports comparison. Mobile supports sequence and touch.")}</h2><p>{t("The same product and catalogue logic is preserved across breakpoints. Desktop uses horizontal grouping and persistent context; mobile uses vertical rhythm, two-column discovery, large touch targets and sticky commerce actions.")}</p></div>
          <div className="responsive-pair">
            <figure><ScrollablePreview image="/images/furniture/desktop-home.png" alt={t("Desktop furniture store homepage design")} /><figcaption><span>{t("DESKTOP · 1440PX")}</span><small>{t("HOVER & SCROLL TO VIEW FULL PAGE")}</small></figcaption></figure>
            <figure><ScrollablePreview image="/images/furniture/mobile-home.png" alt={t("Mobile furniture store homepage design")} /><figcaption><span>{t("MOBILE · 393PX")}</span><small>{t("HOVER & SCROLL TO VIEW FULL PAGE")}</small></figcaption></figure>
          </div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-flow">
        <Reveal>
          <SectionLabel number="07">{t("DESKTOP SHOPPING FLOW")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("Emotional product discovery becomes rational purchase confidence.")}</h2><p>{t("The interface progressively reveals more detail as intent becomes stronger—from room inspiration and product comparison to material facts, checkout and reassurance.")}</p></div>
          <AutoShowcase items={desktopFlow} />
        </Reveal>
      </section>

      <section className="furniture-section furniture-mobile-flow">
        <Reveal>
          <SectionLabel number="08">{t("MOBILE SHOPPING FLOW")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("The complete purchase journey remains usable in one hand.")}</h2><p>{t("Navigation, cards, quantity controls, checkout fields and sticky payment actions are re-composed around mobile scanning and thumb reach.")}</p></div>
          <AutoShowcase items={mobileFlow} mobile />
        </Reveal>
      </section>

      <section className="furniture-section furniture-motion">
        <Reveal>
          <SectionLabel number="09">{t("INTERACTION & MOTION")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("Motion confirms state and directs attention.")}</h2><p>{t("Animation is intentionally restrained: product images scale on hover, cards lift with soft elevation, reviews auto-advance, drawers reveal navigation, and order success uses a short scale-and-opacity confirmation.")}</p></div>
          <div className="motion-grid"><figure className="motion-card"><FurnitureImage src="/images/furniture/mobile-menu.png" alt={t("Mobile navigation menu interaction state")} /><figcaption><span>{t("MENU STATE")}</span><h3>{t("Progressive navigation")}</h3><p>{t("The menu expands only when needed, preserving catalogue space.")}</p></figcaption></figure><figure className="motion-card motion-delay"><FurnitureImage src="/images/furniture/added-cart.png" alt={t("Added to cart feedback state")} /><figcaption><span>{t("COMMERCE FEEDBACK")}</span><h3>{t("Action confirmation")}</h3><p>{t("A clear toast closes the loop after adding an item to the cart.")}</p></figcaption></figure></div>
          <div className="motion-specs"><article><b>{t("Product hover")}</b><span>{t("Scale · lift · shadow")}</span></article><article><b>{t("Review carousel")}</b><span>{t("3-second auto rotation")}</span></article><article><b>{t("Success feedback")}</b><span>{t("Opacity · scale · easing")}</span></article><article><b>{t("Accessibility")}</b><span>{t("Reduced-motion support")}</span></article></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-build">
        <Reveal>
          <SectionLabel number="10">{t("DESIGN TO CODE")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("I treated implementation as part of the design process.")}</h2><p>{t("The current prototype is a React and TypeScript front end with structured product data, reusable commerce components, state-driven views, responsive CSS and a complete demo checkout flow deployed on Vercel.")}</p></div>
          <div className="build-grid"><article><Code2 /><h3>{t("Component architecture")}</h3><p>{t("Shared product cards, quantities, order summaries, form fields and navigation reduce drift between screens.")}</p></article><article><Workflow /><h3>{t("State-driven commerce")}</h3><p>{t("Search, filters, cart quantities, checkout and confirmation are connected through real interface state.")}</p></article><article><Smartphone /><h3>{t("Responsive implementation")}</h3><p>{t("Media queries transform layout priority, image behaviour and touch interaction across breakpoints.")}</p></article><article><CheckCircle2 /><h3>{t("Deployment pipeline")}</h3><p>{t("Git-based iteration, production builds and Vercel deployment turn the prototype into a shareable product.")}</p></article></div>
          <div className="vibe-workflow"><div><span>{t("AI-ASSISTED VIBE CODING")}</span><h3>{t("Design intent remained the source of truth.")}</h3></div><p>{t("I used AI to accelerate implementation, debugging and repetitive refinement while directing the design decisions. I defined the hierarchy, components and interaction rules, generated and inspected code, compared browser output with Figma, corrected responsive failures, tested the full flow and redeployed each verified iteration.")}</p><ol><li>{t("Define design intent")}</li><li>{t("Generate a scoped implementation")}</li><li>{t("Inspect code and browser output")}</li><li>{t("Compare against Figma")}</li><li>{t("Refine, test and deploy")}</li></ol></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-testing">
        <Reveal>
          <SectionLabel number="11">{t("TESTING & ITERATION")}</SectionLabel>
          <div className="furniture-heading"><h2>{t("Testing focused on comprehension, continuity and confidence.")}</h2><p>{t("Qualitative peer testing exposed small type, wording errors, unclear jumps and button placement issues. Implementation testing then uncovered responsive overflow, image cropping and state-feedback problems that emerged during live interaction.")}</p></div>
          <div className="testing-grid"><article><TestTube2 /><span>{t("OBSERVE")}</span><h3>{t("Can a user complete the shopping path without explanation?")}</h3></article><article><MousePointer2 /><span>{t("REFINE")}</span><h3>{t("Are primary actions visible, predictable and easy to operate?")}</h3></article><article><Smartphone /><span>{t("VERIFY")}</span><h3>{t("Does content maintain its hierarchy across desktop and mobile?")}</h3></article></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-outcome">
        <Reveal>
          <SectionLabel number="12">{t("OUTCOME & REFLECTION")}</SectionLabel>
          <div className="outcome-grid"><h2>{t("A coherent system connecting brand, hierarchy, interaction and implementation.")}</h2><div><p>{t("The redesign improves the relationship between brand expression and user action. Warm visual language communicates the quality of timber furniture, while a structured journey makes discovery, comparison and checkout more predictable.")}</p><p>{t("The largest constraint was incomplete source content while the original store was under maintenance. I created realistic supporting product information while preserving the original catalogue identity. A future release would add persistent cart storage, richer galleries, real-time form validation, broader accessibility testing and an API-backed product model.")}</p><p>{t("This project demonstrates my ability to work across the complete design spectrum—from diagnosing an interface and defining an art direction to coding, testing and shipping the finished experience.")}</p></div></div>
        </Reveal>
      </section>
    </div>
  )
}
