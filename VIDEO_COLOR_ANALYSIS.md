# Video Arka Plan Renk Analizi ve Ayarları

## Video Dosyası
- **Dosya:** `video/purple-abstract.mp4`
- **Kaynak:** `stunning-purple-abstract-tunnel-background-with-gl-2025-10-18-00-59-37-utc.mov`
- **Kullanım:** Hero section ve Prize Pool section arka planı

## Video Üzerindeki Overlay'ler ve Renk Ayarları

### 1. Gradient Edge Top (Üst Gradient)
```css
.gradient-edge-top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, transparent, rgba(139, 92, 246, 0.3));
    z-index: 1;
    opacity: 0.6; /* op-6 class */
}
```
**Renk:** Mor (Purple) - `rgba(139, 92, 246, 0.3)` = `#8b5cf6`  
**Opacity:** 0.6 (op-6 class ile)  
**Efektif Opacity:** 0.18 (0.3 × 0.6)  
**Efekt:** Üstten aşağıya mor gradient overlay

### 2. Gradient Edge Bottom (Alt Gradient)
```css
.gradient-edge-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.6));
    z-index: 1;
}
```
**Renk:** Mor (Purple) - `rgba(139, 92, 246, 0.6)` = `#8b5cf6`  
**Efektif Opacity:** 0.6  
**Efekt:** Alttan yukarıya mor gradient overlay (daha koyu)

### 3. SW Overlay (Genel Overlay)
```css
.sw-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(0deg, rgba(16, 20, 53, 0.8) 0%, rgba(16, 20, 53, 0.8) 50%);
    z-index: 1;
    opacity: 0.7; /* op-7 class */
}
```
**Renk:** Koyu mavi/mor - `rgba(16, 20, 53, 0.8)`  
**RGB:** `rgb(16, 20, 53)` = `#101435` (Koyu mavi/mor ton)  
**Opacity:** 0.7 (op-7 class ile)  
**Efektif Renk:** `rgba(16, 20, 53, 0.56)` (0.8 × 0.7 = 0.56)  
**Efekt:** Tüm videoyu kaplayan koyu mavi/mor overlay

## HTML'deki Kullanım
```html
<section id="section-hero" class="jarallax relative" data-video-src="mp4:video/purple-abstract.mp4">
    <div class="gradient-edge-top op-6 h-50"></div>
    <div class="gradient-edge-bottom"></div>
    <div class="sw-overlay op-7"></div>
    <!-- İçerik -->
</section>
```

## Toplam Renk Efekti

Video üzerinde **3 katmanlı overlay** var:

1. **Üst Gradient:** Mor `rgba(139, 92, 246, 0.3)` × 0.6 opacity = **0.18 efektif opacity**
2. **Alt Gradient:** Mor `rgba(139, 92, 246, 0.6)` = **0.6 efektif opacity**
3. **Genel Overlay:** Koyu mavi/mor `rgba(16, 20, 53, 0.8)` × 0.7 opacity = **0.56 efektif opacity**

### Sonuç Renk:
- Video üzerinde **mor tonlu gradient'ler** (üst ve alt)
- **Koyu mavi/mor genel overlay** (tüm video)
- Toplam efekt: **Koyu, mor tonlu, derin görünüm**

## Renk Paleti (Video Tema)

### Ana Renkler:
- **Mor (Purple):** `#8b5cf6` / `rgb(139, 92, 246)`
- **Pembe (Pink):** `#ec4899` / `rgb(236, 72, 153)`
- **Lavanta (Lavender):** `#a78bfa` / `rgb(167, 139, 250)`
- **Koyu Mavi/Mor (Dark Blue/Purple):** `#101435` / `rgb(16, 20, 53)`

### Overlay Renkleri:
- **Gradient Top:** `rgba(139, 92, 246, 0.3)` - Açık mor (Purple)
- **Gradient Bottom:** `rgba(139, 92, 246, 0.6)` - Orta mor (Purple)
- **SW Overlay:** `rgba(16, 20, 53, 0.8)` - Koyu mavi/mor (Dark Blue/Purple)
  - **Efektif:** `rgba(16, 20, 53, 0.56)` (0.8 × 0.7 opacity)

## Tasarım İçin Öneriler

Bu renk paletini kullanarak:

1. **Ana Tema Rengi:** `#8b5cf6` (Mor)
2. **Vurgu Rengi:** `#ec4899` (Pembe)
3. **Aksan Rengi:** `#a78bfa` (Lavanta)
4. **Koyu Overlay:** `#101435` (Koyu mavi/mor) - Metin okunabilirliği için

## CSS Değişkenleri (Önerilen)

```css
:root {
    /* Video Tema Renkleri */
    --video-purple: #8b5cf6;
    --video-purple-rgb: 139, 92, 246;
    --video-pink: #ec4899;
    --video-pink-rgb: 236, 72, 153;
    --video-lavender: #a78bfa;
    --video-lavender-rgb: 167, 139, 250;
    --video-dark: #101435;
    --video-dark-rgb: 16, 20, 53;
    
    /* Overlay Opacities */
    --overlay-top-opacity: 0.3;
    --overlay-bottom-opacity: 0.6;
    --overlay-general-opacity: 0.8;
    
    /* Effective Opacities (with op-6, op-7) */
    --overlay-top-effective: 0.18;
    --overlay-bottom-effective: 0.6;
    --overlay-general-effective: 0.56;
}
```

## Video Filtreleri (Şu an uygulanmıyor)

Video üzerinde **doğrudan CSS filter** yok, sadece overlay'ler var:
- ❌ `filter: hue-rotate()` - YOK
- ❌ `filter: saturate()` - YOK
- ❌ `filter: brightness()` - YOK
- ❌ `filter: contrast()` - YOK
- ✅ Sadece **overlay gradient'ler** ve **opacity** kullanılıyor

## Sonuç

Video'nun rengi **3 katmanlı overlay** ile değiştiriliyor:
1. Üstte açık mor gradient (0.18 efektif)
2. Altta koyu mor gradient (0.6 efektif)
3. Tüm videoda koyu mavi/mor overlay (0.56 efektif)

Bu overlay'ler videoyu **daha koyu ve mor tonlu** yapıyor, böylece beyaz metinler daha iyi okunabiliyor.

## Tasarımda Kullanım

Bu renk paletini tasarımda kullanmak için:

```css
/* Ana tema rengi */
.primary-color {
    color: #8b5cf6; /* Mor */
}

/* Vurgu rengi */
.accent-color {
    color: #ec4899; /* Pembe */
}

/* Koyu overlay */
.dark-overlay {
    background: rgba(16, 20, 53, 0.8); /* Koyu mavi/mor */
}

/* Gradient'ler */
.purple-gradient {
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
}
```
