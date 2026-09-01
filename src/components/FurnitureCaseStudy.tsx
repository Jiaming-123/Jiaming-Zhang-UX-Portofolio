import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Code2, Layers3, MousePointer2, Smartphone, TestTube2, Workflow } from 'lucide-react'
import { Reveal, SectionLabel } from './Content'

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

function AutoShowcase({ items, mobile = false }: { items: { title: string; note?: string; image: string }[]; mobile?: boolean }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % items.length), 3200)
    return () => window.clearInterval(timer)
  }, [items.length])
  return (
    <div className={`furniture-showcase ${mobile ? 'is-mobile' : ''}`}>
      <div className="furniture-showcase-tabs" role="tablist" aria-label={`${mobile ? 'Mobile' : 'Desktop'} shopping flow`}>
        {items.map((item, index) => <button key={item.title} type="button" className={active === index ? 'active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={active === index}><span>0{index + 1}</span>{item.title}</button>)}
      </div>
      <div className="furniture-showcase-stage">
        <AnimatePresence mode="wait">
          <motion.figure key={items[active].title} initial={{ opacity: 0, y: 24, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: .99 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
            <div className="furniture-showcase-image"><img src={items[active].image} alt={`${items[active].title} responsive furniture store interface`} /></div>
            <figcaption><span>{mobile ? 'MOBILE 393PX' : 'DESKTOP 1440PX'} · AUTO PLAYS EVERY 3.2S</span><h3>{items[active].title}</h3>{items[active].note && <p>{items[active].note}</p>}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  )
}

const auditRows = [
  ['Visual consistency', 'Competing colours, low-resolution imagery and inconsistent product presentation weakened the perceived quality of the brand.', 'A controlled warm-neutral palette, consistent image ratios and a unified component language.'],
  ['Information hierarchy', 'Search, prices and order totals lacked emphasis, forcing users to work harder to find commercial information.', 'Clear typographic levels, stronger price treatment and explicit primary/secondary CTA hierarchy.'],
  ['Interaction clarity', 'Some elements appeared clickable but did not work, while different actions used visually similar buttons.', 'Predictable controls, visible hover/focus/pressed states and feedback after add-to-cart and payment actions.'],
  ['Responsive continuity', 'Mobile and desktop layouts behaved like different products, with inconsistent navigation and content priority.', 'One shared information architecture, re-composed for horizontal desktop comparison and vertical mobile scanning.'],
  ['Purchase confidence', 'Sparse product detail and a weak cart summary made it difficult to verify a decision before checkout.', 'Product facts, quantity controls, delivery cues, order summary and confirmation are connected as one purchase flow.'],
]

export function FurnitureCaseStudy() {
  return (
    <div className="furniture-case">
      <section className="furniture-intro" id="overview">
        <Reveal>
          <SectionLabel number="01">PROJECT OVERVIEW</SectionLabel>
          <div className="furniture-intro-grid">
            <h2>From interface audit to a coded furniture commerce experience.</h2>
            <div><p>I independently led the complete process: competitor review, heuristic analysis, information architecture, art direction, responsive UI design, prototyping, front-end implementation, testing and deployment.</p><dl><div><dt>ROLE</dt><dd>UI/UX Designer & Front-end Developer</dd></div><div><dt>SCOPE</dt><dd>Desktop 1440 · Mobile 393</dd></div><div><dt>TOOLS</dt><dd>Figma · React · TypeScript · CSS · Codex · ChatGPT · Vercel</dd></div><div><dt>YEAR</dt><dd>2025</dd></div><div><dt>DELIVERABLE</dt><dd>End-to-end responsive shopping prototype</dd></div></dl></div>
          </div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-audit">
        <Reveal>
          <SectionLabel number="02">AUDITING THE ORIGINAL EXPERIENCE</SectionLabel>
          <div className="furniture-heading"><h2>The old interface was not simply dated. It made product decisions harder.</h2><p>I reviewed the original My Furniture Store alongside furniture competitors, then traced visual inconsistencies back to the decisions they affected: finding a product, understanding its value, selecting an action and confirming a purchase.</p></div>
          <div className="audit-lenses">{['Visual hierarchy', 'Interaction clarity', 'Responsive consistency', 'Conversion confidence'].map((item, index) => <article key={item}><span>0{index + 1}</span><b>{item}</b></article>)}</div>
          <div className="audit-table"><div className="audit-table-head"><span>OBSERVATION</span><span>USER / BRAND IMPACT</span><span>REDESIGN RESPONSE</span></div>{auditRows.map(([title, impact, response], index) => <article key={title}><div><span>0{index + 1}</span><h3>{title}</h3></div><p>{impact}</p><p>{response}</p></article>)}</div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-principles">
        <Reveal>
          <SectionLabel number="03">DESIGN THESIS</SectionLabel>
          <blockquote>“The interface should feel as considered as the furniture itself.”</blockquote>
          <p className="principles-lead">The redesign uses warm materiality to establish trust and quiet hierarchy to support decisions. The existing gold, cream and dark brown palette was retained, then given clear semantic roles instead of being treated as decoration.</p>
          <div className="principle-grid"><article><Layers3 /><span>01</span><h3>Warm materiality</h3><p>Timber-inspired colour and image-led composition connect the digital experience to the physical product.</p></article><article><Workflow /><span>02</span><h3>Quiet hierarchy</h3><p>Scale, spacing and contrast guide attention without competing visual treatments.</p></article><article><MousePointer2 /><span>03</span><h3>Commerce with confidence</h3><p>Every screen explains where users are, what they are viewing and what happens next.</p></article><article><Smartphone /><span>04</span><h3>Responsive continuity</h3><p>Mobile re-prioritises the same content model instead of compressing the desktop composition.</p></article></div>
        </Reveal>
      </section>

      <section className="furniture-figma-visual">
        <Reveal><div className="furniture-image-frame"><img src="/images/furniture/foundations.png" alt="Figma foundations showing the furniture brand palette, typography, spacing, radii and elevation" /></div><div className="furniture-image-caption"><span>FIGMA · FOUNDATIONS</span><p>A semantic visual system connects brand expression, readability and reusable implementation tokens.</p></div></Reveal>
      </section>

      <section className="furniture-section furniture-process">
        <Reveal>
          <SectionLabel number="04">DESIGN PROCESS</SectionLabel>
          <div className="furniture-heading"><h2>Research moved into structure, then into a testable system.</h2><p>The project progressed from inspiration analysis and low-fidelity sketches to three visual directions, high-fidelity responsive prototypes, qualitative peer testing and implementation refinement.</p></div>
          <ol className="process-track"><li><span>01</span><b>Audit</b><p>Compare the original journey and identify hierarchy, consistency and accessibility failures.</p></li><li><span>02</span><b>Frame</b><p>Define a complete path from discovery and search to payment and confirmation.</p></li><li><span>03</span><b>Explore</b><p>Test layout, type and colour directions before selecting warm minimalism.</p></li><li><span>04</span><b>Prototype</b><p>Build high-fidelity desktop and mobile flows with documented states.</p></li><li><span>05</span><b>Validate</b><p>Use peer testing and browser comparison to refine labels, sizing and navigation.</p></li><li><span>06</span><b>Implement</b><p>Translate the design into reusable, responsive code and deploy it.</p></li></ol>
        </Reveal>
      </section>

      <section className="furniture-section furniture-journey">
        <Reveal>
          <SectionLabel number="05">INFORMATION ARCHITECTURE</SectionLabel>
          <div className="furniture-heading"><h2>One continuous shopping loop, not a collection of isolated screens.</h2><p>Each page answers one primary question and prepares the next decision, reducing uncertainty as commitment increases.</p></div>
          <div className="journey-track">{[['Home', 'What does this brand offer?'], ['Search / Category', 'Where can I begin?'], ['Product', 'Is this right for my home?'], ['Cart', 'What have I selected?'], ['Checkout', 'How do I complete the order?'], ['Confirmation', 'Was the purchase successful?']].map(([title, question], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{question}</p>{index < 5 && <ArrowRight />}</article>)}</div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-responsive">
        <Reveal>
          <SectionLabel number="06">RESPONSIVE EXPERIENCE</SectionLabel>
          <div className="furniture-heading"><h2>Desktop supports comparison. Mobile supports sequence and touch.</h2><p>The same product and catalogue logic is preserved across breakpoints. Desktop uses horizontal grouping and persistent context; mobile uses vertical rhythm, two-column discovery, large touch targets and sticky commerce actions.</p></div>
          <div className="responsive-pair"><figure><div className="responsive-scroll"><img src="/images/furniture/desktop-home.png" alt="Desktop furniture store homepage design" /></div><figcaption><span>DESKTOP · 1440PX</span><small>SCROLL TO VIEW FULL PAGE</small></figcaption></figure><figure><div className="responsive-scroll"><img src="/images/furniture/mobile-home.png" alt="Mobile furniture store homepage design" /></div><figcaption><span>MOBILE · 393PX</span><small>SCROLL TO VIEW FULL PAGE</small></figcaption></figure></div>
        </Reveal>
      </section>

      <section className="furniture-figma-visual furniture-components-visual">
        <Reveal><div className="furniture-image-frame"><img src="/images/furniture/components.png" alt="Figma responsive component library with buttons, search, quantity, cards, forms and commerce controls" /></div><div className="furniture-image-caption"><span>FIGMA · COMPONENT LIBRARY</span><p>Reusable variants document size, style, state, focus treatment, minimum touch targets and responsive behaviour.</p></div></Reveal>
      </section>

      <section className="furniture-section furniture-flow">
        <Reveal>
          <SectionLabel number="07">DESKTOP SHOPPING FLOW</SectionLabel>
          <div className="furniture-heading"><h2>Emotional product discovery becomes rational purchase confidence.</h2><p>The interface progressively reveals more detail as intent becomes stronger—from room inspiration and product comparison to material facts, checkout and reassurance.</p></div>
          <AutoShowcase items={desktopFlow} />
        </Reveal>
      </section>

      <section className="furniture-section furniture-mobile-flow">
        <Reveal>
          <SectionLabel number="08">MOBILE SHOPPING FLOW</SectionLabel>
          <div className="furniture-heading"><h2>The complete purchase journey remains usable in one hand.</h2><p>Navigation, cards, quantity controls, checkout fields and sticky payment actions are re-composed around mobile scanning and thumb reach.</p></div>
          <AutoShowcase items={mobileFlow} mobile />
        </Reveal>
      </section>

      <section className="furniture-section furniture-motion">
        <Reveal>
          <SectionLabel number="09">INTERACTION & MOTION</SectionLabel>
          <div className="furniture-heading"><h2>Motion confirms state and directs attention.</h2><p>Animation is intentionally restrained: product images scale on hover, cards lift with soft elevation, reviews auto-advance, drawers reveal navigation, and order success uses a short scale-and-opacity confirmation.</p></div>
          <div className="motion-grid"><figure className="motion-card"><img src="/images/furniture/mobile-menu.png" alt="Mobile navigation menu interaction state" /><figcaption><span>MENU STATE</span><h3>Progressive navigation</h3><p>The menu expands only when needed, preserving catalogue space.</p></figcaption></figure><figure className="motion-card motion-delay"><img src="/images/furniture/added-cart.png" alt="Added to cart feedback state" /><figcaption><span>COMMERCE FEEDBACK</span><h3>Action confirmation</h3><p>A clear toast closes the loop after adding an item to the cart.</p></figcaption></figure></div>
          <div className="motion-specs"><article><b>Product hover</b><span>Scale · lift · shadow</span></article><article><b>Review carousel</b><span>3-second auto rotation</span></article><article><b>Success feedback</b><span>Opacity · scale · easing</span></article><article><b>Accessibility</b><span>Reduced-motion support</span></article></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-build">
        <Reveal>
          <SectionLabel number="10">DESIGN TO CODE</SectionLabel>
          <div className="furniture-heading"><h2>I treated implementation as part of the design process.</h2><p>The current prototype is a React and TypeScript front end with structured product data, reusable commerce components, state-driven views, responsive CSS and a complete demo checkout flow deployed on Vercel.</p></div>
          <div className="build-grid"><article><Code2 /><h3>Component architecture</h3><p>Shared product cards, quantities, order summaries, form fields and navigation reduce drift between screens.</p></article><article><Workflow /><h3>State-driven commerce</h3><p>Search, filters, cart quantities, checkout and confirmation are connected through real interface state.</p></article><article><Smartphone /><h3>Responsive implementation</h3><p>Media queries transform layout priority, image behaviour and touch interaction across breakpoints.</p></article><article><CheckCircle2 /><h3>Deployment pipeline</h3><p>Git-based iteration, production builds and Vercel deployment turn the prototype into a shareable product.</p></article></div>
          <div className="vibe-workflow"><div><span>AI-ASSISTED VIBE CODING</span><h3>Design intent remained the source of truth.</h3></div><p>I used AI to accelerate implementation, debugging and repetitive refinement—not to replace design judgement. I defined the hierarchy, components and interaction rules, generated and inspected code, compared browser output with Figma, corrected responsive failures, tested the full flow and redeployed each verified iteration.</p><ol><li>Define design intent</li><li>Generate a scoped implementation</li><li>Inspect code and browser output</li><li>Compare against Figma</li><li>Refine, test and deploy</li></ol></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-testing">
        <Reveal>
          <SectionLabel number="11">TESTING & ITERATION</SectionLabel>
          <div className="furniture-heading"><h2>Testing focused on comprehension, continuity and confidence.</h2><p>Qualitative peer testing exposed small type, wording errors, unclear jumps and button placement issues. Implementation testing then uncovered responsive overflow, image cropping and state-feedback problems that static mockups could not reveal.</p></div>
          <div className="testing-grid"><article><TestTube2 /><span>OBSERVE</span><h3>Can a user complete the shopping path without explanation?</h3></article><article><MousePointer2 /><span>REFINE</span><h3>Are primary actions visible, predictable and easy to operate?</h3></article><article><Smartphone /><span>VERIFY</span><h3>Does content maintain its hierarchy across desktop and mobile?</h3></article></div>
        </Reveal>
      </section>

      <section className="furniture-section furniture-outcome">
        <Reveal>
          <SectionLabel number="12">OUTCOME & REFLECTION</SectionLabel>
          <div className="outcome-grid"><h2>A coherent system connecting brand, hierarchy, interaction and implementation.</h2><div><p>The redesign improves the relationship between brand expression and user action. Warm visual language communicates the quality of timber furniture, while a structured journey makes discovery, comparison and checkout more predictable.</p><p>The largest constraint was incomplete source content while the original store was under maintenance. I created realistic supporting product information while preserving the original catalogue identity. A future release would add persistent cart storage, richer galleries, real-time form validation, broader accessibility testing and an API-backed product model.</p><p>This project demonstrates my ability to work across the complete design spectrum—from diagnosing an interface and defining an art direction to coding, testing and shipping the finished experience.</p></div></div>
        </Reveal>
      </section>
    </div>
  )
}
