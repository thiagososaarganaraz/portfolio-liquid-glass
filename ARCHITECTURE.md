# 🏗️ Bilingual System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App (Server)                      │
│                   app/layout.tsx (SSR)                       │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │      RootLayoutClient (Client Wrapper)               │  │
│  │  ┌───────────────────────────────────────────────┐   │  │
│  │  │   LanguageProvider (Context)                 │   │  │
│  │  │   ├─ lang state: "en" | "es"               │   │  │
│  │  │   ├─ localStorage: "preferredLanguage"      │   │  │
│  │  │   ├─ html lang attribute: dynamic           │   │  │
│  │  │   └─ setLang() function                     │   │  │
│  │  │                                               │   │  │
│  │  │   ┌──────────────────────────────────────┐   │   │  │
│  │  │   │  App Components (Client)             │   │   │  │
│  │  │   │  ├─ Navbar                           │   │   │  │
│  │  │   │  │  ├─ uses: useLanguage()           │   │   │  │
│  │  │   │  │  ├─ uses: content[lang].nav       │   │   │  │
│  │  │   │  │  └─ LanguageToggle (EN · ES)      │   │   │  │
│  │  │   │  ├─ HeroSection (dynamic)            │   │   │  │
│  │  │   │  ├─ AboutSection (dynamic)           │   │   │  │
│  │  │   │  ├─ WorkSection (dynamic)            │   │   │  │
│  │  │   │  └─ ContactFooter (dynamic)          │   │   │  │
│  │  │   └──────────────────────────────────────┘   │   │  │
│  │  └───────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      User Interaction                         │
│                 (Clicks EN · ES Toggle)                      │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              LanguageToggle Component                         │
│            onClick={() => setLang("es")}                    │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              LanguageContext.setLang()                        │
│  ├─ Update React state: lang = "es"                         │
│  ├─ Update localStorage: preferredLanguage = "es"           │
│  └─ Update DOM: document.documentElement.lang = "es"        │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│              Trigger Re-render (No Reload)                    │
│         All components re-render with new lang               │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│           All Consumers of useLanguage()                      │
│    ├─ Navbar:        content["es"].nav → New labels         │
│    ├─ HeroSection:   content["es"].hero → New copy           │
│    ├─ AboutSection:  content["es"].about → New description   │
│    ├─ WorkSection:   content["es"].work → New experiences    │
│    └─ ContactFooter: content["es"].contact → New copy        │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│               UI Updates (Instant)                            │
│      ✨ All content now displays in Spanish ✨             │
│       No page reload, smooth state transition                │
└──────────────────────────────────────────────────────────────┘
```

## File Dependency Graph

```
app/layout.tsx (Server)
        │
        └─→ app/root-layout-client.tsx (Client)
                │
                └─→ context/LanguageContext.tsx
                        │
                        ├─→ Provides: useLanguage() hook
                        └─→ Provides: lang state & setLang()
                        
                            ↓
                    
                    All Components Can Now:
                    ├─→ import { useLanguage } from "@/context/LanguageContext"
                    ├─→ import { content } from "@/lib/content.ts"
                    └─→ Use: const { lang } = useLanguage()
                            const copy = content[lang].section
                        

components/
├─ navbar.tsx
│  ├─ imports: useLanguage, content, LanguageToggle
│  └─ displays: dynamic nav labels, toggle
│
├─ language-toggle.tsx
│  ├─ imports: useLanguage
│  └─ displays: EN · ES toggle button
│
├─ hero-section.tsx
│  ├─ imports: useLanguage, content
│  └─ displays: dynamic hero content
│
├─ about-section.tsx
│  ├─ imports: useLanguage, content
│  └─ displays: dynamic about content
│
├─ work-section.tsx
│  ├─ imports: useLanguage, content
│  └─ displays: dynamic experience content
│
└─ contact-footer.tsx
   ├─ imports: useLanguage, content
   └─ displays: dynamic footer content


lib/content.ts (Central Source of Truth)
├─ content.en
│  ├─ nav: { about, work, contact, home }
│  ├─ hero: { label, title, subtitle, cta }
│  ├─ about: { label, title, description, skills }
│  ├─ work: { label, title, currentlyAt, company, experiences }
│  └─ contact: { label, title, description, socialLinks }
│
└─ content.es
   ├─ nav: { about, work, contact, home }
   ├─ hero: { label, title, subtitle, cta }
   ├─ about: { label, title, description, skills }
   ├─ work: { label, title, currentlyAt, company, experiences }
   └─ contact: { label, title, description, socialLinks }
```

## Component Hierarchy

```
RootLayout (app/layout.tsx)
└─ html (lang="en" → dynamic)
   └─ RootLayoutClient
      └─ LanguageProvider (context/LanguageContext.tsx)
         └─ body
            ├─ Navbar
            │  ├─ useLanguage()
            │  ├─ content[lang].nav
            │  └─ LanguageToggle
            │     └─ setLang()
            │
            ├─ main
            │  ├─ HeroSection
            │  │  ├─ useLanguage()
            │  │  └─ content[lang].hero
            │  │
            │  ├─ About­Section
            │  │  ├─ useLanguage()
            │  │  └─ content[lang].about
            │  │
            │  └─ WorkSection
            │     ├─ useLanguage()
            │     └─ content[lang].work
            │
            └─ ContactFooter
               ├─ useLanguage()
               └─ content[lang].contact
```

## State Management Pattern

```
┌─────────────────────────────────────────┐
│   LanguageContext (Context API)         │
│                                         │
│  State:                                 │
│  ├─ lang: "en" | "es"                  │
│  ├─ isSpanish: boolean (helper)         │
│  └─ isHydrated: boolean (SSR safety)   │
│                                         │
│  Methods:                               │
│  ├─ setLang(lang): void                │
│  │  ├─ Updates state                   │
│  │  ├─ Updates localStorage             │
│  │  └─ Updates html.lang attribute     │
│  │                                      │
│  └─ useLanguage(): {                   │
│     lang, setLang, isSpanish            │
│     }                                   │
│                                         │
│  Side Effects:                          │
│  ├─ SSR Hydration (useEffect)          │
│  │  └─ Load from localStorage on mount  │
│  └─ DOM Updates (useEffect)            │
│     └─ Update html.lang when lang changes
│                                         │
└─────────────────────────────────────────┘
```

## localStorage Lifecycle

```
User visits site
        │
        ▼
Check localStorage.getItem("preferredLanguage")
        │
        ├─ Found "es" ──→ Set lang = "es"
        │
        ├─ Found "en" ──→ Set lang = "en"
        │
        └─ Not found ──→ Default to lang = "en"
        │
        ▼
Render page with selected language
        │
        ▼
User clicks toggle (EN ↔ ES)
        │
        ├─ localStorage.setItem("preferredLanguage", newLang)
        ├─ Update React state
        ├─ Update html.lang
        └─ Re-render components
        │
        ▼
(Next visit will remember preference)
```

## Translation Workflow

```
ENGLISH (Professional, Concise)
├─ Audience: Global
├─ Tone: Business-casual
├─ Approach: Direct, efficient
└─ Example: "View My Work"

            ↓ Hand-crafted translation ↓

SPANISH (Warm, Natural)
├─ Audience: Spanish speakers
├─ Tone: Approachable, friendly
├─ Approach: Natural phrasing
└─ Example: "Ver mi trabajo"

            ↓ Both in content.ts ↓

RUNTIME SELECTION
├─ Get current lang from context
├─ Select appropriate content
└─ Render translated copy
```

## Performance Characteristics

```
Initial Load
├─ Parse LanguageContext (minimal)
├─ Check localStorage (fast)
├─ Load content.ts (one file)
└─ Render with appropriate language

Language Switch
├─ State update (instant)
├─ localStorage write (async, non-blocking)
├─ html.lang attribute update (instant)
├─ Re-render components (only affected)
└─ Total: < 50ms (imperceptible)

No extra:
├─ API calls ✓
├─ External services ✓
├─ Network requests ✓
└─ Page navigation ✓
```

## Browser Capabilities Used

```
✅ React Context API
   └─ Built-in, no external libs

✅ localStorage API
   └─ 5-10MB per domain (plenty for settings)

✅ DOM Manipulation
   └─ document.documentElement.lang
   └─ Set once per language change

✅ Client Components
   └─ Next.js 13+ "use client" directive

✅ TypeScript
   └─ Full type safety throughout
```

## Testing Strategy

```
Unit Tests (if needed):
├─ LanguageContext
│  ├─ setLang() updates state
│  ├─ setLang() updates localStorage
│  └─ useLanguage() throws outside provider
│
├─ LanguageToggle
│  ├─ Toggles lang on click
│  └─ Shows active state

Integration Tests (if needed):
├─ Components update on lang change
├─ localStorage persists across refresh
└─ html.lang updates dynamically

Manual Testing (current):
├─ Click toggle, content changes ✓
├─ Refresh page, language persists ✓
├─ Check DevTools, html lang updates ✓
└─ Mobile layout still works ✓
```

---

## Summary

This architecture provides:
- **Centralized state management** (LanguageContext)
- **Single source of truth** (content.ts)
- **Instant switching** (React state updates)
- **Persistence** (localStorage)
- **SEO compliance** (html lang attribute)
- **Zero external dependencies** (built-in APIs)
- **Type safety** (full TypeScript)
- **Accessibility** (ARIA labels, semantic HTML)

Perfect for a production portfolio. 🚀
