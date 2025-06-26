"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { faqData } from "@/lib/constants"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { currentLanguage, t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.faqTitle}</h2>
          <p className="text-xl text-gray-600">{t.frequentlyAskedQuestions}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => {
                    setOpenFaq(openFaq === index ? null : index)
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-[#0B1C39] text-lg">
                    {currentLanguage === "hi" ? faq.question : faq.questionEn}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-500" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-500" aria-hidden="true" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-700 leading-relaxed">
                        {currentLanguage === "hi" ? faq.answer : faq.answerEn}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
