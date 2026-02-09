"use client"

import { ArrowDown } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

export function HeroSection() {
  const { lang } = useLanguage()
  const heroContent = content[lang].hero

  return (
  <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,200,200,0.12),transparent_60%)]" />
      <div className="glass mx-auto w-full max-w-2xl rounded-3xl p-8 text-center md:p-14">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          {heroContent.label}
        </p>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          {heroContent.title}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-white/70 md:text-lg tracking-[0.22em]">
          {heroContent.subtitle}
        </p>
        <div className="mt-10">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full
            border border-white/20
            bg-white/10
            px-8 py-3
            text-sm font-medium text-foreground
            backdrop-blur-md
            transition-all duration-300
            hover:border-primary/50
            hover:bg-white/15
            hover:border-white/40
            "
          >
            <span className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {heroContent.cta}
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
