import { useCallback, useEffect, useRef, useState } from 'react'

type CrownlandsSound = 'commit' | 'reveal' | 'pickup' | 'place' | 'flag' | 'spinner' | 'event' | 'round' | 'result'

const NOTES: Record<CrownlandsSound, [number, number]> = {
  commit: [196, .07], reveal: [293.66, .16], pickup: [164.81, .05], place: [220, .09],
  flag: [329.63, .18], spinner: [246.94, .22], event: [392, .22], round: [261.63, .3], result: [392, .5],
}

export function useCrownlandsAudio(gameActive: boolean) {
  const contextRef = useRef<AudioContext | null>(null)
  // The shared music runtime reads the button's aria-pressed state.
  const [enabled, setEnabled] = useState(true)
  const toggle = useCallback(() => setEnabled(value => !value), [])

  const play = useCallback((kind: CrownlandsSound) => {
    if (!gameActive || document.hidden) return
    const context = contextRef.current ??= new AudioContext()
    void context.resume()
    const [frequency, duration] = NOTES[kind]
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = kind === 'spinner' ? 'triangle' : 'sine'
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(70, frequency * .78), context.currentTime + duration)
    gain.gain.setValueAtTime(.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(.035, context.currentTime + .012)
    gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + duration + .02)
  }, [gameActive])

  useEffect(() => () => { void contextRef.current?.close() }, [])
  return { enabled, toggle, play }
}
