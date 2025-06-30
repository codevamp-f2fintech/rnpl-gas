"use client";

import { Award, Shield, CheckCircle, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";

export function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    { icon: Users, text: t.happyCustomers, color: "text-purple-500" },
  ];

  return (
    <section
      className="py-8 bg-[#ffffff] border-b"
      aria-label="Trust badges and certifications"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2">
              <badge.icon
                className={`w-8 h-8 ${badge.color}`}
                aria-hidden="true"
              />
              <span className="text-[1.1rem] font-medium text-gray-700">
                {badge.text}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-center gap-3">
            <Image
              style={{ borderRadius: "50%" }}
              src="/rbihlogo.png"
              alt="rbih logo"
              width={40}
              height={40}
            />
            <p className="text-[1.1rem] font-medium text-gray-700">
              RBI Approved NBFC
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Image src="/iiclogo.png" alt="iic logo" width={60} height={60} />
            <p className="text-[1.1rem]font-medium text-gray-700">IIML IIC</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Image src="/pnblogo.png" alt="pnb logo" width={60} height={60} />
            <p className="text-[1.1rem]font-medium text-gray-700">PNB</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Image
              src="/ujjwala-yojna.png"
              alt="ujjwala logo"
              width={60}
              height={60}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Image
              src="/govtlogo.avif"
              alt="govt of india logo"
              width={60}
              height={60}
            />
            <p className="text-[1.1rem]font-medium text-gray-700">
              Government of India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}