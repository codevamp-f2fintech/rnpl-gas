"use client";

import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";

export function useLanguage(defaultLanguage: Language = "hi") {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>(defaultLanguage);

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        "ghar-ghar-gas-language"
      ) as Language;
      if (savedLanguage && translations[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const t = translations[currentLanguage];

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    if (typeof window !== "undefined") {
      localStorage.setItem("ghar-ghar-gas-language", language);
    }
    // Trigger a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: language })
    );
  };

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener(
      "languageChanged",
      handleLanguageChange as EventListener
    );
    return () => {
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange as EventListener
      );
    };
  }, []);

  return {
    currentLanguage,
    t,
    changeLanguage,
  };
}
