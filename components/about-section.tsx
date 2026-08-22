"use client"

import {
  Code2,
  Bot,
  Database,
  Cloud,
  Palette,
  GraduationCap,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

const categoryIcons = [
  Code2,     // Frontend Engineering
  Bot,       // AI & Automation
  Database,  // Backend & Data
  Cloud,     // Cloud & DevOps
  Palette,   // Design & UX
]

export function AboutSection() {
  const { lang } = useLanguage()
  const aboutContent = content[lang].about

  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Main Bio Card */}
        <div className="glass rounded-3xl p-8 md:p-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            {aboutContent.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-high md:text-4xl">
            {aboutContent.title}
          </h2>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-medium md:text-lg">
            {aboutContent.description}
          </p>

          {/* Profile Focus Pillars */}
          {aboutContent.profileTypes && (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="glass-chip rounded-2xl p-5 border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-high text-sm md:text-base">AI Software Engineer</h3>
                </div>
                <p className="text-xs md:text-sm text-medium leading-relaxed">
                  {aboutContent.profileTypes.aiEngineer}
                </p>
              </div>

              <div className="glass-chip rounded-2xl p-5 border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-high text-sm md:text-base">Frontend & Automation</h3>
                </div>
                <p className="text-xs md:text-sm text-medium leading-relaxed">
                  {aboutContent.profileTypes.frontendSpecialist}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Technical Stack Categorized */}
        <div className="glass rounded-3xl p-8 md:p-12">
          <h3 className="mb-8 text-xl font-bold text-high md:text-2xl flex items-center gap-2">
            <Cpu className="h-6 w-6 text-accent" />
            {aboutContent.skillsLabel}
          </h3>

          <div className="space-y-6">
            {aboutContent.skillCategories?.map((category, idx) => {
              const CategoryIcon = categoryIcons[idx % categoryIcons.length] || Sparkles
              return (
                <div key={category.name} className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
                    <CategoryIcon className="h-4 w-4 text-accent" />
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="glass-chip group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-medium text-medium outline-none transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                      >
                        <span className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Education Card */}
        {aboutContent.education && (
          <div className="glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="glass-chip flex h-12 w-12 items-center justify-center rounded-2xl text-accent">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {aboutContent.education.label}
                </p>
                <h4 className="text-lg font-bold text-high">
                  {aboutContent.education.degree}
                </h4>
                <p className="text-sm text-medium">
                  {aboutContent.education.institution}
                </p>
              </div>
            </div>
            <span className="glass-chip rounded-full px-4 py-2 text-xs font-semibold text-accent border border-accent/20">
              {aboutContent.education.status}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
