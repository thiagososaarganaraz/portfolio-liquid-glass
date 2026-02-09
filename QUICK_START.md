# 🌐 Bilingual System — Quick Start Guide

## What's Been Implemented

Your portfolio now has a **production-ready bilingual (EN/ES) system** with instant language switching, localStorage persistence, and zero page reloads.

## 📍 Component Locations

| File | Purpose |
|------|---------|
| `context/LanguageContext.tsx` | Global language state & hook |
| `lib/content.ts` | All EN/ES copy — centralized |
| `components/language-toggle.tsx` | Minimal toggle (`EN · ES`) |
| `components/*.tsx` | All major components refactored |
| `app/root-layout-client.tsx` | Provider wrapper |
| `BILINGUAL_SYSTEM.md` | Full documentation |

## 🎯 Quick Test

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Visit** `http://localhost:3000`

3. **Click** the `EN · ES` toggle in the navbar

Expected behavior:
- ✅ All content switches instantly (no page reload)
- ✅ Toggle state persists across refresh  
- ✅ `<html lang="">` updates dynamically (check DevTools)
- ✅ Smooth transition with glassmorphic styling

## ✨ Key Features

| Feature | Status |
|---------|--------|
| Instant language switching | ✅ No reload |
| localStorage persistence | ✅ Survives refresh |
| Dynamic `<html lang="">` | ✅ SEO-friendly |
| Accessible (ARIA labels) | ✅ No flags or 3rd-party services |
| Glassmorphic toggle | ✅ Fits design system |
| Hand-crafted translations | ✅ EN & ES in content.ts |

## 📝 Copy Organization

All translations are in **`lib/content.ts`** organized by section:

```
content.en
├── nav
├── hero
├── about
├── work
└── contact

content.es
├── nav
├── hero
├── about
├── work
└── contact
```

### Usage Example
```typescript
const { lang } = useLanguage()
const content = content[lang].work.title
```

## 🔧 Customizing Content

### Edit English Copy
```typescript
// lib/content.ts
export const content = {
  en: {
    hero: {
      title: "Hello, I'm Thiago.", // ← Edit here
    }
  }
}
```

### Edit Spanish Copy
```typescript
export const content = {
  es: {
    hero: {
      title: "Hola, soy Thiago.", // ← Edit here
    }
  }
}
```

**Always update BOTH languages** to keep them in sync.

## 🎨 Moving the Toggle

The toggle lives in `components/navbar.tsx`. To move it:

1. Open `components/navbar.tsx`
2. Find the `<LanguageToggle />` component
3. Move it to your preferred location (navbar, footer, sidebar, etc.)

Currently positioned:
- Desktop: Right side of navbar (next to nav links)
- Mobile: Left of menu icon

## 🌍 Adding More Languages

To add French, German, etc.:

1. **Update `lib/content.ts`**:
```typescript
fr: {
  nav: { about: "À propos", work: "Travail", ... },
  hero: { title: "Bonjour, je suis Thiago.", ... },
  // ... etc
}
```

2. **Update `context/LanguageContext.tsx`**:
```typescript
type Language = "en" | "es" | "fr"
```

3. **Update `components/language-toggle.tsx`** toggle logic if needed.

## 🧪 Testing localStorage

Open **DevTools → Application → Storage → Local Storage**:

```
Key: preferredLanguage
Value: "en" or "es"
```

Clear it to reset:
```javascript
localStorage.removeItem("preferredLanguage")
```

## 📱 Mobile Behavior

- Toggle is positioned left of the menu icon on mobile
- Same instant switching, same persistence
- Fully responsive

## 🧩 Component Integration Pattern

All refactored components follow this pattern:

```typescript
"use client"

import { useLanguage } from "@/context/LanguageContext"
import { content } from "@/lib/content"

export function MyComponent() {
  const { lang } = useLanguage()
  const sectionContent = content[lang].section
  
  return <div>{sectionContent.title}</div>
}
```

Copy-paste this template for any new components.

## ✅ Refactored Components

- [x] `navbar.tsx` — Nav links + toggle
- [x] `hero-section.tsx` — Label, title, subtitle, CTA
- [x] `about-section.tsx` — About label, title, description, skills
- [x] `work-section.tsx` — Experience section + company info
- [x] `contact-footer.tsx` — Contact label, title, description, social labels
- [x] `app/layout.tsx` — Wrapped with LanguageProvider

## 🎯 Translation Philosophy

**English**: Professional, concise, global audience  
**Spanish**: Warm, natural, polished (not word-for-word)

Examples:
- "View My Work" → "Ver mi trabajo"
- "Let's build something together" → "Construyamos algo increíble juntos"

## 🚀 Production Ready

- ✅ No external API calls (Google Translate, etc.)
- ✅ No flags or country indicators
- ✅ Zero hard dependencies beyond Next.js
- ✅ Type-safe (full TypeScript support)
- ✅ Accessible (WCAG compliant)
- ✅ SEO-friendly (dynamic lang attribute)
- ✅ Performance optimized (no extra re-renders)

## 🐛 Troubleshooting

### Toggle not showing?
→ Check `components/navbar.tsx` imports  
→ Verify `LanguageProvider` wraps the app in `root-layout-client.tsx`

### Content not changing?
→ Ensure component has `"use client"` directive  
→ Verify import of `useLanguage` and `content`

### Hard refresh issues?
→ Clear browser cache or restart dev server  
→ Check localStorage is enabled in browser

## 📚 Full Documentation

See **`BILINGUAL_SYSTEM.md`** for:
- Detailed architecture explanation
- How the Context API works
- Adding new sections to content.ts
- Customizing toggle styling
- Browser compatibility

---

**That's it!** Your portfolio is now fully bilingual. Start editing content.ts and deploying. 🎉
