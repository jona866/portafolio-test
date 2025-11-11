# 🚀 Portafolio Personal - Portafolio Inteligente

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Portafolio web profesional con **asistente virtual simulado** que utiliza inteligencia artificial básica para responder preguntas sobre el perfil profesional, proyectos y habilidades.

## 📋 Descripción

Este es un portafolio web moderno de **Nivel 2 (Profesional)** y **Nivel 3 (Portafolio Inteligente)** que combina:

- **Diseño responsive** y profesional con modo oscuro/claro
- **Carga dinámica de proyectos** desde archivos JSON
- **Asistente virtual simulado** que responde preguntas frecuentes usando JavaScript y JSON (sin IA real)
- **SEO optimizado** y accesibilidad mejorada

## ✨ Características Principales

### 🎨 Nivel 2 - Portafolio Profesional

- ✅ **Diseño modular y profesional** con variables CSS personalizadas
- ✅ **Grid responsive**: 1 columna (móvil), 2 columnas (tablet), 3 columnas (desktop)
- ✅ **Carga dinámica de proyectos** desde `data/projects.json`
- ✅ **Efectos hover y transiciones** suaves en tarjetas y botones
- ✅ **SEO básico**: metaetiquetas, Open Graph y accesibilidad mejorada
- ✅ **Modo oscuro/claro** con persistencia en LocalStorage

### 🤖 Nivel 3 - Portafolio Inteligente

- ✅ **Asistente virtual simulado** tipo chatbot
- ✅ **Base de conocimiento** en `data/faq.json` con preguntas frecuentes
- ✅ **Búsqueda por palabras clave** (normalización de texto)
- ✅ **Interfaz de chat** con mensajes del usuario y respuestas del bot
- ✅ **Widget flotante** en la esquina inferior derecha
- ✅ **Animaciones suaves** al enviar y recibir mensajes

## 📁 Estructura del Proyecto

```
portafolio-test/
├── index.html          # Página principal con estructura semántica
├── styles.css          # Estilos con variables CSS y diseño responsive
├── script.js           # Lógica de carga dinámica y asistente
├── README.md           # Documentación del proyecto
├── .gitignore          # Archivos ignorados por Git
└── data/
    ├── projects.json   # Lista de proyectos del portafolio (5 proyectos)
    └── faq.json        # Base de conocimiento para el asistente (10 preguntas)
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript (ES6+)**: Fetch API, async/await, manipulación del DOM
- **JSON**: Almacenamiento de datos estructurados

## � Cómo Ejecutar el Proyecto

### Opción 1: Abrir directamente en el navegador

1. Clona este repositorio:
   ```bash
   git clone https://github.com/jona866/portafolio-test.git
   cd portafolio-test
   ```

2. Abre el archivo `index.html` directamente en tu navegador preferido
   - **Nota**: Algunos navegadores pueden bloquear las peticiones `fetch` por políticas CORS. En ese caso, usa la Opción 2.

### Opción 2: Usar Live Server (recomendado)

1. Si usas **VS Code**, instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

2. Haz clic derecho en `index.html` → **"Open with Live Server"**

3. El proyecto se abrirá automáticamente en `http://localhost:5500`

### Opción 3: Servidor local con Python

```bash
# Python 3
python -m http.server 8000

# Luego abre http://localhost:8000 en tu navegador
```

## � Usar el Asistente Inteligente

1. Haz clic en el botón **"💬 Asistente"** en la esquina inferior derecha

2. Escribe preguntas como:
   - "¿Qué tecnologías dominas?"
   - "¿En qué proyectos quieres trabajar?"
   - "¿Tienes experiencia en equipo?"
   - "¿Cómo puedo contactarte?"
   - "¿Estás disponible para prácticas?"

3. El asistente buscará palabras clave en tu pregunta y responderá con información relevante desde `data/faq.json`

### ⚙️ Cómo funciona el asistente (Simulado)

El asistente **NO utiliza IA real** como ChatGPT o modelos de lenguaje. En su lugar:

1. Carga un archivo JSON (`data/faq.json`) con preguntas frecuentes y palabras clave
2. Normaliza tu pregunta (minúsculas, sin acentos)
3. Busca coincidencias con las **keywords** de cada entrada del FAQ
4. Devuelve la respuesta asociada o un mensaje genérico si no encuentra coincidencias

**Ventajas de este enfoque:**
- ✅ No requiere API keys ni conexión a servicios externos
- ✅ Funciona 100% offline
- ✅ Totalmente personalizable editando `faq.json`
- ✅ Rápido y sin costos

**En el futuro**, este sistema podría conectarse a:
- Azure OpenAI
- GitHub Models
- Anthropic Claude
- Google Gemini
- OpenAI GPT

## � Personalización

### Agregar o modificar proyectos

Edita el archivo `data/projects.json`:

```json
{
  "title": "Nombre del Proyecto",
  "description": "Descripción breve de 2-3 líneas",
  "technologies": ["HTML", "CSS", "JavaScript"],
  "demoUrl": "https://tu-demo.com",
  "repoUrl": "https://github.com/tu-usuario/tu-repo"
}
```

### Agregar preguntas al asistente

Edita el archivo `data/faq.json`:

```json
{
  "question": "¿Nueva pregunta?",
  "keywords": ["palabra1", "palabra2", "palabra3"],
  "answer": "Respuesta que el asistente dará"
}
```

**Importante**: Las keywords deben estar en minúsculas y sin acentos.

## 🎨 Personalizar Colores

Las variables CSS están en `:root` en `styles.css`:

```css
:root {
    --bg: #0f172a;              /* Fondo principal */
    --text: #e2e8f0;            /* Color de texto */
    --accent: #3b82f6;          /* Color de acento (botones, enlaces) */
    --card-bg: #1e293b;         /* Fondo de tarjetas */
    /* ... más variables */
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/MejoraNueva`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/MejoraNueva`)
5. Abre un Pull Request

## � Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Ana Morales** (Portafolio de ejemplo)

- GitHub: [@jona866](https://github.com/jona866)
- Email: ana.morales.dev@example.com

## 🙏 Agradecimientos

- Este proyecto fue desarrollado con ayuda de **GitHub Copilot** y **ChatGPT**
- Diseño inspirado en portafolios modernos de desarrolladores

---

⭐ Si este proyecto te fue útil, no olvides darle una estrella en GitHub!

## 📚 Recursos y Aprendizaje

Este portafolio es perfecto para aprender:

- Fetch API y manejo de JSON
- Manipulación del DOM con JavaScript
- CSS Grid y Flexbox responsive
- Variables CSS y theming
- Arquitectura de proyectos frontend
- Simulación de asistentes con lógica básica

**Siguiente nivel**: Integrar un modelo de IA real usando Azure OpenAI o GitHub Models para respuestas más inteligentes.

