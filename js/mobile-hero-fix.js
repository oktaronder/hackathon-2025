/* ============================================
   MOBILE HERO FIX - WOW.js Devre Dışı
   Mobilde hero section içeriğinin hemen görünür olması için
   ============================================ */

(function() {
    'use strict';
    
    // Mobil cihaz kontrolü
    function isMobile() {
        return window.innerWidth <= 767;
    }
    
    // Hero section içeriğini hemen görünür yap
    function forceHeroContentVisible() {
        if (!isMobile()) return;
        
        const heroSection = document.getElementById('section-hero');
        if (!heroSection) return;
        
        // Tüm WOW elementlerini hemen görünür yap
        const wowElements = heroSection.querySelectorAll('.wow');
        wowElements.forEach(function(el) {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.display = 'block';
            el.style.transform = 'none';
            el.style.webkitTransform = 'none';
            el.classList.add('animated');
        });
        
        // Meta info badges (tarih ve konum)
        const metaBadges = heroSection.querySelectorAll('.d-flex.flex-wrap.gap-4');
        metaBadges.forEach(function(el) {
            el.style.display = 'flex';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        const metaItems = heroSection.querySelectorAll('.d-flex.align-items-center');
        metaItems.forEach(function(el) {
            el.style.display = 'flex';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        // Subtitle (Construction AI Challenge)
        const subtitles = heroSection.querySelectorAll('h3.text-white, h3.mb-5');
        subtitles.forEach(function(el) {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.webkitTransform = 'none';
        });
        
        // Logo
        const logos = heroSection.querySelectorAll('img[src*="aifutureminds25"], img[alt="Future Minds Hackathon"]');
        logos.forEach(function(el) {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        // Butonlar
        const buttons = heroSection.querySelectorAll('.btn-main, .btn-line');
        buttons.forEach(function(el) {
            el.style.display = 'inline-block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        // Deadline badge
        const deadlineBadges = heroSection.querySelectorAll('.d-inline-block');
        deadlineBadges.forEach(function(el) {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
    }
    
    // Sayfa yüklendiğinde çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(forceHeroContentVisible, 100);
        });
    } else {
        setTimeout(forceHeroContentVisible, 100);
    }
    
    // WOW.js başlatılmadan önce müdahale et
    if (typeof WOW !== 'undefined') {
        const originalWOW = WOW;
        WOW = function(options) {
            if (isMobile()) {
                // Mobilde WOW.js'i devre dışı bırak
                options = options || {};
                options.mobile = false;
                options.live = false;
            }
            return new originalWOW(options);
        };
        WOW.prototype = originalWOW.prototype;
    }
    
    // Window resize'da da kontrol et
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (isMobile()) {
                forceHeroContentVisible();
            }
        }, 250);
    });
    
})();

