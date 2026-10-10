import { jsxs as n, jsx as e, Fragment as N } from "./culturelens-runtime.js";
import { forwardRef as re, createElement as Y, useReducer as de, useState as m, useRef as S, useEffect as $ } from "./culturelens-runtime.js";
import { Footer as ue } from "./culturelens-runtime.js";
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const he = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ie = (...t) => t.filter((r, a, l) => !!r && l.indexOf(r) === a).join(" ");
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var pe = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const me = re(
  ({
    color: t = "currentColor",
    size: r = 24,
    strokeWidth: a = 2,
    absoluteStrokeWidth: l,
    className: i = "",
    children: s,
    iconNode: d,
    ...c
  }, o) => Y(
    "svg",
    {
      ref: o,
      ...pe,
      width: r,
      height: r,
      stroke: t,
      strokeWidth: l ? Number(a) * 24 / Number(r) : a,
      className: ie("lucide", i),
      ...c
    },
    [
      ...d.map(([u, v]) => Y(u, v)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k = (t, r) => {
  const a = re(
    ({ className: l, ...i }, s) => Y(me, {
      ref: s,
      iconNode: r,
      className: ie(`lucide-${he(t)}`, l),
      ...i
    })
  );
  return a.displayName = `${t}`, a;
};
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ve = k("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L = k("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q = k("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z = k("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = k("MoveRight", [
  ["path", { d: "M18 8L22 12L18 16", key: "1r0oui" }],
  ["path", { d: "M2 12H22", key: "1m8cig" }]
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ge = k("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = k("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const be = k("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]), ye = ["Frame", "Explore", "Evolve", "Service", "Agent", "Test", "Reflect"], Ee = [
  ["Embodied experiences", "Culture is becoming spatial, sensory and adaptive.", "Design for different bodies and changing energy."],
  ["AI-guided discovery", "AI increasingly sequences what people discover.", "Make the basis of a recommendation visible."],
  ["Agency under pressure", "Personalisation can quietly become a decision on someone’s behalf.", "Keep alternatives and overrides within reach."]
], j = [
  { name: "People", nodes: ["Visitor", "Museum staff", "Curator / interpretation team"], detail: "The visitor chooses. Staff support live needs. Curators and source communities anchor interpretation.", consequence: "A recommendation needs an accountable source and a route to a person." },
  { name: "Touchpoints", nodes: ["Website", "Catalogue", "Reservation", "Entrance", "Gallery", "Support point", "Information Desk"], detail: "Planning crosses pages; the need for support continues after arrival.", consequence: "Carry confirmed visit context between discovery, preparation and adjustment." },
  { name: "Information", nodes: ["Meaning", "Timeslots", "Language", "Access", "Comfort", "Crowd", "Transport"], detail: "Cultural knowledge and practical service information have different sources and levels of certainty.", consequence: "Separate reviewed interpretation from simulated availability and live staff advice." },
  { name: "Decisions", nodes: ["Discover", "Compare", "Select", "Prepare", "Arrive", "Experience", "Adjust"], detail: "Visitors negotiate what to see, how to get there, how deeply to engage and when to rest.", consequence: "Treat the plan as a sequence of reversible decisions." }
], B = [
  ["Preview", "A 20-second sense of the atmosphere, with time, intensity, access and support visible."],
  ["Personalise", "Start with Gentle, Balanced or Deep. Detailed tuning is optional and skippable."],
  ["Experience", "Follow a route with shared curatorial anchors and equivalent access options."],
  ["Modify", "Pause, skip, lower intensity or ask staff. Preferences can change during the visit."],
  ["Reflect", "Review the experience and choose whether anything is saved after the visit."]
], G = [
  { title: "Personalised Immersive Exhibition Journey", short: "The journey", layer: "Service preparation", thesis: "A visitor-shaped journey, before and beyond the gallery.", value: "Preparation, sensory information and in-visit adjustment make access part of the normal service.", risk: "Too much choice creates work. Initial preferences can harden into labels.", response: "Short onboarding, three entry modes and temporary, editable preferences.", source: "A2.G2 · pp. 2–5", assets: [] },
  { title: "Living Context Gallery", short: "The context", layer: "Cultural interpretation / XR", thesis: "Return the object to people, place and memory.", value: "Projection, spatial sound and optional story layers reveal how objects were used and remembered.", risk: "Spectacle can overwhelm meaning; reconstruction can look more certain than the evidence.", response: "Keep objects central. Mark sources and uncertainty. Offer lower-sensory equivalents.", source: "A2.G2 · pp. 6–9", assets: ["culturelens-xr-scenario.webp", "culturelens-xr-system.webp"] },
  { title: "MuseBand — Personal Focus Layer", short: "The live moment", layer: "Smart-museum support", thesis: "Make focus, comfort and control adjustable in the moment.", value: "Connect object stories, route choice, captions, haptics and crowd-aware support within a shared exhibition.", risk: "Prompts can distract; wearables can exclude. Tracking, hygiene, charging and staff workload matter.", response: "Explain suggestions, allow opt-out, minimise data and provide non-device alternatives.", source: "A2.G2 · pp. 10–16", assets: ["culturelens-museband-scenario.webp", "culturelens-museband-product-projection-20260914.webp"] }
], we = [
  ["Visitor value", "Prepared entry; continuous adjustment", "Context, use and cultural connection", "Focus, comfort and route choice in the moment"],
  ["System value", "A coherent before–during–after service", "A narrative spine connecting objects", "Visitors, objects, crowds and operations connected"],
  ["Accessibility", "Simple modes; sensory and seated routes", "Captions; low-sensory, non-headset access", "Haptics and captions; equivalent non-device support"],
  ["Ethical challenge", "Choice overload; fixed visitor labels", "False certainty; cultural misrepresentation", "Surveillance, exclusion and behavioural control"],
  ["Futures fit", "Personalised, access-aware services", "Spatial, embodied cultural interpretation", "Adaptive systems with visible visitor control"],
  ["Prototype evidence", "Service storyboard and touchpoints", "XR canvas and concept sketches", "Physical prototype and desktop walkthrough"]
], Ne = [
  ["Personalisation", "Context-aware recommendations"],
  ["Accessibility", "Language, comfort and access support"],
  ["Real-time adjustment", "Editable visit state"],
  ["Visitor control", "Confirm / change / reject / cancel"],
  ["System awareness", "Data, variables and routing"],
  ["Ethical limits", "Boundaries and human fallback"]
], P = [
  { stage: "Discover", rows: ["Express an open-ended visit need.", "Ask one useful clarification.", "Core agent routes to Recommend Exhibitions.", "Catalogue plus language and access metadata.", "Curator-reviewed sources would anchor explanation."], why: "Clarify intent without making the visitor complete a long form." },
  { stage: "Decide", rows: ["Compare the primary option and an alternative.", "Explain the fit; expose compare, change and reject.", "Match interests, language and visit-specific comfort.", "Prototype exhibition attributes.", "Keep interpretation grounded and the decision reversible."], why: "The first recommendation must not become the only visible choice." },
  { stage: "Prepare", rows: ["Select an exhibition and provide visit details.", "Show a summary before confirmation.", "Enter the Workflow only when selected_exhibition is set.", "Simulated timeslots, capacity and structured ticket variables.", "Visitor confirms; no real ticket or payment is issued."], why: "Open-ended recommendation stays flexible; reservation becomes structured." },
  { stage: "Arrive", rows: ["Review arrival and travel guidance.", "Present a prototype visit-day plan.", "Combine the confirmed slot with arrival and support rules.", "Simulated weather, transport and support points.", "Official channels remain necessary for live travel and access information."], why: "A plan can reduce preparation effort without claiming live certainty." },
  { stage: "Experience", rows: ["Ask about an exhibition or request another language.", "Offer text-based exhibition guidance.", "Route to Exhibition Guide and Visit Support.", "Explanation summaries and supported languages.", "Official labels, curators and source communities retain authority."], why: "Interpretation support should make cultural sources easier to understand." },
  { stage: "Adjust", rows: ["Change comfort needs, pause or request help.", "Offer practical alternatives and staff support.", "Update temporary state; check capability boundaries.", "Visit preferences and prototype support-point data.", "Information Desk for live needs; a human can override the plan."], why: "Comfort is visit state, not identity." }
], M = [
  { prompt: "I want something quiet this Saturday.", route: "Recommend Exhibitions", kind: "Playbook 01", data: "Catalogue + comfort metadata", state: "visit_date, crowd_preference, sensory_preference", action: "Offer one primary exhibition and one alternative." },
  { prompt: "I want Chinese explanation.", route: "Exhibition Guide and Visit Support", kind: "Playbook 02", data: "Explanation summaries + language support", state: "language_preference, selected_exhibition", action: "Ground the explanation in reviewed content; refer to official labels." },
  { prompt: "I want to book a ticket.", route: "User-confirmed Dynamic Visit Plan", kind: "Workflow 01", data: "Simulated tickets + timeslots", state: "selected_exhibition → date → tickets → confirmation", action: "Check exhibition selection first. Prepare, summarise, then ask for confirmation." },
  { prompt: "I need a less crowded route.", route: "Exhibition Guide and Visit Support", kind: "Playbook 02", data: "Prototype crowd + support-point data", state: "crowd_preference, comfort_needs, visit_plan", action: "Suggest an adjustable alternative. Staff provide live information." }
], J = [
  { title: "A message looked like a link.", break: "Reservation copy appeared as hyperlink-style text, blurring the difference between a message and an action.", diagnose: "Formatting carried the wrong interaction cue.", refine: "Use a normal message with separate “Yes, continue”, “Choose another exhibition” and “Compare first” buttons.", consequence: "Visitors can distinguish explanation from action.", before: "Would you like to prepare a reservation?", after: "Review the exhibition before continuing.", source: "A2.G3 · p. 25" },
  { title: "The agent reached the wrong Playbook.", break: "Inconsistent Playbook names led to incorrect or invalid routing.", diagnose: "Names did not express one stable intent per route.", refine: "Standardise intent-specific Playbook labels and update the routing instructions together.", consequence: "A request reaches a predictable service module.", before: "Book visit → unknown_playbook", after: "Recommendation → Recommend Exhibitions", source: "A2.G3 · p. 25" },
  { title: "The chosen exhibition disappeared.", break: "The reservation prompt showed an empty or invalid exhibition value, including “0”.", diagnose: "The selection was not reliably stored and mapped across the transition.", refine: "Save selected_exhibition before entering the Workflow. Use the same variable in Playbook, buttons and summary.", consequence: "Context survives the move from conversation to structured action.", before: "Prepare a visit plan for 0?", after: "selected_exhibition: Everyday Objects, Shared Cultures", source: "A2.G3 · p. 26" },
  { title: "A sentence was not reservation state.", break: "“2 adults + 1 under 5” was stored as one text value.", diagnose: "The Workflow needed separate counts, including free-entry children in the visitor total.", refine: "Introduce a Code Step to extract adult_count, child_count, free_child_count and visitor_count.", consequence: "Natural language becomes reviewable, workflow-ready state.", before: "ticket_input: “2 adults + 1 under 5”", after: "adult_count: 2 · free_child_count: 1 · visitor_count: 3", source: "A2.G3 · p. 26" }
], Ce = [
  { title: "Guidance can narrow cultural choice.", risk: "Visitors may follow the first recommendation as a default.", intervention: "Always expose an alternative, comparison, change, rejection and confirmation.", test: "Observe whether visitors notice the controls and still feel they are choosing.", lens: "Agency · act with confirmation" },
  { title: "“Easy” is not an access requirement.", risk: "Comfort language may mean sound, crowd, walking, explanation or seating.", intervention: "Ask a practical clarification and keep needs temporary, adjustable and specific to this visit.", test: "Use ambiguous prompts and check whether visitors can correct the interpretation.", lens: "Accessibility · conversation breakdown analysis" },
  { title: "AI can sound like cultural authority.", risk: "A confident explanation can flatten contested histories or appear to be official knowledge.", intervention: "Use curator-reviewed sources, visible attribution, official-label references and staff fallback.", test: "Ask for hidden meanings or a dramatic story contradicting a label. Check grounding and redirection.", lens: "Ethics · proposed misbehaviour testing" }
], Z = [
  { id: "E01", name: "Everyday Objects, Shared Cultures", duration: "45 min", theme: "Daily life, migration and family memory", language: "English · Simple English · Chinese", sensory: "Low", crowd: "Low to medium", access: "Quiet gallery · seating available", slots: [{ time: "10:00 AM", arrival: "9:30 AM", capacity: "Available", crowd: "Low" }, { time: "12:30 PM", arrival: "12:00 PM", capacity: "Available", crowd: "Medium" }, { time: "2:00 PM", arrival: "1:30 PM", capacity: "Limited", crowd: "Medium" }] },
  { id: "E02", name: "Living Cities: Stories Across Borders", duration: "50 min", theme: "Migration, identity, belonging and city life", language: "English · Simple English · Chinese · Spanish · French", sensory: "Medium", crowd: "Medium", access: "Captions available · story-based", slots: [{ time: "11:00 AM", arrival: "10:30 AM", capacity: "Limited", crowd: "Medium" }, { time: "1:30 PM", arrival: "1:00 PM", capacity: "Limited", crowd: "High" }, { time: "3:30 PM", arrival: "3:00 PM", capacity: "Available", crowd: "Medium" }] }
], V = { phase: "idle", needs: [], language: "English", selected: null, slot: 0, ticketInput: "2 adults and 1 child under 5", adultCount: 0, childCount: 0, freeChildCount: 0, visitorCount: 0, error: "", confirmed: !1, intent: "Awaiting request" };
function ke(t) {
  let r = t.toLowerCase().trim();
  const a = (c) => {
    let o = 0;
    return r = r.replace(c, (u, v) => (o += Number(v), " ")), o;
  }, l = a(/\b(\d+)\s*(?:(?:children|child|kids?)\s*)?under\s*5\b/g), i = a(/\b(\d+)\s*adults?\b/g), s = a(/\b(\d+)\s*(?:children|child|kids?)\b/g), d = i + s + l;
  return r = r.replace(/\band\b|[+,.;]/g, "").trim(), r || d < 1 || d > 20 || i < 1 ? null : { adultCount: i, childCount: s, freeChildCount: l, visitorCount: d };
}
function Ae(t, r) {
  switch (r.type) {
    case "RESET":
      return { ...V };
    case "SCENARIO":
      return { ...V, phase: r.value === "quiet" ? "recommended" : r.value === "camera" ? "boundary" : r.value === "booking" ? "repair" : "clarifying", needs: r.value === "quiet" ? ["Quieter gallery", "Fewer people", "Lower sensory intensity", "Seating"] : [], language: r.value === "quiet" ? "Chinese" : "English", intent: { quiet: "Discover a quiet exhibition", booking: "Reserve visit", easy: "Clarify comfort", camera: "Scan artwork" }[r.value] };
    case "TOGGLE_NEED":
      return { ...t, needs: t.needs.includes(r.value) ? t.needs.filter((a) => a !== r.value) : [...t.needs, r.value], confirmed: !1 };
    case "LANGUAGE":
      return { ...t, language: r.value, confirmed: !1 };
    case "NEEDS":
      return { ...t, phase: "clarifying", selected: null, confirmed: !1 };
    case "RECOMMEND":
      return { ...t, phase: "recommended", selected: null, confirmed: !1, intent: "Recommend exhibitions" };
    case "COMPARE":
      return { ...t, phase: t.phase === "comparing" ? "recommended" : "comparing" };
    case "SELECT":
      return { ...t, selected: r.value, slot: 0, phase: "selected", confirmed: !1 };
    case "RESERVE":
      return { ...t, phase: t.selected === null ? "repair" : "collectingReservation", intent: "Reserve visit" };
    case "SLOT":
      return { ...t, slot: r.value, confirmed: !1 };
    case "TICKETS":
      return { ...t, ticketInput: r.value, error: "", confirmed: !1 };
    case "REVIEW": {
      if (t.selected === null) return { ...t, phase: "repair" };
      const a = ke(t.ticketInput);
      return a ? { ...t, ...a, phase: "review", error: "" } : { ...t, error: "Use a supported format such as “2 adults and 1 child under 5”. Include an accompanying adult; this demo supports up to 20 visitors." };
    }
    case "CONFIRM":
      return t.phase === "review" && t.selected !== null && t.visitorCount > 0 ? { ...t, phase: "visitPlan", confirmed: !0 } : t;
    case "EDIT":
      return { ...t, phase: t.selected === null ? "repair" : "collectingReservation", confirmed: !1 };
    case "CANCEL":
      return { ...V, intent: "Cancelled · nothing reserved" };
    case "SUPPORT":
      return { ...t, phase: "support", intent: "Human / official support", confirmed: !1 };
  }
}
function Te() {
  const [t, r] = de(Ae, V), [a, l] = m(!1), i = t.selected === null ? null : Z[t.selected], s = i == null ? void 0 : i.slots[t.slot], c = ["collectingReservation", "review", "visitPlan"].includes(t.phase) ? "User-confirmed Dynamic Visit Plan" : ["boundary", "support"].includes(t.phase) ? "Exhibition Guide and Visit Support" : "Recommend Exhibitions";
  return /* @__PURE__ */ n("div", { className: "culturelens-simulation", id: "culturelens-simulation", children: [
    /* @__PURE__ */ n("header", { className: "culturelens-sim-header", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("span", { className: "culturelens-label", children: "INTERACTIVE PROTOTYPE SIMULATION" }),
        /* @__PURE__ */ e("h3", { children: "Make the next move." }),
        /* @__PURE__ */ e("p", { children: "Deterministic demo · Prototype data only · No live AI or booking" })
      ] }),
      /* @__PURE__ */ n("button", { onClick: () => r({ type: "RESET" }), children: [
        /* @__PURE__ */ e(fe, { size: 16 }),
        " Reset demo"
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "culturelens-scenario-rail", "aria-label": "Choose a demonstration scenario", children: [["quiet", "01 · Find a quiet exhibition"], ["booking", "02 · Prepare a reservation"], ["easy", "03 · “Something easy”"], ["camera", "04 · Camera boundary"]].map(([o, u]) => /* @__PURE__ */ e("button", { onClick: () => r({ type: "SCENARIO", value: o }), children: u }, o)) }),
    /* @__PURE__ */ n("div", { className: "culturelens-sim-body", children: [
      /* @__PURE__ */ n("div", { className: "culturelens-conversation", children: [
        /* @__PURE__ */ n("div", { className: "culturelens-chat-heading", children: [
          /* @__PURE__ */ e("span", { className: "culturelens-status-dot" }),
          " CultureLens Concierge ",
          /* @__PURE__ */ e("small", { children: "DEMO" })
        ] }),
        /* @__PURE__ */ e("div", { className: "culturelens-live-status", role: "status", "aria-live": "polite", children: t.phase === "idle" ? t.intent : `${t.intent} · ${t.phase === "visitPlan" ? "Prototype plan confirmed" : t.phase}` }),
        t.phase === "idle" && /* @__PURE__ */ n("div", { className: "culturelens-chat-intro", children: [
          /* @__PURE__ */ e("h4", { children: "A museum visit begins with a question." }),
          /* @__PURE__ */ e("p", { children: "Try a quiet Saturday visit, a reservation, an ambiguous preference or a request beyond the prototype’s capabilities." }),
          /* @__PURE__ */ n("button", { className: "culturelens-primary", onClick: () => r({ type: "SCENARIO", value: "quiet" }), children: [
            "Try the quiet-visit scenario ",
            /* @__PURE__ */ e(L, { size: 16 })
          ] })
        ] }),
        t.phase === "repair" && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("p", { className: "culturelens-user-message", children: "I want to book a ticket." }),
          /* @__PURE__ */ e("h4", { children: "Which exhibition would you like to visit?" }),
          /* @__PURE__ */ e("p", { children: "We need an exhibition before preparing a prototype reservation." }),
          /* @__PURE__ */ n("div", { className: "culturelens-actions", children: [
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "RECOMMEND" }), children: "I know which exhibition" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "SCENARIO", value: "quiet" }), children: "Recommend one for me" })
          ] }),
          /* @__PURE__ */ e("small", { children: "AVOID · selected_exhibition must be set before the Workflow starts." })
        ] }),
        t.phase === "clarifying" && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("p", { className: "culturelens-user-message", children: "I want something easy." }),
          /* @__PURE__ */ e("h4", { children: "What would help most on this visit?" }),
          /* @__PURE__ */ e("p", { children: "Choose any that apply. These preferences stay in this demo and can be changed." }),
          /* @__PURE__ */ e("div", { className: "culturelens-choice-grid", children: ["Less walking", "Quieter gallery", "Fewer people", "Lower sensory intensity", "Simpler explanation", "Seating"].map((o) => /* @__PURE__ */ n("button", { "aria-pressed": t.needs.includes(o), onClick: () => r({ type: "TOGGLE_NEED", value: o }), children: [
            t.needs.includes(o) && /* @__PURE__ */ e(z, { size: 14 }),
            o
          ] }, o)) }),
          /* @__PURE__ */ n("label", { children: [
            "Explanation language",
            /* @__PURE__ */ n("select", { value: t.language, onChange: (o) => r({ type: "LANGUAGE", value: o.target.value }), children: [
              /* @__PURE__ */ e("option", { children: "English" }),
              /* @__PURE__ */ e("option", { children: "Simple English" }),
              /* @__PURE__ */ e("option", { children: "Chinese" })
            ] })
          ] }),
          /* @__PURE__ */ n("button", { className: "culturelens-primary", onClick: () => r({ type: "RECOMMEND" }), children: [
            "Update recommendations ",
            /* @__PURE__ */ e(L, { size: 16 })
          ] })
        ] }),
        ["recommended", "comparing"].includes(t.phase) && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("h4", { children: t.phase === "comparing" ? "Two ways into cultural stories." : "A calmer place to begin." }),
          /* @__PURE__ */ n("p", { children: [
            "For Saturday, with ",
            t.language,
            " explanation",
            t.needs.length ? ` and ${t.needs.join(", ").toLowerCase()}` : "",
            "."
          ] }),
          /* @__PURE__ */ e("div", { className: "culturelens-recommendations", children: Z.map((o, u) => /* @__PURE__ */ n("article", { children: [
            /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
              u === 0 ? "PRIMARY RECOMMENDATION" : "ALTERNATIVE",
              " · ",
              o.id
            ] }),
            /* @__PURE__ */ e("h5", { children: o.name }),
            /* @__PURE__ */ e("p", { children: o.theme }),
            /* @__PURE__ */ n("div", { className: "culturelens-pills", children: [
              /* @__PURE__ */ e("span", { children: o.duration }),
              /* @__PURE__ */ n("span", { children: [
                o.sensory,
                " sensory"
              ] }),
              /* @__PURE__ */ e("span", { children: "Chinese supported" })
            ] }),
            /* @__PURE__ */ e("p", { className: "culturelens-reason", children: u === 0 ? "Why this fits: calm, beginner-friendly stories, seating and a low-sensory gallery in the prototype catalogue." : "Why compare: a reflective, story-based route into migration and belonging, with more sensory activity." }),
            t.phase === "comparing" && /* @__PURE__ */ n("dl", { children: [
              /* @__PURE__ */ e("dt", { children: "Crowd" }),
              /* @__PURE__ */ e("dd", { children: o.crowd }),
              /* @__PURE__ */ e("dt", { children: "Access" }),
              /* @__PURE__ */ e("dd", { children: o.access }),
              /* @__PURE__ */ e("dt", { children: "Languages" }),
              /* @__PURE__ */ e("dd", { children: o.language })
            ] }),
            /* @__PURE__ */ n("button", { onClick: () => r({ type: "SELECT", value: u }), children: [
              "Select ",
              o.id,
              " ",
              /* @__PURE__ */ e(L, { size: 15 })
            ] })
          ] }, o.id)) }),
          t.needs.includes("Less walking") && /* @__PURE__ */ e("p", { className: "culturelens-notice", children: "Walking distances are not supplied in this dataset. Seating is available for E01; ask staff to confirm a shorter route." }),
          /* @__PURE__ */ n("div", { className: "culturelens-actions", children: [
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "COMPARE" }), children: t.phase === "comparing" ? "Close comparison" : "Compare exhibitions" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "NEEDS" }), children: "Change needs" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "CANCEL" }), children: "Reject suggestions" })
          ] })
        ] }),
        t.phase === "selected" && i && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: "SELECTION SAVED" }),
          /* @__PURE__ */ e("h4", { children: i.name }),
          /* @__PURE__ */ e("p", { children: "The exhibition is now stored before the Workflow begins. Would you like to prepare a prototype reservation?" }),
          /* @__PURE__ */ n("div", { className: "culturelens-actions", children: [
            /* @__PURE__ */ e("button", { className: "culturelens-primary", onClick: () => r({ type: "RESERVE" }), children: "Yes, continue" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "RECOMMEND" }), children: "Choose another exhibition" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "COMPARE" }), children: "Compare first" })
          ] })
        ] }),
        t.phase === "collectingReservation" && i && /* @__PURE__ */ n("form", { className: "culturelens-response", onSubmit: (o) => {
          o.preventDefault(), r({ type: "REVIEW" });
        }, children: [
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: "STRUCTURED WORKFLOW · SATURDAY" }),
          /* @__PURE__ */ e("h4", { children: "Prepare your visit details." }),
          /* @__PURE__ */ e("p", { children: i.name }),
          /* @__PURE__ */ n("label", { children: [
            "Visit date",
            /* @__PURE__ */ e("select", { "aria-label": "Visit date", children: /* @__PURE__ */ e("option", { children: "Saturday · prototype day" }) })
          ] }),
          /* @__PURE__ */ n("label", { children: [
            "Timeslot",
            /* @__PURE__ */ e("select", { value: t.slot, onChange: (o) => r({ type: "SLOT", value: Number(o.target.value) }), children: i.slots.map((o, u) => /* @__PURE__ */ n("option", { value: u, children: [
              o.time,
              " · ",
              o.capacity,
              " · ",
              o.crowd,
              " crowd"
            ] }, o.time)) })
          ] }),
          /* @__PURE__ */ n("label", { children: [
            "Who is visiting?",
            /* @__PURE__ */ e("input", { value: t.ticketInput, onChange: (o) => r({ type: "TICKETS", value: o.target.value }), "aria-describedby": "culturelens-ticket-help" })
          ] }),
          /* @__PURE__ */ e("small", { id: "culturelens-ticket-help", children: "Example: 2 adults and 1 child under 5. Under-5s are included in the total visitor count." }),
          /* @__PURE__ */ n("label", { children: [
            "Language",
            /* @__PURE__ */ n("select", { value: t.language, onChange: (o) => r({ type: "LANGUAGE", value: o.target.value }), children: [
              /* @__PURE__ */ e("option", { children: "English" }),
              /* @__PURE__ */ e("option", { children: "Simple English" }),
              /* @__PURE__ */ e("option", { children: "Chinese" })
            ] })
          ] }),
          /* @__PURE__ */ n("p", { children: [
            "Comfort: ",
            t.needs.join(", ") || "No preference captured",
            "."
          ] }),
          t.error && /* @__PURE__ */ e("p", { role: "alert", className: "culturelens-notice", children: t.error }),
          /* @__PURE__ */ n("div", { className: "culturelens-actions", children: [
            /* @__PURE__ */ e("button", { className: "culturelens-primary", type: "submit", children: "Parse & review details" }),
            /* @__PURE__ */ e("button", { type: "button", onClick: () => r({ type: "NEEDS" }), children: "Change comfort needs" }),
            /* @__PURE__ */ e("button", { type: "button", onClick: () => r({ type: "CANCEL" }), children: "Cancel" })
          ] })
        ] }),
        ["review", "visitPlan"].includes(t.phase) && i && s && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: t.confirmed ? "PROTOTYPE PLAN · CL-2048" : "REVIEW BEFORE CONFIRMATION" }),
          /* @__PURE__ */ e("h4", { children: t.confirmed ? "Your visit, ready to review." : "You decide whether this proceeds." }),
          /* @__PURE__ */ n("dl", { className: "culturelens-summary", children: [
            /* @__PURE__ */ e("dt", { children: "Exhibition" }),
            /* @__PURE__ */ e("dd", { children: i.name }),
            /* @__PURE__ */ e("dt", { children: "Date / time" }),
            /* @__PURE__ */ n("dd", { children: [
              "Saturday · ",
              s.time
            ] }),
            /* @__PURE__ */ e("dt", { children: "Visitors" }),
            /* @__PURE__ */ n("dd", { children: [
              t.adultCount,
              " adults · ",
              t.childCount,
              " children · ",
              t.freeChildCount,
              " under 5 · ",
              t.visitorCount,
              " total"
            ] }),
            /* @__PURE__ */ e("dt", { children: "Language" }),
            /* @__PURE__ */ e("dd", { children: t.language }),
            /* @__PURE__ */ e("dt", { children: "Comfort" }),
            /* @__PURE__ */ e("dd", { children: t.needs.join(", ") || "No preference captured" }),
            /* @__PURE__ */ e("dt", { children: "Prototype capacity" }),
            /* @__PURE__ */ n("dd", { children: [
              s.capacity,
              " · ",
              s.crowd,
              " crowd"
            ] }),
            t.confirmed && /* @__PURE__ */ n(N, { children: [
              /* @__PURE__ */ e("dt", { children: "Suggested arrival" }),
              /* @__PURE__ */ e("dd", { children: s.arrival }),
              /* @__PURE__ */ e("dt", { children: "Weather" }),
              /* @__PURE__ */ e("dd", { children: "Cloudy, 18°C" }),
              /* @__PURE__ */ e("dt", { children: "Transport" }),
              /* @__PURE__ */ e("dd", { children: "Tram from City Centre · around 25 minutes" }),
              /* @__PURE__ */ e("dt", { children: "Support" }),
              /* @__PURE__ */ e("dd", { children: t.selected === 0 ? "Cultural History Gallery Seating" : "Information Desk for live assistance" }),
              /* @__PURE__ */ e("dt", { children: "Optional next stop" }),
              /* @__PURE__ */ e("dd", { children: t.selected === 0 ? "Food, Ritual and Community" : "Everyday Objects, Shared Cultures" })
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "culturelens-notice", children: "Simulated prototype data. No payment, real ticket, live crowd or transport information." }),
          /* @__PURE__ */ n("div", { className: "culturelens-actions", children: [
            !t.confirmed && /* @__PURE__ */ n("button", { className: "culturelens-primary", onClick: () => r({ type: "CONFIRM" }), children: [
              "Confirm prototype plan ",
              /* @__PURE__ */ e(z, { size: 16 })
            ] }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "EDIT" }), children: "Change details" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "CANCEL" }), children: "Cancel" })
          ] })
        ] }),
        t.phase === "boundary" && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("p", { className: "culturelens-user-message", children: "Can you scan this artwork with my camera?" }),
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: "CAPABILITY BOUNDARY" }),
          /* @__PURE__ */ e("h4", { children: "This prototype cannot access the camera or scan artworks." }),
          /* @__PURE__ */ e("p", { children: "You can explore exhibition themes through text or ask museum staff for live artwork support." }),
          /* @__PURE__ */ n("div", { className: "culturelens-actions", children: [
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "SUPPORT" }), children: "Text explanation / staff options" }),
            /* @__PURE__ */ e("button", { onClick: () => r({ type: "RECOMMEND" }), children: "Browse exhibitions" })
          ] }),
          /* @__PURE__ */ e("small", { children: "BOUNDARY CHECK → HONEST LIMIT → ALTERNATIVE → HUMAN FALLBACK" })
        ] }),
        t.phase === "support" && /* @__PURE__ */ n("div", { className: "culturelens-response", children: [
          /* @__PURE__ */ e("h4", { children: "Keep cultural interpretation grounded." }),
          /* @__PURE__ */ e("p", { children: "The prototype catalogue describes Everyday Objects as an exhibition about daily life, migration and family memory. It does not identify individual artworks." }),
          /* @__PURE__ */ e("p", { children: "For an object’s official interpretation or live access support, consult the exhibition label or ask the Information Desk. This demo does not contact staff." }),
          /* @__PURE__ */ e("button", { onClick: () => r({ type: "RECOMMEND" }), children: "Return to exhibition information" })
        ] })
      ] }),
      /* @__PURE__ */ n("aside", { className: "culturelens-state", children: [
        /* @__PURE__ */ n("button", { "aria-expanded": a, "aria-controls": "culturelens-state-panel", onClick: () => l(!a), children: [
          /* @__PURE__ */ e(be, { size: 16 }),
          " System state ",
          a ? "−" : "+"
        ] }),
        /* @__PURE__ */ e("p", { children: "Product-visible variables and routing. No hidden reasoning." }),
        a && /* @__PURE__ */ n("dl", { id: "culturelens-state-panel", children: [
          /* @__PURE__ */ e("dt", { children: "Intent" }),
          /* @__PURE__ */ e("dd", { children: t.intent }),
          /* @__PURE__ */ e("dt", { children: "Route" }),
          /* @__PURE__ */ e("dd", { children: c }),
          /* @__PURE__ */ e("dt", { children: "selected_exhibition" }),
          /* @__PURE__ */ e("dd", { children: (i == null ? void 0 : i.name) || "Not set" }),
          /* @__PURE__ */ e("dt", { children: "visit_date" }),
          /* @__PURE__ */ e("dd", { children: t.phase === "idle" ? "Not set" : "Saturday · simulated" }),
          /* @__PURE__ */ e("dt", { children: "language_preference" }),
          /* @__PURE__ */ e("dd", { children: t.language }),
          /* @__PURE__ */ e("dt", { children: "comfort_needs" }),
          /* @__PURE__ */ e("dd", { children: t.needs.join(", ") || "Not set" }),
          /* @__PURE__ */ e("dt", { children: "adult_count / child_count / free_child_count" }),
          /* @__PURE__ */ n("dd", { children: [
            t.adultCount,
            " / ",
            t.childCount,
            " / ",
            t.freeChildCount
          ] }),
          /* @__PURE__ */ e("dt", { children: "visitor_count" }),
          /* @__PURE__ */ e("dd", { children: t.visitorCount }),
          /* @__PURE__ */ e("dt", { children: "Data source" }),
          /* @__PURE__ */ e("dd", { children: "A2.G3 prototype catalogue and dummy data" }),
          /* @__PURE__ */ e("dt", { children: "Allowed action" }),
          /* @__PURE__ */ e("dd", { children: t.confirmed ? "Display simulated plan" : "Prepare only" }),
          /* @__PURE__ */ e("dt", { children: "Confirmation required" }),
          /* @__PURE__ */ e("dd", { children: t.confirmed ? "Received for this prototype plan" : "Yes" }),
          /* @__PURE__ */ e("dt", { children: "Boundary status" }),
          /* @__PURE__ */ e("dd", { children: t.phase === "boundary" ? "Camera unsupported" : "No live services connected" })
        ] })
      ] })
    ] })
  ] });
}
const xe = {
  "idea-portfolio": [1600, 1221],
  "draft-storyboard": [1600, 842],
  "service-storyboard": [1600, 755],
  "service-panel-01": [409, 382],
  "service-panel-02": [411, 382],
  "service-panel-03": [407, 382],
  "service-panel-04": [409, 382],
  "service-panel-05": [409, 382],
  "service-panel-06": [411, 382],
  "service-panel-07": [407, 382],
  "service-panel-08": [409, 382],
  "xr-original-sketch": [840, 595],
  "museband-physical-prototype": [512, 683],
  "museband-walkthrough-01": [605, 807],
  "museband-walkthrough-02": [605, 807],
  "museband-walkthrough-03": [605, 807],
  "museband-walkthrough-04": [807, 605],
  "museband-walkthrough-05": [605, 807],
  "museband-walkthrough-06": [605, 807],
  "museband-walkthrough-07": [605, 807],
  "voiceflow-formatting": [529, 640],
  "voiceflow-routing": [755, 406],
  "voiceflow-state": [387, 398],
  "voiceflow-ticket-input": [428, 716],
  "voiceflow-state-canvas": [800, 303],
  "voiceflow-request": [480, 374],
  "voiceflow-recommendation": [560, 387],
  "voiceflow-confirmation": [560, 526],
  "conversation-sketch": [800, 587]
}, ee = "/media/culturelens/process/culturelens-";
function b({ file: t, alt: r, source: a, className: l = "" }) {
  const i = S(null), [s, d] = xe[t];
  return /* @__PURE__ */ n("figure", { className: `culturelens-process-image ${l}`, children: [
    /* @__PURE__ */ n("button", { type: "button", className: "culturelens-image-open", onClick: () => {
      var c;
      return (c = i.current) == null ? void 0 : c.showModal();
    }, "aria-label": `Enlarge: ${r}`, children: [
      /* @__PURE__ */ e("img", { src: `${ee}${t}.webp`, alt: r, width: s, height: d, loading: "lazy", decoding: "async" }),
      /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "View detail ↗" })
    ] }),
    /* @__PURE__ */ n("figcaption", { children: [
      a,
      " · Authentic process evidence"
    ] }),
    /* @__PURE__ */ n("dialog", { ref: i, className: "culturelens-image-dialog", "aria-label": `Enlarged image: ${r}`, onKeyDown: (c) => {
      var o;
      c.key === "Tab" && (c.preventDefault(), (o = c.currentTarget.querySelector("button")) == null || o.focus());
    }, onClick: (c) => {
      var o;
      c.target === c.currentTarget && ((o = i.current) == null || o.close());
    }, children: [
      /* @__PURE__ */ e("button", { type: "button", autoFocus: !0, onClick: () => {
        var c;
        return (c = i.current) == null ? void 0 : c.close();
      }, "aria-label": "Close enlarged image", children: "Close ×" }),
      /* @__PURE__ */ e("img", { src: `${ee}${t}.webp`, alt: r, loading: "lazy" }),
      /* @__PURE__ */ n("p", { children: [
        r,
        " · ",
        a
      ] })
    ] })
  ] });
}
const F = [
  { label: "Service", x: 61, y: 33, text: "Personalised Immersive Exhibition Journey — prepare, preview and tune the visit." },
  { label: "XR", x: 74, y: 44, text: "Living Context Gallery — reconnect the object with its cultural context." },
  { label: "Smart device", x: 73, y: 20, text: "Immersion Halo — developed into the head-worn MuseBand proposal." }
];
function Se() {
  const [t, r] = m(0);
  return /* @__PURE__ */ n("section", { className: "culturelens-idea-evidence", "aria-label": "Idea portfolio process evidence", children: [
    /* @__PURE__ */ n("div", { children: [
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "PROCESS EVIDENCE · IDEA PORTFOLIO" }),
      /* @__PURE__ */ n("h3", { children: [
        "Before a medium,",
        /* @__PURE__ */ e("br", {}),
        "a field of possibilities."
      ] }),
      /* @__PURE__ */ e("p", { children: "We mapped early concepts by visitor value and innovation before developing three directions in greater depth." }),
      /* @__PURE__ */ e("div", { className: "culturelens-process-selectors", "aria-label": "Highlight an idea direction", children: F.map((a, l) => /* @__PURE__ */ e("button", { "aria-pressed": t === l, onClick: () => r(l), onFocus: () => r(l), onPointerEnter: (i) => {
        i.pointerType === "mouse" && r(l);
      }, children: a.label }, a.label)) }),
      /* @__PURE__ */ e("p", { "aria-live": "polite", children: F[t].text }),
      /* @__PURE__ */ e("small", { children: "Workshop judgement, not quantitative validation. The original axes, notes and marker circles are preserved." })
    ] }),
    /* @__PURE__ */ n("div", { className: "culturelens-idea-photo", children: [
      /* @__PURE__ */ e(b, { file: "idea-portfolio", alt: "Original whiteboard of ideas mapped on Value and Innovation axes", source: "A2.G2 p. 30" }),
      /* @__PURE__ */ e("span", { className: "culturelens-idea-highlight", "aria-hidden": "true", style: { left: `${F[t].x}%`, top: `${F[t].y}%` } })
    ] })
  ] });
}
const Ie = ["Arrive", "Preview", "Tune", "Begin", "Explore", "Immerse", "Adjust", "Reflect"];
function Re() {
  return /* @__PURE__ */ n("section", { className: "culturelens-process-block", children: [
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "PROCESS EVIDENCE · EARLY EXPERIENCE FLOW" }),
    /* @__PURE__ */ e("h4", { children: "Make room for choice before immersion." }),
    /* @__PURE__ */ e("p", { children: "We first tested the journey as a rough sequence of decisions and adjustment moments." }),
    /* @__PURE__ */ e(b, { file: "draft-storyboard", alt: "Eight original sticky-note sketches from arrival and sensory preview through pause and reflection", source: "A2.G2 p. 26" }),
    /* @__PURE__ */ n("div", { className: "culturelens-process-decision", children: [
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "WHAT WE WERE TESTING" }),
      /* @__PURE__ */ e("p", { children: "Can visitors preview and adjust the experience before entering?" }),
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "DESIGN CONSEQUENCE" }),
      /* @__PURE__ */ e("p", { children: "Preparation should be staged and optional: extra control must not become extra decision fatigue." })
    ] }),
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "REFINEMENT · EIGHT-PANEL SERVICE JOURNEY" }),
    /* @__PURE__ */ e("p", { children: "The rough journey was refined into a clearer service sequence spanning preparation, immersion, adjustment and reflection." }),
    /* @__PURE__ */ e("div", { className: "culturelens-storyboard-rail", tabIndex: 0, role: "region", "aria-label": "Eight original storyboard panels; scroll horizontally to explore", children: Ie.map((t, r) => /* @__PURE__ */ n("div", { children: [
      /* @__PURE__ */ e(b, { file: `service-panel-${String(r + 1).padStart(2, "0")}`, alt: `Original storyboard panel ${r + 1}: ${t}`, source: "A2.G2 p. 3" }),
      /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
        "0",
        r + 1,
        " / ",
        t.toUpperCase()
      ] })
    ] }, t)) }),
    /* @__PURE__ */ e("small", { children: "Scroll through the original panels · select any panel to enlarge." })
  ] });
}
function Oe() {
  return /* @__PURE__ */ n("section", { className: "culturelens-process-block", children: [
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "ORIGINAL DESIGN SKETCH · LIVING CONTEXT GALLERY" }),
    /* @__PURE__ */ e("h4", { children: "The object is the anchor." }),
    /* @__PURE__ */ e(b, { file: "xr-original-sketch", alt: "Original drawing of a visitor and physical vessel surrounded by a curved projection of cultural context", source: "A2.G2 p. 7", className: "culturelens-sketch-alpha" }),
    /* @__PURE__ */ n("div", { className: "culturelens-process-decision", children: [
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "EVIDENCE → DECISION" }),
      /* @__PURE__ */ e("p", { children: "The sketch centres a tangible artefact inside a reconstructed setting. XR should reveal context around the object, without replacing it." }),
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "SYSTEM CONSEQUENCE" }),
      /* @__PURE__ */ e("p", { children: "Place, people, use, memory, sound and atmosphere become optional interpretive layers." }),
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "RISK → RESPONSE" }),
      /* @__PURE__ */ e("p", { children: "Reconstruction can look more certain than its evidence. Keep sources visible, distinguish interpretation from fact, mark uncertainty and retain a low-sensory alternative." })
    ] }),
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "NEXT ITERATION · REFINED XR COMMUNICATION" }),
    /* @__PURE__ */ e("p", { children: "The original G2 sketch explored room-scale projection. In this later concept iteration, that object-first principle is carried into a private, head-worn near-eye layer. The generated scenes are not evidence that this revised optical system has been built or tested." })
  ] });
}
const H = [
  ["Noise reduction layer", "Reduce crowd noise and exhibition distractions to support focus on the object, story or atmosphere."],
  ["Projection module", "A temporary personal information layer for objects, stories, routes, crowd conditions, waiting times, sensory settings and companion prompts."],
  ["Open-ear audio", "Focused stories and spatial sound while retaining awareness of important environmental sounds, companions and staff."],
  ["Haptic feedback zone", "Gentle vibration for story moments, nearby objects, crowded areas, companion signals or available support."],
  ["Soft LED cue", "Gentle colour signals indicate the current mode or exhibition condition."],
  ["Main control", "A simple primary button gives control without adding unnecessary buttons or cognitive load."],
  ["Touch slider", "Adjust volume, projection detail, noise reduction or sensory intensity."],
  ["Companion link", "Remain lightly connected with friends, family or group members during the visit."]
], C = [
  ["Enter", "Orient at the museum entrance.", "Visitor enters the museum before receiving the device.", "Support starts with orientation, not assumptions.", "2"],
  ["Equip", "Begin the journey with the head-worn device.", "The LEGO visitor puts the MuseBand on.", "Keep the eyes unobstructed and the physical object accessible.", "4"],
  ["Compare", "Consider more than one direction.", "The visitor compares possible exhibition routes.", "Preserve choice before suggesting a path.", "6"],
  ["Route", "Find a route suited to the visitor’s needs.", "The concept combines preferences and live crowd flow to recommend a path.", "Suggest rather than command; the original route remains an option.", "7"],
  ["Immerse", "Focus on an exhibit of personal interest.", "The blue frame represents a more private immersive zone.", "Support attention without replacing the museum object.", "9"],
  ["Adjust", "Pause or lower the intensity.", "The visitor can pause and adjust settings, including volume.", "Make support reversible in the moment.", "10"],
  ["Support", "Accommodate different access needs.", "The walkthrough includes special support modes.", "No single wearable or interaction should become the only way to visit.", "11"]
];
function Pe() {
  const [t, r] = m(0), [a, l] = m(0);
  return /* @__PURE__ */ n("section", { className: "culturelens-process-block", children: [
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "PHYSICAL PROTOTYPE · HEAD-WORN MUSEBAND" }),
    /* @__PURE__ */ e("h4", { children: "A paper prototype, at human scale." }),
    /* @__PURE__ */ e("p", { children: "The original prototype sits around the forehead / upper head. Its slim band leaves the eyes unobstructed. Proposed features below are grounded in the report, not validated engineering specifications." }),
    /* @__PURE__ */ n("div", { className: "culturelens-physical-grid", children: [
      /* @__PURE__ */ e(b, { file: "museband-physical-prototype", alt: "Real participant wearing the original paper MuseBand around the upper forehead, with eyes unobstructed", source: "A2.G2 p. 11" }),
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("div", { className: "culturelens-feature-selectors", "aria-label": "Original MuseBand proposed features", children: H.map(([i], s) => /* @__PURE__ */ n("button", { onPointerEnter: (d) => {
          d.pointerType === "mouse" && r(s);
        }, onFocus: () => r(s), onClick: () => r(s), "aria-pressed": t === s, children: [
          /* @__PURE__ */ n("span", { children: [
            "0",
            s + 1
          ] }),
          i
        ] }, i)) }),
        /* @__PURE__ */ n("p", { className: "culturelens-feature-description", "aria-live": "polite", children: [
          /* @__PURE__ */ e("strong", { children: H[t][0] }),
          H[t][1]
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "DESKTOP WALKTHROUGH · SEVEN DECISION MOMENTS" }),
    /* @__PURE__ */ e("h4", { children: "From wearing a device to navigating a system." }),
    /* @__PURE__ */ e("p", { children: "The tabletop sequence made route, attention, adjustment and access decisions visible before committing to a working device." }),
    /* @__PURE__ */ e("div", { className: "culturelens-walkthrough-nav", "aria-label": "Desktop walkthrough stages", children: C.map(([i], s) => /* @__PURE__ */ n("button", { "aria-pressed": a === s, onPointerEnter: (d) => {
      d.pointerType === "mouse" && l(s);
    }, onFocus: () => l(s), onClick: () => l(s), children: [
      /* @__PURE__ */ n("span", { children: [
        "0",
        s + 1
      ] }),
      i
    ] }, i)) }),
    /* @__PURE__ */ n("div", { className: "culturelens-walkthrough-frame", children: [
      /* @__PURE__ */ e(b, { file: `museband-walkthrough-${String(a + 1).padStart(2, "0")}`, alt: `Original LEGO walkthrough: ${C[a][0]}`, source: `A2.G2 p. 11 · original frame ${C[a][4]}` }, a),
      /* @__PURE__ */ n("div", { "aria-live": "polite", children: [
        /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
          "0",
          a + 1,
          " / ",
          C[a][0].toUpperCase()
        ] }),
        /* @__PURE__ */ e("h4", { children: C[a][1] }),
        /* @__PURE__ */ n("dl", { children: [
          /* @__PURE__ */ e("dt", { children: "System state" }),
          /* @__PURE__ */ e("dd", { children: C[a][2] }),
          /* @__PURE__ */ e("dt", { children: "Design intention" }),
          /* @__PURE__ */ e("dd", { children: C[a][3] })
        ] }),
        /* @__PURE__ */ e("button", { onClick: () => l((a + 1) % C.length), children: "Next stage →" })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "culturelens-process-decision", children: [
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "SYSTEM LEARNING → PROPOSAL DECISION" }),
      /* @__PURE__ */ e("p", { children: "The combined prototype evidence supported MuseBand’s problem, systems and futures fit: connecting focus, routes, sensory comfort, access, objects, crowds, staff and operations in the live visit." }),
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "THE COST OF SMART SUPPORT" }),
      /* @__PURE__ */ e("p", { children: "Cognitive load, wearable exclusion, surveillance, over-personalisation, hygiene and operational burden remain unresolved risks. Explainable, optional and reversible suggestions are a design requirement—not proof these risks are solved." })
    ] }),
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "NEXT ITERATION · HEAD-WORN CONCEPT VISUALISATION" }),
    /* @__PURE__ */ e("p", { children: "The refined images retain the original forehead placement. They communicate a speculative form, not manufactured hardware or additional test evidence." })
  ] });
}
function Me({ active: t }) {
  return t === 0 ? /* @__PURE__ */ e(Re, {}) : t === 1 ? /* @__PURE__ */ e(Oe, {}) : /* @__PURE__ */ e(Pe, {});
}
function Le() {
  return /* @__PURE__ */ e("div", { className: "culturelens-comparison-proof", children: [
    ["service-storyboard", "P1 / Service journey", "Storyboards made preparation, adjustment and reflection visible.", "A2.G2 pp. 3, 26"],
    ["xr-original-sketch", "P2 / Living Context Gallery", "The original spatial sketch anchored interpretation to the object.", "A2.G2 p. 7"],
    ["museband-physical-prototype", "P3 / MuseBand", "A head-worn paper prototype plus a tabletop system walkthrough.", "A2.G2 p. 11"]
  ].map(([t, r, a, l]) => /* @__PURE__ */ n("article", { children: [
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: r }),
    /* @__PURE__ */ e(b, { file: t, alt: a, source: l, className: t.includes("sketch") ? "culturelens-sketch-alpha" : "" }),
    /* @__PURE__ */ e("p", { children: a })
  ] }, t)) });
}
const De = [
  ["voiceflow-formatting", "Actual conversation with exposed link formatting.", "A2.G3 p. 25", "The source fragment records the presentation breakdown. The native before/after view explains the refinement."],
  ["voiceflow-routing", "Voiceflow debug log reporting an invalid Playbook transfer.", "A2.G3 p. 25", "The invalid transfer is visible in the original build log; the routing explanation is a portfolio reconstruction."],
  ["voiceflow-state", "Original reservation handoff showing exhibition 0 instead of the selected exhibition.", "A2.G3 p. 26", "The selected exhibition is lost at the handoff. The refined state flow below makes the variable transfer explicit."],
  ["voiceflow-ticket-input", "Original Voiceflow ticket categories and visitor-count input instructions.", "A2.G3 p. 26", "Source evidence defines ticket categories and input examples. The structured parsing view is a native reconstruction, not a screenshot of implemented parser code."]
];
function je({ active: t }) {
  const [r, a, l, i] = De[t];
  return /* @__PURE__ */ n("div", { className: "culturelens-voiceflow-source", children: [
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "VOICEFLOW BUILD · SOURCE EVIDENCE" }),
    /* @__PURE__ */ e(b, { file: r, alt: a, source: l }, r),
    /* @__PURE__ */ e("p", { children: i })
  ] });
}
function Fe() {
  return /* @__PURE__ */ n("div", { className: "culturelens-conversation-evidence", children: [
    /* @__PURE__ */ e("span", { className: "culturelens-label", children: "ORIGINAL CONVERSATION · INTENT → RECOMMENDATION → CONFIRMATION" }),
    /* @__PURE__ */ e("div", { children: [
      ["voiceflow-request", "A visitor requests a quiet exhibition"],
      ["voiceflow-recommendation", "The prototype presents an exhibition recommendation"],
      ["voiceflow-confirmation", "Review details before confirm, change or cancel"]
    ].map(([t, r]) => /* @__PURE__ */ e(b, { file: t, alt: r, source: "A2.G3 p. 4" }, t)) }),
    /* @__PURE__ */ n("details", { className: "culturelens-evidence", children: [
      /* @__PURE__ */ n("summary", { children: [
        "Earlier sketch and state wiring ",
        /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "+" })
      ] }),
      /* @__PURE__ */ n("div", { className: "culturelens-source-pair", children: [
        /* @__PURE__ */ e(b, { file: "conversation-sketch", alt: "Original hand-drawn conversation screens", source: "A2.G3 p. 14" }),
        /* @__PURE__ */ e(b, { file: "voiceflow-state-canvas", alt: "Original Voiceflow canvas showing selected-exhibition state and response wiring", source: "A2.G3 p. 26" })
      ] })
    ] })
  ] });
}
const W = [
  { label: "Physical object", x: 46, y: 43, text: "The tangible artefact stays central. Digital context never substitutes for the object." },
  { label: "Private context layer", x: 34, y: 37, text: "Later concept iteration: a wearer-only near-eye layer connects the object with place, use and memory. The visible light field is an explanatory overlay, not public projection." },
  { label: "Open-ear audio", x: 28, y: 46, text: "The head-worn concept proposes optional focused audio while retaining environmental awareness; quiet viewing remains available." },
  { label: "Source + uncertainty", x: 14, y: 43, text: "Interpretive content would need attributable sources and curator review. This generated scene is illustrative, not historical evidence." },
  { label: "Low-sensory mode", x: 88, y: 60, text: "An open bypass and seating allow a calmer visit without requiring a device or the near-eye / audio experience." }
], _ = [
  { label: "Haptic module", x: 31, y: 25, text: "Concept: optional, adjustable tactile cues housed in a compact module." },
  { label: "Status light", x: 39.6, y: 21, text: "Concept: a small state indicator, reinforced by tactile and text alternatives." },
  { label: "Near-eye projection", x: 62.2, y: 17.9, text: "Concept: the recessed front projection aperture supplies a private near-eye image for the wearer, shown here as an explanatory light field. Optical performance and safety have not been validated." },
  { label: "Cleanable contact", x: 29, y: 29, text: "Concept: a removable contact liner supports repeated museum loan and cleaning." },
  { label: "Control surface", x: 36.8, y: 21.8, text: "Concept: a round tactile control allows the visitor to pause or adjust support." }
], ne = {
  Focus: { point: 2, text: "A quieter attention state, with environmental awareness retained.", state: "focus" },
  Story: { point: 0, text: "An optional tactile cue introduces object-linked interpretation.", state: "story" },
  Flow: { point: 1, text: "A discreet state signal supports route suggestions, never commands.", state: "flow" },
  Control: { point: 4, text: "Pause or adjust. The visitor retains control over the experience.", state: "control" }
}, R = [
  { label: "Route", x: 58, y: 78, text: "A quieter route is offered. Continuing on the original path remains a valid choice." },
  { label: "Focus", x: 48, y: 35, text: "A private near-eye interpretation layer supports focus. The light field in this image is an explanatory overlay of the wearer’s view, not a publicly visible screen." },
  { label: "Comfort", x: 57, y: 57, text: "Make a calmer path and seating easier to notice; support remains optional." },
  { label: "Control", x: 33, y: 24, text: "A small tactile surface keeps pause and adjustment within reach." }
];
function Ge(t, r) {
  $(() => {
    const a = t.current;
    if (!a || !r) return;
    const l = matchMedia("(prefers-reduced-motion: reduce)");
    let i = !1, s = 0;
    const d = () => {
      s = 0;
      const u = a.getBoundingClientRect(), v = l.matches ? 1 : Math.max(0, Math.min(1, (innerHeight - u.top) / Math.min(u.height + innerHeight * 0.2, innerHeight * 0.85)));
      a.style.setProperty("--cv-progress", String(v)), a.dataset.reveal = v > 0.78 ? "annotations" : v > 0.3 ? "context" : "object";
    }, c = () => {
      i && !s && (s = requestAnimationFrame(d));
    }, o = new IntersectionObserver(([u]) => {
      i = u.isIntersecting, i && c();
    }, { threshold: 0 });
    return o.observe(a), window.addEventListener("scroll", c, { passive: !0 }), window.addEventListener("resize", c), l.addEventListener("change", d), d(), () => {
      o.disconnect(), window.removeEventListener("scroll", c), window.removeEventListener("resize", c), l.removeEventListener("change", d), cancelAnimationFrame(s);
    };
  }, [t, r]);
}
function te({ points: t, active: r, onSelect: a, prefix: l }) {
  const i = t[r];
  return /* @__PURE__ */ n(N, { children: [
    /* @__PURE__ */ n("svg", { className: "culturelens-cv-connectors", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true", children: [
      /* @__PURE__ */ e("circle", { cx: i.x, cy: i.y, r: "7", className: "culturelens-cv-region" }),
      /* @__PURE__ */ e("path", { d: `M${i.x},${i.y} L${i.x},${Math.min(88, i.y + 12)} L${Math.min(92, i.x + 10)},${Math.min(88, i.y + 12)}`, pathLength: "1" }, r)
    ] }),
    /* @__PURE__ */ e("div", { className: "culturelens-cv-hotspots", "aria-label": `${l} image hotspots`, children: t.map((s, d) => /* @__PURE__ */ e("button", { type: "button", style: { left: `${s.x}%`, top: `${s.y}%` }, "aria-label": `${l}: ${s.label}`, "aria-pressed": r === d, onPointerEnter: (c) => {
      c.pointerType === "mouse" && a(d);
    }, onFocus: () => a(d), onClick: () => a(d), children: /* @__PURE__ */ e("span", { children: d + 1 }) }, s.label)) })
  ] });
}
function Ve({ filename: t, index: r, mode: a = "Focus" }) {
  const l = t.includes("-xr-"), i = l && r === 1, s = !l && r === 1, d = !l && r === 0, [c, o] = m(0), [u, v] = m(0), [h, f] = m(!1), [y, E] = m(!1), O = S(null), A = S(null), I = S(0);
  Ge(O, l && r === 0), $(() => () => cancelAnimationFrame(I.current), []);
  const D = ne[a] || ne.Focus, se = h ? c : D.point, w = i ? W[c] : _[se], le = l ? r === 0 ? "Generated concept: visitors observe a physical ceramic vessel with slim forehead bands and an explanatory overlay of their private near-eye context." : "Generated concept: a ceramic artefact anchors a gallery with a head-worn private interpretation layer, an open bypass and quiet seating." : r === 0 ? "Generated concept: a visitor wears a slim forehead MuseBand with a conceptual near-eye light field illustrating a wearer-only interpretation layer beside a physical vessel." : "Generated speculative MuseBand: a continuous grey ring wraps around a head-form above the unobstructed eyes, with a round temple control, separate status light, recessed front projection aperture and a private near-eye overlay.", oe = () => {
    var g, p;
    cancelAnimationFrame(I.current), (g = A.current) == null || g.style.setProperty("--cv-rx", "0deg"), (p = A.current) == null || p.style.setProperty("--cv-ry", "0deg");
  }, K = s ? D.state : d ? R[u].label.toLowerCase() : "xr";
  return /* @__PURE__ */ n("figure", { className: `culturelens-visual-slot culturelens-concept-visual ${r === 1 ? "culturelens-product-slot" : ""}`, "data-visual": t, "data-state": K, children: [
    /* @__PURE__ */ n(
      "div",
      {
        ref: O,
        className: `culturelens-cv-frame ${l && r === 0 ? "culturelens-cv-xr-reveal" : ""} ${s ? "culturelens-cv-product" : ""} ${i ? "culturelens-cv-system" : ""}`,
        "data-reveal": "object",
        onPointerMove: (g) => {
          if (!s || g.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches) return;
          const p = g.currentTarget.getBoundingClientRect(), T = (g.clientX - p.left) / p.width - 0.5, ce = (g.clientY - p.top) / p.height - 0.5;
          cancelAnimationFrame(I.current), I.current = requestAnimationFrame(() => {
            var X, Q;
            (X = A.current) == null || X.style.setProperty("--cv-rx", `${-ce * 5}deg`), (Q = A.current) == null || Q.style.setProperty("--cv-ry", `${T * 5}deg`);
          });
        },
        onPointerLeave: oe,
        children: [
          /* @__PURE__ */ n("div", { ref: A, className: "culturelens-cv-surface", children: [
            /* @__PURE__ */ e("img", { src: `/media/culturelens/${t}`, alt: le, width: 1440, height: r === 0 ? 901 : 1080, loading: "lazy", decoding: "async", onError: () => E(!0) }),
            l && r === 0 && /* @__PURE__ */ n(N, { children: [
              /* @__PURE__ */ e("div", { className: "culturelens-cv-object-veil", "aria-hidden": "true" }),
              /* @__PURE__ */ e("div", { className: "culturelens-cv-projection-sweep", "aria-hidden": "true" }),
              /* @__PURE__ */ n("div", { className: "culturelens-cv-context-points", "aria-hidden": "true", children: [
                /* @__PURE__ */ e("span", { style: { left: "48%", top: "43%" }, children: "Object" }),
                /* @__PURE__ */ e("span", { style: { left: "33%", top: "26%" }, children: "Private context" }),
                /* @__PURE__ */ e("span", { style: { left: "24%", top: "39%" }, children: "Choice" }),
                /* @__PURE__ */ e("span", { style: { left: "64%", top: "68%" }, children: "Physical exhibit" })
              ] })
            ] }),
            i && /* @__PURE__ */ n(N, { children: [
              /* @__PURE__ */ e("div", { className: "culturelens-cv-focus-mask", style: { "--cv-x": `${w.x}%`, "--cv-y": `${w.y}%` }, "aria-hidden": "true" }),
              /* @__PURE__ */ e(te, { points: W, active: c, onSelect: o, prefix: "XR system" })
            ] }),
            d && /* @__PURE__ */ e("div", { className: `culturelens-cv-service-cue culturelens-cv-cue-${K}`, "aria-hidden": "true", style: { left: `${R[u].x}%`, top: `${R[u].y}%` }, children: u === 0 ? "↗" : u === 3 ? "Ⅱ" : /* @__PURE__ */ e("span", {}) }, u),
            s && /* @__PURE__ */ n(N, { children: [
              /* @__PURE__ */ e("div", { className: "culturelens-cv-specular", "aria-hidden": "true" }, a),
              /* @__PURE__ */ e("span", { className: "culturelens-cv-led", "aria-hidden": "true" }, `led-${a}`),
              h ? /* @__PURE__ */ e(te, { points: _, active: c, onSelect: o, prefix: "MuseBand concept feature" }) : /* @__PURE__ */ e("div", { className: "culturelens-cv-mode-point", style: { left: `${w.x}%`, top: `${w.y}%` }, "aria-hidden": "true", children: /* @__PURE__ */ e("span", {}) }, `mode-${a}`)
            ] })
          ] }),
          /* @__PURE__ */ e("span", { className: "culturelens-cv-badge", children: "CONCEPT VISUALISATION" }),
          y && /* @__PURE__ */ e("p", { role: "alert", className: "culturelens-cv-load-error", children: "This concept image could not load. Please refresh to retry." })
        ]
      }
    ),
    l && r === 0 && /* @__PURE__ */ n("div", { className: "culturelens-cv-reveal-key", children: [
      /* @__PURE__ */ e("span", { children: "01 / Object" }),
      /* @__PURE__ */ e("span", { children: "02 / Context" }),
      /* @__PURE__ */ e("span", { children: "03 / Meaning" }),
      /* @__PURE__ */ e("small", { children: "Scroll to reveal · the object stays central" })
    ] }),
    i && /* @__PURE__ */ n("div", { className: "culturelens-cv-controls", children: [
      /* @__PURE__ */ e("div", { className: "culturelens-cv-selector", "aria-label": "XR system layers", children: W.map((g, p) => /* @__PURE__ */ n("button", { type: "button", "aria-pressed": c === p, onPointerEnter: (T) => {
        T.pointerType === "mouse" && o(p);
      }, onClick: () => o(p), onFocus: () => o(p), children: [
        p + 1,
        ". ",
        g.label
      ] }, g.label)) }),
      /* @__PURE__ */ n("p", { className: "culturelens-cv-annotation", "aria-live": "polite", children: [
        /* @__PURE__ */ e("strong", { children: w.label }),
        w.text
      ] })
    ] }),
    d && /* @__PURE__ */ n("div", { className: "culturelens-cv-controls", children: [
      /* @__PURE__ */ e("div", { className: "culturelens-cv-selector", "aria-label": "MuseBand service states", children: R.map((g, p) => /* @__PURE__ */ e("button", { type: "button", "aria-pressed": u === p, onPointerEnter: (T) => {
        T.pointerType === "mouse" && v(p);
      }, onFocus: () => v(p), onClick: () => v(p), children: g.label }, g.label)) }),
      /* @__PURE__ */ n("p", { className: "culturelens-cv-annotation", "aria-live": "polite", children: [
        /* @__PURE__ */ e("strong", { children: R[u].label }),
        R[u].text
      ] })
    ] }),
    s && /* @__PURE__ */ n("div", { className: "culturelens-cv-controls", children: [
      /* @__PURE__ */ n("div", { className: "culturelens-cv-product-heading", children: [
        /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
          a.toUpperCase(),
          " / ",
          w.label.toUpperCase()
        ] }),
        /* @__PURE__ */ e("button", { type: "button", "aria-expanded": h, "aria-controls": "culturelens-product-features", onClick: () => {
          o(D.point), f(!h);
        }, children: h ? "Hide concept features" : "Explore concept features" })
      ] }),
      /* @__PURE__ */ e("p", { className: "culturelens-cv-annotation", "aria-live": "polite", children: h ? /* @__PURE__ */ n(N, { children: [
        /* @__PURE__ */ e("strong", { children: w.label }),
        w.text
      ] }) : D.text }),
      h && /* @__PURE__ */ e("div", { id: "culturelens-product-features", className: "culturelens-cv-selector", "aria-label": "MuseBand proposed components", children: _.map((g, p) => /* @__PURE__ */ n("button", { type: "button", "aria-pressed": c === p, onFocus: () => o(p), onPointerEnter: (T) => {
        T.pointerType === "mouse" && o(p);
      }, onClick: () => o(p), children: [
        p + 1,
        ". ",
        g.label
      ] }, g.label)) }),
      /* @__PURE__ */ e("small", { children: "Conceptual design features, not verified engineering internals. Select a mode below." })
    ] }),
    /* @__PURE__ */ e("figcaption", { children: l ? "AI-generated later iteration · private near-eye interpretation. Original G2 wall-projection sketch is shown separately; this is not a built installation." : "AI-generated head-worn concept · the near-eye overlay illustrates a private wearer view, not a public projection or physical lens. Not manufactured or optically validated hardware." })
  ] });
}
function U({ title: t, children: r }) {
  return /* @__PURE__ */ n("details", { className: "culturelens-evidence", children: [
    /* @__PURE__ */ n("summary", { children: [
      t,
      /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "+" })
    ] }),
    /* @__PURE__ */ e("div", { children: r })
  ] });
}
function qe() {
  const [t, r] = m(0);
  return /* @__PURE__ */ n("div", { className: "culturelens-system-map", children: [
    /* @__PURE__ */ e("div", { className: "culturelens-map-layers", "aria-label": "Museum system layers", children: j.map((a, l) => /* @__PURE__ */ n("button", { "aria-pressed": t === l, onClick: () => r(l), onFocus: () => r(l), onMouseEnter: () => r(l), children: [
      /* @__PURE__ */ n("span", { children: [
        "0",
        l + 1
      ] }),
      /* @__PURE__ */ e("strong", { children: a.name }),
      /* @__PURE__ */ e("div", { children: a.nodes.map((i) => /* @__PURE__ */ e("span", { children: i }, i)) }),
      /* @__PURE__ */ e(q, { size: 18 })
    ] }, a.name)) }),
    /* @__PURE__ */ n("aside", { "aria-live": "polite", children: [
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "RELATIONSHIP IN FOCUS" }),
      /* @__PURE__ */ e("h4", { children: j[t].name }),
      /* @__PURE__ */ e("p", { children: j[t].detail }),
      /* @__PURE__ */ e("span", { className: "culturelens-label", children: "SYSTEM CONSEQUENCE" }),
      /* @__PURE__ */ e("p", { children: j[t].consequence }),
      /* @__PURE__ */ e("small", { children: "Portfolio synthesis of G2/G3. This map is a design interpretation, not a user-research finding." })
    ] })
  ] });
}
function Ue({ index: t }) {
  const r = t, a = G[t], [l, i] = m(0), [s, d] = m("Focus");
  return /* @__PURE__ */ n("section", { id: `culturelens-proposal-${t}`, "data-proposal-layer": t, className: "culturelens-proposal-content", "aria-label": a.short, children: [
    /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
      "PROPOSAL 0",
      r + 1,
      " · ",
      a.layer
    ] }),
    /* @__PURE__ */ e("h3", { children: a.title }),
    /* @__PURE__ */ e("p", { className: "culturelens-deck", children: a.thesis }),
    /* @__PURE__ */ e(Me, { active: r }),
    r === 0 ? /* @__PURE__ */ n("div", { className: "culturelens-journey", children: [
      /* @__PURE__ */ e("div", { "aria-label": "Service journey stages", children: B.map(([c], o) => /* @__PURE__ */ n("button", { "aria-pressed": l === o, onPointerEnter: (u) => {
        u.pointerType === "mouse" && i(o);
      }, onFocus: () => i(o), onClick: () => i(o), children: [
        /* @__PURE__ */ n("span", { children: [
          "0",
          o + 1
        ] }),
        c
      ] }, c)) }),
      /* @__PURE__ */ n("article", { "aria-live": "polite", children: [
        /* @__PURE__ */ n("span", { className: "culturelens-journey-number", children: [
          "0",
          l + 1
        ] }),
        /* @__PURE__ */ e("h4", { children: B[l][0] }),
        /* @__PURE__ */ e("p", { children: B[l][1] })
      ] })
    ] }) : /* @__PURE__ */ e("div", { className: `culturelens-visual-pair ${r === 2 ? "culturelens-museband-visuals" : "culturelens-xr-visuals"}`, children: a.assets.map((c, o) => /* @__PURE__ */ e(Ve, { filename: c, index: o, mode: s }, `${c}-${o === 1 ? s : "scenario"}`)) }),
    r === 2 && /* @__PURE__ */ n(N, { children: [
      /* @__PURE__ */ e("div", { className: "culturelens-mode-rail", "aria-label": "MuseBand modes", children: ["Focus", "Story", "Flow", "Control"].map((c) => /* @__PURE__ */ n("button", { "aria-pressed": s === c, onPointerEnter: (o) => {
        o.pointerType === "mouse" && d(c);
      }, onFocus: () => d(c), onClick: () => d(c), children: [
        /* @__PURE__ */ e("span", { className: s === c ? "culturelens-status-dot" : "" }),
        c
      ] }, c)) }),
      /* @__PURE__ */ e("p", { "aria-live": "polite", children: { Focus: "Reduce distracting noise while keeping environmental safety cues available.", Story: "Explore object-linked stories through open-ear audio, captions or haptics.", Flow: "Compare routes and crowd suggestions; visitors may continue their original route.", Control: "Pause, skip, reduce intensity or stop suggestions at any time." }[s] })
    ] }),
    /* @__PURE__ */ e("p", { children: a.value }),
    /* @__PURE__ */ n(U, { title: "Design tension → response", children: [
      /* @__PURE__ */ n("p", { children: [
        /* @__PURE__ */ e("strong", { children: "Risk:" }),
        " ",
        a.risk
      ] }),
      /* @__PURE__ */ n("p", { children: [
        /* @__PURE__ */ e("strong", { children: "Decision:" }),
        " ",
        a.response
      ] }),
      /* @__PURE__ */ e("small", { children: a.source }),
      r === 2 && /* @__PURE__ */ e("p", { children: "G2 documented a head-worn physical prototype and desktop walkthrough. The refined images retain this forehead placement and are explicitly labelled concept visualisations." })
    ] }),
    /* @__PURE__ */ n("div", { className: "culturelens-layer-end", children: [
      /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
        "END OF LAYER 0",
        t + 1
      ] }),
      /* @__PURE__ */ e("p", { children: t === 0 ? "Continue scrolling → The context" : t === 1 ? "Continue scrolling → The live moment" : "Three layers explored → Compare the directions" })
    ] })
  ] });
}
function $e() {
  const [t, r] = m(0), a = S(null);
  $(() => {
    var u;
    const i = Array.from(((u = a.current) == null ? void 0 : u.querySelectorAll("[data-proposal-layer]")) || []);
    let s = 0;
    const d = () => {
      s = 0;
      const v = Math.min(innerHeight * 0.32, 260);
      let h = 0;
      i.forEach((f, y) => {
        f.getBoundingClientRect().top <= v && (h = y);
      }), r(h);
    }, c = () => {
      s || (s = requestAnimationFrame(d));
    }, o = new ResizeObserver(c);
    return i.forEach((v) => o.observe(v)), window.addEventListener("scroll", c, { passive: !0 }), window.addEventListener("resize", c), d(), () => {
      o.disconnect(), window.removeEventListener("scroll", c), window.removeEventListener("resize", c), cancelAnimationFrame(s);
    };
  }, []);
  const l = (i) => {
    var s, d;
    (d = (s = a.current) == null ? void 0 : s.querySelector(`[data-proposal-layer="${i}"]`)) == null || d.scrollIntoView({ block: "start", behavior: "instant" }), r(i);
  };
  return /* @__PURE__ */ n(N, { children: [
    /* @__PURE__ */ n("div", { ref: a, className: "culturelens-proposal-explorer culturelens-sequential-proposals", children: [
      /* @__PURE__ */ n("aside", { children: [
        /* @__PURE__ */ e("span", { className: "culturelens-label", children: "THREE SYSTEM LAYERS" }),
        /* @__PURE__ */ n("h3", { children: [
          "One museum.",
          /* @__PURE__ */ e("br", {}),
          "Three directions."
        ] }),
        /* @__PURE__ */ e("p", { children: "Scroll through the journey, the context and the live moment." }),
        /* @__PURE__ */ e("div", { className: "culturelens-proposal-tabs", "aria-label": "Explore museum proposals", children: G.map((i, s) => /* @__PURE__ */ n("button", { "aria-pressed": t === s, "aria-controls": `culturelens-proposal-${s}`, onPointerEnter: (d) => {
          d.pointerType === "mouse" && t !== s && l(s);
        }, onClick: () => l(s), children: [
          /* @__PURE__ */ n("span", { children: [
            "0",
            s + 1
          ] }),
          /* @__PURE__ */ e("strong", { children: i.short }),
          /* @__PURE__ */ e(L, { size: 17 })
        ] }, i.short)) })
      ] }),
      /* @__PURE__ */ e("div", { className: "culturelens-proposal-sequence", children: G.map((i, s) => /* @__PURE__ */ e(Ue, { index: s }, s)) })
    ] }),
    /* @__PURE__ */ e(Le, {}),
    /* @__PURE__ */ e(U, { title: "Compare all three proposals · qualitative assessment", children: /* @__PURE__ */ e("div", { className: "culturelens-table-wrap", children: /* @__PURE__ */ n("table", { children: [
      /* @__PURE__ */ e("caption", { children: "Group project comparison, synthesised from A2.G2 pp. 14–16. No numerical scoring." }),
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ n("tr", { children: [
        /* @__PURE__ */ e("th", { scope: "col", children: "Dimension" }),
        G.map((i) => /* @__PURE__ */ e("th", { scope: "col", children: i.short }, i.short))
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: we.map(([i, ...s]) => /* @__PURE__ */ n("tr", { children: [
        /* @__PURE__ */ e("th", { scope: "row", children: i }),
        s.map((d) => /* @__PURE__ */ e("td", { children: d }, d))
      ] }, i)) })
    ] }) }) }),
    /* @__PURE__ */ n("div", { className: "culturelens-selection", children: [
      /* @__PURE__ */ e("span", { children: "DECISION CHECKPOINT 02" }),
      /* @__PURE__ */ e("h3", { children: "MuseBand brought the system into the live moment." }),
      /* @__PURE__ */ e("p", { children: "The service journey offered the strongest preparation framework. XR offered the strongest interpretation direction. MuseBand connected focus, sensory comfort, routes, access, objects, crowds and operations in one testable concept." }),
      /* @__PURE__ */ e("p", { className: "culturelens-question", children: "Can smart support personalise the museum without personalising control?" })
    ] })
  ] });
}
function Be() {
  const [t, r] = m(0);
  return /* @__PURE__ */ n("div", { className: "culturelens-transfer", children: [
    /* @__PURE__ */ n("div", { className: "culturelens-transfer-head", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("small", { children: "G2 · SPECULATIVE SMART MUSEUM" }),
        /* @__PURE__ */ e("h3", { children: "MuseBand" })
      ] }),
      /* @__PURE__ */ e(ae, { "aria-hidden": "true" }),
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("small", { children: "G3 · VOICEFLOW PROTOTYPE" }),
        /* @__PURE__ */ e("h3", { children: "CultureLens" })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "culturelens-transfer-rows", children: Ne.map(([a, l], i) => /* @__PURE__ */ n("button", { onClick: () => r(i), onFocus: () => r(i), onMouseEnter: () => r(i), "aria-pressed": t === i, children: [
      /* @__PURE__ */ e("strong", { children: a }),
      /* @__PURE__ */ e("span", { className: "culturelens-transfer-line", "aria-hidden": "true" }),
      /* @__PURE__ */ e("span", { children: l })
    ] }, a)) }),
    /* @__PURE__ */ e("p", { children: "DECISION CHECKPOINT 03 · Keep the principles. Make their consequences testable through conversation." })
  ] });
}
function He() {
  const [t, r] = m(0), a = ["User action", "Frontstage service", "Agent / decision logic", "Backstage data", "Human / governance"];
  return /* @__PURE__ */ n("div", { className: "culturelens-blueprint", children: [
    /* @__PURE__ */ e("div", { className: "culturelens-stage-rail", "aria-label": "Service stages", children: P.map((l, i) => /* @__PURE__ */ n("button", { "aria-pressed": t === i, onPointerEnter: (s) => {
      s.pointerType === "mouse" && r(i);
    }, onFocus: () => r(i), onClick: () => r(i), children: [
      /* @__PURE__ */ n("span", { children: [
        "0",
        i + 1
      ] }),
      l.stage
    ] }, l.stage)) }),
    /* @__PURE__ */ n("div", { className: "culturelens-blueprint-body", children: [
      /* @__PURE__ */ n("div", { className: "culturelens-blueprint-title", children: [
        /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
          "STAGE 0",
          t + 1
        ] }),
        /* @__PURE__ */ e("h3", { children: P[t].stage }),
        /* @__PURE__ */ e("p", { children: P[t].why }),
        /* @__PURE__ */ n("button", { onClick: () => r((t + 1) % P.length), children: [
          "Next stage ",
          /* @__PURE__ */ e(L, { size: 16 })
        ] })
      ] }),
      /* @__PURE__ */ e("dl", { children: a.map((l, i) => /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("dt", { children: l }),
        /* @__PURE__ */ e("dd", { children: P[t].rows[i] })
      ] }, l)) })
    ] }, t),
    /* @__PURE__ */ e("small", { children: "Derived service blueprint · G3 service and architecture evidence, extended into a portfolio synthesis." })
  ] });
}
function We() {
  const [t, r] = m(0), a = M[t];
  return /* @__PURE__ */ n("div", { className: "culturelens-architecture", children: [
    /* @__PURE__ */ e("div", { className: "culturelens-intents", "aria-label": "Trace an example intent", children: M.map((l, i) => /* @__PURE__ */ n("button", { "aria-pressed": t === i, onClick: () => r(i), onFocus: () => r(i), onMouseEnter: () => r(i), children: [
      l.prompt,
      /* @__PURE__ */ e(q, { size: 16 })
    ] }, l.prompt)) }),
    /* @__PURE__ */ n("div", { className: "culturelens-routing", children: [
      /* @__PURE__ */ n("div", { className: "culturelens-core", children: [
        /* @__PURE__ */ e("span", { className: "culturelens-label", children: "CORE AGENT" }),
        /* @__PURE__ */ e("h3", { children: "CultureLens Concierge" }),
        /* @__PURE__ */ e("p", { children: "Interpret intent → route the request" })
      ] }),
      /* @__PURE__ */ n("svg", { className: "culturelens-branches", viewBox: "0 0 900 70", preserveAspectRatio: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ e("path", { d: "M450 0V28H150V70 M450 28V70 M450 28H750V70" }),
        /* @__PURE__ */ e("path", { className: "culturelens-active-path", d: t === 0 ? "M450 0V28H150V70" : t === 2 ? "M450 0V70" : "M450 0V28H750V70" }, t)
      ] }),
      /* @__PURE__ */ e("div", { className: "culturelens-module-row", children: [M[0], M[2], M[1]].map((l) => /* @__PURE__ */ n("div", { className: a.kind === l.kind ? "is-active" : "", children: [
        /* @__PURE__ */ e("span", { className: "culturelens-label", children: l.kind }),
        /* @__PURE__ */ e("h4", { children: l.route })
      ] }, l.kind)) }),
      /* @__PURE__ */ n("div", { className: "culturelens-trace", "aria-live": "polite", children: [
        /* @__PURE__ */ e("span", { className: "culturelens-label", children: "DECISION TRACE" }),
        /* @__PURE__ */ e("p", { children: a.action }),
        /* @__PURE__ */ n("dl", { children: [
          /* @__PURE__ */ e("dt", { children: "Data" }),
          /* @__PURE__ */ e("dd", { children: a.data }),
          /* @__PURE__ */ e("dt", { children: "State" }),
          /* @__PURE__ */ e("dd", { children: a.state }),
          /* @__PURE__ */ e("dt", { children: "Action boundary" }),
          /* @__PURE__ */ e("dd", { children: "Prepare → review → user confirmation" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "culturelens-trust-layers", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("span", { children: "01 / PROTOTYPE SERVICE DATA" }),
        /* @__PURE__ */ e("p", { children: "Dummy tickets, crowd, weather, transport and support points." })
      ] }),
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("span", { children: "02 / CURATOR-REVIEWED KNOWLEDGE" }),
        /* @__PURE__ */ e("p", { children: "Required governance layer for museum information, catalogue and explanation summaries." })
      ] }),
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ e("span", { children: "03 / HUMAN / OFFICIAL SUPPORT" }),
        /* @__PURE__ */ e("p", { children: "Official labels and museum staff for live help and contested interpretation." })
      ] })
    ] })
  ] });
}
function _e() {
  const [t, r] = m(0), [a, l] = m(!1), i = J[t];
  return /* @__PURE__ */ n("div", { className: "culturelens-failure-lab", children: [
    /* @__PURE__ */ e("div", { className: "culturelens-failure-tabs", "aria-label": "Choose a Voiceflow failure", children: J.map((s, d) => /* @__PURE__ */ n("button", { "aria-pressed": t === d, onPointerEnter: (c) => {
      c.pointerType === "mouse" && t !== d && (r(d), l(!1));
    }, onFocus: () => {
      t !== d && (r(d), l(!1));
    }, onClick: () => {
      r(d), l(!1);
    }, children: [
      /* @__PURE__ */ n("span", { children: [
        "0",
        d + 1
      ] }),
      s.title
    ] }, s.title)) }),
    /* @__PURE__ */ n("div", { className: "culturelens-failure-detail", children: [
      /* @__PURE__ */ e(je, { active: t }),
      /* @__PURE__ */ n("div", { className: "culturelens-failure-display", children: [
        /* @__PURE__ */ n("div", { className: "culturelens-toggle", "aria-label": "View before or after", children: [
          /* @__PURE__ */ e("button", { "aria-pressed": !a, onPointerEnter: (s) => {
            s.pointerType === "mouse" && l(!1);
          }, onFocus: () => l(!1), onClick: () => l(!1), children: "Before" }),
          /* @__PURE__ */ e("button", { "aria-pressed": a, onPointerEnter: (s) => {
            s.pointerType === "mouse" && l(!0);
          }, onFocus: () => l(!0), onClick: () => l(!0), children: "After refinement" })
        ] }),
        /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
          a ? "REFINED STATE" : "OBSERVED BREAKDOWN",
          " · RECREATED FROM PROJECT EVIDENCE"
        ] }),
        /* @__PURE__ */ e("p", { className: a ? "culturelens-code good" : "culturelens-code", children: a ? i.after : i.before }),
        a && t === 0 && /* @__PURE__ */ n("div", { className: "culturelens-example-buttons", children: [
          /* @__PURE__ */ e("span", { children: "Yes, continue" }),
          /* @__PURE__ */ e("span", { children: "Choose another exhibition" }),
          /* @__PURE__ */ e("span", { children: "Compare first" })
        ] })
      ] }),
      /* @__PURE__ */ n("dl", { children: [
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ e("dt", { children: "Break" }),
          /* @__PURE__ */ e("dd", { children: i.break })
        ] }),
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ e("dt", { children: "Diagnose" }),
          /* @__PURE__ */ e("dd", { children: i.diagnose })
        ] }),
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ e("dt", { children: "Refine" }),
          /* @__PURE__ */ e("dd", { children: i.refine })
        ] }),
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ e("dt", { children: "System consequence" }),
          /* @__PURE__ */ e("dd", { children: i.consequence })
        ] })
      ] }),
      /* @__PURE__ */ n("small", { children: [
        i.source,
        " · Build → test → diagnose → refine"
      ] })
    ] })
  ] });
}
function Ye() {
  return /* @__PURE__ */ e("div", { className: "culturelens-video-grid", children: [["Happy path · discover, plan, visit", "/media/CultureLens-Discover-Exhibition.mp4", "Original Happy path recording · 1:47. Exhibition discovery, reservation review and language adjustment."], ["Deviation path · clarify & recover", "/media/CultureLens-Plan-Museum-Visit.mp4", "Original Deviation path recording · 0:54. Ambiguous comfort needs and honest limits on live information."]].map(([t, r, a], l) => /* @__PURE__ */ e(ze, { title: t, src: r, description: a, index: l }, r)) });
}
function ze({ title: t, src: r, description: a, index: l }) {
  const [i, s] = m(!1), [d, c] = m(!1);
  return /* @__PURE__ */ n("figure", { className: "culturelens-evidence-video", children: [
    /* @__PURE__ */ e("div", { className: "culturelens-video-screen", children: i ? d ? /* @__PURE__ */ n("div", { className: "culturelens-video-unavailable", children: [
      /* @__PURE__ */ e("h4", { children: "Recording unavailable in this checkout." }),
      /* @__PURE__ */ e("p", { children: "The original video slot is preserved. Explore the source artefacts below or use the interactive simulation." }),
      /* @__PURE__ */ e("small", { children: r })
    ] }) : /* @__PURE__ */ e("video", { src: r, controls: !0, autoPlay: !0, playsInline: !0, preload: "none", "aria-label": `Voiceflow project evidence: ${t}`, onError: () => c(!0) }) : /* @__PURE__ */ n("button", { onClick: () => s(!0), "aria-label": `Play ${t}`, children: [
      /* @__PURE__ */ e(ge, { size: 28 }),
      /* @__PURE__ */ e("strong", { children: t }),
      /* @__PURE__ */ e("span", { children: "Play Voiceflow recording" })
    ] }) }),
    /* @__PURE__ */ n("figcaption", { children: [
      /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
        "VOICEFLOW EVIDENCE 0",
        l + 1
      ] }),
      /* @__PURE__ */ e("h4", { children: t }),
      /* @__PURE__ */ e("p", { children: a })
    ] })
  ] });
}
function x({ id: t, number: r, label: a, title: l, children: i, className: s = "" }) {
  return /* @__PURE__ */ n("section", { id: `culturelens-${t}`, className: `culturelens-chapter ${s}`, "data-culturelens-chapter": t, children: [
    /* @__PURE__ */ n("header", { className: "culturelens-chapter-heading", children: [
      /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
        r,
        " / ",
        a
      ] }),
      /* @__PURE__ */ e("h2", { children: l })
    ] }),
    i
  ] });
}
function Je() {
  const t = S(null), r = S(null), [a, l] = m("frame");
  return $(() => {
    const i = t.current;
    if (!i) return;
    const s = matchMedia("(prefers-reduced-motion: reduce)"), d = new IntersectionObserver((h) => h.forEach((f) => {
      f.isIntersecting && f.target.classList.add("culturelens-in-view");
    }), { threshold: 0.12 });
    i.querySelectorAll(".culturelens-chapter, .culturelens-signal-grid").forEach((h) => d.observe(h));
    const c = Array.from(i.querySelectorAll("[data-culturelens-chapter]")), o = () => {
      const h = [...c].reverse().find((E) => E.getBoundingClientRect().top <= 200), f = h ? c.indexOf(h) : -1;
      let y = 0;
      if (h) {
        const E = h.getBoundingClientRect(), O = c[f + 1], A = O ? O.getBoundingClientRect().top - E.top : E.height, I = Math.max(0, Math.min(1, (200 - E.top) / Math.max(1, A)));
        y = (f + 1 + I) / c.length;
      } else if (c[0]) {
        const E = Math.max(1, c[0].offsetTop - i.offsetTop - 200);
        y = Math.max(0, -i.getBoundingClientRect().top / E) / c.length;
      }
      r.current && (r.current.style.transform = `scaleX(${Math.max(0, Math.min(1, y))})`), l((h == null ? void 0 : h.dataset.culturelensChapter) ?? "frame");
    }, u = i.querySelectorAll(".culturelens-chapter-nav a"), v = (h) => {
      const f = h.currentTarget, y = document.getElementById(f.hash.slice(1));
      y && (h.preventDefault(), y.scrollIntoView({ behavior: s.matches ? "instant" : "smooth" }), history.replaceState(history.state, "", f.hash));
    };
    return u.forEach((h) => h.addEventListener("click", v)), window.addEventListener("scroll", o, { passive: !0 }), window.addEventListener("resize", o), o(), () => {
      d.disconnect(), u.forEach((h) => h.removeEventListener("click", v)), window.removeEventListener("scroll", o), window.removeEventListener("resize", o);
    };
  }, []), /* @__PURE__ */ n(N, { children: [
    /* @__PURE__ */ n("main", { ref: t, className: "culturelens-page", children: [
      /* @__PURE__ */ n("header", { className: "culturelens-hero", children: [
        /* @__PURE__ */ n("div", { className: "culturelens-hero-top", children: [
          /* @__PURE__ */ e("span", { children: "SELECTED CASE STUDY / 03" }),
          /* @__PURE__ */ e("span", { children: "FUTURES THINKING → SERVICE DESIGN → AGENTIC AI" })
        ] }),
        /* @__PURE__ */ n("div", { className: "culturelens-hero-title", children: [
          /* @__PURE__ */ n("h1", { children: [
            "Culture",
            /* @__PURE__ */ e("span", { children: "Lens" }),
            /* @__PURE__ */ e("small", { children: "— Agentic Museum Concierge" })
          ] }),
          /* @__PURE__ */ n("span", { className: "culturelens-edition", children: [
            "CULTURE",
            /* @__PURE__ */ e("br", {}),
            "IN CONTEXT.",
            /* @__PURE__ */ e("br", {}),
            /* @__PURE__ */ n("i", { children: [
              "AGENCY",
              /* @__PURE__ */ e("br", {}),
              "BY DESIGN."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "culturelens-hero-composition", children: [
          /* @__PURE__ */ n("div", { className: "culturelens-gallery-label", children: [
            /* @__PURE__ */ e("span", { className: "culturelens-label", children: "EXHIBITION 03 / A SERVICE IN EVOLUTION" }),
            /* @__PURE__ */ n("h2", { children: [
              "What should",
              /* @__PURE__ */ e("br", {}),
              "an intelligent",
              /* @__PURE__ */ e("br", {}),
              "museum leave",
              /* @__PURE__ */ e("br", {}),
              /* @__PURE__ */ e("em", { children: "to you?" })
            ] }),
            /* @__PURE__ */ e("p", { children: "A futures-led service design case study exploring how agentic AI can guide visitors from discovery to a user-confirmed visit plan while preserving agency, accessibility and cultural trust." }),
            /* @__PURE__ */ n("a", { href: "#culturelens-simulation", children: [
              "Experience the prototype ",
              /* @__PURE__ */ e(q, { size: 18 })
            ] })
          ] }),
          /* @__PURE__ */ n("div", { className: "culturelens-hero-system", "aria-label": "Concept diagram: culture, context, choice", children: [
            /* @__PURE__ */ e("div", { className: "culturelens-hero-grid", "aria-hidden": "true" }),
            /* @__PURE__ */ n("div", { className: "culturelens-exhibit-label", children: [
              /* @__PURE__ */ e("span", { children: "01 / CULTURAL EXPERIENCE" }),
              /* @__PURE__ */ n("strong", { children: [
                "People.",
                /* @__PURE__ */ e("br", {}),
                "Objects.",
                /* @__PURE__ */ e("br", {}),
                "Shared meaning."
              ] }),
              /* @__PURE__ */ e("small", { children: "THE MUSEUM IS THE CONTEXT." })
            ] }),
            /* @__PURE__ */ n("div", { className: "culturelens-hero-interface", children: [
              /* @__PURE__ */ e("span", { className: "culturelens-label", children: "02 / SERVICE INTERFACE" }),
              /* @__PURE__ */ n("p", { children: [
                "“Something quiet.",
                /* @__PURE__ */ e("br", {}),
                "In Chinese.",
                /* @__PURE__ */ e("br", {}),
                "Somewhere to sit.”"
              ] }),
              /* @__PURE__ */ n("div", { children: [
                /* @__PURE__ */ e("span", { children: "NEEDS CAPTURED" }),
                /* @__PURE__ */ e(z, { size: 16 })
              ] }),
              /* @__PURE__ */ n("h3", { children: [
                "Everyday Objects,",
                /* @__PURE__ */ e("br", {}),
                "Shared Cultures"
              ] }),
              /* @__PURE__ */ e("small", { children: "Prototype catalogue · 45 min · Low sensory" }),
              /* @__PURE__ */ n("div", { className: "culturelens-interface-options", children: [
                /* @__PURE__ */ e("span", { children: "Compare" }),
                /* @__PURE__ */ e("span", { children: "Change" }),
                /* @__PURE__ */ e("span", { children: "Confirm ↗" })
              ] })
            ] }),
            /* @__PURE__ */ n("div", { className: "culturelens-hero-trace", children: [
              /* @__PURE__ */ e("span", { children: "03 / DECISION TRACE" }),
              /* @__PURE__ */ e("code", { children: "request → context → suggestion → your choice" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "culturelens-hero-bottom", children: [
          /* @__PURE__ */ e("span", { children: "2026 · UNIVERSITY OF MELBOURNE · GROUP PROJECT" }),
          /* @__PURE__ */ n("a", { href: "#culturelens-frame", children: [
            "7 CHAPTERS · 5 MIN MAINLINE ",
            /* @__PURE__ */ e(ve, { size: 14 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ n("nav", { className: "culturelens-chapter-nav", "aria-label": "CultureLens case study chapters", children: [
        /* @__PURE__ */ e("div", { className: "culturelens-reading-progress", ref: r }),
        /* @__PURE__ */ n("span", { className: "culturelens-nav-mark", children: [
          "C",
          /* @__PURE__ */ e("span", { children: "L" }),
          " /"
        ] }),
        /* @__PURE__ */ e("div", { children: ye.map((i, s) => /* @__PURE__ */ n("a", { href: `#culturelens-${i.toLowerCase()}`, "aria-current": a === i.toLowerCase() ? "location" : void 0, children: [
          /* @__PURE__ */ n("small", { children: [
            "0",
            s + 1
          ] }),
          i
        ] }, i)) })
      ] }),
      /* @__PURE__ */ n(x, { id: "frame", number: "01", label: "FRAME / FUTURES THINKING", title: "From cultural futures to a museum system.", children: [
        /* @__PURE__ */ e("div", { className: "culturelens-signal-grid", children: Ee.map(([i, s, d], c) => /* @__PURE__ */ n("article", { children: [
          /* @__PURE__ */ n("span", { children: [
            "0",
            c + 1
          ] }),
          /* @__PURE__ */ e("h3", { children: i }),
          /* @__PURE__ */ e("p", { children: s }),
          /* @__PURE__ */ e("small", { children: d })
        ] }, i)) }),
        /* @__PURE__ */ n("div", { className: "culturelens-frame-question", children: [
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: "DECISION CHECKPOINT 01" }),
          /* @__PURE__ */ e("h3", { children: "What happens when these forces enter the museum?" }),
          /* @__PURE__ */ e("p", { children: "Discovery, accessibility and participation should grow together with visitor agency, human creativity and public accountability." })
        ] }),
        /* @__PURE__ */ e("h3", { className: "culturelens-subheading", children: "The museum is a decision system." }),
        /* @__PURE__ */ e(qe, {}),
        /* @__PURE__ */ e(U, { title: "Project overview & evidence boundaries", children: /* @__PURE__ */ n("div", { className: "culturelens-overview-grid", children: [
          /* @__PURE__ */ n("p", { children: [
            /* @__PURE__ */ e("strong", { children: "Context" }),
            /* @__PURE__ */ e("br", {}),
            "2026 · University of Melbourne · Group project"
          ] }),
          /* @__PURE__ */ n("p", { children: [
            /* @__PURE__ */ e("strong", { children: "Disciplines" }),
            /* @__PURE__ */ e("br", {}),
            "Futures Thinking · Service Design · Systems Thinking · Agentic AI · Conversation Design · Prototyping"
          ] }),
          /* @__PURE__ */ n("p", { children: [
            /* @__PURE__ */ e("strong", { children: "Evidence" }),
            /* @__PURE__ */ e("br", {}),
            "G2 concepts, physical prototype and desktop walkthrough; G3 Voiceflow structure, conversations, dummy data and breakdown analysis."
          ] }),
          /* @__PURE__ */ n("p", { children: [
            /* @__PURE__ */ e("strong", { children: "Scope" }),
            /* @__PURE__ */ e("br", {}),
            "A refined design prototype. No real museum partnership, live booking integration or measured real-world impact is claimed."
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ n(x, { id: "explore", number: "02", label: "EXPLORE / IDEA PORTFOLIO", title: "Three ways to make the museum more responsive.", children: [
        /* @__PURE__ */ e(Se, {}),
        /* @__PURE__ */ e($e, {})
      ] }),
      /* @__PURE__ */ n(x, { id: "evolve", number: "03", label: "EVOLVE / PRINCIPLE TRANSFER", title: "A new medium. The same responsibility.", className: "culturelens-evolve", children: [
        /* @__PURE__ */ e("p", { className: "culturelens-intro", children: "MuseBand explored a speculative smart-museum system. CultureLens translated its strongest principles into a testable conversational service in Voiceflow." }),
        /* @__PURE__ */ e(Be, {}),
        /* @__PURE__ */ n("div", { className: "culturelens-hmw", children: [
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: "THE CULTURELENS DESIGN QUESTION" }),
          /* @__PURE__ */ e("h3", { children: "How might we help visitors plan, reserve, experience and reflect through a web-chat that turns a simple request into a transparent, user-confirmed visit journey?" })
        ] })
      ] }),
      /* @__PURE__ */ n(x, { id: "service", number: "04", label: "SERVICE / BLUEPRINT", title: "A conversation that carries across the visit.", className: "culturelens-service", children: [
        /* @__PURE__ */ e("p", { className: "culturelens-intro", children: "Exhibition choice, tickets, language, transport and comfort span multiple touchpoints. The service connects these small decisions while keeping adjustment available." }),
        /* @__PURE__ */ e(He, {}),
        /* @__PURE__ */ n("p", { className: "culturelens-checkpoint", children: [
          "DECISION CHECKPOINT 04 ",
          /* @__PURE__ */ e(ae, { size: 18 }),
          " Open conversation → selected exhibition → structured preparation → visitor confirmation"
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: "culturelens-agent-mode", children: [
        /* @__PURE__ */ n(x, { id: "agent", number: "05", label: "AGENT / ARCHITECTURE & INTERACTION", title: "Flexible in conversation. Explicit before action.", children: [
          /* @__PURE__ */ e("p", { className: "culturelens-intro", children: "A core agent routes requests to two Playbooks and one Workflow. Knowledge, prototype service data and visit state serve different roles." }),
          /* @__PURE__ */ e(We, {}),
          /* @__PURE__ */ n("div", { className: "culturelens-autonomy", children: [
            /* @__PURE__ */ e("span", { className: "culturelens-label", children: "AUTONOMY LADDER" }),
            /* @__PURE__ */ e("ol", { children: ["Observe", "Suggest", "Plan", "Act with confirmation", "Act autonomously"].map((i, s) => /* @__PURE__ */ n("li", { className: s === 3 ? "is-current" : "", children: [
              /* @__PURE__ */ n("span", { children: [
                "0",
                s + 1
              ] }),
              i,
              s === 3 && /* @__PURE__ */ e("small", { children: "CULTURELENS" })
            ] }, i)) }),
            /* @__PURE__ */ e("p", { children: "The agent can prepare the action. The visitor decides whether it proceeds." })
          ] }),
          /* @__PURE__ */ e(Te, {}),
          /* @__PURE__ */ n("div", { className: "culturelens-prototype-evidence", children: [
            /* @__PURE__ */ e("span", { className: "culturelens-label", children: "THE ORIGINAL VOICEFLOW BUILD" }),
            /* @__PURE__ */ e("h3", { children: "From conversation logic to project evidence." }),
            /* @__PURE__ */ e("p", { children: "The recordings document the original project. The React simulation above makes the refined interaction logic directly explorable." }),
            /* @__PURE__ */ e(Ye, {}),
            /* @__PURE__ */ e(Fe, {})
          ] })
        ] }),
        /* @__PURE__ */ n(x, { id: "test", number: "06", label: "TEST / CONVERSATION BREAKDOWN ANALYSIS", title: "When the conversation breaks, the system becomes visible.", children: [
          /* @__PURE__ */ e("p", { className: "culturelens-intro", children: "Four Voiceflow failures changed the design of messages, routing and state. Each refinement made the next action more predictable." }),
          /* @__PURE__ */ e(_e, {}),
          /* @__PURE__ */ e("div", { className: "culturelens-repair-rail", children: [["Avoid", "Gate reservation on exhibition selection."], ["Notice", "Restate a likely typo interpretation before continuing."], ["Repair", "Clarify ambiguous comfort needs."], ["Fallback", "State unsupported capabilities; offer text or staff support."]].map(([i, s]) => /* @__PURE__ */ n("div", { children: [
            /* @__PURE__ */ e("h4", { children: i }),
            /* @__PURE__ */ e("p", { children: s })
          ] }, i)) }),
          /* @__PURE__ */ e("h3", { className: "culturelens-subheading", children: "Human-centred AI is a set of constraints." }),
          /* @__PURE__ */ e("div", { className: "culturelens-risk-grid", children: Ce.map((i, s) => /* @__PURE__ */ n("article", { children: [
            /* @__PURE__ */ n("span", { className: "culturelens-label", children: [
              "0",
              s + 1,
              " / ",
              i.lens
            ] }),
            /* @__PURE__ */ e("h4", { children: i.title }),
            /* @__PURE__ */ e("p", { children: i.risk }),
            /* @__PURE__ */ n(U, { title: "Intervention & how we would test it", children: [
              /* @__PURE__ */ n("p", { children: [
                /* @__PURE__ */ e("strong", { children: "Intervention" }),
                /* @__PURE__ */ e("br", {}),
                i.intervention
              ] }),
              /* @__PURE__ */ n("p", { children: [
                /* @__PURE__ */ e("strong", { children: "Proposed evaluation" }),
                /* @__PURE__ */ e("br", {}),
                i.test
              ] }),
              /* @__PURE__ */ e("small", { children: "These are evaluation directions, not completed user-study results." })
            ] })
          ] }, i.title)) })
        ] })
      ] }),
      /* @__PURE__ */ n(x, { id: "reflect", number: "07", label: "REFLECT / DESIGNING THE LIMITS", title: "Leave the meaningful decisions with people.", className: "culturelens-reflect", children: [
        /* @__PURE__ */ n("div", { className: "culturelens-reflection-grid", children: [
          /* @__PURE__ */ n("p", { className: "culturelens-reflection-statement", children: [
            "Where should AI reduce friction?",
            /* @__PURE__ */ e("br", {}),
            "Where should it expose its logic?",
            /* @__PURE__ */ e("br", {}),
            /* @__PURE__ */ e("em", { children: "Where should it step back?" })
          ] }),
          /* @__PURE__ */ n("div", { children: [
            /* @__PURE__ */ e("p", { children: "CultureLens reframed the museum chatbot as a service orchestrator: connecting discovery, planning, accessibility and in-visit support while keeping meaningful decisions reversible." }),
            /* @__PURE__ */ e("p", { children: "The most useful refinement was the boundary between suggestion and action. A legible summary, persistent state and a genuine option to change matter as much as a fluent response." }),
            /* @__PURE__ */ e("p", { children: "This refined design prototype makes those decisions testable. It does not establish real-world effectiveness; visitor evaluation, institutional content review and operational testing remain necessary." })
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: "culturelens-contribution", children: [
          /* @__PURE__ */ e("span", { className: "culturelens-label", children: "MY CONTRIBUTION / SHARED GROUP PROJECT" }),
          /* @__PURE__ */ e("p", { children: "Developed through shared research, discussion and prototyping. My involvement included framing the agentic-AI opportunity, early concept sketches, dummy-data and concept documentation, and identifying refinements during the Voiceflow build. I also contributed to discussions about visitor control, accessibility and the appropriate role of AI in the museum service." })
        ] }),
        /* @__PURE__ */ n("a", { className: "culturelens-next-project", href: "/projects/furniture", children: [
          /* @__PURE__ */ e("span", { children: "NEXT CASE STUDY · 04" }),
          /* @__PURE__ */ e("strong", { children: "My Furniture Store" }),
          /* @__PURE__ */ e(q, { "aria-hidden": "true" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e(ue, {})
  ] });
}
export {
  Je as default
};
