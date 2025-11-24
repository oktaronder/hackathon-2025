// ============================================
// UX ENHANCER
// Loading states, error handling, smooth animations
// ============================================

(function() {
    'use strict';
    
    // Loading state manager
    const LoadingManager = {
        show: function(element, message) {
            if (!element) return;
            
            const loader = document.createElement('div');
            loader.className = 'ux-loader';
            loader.innerHTML = `
                <div class="ux-loader-spinner"></div>
                <div class="ux-loader-text">${message || 'Loading...'}</div>
            `;
            loader.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.95);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(10px);
            `;
            
            element.style.position = 'relative';
            element.appendChild(loader);
            return loader;
        },
        
        hide: function(loader) {
            if (loader && loader.parentNode) {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 300);
            }
        }
    };
    
    // Error handler
    function handleErrors() {
        window.addEventListener('error', function(e) {
            console.error('Error:', e.error);
            // Could send to analytics service
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
            // Could send to analytics service
        });
    }
    
    // Smooth scroll enhancement
    function enhanceSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Form validation enhancement
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Remove error class on input
                        input.addEventListener('input', function() {
                            this.classList.remove('error');
                        }, { once: true });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    if (window.announceToScreenReader) {
                        window.announceToScreenReader('Please fill in all required fields');
                    }
                }
            });
        });
    }
    
    // Image error handling
    function handleImageErrors() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                // Could show placeholder image
            });
        });
    }
    
    // Intersection Observer for fade-in animations
    function addFadeInAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
    
    // Page visibility API - pause animations when tab is hidden
    function handlePageVisibility() {
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // Pause videos, animations
                document.querySelectorAll('video').forEach(video => {
                    if (!video.paused) {
                        video.dataset.wasPlaying = 'true';
                        video.pause();
                    }
                });
            } else {
                // Resume if was playing
                document.querySelectorAll('video[data-was-playing="true"]').forEach(video => {
                    video.play().catch(() => {});
                    delete video.dataset.wasPlaying;
                });
            }
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            handleErrors();
            enhanceSmoothScroll();
            enhanceFormValidation();
            handleImageErrors();
            addFadeInAnimations();
            handlePageVisibility();
        });
    } else {
        handleErrors();
        enhanceSmoothScroll();
        enhanceFormValidation();
        handleImageErrors();
        addFadeInAnimations();
        handlePageVisibility();
    }
    
    // Export LoadingManager
    window.LoadingManager = LoadingManager;
})();

