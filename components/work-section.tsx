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
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            {workContent.label}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-high md:text-4xl">
            {workContent.title}
          </h2>
        </div>

        {/* Company Context */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-subtle">
            {workContent.currentlyAt}
          </p>
          <a
            href="https://snoopconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 outline-none
              text-sm font-medium text-medium
              transition-colors duration-300
              hover:text-high focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {workContent.company}
            <span className="text-subtle">· {workContent.companyWebsite}</span>
          </a>
        </div>

        {/* Experience Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp) => (
            <article
              key={exp.title}
              tabIndex={0}
              className="group glass rounded-3xl p-6 md:p-8 outline-none
              transition-all duration-500
              hover:-translate-y-1
              hover:border-default
              hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {/* Abstract Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="glass-chip flex h-10 w-10 items-center justify-center rounded-full text-medium">
                  <exp.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-high">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-subtle">
                    {exp.scope}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-medium">
                {exp.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass-chip rounded-full px-3 py-1
                    text-xs font-medium text-muted"
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
