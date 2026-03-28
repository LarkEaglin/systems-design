/**
 * Sidebar Typewriter Hover Effect
 * Vanilla JavaScript implementation
 */

class TypewriterEffect {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.typeSpeed = 55; // ms per character
        this.init();
    }

    init() {
        this.navItems.forEach((item, index) => {
            const tagline = item.querySelector('.tagline');
            const text = item.dataset.tagline;
            
            item.addEventListener('mouseenter', () => this.typeWriter(tagline, text));
            item.addEventListener('mouseleave', () => this.resetTypewriter(tagline));
            
            // Add click handler for navigation
            item.addEventListener('click', (e) => {
                const link = item.dataset.link;
                if (link === '/index.html') return;
                window.open(link, '_self');
            });
        });
    }

    typeWriter(element, text) {
        element.classList.add('show');
        element.dataset.text = text;
        element.textContent = '';
        element.dataset.index = 0;
        
        const typeNextChar = () => {
            const index = parseInt(element.dataset.index);
            if (index < text.length) {
                element.textContent += text.charAt(index);
                element.dataset.index = index + 1;
                setTimeout(typeNextChar, this.typeSpeed);
            }
        };
        
        typeNextChar();
    }

    resetTypewriter(element) {
        element.classList.remove('show');
        element.textContent = '';
        delete element.dataset.index;
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new TypewriterEffect();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }
    
    // Optional: Smooth scroll reveal for cards
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
    
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Sidebar responsiveness (for very small screens)
window.addEventListener('resize', () => {
    if (window.innerWidth < 480) {
        document.getElementById('sidebar').style.transform = 'translateX(-100%)';
    } else {
        document.getElementById('sidebar').style.transform = 'none';
    }
});

