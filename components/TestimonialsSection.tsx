"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"
import { testimonials } from "@/lib/constants"
import { useLanguage } from "@/hooks/useLanguage"

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">{t.successStories}</h2>
          <p className="text-xl text-gray-600">भारत भर की सफलता की कहानियां - घरेलू और व्यापारिक दोनों ग्राहक</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-3"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-[#0B1C39]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                      {testimonial.language}
                    </span>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full ${
                        testimonial.customerType.includes("Commercial")
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {testimonial.customerType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-gray-700 text-sm italic mb-3">"{testimonial.quote}"</blockquote>

              {testimonial.translation && <p className="text-xs text-gray-500 italic">"{testimonial.translation}"</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
