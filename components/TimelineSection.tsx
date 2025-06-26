"use client"

import { motion } from "framer-motion"
import { FileText, Shield, CheckCircle, Truck, CreditCard } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export function TimelineSection() {
  const { currentLanguage, t } = useLanguage()

  const timelineSteps = [
    {
      title: "Apply Online",
      titleHi: "ऑनलाइन आवेदन करें",
      icon: FileText,
      description: "Fill simple form",
      descriptionHi: "सरल फॉर्म भरें",
    },
    {
      title: "Get App Score",
      titleHi: "ऐप स्कोर पाएं",
      icon: Shield,
      description: "Instant evaluation",
      descriptionHi: "तुरंत मूल्यांकन",
    },
    {
      title: "EMI Plan Approval",
      titleHi: "EMI प्लान अप्रूवल",
      icon: CheckCircle,
      description: "Quick approval",
      descriptionHi: "त्वरित अनुमोदन",
    },
    {
      title: "Connection/Refill Delivered",
      titleHi: "कनेक्शन/रिफिल डिलीवर",
      icon: Truck,
      description: "Home/Business delivery",
      descriptionHi: "घर/व्यापार तक डिलीवरी",
    },
    {
      title: "Pay in Easy Installments",
      titleHi: "आसान किस्तों में भुगतान",
      icon: CreditCard,
      description: "Flexible payments",
      descriptionHi: "लचीला भुगतान",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.howItWorks}</h2>
          <p className="text-xl text-gray-600">{t.fiveEasySteps}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-green-400 hidden md:block"
              aria-hidden="true"
            ></div>

            {/* Timeline Steps */}
            <div className="space-y-12 md:space-y-16">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col md:space-x-8`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center md:mb-0 mb-6`}
                  >
                    <h3 className="text-2xl font-bold text-[#0B1C39] mb-2">
                      {currentLanguage === "hi" ? step.titleHi : step.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {currentLanguage === "hi" ? step.descriptionHi : step.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                      <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-500">{index + 1}</span>
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
