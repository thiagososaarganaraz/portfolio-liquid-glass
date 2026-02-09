import { Github, Linkedin, Mail } from "lucide-react"

const links = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:hello@thiago.dev",
    icon: Mail,
  },
]

export function ContactFooter() {
  return (
    <footer id="contact" className="relative px-6 pb-12 pt-16 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-2xl">
        <div className="glass rounded-3xl p-8 text-center md:p-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Get In Touch
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {"Let's build something together."}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="glass-chip flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-[0_0_16px_rgba(0,200,200,0.12)]"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          {"© 2026 Thiago. Crafted with care."}
        </p>
      </div>
    </footer>
  )
}
