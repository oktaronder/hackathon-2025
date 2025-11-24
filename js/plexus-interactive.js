// ============================================
// PLEXUS STRUCTURE - INTERACTIVE EFFECTS
// Mouse parallax, tilt, ve interaktif efektler
// ============================================

(function() {
    'use strict';
    
    function initPlexusEffects() {
        const plexusWrapper = document.querySelector('.plexus-structure-wrapper');
        if (!plexusWrapper) return;
        
        // Interactive wheel aktifse, 3D efektleri devre dışı bırak
        if (plexusWrapper.classList.contains('interactive-wheel')) {
            return; // Interactive wheel kullanılıyor, 3D efektler kapalı
        }
        
        const img = plexusWrapper.querySelector('img');
        if (!img) return;
        
        // Energy Wave Effect
        function createEnergyWave() {
            const wave = document.createElement('div');
            wave.className = 'plexus-energy-wave';
            plexusWrapper.appendChild(wave);
            
            // Her 3 saniyede bir yeni dalga
            setInterval(() => {
                if (plexusWrapper.querySelector('.plexus-energy-wave')) {
                    const newWave = document.createElement('div');
                    newWave.className = 'plexus-energy-wave';
                    plexusWrapper.appendChild(newWave);
                    
                    setTimeout(() => {
                        if (newWave.parentNode) {
                            newWave.parentNode.removeChild(newWave);
                        }
                    }, 3000);
                }
            }, 3000);
        }
        
        // Morphing Glow Effect
        function createMorphGlow() {
            const morphGlow = document.createElement('div');
            morphGlow.className = 'plexus-morph-glow';
            plexusWrapper.insertBefore(morphGlow, img);
        }
        
        // Depth Layer
        function createDepthLayer() {
            const depthLayer = document.createElement('div');
            depthLayer.className = 'plexus-depth-layer';
            plexusWrapper.insertBefore(depthLayer, img);
        }
        
        // Mouse Parallax Effect - Enhanced
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isHovering = false;
        
        function updateParallax() {
            if (!isHovering) {
                // Normal pulse animation continues
                return;
            }
            
            const rect = plexusWrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.03;
            const deltaY = (mouseY - centerY) * 0.03;
            
            currentX += (deltaX - currentX) * 0.15;
            currentY += (deltaY - currentY) * 0.15;
            
            const rotateX = (mouseY - centerY) / 30;
            const rotateY = (centerX - mouseX) / 30;
            
            img.style.transform = `translate(${currentX}px, ${currentY}px) 
                                   perspective(1000px) 
                                   rotateX(${rotateX}deg) 
                                   rotateY(${rotateY}deg) 
                                   translateZ(30px) 
                                   scale(1.1)`;
            
            requestAnimationFrame(updateParallax);
        }
        
        // Mouse events
        plexusWrapper.addEventListener('mouseenter', function() {
            isHovering = true;
            plexusWrapper.classList.add('magnetic');
            updateParallax();
        });
        
        plexusWrapper.addEventListener('mouseleave', function() {
            isHovering = false;
            plexusWrapper.classList.remove('magnetic');
            currentX = 0;
            currentY = 0;
            img.style.transform = '';
        });
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (isHovering) {
                updateParallax();
            }
        });
        
        // Scroll Parallax
        let scrollY = 0;
        function updateScrollParallax() {
            scrollY = window.scrollY;
            const rect = plexusWrapper.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const windowHeight = window.innerHeight;
            const scrollProgress = (scrollY - elementTop + windowHeight) / (windowHeight * 2);
            
            if (scrollProgress > 0 && scrollProgress < 1 && !isHovering) {
                const rotateY = scrollProgress * 10;
                img.style.transform = `perspective(1200px) rotateY(${rotateY}deg) translateZ(${scrollProgress * 50}px)`;
            }
            
            requestAnimationFrame(updateScrollParallax);
        }
        updateScrollParallax();
        
        // Glitch effect on hover
        plexusWrapper.addEventListener('mouseenter', function() {
            img.classList.add('plexus-glitch-effect');
        });
        
        plexusWrapper.addEventListener('mouseleave', function() {
            img.classList.remove('plexus-glitch-effect');
        });
        
        // Shine effect
        img.classList.add('shine-effect');
        
        // Initialize effects
        createEnergyWave();
        createMorphGlow();
        createDepthLayer();
        
        // Intersection Observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        plexusWrapper.classList.add('visible', 'scroll-rotate');
                    } else {
                        plexusWrapper.classList.remove('visible', 'scroll-rotate');
                    }
                });
            }, {
                threshold: 0.2
            });
            
            observer.observe(plexusWrapper);
        }
    }
    
    // Particle System
    function createParticles() {
        const plexusWrapper = document.querySelector('.plexus-structure-wrapper');
        if (!plexusWrapper) return;
        
        // Check if particles already exist
        if (plexusWrapper.querySelector('.plexus-particles')) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'plexus-particles';
        
        // Create 5 particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'plexus-particle';
            particlesContainer.appendChild(particle);
        }
        
        plexusWrapper.appendChild(particlesContainer);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initPlexusEffects();
            createParticles();
        });
    } else {
        initPlexusEffects();
        createParticles();
    }
})();

