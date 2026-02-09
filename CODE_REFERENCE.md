# 📖 Code Reference Guide

Quick reference for the bilingual system implementation.

## 🔗 Hook Usage Pattern

### Basic Pattern (All Components Use This)

```typescript
"use client"

import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

export function MyComponent() {
  const { lang } = useLanguage()
  const myContent = content[lang].section
  
  return (
    <div>
      <h1>{myContent.title}</h1>
      <p>{myContent.description}</p>
    </div>
  )
}
```

### With Conditional Rendering

```typescript
export function MyComponent() {
  const { lang, isSpanish } = useLanguage()
  
  return (
    <div>
      {isSpanish ? (
        <p>This is Spanish-specific content</p>
      ) : (
        <p>This is English-specific content</p>
      )}
    </div>
  )
}
```

## 📝 Adding Content (content.ts Pattern)

### Basic Structure
```typescript
export const content = {
  en: {
    section: {
      field1: "English text",
      field2: "More English"
    }
  },
  es: {
    section: {
      field1: "Texto español",
      field2: "Más español"
    }
  }
}
```

### Nested Content Example (Like workSection)
```typescript
export const content = {
  en: {
    work: {
      label: "Experience",
      title: "How I contribute...",
      experiences: [
        {
          title: "Frontend Product Engineering",
          scope: "User-facing experiences",
          description: "Long description...",
          tags: ["React", "Architecture"]
        }
        // ... more experiences
      ]
    }
  },
  es: {
    work: {
      label: "Experiencia",
      title: "Cómo contribuyo...",
      experiences: [
        {
          title: "Ingeniería de Producto Frontend",
          scope: "Experiencias orientadas al usuario",
          description: "Descripción larga...",
          tags: ["React", "Arquitectura"]
        }
        // ... más experiencias
      ]
    }
  }
}
```

### Accessing Nested Content
```typescript
const { lang } = useLanguage()

// Single field
const label = content[lang].work.label

// Loop through array
const experiences = content[lang].work.experiences
experiences.map(exp => (
  <div key={exp.title}>
    <h3>{exp.title}</h3>
    <p>{exp.description}</p>
  </div>
))
```

## 🎯 LanguageToggle Component

### Implementation
```typescript
"use client"

import { useLanguage } from "@/context/LanguageContext"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
      className="flex items-center gap-1 rounded-full border..."
    >
      <span className={lang === "en" ? "text-white/90" : "text-white/50"}>
        EN
      </span>
      <span className="text-white/30">·</span>
      <span className={lang === "es" ? "text-white/90" : "text-white/50"}>
        ES
      </span>
    </button>
  )
}
```

### Using in Navbar
```typescript
export function Navbar() {
  const { lang } = useLanguage()
  
  return (
    <nav>
      <div className="flex justify-between items-center">
        <div>Logo</div>
        <ul>
          {/* Nav Links */}
        </ul>
        {/* Add LanguageToggle here */}
        <LanguageToggle />
      </div>
    </nav>
  )
}
```

## 🔄 Context Usage Examples

### Reading Language State
```typescript
const { lang } = useLanguage()
// lang is "en" | "es"
```

### Setting Language
```typescript
const { setLang } = useLanguage()

// Switch to Spanish
setLang("es")

// Switch to English
setLang("en")
```

### Helper Hook
```typescript
const { isSpanish } = useLanguage()

if (isSpanish) {
  // Do Spanish-specific things
}
```

### Complete Hook API
```typescript
interface LanguageContextType {
  lang: "en" | "es"              // Current language
  setLang: (lang: Language) => void  // Update language
  isSpanish: boolean              // Helper: lang === "es"
}

const { lang, setLang, isSpanish } = useLanguage()
```

## 💾 localStorage API

### How It's Used Internally
```typescript
// Save
localStorage.setItem("preferredLanguage", "es")

// Load
const saved = localStorage.getItem("preferredLanguage") // "es" | null

// Clear
localStorage.removeItem("preferredLanguage")
```

### Manual Testing in Browser Console
```javascript
// Check what's saved
localStorage.getItem("preferredLanguage")

// Set manually
localStorage.setItem("preferredLanguage", "es")

// Clear
localStorage.removeItem("preferredLanguage")

// See all storage
localStorage
```

## 🌍 HTML Lang Attribute

### How It Updates
```typescript
// Automatically updated by LanguageContext
document.documentElement.lang = "es"  // On Spanish
document.documentElement.lang = "en"  // On English
```

### Verify in Browser
```javascript
// In DevTools Console
document.documentElement.lang  // Returns current lang

// In HTML Inspector
<html lang="es">  // Check in DevTools
```

## 🎨 Component Refactoring Template

Use this template when refactoring a new component:

```typescript
"use client"  // ← Add if string content

import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

export function YourComponent() {
  // Get current language
  const { lang } = useLanguage()
  
  // Get content for this section
  const sectionContent = content[lang].yourSection
  
  return (
    <section>
      {/* Use content instead of hardcoded strings */}
      <h1>{sectionContent.title}</h1>
      <p>{sectionContent.description}</p>
      
      {/* Map over arrays if needed */}
      {sectionContent.items?.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  )
}
```

## 🔍 Debugging Tips

### Check Language State
```typescript
export function DebugLanguage() {
  const { lang, isSpanish } = useLanguage()
  
  return (
    <div>
      <p>Current language: {lang}</p>
      <p>Is Spanish: {isSpanish}</p>
      <p>Saved preference: {localStorage.getItem("preferredLanguage")}</p>
      <p>HTML lang: {document.documentElement.lang}</p>
    </div>
  )
}
```

### useLanguage Outside Provider (Will Error)
```typescript
// ❌ This will throw an error if used outside LanguageProvider
const { lang } = useLanguage()

// Error: useLanguage must be used within a LanguageProvider
```

### Fix: Ensure Proper Provider Wrapping
```typescript
// ✅ Check app/root-layout-client.tsx has LanguageProvider
// ✅ Check app/layout.tsx uses RootLayoutClient

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  )
}
```

## 📋 Common Tasks

### Add New Section to content.ts
```typescript
// 1. Add to content.en
export const content = {
  en: {
    newSection: {
      title: "English Title",
      description: "English description"
    }
  },
  
  // 2. Add to content.es (always both!)
  es: {
    newSection: {
      title: "Título español",
      description: "Descripción en español"
    }
  }
}

// 3. Use in component
const newContent = content[lang].newSection
```

### Update Existing Copy
```typescript
// Find the text in content.ts
// Update BOTH en AND es versions
// Component automatically reflects changes on next render
```

### Change Toggle Styling
```typescript
// Edit components/language-toggle.tsx
// Modify the className property
className="... your new classes ..."
```

### Move Toggle Position
```typescript
// Edit components/navbar.tsx
// Move <LanguageToggle /> to desired location
// Options: navbar, footer, sidebar, etc.
```

## 🧪 Testing Checklist

```typescript
// Test 1: Language switch
test("clicking toggle changes language", () => {
  const { getByText } = render(<App />)
  fireEvent.click(getByText("EN"))
  expect(getByText("Experiencia")).toBeInTheDocument()
})

// Test 2: localStorage
test("language preference persists", () => {
  localStorage.setItem("preferredLanguage", "es")
  render(<App />)
  expect(document.documentElement.lang).toBe("es")
})

// Test 3: hook outside provider
test("useLanguage throws outside provider", () => {
  expect(() => {
    render(<ComponentUsingHook />) // Without provider
  }).toThrow("useLanguage must be used within a LanguageProvider")
})
```

## 🚀 Performance Tips

### Avoid Unnecessary Re-renders
```typescript
// ❌ Bad: Re-reads entire content object
const allContent = content[lang]

// ✅ Good: Only read what you need
const { title, description } = content[lang].section
```

### Memoize If Needed
```typescript
import { useMemo } from "react"

export function MyComponent() {
  const { lang } = useLanguage()
  
  const experiences = useMemo(
    () => content[lang].work.experiences,
    [lang]
  )
  
  return experiences.map(exp => ...)
}
```

## 📚 Type Safety

### Using Types from content.ts
```typescript
import { content } from "@/lib/content"

type ContentKeys = keyof typeof content // "en" | "es"
type NavContent = typeof content.en.nav

const nav: NavContent = {
  home: "thiago.",
  about: "About",
  work: "Work",
  contact: "Contact"
}
```

---

**Pro Tip**: Copy these patterns into your new components for consistency! 🎨
