"use client"

import Link from "next/link"
import { Heart, Phone, Mail, MapPin, Clock } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const { t } = useTranslation()
  const safe = (key: string, fallback: string) => {
    const value = t(key)
    return typeof value === "string" && value !== key ? value : fallback
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Brand Section */}
          <div className="space-y-3 animate-slide-in-left">
            <Link href="/" className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105 group">
              <img src="/logos/original_paw_website_logo.png" alt="Logo" className="h-5 w-5 rounded-sm object-contain" />
              <span className="font-bold text-lg">{safe("brandName", "Pawsome Grooming")}</span>
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm text-sm">{safe("footer.description", "Professional pet grooming services with love and care for your furry friends.")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 animate-slide-up [animation-delay:200ms]">
            <h3 className="font-semibold text-base">{safe("footer.quickLinks", "Quick Links")}</h3>
            <div className="space-y-1.5">
                {[
                  { name: safe("navigation.services", "Services"), href: "/services" },
                  { name: safe("navigation.gallery", "Gallery"), href: "/gallery" },
                  { name: safe("navigation.booking", "Booking"), href: "/booking" },
                  { name: safe("navigation.contact", "Contact"), href: "/contact" },
                ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 animate-slide-up [animation-delay:400ms]">
            <h3 className="font-semibold text-base">{safe("footer.contactInfo", "Contact Info")}</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 group">
                <Phone className="h-4 w-4 text-[#6e8b7c] mt-0.5 group-hover:animate-bounce-gentle" />
                <span className="text-gray-300 text-sm">+357 22 123456</span>
              </div>
              <div className="flex items-start space-x-2 group">
                <Mail className="h-4 w-4 text-[#6e8b7c] mt-0.5 group-hover:animate-bounce-gentle" />
                <span className="text-gray-300 text-sm">info@pawsomegrooming.cy</span>
              </div>
              <div className="flex items-start space-x-2 group">
                <MapPin className="h-4 w-4 text-[#6e8b7c] mt-0.5 group-hover:animate-bounce-gentle" />
                <span className="text-gray-300 text-sm">Address 1, Town 2, Cyprus</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-3 animate-slide-in-right [animation-delay:600ms]">
            <h3 className="font-semibold text-base">{safe("footer.hours", "Hours")}</h3>
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-[#6e8b7c] mt-0.5" />
              <div className="text-gray-300 space-y-0.5 text-xs leading-relaxed">
                <div>Mon–Fri: 8:00–18:00</div>
                <div>Sat: 9:00–17:00</div>
                <div>Sun: 10:00–16:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-4 text-center animate-fade-in [animation-delay:800ms]">
          {/* Compact copyright with developer credit (updated to 2025) */}
          <p className="text-gray-400 text-xs">
            © 2025 Pawsome Grooming. All rights reserved. Developer:
            {" "}
            <a
              href="https://panagiotis-webdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Panagiotis Chrysanthou
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
