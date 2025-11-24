# Video Overlay Uygulama Kılavuzu

Bu script'ler, sitenizdeki overlay'leri video üzerine uygulayarak yeni bir video oluşturur.

## Overlay Bilgileri

Video üzerinde 3 katmanlı overlay var:

1. **Genel Overlay:** `rgba(16, 20, 53, 0.56)` - Koyu mavi/mor (tüm video)
2. **Üst Gradient:** `rgba(139, 92, 246, 0.18)` - Mor (üst %30)
3. **Alt Gradient:** `rgba(139, 92, 246, 0.6)` - Mor (alt %30)

## Gereksinimler

- **FFmpeg** yüklü olmalı
  - Windows: https://ffmpeg.org/download.html
  - veya: `choco install ffmpeg` (Chocolatey ile)
  - veya: `winget install ffmpeg` (Windows Package Manager ile)

## Kullanım

### Windows (PowerShell)

1. `video` klasörüne gidin:
   ```powershell
   cd "AIvent\AIvent HTML\video"
   ```

2. Script'i çalıştırın:
   ```powershell
   .\apply-overlays-advanced.ps1
   ```

   Veya basit versiyon:
   ```powershell
   .\apply-overlays-simple.ps1
   ```

### Linux/Mac (Bash)

1. Script'i çalıştırılabilir yapın:
   ```bash
   chmod +x apply-overlays.sh
   ```

2. Çalıştırın:
   ```bash
   ./apply-overlays.sh
   ```

## Çıktı

Script, `purple-abstract-with-overlays.mp4` adında yeni bir video oluşturur.

Bu video, sitenizde göründüğü gibi overlay'lerin uygulandığı versiyondur.

## Manuel FFmpeg Komutu

Eğer script çalışmazsa, manuel olarak:

```bash
ffmpeg -i purple-abstract.mp4 \
  -f lavfi -i color=0x101435@0.56:size=1920x1080:duration=1 \
  -f lavfi -i color=0x8b5cf6@0.18:size=1920x324:duration=1 \
  -f lavfi -i color=0x8b5cf6@0.6:size=1920x324:duration=1 \
  -filter_complex "[0:v]scale=1920:1080[base]; [base][1:v]overlay=0:0:format=auto[tmp1]; [tmp1][2:v]overlay=0:0:format=auto[tmp2]; [tmp2][3:v]overlay=0:H-h:format=auto[out]" \
  -map "[out]" -map 0:a \
  -c:v libx264 -preset medium -crf 23 \
  -c:a copy -shortest -y purple-abstract-with-overlays.mp4
```

## Notlar

- Video boyutu otomatik olarak algılanır
- Overlay'ler video boyutuna göre ölçeklenir
- Çıktı kalitesi: CRF 23 (orta kalite, iyi dosya boyutu)
- Ses kanalı kopyalanır (yeniden encode edilmez)

