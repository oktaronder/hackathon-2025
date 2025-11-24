/* ============================================
   AWARD-WINNING CURSOR EFFECT
   Muhteşem, modern, interactive cursor
   ============================================ */

(function() {
    'use strict';
    
    // Check if device supports hover (not touch)
    if (window.matchMedia('(hover: none)').matches) {
        return; // Exit on touch devices
    }
    
    let cursor = null;
    let cursorDot = null;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let trailParticles = [];
    let lastTrailTime = 0;
    let isHovering = false;
    let currentTarget = null;
    
    // Create cursor elements
    function initCursor() {
        // Main cursor ring
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        // Inner dot
        cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);
        
        // Initial position
        cursor.style.left = '-100px';
        cursor.style.top = '-100px';
        cursorDot.style.left = '-100px';
        cursorDot.style.top = '-100px';
    }
    
    // Smooth cursor following with easing
    function animateCursor() {
        // Smooth follow for main cursor (slower, more lag) - increased speed for stability
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Fast follow for dot (instant)
        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Create trail particles
    function createTrail(x, y) {
        const now = Date.now();
        if (now - lastTrailTime < 16) return; // Limit to ~60fps
        lastTrailTime = now;
        
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 600);
    }
    
    // Magnetic effect - pull cursor towards interactive elements
    function applyMagneticEffect(element, event) {
        if (!element || !cursor) return;
        
        // Disable magnetic effect for cards and FAQ items (they cause jittery movement)
        if (element.closest('.gain-card, .faq-item, .card-modern')) {
            return;
        }
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(event.clientX - centerX, 2) + 
            Math.pow(event.clientY - centerY, 2)
        );
        
        const maxDistance = Math.max(rect.width, rect.height) * 0.6;
        
        if (distance < maxDistance) {
            // Much lighter pull strength
            const pullStrength = (1 - distance / maxDistance) * 0.15;
            const pullX = (centerX - event.clientX) * pullStrength;
            const pullY = (centerY - event.clientY) * pullStrength;
            
            cursorX += pullX;
            cursorY += pullY;
        }
    }
    
    // Mouse move handler
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail particles
        createTrail(e.clientX, e.clientY);
        
        // Check hover state
        checkHoverState(e);
        
        // Check for interactive elements (exclude cards and FAQ items from magnetic)
        const target = e.target;
        const isCard = target.closest('.gain-card, .faq-item, .card-modern');
        const isInteractive = target.matches('a, button, .btn-main, .btn-line, input, textarea, select, [role="button"]') ||
                             (target.closest('a, button, .btn-main, .btn-line') && !isCard);
        
        if (isInteractive && target !== currentTarget && !isCard) {
            currentTarget = target;
            cursor.classList.add('magnetic');
        } else if ((!isInteractive || isCard) && currentTarget) {
            currentTarget = null;
            cursor.classList.remove('magnetic');
        }
        
        // Apply magnetic effect only for non-card elements
        if (isInteractive && !isCard) {
            applyMagneticEffect(target, e);
        }
    }
    
    // Mouse enter handler for interactive elements
    function handleMouseEnter(e) {
        isHovering = true;
        const target = e.target;
        
        if (target.matches('a, button, .btn-main, .btn-line, input, textarea, select, [role="button"]')) {
            cursor.classList.add('hover');
        }
        
        if (target.matches('h1, h2, h3')) {
            cursor.classList.add('text-hover');
        }
        
        if (target.closest('.border-white-op-3')) {
            cursor.classList.add('prize-hover');
        }
    }
    
    // Mouse leave handler
    function handleMouseLeave(e) {
        isHovering = false;
        cursor.classList.remove('hover', 'text-hover', 'prize-hover');
    }
    
    // Check hover state on mouse move
    function checkHoverState(e) {
        const target = e.target;
        
        // Remove all hover classes first
        cursor.classList.remove('hover', 'text-hover', 'prize-hover');
        
        // Don't apply hover effects on cards (they have their own hover states)
        if (target.closest('.gain-card, .faq-item, .card-modern')) {
            return;
        }
        
        // Add appropriate hover class
        if (target.matches('a, button, .btn-main, .btn-line, input, textarea, select, [role="button"]') ||
            target.closest('a, button, .btn-main, .btn-line')) {
            cursor.classList.add('hover');
        }
        
        if (target.matches('h1, h2, h3')) {
            cursor.classList.add('text-hover');
        }
        
        if (target.closest('.border-white-op-3')) {
            cursor.classList.add('prize-hover');
        }
    }
    
    // Click handler
    function handleClick(e) {
        cursor.classList.add('click');
        setTimeout(() => {
            cursor.classList.remove('click');
        }, 200);
        
        // Create burst effect
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const angle = (Math.PI * 2 * i) / 8;
                const distance = 30;
                const x = mouseX + Math.cos(angle) * distance;
                const y = mouseY + Math.sin(angle) * distance;
                createTrail(x, y);
            }, i * 20);
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCursor();
            animateCursor();
        });
    } else {
        initCursor();
        animateCursor();
    }
    
    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    
    // Add hover listeners to all interactive elements (exclude cards)
    function addHoverListeners() {
        const interactiveElements = document.querySelectorAll('a, button, .btn-main, .btn-line, h1, h2, h3, .border-white-op-3, input, textarea, select, [role="button"]');
        interactiveElements.forEach(el => {
            // Skip if element is inside a card
            if (!el.closest('.gain-card, .faq-item, .card-modern')) {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            }
        });
    }
    
    // Initialize hover listeners
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addHoverListeners);
    } else {
        addHoverListeners();
    }
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursor) {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseenter', () => {
        if (cursor) {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        }
    });
    
})();

