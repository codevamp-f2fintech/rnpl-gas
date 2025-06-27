"use client"

import { Phone, Mail, Users } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

export function ContactSection() {
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  return (
    <section id="contact" className="py-20 bg-[#0B1C39] text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">{t.getInTouch}</h2>
            <form className="space-y-6" role="form" aria-label="Contact form">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                  {t.name} / नाम
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                  {t.phone} / फोन
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                  {t.message} / संदेश
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                  placeholder={t.howCanWeHelp}
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
                {t.sendMessage}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">{t.contactInformation}</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-orange-500 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold mb-1">{t.phone}</h3>
                  <p className="text-gray-300">{t.tollFree}</p>
                  <p className="text-gray-300">+91 XXXXX XXXXX</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-orange-500 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold mb-1">{t.email}</h3>
                  <p className="text-gray-300">support@gharghargas.com</p>
                  <p className="text-gray-300">commercial@gharghargas.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-orange-500 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-bold mb-1">Customer Support</h3>
                  <p className="text-gray-300">{t.domesticSupport}</p>
                  <p className="text-gray-300">{t.commercialSupport}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">{t.followUs}</h3>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    onClick={() => {
                      triggerHapticFeedback()
                      playClickSound(true)
                    }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0B1C39]"
                    aria-label={`Follow us on ${social}`}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
