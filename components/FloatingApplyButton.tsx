"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

interface FloatingApplyButtonProps {
  isVisible: boolean
}

export function FloatingApplyButton({ isVisible }: FloatingApplyButtonProps) {
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => {
            document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
            triggerHapticFeedback()
            playClickSound(true)
          }}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-green-400/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50"
          aria-label={t.applyNow}
        >
          <span className="flex items-center font-bold">
            {t.applyNow}
            <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
