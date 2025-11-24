// Fullscreen intro logic: show logo + Discover button, start music on click and reveal page

document.addEventListener('DOMContentLoaded', function () {
    var intro = document.getElementById('intro-discovery');
    var btn = document.getElementById('discover-btn');

    if (!intro || !btn) {
        return;
    }

    // Intro aktifken navbar ve diğer overlay elemanlarını gizle (hem class hem inline ile)
    document.body.classList.add('intro-active');

    var header = document.querySelector('header');
    var floatText = document.querySelector('.float-text');
    var scrollbarV = document.querySelector('.scrollbar-v');

    function hideChrome() {
        if (header) header.style.display = 'none';
        if (floatText) floatText.style.display = 'none';
        if (scrollbarV) scrollbarV.style.display = 'none';
    }

    function showChrome() {
        if (header) header.style.display = '';
        if (floatText) floatText.style.display = '';
        if (scrollbarV) scrollbarV.style.display = '';
    }

    hideChrome();

    btn.addEventListener('click', function () {
        // Müziği başlat (music-player.js global fonksiyon)
        if (typeof window.startBackgroundMusic === 'function') {
            window.startBackgroundMusic();
        } else {
            // Yine de audio elemana direkt oynamayı deneyelim
            var audio = document.getElementById('bg-music');
            if (audio) {
                audio.play().catch(function (err) {
                    console.warn('Intro discover: music play blocked:', err);
                });
            }
        }

        // Navbar ve diğer her şeyi tekrar göster
        document.body.classList.remove('intro-active');
        showChrome();

        // Intro overlay'i yumuşakça gizle
        intro.classList.add('intro-hidden');

        // Tamamen kaldır
        setTimeout(function () {
            if (intro && intro.parentNode) {
                intro.parentNode.removeChild(intro);
            }
        }, 700);

        // Hero section'a kaydır
        var hero = document.getElementById('section-hero');
        if (hero && hero.scrollIntoView) {
            hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


