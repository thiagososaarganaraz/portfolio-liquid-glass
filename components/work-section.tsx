"use client"

import {
  Layers,
  Sparkles,
  Gauge,
  Users,
} from "lucide-react"

const experiences = [
  {
    title: "Frontend Product Engineering",
    scope: "User-facing experiences",
    description:
      "Designing and building intuitive, high-impact interfaces for a fast-moving startup. I translate abstract business needs into clear, usable frontends, focusing on clarity, flow, and real-world usability rather than just feature delivery.",
    tags: ["React", "Frontend Architecture", "UX Thinking"],
    icon: Layers,
  },
  {
    title: "UX-Driven Development",
    scope: "Visual clarity & interaction",
    description:
      "Shaping interfaces with a strong visual and interaction-first mindset, inspired by modern design systems and widely adopted products. I naturally visualize solutions before writing code, often skipping static mockups in favor of direct, intentional implementation.",
    tags: ["UI Design", "Interaction Design", "Design Trends"],
    icon: Sparkles,
  },
  {
    title: "Performance & User Feedback",
    scope: "Responsiveness & perception",
    description:
      "Optimizing perceived and real performance by reducing waiting times, adding meaningful feedback, and ensuring users are always informed. Every interaction is designed to feel fluid, responsive, and never blocking.",
    tags: ["Performance", "UX", "Accessibility"],
    icon: Gauge,
  },
  {
    title: "Product Collaboration & Leadership",
    scope: "Communication & ownership",
    description:
      "Working directly with the CEO and product leadership to gather requirements, align priorities, and propose solutions. I collaborate with purpose, mentor junior developers, and help onboard new team members into professional, agile environments.",
    tags: ["Agile", "Communication", "Mentorship"],
    icon: Users,
  },
]

export function WorkSection() {
  return (
    <section id="work" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60">
            Experience
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            How I contribute in my current role.
          </h2>
        </div>

        {/* Company Context */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
            Currently at
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
            Snoop Consulting
            <span className="text-white/40">· company-website.com</span>
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
