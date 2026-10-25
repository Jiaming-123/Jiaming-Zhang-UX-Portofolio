import { useUniLinkCopy } from '../../i18n/unilink'
import { useEffect, useRef, useState } from 'react'
import '../../styles/unilink-story.css'
import TranslatedImage from './TranslatedImage'
import { useLanguage } from '../../i18n/language-context'

const englishVideoSource = '/media/unilink/unilink-presentation-20261015.mp4'
const chineseVideoSource = '/media/unilink/unilink-presentation-zh-20261025.mp4'
const posterSource = '/media/unilink/unilink-story-poster-v2-20261012.webp'

export default function UniLinkStory() {
  const t = useUniLinkCopy()
  const { isChinese } = useLanguage()
  const selectedSource = isChinese ? chineseVideoSource : englishVideoSource
  const [videoSource, setVideoSource] = useState(selectedSource)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const resumePlayback = useRef<{ time: number; playing: boolean } | null>(null)

  useEffect(() => {
    if (videoSource === selectedSource) return
    const video = videoRef.current
    resumePlayback.current = video ? { time: video.currentTime, playing: !video.paused } : null
    setVideoSource(selectedSource)
  }, [selectedSource, videoSource])

  const restorePlayback = () => {
    const video = videoRef.current
    const resume = resumePlayback.current
    if (!video || !resume) return
    resumePlayback.current = null
    video.currentTime = Math.min(resume.time, video.duration || resume.time)
    if (resume.playing) void video.play().catch(() => { /* Native controls remain available. */ })
    else video.pause()
  }

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
        <span className="ul-kicker">{t("01 / INTRODUCTION")}</span>
        <h2 id="unilink-story-title">{t("The UniLink Story")}</h2>
        <div className="ul-lead">
          <p id="unilink-story-description">{t("An introduction video to our Background & Motivation, Main Design Concept, Prototype Demonstration and User Based Evaluation evidence.")}</p>
        </div>
      </header>

      <figure className="ul-story-player" data-lenis-prevent>
        {started && !failed ? (
          <video
            ref={videoRef}
            src={videoSource}
            poster={posterSource}
            width={1916}
            height={1080}
            controls
            playsInline
            autoPlay
            preload="none"
            tabIndex={0}
            aria-label={t("UniLink Group 12 introduction video")}
            aria-describedby="unilink-story-description"
            onLoadedMetadata={restorePlayback}
            onError={() => setFailed(true)}
          >
            {t("Your browser does not support embedded video.")} <a href={videoSource}>{t("Open the UniLink video")}</a>.
          </video>
        ) : (
          <button
            className="ul-story-play"
            type="button"
            aria-label={failed ? t("Retry the UniLink introduction video") : t("Play the UniLink introduction video")}
            onClick={() => { setFailed(false); setStarted(true) }}
          >
            <TranslatedImage src={posterSource} alt={t("INFO 30008 Interactive Technology Project — A2 Group 12 Presentation, UniLink")} width={3428} height={1926} />
            <svg className="ul-story-play-icon" viewBox="0 0 104 104" aria-hidden="true" focusable="false">
              <circle cx="52" cy="52" r="51.5" fill="#172b4c" fillOpacity=".4" stroke="#739fed" />
              <path d="M42 35 L70 52 L42 69 Z" fill="#74a3ef" stroke="#183552" strokeWidth=".7" />
            </svg>
          </button>
        )}
      </figure>
      {failed && <p className="ul-story-error" role="status">{t("The video could not load. Try again, or")} <a href={videoSource}>{t("open the video directly")}</a>.</p>}
    </section>
  )
}
