"use client"

import {
  Code2,
  Figma,
  Layers,
  MonitorSmartphone,
  Palette,
  Sparkles,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

const skillIconMap = {
  React: Code2,
  TypeScript: Layers,
  "Next.js": MonitorSmartphone,
  "Tailwind CSS": Palette,
  Figma: Figma,
  "UI/UX Design": Sparkles,
}

export function AboutSection() {
  const { lang } = useLanguage()
  const aboutContent = content[lang].about

  const skills = [
    { label: aboutContent.skills.react, icon: Code2 },
    { label: aboutContent.skills.typescript, icon: Layers },
    { label: aboutContent.skills.nextjs, icon: MonitorSmartphone },
    { label: aboutContent.skills.tailwind, icon: Palette },
    { label: aboutContent.skills.figma, icon: Figma },
    { label: aboutContent.skills.uxdesign, icon: Sparkles },
  ]
  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <div className="glass rounded-3xl p-8 md:p-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            {aboutContent.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-high md:text-4xl">
            {aboutContent.title}
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-medium md:text-lg">
            {aboutContent.description}
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="glass-chip group relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-medium outline-none transition-all duration-300 hover:border-primary/50 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <skill.icon className="h-4 w-4 text-muted" />
                {skill.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
