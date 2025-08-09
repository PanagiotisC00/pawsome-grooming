"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"
import { useI18n, type Language } from "@/lib/i18n"

// Languages without country flags to avoid fallback letter rendering (e.g., US/GR)
const languages = [
  { code: "english" as Language, name: "English" },
  { code: "greek" as Language, name: "Ελληνικά" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6e8b7c] focus:ring-offset-2"
        >
          <Globe className="h-4 w-4" />
          <span className="inline-flex items-center">{currentLanguage?.name}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 animate-slide-up">
        {languages.map((lang, index) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
              language === lang.code ? "bg-[#e8f0ec] text-foreground" : ""
            } animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && <div className="ml-auto h-2 w-2 bg-[#6e8b7c] rounded-full animate-pulse-soft" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
