"use client"

import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useAudio } from "@/hooks/useAudio"

interface HeaderProps {
  isScrolled: boolean
}

export function Header({ isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { triggerHapticFeedback, playClickSound } = useAudio()

  const navigationItems = [
    { name: t.home, href: "#home" },
    { name: t.newConnectionNav, href: "#new-connection" },
    { name: t.plans, href: "#plans" },
    { name: t.apply, href: "#apply" },
    { name: t.contact, href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-400 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0B1C39]">घर-Ghar गैस</h1>
              <p className="text-xs text-gray-600">{t.governmentOfIndia}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  triggerHapticFeedback()
                  playClickSound(true)
                }}
                className="text-[#0B1C39] hover:text-orange-500 transition-colors duration-300 font-medium relative group focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
              triggerHapticFeedback()
              playClickSound(true)
            }}
            className="md:hidden p-2 text-[#0B1C39] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4" role="navigation" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#0B1C39] hover:text-orange-500 transition-colors duration-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
                  onClick={() => {
                    setIsMenuOpen(false)
                    triggerHapticFeedback()
                    playClickSound(true)
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}