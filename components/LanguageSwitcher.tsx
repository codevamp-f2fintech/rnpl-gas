"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { languages } from "@/lib/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useAudio } from "@/hooks/useAudio";

export function LanguageSwitcher() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  const currentLang = languages.find((lang) => lang.code === currentLanguage);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode as any);
    setIsLanguageOpen(false);
    triggerHapticFeedback();
    playClickSound(true);

    // Force a re-render by dispatching a custom event
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageOpen]);

  return (
    <div className="fixed top-4 right-4 z-50" ref={menuRef}>
      <div className="relative">
        <button
          onClick={() => {
            setIsLanguageOpen(!isLanguageOpen);
            triggerHapticFeedback();
            playClickSound(true);
          }}
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Select Language"
        >
          <Globe className="w-4 h-4 text-[#0B1C39]" />
          <span className="text-sm font-medium text-[#0B1C39]">
            {currentLang?.name} ({currentLang?.abbr})
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#0B1C39] transition-transform ${
              isLanguageOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isLanguageOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] max-h-80 overflow-y-auto"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                    currentLanguage === lang.code
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-sm">{lang.name}</span>
                  <span className="text-xs text-gray-500">{lang.abbr}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
