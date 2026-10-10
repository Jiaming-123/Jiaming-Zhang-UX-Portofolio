const music = new Audio('/crownlands/audio/background-music.mp3?v=20260911')

music.loop = true
music.preload = 'auto'
music.volume = 0.11

let soundEnabled = true
let videoIsPlaying = false
let gestureFallbackArmed = false

const isGameActive = () =>
  window.location.pathname === '/projects/crownlands' &&
  document.body.classList.contains('crownlands-game-active')

const setBalancedVolume = () => {
  music.volume = videoIsPlaying ? 0.035 : 0.11
}

const disarmGestureFallback = () => {
  if (!gestureFallbackArmed) return
  window.removeEventListener('pointerdown', retryAfterGesture, true)
  window.removeEventListener('keydown', retryAfterGesture, true)
  gestureFallbackArmed = false
}

const armGestureFallback = () => {
  if (gestureFallbackArmed) return
  gestureFallbackArmed = true
  window.addEventListener('pointerdown', retryAfterGesture, true)
  window.addEventListener('keydown', retryAfterGesture, true)
}

async function playMusic() {
  if (!soundEnabled || !isGameActive() || document.hidden) return
  setBalancedVolume()
  try {
    await music.play()
    disarmGestureFallback()
  } catch {
    armGestureFallback()
  }
}

function retryAfterGesture() {
  disarmGestureFallback()
  void playMusic()
}

const syncMusic = () => {
  if (soundEnabled && isGameActive() && !document.hidden) {
    void playMusic()
  } else {
    music.pause()
  }
}

document.addEventListener('click', (event) => {
  const soundButton = event.target.closest?.('.cl-sound')
  if (!soundButton) return

  window.setTimeout(() => {
    const updatedButton = document.querySelector('.cl-sound')
    soundEnabled = !updatedButton?.getAttribute('aria-label')?.toLowerCase().includes('sound on')
    syncMusic()
  }, 0)
})

document.addEventListener('play', (event) => {
  if (!(event.target instanceof HTMLVideoElement)) return
  videoIsPlaying = true
  setBalancedVolume()
}, true)

document.addEventListener('pause', (event) => {
  if (!(event.target instanceof HTMLVideoElement)) return
  videoIsPlaying = false
  setBalancedVolume()
}, true)

document.addEventListener('visibilitychange', syncMusic)

new MutationObserver(syncMusic).observe(document.body, {
  attributes: true,
  attributeFilter: ['class'],
  childList: true,
  subtree: true,
})

syncMusic()
