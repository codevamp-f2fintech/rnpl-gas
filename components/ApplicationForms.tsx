"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Building2 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function ApplicationForms() {
  const [activeApplicationTab, setActiveApplicationTab] = useState("domestic")
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  return (
    <section id="apply" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.applyConnectionRefill}</h2>
          <p className="text-xl text-gray-600">कनेक्शन/रिफिल के लिए आवेदन करें</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => {
                setActiveApplicationTab("domestic")
                triggerHapticFeedback()
                playClickSound(true)
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeApplicationTab === "domestic"
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 hover:text-green-500"
              }`}
              aria-pressed={activeApplicationTab === "domestic"}
            >
              <Home className="w-5 h-5 inline mr-2" />
              {t.domesticApplication}
            </button>
            <button
              onClick={() => {
                setActiveApplicationTab("commercial")
                triggerHapticFeedback()
                playClickSound(true)
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeApplicationTab === "commercial"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:text-orange-500"
              }`}
              aria-pressed={activeApplicationTab === "commercial"}
            >
              <Building2 className="w-5 h-5 inline mr-2" />
              {t.commercialApplication}
            </button>
          </div>
        </div>

        {/* Application Forms */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeApplicationTab === "domestic" && (
              <motion.div
                key="domestic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-[#0B1C39] mb-6 text-center">{t.domesticConnectionRefillApp}</h3>
                <form className="grid md:grid-cols-2 gap-6" role="form" aria-label="Domestic application form">
                  <div>
                    <label htmlFor="domestic-name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.fullName} / पूरा नाम *
                    </label>
                    <input
                      id="domestic-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your full name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="domestic-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phoneNumber} / फोन नंबर *
                    </label>
                    <input
                      id="domestic-phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="+91 XXXXX XXXXX"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="domestic-address" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.address} / पता *
                    </label>
                    <input
                      id="domestic-address"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Complete address"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="domestic-state" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.state} / राज्य *
                    </label>
                    <select
                      id="domestic-state"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      aria-required="true"
                    >
                      <option value="">{t.selectState} / राज्य चुनें</option>
                      <option value="up">Uttar Pradesh</option>
                      <option value="bihar">Bihar</option>
                      <option value="mp">Madhya Pradesh</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="punjab">Punjab</option>
                      <option value="haryana">Haryana</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="domestic-service" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.serviceType} / सेवा प्रकार *
                    </label>
                    <select
                      id="domestic-service"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      aria-required="true"
                    >
                      <option value="">{t.selectService}</option>
                      <option value="new-connection">{t.newConnectionOption}</option>
                      <option value="refill">{t.refillOnly}</option>
                      <option value="both">{t.bothConnectionRefill}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="domestic-income" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.monthlyIncome} / मासिक आय
                    </label>
                    <select
                      id="domestic-income"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">{t.selectIncomeRange}</option>
                      <option value="below-10k">Below ₹10,000</option>
                      <option value="10k-25k">₹10,000 - ₹25,000</option>
                      <option value="25k-50k">₹25,000 - ₹50,000</option>
                      <option value="above-50k">Above ₹50,000</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="domestic-notes" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.additionalNotes} / अतिरिक्त जानकारी
                    </label>
                    <textarea
                      id="domestic-notes"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={t.specialRequirements}
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault()
                        triggerHapticFeedback()
                        playClickSound(true)
                      }}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/50"
                    >
                      {t.submitDomesticApp} / घरेलू आवेदन जमा करें
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeApplicationTab === "commercial" && (
              <motion.div
                key="commercial"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-[#0B1C39] mb-6 text-center">
                  {t.commercialConnectionRefillApp}
                </h3>
                <form className="grid md:grid-cols-2 gap-6" role="form" aria-label="Commercial application form">
                  <div>
                    <label htmlFor="commercial-business-name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.businessName} / व्यापार का नाम *
                    </label>
                    <input
                      id="commercial-business-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter business name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="commercial-owner-name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.ownerName} / मालिक का नाम *
                    </label>
                    <input
                      id="commercial-owner-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter owner name"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="commercial-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.phoneNumber} / फोन नंबर *
                    </label>
                    <input
                      id="commercial-phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+91 XXXXX XXXXX"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="commercial-business-type" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.businessType} / व्यापार प्रकार *
                    </label>
                    <select
                      id="commercial-business-type"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">{t.selectBusinessType}</option>
                      <option value="restaurant">Restaurant / रेस्टोरेंट</option>
                      <option value="tea-stall">Tea Stall / चाय की दुकान</option>
                      <option value="food-vendor">Food Vendor / खाना विक्रेता</option>
                      <option value="hotel">Hotel / होटल</option>
                      <option value="catering">Catering / कैटरिंग</option>
                      <option value="dhaba">Dhaba / ढाबा</option>
                      <option value="other">Other / अन्य</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="commercial-address" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.businessAddress} / व्यापार का पता *
                    </label>
                    <input
                      id="commercial-address"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Complete business address"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="commercial-state" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.state} / राज्य *
                    </label>
                    <select
                      id="commercial-state"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">{t.selectState} / राज्य चुनें</option>
                      <option value="up">Uttar Pradesh</option>
                      <option value="bihar">Bihar</option>
                      <option value="mp">Madhya Pradesh</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="punjab">Punjab</option>
                      <option value="haryana">Haryana</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="commercial-service" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.serviceType} / सेवा प्रकार *
                    </label>
                    <select
                      id="commercial-service"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">{t.selectService}</option>
                      <option value="new-connection">{t.newCommercialConnection}</option>
                      <option value="refill">{t.bulkRefillService}</option>
                      <option value="both">{t.bothConnectionRefill}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="commercial-revenue" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.monthlyRevenue} / मासिक आय *
                    </label>
                    <select
                      id="commercial-revenue"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      aria-required="true"
                    >
                      <option value="">{t.selectRevenueRange}</option>
                      <option value="below-50k">Below ₹50,000</option>
                      <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                      <option value="1l-3l">₹1,00,000 - ₹3,00,000</option>
                      <option value="above-3l">Above ₹3,00,000</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="commercial-employees" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.numberOfEmployees} / कर्मचारियों की संख्या
                    </label>
                    <select
                      id="commercial-employees"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{t.selectRange}</option>
                      <option value="1-5">1-5 employees</option>
                      <option value="6-15">6-15 employees</option>
                      <option value="16-50">16-50 employees</option>
                      <option value="above-50">Above 50 employees</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="commercial-notes" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.businessRequirements} / व्यापारिक आवश्यकताएं
                    </label>
                    <textarea
                      id="commercial-notes"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder={t.businessGasRequirements}
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault()
                        triggerHapticFeedback()
                        playClickSound(true)
                      }}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
                    >
                      {t.submitCommercialApp} / व्यापारिक आवेदन जमा करें
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
