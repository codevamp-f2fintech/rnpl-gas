"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { strategies } from "@/lib/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { useAudio } from "@/hooks/useAudio";

export function StrategiesCarousel({ isLiteMode }: StrategiesCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  const strategies = [
    {
      title: "Commercial Business Solutions",
      description:
        "Specialized LPG solutions for restaurants, hotels, and food vendors",
      image: "/combusiness.jpg",
    },
    {
      title: "Small Business Growth Program",
      description:
        "Helping tea stalls, food vendors, and small restaurants expand their business",
      image: "/smallbusiness.jpg",
    },
    {
      title: "Women Empowerment Initiative",
      description: "Supporting female entrepreneurs in rural and urban areas",
      image: "/womenemp.jpg",
    },
    {
      title: "Digital Payment & EMI Solutions",
      description:
        "Seamless EMI processing through mobile technology for all customer types",
      image: "/emipayment.jpg",
    },
    {
      title: "Rural Agent & Refillpreneur Network",
      description:
        "Empowering local entrepreneurs with LPG distribution networks across villages",
      image: "rural.jpg",
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isLiteMode) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % strategies.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">
            {t.exponentialGrowthStrategies}
          </h2>
          <p className="text-xl text-gray-600">{t.innovativeApproaches}</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {strategies.map((strategy, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div
                    className="relative h-96 bg-cover bg-center"
                    style={{ backgroundImage: `url('${strategy.image}')` }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="text-center text-white p-8">
                        <h3 className="text-3xl font-bold mb-4">
                          {strategy.title}
                        </h3>
                        <p className="text-xl text-gray-300">
                          {strategy.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => {
              setCurrentSlide(
                (prev) => (prev - 1 + strategies.length) % strategies.length
              );
              triggerHapticFeedback();
              playClickSound(true);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0B1C39] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
            aria-label={t.previousSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % strategies.length);
              triggerHapticFeedback();
              playClickSound(true);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0B1C39] p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-400/50"
            aria-label={t.nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div
            className="flex justify-center mt-8 space-x-2"
            role="tablist"
            aria-label="Slide navigation"
          >
            {strategies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  triggerHapticFeedback();
                  playClickSound(true);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer ${
                  index === currentSlide ? "bg-blue-500 w-8" : "bg-gray-300"
                }`}
                aria-label={`${t.goToSlide} ${index + 1}`}
                role="tab"
                aria-selected={index === currentSlide}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}