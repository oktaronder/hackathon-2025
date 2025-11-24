// Background music controller
// Tarayıcı autoplay kuralları nedeniyle ses, SADECE gerçek user gesture (click / touch / keydown / pointerdown) ile başlatılır.
// Scroll, Chrome tarafından güvenilir user-activation sayılmadığı için yalnızca "butonu vurgulamak" için kullanılır.

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const iconPlay = document.getElementById('music-icon-play');
    const iconPause = document.getElementById('music-icon-pause');

    if (!audio || !toggle || !iconPlay || !iconPause) {
        console.warn('Music player elements not found.');
        return;
    }

    let hasStarted = false;
    let isPlaying = false;

    audio.volume = 0.5;

    function updateIcons() {
        if (isPlaying) {
            iconPlay.style.display = 'none';
            iconPause.style.display = 'inline-block';
        } else {
            iconPlay.style.display = 'inline-block';
            iconPause.style.display = 'none';
        }
    }

    async function playMusic() {
        try {
            await audio.play();
            isPlaying = true;
            updateIcons();
        } catch (e) {
            console.warn('Music play blocked by browser:', e);
        }
    }

    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updateIcons();
    }

    // User-controlled toggle (her zaman çalışmalı)
    toggle.addEventListener('click', function () {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // --- Autoplay politikalarına uyumlu otomatik başlatma ---
    // Sadece gerçek user gesture (click / touchstart / keydown / pointerdown) ile play çağırıyoruz.

    function startOnceFromGesture() {
        if (hasStarted) return;
        hasStarted = true;
        playMusic();

        document.removeEventListener('click', startOnceFromGesture);
        document.removeEventListener('touchstart', startOnceFromGesture);
        document.removeEventListener('pointerdown', startOnceFromGesture);
        document.removeEventListener('keydown', startOnceFromGesture);
    }

    document.addEventListener('click', startOnceFromGesture, { once: true });
    document.addEventListener('touchstart', startOnceFromGesture, { once: true, passive: true });
    document.addEventListener('pointerdown', startOnceFromGesture, { once: true });
    document.addEventListener('keydown', startOnceFromGesture, { once: true });

    // Scroll sadece butonu vurgulamak için kullanılıyor (tarayıcı bunu "user gesture" saymıyor).
    function hintOnScroll() {
        toggle.classList.add('music-toggle--pulse');
        window.removeEventListener('scroll', hintOnScroll);
    }

    window.addEventListener('scroll', hintOnScroll, { passive: true });

    // Global helper: discover butonu gibi dışarıdan müziği başlatmak için
    window.startBackgroundMusic = function () {
        if (!hasStarted) {
            hasStarted = true;
        }
        if (!isPlaying) {
            playMusic();
        }
    };

    // Initial icon state
    updateIcons();
});


