// ============================================
// PLEXUS BACKGROUND REMOVER
// JavaScript ile açık pembe arka planı kaldırma
// Canvas kullanarak görseli işleme
// ============================================

(function() {
    'use strict';
    
    function removeBackgroundFromImage(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Sadece beyaz arka planı kaldır, görseli koru
        // Daha dikkatli threshold değerleri
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // Sadece çok açık beyaz tonları algıla (arka plan)
            // Threshold'ları daha dikkatli ayarla - sadece gerçekten beyaz olanları kaldır
            const isWhiteBackground = 
                // Neredeyse tamamen beyaz (RGB > 250)
                (r > 250 && g > 250 && b > 250) ||
                // Çok açık gri/beyaz (RGB > 245 ve hepsi birbirine yakın)
                (r > 245 && g > 245 && b > 245 && Math.abs(r - g) < 5 && Math.abs(g - b) < 5);
            
            if (isWhiteBackground) {
                // Sadece beyaz arka planı şeffaf yap
                data[i + 3] = 0; // Alpha = 0 (transparent)
            }
            // Diğer tüm renkleri (mor, mavi, koyu renkler) olduğu gibi koru
        }
        
        // Put processed image data back
        ctx.putImageData(imageData, 0, 0);
        
        // Replace original image with processed canvas
        const newImg = new Image();
        newImg.src = canvas.toDataURL('image/png');
        newImg.className = img.className;
        newImg.style.cssText = img.style.cssText;
        newImg.alt = img.alt;
        
        // Replace in DOM
        img.parentNode.replaceChild(newImg, img);
        
        return newImg;
    }
    
    function initBackgroundRemoval() {
        const plexusImg = document.querySelector('.plexus-structure-wrapper img');
        if (!plexusImg) return;
        
        // Wait for image to load
        if (plexusImg.complete) {
            removeBackgroundFromImage(plexusImg);
        } else {
            plexusImg.addEventListener('load', function() {
                removeBackgroundFromImage(this);
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundRemoval);
    } else {
        initBackgroundRemoval();
    }
})();

