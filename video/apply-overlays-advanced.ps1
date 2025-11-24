# Gelişmiş PowerShell Script - Video Overlay Uygulama
# Overlay'leri doğru sırayla uygular

$inputVideo = "purple-abstract.mp4"
$outputVideo = "purple-abstract-with-overlays.mp4"

Write-Host "Video overlay'leri uygulanıyor (Gelişmiş yöntem)..." -ForegroundColor Green

# Video bilgilerini al
$videoInfo = ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 $inputVideo
$dimensions = $videoInfo -split 'x'
$width = $dimensions[0]
$height = $dimensions[1]

Write-Host "Video boyutu: ${width}x${height}" -ForegroundColor Cyan

# Overlay boyutları (height'in %30'u)
$gradientHeight = [math]::Floor($height * 0.3)

# FFmpeg komutu - overlay filter kullanarak
# Sıra: 1. Base video, 2. Genel overlay, 3. Üst gradient, 4. Alt gradient

$ffmpegCmd = @"
ffmpeg -i `"$inputVideo`" `
  -f lavfi -i color=0x101435@0.56:size=${width}x${height}:duration=1 `
  -f lavfi -i color=0x8b5cf6@0.18:size=${width}x${gradientHeight}:duration=1 `
  -f lavfi -i color=0x8b5cf6@0.6:size=${width}x${gradientHeight}:duration=1 `
  -filter_complex `
    `"[0:v]scale=${width}:${height}[base]; ``
     [base][1:v]overlay=0:0:format=auto[tmp1]; ``
     [tmp1][2:v]overlay=0:0:format=auto[tmp2]; ``
     [tmp2][3:v]overlay=0:H-h:format=auto[out]`" `
  -map `"[out]`" `
  -map 0:a `
  -c:v libx264 -preset medium -crf 23 `
  -c:a copy `
  -shortest `
  -y `"$outputVideo`"
"@

Write-Host "FFmpeg komutu çalıştırılıyor..." -ForegroundColor Yellow
Invoke-Expression $ffmpegCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Video başarıyla oluşturuldu: $outputVideo" -ForegroundColor Green
    Write-Host "`nOverlay'ler:" -ForegroundColor Cyan
    Write-Host "  - Genel overlay: rgba(16, 20, 53, 0.56)" -ForegroundColor White
    Write-Host "  - Üst gradient: rgba(139, 92, 246, 0.18)" -ForegroundColor White
    Write-Host "  - Alt gradient: rgba(139, 92, 246, 0.6)" -ForegroundColor White
} else {
    Write-Host "`n✗ Hata oluştu!" -ForegroundColor Red
    Write-Host "FFmpeg çıktısını kontrol edin." -ForegroundColor Yellow
}

