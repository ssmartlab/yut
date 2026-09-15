/**
 * Main JavaScript file for Furnitura page
 * MVP functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on scroll for product cards
    const productCards = document.querySelectorAll('.product-card');
    const featureItems = document.querySelectorAll('.feature-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize cards with hidden state for animation
    [...productCards, ...featureItems].forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = window.scrollY;
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'header__menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        menuToggle.setAttribute('aria-label', 'Меню');
        
        const headerNav = document.querySelector('.header__nav');
        
        if (window.innerWidth <= 768) {
            menuToggle.addEventListener('click', function() {
                headerNav.classList.toggle('header__nav--active');
                this.classList.toggle('header__menu-toggle--active');
            });
            
            // Only add toggle on mobile
            if (!document.querySelector('.header__menu-toggle')) {
                document.querySelector('.header').insertBefore(menuToggle, headerNav);
            }
        }
    };
    
    createMobileMenu();
    
    // Re-check on resize
    window.addEventListener('resize', createMobileMenu);

    console.log('Furnitura page loaded successfully');
});
