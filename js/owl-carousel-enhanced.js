// ============================================
// OWL CAROUSEL - AWARD WINNING ENHANCEMENTS
// Professional smooth transitions
// ============================================

jQuery(document).ready(function($) {
    // Enhanced Owl Carousel settings
    if (typeof $.fn.owlCarousel !== 'undefined') {
        
        // Override default settings for all carousels
        $.fn.owlCarousel.Constructor.prototype._speed = function(speed) {
            if (speed === undefined) {
                speed = 1000; // Default 1 second for smooth transitions
            }
            this.speed = speed;
            this.speedIn = speed;
            this.speedOut = speed;
        };
        
        // Enhanced transition callback
        $('.owl-carousel').on('changed.owl.carousel', function(event) {
            const $items = $(this).find('.owl-item');
            $items.removeClass('transitioning');
            
            // Add smooth fade effect
            setTimeout(function() {
                $items.eq(event.item.index).addClass('active-transition');
                setTimeout(function() {
                    $items.removeClass('active-transition');
                }, 800);
            }, 50);
        });
        
        // Smooth drag end
        $('.owl-carousel').on('dragged.owl.carousel', function() {
            $(this).find('.owl-item').css('transition', 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)');
        });
        
        // Enhanced navigation hover
        $('.owl-carousel .owl-nav button').hover(
            function() {
                $(this).css({
                    'transform': 'scale(1.15) translateY(-2px)',
                    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                });
            },
            function() {
                $(this).css({
                    'transform': 'scale(1)',
                    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                });
            }
        );
        
        // Enhanced dots interaction
        $('.owl-carousel .owl-dots .owl-dot').on('click', function() {
            const $dots = $(this).closest('.owl-carousel').find('.owl-dots .owl-dot');
            $dots.removeClass('clicked');
            $(this).addClass('clicked');
            setTimeout(function() {
                $dots.removeClass('clicked');
            }, 300);
        });
    }
});

