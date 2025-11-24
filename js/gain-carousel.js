/**
 * Gain Carousel - Horizontal Scrollable Carousel
 * Features: Navigation buttons, swipe support, keyboard navigation, accessibility
 */

(function() {
    'use strict';

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize carousel when DOM is ready
    function initGainCarousel() {
        const wrapper = document.querySelector('.gain-carousel-wrapper');
        const container = document.querySelector('.gain-carousel-container');
        const track = document.querySelector('.gain-carousel-track');

        if (!wrapper || !container || !track) {
            return;
        }

        let cards = Array.from(track.querySelectorAll('.gain-card'));
        if (cards.length === 0) return;

        // Create infinite loop by duplicating cards for seamless animation
        const originalCards = cards.length;
        
        // Clone all cards to the end
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.classList.add('gain-card-clone');
            track.appendChild(clone);
        });
        
        // Clone all cards again to the end (for smooth infinite loop)
        cards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.classList.add('gain-card-clone');
            track.appendChild(clone);
        });

        // Update cards reference
        cards = Array.from(track.querySelectorAll('.gain-card'));
        
        // Calculate total width for animation
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        const totalOriginalWidth = originalCards * (cardWidth + gap);
        
        // Set animation duration based on total width (adjust speed as needed)
        const trackElement = track;
        trackElement.style.setProperty('--animation-duration', '60s');

        // Update card positions for 3D effect based on viewport
        function updateCardPositions() {
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            
            cards.forEach((card) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distanceFromCenter = Math.abs(cardCenter - containerCenter);
                const maxDistance = containerRect.width / 2 + cardRect.width / 2;
                const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
                
                // Remove all position classes
                card.classList.remove('card-center', 'card-side', 'card-far');
                
                // Add appropriate class based on distance
                // Only far edge cards get blur - most cards are clear
                if (normalizedDistance < 0.65) {
                    // Center and side cards - no blur
                    if (normalizedDistance < 0.35) {
                        card.classList.add('card-center');
                    } else {
                        card.classList.add('card-side');
                    }
                } else {
                    // Only far edge cards - blurred
                    card.classList.add('card-far');
                }
            });
        }

        // Update gradients (always show in auto-scroll loop)
        function updateGradients() {
            wrapper.classList.remove('at-start', 'at-end');
        }

        // Scroll to specific position
        function scrollTo(position, smooth = true) {
            if (prefersReducedMotion) {
                smooth = false;
            }

            container.scrollTo({
                left: position,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }

        // Find the card closest to viewport center for 3D effect
        function findCenterCard() {
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            let closestCard = cards[0];
            let closestDistance = Infinity;
            
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(cardCenter - containerCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
            });
            
            return closestCard;
        }

        // Auto-scroll functions removed - using CSS animation instead

        // Navigation buttons removed - auto-scroll only

        // Loop handled by CSS animation - no JavaScript needed

        // Update card positions continuously for 3D effect
        function animateCards() {
            updateCardPositions();
            updateGradients();
            requestAnimationFrame(animateCards);
        }
        
        // Start continuous animation
        animateCards();

        // Initial updates
        updateGradients();
        updateCardPositions();
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCardPositions();
                updateGradients();
            }, 150);
        }, { passive: true });

        // Touch/Swipe and keyboard navigation removed - auto-scroll only


        // Intersection Observer for fade-in animations (if not using WOW.js)
        if (typeof WOW === 'undefined') {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            cards.forEach(card => {
                observer.observe(card);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGainCarousel);
    } else {
        initGainCarousel();
    }

    // Re-initialize if content is loaded dynamically
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(function() {
            setTimeout(initGainCarousel, 100);
        });
    }

})();

