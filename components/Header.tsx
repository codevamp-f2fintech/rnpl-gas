"use client";

import { useState } from "react";
import { MapPin, Menu, X, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAudio } from "@/hooks/useAudio";
import Image from "next/image";

interface HeaderProps {
  isScrolled: boolean;
}

export function Header({ isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  const navigationItems = [
    { name: t.home, href: "#home" },
    { name: t.newConnectionNav, href: "#new-connection" },
    { name: t.plans, href: "#plans" },
    { name: t.apply, href: "#apply" },
    { name: t.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 h-21 ${
        isScrolled
          ? "bg-white shadow-lg py-2"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-[80vw]">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="border border-black rounded-[50%] p-2">
              <a href="/#">
                <Image
                  src="/logo.png" // replace with your image path
                  alt="Icon"
                  width={40}
                  height={40}
                />
              </a>
            </div>
            <div>
              <a href="/#">
                <h1 className="text-[15px] font-bold text-[#0B1C39]">
                  घर-Ghar गैस
                </h1>

                <p className="text-xs text-gray-600">{t.governmentOfIndia}</p>
              </a>
            </div>
          </div>
          <div className="flex gap-9">
            <div>
              <Image src="/ashok.jpeg" alt="AshokIcon" width={50} height={50} />
            </div>

            <div>
              <Image src="/images.png" alt="AshokIcon" width={80} height={80} />
            </div>
            <div className="flex justify-center  items-center text-blue-700 gap-2">
              <a className="flex gap-2.5" href="/serviceable-locations">
                <MapPin />
                <p>Locations</p>
              </a>
            </div>
          </div>
          {/* Desktop Navigation */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              triggerHapticFeedback();
              playClickSound(true);
            }}
            className="md:hidden p-2 text-[#0B1C39] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav
              className="flex flex-col space-y-3 pt-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#0B1C39] hover:text-orange-500 transition-colors duration-300 font-medium py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
                  onClick={() => {
                    setIsMenuOpen(false);
                    triggerHapticFeedback();
                    playClickSound(true);
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
  );
}
