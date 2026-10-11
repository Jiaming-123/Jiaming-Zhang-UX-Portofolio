export type ProjectSlug = 'unilink' | 'boardgamemate' | 'culturelens' | 'furniture' | 'crownlands'

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
}

export const projects: Project[] = [
{
  slug: 'unilink',
  number: '01',
  title: 'UniLink',
  eyebrow: 'UX case study',
  year: '2026',
  categories: ['UX Research', 'Product Design', 'Service Design'],
  summary: 'A research-led peer support platform connecting international students with relevant communities and verified senior mentors.',
  heroStatement: 'Peer groups and verified mentors help international students find relevant, trusted support.',
  heroAlt: 'UniLink peer groups and verified mentor booking screens',
  color: '#0066FF',
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
},
{
  slug: 'crownlands',
  number: '05',
  title: 'Crownlands',
  eyebrow: 'Physical experience',
  year: '2024',
  categories: ['Game Design', 'Physical Interaction', 'Digital Development'],
  summary: 'A medieval strategy board game built around territory, negotiation, and physical play.',
  heroStatement: 'Turning territorial strategy into a legible, social, and tactile tabletop experience.',
  heroAlt: 'Crownlands medieval strategy board game showing map, soldiers, flags and components',
  color: '#6BA6FF',
}
]

export const projectBySlug = (slug: string | undefined) => projects.find((project) => project.slug === slug)
