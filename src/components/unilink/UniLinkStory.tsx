import { useEffect, useRef, useState } from 'react'
import '../../styles/unilink-story.css'

const videoSource = '/media/unilink/unilink-story-20261012.mp4'
const posterSource = '/media/unilink/unilink-story-poster-v2-20261012.webp'

export default function UniLinkStory() {
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!started || failed || !video) return

    video.focus({ preventScroll: true })
    const pauseWhenHidden = () => {
      if (document.hidden) video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    }, { threshold: 0 })

    observer.observe(video)
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      video.pause()
    }
  }, [started, failed])

  return (
    <section className="ul-section ul-story" id="unilink-introduction" aria-labelledby="unilink-story-title" tabIndex={-1}>
      <header className="ul-heading ul-story-heading">
        <span className="ul-kicker">01 / INTRODUCTION</span>
        <h2 id="unilink-story-title">The UniLink Story</h2>
        <div className="ul-lead">
          <p id="unilink-story-description">An introduction video to our Background &amp; Motivation, Main Design Concept, Prototype Demonstration and User Based Evaluation evidence.</p>
        </div>
      </header>

      <figure className="ul-story-player" data-lenis-prevent>
        {started && !failed ? (
          <video
            ref={videoRef}
            src={videoSource}
            poster={posterSource}
            width={2940}
            height={1656}
            controls
            playsInline
            autoPlay
            preload="none"
            tabIndex={0}
            aria-label="UniLink Group 12 introduction video"
            aria-describedby="unilink-story-description"
            onError={() => setFailed(true)}
          >
            Your browser does not support embedded video. <a href={videoSource}>Open the UniLink video</a>.
          </video>
        ) : (
          <button
            className="ul-story-play"
            type="button"
            aria-label={failed ? 'Retry the UniLink introduction video' : 'Play the UniLink introduction video'}
            onClick={() => { setFailed(false); setStarted(true) }}
          >
            <img src={posterSource} alt="INFO 30008 Interactive Technology Project — A2 Group 12 Presentation, UniLink" width={3428} height={1926} loading="lazy" decoding="async" />
            <svg className="ul-story-play-icon" viewBox="0 0 104 104" aria-hidden="true" focusable="false">
              <circle cx="52" cy="52" r="51.5" fill="#172b4c" fillOpacity=".4" stroke="#739fed" />
              <path d="M42 35 L70 52 L42 69 Z" fill="#74a3ef" stroke="#183552" strokeWidth=".7" />
            </svg>
          </button>
        )}
      </figure>
      {failed && <p className="ul-story-error" role="status">The video could not load. Try again, or <a href={videoSource}>open the video directly</a>.</p>}
    </section>
  )
}
