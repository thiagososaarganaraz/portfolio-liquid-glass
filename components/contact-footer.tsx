"use client"

import { Github, Linkedin, Mail, MapPin, Languages } from "lucide-react"
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
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
            {contactContent.label}
          </p>

          <h2 className="text-balance text-3xl font-bold tracking-tight text-high md:text-4xl">
            {contactContent.title}
          </h2>

          <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-medium">
            {contactContent.description}
          </p>

          {/* Location & Languages */}
          {/* <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs md:text-sm text-medium">
            {contactContent.locationValue && (
              <div className="glass-chip flex items-center gap-2 rounded-full px-4 py-2 border border-white/10">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{contactContent.locationValue}</span>
              </div>
            )}
            {contactContent.languagesValue && (
              <div className="glass-chip flex items-center gap-2 rounded-full px-4 py-2 border border-white/10">
                <Languages className="h-4 w-4 text-accent" />
                <span>{contactContent.languagesValue}</span>
              </div>
            )}
          </div> */}

          <div className="mt-10 flex items-center justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="glass-chip flex h-12 w-12 items-center justify-center rounded-full outline-none
                text-medium
                transition-all duration-300
                hover:bg-white/10
                hover:border-default
                hover:text-high focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-subtle">
          {"© 2026 Thiago Sosa Argañaraz. Crafted with care."}
        </p>
      </div>
    </footer>
  )
}
