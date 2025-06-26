"use client"

import { useRef } from "react"

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playClickSound = (isSoundEnabled: boolean) => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {}) // Ignore errors
    }
  }

  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50) // Short vibration
    }
  }

  return {
    audioRef,
    playClickSound,
    triggerHapticFeedback,
  }
}
