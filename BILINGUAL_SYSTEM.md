# Bilingual Language System

A clean, production-ready bilingual (EN/ES) system for the portfolio. Instant language switching with localStorage persistence, no page reloads.

## 📁 File Structure

```
context/
  └── LanguageContext.tsx      # Language provider & hook
lib/
  └── content.ts              # Centralized EN/ES translations
components/
  └── language-toggle.tsx     # Minimal glassmorphic toggle
  ├── navbar.tsx              # Updated with language support
  ├── hero-section.tsx        # Updated with language support
  ├── about-section.tsx       # Updated with language support
  ├── work-section.tsx        # Updated with language support
  └── contact-footer.tsx      # Updated with language support
app/
  ├── layout.tsx              # Updated with LanguageProvider
  └── root-layout-client.tsx  # Client wrapper for providers
```

## 🚀 How It Works

### 1. **LanguageContext** (`context/LanguageContext.tsx`)

Manages global language state with:
- Automatic localStorage persistence
- Dynamic `<html lang="">` attribute updates
- Two-way sync between React state and DOM

```typescript
const { lang, setLang, isSpanish } = useLanguage()
// lang: "en" | "es"
// setLang: (lang: Language) => void
// isSpanish: boolean (helper for conditional rendering)
```

### 2. **Content File** (`lib/content.ts`)

Centralized, hand-crafted translations (not literal):

```typescript
export const content = {
  en: { nav, hero, about, work, contact },
  es: { nav, hero, about, work, contact },
}
```

All copy is grouped by section for easy maintenance and updates.

### 3. **Language Toggle** (`components/language-toggle.tsx`)

Minimal glassmorphic component in navbar:
- Subtle `EN · ES` text toggle
- Active state styling
- Accessible (ARIA labels, no flags)
- Instant language switch

### 4. **Component Integration**

Every component that renders content uses the hook:

```typescript
"use client"

import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

export function MyComponent() {
  const { lang } = useLanguage()
  const sectionContent = content[lang].section
  
  return <h1>{sectionContent.title}</h1>
}
```

### 5. **App Setup** (`app/layout.tsx`)

The `RootLayoutClient` wrapper provides context to all components:

```typescript
<html lang="en">
  <RootLayoutClient>{children}</RootLayoutClient>
</html>
```

The `html lang` attribute updates automatically via the context.

## 📝 Adding New Content

### 1. Edit `lib/content.ts`

Add new sections to both `en` and `es` objects:

```typescript
export const content = {
  en: {
    // ... existing sections
    newSection: {
      title: "New Title",
      description: "New description",
    }
  },
  es: {
    newSection: {
      title: "Nuevo Título",
      description: "Nueva descripción",
    }
  }
}
```

### 2. Use in Component

```typescript
const { lang } = useLanguage()
const newContent = content[lang].newSection
```

## 🎨 Translation Philosophy

- **English**: Concise, professional, global audience
- **Spanish**: Natural warmth, polished but approachable (not literal translation)

Example:
- EN: "Let's build something together"
- ES: "Construyamos algo increíble juntos" (not a word-for-word translation)

## 🔌 Key Features

✅ **Zero Page Reloads** — Language switches instantly  
✅ **Persistent** — localStorage remembers user preference  
✅ **SEO-Friendly** — Dynamic `<html lang="">` attribute  
✅ **Accessible** — ARIA labels, semantic HTML  
✅ **Modern** — iOS-style glassmorphic toggle  
✅ **Maintainable** — Single source of truth for copy  
✅ **Extensible** — Easy to add new sections  

## 🧪 Testing

Local storage behavior:
```javascript
// Check saved preference
localStorage.getItem("preferredLanguage")

// Clear to reset
localStorage.removeItem("preferredLanguage")
```

HTML lang attribute:
```javascript
// Verify in DevTools or via script
document.documentElement.lang // Returns "en" or "es"
```

## 📦 Dependencies

No external dependencies required beyond existing packages:
- React Context API (built-in)
- TypeScript (already in project)
- Tailwind CSS (for toggle styling)

## 🛠️ Customization

### Change Toggle Position

Edit `components/navbar.tsx`:
```typescript
{/* Desktop Links + Language Toggle */}
<div className="hidden items-center gap-8 md:flex">
  {/* Change this to move toggle elsewhere */}
  <LanguageToggle />
</div>
```

### Change Toggle Styling

Edit `components/language-toggle.tsx` className:
```typescript
className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5..."
```

### Add More Languages

1. Add new language object to `lib/content.ts`:
```typescript
export const content = {
  en: { ... },
  es: { ... },
  fr: { ... }, // Add French
}
```

2. Update LanguageContext type:
```typescript
type Language = "en" | "es" | "fr"
```

## 📱 Browser Support

Works in all modern browsers with localStorage support:
- Chrome/Edge 4+
- Firefox 3.5+
- Safari 4+
- iOS Safari 3.2+

## ✨ Best Practices

- Update translations in pairs (always add both EN and ES)
- Keep translations at the same nesting level
- Use the content structure for semantic organization
- Leverage the `isSpanish` helper for conditional rendering when needed
- Test localStorage persistence in DevTools (Application → Storage → Local Storage)

---

**Questions?** Extend the content.ts file or modify LanguageContext.tsx to suit your needs.
