"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

export function ContactFooter() {
  const { lang } = useLanguage()
  const contactContent = content[lang].contact

  const links = [
    {
      label: contactContent.socialLinks.github,
      href: "https://github.com/thiagososaarganaraz",
      icon: Github,
    },
    {
      label: contactContent.socialLinks.linkedin,
      href: "https://www.linkedin.com/in/thiago-sosa-arganaraz/",
      icon: Linkedin,
    },
    {
      label: contactContent.socialLinks.email,
      href: "mailto:thiagososaarganaraz@gmail.com",
      icon: Mail,
    },
  ]
  return (
    <footer id="contact" className="relative px-6 pb-12 pt-16 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-2xl">
        <div className="glass rounded-3xl p-8 text-center md:p-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/60">
            {contactContent.label}
          </p>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            {contactContent.title}
          </h2>

          <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-white/65">
            {contactContent.description}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="glass-chip flex h-12 w-12 items-center justify-center rounded-full
                text-white/60
                transition-all duration-300
                hover:bg-white/10
                hover:border-white/30
                hover:text-white/90"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-white/50">
          {"© 2026 Thiago. Crafted with care."}
        </p>
      </div>
    </footer>
  )
}
