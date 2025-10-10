// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Update header background immediately when theme changes
    updateHeaderBackground();
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Header scroll effect - Fixed to update properly on theme change
let lastScroll = 0;

function updateHeaderBackground() {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    const isDarkTheme = html.getAttribute('data-theme') === 'dark';
    
    if (currentScroll > 100) {
        header.style.background = isDarkTheme 
            ? 'rgba(15, 23, 42, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.background = isDarkTheme 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', () => {
    updateHeaderBackground();
    lastScroll = window.pageYOffset;
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Disable submit button and show loading state
    const submitButton = contactForm.querySelector('.form-submit');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // Send data to API - CAMBIA ESTA URL POR LA DE TU PROYECTO EN VERCEL
        const response = await fetch('https://tu-proyecto.vercel.app/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success toast
            showToast(result.message || 'Mensaje enviado con éxito. ¡Te responderé pronto!', 'success');
            
            // Reset form
            contactForm.reset();
        } else {
            // Show error toast
            showToast(result.message || 'Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de conexión. Por favor intenta nuevamente o contáctame directamente por email.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000); // Se oculta después de 4 segundos
}

// CV Modal functionality
const downloadCVBtn = document.getElementById('downloadCV');
const cvModal = document.getElementById('cvModal');
const closeCvModal = document.getElementById('closeCvModal');
const goToContact = document.getElementById('goToContact');

downloadCVBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cvModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

closeCvModal.addEventListener('click', () => {
    cvModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

goToContact.addEventListener('click', () => {
    cvModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Video Modal functionality
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const videoFrame = document.getElementById('videoFrame');
const videoButtons = document.querySelectorAll('.video-btn');

videoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = button.getAttribute('data-video');
        
        // Set YouTube embed URL with autoplay
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        videoModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

closeVideoModal.addEventListener('click', () => {
    closeVideoModalFunction();
});

// Close video modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModalFunction();
    }
});

// Close video modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (videoModal.classList.contains('show')) {
            closeVideoModalFunction();
        }
        if (cvModal.classList.contains('show')) {
            cvModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
});

function closeVideoModalFunction() {
    videoModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    // Stop video by clearing the src
    videoFrame.src = '';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-text .subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1500);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animate skill badges on hover
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add animation to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Counter animation for stats (if you want to add stats section)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active-link');
                });
                navLink.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Preload images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call preload function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// Add copy email functionality
const emailElement = document.querySelector('.contact-details p');
if (emailElement && emailElement.textContent.includes('@')) {
    emailElement.style.cursor = 'pointer';
    emailElement.title = 'Click para copiar email';
    
    emailElement.addEventListener('click', () => {
        const email = emailElement.textContent.trim();
        navigator.clipboard.writeText(email).then(() => {
            showToast('Email copiado al portapapeles', 'success');
        }).catch(() => {
            showToast('No se pudo copiar el email', 'error');
        });
    });
}

// Form validation enhancement
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// Scroll to top button (optional)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Console message for developers
console.log('%c¡Hola Developer! 👋', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cSi estás viendo esto, ¡me encantaría conectar contigo!', 'color: #475569; font-size: 14px;');
console.log('%cContáctame en: augusto_galvan@outlook.com', 'color: #06b6d4; font-size: 14px;');
