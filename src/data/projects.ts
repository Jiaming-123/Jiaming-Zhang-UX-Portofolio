export type ProjectSlug = 'landing-app' | 'boardgamemate' | 'culturelens' | 'furniture' | 'crownlands'

export type Project = {
  slug: ProjectSlug
  number: string
  title: string
  eyebrow: string
  year: string
  categories: string[]
  summary: string
  heroStatement: string
  heroAlt: string
  color: string
  overview: string
  problem: string
  research: string
  insights: { title: string; text: string }[]
  direction: string
  finalExperience: string
  reflection: string
}

export const projects: Project[] = [
  {
    slug: 'landing-app',
    number: '01',
    title: 'Landing App',
    eyebrow: 'Graduation project',
    year: '2026',
    categories: ['UX Product Design', 'AI Agent', 'Service Design'],
    summary: 'An AI-powered transition assistant helping international students navigate their first steps in a new country.',
    heroStatement: 'Helping international students move from uncertainty to confidence through a personalised AI settlement assistant.',
    heroAlt: 'Mobile AI assistant interface helping an international student complete arrival tasks such as SIM card, bank setup and university registration',
    color: '#0066FF',
    overview: 'Landing App turns the first weeks after arrival into a clear, supported sequence. It brings essential tasks, reliable information, and timely guidance into one personal settlement experience—without asking a student to understand every local system at once.',
    problem: 'International students face fragmented information, unclear next steps, and difficulty accessing reliable support after arrival. The challenge is not a lack of information; it is knowing what applies, what to trust, and what to do next while adapting to an unfamiliar place.',
    research: 'Discovery focused on the lived transition from arrival to everyday independence. Interview themes, student pain points, and the end-to-end arrival journey were mapped together to reveal where information becomes action—and where students are most likely to lose confidence.',
    insights: [
      { title: 'Sequence matters', text: 'Advice becomes useful when it appears in the order a student needs it, not as one overwhelming checklist.' },
      { title: 'Trust must be visible', text: 'Students need to understand where information comes from and when a human should become involved.' },
      { title: 'Context changes the answer', text: 'Arrival date, language, institution, and personal circumstances shape the right next step.' },
    ],
    direction: 'The service is structured around a personalised timeline and an AI guide that translates intent into a practical next action. Verified sources, bilingual explanation, appointment guidance, provider connection, and human escalation work as one service—not separate features.',
    finalExperience: 'A student can ask in their own words, receive a concise explanation, and move directly into a relevant action. Completed tasks update the timeline so the experience progressively shifts from urgent setup to healthcare, community, and daily life.',
    reflection: 'Designing with AI meant defining its limits as carefully as its capabilities. The strongest outcome is not an assistant that answers everything; it is a service that builds confidence through transparent sources, sensible sequencing, and a clear path to human support.',
  },
  {
    slug: 'boardgamemate',
    number: '02',
    title: 'BoardGameMate',
    eyebrow: 'Community product',
    year: '2025',
    categories: ['Digital Product Design', 'UX Research'],
    summary: 'A social platform that helps board game players find compatible people and communities.',
    heroStatement: 'Designing a social platform that helps board game players find compatible people and communities.',
    heroAlt: 'BoardGameMate mobile application screens showing player discovery, community interaction and messaging',
    color: '#00D4FF',
    overview: 'BoardGameMate treats finding the right people as part of the game experience. It connects players through play style, preferred titles, availability, and community context rather than relying on a generic social feed.',
    problem: 'Interest in board games does not guarantee a compatible table. Players need a low-pressure way to discover people, understand group expectations, learn unfamiliar games, and continue conversations beyond a single event.',
    research: 'Research explored how players currently find groups, what makes an invitation feel safe, and the information needed before committing to play. The resulting persona and journey connected discovery, confidence, participation, and ongoing community.',
    insights: [
      { title: 'Compatibility is practical', text: 'Schedule, location, experience level, and preferred game intensity matter as much as shared interests.' },
      { title: 'Joining is a vulnerable moment', text: 'Clear community expectations and lightweight introductions reduce the social cost of making first contact.' },
      { title: 'Learning unlocks belonging', text: 'A short tutorial can remove the knowledge barrier that prevents a new player from joining a session.' },
    ],
    direction: 'The core flow connects player discovery to a guided introduction, relevant communities, and contextual chat. Each step reveals only the information needed to make the next social decision.',
    finalExperience: 'Players move from browsing compatible people to understanding a game, joining a community, and starting a conversation. The interaction model keeps the product friendly and focused while preserving enough detail to support trust.',
    reflection: 'Community products need to design the conditions around interaction, not just the interaction itself. BoardGameMate reframed matching as a progression from curiosity to confidence to participation.',
  },
  {
    slug: 'culturelens',
    number: '03',
    title: 'CultureLens Concierge',
    eyebrow: 'Future service concept',
    year: '2025',
    categories: ['Service Design', 'Conversational AI', 'Future Experience'],
    summary: 'A future museum service combining immersive technology and conversational AI to personalise visitor journeys.',
    heroStatement: 'A future museum service combining immersive technology and conversational AI to personalise visitor journeys.',
    heroAlt: 'Future museum visitor experience combining immersive technology and an AI concierge assistant',
    color: '#38BDF8',
    overview: 'CultureLens Concierge extends the museum visit before, during, and after the building. A conversational guide helps visitors find an exhibition path or prepare a visit while keeping the collection—and not the technology—at the centre.',
    problem: 'Museum visits can be rich but difficult to navigate. Generic recommendations overlook time, access needs, prior knowledge, and personal curiosity, while dense planning tools can turn cultural discovery into administration.',
    research: 'The service journey was considered across two intents: discovering an exhibition and planning a museum visit. Mapping both paths exposed the moments where conversation could clarify intent, reduce planning friction, and create a more personal connection with the collection.',
    insights: [
      { title: 'Intent begins broad', text: 'Visitors often know how they want to feel before they know which exhibition they want to see.' },
      { title: 'Constraints shape discovery', text: 'Available time, group needs, access, and location should guide the recommendation rather than appear as filters at the end.' },
      { title: 'Explanation builds agency', text: 'A recommendation is more meaningful when the visitor understands why it fits.' },
    ],
    direction: 'The concierge uses a conversational structure that moves between open exploration and concrete planning. Recommendation paths, service touchpoints, and escalation logic were designed as one connected journey.',
    finalExperience: 'Two experience paths show how a visitor can discover an exhibition from an interest or plan a practical museum day. The AI surfaces its reasoning, adjusts to new information, and turns a recommendation into a usable itinerary.',
    reflection: 'The project reinforced that conversational design is service design. Every response carries an operational promise, so the language, logic, and museum touchpoints need to be designed together.',
  },
  {
    slug: 'furniture',
    number: '04',
    title: 'My Furniture Store',
    eyebrow: 'End-to-end commerce redesign',
    year: '2025',
    categories: ['UI/UX Design', 'Responsive Commerce', 'React Development'],
    summary: 'An end-to-end furniture commerce redesign—from interface audit and Figma system to a fully coded responsive shopping experience.',
    heroStatement: 'From interface audit to a warm, accessible and fully coded furniture shopping experience.',
    heroAlt: 'Modern responsive furniture ecommerce website redesign with desktop and mobile interfaces',
    color: '#DBCA83',
    overview: 'My Furniture Store reworks a fragmented shopping journey into a calm, image-led storefront and a complete path from discovery to order confirmation.',
    problem: 'The original experience made products difficult to compare and important details hard to find. Inconsistent hierarchy and desktop-first layouts added friction across browsing, evaluation, and cart review.',
    research: 'The existing experience was audited across the purchase journey. Content hierarchy, responsive behaviour, product comparison needs, and interaction feedback were examined from homepage entry to cart.',
    insights: [
      { title: 'Browsing needs rhythm', text: 'A clear alternation of inspiration, category entry, and product detail helps people explore without losing orientation.' },
      { title: 'Imagery and facts work together', text: 'Large product visuals create desire, while dimensions, materials, and delivery details build purchase confidence.' },
      { title: 'Responsive means repriorising', text: 'Mobile needs a different information order and touch model, not a compressed desktop page.' },
    ],
    direction: 'The redesign uses a consistent grid, quiet typography, flexible product cards, and progressive detail. Hover and expansion behaviours add depth on desktop while equivalent tap interactions keep the journey direct on mobile.',
    finalExperience: 'The internal demo moves through homepage, browsing, product detail, and cart. It demonstrates the responsive system, product image transitions, and clear expansion from visual discovery to purchase information.',
    reflection: 'Implementing the interface made responsive decisions tangible. The strongest improvements came from treating layout, content, and interaction as one system across breakpoints.',
  },
  {
    slug: 'crownlands',
    number: '05',
    title: 'Crownlands',
    eyebrow: 'Physical experience',
    year: '2024',
    categories: ['Game Design', 'Physical Interaction', 'Visual Design'],
    summary: 'A medieval strategy board game built around territory, negotiation, and physical play.',
    heroStatement: 'Turning territorial strategy into a legible, social, and tactile tabletop experience.',
    heroAlt: 'Crownlands medieval strategy board game showing map, soldiers, flags and components',
    color: '#6BA6FF',
    overview: 'Crownlands is a physical strategy game where territory, action cards, and player negotiation create an evolving contest for control. The project brings system design, visual communication, and hands-on prototyping together.',
    problem: 'Strategic depth can quickly become procedural complexity. The design challenge was to make the state of the game readable at a glance while keeping each turn open enough for meaningful player decisions and social tension.',
    research: 'Prototype sessions focused on how players interpreted the board, remembered turn options, negotiated, and recovered from mistakes. Observed behaviour informed the balance between rule clarity, visual hierarchy, and strategic surprise.',
    insights: [
      { title: 'State must be visible', text: 'Territory, ownership, and immediate opportunity should be readable without interrupting play to consult the rules.' },
      { title: 'Components teach the system', text: 'Cards, flags, and pieces can communicate possible actions through form and placement.' },
      { title: 'Negotiation creates replayability', text: 'The most memorable moments emerge from players interpreting and responding to one another.' },
    ],
    direction: 'The board, action cards, soldiers, flags, and reference information were iterated as a coherent physical interface. Rules were refined alongside component design so the system could be learned through play.',
    finalExperience: 'The final prototype supports territory control, tactical actions, and player-led negotiation in a clear visual field. Physical components make changes in power visible and give each decision a satisfying material consequence.',
    reflection: 'Crownlands showed that interaction design is not confined to screens. Feedback, affordance, hierarchy, and pacing are equally important when the interface is a board shared by several people.',
  },
]

export const projectBySlug = (slug: string | undefined) => projects.find((project) => project.slug === slug)

export const visualItems = [
  { title: 'Signal / Noise', year: '2026', category: 'Poster Design', alt: 'Experimental poster using compressed blue typography and layered grid lines', size: 'tall' },
  { title: 'Form Studies 01', year: '2025', category: 'Graphic Design', alt: 'Abstract graphic composition exploring geometric forms and electric blue light', size: 'wide' },
  { title: 'Melbourne Type', year: '2025', category: 'Typography', alt: 'Editorial typography study inspired by Melbourne urban wayfinding', size: 'standard' },
  { title: 'Elsewhere', year: '2025', category: 'Branding', alt: 'Brand identity exploration with wordmark, color system and application mockups', size: 'tall' },
  { title: 'Assembly', year: '2024', category: 'Editorial', alt: 'Editorial layout experiment combining modular type and documentary imagery', size: 'standard' },
  { title: 'Future Objects', year: '2024', category: 'Poster Design', alt: 'Futuristic poster series with large display typography and soft blue gradients', size: 'wide' },
]
