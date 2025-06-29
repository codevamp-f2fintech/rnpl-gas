"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Users,
  Home,
  Utensils,
  HandHeart,
  Building2,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Target,
  Globe,
} from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export default function CSRPage() {
  const [activeTab, setActiveTab] = useState("impact")
  const { t, currentLanguage } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  const beneficiaryTypes = [
    {
      icon: Users,
      title: t.ngosNonProfits,
      description: t.supportingRegisteredNgos,
      count: "500+",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Heart,
      title: t.orphanages,
      description: t.providingCookingFuel,
      count: "200+",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Home,
      title: t.oldAgeHomes,
      description: t.supportingElderlyCare,
      count: "150+",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Utensils,
      title: t.communityKitchens,
      description: t.enablingSlumCommunity,
      count: "300+",
      color: "from-green-500 to-green-600",
    },
    {
      icon: HandHeart,
      title: t.homesForHandicapped,
      description: t.supportingSpeciallyAbled,
      count: "100+",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const impactStats = [
    {
      number: "1.2M+",
      label: t.freeCylindersDistributed,
      icon: Target,
    },
    {
      number: "50M+",
      label: t.mealsCooked,
      icon: Utensils,
    },
    {
      number: "1,250+",
      label: t.partnerOrganizations,
      icon: Users,
    },
    {
      number: "28",
      label: t.statesCovered,
      icon: Globe,
    },
  ]

  const partnerTypes = [
    {
      icon: Building2,
      title: t.corporatePartners,
      description: t.companiesContributingCsr,
      examples: ["Tata Group", "Reliance", "Infosys", "HDFC Bank"],
    },
    {
      icon: TrendingUp,
      title: t.investors,
      description: t.impactInvestorsSupporting,
      examples: ["Social Impact Funds", "ESG Investors", "Philanthropists"],
    },
    {
      icon: Award,
      title: t.governmentBodies,
      description: t.governmentPartnerships,
      examples: ["Ministry of Petroleum", "State Governments", "District Collectors"],
    },
  ]

  const contributionPlans = [
    {
      title: t.bronzeSupporter,
      amount: "₹50,000",
      cylinders: "100",
      benefits: [t.certificateAppreciation, t.quarterlyImpactReport, t.socialMediaRecognition],
      color: "from-amber-600 to-amber-700",
    },
    {
      title: t.silverSupporter,
      amount: "₹1,50,000",
      cylinders: "300",
      benefits: [t.allBronzeBenefits, t.siteVisitOpportunities, t.annualCsrReportFeature, t.taxBenefits80g],
      color: "from-gray-400 to-gray-500",
      popular: true,
    },
    {
      title: t.goldSupporter,
      amount: "₹5,00,000",
      cylinders: "1000",
      benefits: [t.allSilverBenefits, t.namingRightsPrograms, t.boardAdvisoryPosition, t.customImpactCampaigns],
      color: "from-yellow-500 to-yellow-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={true} />
      <LanguageSwitcher />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-[#0B1C39] via-blue-900 to-[#0B1C39] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400">
                {t.csrInitiative}
              </span>
              <br />
              {t.socialImpact}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              {t.providingFreeLpg}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => {
                  triggerHapticFeedback()
                  playClickSound(true)
                  document.getElementById("contribute")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                {t.contributeNow}
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>

              <button
                onClick={() => {
                  triggerHapticFeedback()
                  playClickSound(true)
                  setActiveTab("impact")
                }}
                className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-full text-lg hover:bg-green-400 hover:text-white transition-all duration-300"
              >
                {t.viewImpact}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-50 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-1 shadow-md">
              {[
                { id: "impact", label: t.ourImpact },
                { id: "beneficiaries", label: t.ourBeneficiaries },
                { id: "partners", label: t.ourPartners },
                { id: "contribute", label: t.contributeNow },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    triggerHapticFeedback()
                    playClickSound(true)
                    document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab.id ? "bg-orange-500 text-white shadow-md" : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.ourImpact}</h2>
            <p className="text-xl text-gray-600">{t.numbersReflectCommitment}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#0B1C39] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section id="beneficiaries" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.ourBeneficiaries}</h2>
            <p className="text-xl text-gray-600">{t.thoseWeServe}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficiaryTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center mr-4`}
                    >
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0B1C39]">{type.title}</h3>
                      <div className="text-2xl font-bold text-orange-500">{type.count}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.ourPartners}</h2>
            <p className="text-xl text-gray-600">{t.workingTogetherImpact}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <partner.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1C39] text-center mb-4">{partner.title}</h3>
                <p className="text-gray-600 text-center mb-6">{partner.description}</p>
                <div className="space-y-2">
                  {partner.examples.map((example, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {example}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Plans */}
      <section id="contribute" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.contributionPlans}</h2>
            <p className="text-xl text-gray-600">{t.makeYourContribution}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contributionPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  plan.popular ? "ring-2 ring-orange-500 transform scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {t.popular}
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B1C39] mb-2">{plan.title}</h3>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-orange-500 mb-2">{plan.amount}</div>
                    <div className="text-gray-600">
                      {plan.cylinders} {t.cylinders}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      triggerHapticFeedback()
                      playClickSound(true)
                    }}
                    className={`w-full py-3 font-bold rounded-lg transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
                    }`}
                  >
                    {t.contributeNow}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#0B1C39] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.contactCsrPartnership}</h2>
              <p className="text-xl text-gray-300">{t.buildBetterSociety}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">{t.contactDetails}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-orange-500 mr-4" />
                    <div>
                      <div className="font-semibold">{t.csrHelpline}</div>
                      <div className="text-gray-300">+91 1800-XXX-XXXX</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-orange-500 mr-4" />
                    <div>
                      <div className="font-semibold">{t.email}</div>
                      <div className="text-gray-300">csr@gharghargas.com</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-orange-500 mr-4" />
                    <div>
                      <div className="font-semibold">{t.address}</div>
                      <div className="text-gray-300">
                        {t.csrDepartment}
                        <br />
                        New Delhi, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">{t.quickContact}</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder={t.organizationName}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  />
                  <input
                    type="email"
                    placeholder={t.emailAddress}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  />
                  <textarea
                    rows={4}
                    placeholder={t.yourCsrRequirements}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                  ></textarea>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      triggerHapticFeedback()
                      playClickSound(true)
                    }}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                  >
                    {t.sendMessage}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
