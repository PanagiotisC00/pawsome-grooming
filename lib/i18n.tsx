"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "english" | "greek"

interface Translation {
  [key: string]: any
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: Translation
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>("english")
  const [translations, setTranslations] = useState<Translation>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/locales/${language}.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error("Failed to load translations:", error)
        // Fallback to empty object
        setTranslations({})
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language])

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && (savedLanguage === "english" || savedLanguage === "greek")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("preferred-language", language)
  }, [language])

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Suppress noisy i18n warnings; return the key and let callers apply fallbacks
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, translations, isLoading }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

// Helper hook for easier translation access
export function useTranslation() {
  const { t } = useI18n()
  return { t }
}
