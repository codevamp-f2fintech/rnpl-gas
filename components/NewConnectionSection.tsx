"use client"

import { motion } from "framer-motion"
import { CheckCircle, Building2, Coffee, Factory, Users, Star } from "lucide-react"
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

  const domesticPlans = [
    {
      id: "refill-only",
      title: t.rnplRefillOnly || "RNPL Refill Only",
      loanAmount: "₹850",
      actualCharges: "₹850",
      benefit: "₹0",
      dailyEmi: "₹7",
      monthlyEmi: "₹212",
      tenure: "2-4 months",
      features: [
        t.onlyRefillNoConnection || "Only refill, no new connection",
        t.walletTopupSupport || "Wallet top-up support",
        // t.cashbackFirstPayment || "₹50 cashback on first on-time repayment",
        t.aadhaarPanOnboarding || "Aadhaar + PAN onboarding",
        // t.optionalInsurance || "Optional insurance: ₹250/year",
      ],
      popular: false,
    },
    {
      id: "connection-refill",
      title: t.rnplConnectionRefill || "No Cost EMI Connection + 1 Refill",
      loanAmount: "₹5,369",
      actualCharges: "₹4,500",
      benefit: "₹869",
      dailyEmi: "₹30",
      monthlyEmi: "₹895",
      tenure: "2-6 months",
      features: [
        t.newConnectionWithRefill || "New connection with refill",
        t.burnerPipeRegulator || "Burner, pipe & regulator included",
        t.safetyInspectionVoucher || "Safety inspection voucher",
        t.loyaltyCashback || "₹100 loyalty cashback",
        t.referralReward || "Referral reward ₹200",
      ],
      popular: true,
    },
    {
      id: "connection-six-refills",
      title: t.rnplConnectionSixRefills || "No Cost EMI Connection + 6 Refills",
      loanAmount: "₹11,369",
      actualCharges: "₹9,600",
      benefit: "₹1,769",
      dailyEmi: "₹32",
      monthlyEmi: "₹948",
      tenure: "2-12 months",
      features: [
        t.newConnectionSixRefills || "New connection and 6 refills",
        t.prioritySafetyService || "Priority safety service",
        t.cashbackAfterRefills || "₹200 cashback after 2 refills",
        t.earlyRepaymentCoupon || "Early repayment coupon ₹500",
        t.referralReward || "Referral reward ₹300",
      ],
      popular: false,
    },
  ]

  const commercialPlans = [
    {
      id: "commercial-six",
      title: t.rnplCommercialSix || "RNPL Commercial - 6 Refills",
      loanAmount: "₹11,369",
      refills: "6 x ₹1,800",
      setupFee: "₹569",
      dailyEmi: "₹95",
      monthlyEmi: "₹2,842",
      tenure: "2-4 months",
      features: [
        t.idealSmallEateries || "Ideal for small eateries",
        t.bulkRefillSupport || "Bulk refill support",
        t.dedicatedSupportLine || "Dedicated support line",
        t.qrBasedTracking || "QR-based usage tracking",
        t.optionalInsurance || "Optional insurance: ₹500/year",
      ],
      popular: false,
    },
    {
      id: "commercial-eight",
      title: t.rnplCommercialEight || "RNPL Commercial - 8 Refills",
      loanAmount: "₹15,369",
      refills: "8 x ₹1,800",
      setupFee: "₹969",
      dailyEmi: "₹85",
      monthlyEmi: "₹2,562",
      tenure: "2-6 months",
      features: [
        t.mediumKitchens || "For medium kitchens",
        t.higherRefillBuffer || "Higher refill buffer",
        t.bulkPurchaseDiscounts || "Bulk purchase discounts",
        t.cashbackAfterRepayment || "₹500 cashback after repayment",
        t.optionalInsurance || "Optional insurance: ₹750/year",
      ],
      popular: true,
    },
    {
      id: "commercial-twelve",
      title: t.rnplCommercialTwelve || "RNPL Commercial - 12 Refills",
      loanAmount: "₹25,369",
      refills: "12 x ₹1,800",
      setupFee: "₹3,769",
      dailyEmi: "₹70",
      monthlyEmi: "₹2,114",
      tenure: "2-12 months",
      features: [
        t.largeCommercialKitchens || "Large commercial kitchens",
        t.highestRefillFlexibility || "Highest refill flexibility",
        t.onsiteSafetyInspections || "On-site safety inspections",
        t.cashbackOnClosure || "₹1,000 cashback on closure",
        t.optionalInsurance || "Optional insurance: ₹1,000/year",
      ],
      popular: false,
    },
  ]

  return (
    <section id="new-connection" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.newConnection}</h2>
          <p className="text-xl text-gray-600 mb-2">{t.rnplVision}</p>
          <p className="text-lg text-orange-500 font-semibold">{t.rnplTagline}</p>
        </div>

        {/* Domestic Plans */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-[#0B1C39] mb-12">{t.domesticCustomers}</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {domesticPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-green-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {t.popular || "Popular"}
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-[#0B1C39] mb-4">{plan.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.loanAmount}:</span>
                      <span className="font-semibold">{plan.loanAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.actualCharges}:</span>
                      <span>{plan.actualCharges}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>{t.benefit}:</span>
                      <span className="font-semibold">{plan.benefit}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-[#0B1C39] mb-2">{plan.dailyEmi}/day</div>
                  <div className="text-lg text-green-500 font-semibold">{plan.monthlyEmi}/month</div>
                  <p className="text-sm text-gray-500">{plan.tenure}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                  className={`w-full py-3 font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-400/50"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-400/50"
                  }`}
                >
                  {t.applyNow}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commercial Plans */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-[#0B1C39] mb-12">{t.commercialCustomers}</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {commercialPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 text-white ${
                  plan.popular ? "ring-2 ring-yellow-400 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-orange-800 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {t.popular || "Popular"}
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold mb-4">{plan.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.loanAmount}:</span>
                      <span className="font-semibold">{plan.loanAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.refills}:</span>
                      <span>{plan.refills}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.setupFee}:</span>
                      <span>{plan.setupFee}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl font-bold mb-2">{plan.dailyEmi}/day</div>
                  <div className="text-lg font-semibold">{plan.monthlyEmi}/month</div>
                  <p className="text-sm text-orange-100">{plan.tenure}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                  className="w-full py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  {t.applyNow}
                </button>
              </motion.div>
            ))}
          </div>
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

        {/* Terms & Conditions
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-[#0B1C39] mb-6">{t.termsConditions}</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <p>• {t.walletValidity}</p>
              <p>• {t.flexibleTenure}</p>
              <p>• {t.foreclosureAnytime}</p>
              <p>• {t.latePaymentFee}</p>
              <p>• {t.emiCollection}</p>
            </div>
            <div className="space-y-2">
              <p>• {t.aadhaarPanMandatory}</p>
              <p>• {t.walletLockedLpg}</p>
              <p>• {t.cashbackRewardsThirtyDays}</p>
              <p>• {t.collectionCharges}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-orange-600">{t.finalMessage}</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}
