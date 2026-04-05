# 🔧 Solución: Configurar Firestore para Proyectos

## El Problema

Recibes el error: **`FirebaseError: Missing or insufficient permissions`**

Esto significa que Firestore tiene reglas de seguridad que **no permiten lectura pública** (que es correcto por seguridad, pero necesita configuración para desarrollo).

## ✅ Solución Rápida (Para Desarrollo)

### Paso 1: Abre Firebase Console
1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto: **`thiago-portfolio-dev`**

### Paso 2: Ve a Firestore Database
- En el menú lateral izquierdo, haz clic en: **Build** → **Firestore Database**

### Paso 3: Configura las Reglas de Seguridad
1. Haz clic en la pestaña: **Rules**
2. Borra todo el contenido actual
3. Pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de proyectos (para el portafolio)
    match /proyectos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Proteger otras colecciones
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. Haz clic en **Publish**

### Paso 4: Recarga tu App
- Recarga la página: `http://localhost:3000`
- El carrusel ahora traerá datos de Firestore (si existen)

---

## 📝 Crear la Colección de Proyectos (Si No Existe)

### Opción A: Manual desde Console (Más Fácil)

1. En Firestore Database, haz clic en: **+ Create collection**
2. Nombre: `proyectos`
3. El primero ID de documento: auto-generar (o pon un nombre)
4. Agrega estos campos:

```
Field        Type      Value
─────────────────────────────────
title        string    Portfolio Liquid Glass
description  string    Un portafolio moderno...
image        string    https://via.placeholder.com/600x400...
tags         array     ["Next.js", "TypeScript", "Tailwind CSS"]
link         string    https://portfolio.example.com
github       string    https://github.com/example/portfolio
```

5. Haz clic en **Save**
6. Repite para agregar más proyectos

### Opción B: Con Código (Desde tu App)

```typescript
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EXAMPLE_PROJECTS } from "@/lib/projects-helpers";

// En la consola del navegador (F12), ejecuta:
for (const project of EXAMPLE_PROJECTS) {
  await addDoc(collection(db, "proyectos"), project);
}
```

---

## 🎯 Resumen de Pasos

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Abre Firebase Console | Acceso a tu proyecto |
| 2 | Ve a Firestore Rules | Página de reglas |
| 3 | Paga las reglas | Lectura pública habilitada |
| 4 | Recarga la app | Permisos actualizados |
| 5 | Agrega proyectos | Datos visibles en el carrusel |

---

## 🛡️ Notas de Seguridad

- ✅ **Las reglas permiten lectura del lado del cliente** (necesario para mostrar en el portafolio)
- ✅ **Solo los autenticados pueden escribir** (protege contra spam)
- ✅ **Otras colecciones están bloqueadas** (seguridad adicional)

Para producción, considera agregar autenticación más restrictiva.

---

## 🐛 Troubleshooting

### Sigue viendo el error después de configurar

1. Asegúrate de hacer clic en **Publish** después de cambiar las reglas
2. Espera 30-60 segundos para que se apliquen los cambios
3. Recarga la página en el navegador (Ctrl+Shift+R para forzar)
4. Abre la consola (F12) y verifica los errores

### No veo cambios en el carrusel

- Verifica que la colección `proyectos` exista
- Verifica que tenga al menos un documento
- Abre la consola de desarrollador (F12) → Pestaña Network
- Recarga y busca errores

### Necesito ver los datos en tiempo real

- En Firestore Console, ve a tu colección `proyectos`
- Deberías ver los documentos listados
- Haz clic en uno para ver los detalles

---

¡Después de hacer esto, tu carrusel de proyectos debería funcionar perfectamente! 🎉
