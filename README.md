# Portfolio Personal - Augusto Galván

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Portfolio profesional interactivo con sistema de contacto funcional y tema claro/oscuro**

[Ver Demo](http://augustogalvanb.github.io/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Funcionalidades Destacadas](#-funcionalidades-destacadas)
- [Estructura de Archivos](#-estructura-de-archivos)
- [Sistema de Contacto](#-sistema-de-contacto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Deployment](#-deployment)
- [Optimizaciones](#-optimizaciones)
- [Próximas Mejoras](#-próximas-mejoras)
- [Contacto](#-contacto)

---

## 🎯 Descripción General

Portfolio personal desarrollado con Vanilla JavaScript y un backend para el manejo del formulario de contacto. El proyecto destaca por su diseño limpio, rendimiento optimizado y experiencia de usuario fluida.

### **¿Por qué este proyecto es interesante?**

- ✅ **Arquitectura híbrida**: Frontend vanilla + Backend serverless
- ✅ **Sistema de temas**: Implementación completa de dark/light mode con persistencia
- ✅ **Animaciones performantes**: Uso estratégico de AOS y Intersection Observer
- ✅ **Formulario funcional real**: No es solo diseño, el contacto realmente envía emails
- ✅ **UX refinada**: Modales, toasts, validaciones y micro-interacciones
- ✅ **Código limpio**: Organizado, comentado y fácil de mantener

---

## ⚡ Características Principales

### 🎨 **Interfaz y Diseño**

- **Sistema de Temas Dual**: Toggle entre modo claro y oscuro con persistencia en LocalStorage
- **Diseño Responsive**: Adaptable a dispositivos móviles, tablets y desktop
- **Animaciones Fluidas**: Implementadas con AOS.js e Intersection Observer
- **Gradientes Modernos**: Sistema de colores con CSS custom properties

### 🛠️ **Funcionalidades Técnicas**

- **Lazy Loading de Imágenes**: Carga diferida para optimizar performance
- **Scroll Suave**: Navegación entre secciones con smooth scroll
- **Sistema de Modales**: 
  - Modal de CV con call-to-action
  - Modal de video con YouTube embeds
  - Cierre con tecla ESC y click fuera del modal
- **Formulario de Contacto Funcional**:
  - Validación en tiempo real
  - Envío asíncrono con feedback visual
  - Sistema de notificaciones toast
  - Backend con Nodemailer

### 🎭 **Experiencia de Usuario**

- **Feedback Visual**: Estados de carga, éxito y error
- **Typing Effect**: Animación de máquina de escribir en el hero
- **Scroll to Top Button**: Botón flotante para volver arriba
- **Hover Effects**: Micro-interacciones en cards y botones

---

## 🛠️ Stack Tecnológico

### **Frontend**

| Tecnología | Uso | Versión |
|------------|-----|---------|
| **HTML5** | Estructura semántica | - |
| **CSS3** | Diseño, animaciones y responsive | - |
| **JavaScript ES6+** | Lógica del lado del cliente | - |
| **AOS.js** | Animaciones on scroll | 2.3.1 |
| **Font Awesome** | Iconografía | 6.4.0 |
| **Google Fonts** | Tipografías (Inter, JetBrains Mono) | - |

### **Backend**

| Tecnología | Uso | Versión |
|------------|-----|---------|
| **Node.js** | Runtime del servidor | 18+ |
| **Nodemailer** | Envío de emails | Latest |
| **Vercel** | Hosting del backend | - |

### **Herramientas de Desarrollo**

- Git & GitHub para control de versiones
- Vercel para deployment del backend
- Gmail SMTP para servicio de emails
- Github Pages para deployment del frontend
---

## 🌟 Funcionalidades Destacadas

### 1️⃣ **Sistema de Temas con Persistencia**

```javascript
// Implementación del theme toggle con localStorage
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema guardado al cargar
if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle y persistencia
themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // ... actualización del header
});
```

**Características**:
- Persistencia entre sesiones
- Transiciones suaves
- Variables CSS dinámicas
- Sincronización del header

### 2️⃣ **Formulario de Contacto con Backend Real**

```javascript
// Envío asíncrono con manejo de estados
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Estado de carga
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        const response = await fetch('https://tu-api.vercel.app/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showToast('Mensaje enviado con éxito', 'success');
            contactForm.reset();
        }
    } catch (error) {
        showToast('Error de conexión', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});
```

**Backend**:
```javascript
// contact.js - Vercel Serverless Function
export default async function handler(req, res) {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Validación de datos
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Faltan datos' 
        });
    }
    
    // Envío con Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
}
```

### 3️⃣ **Intersection Observer para Animaciones Optimizadas**

```javascript
// Observador de intersección para fade-in de secciones
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
});
```

### 4️⃣ **Sistema de Modales Reutilizables**

- **Modal de CV**: Redirige al formulario de contacto
- **Modal de Videos**: Embeds de YouTube con autoplay
- **Características**:
  - Cierre con ESC
  - Click fuera del modal
  - Prevención de scroll del body
  - Limpieza del iframe al cerrar

### 5️⃣ **Navegación Activa Dinámica**

```javascript
function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active-link');
            });
            document.querySelector(`a[href="#${sectionId}"]`)
                .classList.add('active-link');
        }
    });
}
```

---

## 📁 Estructura de Archivos

```
portfolio/
│
├── index.html                 # Estructura HTML principal
├── styles.css                 # Sistema de diseño completo
├── script.js                  # Toda la lógica del cliente
│
├── assets/                    # Recursos estáticos
│   ├── images                # Imágenes del portfolio
│   ├── logo.svg              # Logo personal
│  
│
└── api/                       # Backend
    └── contact.js            # Handler del formulario
```

### **Organización del Código**

**script.js está estructurado en bloques lógicos**:

1. **Inicialización**: AOS, loader, tema
2. **Navegación**: Mobile menu, scroll effects
3. **Formulario**: Validación, envío, toasts
4. **Modales**: CV modal, video modal
5. **Animaciones**: Typing effect, hover effects
6. **Utilidades**: Scroll to top, lazy loading
7. **Observers**: Intersection Observer, scroll spy

---

## 📧 Sistema de Contacto

### **Arquitectura del Formulario**

```
Cliente (Frontend)
    ↓
Validación Local
    ↓
Fetch API (POST)
    ↓
Vercel Server
    ↓
Validación Backend
    ↓
Nodemailer + Gmail SMTP
    ↓
Email HTML Formateado
    ↓
Notificación Toast al Usuario
```

### **Template del Email**

El email enviado incluye:
- Header con gradiente
- Datos del remitente en bloques destacados
- Mensaje con formato preservado
- Diseño responsive

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**

- Node.js 18+ 
- Cuenta de Gmail con contraseña de aplicación

### **Instalación Local**

```bash
# 1. Clonar el repositorio
git clone https://github.com/augustogalvanb/augustogalvanb.github.io.git
cd augustogalvanb.github.io

# 2. El frontend no requiere instalación, abrir index.html en el navegador
# O usar un servidor local:
npx serve .

```

### **Configuración del Backend**

1. **Crear una App Password en Gmail**:
   - Ve a tu cuenta de Google
   - Seguridad → Verificación en dos pasos → Contraseñas de aplicaciones
   - Genera una contraseña para "Mail"

2. **Crear archivo `.env` en la raíz**:
```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_de_16_caracteres
```

---

## 📦 Deployment

## 🔐 Variables de Entorno

### **Backend (Vercel)**

Configura estas variables en el dashboard de Vercel:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `EMAIL_USER` | Email de Gmail | `tu_email@gmail.com` |
| `EMAIL_PASS` | App Password de Gmail | `abcd efgh ijkl mnop` |

### **Frontend**

Actualizar la URL del endpoint en `script.js`:

```javascript
const response = await fetch('https://TU_PROYECTO.vercel.app/api/contact', {
    method: 'POST',
    // ...
});
```

### **Frontend (GitHub Pages, Netlify, Vercel)**

```bash
# Opción 1: GitHub Pages
git push origin main
# Configurar en Settings → Pages

# Opción 2: Vercel
vercel --prod

# Opción 3: Netlify
netlify deploy --prod
```

### **Backend (Vercel)**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Crear vercel.json en la raíz:
{
  "functions": {
    "api/contact.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}

# 4. Deploy
vercel --prod

```

---

## ⚡ Optimizaciones

### **Performance**

✅ **Lazy Loading**: Imágenes cargadas bajo demanda  
✅ **Minificación**: CSS y JS comprimidos en producción  
✅ **Preload**: Fuentes y recursos críticos  
✅ **Debouncing**: En eventos de scroll  
✅ **Intersection Observer**: Mejor que scroll events  

### **SEO**

✅ **Semantic HTML**: Etiquetas semánticas (header, nav, section)  
✅ **Meta Tags**: Título, descripción, OG tags  
✅ **Alt Text**: Todas las imágenes tienen descripción  
✅ **Schema Markup**: Datos estructurados (próximamente)  

### **Accesibilidad**

✅ **ARIA Labels**: En botones y enlaces  
✅ **Keyboard Navigation**: Navegación con teclado  
✅ **Contrast Ratios**: Cumple WCAG 2.1  
✅ **Focus Indicators**: Indicadores visuales claros  

---

## 👤 Contacto

**Augusto Galván** - Backend Web Developer Jr.

- 📧 Email: augusto_galvan@outlook.com
- 💼 LinkedIn: [linkedin.com/in/augustogalvanb](https://linkedin.com/in/augustogalvanb/)
- 🐙 GitHub: [github.com/augustogalvanb](https://github.com/augustogalvanb)
- 📍 Ubicación: San Miguel de Tucumán, Argentina
