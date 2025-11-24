// ============================================
// FAQ ACCORDION - AWARD WINNING INTERACTIONS
// Smooth, professional accordion functionality
// ============================================

jQuery(document).ready(function($) {
    $('.faq-question').on('click', function(e) {
        e.preventDefault();
        
        const $faqItem = $(this).closest('.faq-item');
        const $faqAnswer = $faqItem.find('.faq-answer');
        const isActive = $faqItem.hasClass('active');
        
        // Close all other items
        $('.faq-item').not($faqItem).removeClass('active');
        $('.faq-answer').not($faqAnswer).css({
            'max-height': '0',
            'padding-top': '0',
            'padding-bottom': '0'
        });
        
        // Toggle current item
        if (isActive) {
            $faqItem.removeClass('active');
            $faqAnswer.css({
                'max-height': '0',
                'padding-top': '0',
                'padding-bottom': '0'
            });
        } else {
            $faqItem.addClass('active');
            const answerHeight = $faqAnswer.find('.faq-answer-content').outerHeight();
            $faqAnswer.css({
                'max-height': answerHeight + 40 + 'px',
                'padding-top': '0',
                'padding-bottom': '32px'
            });
        }
    });
    
    // Smooth scroll to FAQ when clicking from menu
    $('a[href="#section-faq"]').on('click', function(e) {
        e.preventDefault();
        const target = $('#section-faq');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });
    
    // Keyboard navigation
    $('.faq-question').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
    
    // Auto-expand first item on mobile for better UX
    if ($(window).width() <= 767) {
        setTimeout(function() {
            $('.faq-item:first-child').addClass('active');
            const $firstAnswer = $('.faq-item:first-child .faq-answer');
            const answerHeight = $firstAnswer.find('.faq-answer-content').outerHeight();
            $firstAnswer.css({
                'max-height': answerHeight + 40 + 'px',
                'padding-top': '0',
                'padding-bottom': '32px'
            });
        }, 500);
    }
});

