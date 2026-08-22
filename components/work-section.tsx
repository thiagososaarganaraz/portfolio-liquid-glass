"use client"

import {
  Layers,
  FileCheck2,
  Workflow,
  Users,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

const icons = [Layers, FileCheck2, Workflow, Users]

export function WorkSection() {
  const { lang } = useLanguage()
  const workContent = content[lang].work

  const experiences = workContent.experiences.map((exp, index) => {
    const IconComponent = icons[index % icons.length]
    return {
      ...exp,
      icon: IconComponent,
    }
  })

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

        {/* Company Header Card */}
        <div className="glass rounded-3xl p-6 md:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="glass-chip flex h-14 w-14 items-center justify-center rounded-2xl text-accent bg-accent/10">
              <Briefcase className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {workContent.currentlyAt}
                </p>
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-high">
                {workContent.company}
              </h3>
              <p className="text-sm font-medium text-medium">
                {workContent.role}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start md:items-end gap-3 text-xs md:text-sm text-medium">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted" />
              <span>{workContent.period}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <MapPin className="h-4 w-4 text-muted" /> */}
              {/* <span>{workContent.location}</span> */}
            </div>
            <a
              href={`https://${workContent.companyWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium pt-1 sm:pt-0"
            >
              <span>{workContent.companyWebsite}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
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
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="glass-chip flex h-10 w-10 items-center justify-center rounded-full text-accent bg-accent/5">
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
