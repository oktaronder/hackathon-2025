// ============================================
// PRIZE COUNTER - AWARD WINNING ALGORITHM
// Professional slot machine counter animation
// Based on award-winning UI/UX best practices
// ============================================

jQuery(document).ready(function($) {
    let hasAnimated = false;
    
    // Easing function - ease-out cubic (başlangıçta hızlı, sona doğru yavaş)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // Easing function - ease-out exponential (daha dramatik yavaşlama)
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function animatePrizeCounter(element) {
        const targetAmount = 150000;
        const duration = 2500; // 2.5 saniye - optimal süre
        const startTime = performance.now();
        const prizeElement = element || $('.prize-amount').first();
        
        if (prizeElement.length === 0) return;
        
        // Eğer hero section'daki prize-amount ise, currency span'ini koru
        const isHeroSection = prizeElement.closest('.hero-prize-organic').length > 0;
        const currencySpan = isHeroSection ? prizeElement.siblings('.prize-currency') : null;
        
        // Visual feedback için class ekle
        prizeElement.addClass('counting');
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out exponential kullan (başlangıçta çok hızlı, sona doğru yavaş)
            const easedProgress = easeOutExpo(progress);
            const currentAmount = Math.floor(easedProgress * targetAmount);
            
            // Sayıyı formatla (virgül ile)
            const formattedAmount = currentAmount.toLocaleString('en-US');
            
            // Hero section için sadece sayıyı güncelle, currency ayrı
            if (isHeroSection) {
                prizeElement.text(formattedAmount);
            } else {
                prizeElement.text('₺' + formattedAmount);
            }
            
            // Her büyük artışta hafif pulse efekti
            if (currentAmount % 15000 === 0 && currentAmount > 0) {
                prizeElement.addClass('pulse-moment');
                setTimeout(function() {
                    prizeElement.removeClass('pulse-moment');
                }, 200);
            }
            
            // Animasyon devam ediyorsa
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Son değeri garantile
                const finalAmount = targetAmount.toLocaleString('en-US');
                if (isHeroSection) {
                    prizeElement.text(finalAmount);
                } else {
                    prizeElement.text('₺' + finalAmount);
                }
                prizeElement.removeClass('counting');
                prizeElement.addClass('completed');
                
                // Tamamlandığında final glow efekti
                setTimeout(function() {
                    prizeElement.addClass('final-glow');
                }, 100);
            }
        }
        
        // Animasyonu başlat
        requestAnimationFrame(updateCounter);
    }
    
    // Hero section prize counter için ayrı fonksiyon
    function animateHeroPrizeCounter() {
        const heroPrizeElement = $('#section-hero .prize-amount');
        if (heroPrizeElement.length > 0 && !heroPrizeElement.hasClass('completed')) {
            animatePrizeCounter(heroPrizeElement);
        }
    }
    
    // Intersection Observer - Modern ve performanslı yaklaşım
    function initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        // Hero section için
                        if (entry.target.id === 'section-hero') {
                            setTimeout(animateHeroPrizeCounter, 400);
                        }
                        // Prizes section için
                        else if (entry.target.id === 'section-prizes' && !hasAnimated) {
                            hasAnimated = true;
                            setTimeout(function() {
                                animatePrizeCounter($('#section-prizes .prize-amount'));
                            }, 400);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2, // Element %20 görünür olduğunda tetikle
                rootMargin: '0px'
            });
            
            // Hero section'ı izle
            const heroSection = document.getElementById('section-hero');
            if (heroSection) {
                observer.observe(heroSection);
            }
            
            // Prizes section'ı izle
            const prizeSection = document.getElementById('section-prizes');
            if (prizeSection) {
                observer.observe(prizeSection);
            }
        } else {
            // Fallback - Intersection Observer desteklenmiyorsa
            setTimeout(function() {
                // Hero section kontrolü
                const heroSection = $('#section-hero');
                if (heroSection.length) {
                    const heroTop = heroSection.offset().top;
                    const viewportBottom = $(window).scrollTop() + $(window).height();
                    if (heroTop < viewportBottom + 300) {
                        setTimeout(animateHeroPrizeCounter, 500);
                    }
                }
                
                // Prizes section kontrolü
                const prizeSection = $('#section-prizes');
                if (prizeSection.length && !hasAnimated) {
                    const elementTop = prizeSection.offset().top;
                    const viewportBottom = $(window).scrollTop() + $(window).height();
                    if (elementTop < viewportBottom + 300) {
                        hasAnimated = true;
                        setTimeout(function() {
                            animatePrizeCounter($('#section-prizes .prize-amount'));
                        }, 500);
                    }
                }
            }, 1000);
        }
    }
    
    // WOW.js callback (eğer varsa)
    if (typeof WOW !== 'undefined') {
        const wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: function(box) {
                if ($(box).hasClass('prize-amount') && !hasAnimated) {
                    setTimeout(animatePrizeCounter, 500);
                }
            }
        });
        wow.init();
    }
    
    // Scroll fallback (eski tarayıcılar için)
    let scrollTimeout;
    let heroAnimated = false;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Hero section kontrolü
            if (!heroAnimated) {
                const heroSection = $('#section-hero');
                if (heroSection.length) {
                    const elementTop = heroSection.offset().top;
                    const elementBottom = elementTop + heroSection.outerHeight();
                    const viewportTop = $(window).scrollTop();
                    const viewportBottom = viewportTop + $(window).height();
                    
                    if (elementTop < viewportBottom && elementBottom > viewportTop) {
                        heroAnimated = true;
                        setTimeout(animateHeroPrizeCounter, 400);
                    }
                }
            }
            
            // Prizes section kontrolü
            if (!hasAnimated) {
                const prizeSection = $('#section-prizes');
                if (prizeSection.length) {
                    const elementTop = prizeSection.offset().top;
                    const elementBottom = elementTop + prizeSection.outerHeight();
                    const viewportTop = $(window).scrollTop();
                    const viewportBottom = viewportTop + $(window).height();
                    
                    if (elementTop < viewportBottom && elementBottom > viewportTop) {
                        hasAnimated = true;
                        setTimeout(function() {
                            animatePrizeCounter($('#section-prizes .prize-amount'));
                        }, 400);
                    }
                }
            }
        }, 100);
    });
    
    // Sayfa yüklendiğinde kontrol et
    setTimeout(function() {
        // Hero section kontrolü - sayfa yüklendiğinde hemen çalışsın
        const heroSection = $('#section-hero');
        if (heroSection.length) {
            const heroTop = heroSection.offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            if (heroTop < viewportBottom + 400) {
                heroAnimated = true;
                setTimeout(animateHeroPrizeCounter, 800);
            }
        }
        
        // Prizes section kontrolü
        if (!hasAnimated) {
            const prizeSection = $('#section-prizes');
            if (prizeSection.length) {
                const elementTop = prizeSection.offset().top;
                const viewportBottom = $(window).scrollTop() + $(window).height();
                
                if (elementTop < viewportBottom + 400) {
                    hasAnimated = true;
                    setTimeout(function() {
                        animatePrizeCounter($('#section-prizes .prize-amount'));
                    }, 600);
                } else {
                    // Intersection Observer ile izle
                    initIntersectionObserver();
                }
            }
        }
    }, 800);
    
    // İlk yüklemede de Intersection Observer'ı başlat
    initIntersectionObserver();
});
