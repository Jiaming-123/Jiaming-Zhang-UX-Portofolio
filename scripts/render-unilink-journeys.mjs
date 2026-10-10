import fs from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Search, Users, MessagesSquare, Compass, CalendarCheck, HeartHandshake, HandHeart, ShieldCheck, ClipboardCheck, BookOpen, Award, Target, MousePointer2, PanelsTopLeft, Quote, Activity, TriangleAlert, Lightbulb, Sparkles, Smile, Meh, Frown } from 'lucide-react'

const data = JSON.parse(fs.readFileSync(new URL('./unilink-journeys.json', import.meta.url)))
const W=2160, H=1560, left=226, cw=302, gap=14
const ink='#183552', muted='#526f87', blue='#316fa8', teal='#287e82', line='#c9dfeb'
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const icon=(Icon,x,y,size=25,color=blue)=>`<g transform="translate(${x} ${y})">${renderToStaticMarkup(createElement(Icon,{width:size,height:size,color,strokeWidth:1.7}))}</g>`
function width(s,size) { return [...s].reduce((n,c)=>n+(/[MW@]/.test(c)?.85:/[ilI.,'’ ]/.test(c)?.26:/[A-Z0-9]/.test(c)?.62:.51),0)*size*1.12 }
function wrap(s,max,size) { const lines=[];let line='';for(const word of s.split(' ')){const next=line?`${line} ${word}`:word;if(line&&width(next,size)>max){lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines }
function text(s,x,y,{size=19,color=ink,weight=400,max=266,leading=27,anchor='start'}={}) {return wrap(s,max,size).map((l,i)=>`<text x="${x}" y="${y+i*leading}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${escape(l)}</text>`).join('')}
const rect=(x,y,w,h,fill,rx=0,stroke='none')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`
const stageIcons={student:[Search,Users,MessagesSquare,Compass,CalendarCheck,HeartHandshake],mentor:[HandHeart,ShieldCheck,CalendarCheck,ClipboardCheck,HeartHandshake,Award]}
const actions={
 student:[['Search online','Check university information','Compare social content'],['Browse categories','Check topic and language','Look for similar students'],['Join and read discussions','Ask a practical question','Use shared resources'],['Recognise advice is too general','Explore mentor support'],['Filter and check profiles','Review language, expertise and availability','Choose date, time, mode and topic'],['Join the booked session','Discuss the selected topic','Complete and reflect']],
 mentor:[['Explore peer mentoring','Learn about Link Points'],['Build a contextual profile','Add languages and expertise','Complete verification'],['Check the requested topic','Review time, mode and context'],['Review session context','Prepare useful resources'],['Share lived experience','Keep the session focused','Point to reliable sources'],['Complete the session','Receive contribution credit','Redeem Link Points']]
}
const points={student:[['University','Search','Social media','Friends'],['UniLink Groups'],['Group chat','Resources'],['Group','Find Mentor'],['Mentor list','Profile','Booking'],['Booking','Session','Completion']],mentor:[['Mentor hub','Rewards'],['Profile','Verification'],['Booking system'],['Booking details'],['Service flow'],['Completion','Rewards']]}
function lane(label,Icon,y,sub=''){return icon(Icon,36,y-22,24)+text(label,72,y,{size:15,weight:700,max:144})+(sub?text(sub,36,y+32,{size:14,color:muted,max:160,leading:20}):'')}
function bullets(items,x,y){let out='';for(const s of items){const lines=wrap(s,244,18);out+=`<circle cx="${x+3}" cy="${y-6}" r="3" fill="${blue}"/>`+text(s,x+18,y,{size:18,max:244,leading:25});y+=lines.length*25+12}return out}
function pills(items,x,y){let dx=0,out='';for(const s of items){const w=width(s,15)+24;if(dx+w>268){dx=0;y+=34}out+=rect(x+dx,y-20,w,27,'#e2eff8',13)+text(s,x+dx+12,y-2,{size:15,color:blue,max:270});dx+=w+7}return out}
for(const role of ['student','mentor']){
 const student=role==='student';const title=student?'From uncertainty to focused support':'From willingness to meaningful contribution'
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img"><title>${student?'Student':'Mentor'} journey map</title><desc>Illustrative synthesis. Emotion curves show qualitative changes, not participant measurements.</desc><defs><linearGradient id="curve" x1="0" x2="1"><stop stop-color="#427ab5"/><stop offset="1" stop-color="#279394"/></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#73bacd" stop-opacity=".25"/><stop offset="1" stop-color="#73bacd" stop-opacity=".015"/></linearGradient></defs>${rect(0,0,W,H,'#F7F5F1',28)}<g font-family="Inter,Arial,sans-serif">`
 svg+=text('UNILINK / USER JOURNEY MAP',36,49,{size:15,weight:700,color:blue,max:1200})+text(title,36,98,{size:36,weight:700,max:1900})+text('SYNTHESISED '+role.toUpperCase()+' EXPERIENCE',36,136,{size:14,weight:600,color:muted,max:1400})
 svg+=rect(1840,39,282,52,student?'#dfeefa':'#d9f0ed',26)+icon(student?Users:HandHeart,1858,52,24)+text(student?'LINA / FIRST-YEAR STUDENT':'AARAV / PEER MENTOR',1893,70,{size:13,weight:700,color:blue,max:220})
 svg+=lane('STAGE',Compass,221)+lane('GOAL',Target,321)+lane('ACTIONS',MousePointer2,416)+lane('TOUCHPOINTS',PanelsTopLeft,634)+lane('THOUGHTS',Quote,728)+lane('EMOTION',Activity,890)+text('More at ease ↑',36,922,{size:14,color:muted})+text('More uncertain ↓',36,946,{size:14,color:muted})+lane('FRICTION',TriangleAlert,1203)+lane('OPPORTUNITY',Lightbulb,1324)+lane('RESPONSE',Sparkles,1451)
 for(const y of [383,598,693,830,1165,1280,1405])svg+=`<path d="M226 ${y}H2122" stroke="${line}"/>`
 data[role].forEach((s,i)=>{const x=left+i*(cw+gap)
   svg+=rect(x,171,cw,197,i%2?'#e3f0f7':'#ddecf8',18)+rect(x+18,189,45,45,'#f8fcff',13)+icon(stageIcons[role][i],x+28,199,25)+text(String(i+1).padStart(2,'0'),x+cw-45,218,{size:16,weight:700,color:blue})
   svg+=text(s.title,x+18,265,{size:23,weight:700,max:268,leading:28})+text(s.goal,x+18,321,{size:17,color:muted,max:268,leading:23})
   svg+=bullets(actions[role][i],x+18,416)+pills(points[role][i],x+18,634)
   svg+=rect(x,709,cw,105,'#fff',14)+text(s.thought,x+18,737,{size:18,color:muted,max:264,leading:25})
   svg+=text(s.pain,x+18,1203,{size:18,max:268,leading:25})+text(s.opportunity,x+18,1324,{size:18,max:268,leading:25})
   svg+=rect(x,1423,cw,100,student?'#e0eff9':'#e1f1ed',14)+text(s.response,x+18,1451,{size:18,color:student?blue:teal,weight:600,max:268,leading:25})
 })
 // The curve is a qualitative illustration of the existing emotions and friction.
 const ys=student?[1040,955,906,1020,931,880]:[966,892,940,883,985,870]
 const xs=ys.map((_,i)=>left+i*(cw+gap)+cw/2)
 svg+=rect(left,851,1896,294,'#fff',20)
 for(const y of [895,975,1055])svg+=`<path d="M244 ${y}H2104" stroke="${line}" stroke-dasharray="4 8"/>`
 let path=`M${xs[0]} ${ys[0]}`;for(let i=1;i<xs.length;i++){const mid=(xs[i-1]+xs[i])/2;path+=` C${mid} ${ys[i-1]},${mid} ${ys[i]},${xs[i]} ${ys[i]}`}
 svg+=`<path d="${path} L${xs.at(-1)} 1125 L${xs[0]} 1125 Z" fill="url(#area)"/><path d="${path}" fill="none" stroke="url(#curve)" stroke-width="5" stroke-linecap="round"/>`
 data[role].forEach((s,i)=>{const x=xs[i],y=ys[i];const low=student?(i===0||i===3):i===4;const color=low?'#a5703e':teal
   svg+=`<path d="M${x} ${y+23}V1085" stroke="${line}" stroke-dasharray="3 5"/>`+`<circle cx="${x}" cy="${y}" r="24" fill="${low?'#fff1e1':'#e7f6f1'}" stroke="${color}" stroke-width="2"/>`+icon(low?(student?Frown:Meh):Smile,x-14,y-14,28,color)
   svg+=text(s.emotion,x,1113,{size:17,weight:600,color:ink,max:282,leading:22,anchor:'middle'})
 })
 svg+='</g></svg>'
 fs.writeFileSync(new URL(`../public/images/unilink/journey-${role}.svg`,import.meta.url),svg)
 console.log(`Updated ${role} journey: ${W} × ${H}`)
}
