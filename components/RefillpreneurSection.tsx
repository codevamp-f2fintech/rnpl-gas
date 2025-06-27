"use client"

import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function RefillpreneurSection() {
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  const benefits = [
    { text: t.noInvestmentRequired, hindi: "कोई निवेश नहीं" },
    { text: t.freeTrainingProvided, hindi: "मुफ्त प्रशिक्षण" },
    { text: t.serveBothCustomers, hindi: "" },
    { text: t.digitalPaymentSupport, hindi: "डिजिटल पेमेंट सपोर्ट" },
    { text: t.higherCommissionCommercial, hindi: "" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#0B1C39] to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold mb-6">{t.becomeRefillpreneur}</h2>
              <p className="text-xl text-gray-300 mb-8">
                ग्रामीण युवाओं और महिलाओं के लिए आय का नया अवसर। गैस रिफिल एजेंट बनकर महीने में ₹15,000 - ₹30,000 तक कमाएं। व्यापारिक
                ग्राहकों की सेवा करके अतिरिक्त आय पाएं।
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span>
                      {benefit.text} {benefit.hindi && `/ ${benefit.hindi}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">{t.applyToBecomeAgent}</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name / पूरा नाम"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number / फोन नंबर"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Village/City / गांव/शहर"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-orange-500 text-white focus:ring-2 focus:ring-orange-500">
                    <option value="" className="text-gray-800">
                      Select State / राज्य चुनें
                    </option>
                    <option value="up" className="text-gray-800">
                      Uttar Pradesh
                    </option>
                    <option value="bihar" className="text-gray-800">
                      Bihar
                    </option>
                    <option value="mp" className="text-gray-800">
                      Madhya Pradesh
                    </option>
                    <option value="rajasthan" className="text-gray-800">
                      Rajasthan
                    </option>
                    <option value="punjab" className="text-gray-800">
                      Punjab
                    </option>
                    <option value="other" className="text-gray-800">
                      Other
                    </option>
                  </select>
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-orange-500 text-white focus:ring-2 focus:ring-orange-500">
                    <option value="" className="text-gray-800">
                      Preferred Customer Type
                    </option>
                    <option value="domestic" className="text-gray-800">
                      Domestic Only
                    </option>
                    <option value="commercial" className="text-gray-800">
                      Commercial Only
                    </option>
                    <option value="both" className="text-gray-800">
                      Both Domestic & Commercial
                    </option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Why do you want to become a Refillpreneur? / आप रिफिलप्रेन्योर क्यों बनना चाहते हैं?"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-300 focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault()
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
                >
                  {t.submitApplication} / आवेदन जमा करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
