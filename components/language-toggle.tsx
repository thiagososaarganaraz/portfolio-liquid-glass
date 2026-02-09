"use client"

import { useLanguage } from "@/context/LanguageContext"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white/80"
      aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
      title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <span className={lang === "en" ? "text-white/90" : "text-white/50"}>EN</span>
      <span className="text-white/30">·</span>
      <span className={lang === "es" ? "text-white/90" : "text-white/50"}>ES</span>
    </button>
  )
}
