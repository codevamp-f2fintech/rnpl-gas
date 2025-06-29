"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/lib/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useAudio } from "@/hooks/useAudio";
import { CircleCheck, Minus, Plus, QuestionMarkCircle } from "lucide-react";

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currentLanguage, t } = useLanguage();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">
            {t.faqTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.frequentlyAskedQuestions}
          </p>
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
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <button
                  onClick={() => {
                    setOpenFaq(openFaq === index ? null : index);
                    triggerHapticFeedback();
                    playClickSound(true);
                  }}
                  className="w-full px-8 py-6 text-left flex items-center justify-between transition-all duration-300"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 p-2 rounded-lg ">
                      <CircleCheck className="w-6 h-6  text-blue-500" />
                    </div>
                    <span className="font-semibold text-[#0B1C39] text-lg text-left">
                      {currentLanguage === "hi" ? faq.question : faq.questionEn}
                    </span>
                  </div>
                  <div className="ml-4 shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-6 h-6 text-orange-500" />
                    ) : (
                      <Plus className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 ml-14">
                        <div className="border-l-2 border-blue-500 pl-4">
                          <p className="text-gray-700 leading-relaxed">
                            {currentLanguage === "hi"
                              ? faq.answer
                              : faq.answerEn}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}