// Portfolio synthesis grounded in A2.G2 and A2.G3; no research metrics are inferred.
export const chapters = ['Frame', 'Explore', 'Evolve', 'Service', 'Agent', 'Reflect']
export const signals = [
  ['Embodied experiences', 'Culture is becoming spatial, sensory and adaptive.', 'Design for different bodies and changing energy.'],
  ['AI-guided discovery', 'AI increasingly sequences what people discover.', 'Make the basis of a recommendation visible.'],
  ['Agency under pressure', 'Personalisation can quietly become a decision on someone’s behalf.', 'Keep alternatives and overrides within reach.'],
]
export const museumLayers = [
  { name: 'People', nodes: ['Visitor', 'Museum staff', 'Curator / interpretation team'], detail: 'The visitor chooses. Staff support live needs. Curators and source communities anchor interpretation.', consequence: 'A recommendation needs an accountable source and a route to a person.' },
  { name: 'Touchpoints', nodes: ['Website', 'Catalogue', 'Reservation', 'Entrance', 'Gallery', 'Support point', 'Information Desk'], detail: 'Planning crosses pages; the need for support continues after arrival.', consequence: 'Carry confirmed visit context between discovery, preparation and adjustment.' },
  { name: 'Information', nodes: ['Meaning', 'Timeslots', 'Language', 'Access', 'Comfort', 'Crowd', 'Transport'], detail: 'Cultural knowledge and practical service information have different sources and levels of certainty.', consequence: 'Separate reviewed interpretation from simulated availability and live staff advice.' },
  { name: 'Decisions', nodes: ['Discover', 'Compare', 'Select', 'Prepare', 'Arrive', 'Experience', 'Adjust'], detail: 'Visitors negotiate what to see, how to get there, how deeply to engage and when to rest.', consequence: 'Treat the plan as a sequence of reversible decisions.' },
]
export const journey = [
  ['Preview', 'A 20-second sense of the atmosphere, with time, intensity, access and support visible.'],
  ['Personalise', 'Start with Gentle, Balanced or Deep. Detailed tuning is optional and skippable.'],
  ['Experience', 'Follow a route with shared curatorial anchors and equivalent access options.'],
  ['Modify', 'Pause, skip, lower intensity or ask staff. Preferences can change during the visit.'],
  ['Reflect', 'Review the experience and choose whether anything is saved after the visit.'],
]
export const proposals = [
  { title: 'Personalised Immersive Exhibition Journey', short: 'The journey', layer: 'Service preparation', thesis: 'A visitor-shaped journey, before and beyond the gallery.', value: 'Preparation, sensory information and in-visit adjustment make access part of the normal service.', risk: 'Too much choice creates work. Initial preferences can harden into labels.', response: 'Short onboarding, three entry modes and temporary, editable preferences.', source: 'A2.G2 · pp. 2–5', assets: [] },
  { title: 'Living Context Gallery', short: 'The context', layer: 'Cultural interpretation / XR', thesis: 'Return the object to people, place and memory.', value: 'Projection, spatial sound and optional story layers reveal how objects were used and remembered.', risk: 'Spectacle can overwhelm meaning; reconstruction can look more certain than the evidence.', response: 'Keep objects central. Mark sources and uncertainty. Offer lower-sensory equivalents.', source: 'A2.G2 · pp. 6–9', assets: ['culturelens-xr-scenario.webp', 'culturelens-xr-system.webp'] },
  { title: 'MuseBand — Personal Focus Layer', short: 'The live moment', layer: 'Smart-museum support', thesis: 'Make focus, comfort and control adjustable in the moment.', value: 'Connect object stories, route choice, captions, haptics and crowd-aware support within a shared exhibition.', risk: 'Prompts can distract; wearables can exclude. Tracking, hygiene, charging and staff workload matter.', response: 'Explain suggestions, allow opt-out, minimise data and provide non-device alternatives.', source: 'A2.G2 · pp. 10–16', assets: ['culturelens-museband-scenario.webp', 'culturelens-museband-product-projection-20260914.webp'] },
]
export const comparison = [
  ['Visitor value', 'Prepared entry; continuous adjustment', 'Context, use and cultural connection', 'Focus, comfort and route choice in the moment'],
  ['System value', 'A coherent before–during–after service', 'A narrative spine connecting objects', 'Visitors, objects, crowds and operations connected'],
  ['Accessibility', 'Simple modes; sensory and seated routes', 'Captions; low-sensory, non-headset access', 'Haptics and captions; equivalent non-device support'],
  ['Ethical challenge', 'Choice overload; fixed visitor labels', 'False certainty; cultural misrepresentation', 'Surveillance, exclusion and behavioural control'],
  ['Futures fit', 'Personalised, access-aware services', 'Spatial, embodied cultural interpretation', 'Adaptive systems with visible visitor control'],
  ['Prototype evidence', 'Service storyboard and touchpoints', 'XR canvas and concept sketches', 'Physical prototype and desktop walkthrough'],
]
export const transfers = [
  ['Personalisation', 'Context-aware recommendations'], ['Accessibility', 'Language, comfort and access support'],
  ['Real-time adjustment', 'Editable visit state'], ['Visitor control', 'Confirm / change / reject / cancel'],
  ['System awareness', 'Data, variables and routing'], ['Ethical limits', 'Boundaries and human fallback'],
]
export const blueprint = [
  { stage: 'Discover', rows: ['Express an open-ended visit need.', 'Ask one useful clarification.', 'Core agent routes to Recommend Exhibitions.', 'Catalogue plus language and access metadata.', 'Curator-reviewed sources would anchor explanation.'], why: 'Clarify intent without making the visitor complete a long form.' },
  { stage: 'Decide', rows: ['Compare the primary option and an alternative.', 'Explain the fit; expose compare, change and reject.', 'Match interests, language and visit-specific comfort.', 'Prototype exhibition attributes.', 'Keep interpretation grounded and the decision reversible.'], why: 'The first recommendation must not become the only visible choice.' },
  { stage: 'Prepare', rows: ['Select an exhibition and provide visit details.', 'Show a summary before confirmation.', 'Enter the Workflow only when selected_exhibition is set.', 'Simulated timeslots, capacity and structured ticket variables.', 'Visitor confirms; no real ticket or payment is issued.'], why: 'Open-ended recommendation stays flexible; reservation becomes structured.' },
  { stage: 'Arrive', rows: ['Review arrival and travel guidance.', 'Present a prototype visit-day plan.', 'Combine the confirmed slot with arrival and support rules.', 'Simulated weather, transport and support points.', 'Official channels remain necessary for live travel and access information.'], why: 'A plan can reduce preparation effort without claiming live certainty.' },
  { stage: 'Experience', rows: ['Ask about an exhibition or request another language.', 'Offer text-based exhibition guidance.', 'Route to Exhibition Guide and Visit Support.', 'Explanation summaries and supported languages.', 'Official labels, curators and source communities retain authority.'], why: 'Interpretation support should make cultural sources easier to understand.' },
  { stage: 'Adjust', rows: ['Change comfort needs, pause or request help.', 'Offer practical alternatives and staff support.', 'Update temporary state; check capability boundaries.', 'Visit preferences and prototype support-point data.', 'Information Desk for live needs; a human can override the plan.'], why: 'Comfort is visit state, not identity.' },
]
export const architecture = [
  { prompt: 'I want something quiet this Saturday.', route: 'Recommend Exhibitions', kind: 'Playbook 01', data: 'Catalogue + comfort metadata', state: 'visit_date, crowd_preference, sensory_preference', action: 'Offer one primary exhibition and one alternative.' },
  { prompt: 'I want Chinese explanation.', route: 'Exhibition Guide and Visit Support', kind: 'Playbook 02', data: 'Explanation summaries + language support', state: 'language_preference, selected_exhibition', action: 'Ground the explanation in reviewed content; refer to official labels.' },
  { prompt: 'I want to book a ticket.', route: 'User-confirmed Dynamic Visit Plan', kind: 'Workflow 01', data: 'Simulated tickets + timeslots', state: 'selected_exhibition → date → tickets → confirmation', action: 'Check exhibition selection first. Prepare, summarise, then ask for confirmation.' },
  { prompt: 'I need a less crowded route.', route: 'Exhibition Guide and Visit Support', kind: 'Playbook 02', data: 'Prototype crowd + support-point data', state: 'crowd_preference, comfort_needs, visit_plan', action: 'Suggest an adjustable alternative. Staff provide live information.' },
]
export const failures = [
  { title: 'A message looked like a link.', break: 'Reservation copy appeared as hyperlink-style text, blurring the difference between a message and an action.', diagnose: 'Formatting carried the wrong interaction cue.', refine: 'Use a normal message with separate “Yes, continue”, “Choose another exhibition” and “Compare first” buttons.', consequence: 'Visitors can distinguish explanation from action.', before: 'Would you like to prepare a reservation?', after: 'Review the exhibition before continuing.', source: 'A2.G3 · p. 25' },
  { title: 'The agent reached the wrong Playbook.', break: 'Inconsistent Playbook names led to incorrect or invalid routing.', diagnose: 'Names did not express one stable intent per route.', refine: 'Standardise intent-specific Playbook labels and update the routing instructions together.', consequence: 'A request reaches a predictable service module.', before: 'Book visit → unknown_playbook', after: 'Recommendation → Recommend Exhibitions', source: 'A2.G3 · p. 25' },
  { title: 'The chosen exhibition disappeared.', break: 'The reservation prompt showed an empty or invalid exhibition value, including “0”.', diagnose: 'The selection was not reliably stored and mapped across the transition.', refine: 'Save selected_exhibition before entering the Workflow. Use the same variable in Playbook, buttons and summary.', consequence: 'Context survives the move from conversation to structured action.', before: 'Prepare a visit plan for 0?', after: 'selected_exhibition: Everyday Objects, Shared Cultures', source: 'A2.G3 · p. 26' },
  { title: 'A sentence was not reservation state.', break: '“2 adults + 1 under 5” was stored as one text value.', diagnose: 'The Workflow needed separate counts, including free-entry children in the visitor total.', refine: 'Introduce a Code Step to extract adult_count, child_count, free_child_count and visitor_count.', consequence: 'Natural language becomes reviewable, workflow-ready state.', before: 'ticket_input: “2 adults + 1 under 5”', after: 'adult_count: 2 · free_child_count: 1 · visitor_count: 3', source: 'A2.G3 · p. 26' },
]
export const risks = [
  { title: 'Guidance can narrow cultural choice.', risk: 'Visitors may follow the first recommendation as a default.', intervention: 'Always expose an alternative, comparison, change, rejection and confirmation.', test: 'Observe whether visitors notice the controls and still feel they are choosing.', lens: 'Agency · act with confirmation' },
  { title: '“Easy” is not an access requirement.', risk: 'Comfort language may mean sound, crowd, walking, explanation or seating.', intervention: 'Ask a practical clarification and keep needs temporary, adjustable and specific to this visit.', test: 'Use ambiguous prompts and check whether visitors can correct the interpretation.', lens: 'Accessibility · conversation breakdown analysis' },
  { title: 'AI can sound like cultural authority.', risk: 'A confident explanation can flatten contested histories or appear to be official knowledge.', intervention: 'Use curator-reviewed sources, visible attribution, official-label references and staff fallback.', test: 'Ask for hidden meanings or a dramatic story contradicting a label. Check grounding and redirection.', lens: 'Ethics · proposed misbehaviour testing' },
]
export const exhibitions = [
  { id: 'E01', name: 'Everyday Objects, Shared Cultures', duration: '45 min', theme: 'Daily life, migration and family memory', language: 'English · Simple English · Chinese', sensory: 'Low', crowd: 'Low to medium', access: 'Quiet gallery · seating available', slots: [{ time: '10:00 AM', arrival: '9:30 AM', capacity: 'Available', crowd: 'Low' }, { time: '12:30 PM', arrival: '12:00 PM', capacity: 'Available', crowd: 'Medium' }, { time: '2:00 PM', arrival: '1:30 PM', capacity: 'Limited', crowd: 'Medium' }] },
  { id: 'E02', name: 'Living Cities: Stories Across Borders', duration: '50 min', theme: 'Migration, identity, belonging and city life', language: 'English · Simple English · Chinese · Spanish · French', sensory: 'Medium', crowd: 'Medium', access: 'Captions available · story-based', slots: [{ time: '11:00 AM', arrival: '10:30 AM', capacity: 'Limited', crowd: 'Medium' }, { time: '1:30 PM', arrival: '1:00 PM', capacity: 'Limited', crowd: 'High' }, { time: '3:30 PM', arrival: '3:00 PM', capacity: 'Available', crowd: 'Medium' }] },
]
