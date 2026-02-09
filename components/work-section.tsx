"use client"

import {
  Layers,
  Sparkles,
  Gauge,
  Users,
} from "lucide-react"

const experiences = [
  {
    title: "Product Engineering",
    scope: "Core product features",
    description:
      "Designing and building user-facing features in a complex production environment, balancing usability, performance, and long-term maintainability.",
    tags: ["React", "TypeScript", "Product"],
    icon: Layers,
  },
  {
    title: "Design Systems",
    scope: "Scalable UI foundations",
    description:
      "Creating and evolving reusable components, tokens, and patterns to ensure visual and functional consistency across teams and products.",
    tags: ["Design Systems", "UI Architecture"],
    icon: Sparkles,
  },
  {
    title: "Performance & Quality",
    scope: "Optimization & reliability",
    description:
      "Improving perceived and real performance through careful profiling, refactoring, and attention to accessibility and edge cases.",
    tags: ["Performance", "Accessibility"],
    icon: Gauge,
  },
  {
    title: "Collaboration",
    scope: "Team & process",
    description:
      "Working closely with designers, product managers, and engineers through reviews, technical discussions, and shared ownership.",
    tags: ["Collaboration", "Code Reviews"],
    icon: Users,
  },
]

export function WorkSection() {
  return (
    <section id="work" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60">
            Experience
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            How I contribute in my current role.
          </h2>
        </div>

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
