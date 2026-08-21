"use client"

import { useLanguage } from "@/context/LanguageContext"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="flex items-center gap-1 rounded-full border border-default bg-white/5 px-3 py-1.5 text-xs font-medium text-muted transition-all duration-300 outline-none hover:border-default hover:bg-white/10 hover:text-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
      title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <span className={lang === "en" ? "text-high" : "text-subtle"}>EN</span>
      <span className="text-subtle">·</span>
      <span className={lang === "es" ? "text-high" : "text-subtle"}>ES</span>
    </button>
  )
}
