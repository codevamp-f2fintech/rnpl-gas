"use client"

import { motion } from "framer-motion"
import { CheckCircle, Home, Building2, Coffee, Factory, Users } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function NewConnectionSection() {
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  const businessTypes = [
    { icon: Coffee, name: t.teaStalls, nameHi: "चाय की दुकान" },
    { icon: Building2, name: t.restaurants, nameHi: "रेस्टोरेंट" },
    { icon: Factory, name: t.foodVendors, nameHi: "खाना विक्रेता" },
    { icon: Users, name: t.catering, nameHi: "कैटरिंग" },
  ]

  return (
    <section id="new-connection" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.newConnection}</h2>
          <p className="text-xl text-gray-600 mb-2">{t.getConnectionNowPayLater}</p>
          <p className="text-lg text-orange-500 font-semibold">अभी कनेक्शन लें, बाद में भुगतान करें</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Domestic Connection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1C39] mb-2">{t.domesticCustomers}</h3>
              <p className="text-gray-600">{t.domesticUse}</p>
            </div>

            <div className="space-y-4 mb-8">
              {[t.freeLpgConnection, t.twoburnerStove, t.safetyKit, t.customerSupport, t.emiStarting].map(
                (feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ),
              )}
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-[#0B1C39] mb-2">₹1,500</div>
              <div className="text-lg text-green-500 font-semibold">₹15/day EMI</div>
              <p className="text-sm text-gray-500">3 months EMI</p>
            </div>

            <button
              onClick={() => {
                triggerHapticFeedback()
                playClickSound(true)
              }}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            >
              {t.applyDomesticConnection}
            </button>
          </motion.div>

          {/* Commercial Connection */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 text-white relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold">
              {t.businessSpecial}
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.commercialCustomers}</h3>
              <p className="text-orange-100">{t.commercialUse}</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                t.commercialLpgConnection,
                t.heavyDutySetup,
                t.bulkDiscounts,
                t.priorityDelivery,
                t.businessGrowthSupport,
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold mb-2">₹5,000</div>
              <div className="text-lg font-semibold">₹55/day EMI</div>
              <p className="text-sm text-orange-100">3 months EMI</p>
            </div>

            <button
              onClick={() => {
                triggerHapticFeedback()
                playClickSound(true)
              }}
              className="w-full py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              {t.applyCommercialConnection}
            </button>
          </motion.div>
        </div>

        {/* Commercial Business Types */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-[#0B1C39] mb-8">{t.perfectForCommercial}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {businessTypes.map((business, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <business.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold text-[#0B1C39] text-sm">{business.name}</h4>
                <p className="text-xs text-gray-600">{business.nameHi}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
