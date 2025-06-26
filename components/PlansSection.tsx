"use client"

import { motion } from "framer-motion"
import { CheckCircle, Home, Building2, Star } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function PlansSection() {
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  const plans = [
    {
      icon: Home,
      title: t.domesticPlan,
      subtitle: "घरेलू प्लान",
      price: "₹1,500",
      emi: "₹15/day",
      duration: "3 months EMI",
      features: [t.lpgConnectionStove, t.safetyKitIncluded, t.monthlyRefillSupport, "24/7 Customer Support"],
      buttonText: t.chooseDomesticPlan,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
      ringColor: "focus:ring-blue-400/50",
    },
    {
      icon: Building2,
      title: t.commercialPlan,
      subtitle: "व्यापारिक प्लान",
      price: "₹5,000",
      emi: "₹55/day",
      duration: "3 months EMI",
      features: [
        t.commercialLpgSetup,
        t.heavyDutyEquipment,
        t.bulkDiscounts,
        t.priorityDelivery,
        t.businessGrowthSupport,
      ],
      buttonText: t.chooseCommercialPlan,
      gradient: "from-orange-500 to-orange-600",
      hoverGradient: "hover:from-orange-600 hover:to-orange-700",
      ringColor: "focus:ring-orange-400/50",
      special: t.businessSpecial,
      isSpecial: true,
    },
    {
      icon: Star,
      title: t.premiumPlan,
      subtitle: "प्रीमियम प्लान",
      price: "₹3,000",
      emi: "₹25/day",
      duration: "4 months EMI",
      features: [
        t.premiumLpgStove,
        t.advancedSafetyFeatures,
        t.unlimitedRefillSupport,
        t.priorityCustomerService,
        t.freeAnnualMaintenance,
      ],
      buttonText: t.choosePremiumPlan,
      gradient: "from-green-500 to-green-600",
      hoverGradient: "hover:from-green-600 hover:to-green-700",
      ringColor: "focus:ring-green-400/50",
    },
  ]

  return (
    <section id="plans" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.flexiblePlans}</h2>
          <p className="text-xl text-gray-600 mb-2">हर ग्राहक के लिए लचीली योजनाएं</p>
          <p className="text-lg text-orange-500 font-semibold">{t.noCostEmi}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
                plan.isSpecial
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white relative overflow-hidden"
                  : "bg-white"
              }`}
            >
              {plan.special && (
                <div className="absolute top-4 right-4 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {plan.special}
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      plan.isSpecial
                        ? "bg-white/20"
                        : `bg-gradient-to-r ${plan.gradient.replace("to-", "to-").replace("from-", "from-")}`
                    }`}
                  >
                    <plan.icon className={`w-10 h-10 ${plan.isSpecial ? "text-white" : "text-white"}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${plan.isSpecial ? "text-white" : "text-[#0B1C39]"}`}>
                    {plan.title}
                  </h3>
                  <p className={`${plan.isSpecial ? "text-orange-100" : "text-gray-600"}`}>{plan.subtitle}</p>
                </div>

                <div className="text-center mb-6">
                  <div className={`text-4xl font-bold mb-2 ${plan.isSpecial ? "text-white" : "text-[#0B1C39]"}`}>
                    {plan.price}
                  </div>
                  <div className={`text-lg font-semibold ${plan.isSpecial ? "text-white" : "text-orange-500"}`}>
                    {plan.emi}
                  </div>
                  <p className={`text-sm ${plan.isSpecial ? "text-orange-100" : "text-gray-500"}`}>{plan.duration}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${plan.isSpecial ? "text-green-300" : "text-green-500"}`} />
                      <span className={plan.isSpecial ? "text-white" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                  className={`w-full py-3 font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                    plan.isSpecial
                      ? "bg-white text-orange-600 hover:bg-gray-100 focus:ring-white/50"
                      : `bg-gradient-to-r ${plan.gradient} text-white ${plan.hoverGradient} ${plan.ringColor}`
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
