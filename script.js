// ============================================
// SCRIPT PRINCIPAL DEL PORTAFOLIO
// ============================================

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
