"use client"

import {
  Layers,
  Sparkles,
  Gauge,
  Users,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

const iconMap = {
  "Frontend Product Engineering": Layers,
  "UX-Driven Development": Sparkles,
  "Performance & User Feedback": Gauge,
  "Product Collaboration & Leadership": Users,
}

export function WorkSection() {
  const { lang } = useLanguage()
  const workContent = content[lang].work

  const experiences = workContent.experiences.map((exp, index) => ({
    ...exp,
    icon: Object.values(iconMap)[index],
  }))
  return (
    <section id="work" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60">
            {workContent.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            {workContent.title}
          </h2>
        </div>

        {/* Company Context */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
            {workContent.currentlyAt}
          </p>
          <a
            href="https://snoopconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2
              text-sm font-medium text-white/70
              transition-colors duration-300
              hover:text-white"
          >
            {workContent.company}
            <span className="text-white/40">· {workContent.companyWebsite}</span>
          </a>
        </div>

        {/* Experience Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp) => (
            <article
              key={exp.title}
              className="group glass rounded-3xl p-6 md:p-8
              transition-all duration-500
              hover:-translate-y-1
              hover:border-white/20
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              {/* Abstract Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="glass-chip flex h-10 w-10 items-center justify-center rounded-full text-white/70">
                  <exp.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-white/50">
                    {exp.scope}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-white/65">
                {exp.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-chip rounded-full px-3 py-1
                    text-xs font-medium text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
