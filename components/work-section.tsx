"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Flux Dashboard",
    description:
      "A real-time analytics dashboard with fluid data visualizations and a dark glassmorphic interface.",
    tags: ["Frontend", "UX", "Data Viz"],
    image: "/projects/project-1.jpg",
  },
  {
    title: "Solara Commerce",
    description:
      "End-to-end e-commerce platform redesign focused on conversion optimization and mobile-first UX.",
    tags: ["Frontend", "UI Design"],
    image: "/projects/project-2.jpg",
  },
  {
    title: "Nimbus App",
    description:
      "Cloud-native productivity app featuring gesture-driven navigation and an adaptive component system.",
    tags: ["React Native", "Design System"],
    image: "/projects/project-3.jpg",
  },
  {
    title: "Aether Studio",
    description:
      "Creative agency portfolio with immersive scroll-driven animations and 3D micro-interactions.",
    tags: ["Frontend", "Animation"],
    image: "/projects/project-4.jpg",
  },
]

export function WorkSection() {
  return (
    <section id="work" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Selected Work
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Projects I&apos;m proud of.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group glass cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
            >
              {/* Project Image */}
              <div className="relative h-52 overflow-hidden md:h-64">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} project screenshot`}
                  fill
                  className="object-cover opacity-60 blur-[2px] transition-all duration-500 group-hover:opacity-90 group-hover:blur-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,30,0.9)] via-[rgba(15,20,30,0.3)] to-transparent" />
              </div>

              {/* Project Info */}
              <div className="relative p-6 md:p-8">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-chip rounded-full px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  View Case Study
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
