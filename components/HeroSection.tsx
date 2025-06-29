"use client"

import { motion } from "framer-motion"
import { ArrowRight, Home, Building2 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

interface HeroSectionProps {
  isLiteMode: boolean
}

export function HeroSection({ isLiteMode }: HeroSectionProps) {
  const { currentLanguage, t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1C39] via-blue-900 to-[#0B1C39] overflow-hidden"
      role="banner"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
      </div>

      {/* Animated Background Elements */}
      {!isLiteMode && (
        <div className="absolute inset-0" aria-hidden="true">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-20 left-10 w-20 h-20 bg-orange-500/20 rounded-full"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-32 right-16 w-16 h-16 bg-green-400/20 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/2 left-1/4 w-12 h-12 bg-orange-500/30 rounded-full"
          />
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {
              t.title
            }
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-white mb-4"
          >
            {/* {currentLanguage === "en" ? "with Clean Cooking" : ""} */}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
          >
            {t.subtitle}
          </motion.p>

          {/* Customer Type Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Home className="w-5 h-5 text-green-400" />
              <span className="text-white text-sm">{t.domesticCustomers}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Building2 className="w-5 h-5 text-orange-400" />
              <span className="text-white text-sm">{t.commercialCustomers}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => {
                triggerHapticFeedback()
                playClickSound(true)
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-full text-lg shadow-2xl hover:shadow-green-400/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50"
              aria-label={t.applyConnection}
            >
              <span className="relative z-10 flex items-center">
                {t.applyConnection}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => {
                triggerHapticFeedback()
                playClickSound(true)
              }}
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-full text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
              aria-label={t.applyRefill}
            >
              {t.applyRefill}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isLiteMode && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
