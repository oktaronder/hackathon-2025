/* ============================================
   NAVBAR PRIZE SECTION TRANSPARENT
   Prize Pool section'ında video olduğu için navbar'ı şeffaf yap
   Hero ve Prize section'larında şeffaf, diğer yerlerde beyaz
   ============================================ */

(function() {
    'use strict';
    
    // DOM yüklendikten sonra çalış
    function initNavbarPrizeSection() {
        const header = document.querySelector('header.transparent');
        if (!header) {
            console.warn('Navbar prize section: header.transparent bulunamadı');
            return;
        }
        
        // Navbar'ı her zaman görünür yap
        header.style.display = 'block';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '9999';
        
        const heroSection = document.getElementById('section-hero');
        const prizeSection = document.getElementById('section-prizes');
        
        if (!heroSection) {
            console.warn('Navbar prize section: section-hero bulunamadı');
        }
        if (!prizeSection) {
            console.warn('Navbar prize section: section-prizes bulunamadı');
        }
        
        if (!heroSection || !prizeSection) return;
        
        function updateNavbarState() {
            // Navbar'ı her zaman görünür yap (güvenlik için)
            header.style.display = 'block';
            header.style.visibility = 'visible';
            header.style.opacity = '1';
            
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Hero section pozisyonları - getBoundingClientRect ile viewport'a göre
            const heroRect = heroSection.getBoundingClientRect();
            const heroTop = heroRect.top;
            const heroBottom = heroRect.bottom;
            
            // Prize section pozisyonları - getBoundingClientRect ile viewport'a göre
            const prizeRect = prizeSection.getBoundingClientRect();
            const prizeTop = prizeRect.top;
            const prizeBottom = prizeRect.bottom;
            
            // Hero section kontrolü - viewport içinde mi?
            const isInHero = heroTop < windowHeight && heroBottom > 0;
            
            // Prize section kontrolü - TAM OLARAK prize section başladığında şeffaf ol
            // Prize section'ın üst kısmı viewport'un üst kısmına (0 veya navbar altına) geldiğinde şeffaf ol
            // Prize section'ın üst kısmı 0'ın altına veya çok yakınına geldiğinde şeffaf yap
            // Tam olarak prize section başladığında: prizeTop <= 0 veya çok yakın (örn. 10px tolerance)
            const prizeSectionStartReached = prizeTop <= 10; // 10px tolerance - tam başlangıç için
            const prizeSectionVisible = prizeBottom > 0; // Section hala görünür
            const isInPrize = prizeSectionStartReached && prizeSectionVisible;
            
            // Hero section içindeyken veya Prize section içindeyken şeffaf yap
            const shouldBeTransparent = isInHero || isInPrize;
            
            if (shouldBeTransparent) {
                // Şeffaf navbar - smaller class'ını kaldır
                header.classList.remove('smaller');
            } else {
                // Beyaz navbar - smaller class'ını ekle (sadece scroll yapılmışsa)
                if (scrollY > 100) {
                    header.classList.add('smaller');
                } else {
                    header.classList.remove('smaller');
                }
            }
        }
        
        // Scroll event listener - requestAnimationFrame ile optimize (daha hızlı)
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateNavbarState();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Initial check - daha hızlı
        setTimeout(function() {
            updateNavbarState();
            // Sürekli kontrol et (designesia.js override için) - daha sık kontrol
            setInterval(function() {
                // Navbar'ı her zaman görünür yap
                header.style.display = 'block';
                header.style.visibility = 'visible';
                header.style.opacity = '1';
                updateNavbarState();
            }, 16); // Her 16ms'de bir kontrol et (60fps için optimize)
        }, 100);
        
        // Scroll event - yüksek priority ile, daha hızlı response
        window.addEventListener('scroll', onScroll, { passive: true, capture: false });
        
        // Resize event
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateNavbarState, 50);
        }, { passive: true });
        
        // Designesia.js'ten sonra çalış (daha yüksek priority, daha hızlı)
        window.addEventListener('scroll', function() {
            updateNavbarState(); // Direkt çağır, timeout yok
        }, { passive: true });
    }
    
    // DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initNavbarPrizeSection, 300);
        });
    } else {
        // DOM zaten yüklü
        setTimeout(initNavbarPrizeSection, 500);
    }
    
})();

