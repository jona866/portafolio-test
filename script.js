// ============================================
// SCRIPT PRINCIPAL DEL PORTAFOLIO
// ============================================

// Variable global para almacenar los datos del FAQ
let faqData = [];

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================
function initializePortfolio() {
    updateFooterYear();
    setupThemeToggle();
    setupSmoothScroll();
    loadThemePreference();
    
    // Funcionalidades de Nivel 2 y 3
    loadProjects();
    loadFAQData();
    setupAssistant();
}

// ============================================
// ACTUALIZAR AÑO EN EL FOOTER
// ============================================
/**
 * Actualiza dinámicamente el año actual en el footer
 * para mantener el copyright actualizado sin edición manual
 */
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ============================================
// TOGGLE DE MODO OSCURO/CLARO
// ============================================
/**
 * Configura el botón de cambio de tema (modo oscuro/claro)
 * Alterna la clase 'light-theme' en el body y actualiza el texto del botón
 */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // Alternar la clase light-theme en el body
            document.body.classList.toggle('light-theme');
            
            // Actualizar el texto del botón según el tema actual
            updateThemeButtonText();
            
            // Guardar la preferencia del usuario en localStorage
            saveThemePreference();
        });
    }
}

/**
 * Actualiza el texto del botón de tema basándose en el tema actual
 */
function updateThemeButtonText() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const isLightTheme = document.body.classList.contains('light-theme');
    
    if (themeToggleBtn) {
        themeToggleBtn.textContent = isLightTheme ? 'Modo oscuro' : 'Modo claro';
    }
}

/**
 * Guarda la preferencia de tema del usuario en localStorage
 */
function saveThemePreference() {
    const isLightTheme = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

/**
 * Carga la preferencia de tema guardada previamente
 */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        updateThemeButtonText();
    }
}

// ============================================
// SCROLL SUAVE A SECCIONES
// ============================================
/**
 * Configura el scroll suave cuando se hace clic en los enlaces
 * de navegación que apuntan a secciones de la página (anclas)
 */
function setupSmoothScroll() {
    // Seleccionar todos los enlaces de navegación con href que comience con #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el id de la sección objetivo
            const targetId = this.getAttribute('href');
            
            // Si el href es solo "#", no hacer nada
            if (targetId === '#') return;
            
            // Buscar el elemento objetivo
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición considerando el header fijo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Realizar scroll suave a la posición calculada
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// EFECTOS ADICIONALES AL HACER SCROLL
// ============================================
/**
 * Agrega efecto de resaltado al link activo del menú según la sección visible
 * (Opcional: puede activarse si se desea feedback visual del scroll)
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Descomentar la siguiente línea si se desea activar el resaltado de sección activa
// highlightActiveSection();

// ============================================
// MANEJO DE LINKS EXTERNOS
// ============================================
/**
 * Agrega atributos de seguridad a todos los enlaces externos
 * para prevenir vulnerabilidades de seguridad
 */
function secureExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Asegurar que los links externos tengan rel="noopener noreferrer"
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Ejecutar función de seguridad para links externos
secureExternalLinks();

// ============================================
// NIVEL 2: CARGA DINÁMICA DE PROYECTOS
// ============================================

/**
 * Carga los proyectos desde el archivo JSON y los renderiza en la página
 */
async function loadProjects() {
    try {
        // Hacer fetch al archivo projects.json
        const response = await fetch('./data/projects.json');
        
        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Parsear el JSON
        const projects = await response.json();
        
        // Renderizar los proyectos en el DOM
        renderProjects(projects);
        
    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
        showProjectsError();
    }
}

/**
 * Renderiza las tarjetas de proyectos en el contenedor
 * @param {Array} projects - Array de objetos de proyectos
 */
function renderProjects(projects) {
    // Obtener el contenedor donde se insertarán los proyectos
    const container = document.getElementById('projects-container');
    
    if (!container) {
        console.error('No se encontró el contenedor de proyectos');
        return;
    }
    
    // Limpiar el contenedor por si acaso
    container.innerHTML = '';
    
    // Iterar sobre cada proyecto y crear su tarjeta
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.appendChild(projectCard);
    });
}

/**
 * Crea un elemento de tarjeta de proyecto
 * @param {Object} project - Objeto con datos del proyecto
 * @returns {HTMLElement} - Elemento article con la tarjeta del proyecto
 */
function createProjectCard(project) {
    // Crear el elemento article principal
    const article = document.createElement('article');
    article.className = 'project-card';
    
    // Crear el título del proyecto
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;
    
    // Crear la descripción
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    
    // Crear el contenedor de tecnologías
    const techContainer = document.createElement('div');
    techContainer.className = 'project-tech';
    
    // Agregar cada tecnología como un tag
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Crear el contenedor de enlaces
    const linksContainer = document.createElement('div');
    linksContainer.className = 'project-links';
    
    // Crear enlace a demo
    const demoLink = document.createElement('a');
    demoLink.href = project.demoUrl;
    demoLink.className = 'btn-secondary';
    demoLink.target = '_blank';
    demoLink.rel = 'noopener noreferrer';
    demoLink.textContent = 'Ver demo';
    
    // Crear enlace a repositorio
    const repoLink = document.createElement('a');
    repoLink.href = project.repoUrl;
    repoLink.className = 'btn-outline';
    repoLink.target = '_blank';
    repoLink.rel = 'noopener noreferrer';
    repoLink.textContent = 'Ver en GitHub';
    
    // Ensamblar los enlaces
    linksContainer.appendChild(demoLink);
    linksContainer.appendChild(repoLink);
    
    // Ensamblar toda la tarjeta
    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(techContainer);
    article.appendChild(linksContainer);
    
    return article;
}

/**
 * Muestra un mensaje de error si no se pueden cargar los proyectos
 */
function showProjectsError() {
    const container = document.getElementById('projects-container');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p style="color: var(--text-secondary);">
                    No se pudieron cargar los proyectos. Por favor, intenta recargar la página.
                </p>
            </div>
        `;
    }
}

// ============================================
// NIVEL 3: ASISTENTE INTELIGENTE SIMULADO
// ============================================

/**
 * Carga los datos del FAQ desde el archivo JSON
 */
async function loadFAQData() {
    try {
        const response = await fetch('./data/faq.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        faqData = await response.json();
        console.log('FAQ data cargada correctamente:', faqData.length, 'preguntas');
        
    } catch (error) {
        console.error('Error al cargar el FAQ:', error);
        faqData = [];
    }
}

/**
 * Configura los event listeners del asistente
 */
function setupAssistant() {
    const toggleBtn = document.getElementById('assistant-toggle');
    const closeBtn = document.getElementById('assistant-close');
    const panel = document.getElementById('assistant-panel');
    const form = document.getElementById('assistant-form');
    
    // Abrir el panel del asistente
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (panel) {
                panel.classList.add('active');
            }
        });
    }
    
    // Cerrar el panel del asistente
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (panel) {
                panel.classList.remove('active');
            }
        });
    }
    
    // Manejar el envío de mensajes
    if (form) {
        form.addEventListener('submit', handleAssistantMessage);
    }
}

/**
 * Maneja el envío de mensajes del usuario al asistente
 * @param {Event} e - Evento del formulario
 */
function handleAssistantMessage(e) {
    e.preventDefault();
    
    const input = document.getElementById('assistant-input');
    const userQuestion = input.value.trim();
    
    // Validar que el mensaje no esté vacío
    if (!userQuestion) return;
    
    // Agregar el mensaje del usuario al chat
    addMessage(userQuestion, 'user');
    
    // Limpiar el input
    input.value = '';
    
    // Simular "tiempo de pensamiento" del bot
    setTimeout(() => {
        // Obtener respuesta del asistente
        const answer = getAssistantAnswer(userQuestion);
        
        // Agregar respuesta del bot al chat
        addMessage(answer, 'bot');
    }, 500);
}

/**
 * Agrega un mensaje al contenedor del chat
 * @param {string} text - Texto del mensaje
 * @param {string} sender - 'user' o 'bot'
 */
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('assistant-messages');
    
    if (!messagesContainer) return;
    
    // Crear el elemento del mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `assistant-message assistant-message--${sender}`;
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;
    
    messageDiv.appendChild(messageParagraph);
    messagesContainer.appendChild(messageDiv);
    
    // Hacer scroll automático hacia el último mensaje
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Busca una respuesta en el FAQ basándose en las palabras clave
 * @param {string} questionText - Pregunta del usuario
 * @returns {string} - Respuesta encontrada o mensaje por defecto
 */
function getAssistantAnswer(questionText) {
    // Normalizar la pregunta del usuario
    const normalizedQuestion = normalizeText(questionText);
    
    // Buscar en el FAQ una coincidencia con las keywords
    for (let i = 0; i < faqData.length; i++) {
        const faqEntry = faqData[i];
        
        // Verificar si alguna keyword está presente en la pregunta
        const hasMatch = faqEntry.keywords.some(keyword => {
            return normalizedQuestion.includes(keyword);
        });
        
        // Si hay coincidencia, devolver la respuesta
        if (hasMatch) {
            return faqEntry.answer;
        }
    }
    
    // Si no se encuentra coincidencia, devolver mensaje por defecto
    return 'No estoy seguro de eso 🤔, pero puedes revisar la sección de proyectos o contacto para más información. También puedes preguntarme sobre las tecnologías que Ana domina, su experiencia o su disponibilidad.';
}

/**
 * Normaliza un texto: minúsculas y sin acentos
 * @param {string} text - Texto a normalizar
 * @returns {string} - Texto normalizado
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// ============================================
// ANIMACIÓN DE ENTRADA PARA ELEMENTOS
// ============================================
/**
 * Observador de intersección para animar elementos cuando entran en viewport
 * (Opcional: mejora la experiencia visual al hacer scroll)
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Descomentar la siguiente línea si se desea activar animaciones de scroll
// setupScrollAnimations();

// ============================================
// MENSAJE DE CONSOLA (EASTER EGG)
// ============================================
console.log('%c¡Hola, desarrollador! 👋', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cGracias por revisar el código fuente de mi portafolio.', 'color: #60a5fa; font-size: 14px;');
console.log('%c- Ana Morales', 'color: #94a3b8; font-size: 12px; font-style: italic;');
