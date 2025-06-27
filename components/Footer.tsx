"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function Footer() {
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  return (
    <footer className="bg-black text-white py-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">{t.allRightsReserved}</p>
            <p className="text-gray-500 text-sm mt-1">{t.servingCustomers}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 mb-2">{t.visitUsAt}:</p>
            <a
              href="https://www.gharghargas.com"
              className="text-orange-500 hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black rounded"
              onClick={() => {
                triggerHapticFeedback()
                playClickSound(true)
              }}
            >
              www.gharghargas.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
