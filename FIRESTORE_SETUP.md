# Configuración de Firebase Firestore para Proyectos

## 📋 Estructura del Componente

El componente `ProjectsCarousel` está diseñado para mostrar tus proyectos en un carrusel elegante con estilo liquid glass. Trae datos de Firebase Firestore y mantiene un conjunto de datos mock como fallback.

## 🔧 Configuración de Firebase

### Variables de Entorno

Las variables de Firebase ya están configuradas en `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB4BVK9sKvomAen6ylmPZ2-n-CFJ-P1xvI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=thiago-portfolio-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=thiago-portfolio-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=thiago-portfolio-dev.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=775664074583
NEXT_PUBLIC_FIREBASE_APP_ID=1:775664074583:web:cba7468a73e51a57e08812
```

## 📚 Estructura de la Colección en Firestore

### Crear la Colección "proyectos"

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `thiago-portfolio-dev`
3. Ve a **Firestore Database**
4. Haz clic en **+ Create collection**
5. Nombra la colección como: `proyectos`

### Estructura de Documentos

Cada documento en la colección `proyectos` debe tener la siguiente estructura:

```typescript
{
  id: string;           // ID automático de Firestore (se genera automáticamente)
  title: string;        // Título del proyecto
  description: string;  // Descripción del proyecto
  image: string;        // URL de la imagen
  tags: string[];       // Array de tecnologías/tags
  link?: string;        // URL del proyecto en vivo (opcional)
  github?: string;      // URL del repositorio GitHub (opcional)
}
```

### Ejemplo de Documentos

```json
{
  "title": "Portfolio Liquid Glass",
  "description": "Un portafolio moderno con diseño liquid glass, tema oscuro y sistema bilingüe. Construido con Next.js 16 y Tailwind CSS.",
  "image": "https://via.placeholder.com/600x400?text=Portfolio",
  "tags": ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
  "link": "https://portfolio.example.com",
  "github": "https://github.com/example/portfolio"
}
```

## 🎨 Características del Componente

### Funcionalidades

- ✅ **Carrusel responsivo**: Muestra un proyecto a la vez
- ✅ **Ancho optimizado**: Ocupa 80% del width en desktop
- ✅ **Estilo Liquid Glass**: Coincide con la estética de tu portafolio
- ✅ **Navegación**: Botones de siguiente/anterior
- ✅ **Indicadores**: Puntos de navegación al pie
- ✅ **Datos Mock**: Muestra proyectos ejemplo si Firestore está vacío
- ✅ **Manejo de Errores**: Fallback a mock data en caso de error
- ✅ **Loading State**: Muestra estado de carga mientras trae los datos

### Componentes Utilizados

- `embla-carousel-react`: Carrusel responsivo
- `firebase/firestore`: Conexión a Firestore
- `lucide-react`: Iconos (ChevronLeft, ChevronRight, ExternalLink, Github)
- `axios`: Para requests (estructura preparada)

## 📱 Responsividad

- **Mobile**: Carrusel ocupa 100% del width
- **Desktop**: Carrusel ocupa 80% del width centered
- **Botones de navegación**: Se posicionan a los lados con offset responsivo
- **Indicadores**: Centrados al pie del carrusel

## 🎯 Cómo Agregar Proyectos a Firestore

### Opción 1: Console Manual

1. Abre Firestore Console
2. Selecciona la colección `proyectos`
3. Haz clic en **+ Add document**
4. Llena los campos según la estructura indicada arriba
5. Haz clic en **Save**

### Opción 2: Programáticamente (desde tu app)

```typescript
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const newProject = {
  title: "Mi Nuevo Proyecto",
  description: "Descripción del proyecto...",
  image: "https://...",
  tags: ["React", "Node.js"],
  link: "https://...",
  github: "https://...",
};

await addDoc(collection(db, "proyectos"), newProject);
```

## 🔄 Datos Mock

Si la colección `proyectos` está vacía o no hay conexión a Firestore, el componente mostrará automáticamente 3 proyectos de ejemplo:

1. Portfolio Liquid Glass
2. E-commerce Platform
3. Task Management App

Estos datos se encuentran en `MOCK_PROJECTS` dentro del componente.

## 🐛 Troubleshooting

### El componente no muestra los proyectos

1. Verifica que Firebase esté configurado correctamente en `.env.local`
2. Verifica que la colección `proyectos` exista en Firestore
3. Abre la consola del navegador para ver los errores
4. Verifica que las imágenes de los proyectos sean URLs válidas

### Los proyectos mock se muestran en lugar de los datos de Firestore

- Esto es normal si Firestore está vacío, el componente está diseñado así
- Agrega documentos a la colección `proyectos` en Firestore

### Errores de CORS

- Si tienes errores de CORS, verifica las reglas de seguridad de Firestore
- Por defecto, Firestore permite lectura en desarrollo

## 🔐 Reglas de Seguridad de Firestore (Recomendado)

Para desarrollo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /proyectos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📦 Dependencias Agregadas

- `axios@^1.7.2` - Cliente HTTP
- `firebase@^11.1.0` - Firebase SDK

## 🚀 Próximos Pasos

1. Agrega tus proyectos a la colección `proyectos` en Firestore
2. Prueba el carrusel en `http://localhost:3000`
3. Personaliza los estilos según tus preferencias
4. Modifica las imágenes y los datos de tus proyectos

## 📝 Notas

- El componente es **client-side**, por lo que Firestore debe permitir lectura pública
- Las imágenes se pueden alojar en Firebase Storage, URLs externas o cualquier CDN
- El carrusel es infinito (loop: true)
- Los botones de navegación se deshabilitan automáticamente al final del carrusel

---

¿Necesitas ayuda con algo más? Revisa los logs de la consola del navegador para diagnosticar problemas.
