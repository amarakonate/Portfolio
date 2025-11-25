// Initialisation des bibliothèques d'animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialiser les particules
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#10b981" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#10b981",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        }
    });

    // Animation du loader
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 2000);

    // Animation du texte du hero avec GSAP
    gsap.registerPlugin(TextPlugin);
    
    const heroTitle = document.getElementById('hero-title');
    const originalText = heroTitle.textContent;
    
    // Animation d'écriture du nom
    gsap.to(heroTitle, {
        duration: 2,
        text: originalText,
        ease: "power2.inOut",
        delay: 0.5
    });

    // Animation des statistiques
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('%') ? '%' : '+';
        
        gsap.to(stat, {
            duration: 2,
            textContent: target + suffix,
            snap: { textContent: 1 },
            delay: 1.5,
            ease: "power2.out"
        });
    });

    // Animation des barres de compétences
    gsap.to('.skill-progress', {
        width: '100%',
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animation des cartes de projet
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            duration: 1,
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animation de la timeline
    gsap.utils.toArray('.timeline-content').forEach(content => {
        gsap.from(content, {
            duration: 1,
            x: content.parentElement.classList.contains('timeline-item') && 
               content.parentElement.classList.contains('odd') ? -100 : 100,
            opacity: 0,
            scrollTrigger: {
                trigger: content,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Smooth Scroll
const links = document.querySelectorAll('nav a, .footer-links a, .back-to-top');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                // Animation d'apparition
                gsap.fromTo(card, 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animation de succès
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Envoyé!';
    submitBtn.style.background = 'var(--accent)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        this.reset();
    }, 3000);
});

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('button, a, .skill-category, .project-card, .timeline-content, .contact-item, .feature');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.background = 'var(--primary)';
        cursorGlow.style.width = '70px';
        cursorGlow.style.height = '70px';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
        cursorGlow.style.width = '50px';
        cursorGlow.style.height = '50px';
    });
});

// Animation de retour pour le nom dans le hero (aller-retour)
function animateName() {
    const heroTitle = document.getElementById('hero-title');
    const name = "KONATE AMARA";
    const letters = name.split('');
    
    // Animation de chaque lettre
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        heroTitle.appendChild(span);
        
        // Animation GSAP pour chaque lettre
        gsap.to(span, {
            duration: 0.5,
            y: -10,
            opacity: 0.7,
            repeat: -1,
            yoyo: true,
            delay: index * 0.1,
            ease: "power2.inOut"
        });
    });
    
    // Effacer le texte original
    heroTitle.textContent = '';
}

// Démarrer l'animation du nom après le chargement
window.addEventListener('load', animateName);

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Form submission avec Formspree
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Afficher l'état de chargement
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Succès
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Envoyé!';
            submitBtn.style.background = 'var(--accent)';
            form.reset();
            
            // Afficher un message de confirmation
            showNotification('Votre message a été envoyé avec succès!', 'success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 4000);
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        console.error('Erreur:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur';
        submitBtn.style.background = '#e53e3e';
        
        // Afficher un message d'erreur
        showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 4000);
    }
});

// Fonction pour afficher les notifications
function showNotification(message, type) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}