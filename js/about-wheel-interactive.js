/* ============================================
   ABOUT SECTION - INTERACTIVE ROTATION WHEEL
   --------------------------------------------
   - Continuous clockwise rotation
   - Drag / touch interaction with momentum
   - Works even if image path or markup changes
   ============================================ */

(function() {
    'use strict';

    var SELECTOR = '#section-about .plexus-structure-wrapper';
    var IMAGE_SELECTOR = 'img.about-3d-rotate-clockwise, img.plexus-img-processed, img';

    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
        } else {
            callback();
        }
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function initWheel() {
        var wrapper = document.querySelector(SELECTOR);
        if (!wrapper) {
            console.warn('[about-wheel] Wrapper not found');
            return;
        }

        var image = wrapper.querySelector(IMAGE_SELECTOR);
        if (!image) {
            console.warn('[about-wheel] Image not found inside wrapper');
            return;
        }

        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var baseSpeed = prefersReducedMotion ? 0.02 : 0.08; // degrees per frame
        var rotation = 0;
        var currentVelocity = baseSpeed;
        var dragging = false;
        var lastPointerX = 0;
        var lastPointerY = 0;
        var pointerId = null;
        var userControlActive = false;
        var dragSensitivityX = prefersReducedMotion ? 0.5 : 1.05;
        var dragSensitivityY = prefersReducedMotion ? -0.35 : -0.7;
        var maxVelocity = prefersReducedMotion ? 4 : 10;
        var highEnergyThreshold = baseSpeed * 18;
        var friction = prefersReducedMotion ? 0.985 : 0.972;
        var reverseFriction = prefersReducedMotion ? 0.94 : 0.92;
        var settleEase = prefersReducedMotion ? 0.025 : 0.045;
        var minVelocitySnap = 0.0005;

        function setRotation(value) {
            rotation = value;
            image.style.transform = 'rotate(' + rotation + 'deg)';
        }

        function setDirectionData() {
            wrapper.dataset.spinDirection = currentVelocity >= 0 ? 'cw' : 'ccw';
        }

        function applyEnergyGlow() {
            var highEnergy = userControlActive && Math.abs(currentVelocity) > highEnergyThreshold;
            if (highEnergy) {
                wrapper.classList.add('wheel-impulse');
                image.classList.add('wheel-spin-impulse');
            } else if (!dragging) {
                wrapper.classList.remove('wheel-impulse');
                image.classList.remove('wheel-spin-impulse');
            }
        }

        function animate() {
            if (!dragging) {
                setRotation(rotation + currentVelocity);
                setDirectionData();
                applyEnergyGlow();

                if (userControlActive) {
                    if (currentVelocity < 0) {
                        currentVelocity *= reverseFriction;
                        if (Math.abs(currentVelocity) < minVelocitySnap) {
                            currentVelocity = 0;
                        }
                    } else if (currentVelocity > baseSpeed) {
                        currentVelocity *= friction;
                        if (currentVelocity < baseSpeed) {
                            currentVelocity = baseSpeed;
                        }
                    } else {
                        currentVelocity += (baseSpeed - currentVelocity) * settleEase;
                        if (Math.abs(currentVelocity - baseSpeed) < minVelocitySnap) {
                            currentVelocity = baseSpeed;
                            userControlActive = false;
                            wrapper.classList.remove('wheel-impulse');
                            image.classList.remove('wheel-spin-impulse');
                        }
                    }
                } else {
                    currentVelocity = baseSpeed;
                }
            }
            requestAnimationFrame(animate);
        }

        function startDrag(event) {
            if (dragging) return;
            dragging = true;
            pointerId = event.pointerId;

            wrapper.setPointerCapture(pointerId);
            wrapper.style.cursor = 'grabbing';
            image.style.transition = 'none';

            lastPointerX = event.clientX;
            lastPointerY = event.clientY;
            currentVelocity = 0;
            userControlActive = true;
            wrapper.classList.add('wheel-impulse');
            image.classList.add('wheel-spin-impulse');

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', endDrag);
            window.addEventListener('pointercancel', endDrag);
        }

        function onPointerMove(event) {
            if (!dragging || event.pointerId !== pointerId) return;

            var deltaX = event.clientX - lastPointerX;
            var deltaY = event.clientY - lastPointerY;
            var appliedDelta = (deltaX * dragSensitivityX) + (deltaY * dragSensitivityY);

            if (appliedDelta !== 0) {
                setRotation(rotation + appliedDelta);
                currentVelocity = clamp(appliedDelta, -maxVelocity, maxVelocity);
                setDirectionData();
                applyEnergyGlow();
            }

            lastPointerX = event.clientX;
            lastPointerY = event.clientY;
        }

        function endDrag(event) {
            if (!dragging || (event && event.pointerId !== pointerId)) return;
            dragging = false;

            if (pointerId !== null) {
                try {
                    wrapper.releasePointerCapture(pointerId);
                } catch (err) {
                    // ignore
                }
            }
            pointerId = null;

            wrapper.style.cursor = 'grab';
            image.style.transition = 'transform 0.2s ease-out';

            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', endDrag);
            window.removeEventListener('pointercancel', endDrag);
            setDirectionData();
        }

        function bindEvents() {
            wrapper.classList.add('interactive-wheel');
            wrapper.style.cursor = 'grab';
            wrapper.style.userSelect = 'none';
            wrapper.style.webkitUserSelect = 'none';

            image.style.animation = 'none';
            image.style.transition = 'transform 0.2s ease-out';

            wrapper.addEventListener('pointerdown', function(event) {
                if (event.button !== undefined && event.button !== 0) return;
                startDrag(event);
            });

            window.addEventListener('resize', function() {
                rectCache = null;
            });

            wrapper.addEventListener('contextmenu', function(event) {
                event.preventDefault();
            });
        }

        bindEvents();
        requestAnimationFrame(animate);

        console.info('[about-wheel] Interactive wheel initialized');
    }

    ready(initWheel);
})();

