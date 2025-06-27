"use client"

import { Award, Shield, CheckCircle, Users } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export function TrustBadges() {
  const { t } = useLanguage()

  const badges = [
    { icon: Award, text: t.governmentOfIndia, color: "text-orange-500" },
    { icon: Shield, text: t.ujjwalaPartner, color: "text-green-500" },
    { icon: CheckCircle, text: t.rbiApproved, color: "text-blue-500" },
    { icon: Users, text: t.happyCustomers, color: "text-purple-500" },
  ]

  return (
    <section className="py-8 bg-gray-50 border-b" aria-label="Trust badges and certifications">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2">
              <badge.icon className={`w-8 h-8 ${badge.color}`} aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
