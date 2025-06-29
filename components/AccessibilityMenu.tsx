"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useAudio } from "@/hooks/useAudio";

export function AccessibilityMenu() {
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);
  const { t } = useLanguage();
  const {
    isHighContrast,
    setIsHighContrast,
    fontSize,
    setFontSize,
    isScreenReaderMode,
    setIsScreenReaderMode,
    isSoundEnabled,
    setIsSoundEnabled,
  } = useAccessibility();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccessibilityMenuOpen(false);
      }
    };

    if (isAccessibilityMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccessibilityMenuOpen]);

  return (
    <div className="fixed bottom-20 left-4 z-50" ref={menuRef}>
      <div className="relative">
        <button
          onClick={() => {
            setIsAccessibilityMenuOpen(!isAccessibilityMenuOpen);
            triggerHapticFeedback();
            playClickSound(isSoundEnabled);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label={t.accessibilityMenu}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium sr-only md:not-sr-only">
            Accessibility Menu
          </span>
        </button>

        <AnimatePresence>
          {isAccessibilityMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-4 px-4 min-w-[250px]"
            >
              <h3 className="font-bold text-gray-800 mb-3">
                {t.accessibilityMenu}
              </h3>

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-700">{t.highContrast}</span>
                <button
                  onClick={() => {
                    setIsHighContrast(!isHighContrast);
                    triggerHapticFeedback();
                    playClickSound(isSoundEnabled);
                  }}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    isHighContrast ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-pressed={isHighContrast}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isHighContrast ? "translate-x-5" : "translate-x-1"
                    } mt-1`}
                  />
                </button>
              </div>

              {/* Font Size Controls */}
              <div className="mb-3">
                <span className="text-sm text-gray-700 block mb-2">
                  {t.fontSize}
                </span>
                <div className="flex space-x-2">
                  {(["small", "normal", "large", "xl"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setFontSize(size);
                        triggerHapticFeedback();
                        playClickSound(isSoundEnabled);
                      }}
                      className={`px-2 py-1 text-xs rounded ${
                        fontSize === size
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {size === "xl"
                        ? "XL"
                        : size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screen Reader Mode */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-700">{t.screenReader}</span>
                <button
                  onClick={() => {
                    setIsScreenReaderMode(!isScreenReaderMode);
                    triggerHapticFeedback();
                    playClickSound(isSoundEnabled);
                  }}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    isScreenReaderMode ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-pressed={isScreenReaderMode}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isScreenReaderMode ? "translate-x-5" : "translate-x-1"
                    } mt-1`}
                  />
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{t.soundEffects}</span>
                <button
                  onClick={() => {
                    setIsSoundEnabled(!isSoundEnabled);
                    triggerHapticFeedback();
                  }}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    isSoundEnabled ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-pressed={isSoundEnabled}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      isSoundEnabled ? "translate-x-5" : "translate-x-1"
                    } mt-1`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
