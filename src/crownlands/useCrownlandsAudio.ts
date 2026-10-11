import { useCallback, useEffect, useRef, useState } from 'react'

type CrownlandsSound = 'commit' | 'reveal' | 'pickup' | 'place' | 'flag' | 'spinner' | 'event' | 'round' | 'result'

const NOTES: Record<CrownlandsSound, [number, number]> = {
  commit: [196, .07], reveal: [293.66, .16], pickup: [164.81, .05], place: [220, .09],
  flag: [329.63, .18], spinner: [246.94, .22], event: [392, .22], round: [261.63, .3], result: [392, .5],
}

export function useCrownlandsAudio() {
  const contextRef = useRef<AudioContext | null>(null)
  const ambienceRef = useRef<{ gain: GainNode; oscillators: OscillatorNode[] } | null>(null)
  const [enabled, setEnabled] = useState(true)
  const [needsEntry, setNeedsEntry] = useState(true)
  const duckedRef = useRef(false)

  const ensureContext = useCallback(() => {
    if (!contextRef.current) contextRef.current = new AudioContext()
    return contextRef.current
  }, [])

  const startAmbience = useCallback(async () => {
    const context = ensureContext()
    await context.resume()
    if (!ambienceRef.current) {
      const gain = context.createGain()
      gain.gain.value = .018
      const filter = context.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 520
      gain.connect(filter).connect(context.destination)
      const oscillators = [73.42, 110, 146.83].map((frequency, index) => {
        const oscillator = context.createOscillator()
        const voiceGain = context.createGain()
        oscillator.type = index === 0 ? 'sine' : 'triangle'
        oscillator.frequency.value = frequency
        voiceGain.gain.value = index === 0 ? .46 : .16
        oscillator.connect(voiceGain).connect(gain)
        oscillator.start()
        return oscillator
      })
      ambienceRef.current = { gain, oscillators }
    }
    ambienceRef.current.gain.gain.setTargetAtTime(duckedRef.current ? .004 : .018, context.currentTime, .12)
    setEnabled(true)
    setNeedsEntry(false)
  }, [ensureContext])

  const stopAmbience = useCallback(() => {
    const context = contextRef.current
    if (context && ambienceRef.current) ambienceRef.current.gain.gain.setTargetAtTime(0, context.currentTime, .08)
    setEnabled(false)
  }, [])

  const toggle = useCallback(() => { if (enabled) stopAmbience(); else void startAmbience() }, [enabled, startAmbience, stopAmbience])

  useEffect(() => {
    if (!enabled || !needsEntry) return
    const unlock = () => { void startAmbience() }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [enabled, needsEntry, startAmbience])

  const play = useCallback((kind: CrownlandsSound) => {
    if (!enabled || document.hidden) return
    const context = ensureContext()
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
  }, [enabled, ensureContext])

  const duck = useCallback((active: boolean) => {
    duckedRef.current = active
    const context = contextRef.current
    if (!context || !ambienceRef.current || !enabled) return
    ambienceRef.current.gain.gain.setTargetAtTime(active ? .003 : .018, context.currentTime, .15)
  }, [enabled])

  useEffect(() => {
    const onVisibility = () => {
      const context = contextRef.current
      if (!context || !ambienceRef.current) return
      ambienceRef.current.gain.gain.setTargetAtTime(document.hidden ? 0 : enabled ? .018 : 0, context.currentTime, .12)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [enabled])

  useEffect(() => () => {
    ambienceRef.current?.oscillators.forEach((oscillator) => oscillator.stop())
    void contextRef.current?.close()
  }, [])

  return { enabled, needsEntry, enter: startAmbience, toggle, play, duck }
}
