"use client"

import { useState, useEffect } from "react"

export function useAccessibility() {
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<"small" | "normal" | "large" | "xl">("normal")
  const [isScreenReaderMode, setIsScreenReaderMode] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement

    if (isHighContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    root.classList.remove("font-small", "font-normal", "font-large", "font-xl")
    root.classList.add(`font-${fontSize}`)

    if (isScreenReaderMode) {
      root.classList.add("screen-reader-mode")
    } else {
      root.classList.remove("screen-reader-mode")
    }
  }, [isHighContrast, fontSize, isScreenReaderMode])

  return {
    isHighContrast,
    setIsHighContrast,
    fontSize,
    setFontSize,
    isScreenReaderMode,
    setIsScreenReaderMode,
    isSoundEnabled,
    setIsSoundEnabled,
  }
}
