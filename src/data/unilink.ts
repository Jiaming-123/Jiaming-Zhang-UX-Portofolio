export const prototypeUrl = 'https://www.figma.com/design/bOXMuvsgKsiUzAeD3CmvIP/High-Fidelity-Prototype?node-id=0-1&t=xegC9x5kOog7MDpE-1'
export const chapters = ['Overview', 'Problem', 'Research', 'Concepts', 'Final Design', 'Testing', 'Sustainability', 'Reflection']
export const chapterId = (name: string) => `unilink-${name.toLowerCase().replace(/ /g, '-')}`
export type Screen = { path: string; title: string; why: string; width?: number; height?: number; pending?: boolean }
export const flows: { id: string; label: string; title: string; intro: string; screens: Screen[] }[] = [
 { id: 'groups', label: '01 / PEER GROUPS', title: 'Find your people before you need an expert.', intro: 'Small, topic-specific groups make everyday questions easier to ask. Housing, course planning, banking and campus life give each conversation a useful starting point.', screens: [
  {path:'hero/home.png',title:'Find your groups on the homepage',why:'The home screen keeps a joined group within reach and offers a mentor when the question needs more personal attention.',width:786,height:1714},
  {path:'groups/discover.png',title:'Select topics you need',why:'Categories organise support around practical needs. Students can judge relevance before entering a community.',width:786,height:1728},
  {path:'groups/housing.png',title:'Context before joining',why:'Language, member context and a clear group purpose help students understand where they are asking for help.',width:786,height:1704},
  {path:'groups/joined.png',title:'Make membership visible',why:'An explicit Joined state makes the outcome clear and offers a direct route back into the conversation.',width:786,height:1704},
  {path:'groups/chat.png',title:'Shared questions become shared knowledge',why:'Existing discussion lowers the social cost of asking. A pinned inspection checklist turns advice into a practical resource.',width:786,height:1714},
 ]},
 {id:'mentors',label:'02 / FIND YOUR VERIFIED MENTORS',title:'Move from general advice to a relevant person.',intro:'Background, study context, language and support topics help students understand why a senior peer might be a good fit before making contact.',screens:[
  {path:'mentors/discover.png',title:'Relevance before contact',why:'Filters and contextual mentor cards support a more informed choice than a generic list of people.',width:786,height:1714},
  {path:'mentors/profile.png',title:'Trust before commitment',why:'A verified profile brings identity and experience together but it just base on their personal experience.',width:786,height:1704},
  {path:'mentors/reviews.png',title:'Make experience inspectable',why:'The prototype includes ratings and reviews as credibility cues to reference for others',width:786,height:1714},
 ]},
 {id:'booking',label:'03 / MENTOR BOOKING',title:'A conversation with clear expectations.',intro:'Each booking decision reduces ambiguity for both people: when to meet, how to meet and what the student wants help with.',screens:[
  {path:'booking/date-mode.png',title:'Date, mode and duration',why:'Turn availability into an explicit commitment and define the shape of the session (online or in-person?).',width:786,height:1714},
  {path:'booking/time.png',title:'A time both people can plan around',why:'Visible availability makes the commitment concrete and reduces uncertainty before the session.',width:786,height:1710},
  {path:'booking/topic.png',title:'Useful context before the session',why:'A selected topic helps the mentor prepare and gives the conversation a focused starting point.',width:786,height:1704},
  {path:'booking/review.png',title:'Review before committing',why:'Bring the choices together so a student can check expectations and catch mistakes.',width:786,height:1704},
  {path:'booking/confirmation.png',title:'Clarify the booking outcome',why:'The confirmation screen summarises the booking and offers a route to its details.',width:786,height:1704},
 ]},
 {id:'service',label:'04 / DURING SERVICE',title:'Start your query journey.',intro:'A service feels trustworthy when the user knows what happens next. Context, availability and recovery matter throughout the interaction.',screens:[
  {path:'during-service/bookings-confirmed-20261002.png',title:'A visible session state',why:'Student can check the upcoming booking surfaces on homepage.',width:786,height:1714},
  {path:'during-service/details.png',title:'Detailed booking information',why:'Check any detail or make some changes before session',width:786,height:1716},
  {path:'during-service/live.png',title:'Keep the session focused',why:'Start your session and notice your time',width:786,height:1718},
  {path:'during-service/complete.png',title:'End the session clearly',why:'A completion state gives both sides a defined end to the support interaction.',width:786,height:1714},
  {path:'during-service/feedback.png',title:'Leave some reflection',why:'Post-session feedback captures the experience after the support has actually happened.',width:786,height:1714},
 ]},
]
export const recoveryScreens: Screen[] = [
 {path:'during-service/mentor-unavailable-v2-20261003.png',title:'Mentor unavailable',why:'Acknowledge the interruption and offer a choice to wait or find a backup mentor.',width:590,height:1278},
 {path:'during-service/recommendations-v2-20261003.png',title:'Backup recommendations',why:'Find available mentors with relevant study context, language and experience.',width:590,height:1278},
 {path:'during-service/mentor-detail-v2-20261003.png',title:'Mentor detail / handover',why:'Review the backup mentor and choose whether to share the previous conversation context.',width:590,height:1278},
 {path:'during-service/handover-review-v2-20261003.png',title:'Review handover',why:'Review the conversation context being transferred before confirming temporary support.',width:590,height:1278},
 {path:'during-service/handover-confirmation-v2-20261003.png',title:'Support connected',why:'Confirm the temporary handover and continue the conversation with a clear return to the primary mentor.',width:590,height:1278},
]
export const insights = [
 ['Context is the bottleneck.', 'Students can find answers, but deciding which one fits their situation takes more work.'],
 ['Trust is relational.', 'Official sources feel credible but impersonal. Peers feel relatable, while credibility varies.'],
 ['Lower pressure makes asking easier.', 'Seeing a similar question gives students a reason to participate without a formal introduction.'],
 ['Different questions need different support.', 'Everyday questions belong in a community. Personal situations can need focused one-to-one time.'],
]
export type Artifact = { src: string; title: string; caption: string; wide?: boolean; pending?: boolean; width?: number; height?: number }
export const testingArtifacts: Artifact[] = [
 {src:'testing/student-testing.webp',title:'First-year student evaluation notes',caption:'Student evaluation · one participant'},
 {src:'testing/mentor-testing.webp',title:'Potential mentor evaluation notes',caption:'Mentor evaluation · one participant'},
 {src:'research/booking-iteration.webp',title:'Mentor booking design development',caption:'Jiaming Zhang',wide:true},
 {src:'research/service-iteration.webp',title:'During-service design development',caption:'Jiaming Zhang + Weilinge Gong',wide:true},
]
export const iterations = [
 {title:'Status must be explicit.',who:'First-year student',quote:'I expected a clear update when my group request was approved.',finding:'The student could not confidently tell whether joining and booking had succeeded, or what cancellation would mean for points.',implication:'A request, a waiting state and a confirmed commitment need distinct feedback.',response:'The final Figma includes Joined and Confirmed states and a visible upcoming booking. Cancellation and refund clarity remain questions for the next test.',status:'Visible in final prototype + follow-up needed'},
 {title:'Trust includes control and boundaries.',who:'Potential peer mentor',quote:"I expected an option to decline a request or ask the student a question first.",finding:'The mentor wanted consistent student identity, more request controls and protection from being available all day.',implication:'Verification alone cannot carry trust. Mentors need context, choice and realistic time commitments.',response:'Structured booking makes time, mode and topic explicit. Approve / Decline / Ask First, identity consistency and workload limits need further validation.',status:'Design response + unresolved evaluation priorities'},
 {title:'Rewards can also create hesitation.',who:'First-year student + mentor',quote:'Is my question worth using points on?',finding:'The student saw rewards as fair but worried about spending points. The mentor described a free coffee as a bonus rather than a sufficient reason to help.',implication:'Explain costs, earning and refunds at the point of commitment. Recognition should support intrinsic motivation.',response:'The latest home screen labels mentor access with Uses points. Earning guidance, refund rules and long-term motivation still need testing.',status:'Partial clarification; incentive model remains a hypothesis'},
]

export const supplementaryScreens: Artifact[] = [
  {"src": "groups/request-sent.png", "title": "Join request sent", "caption": "A waiting state while the mentor reviews the request.", "width": 786, "height": 1714},
  {"src": "groups/request-points.png", "title": "Points for a join request", "caption": "The prototype rewards sending a group request.", "width": 786, "height": 1714},
  {"src": "mentor-account/home-request.png", "title": "Mentor home · pending request", "caption": "A join request is surfaced on the mentor home screen.", "width": 786, "height": 1714},
  {"src": "mentor-account/join-request.png", "title": "Review a join request", "caption": "Student context and the application message support a decision.", "width": 786, "height": 1704},
  {"src": "mentor-account/request-approved.png", "title": "Request approved", "caption": "Feedback after approving a new group member.", "width": 786, "height": 1704},
  {"src": "mentor-account/home-approved.png", "title": "Home · approval update", "caption": "The supplied home-screen variant after approval.", "width": 786, "height": 1714},
  {"src": "booking/points-request.png", "title": "Points before booking", "caption": "A 100-point cost is shown before redeeming a session.", "width": 786, "height": 1704},
  {"src": "during-service/review-received.png", "title": "Review received", "caption": "Feedback submission is acknowledged and awaits checking.", "width": 786, "height": 1704},
  {"src": "during-service/points-earned.png", "title": "Session points earned", "caption": "The completed session is recognised with 50 points.", "width": 786, "height": 1704},
  {"src": "mentor-account/profile.png", "title": "Mentor account", "caption": "Profile, service history and voucher entry points.", "width": 786, "height": 1704},
  {"src": "mentor-account/service-history.png", "title": "Service history", "caption": "Example activity and contribution statistics in the prototype.", "width": 786, "height": 1704},
  {"src": "rewards/catalogue.png", "title": "Rewards catalogue", "caption": "Illustrative reward partners and point costs; no partnerships are claimed.", "width": 786, "height": 1714},
  {"src": "rewards/points.png", "title": "Link Points", "caption": "Example balance, earning guidance and points history.", "width": 786, "height": 1714},
  {"src": "rewards/detail.png", "title": "Reward detail", "caption": "A campus coffee reward and its 300-point cost.", "width": 786, "height": 1714},
  {"src": "rewards/redeemed.png", "title": "Redemption complete", "caption": "A barcode and guidance to find the voucher again.", "width": 786, "height": 1714},
  {"src": "rewards/vouchers.png", "title": "My vouchers", "caption": "Available and expired rewards are shown separately.", "width": 786, "height": 1704},
]
