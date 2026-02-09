import {
  Code2,
  Figma,
  Layers,
  MonitorSmartphone,
  Palette,
  Sparkles,
} from "lucide-react"

const skills = [
  { label: "React", icon: Code2 },
  { label: "TypeScript", icon: Layers },
  { label: "Next.js", icon: MonitorSmartphone },
  { label: "Tailwind CSS", icon: Palette },
  { label: "Figma", icon: Figma },
  { label: "UI/UX Design", icon: Sparkles },
]

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <div className="glass rounded-3xl p-8 md:p-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60">
            About Me
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Frontend Engineer.
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            I craft user-centric digital experiences where thoughtful design
            meets robust engineering. From high-fidelity prototyping in Figma to
            production-ready code in React and Next.js, I own the full creative
            pipeline.
          </p>

          {/* Tech Stack Chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="glass-chip flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary/30 hover:bg-white/10 hover:border-white/30"
              >
                <skill.icon className="h-4 w-4 text-white/60" />
                {skill.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
