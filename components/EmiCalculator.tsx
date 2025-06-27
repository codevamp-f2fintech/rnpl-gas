"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAudio } from "@/hooks/useAudio";

export function EMICalculator() {
  const [emiAmount, setEmiAmount] = useState(1000);
  const [emiPlan, setEmiPlan] = useState("monthly");
  const { t } = useLanguage();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  const calculateEMI = () => {
    const plans = {
      daily: Math.ceil(emiAmount / 120),
      weekly: Math.ceil(emiAmount / 16),
      monthly: Math.ceil(emiAmount / 4),
    };
    return plans[emiPlan as keyof typeof plans];
  };

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 w-full max-w-2xl">
        <h3 className="font-bold text-2xl text-center text-gray-800 mb-6">
          {t.emiCalculator}
        </h3>

        <div className="space-y-6">
          {/* Amount Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.amount} / राशि: ₹{emiAmount}
            </label>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={emiAmount}
              onChange={(e) => setEmiAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹500</span>
              <span>₹10,000</span>
            </div>
          </div>

          {/* EMI Plan Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.emiPlan} / EMI योजना
            </label>
            <select
              value={emiPlan}
              onChange={(e) => setEmiPlan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">{t.daily} / दैनिक</option>
              <option value="weekly">{t.weekly} / साप्ताहिक</option>
              <option value="monthly">{t.monthly} / मासिक</option>
            </select>
          </div>

          {/* EMI Output Box */}
          <div className="bg-blue-50 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-blue-600">
              ₹{calculateEMI()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {t.per}{" "}
              {emiPlan === "daily"
                ? t.day
                : emiPlan === "weekly"
                ? t.week
                : t.month}
            </div>
          </div>

          {/* Apply Now Button */}
          <button
            onClick={() => {
              triggerHapticFeedback();
              playClickSound(true);
            }}
            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t.applyNowEmi} / अभी आवेदन करें
          </button>
        </div>
      </div>
    </section>
  );
}
