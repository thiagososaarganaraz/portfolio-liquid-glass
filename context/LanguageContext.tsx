"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  isSpanish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as Language | null
    if (savedLang === "es" || savedLang === "en") {
      setLangState(savedLang)
    }
    setIsHydrated(true)
  }, [])

  // Update localStorage and html lang when language changes
  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("preferredLanguage", newLang)
    document.documentElement.lang = newLang
  }

  // Set initial html lang
  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = lang
    }
  }, [lang, isHydrated])

  return (
    <LanguageContext.Provider value={{ lang, setLang, isSpanish: lang === "es" }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
