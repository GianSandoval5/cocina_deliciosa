# 🍳 Cocina Deliciosa - Recipe App

<div align="center">

![Recipe App Banner](https://via.placeholder.com/800x300/f37316/ffffff?text=Cocina+Deliciosa)

**Descubre, explora y cocina las mejores recetas del mundo** 🌍

[![React](https://img.shields.io/badge/React-19.x-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646cff?style=flat&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-f7df1e?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

[Demo en Vivo](https://cocina-deliciosa.vercel.app) • [Reportar Bug](https://github.com/GianSandoval5/cocina-deliciosa/issues) • [Solicitar Función](https://github.com/GianSandoval5/cocina-deliciosa/issues)

</div>

---

## ✨ Características Principales

- 🔍 **Búsqueda Inteligente** - Encuentra recetas por nombre con autocompletado
- 📚 **Navegación por Categorías** - Explora recetas organizadas por tipo de comida
- 🎯 **Detalles Completos** - Ingredientes, instrucciones paso a paso, tiempos y dificultad
- 📱 **Diseño Responsivo** - Optimizado para desktop, tablet y móvil
- ⚡ **Rendimiento Optimizado** - Carga rápida con lazy loading y memoización
- 🎨 **UI Moderna** - Diseño profesional con tema personalizable
- 🌐 **API Externa** - Integración inteligente con TheMealDB API
- 🔄 **Sistema de Respaldo** - Múltiples estrategias de carga para máxima disponibilidad
- 🏆 **Recetas Populares** - Algoritmo inteligente para mostrar contenido destacado

## 🏗️ Arquitectura del Proyecto

Este proyecto implementa **Screaming Architecture**, organizando el código por funcionalidad empresarial:

```
src/
├── features/              # Funcionalidades por dominio
│   ├── recipes/          # Gestión de recetas
│   │   ├── components/   # RecipeCard, RecipeGrid
│   │   ├── hooks/        # useRecipes, useRecipe
│   │   └── services/     # recipesService
│   ├── categories/       # Gestión de categorías
│   ├── home/            # Página principal
│   └── search/          # Funcionalidad de búsqueda
├── shared/               # Componentes y servicios reutilizables
│   ├── components/      # Button, Card, SearchBar, Loading
│   ├── services/        # apiService (Axios)
│   ├── constants/       # Configuración y constantes
│   └── hooks/           # Hooks compartidos
└── pages/               # Componentes de página
    ├── HomePage.jsx
    ├── CategoryPage.jsx
    ├── RecipeDetailPage.jsx
    └── SearchPage.jsx
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** 18.0.0 o superior
- **npm** 9.0.0 o superior

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/GianSandoval5/cocina_deliciosa.git

# Navegar al directorio
cd cocina_deliciosa

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno

No se requieren variables de entorno adicionales. La aplicación usa la API pública de TheMealDB.

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo (Puerto 5173)
npm run dev:host     # Servidor de desarrollo con acceso de red

# Producción
npm run build        # Construir para producción
npm run preview      # Preview de la construcción de producción

# Calidad de Código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir problemas de ESLint automáticamente

# Utilidades
npm run clean        # Limpiar node_modules y archivos de cache
npm run analyze      # Analizar el bundle (requiere bundle-analyzer)
```

## 🎯 Funcionalidades Detalladas

### 🏠 Página Principal
- Hero section con buscador prominente
- Grid de categorías populares
- Carrusel de recetas aleatorias
- Navegación intuitiva

### 🔍 Sistema de Búsqueda
- Búsqueda en tiempo real con debounce
- Filtros por nombre de receta
- Resultados paginados
- Estados de carga y error

### 📖 Detalles de Recetas
- Imagen de alta calidad
- Lista completa de ingredientes con medidas
- Instrucciones paso a paso numeradas
- Información nutricional y dificultad
- Enlaces a videos de YouTube
- Fuentes originales de las recetas

### 📱 Categorías
- Grid visual de todas las categorías
- Filtrado dinámico por categoría
- Navegación breadcrumb
- Carga lazy de contenido

## 🧪 Tecnologías Utilizadas

### Frontend Core
- **React 19** - Framework de UI con las últimas características
- **Vite 7** - Build tool ultrarrápido con HMR
- **React Router 6** - Enrutamiento declarativo

### Estado y Datos
- **Custom Hooks** - Gestión de estado local optimizada
- **Axios** - Cliente HTTP con interceptores
- **TheMealDB API** - Fuente de datos de recetas

### Styling y UI
- **CSS Modules** - Estilos modulares y scoped
- **Custom CSS Properties** - Sistema de design tokens
- **Lucide React** - Iconografía moderna y consistente

### Desarrollo
- **ESLint** - Linting y calidad de código
- **Prettier** - Formateo automático de código
- **React DevTools** - Debugging y profiling

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
  --primary: #f37316;      /* Naranja principal */
  --secondary: #22c55e;    /* Verde secundario */
  --accent: #3b82f6;       /* Azul para acentos */
  --neutral-50: #fafafa;   /* Backgrounds claros */
  --neutral-900: #0a0a0a;  /* Texto principal */
}
```

### Tipografía
- **Primaria:** Inter (Google Fonts)
- **Tamaños:** Sistema modular de 12px a 48px
- **Pesos:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

## 📊 Rendimiento

### Optimizaciones Implementadas
- ⚡ **Code Splitting** - Carga de componentes bajo demanda
- 🔄 **Memoización** - useCallback y useMemo para prevenir re-renders
- 🖼️ **Lazy Loading** - Carga diferida de imágenes
- 📦 **Bundle Optimization** - Tree shaking y minificación
- 💾 **Service Worker** - Cache inteligente (en desarrollo)

### Métricas Objetivo
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

## 🧪 Testing (En Desarrollo)

```bash
# Testing unitario
npm run test             # Jest + React Testing Library

# Testing E2E
npm run test:e2e         # Cypress

# Coverage
npm run test:coverage    # Reporte de cobertura
```

## 📦 Deployment

### Vercel (Recomendado)
```bash
# Deploy automático conectando el repositorio
vercel --prod
```

### Netlify
```bash
# Build y deploy
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. **Fork** del proyecto
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### Convenciones de Código
- Usar **ES6+** y características modernas de JavaScript
- Seguir **React Best Practices**
- Mantener **componentes pequeños y focused**
- Escribir **tests** para nuevas funcionalidades
- Documentar **props** y funciones complejas

## 🐛 Resolución de Problemas

### Problemas Comunes

**Error de CORS**
```bash
# Usar proxy de desarrollo
npm run dev -- --host
```

**Dependencias obsoletas**
```bash
npm audit fix
npm update
```

**Puerto ocupado**
```bash
# Cambiar puerto en vite.config.js
export default defineConfig({
  server: { port: 3001 }
})
```

## 📝 Changelog

### [1.0.0] - 2025-11-10
#### ✨ Agregado
- Implementación inicial de la aplicación
- Sistema de búsqueda de recetas
- Navegación por categorías
- Página de detalles de recetas
- Diseño responsivo completo
- Integración con TheMealDB API

#### 🔧 Optimizado
- Arquitectura screaming architecture
- Hooks personalizados para gestión de estado
- Componentes reutilizables
- Sistema de routing optimizado

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Gian Sandoval**
- GitHub: [@GianSandoval5](https://github.com/GianSandoval5)
- LinkedIn: [Gian Sandoval](https://www.linkedin.com/in/giansandoval/)
- Email: giansando2022@gmail.com

## 🙏 Agradecimientos

- [TheMealDB](https://www.themealdb.com/) - Por proporcionar la API gratuita de recetas
- [Lucide](https://lucide.dev/) - Por los hermosos iconos
- [React Team](https://reactjs.org/) - Por el increíble framework
- [Vite Team](https://vitejs.dev/) - Por la herramienta de build ultrarrápida

---

<div align="center">

**⭐ Si te gustó este proyecto, no olvides darle una estrella ⭐**

[⬆ Volver arriba](#-cocina-deliciosa---recipe-app)

</div>
