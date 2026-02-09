"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"
import { LanguageToggle } from "./language-toggle"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang } = useLanguage()
  const navContent = content[lang].nav
  const navLinks = [
    { label: navContent.about, href: "#about" },
    { label: navContent.work, href: "#work" },
    { label: navContent.contact, href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" role="navigation" aria-label="Main navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {navContent.home}
        </a>

        {/* Desktop Links + Language Toggle */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/65 hover:text-white/90 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-white/10" />
          <LanguageToggle />
        </div>

        {/* Mobile Menu + Language Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-white/65 hover:text-white/90 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
