import { useId } from 'react'
import { Gift, GraduationCap, Link2, UsersRound } from 'lucide-react'
import '../../styles/unilink-ecosystem.css'

const participants = [
  { role: 'students', title: 'Students', Icon: UsersRound, text: 'Receive relevant peer support and bookable mentor guidance.' },
  { role: 'mentors', title: 'Mentors', Icon: GraduationCap, text: 'Contribute lived experience, earn Link Points and redeem rewards.' },
  { role: 'sponsors', title: 'Sponsors', Icon: Gift, text: 'Fund rewards and gain clearly labelled exposure around the Rewards experience.' },
]

export default function UniLinkEcosystem() {
  const markerId = `ul-cycle-${useId().replace(/:/g, '')}`
  return <figure className="ul-ecosystem" aria-label="UniLink at the centre of a triangular cycle connecting students, mentors and sponsors">
    <svg className="ul-ecosystem-connections" viewBox="0 0 1000 680" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs><marker id={markerId} viewBox="0 0 12 12" refX="8" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M2 2 L8 6 L2 10" /></marker></defs>
      <g className="ul-ecosystem-spokes"><path d="M500 315 V150" /><path d="M435 395 L150 535" /><path d="M565 395 L850 535" /></g>
      <g className="ul-ecosystem-cycle" markerMid={`url(#${markerId})`}><path d="M560 145 L685 305 L850 520" /><path d="M850 560 H500 H150" /><path d="M150 520 L315 305 L440 145" /></g>
    </svg>
    <div className="ul-ecosystem-hub"><Link2 aria-hidden="true" /><strong>UniLink</strong><span>PEER SUPPORT</span></div>
    {participants.map(({ role, title, Icon, text }) => <article className={`ul-ecosystem-node ul-ecosystem-node--${role}`} key={role}>
      <span className="ul-ecosystem-icon"><Icon aria-hidden="true" strokeWidth={1.6} /></span>
      <h3>{title}</h3><p>{text}</p>
    </article>)}
  </figure>
}
