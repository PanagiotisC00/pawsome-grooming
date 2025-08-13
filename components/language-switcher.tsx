"use client"

import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { useI18n, type Language } from "@/lib/i18n"
import { useState, useEffect, useRef } from "react"

// Languages without country flags to avoid fallback letter rendering (e.g., US/GR)
const languages = [
  { code: "english" as Language, name: "English" },
  { code: "greek" as Language, name: "Ελληνικά" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === language)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 min-w-[100px] justify-start transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6e8b7c] focus:ring-offset-2"
      >
        <Globe className="h-4 w-4 flex-shrink-0" />
        <span className="inline-flex items-center truncate">{currentLanguage?.name}</span>
        <ChevronDown className={`h-3 w-3 opacity-50 flex-shrink-0 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 min-w-[140px] bg-white border border-gray-200 rounded-md shadow-lg z-[90] animate-slide-up"
          style={{ zIndex: 90 }}
        >
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left cursor-pointer transition-all duration-300 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                  language === lang.code ? "bg-[#e8f0ec] text-foreground" : ""
                } animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium whitespace-nowrap">{lang.name}</span>
                {language === lang.code && <div className="h-2 w-2 bg-[#6e8b7c] rounded-full animate-pulse-soft flex-shrink-0" />}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
