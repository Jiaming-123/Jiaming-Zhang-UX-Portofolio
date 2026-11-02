export const chapters = ['Frame', 'Explore', 'Evolve', 'Service', 'Agent', 'Reflect']

export const signals = [
  ['More than looking', 'Exhibitions can surround us with sound, movement and interactive stories.', 'Leave room for different access needs and energy levels.'],
  ['Help finding your next exhibition', 'An AI guide can help people find exhibitions they might otherwise miss.', 'Explain why a suggestion might suit this visitor.'],
  ['Whose choice is it?', 'A helpful recommendation can easily start to feel like the only option.', 'Make other choices easy to find.'],
]

export const museumLayers = [
  { name: 'People', nodes: ['Visitor', 'Museum staff', 'Curator / interpretation team'], detail: 'Visitors bring their own interests. Staff help when plans change. Curators and source communities give the stories their depth and credibility.', consequence: 'Show where advice comes from, and how to reach someone who can help.' },
  { name: 'Touchpoints', nodes: ['Website', 'Catalogue', 'Reservation', 'Entrance', 'Gallery', 'Support point', 'Information Desk'], detail: 'Planning may start on a website, but questions keep coming after the visitor arrives.', consequence: 'Keep the chosen exhibition and visit details together, so visitors do not have to start over.' },
  { name: 'Information', nodes: ['Meaning', 'Timeslots', 'Language', 'Access', 'Comfort', 'Crowd', 'Transport'], detail: 'An object story, an available ticket and a staff recommendation come from different places. They cannot all be treated as equally certain.', consequence: 'Make clear which content has been reviewed, which data is simulated and which questions need a member of staff.' },
  { name: 'Decisions', nodes: ['Discover', 'Compare', 'Select', 'Prepare', 'Arrive', 'Experience', 'Adjust'], detail: 'Visitors decide what to see, how to get there, when to linger and when to take a break.', consequence: 'Let people change the plan as their day unfolds.' },
]

export const journey = [
  ['Preview', 'Get a 20-second feel for the exhibition, including how long it takes, how intense it feels and what support is available.'],
  ['Personalise', 'Pick Gentle, Balanced or Deep to get started. Fine-tune the settings if you want to, or skip that step.'],
  ['Experience', 'Explore the same key exhibits through a route and format that work for you.'],
  ['Modify', 'Need a break? Pause, skip a section, turn things down or ask a member of staff.'],
  ['Reflect', 'Look back on the visit and choose what, if anything, you want to save.'],
]

export const proposals = [
  { title: 'Personalised Immersive Exhibition Journey', short: 'The journey', layer: 'Service preparation', thesis: 'Get a feel for the visit, then make it your own.', value: 'Preparation, sensory information and in-visit adjustment make access part of the normal service.', risk: 'Too much choice creates work. Initial preferences can harden into labels.', response: 'Short onboarding, three entry modes and temporary, editable preferences.', source: 'A2.G2 · pp. 2–5', assets: [] },
  { title: 'Living Context Gallery', short: 'The context', layer: 'Cultural interpretation / XR', thesis: 'Discover the lives and places behind the object.', value: 'Images, sound and stories could bring an object’s past closer: who used it, what it meant and how it is remembered.', risk: 'Spectacle can overwhelm meaning; reconstruction can look more certain than the evidence.', response: 'Keep objects central. Mark sources and uncertainty. Offer lower-sensory equivalents.', source: 'A2.G2 · pp. 6–9', assets: ['culturelens-xr-scenario.webp', 'culturelens-xr-system.webp'] },
  { title: 'MuseBand — Personal Focus Layer', short: 'The live moment', layer: 'Smart-museum support', thesis: 'A little support when you need it, a pause when you don’t.', value: 'Connect object stories, route choice, captions, haptics and crowd-aware support within a shared exhibition.', risk: 'Prompts can distract; wearables can exclude. Tracking, hygiene, charging and staff workload matter.', response: 'Explain suggestions, allow opt-out, minimise data and provide non-device alternatives.', source: 'A2.G2 · pp. 10–16', assets: ['culturelens-museband-scenario.webp', 'culturelens-museband-product-projection-20260914.webp'] },
]

export const transfers = [
  ['Personalisation', 'Suggestions that fit the visit'], ['Accessibility', 'Language, comfort and access support'],
  ['Real-time adjustment', 'A plan you can change'], ['Visitor control', 'Confirm / change / reject / cancel'],
  ['System awareness', 'Remembering details between steps'], ['Ethical limits', 'Knowing when to ask a person'],
]

export const blueprint = [
  { stage: 'Discover', rows: ['Describe the kind of visit you have in mind.', 'Ask a short follow-up to understand what matters.', 'The main agent passes the request to Recommend Exhibitions.', 'Exhibition listings, supported languages and access details.', 'Exhibition explanations would need sources reviewed by the museum.'], why: 'Start with a question, not a long form.' },
  { stage: 'Decide', rows: ['Look at the suggested exhibition and another option.', 'Explain why it might suit them, with options to compare, change or decline.', 'Match the request with interests, language and comfort needs for this visit.', 'Prototype exhibition attributes.', 'Use reliable sources and leave the final choice to the visitor.'], why: 'A suggestion should open up a choice.' },
  { stage: 'Prepare', rows: ['Choose an exhibition and add the visit details.', 'Let the visitor check the plan before confirming.', 'Start the reservation workflow only after an exhibition has been selected.', 'Sample timeslots, capacity and ticket details.', 'The visitor confirms a prototype reservation; no real ticket or payment is involved.'], why: 'Chat freely while choosing; check the details when reserving.' },
  { stage: 'Arrive', rows: ['Check how to get there and what to expect on arrival.', 'Bring the arrival details together in one plan.', 'Use the chosen time to organise arrival guidance and available support.', 'Sample weather, transport and museum support information.', 'Point visitors to official sources for current travel and access information.'], why: 'Help visitors prepare, and be clear about what is not live information.' },
  { stage: 'Experience', rows: ['Ask about an exhibit or switch to another language.', 'Offer exhibition stories and guidance in text.', 'Pass the question to Exhibition Guide or Visit Support.', 'Exhibition summaries and supported languages.', 'Keep explanations tied to museum labels, curators and source communities.'], why: 'Help people connect with the story behind what they are seeing.' },
  { stage: 'Adjust', rows: ['Ask for a quieter option, take a break or get help.', 'Suggest another option or help them find a member of staff.', 'Update the visit preferences and check whether the guide can help.', 'Current visit preferences and sample support locations.', 'Refer live questions to the Information Desk. Staff can help change the plan.'], why: 'What feels comfortable can change from one visit to the next.' },
]
