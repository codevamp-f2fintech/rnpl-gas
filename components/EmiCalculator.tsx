"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function EMICalculator() {
  const [isEmiCalculatorOpen, setIsEmiCalculatorOpen] = useState(false)
  const [emiAmount, setEmiAmount] = useState(1000)
  const [emiPlan, setEmiPlan] = useState("monthly")
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  const calculateEMI = () => {
    const plans = {
      daily: Math.ceil(emiAmount / 120), // 4 months = 120 days
      weekly: Math.ceil(emiAmount / 16), // 4 months = 16 weeks
      monthly: Math.ceil(emiAmount / 4), // 4 months
    }
    return plans[emiPlan as keyof typeof plans]
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => {
            setIsEmiCalculatorOpen(!isEmiCalculatorOpen)
            triggerHapticFeedback()
            playClickSound(true)
          }}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          aria-label={t.emiCalculator}
        >
          <CreditCard className="w-6 h-6" />
        </button>

        <AnimatePresence>
          {isEmiCalculatorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-full left-0 mb-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-80"
            >
              <h3 className="font-bold text-gray-800 mb-4 text-center">{t.emiCalculator}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.amount} / राशि: ₹{emiAmount}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹500</span>
                    <span>₹10,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.emiPlan} / EMI योजना</label>
                  <select
                    value={emiPlan}
                    onChange={(e) => setEmiPlan(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="daily">{t.daily} / दैनिक</option>
                    <option value="weekly">{t.weekly} / साप्ताहिक</option>
                    <option value="monthly">{t.monthly} / मासिक</option>
                  </select>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹{calculateEMI()}</div>
                    <div className="text-sm text-gray-600">
                      {t.per} {emiPlan === "daily" ? t.day : emiPlan === "weekly" ? t.week : t.month}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsEmiCalculatorOpen(false)
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                  className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.applyNowEmi} / अभी आवेदन करें
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
