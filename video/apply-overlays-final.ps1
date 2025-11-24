# Final PowerShell Script - Video Overlay Uygulama
# Overlay'leri doğru sırayla uygular

$inputVideo = "purple-abstract.mp4"
$outputVideo = "purple-abstract-with-overlays.mp4"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Video Overlay Uygulama" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# FFmpeg kontrolü
$ffmpegCheck = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpegCheck) {
    Write-Host "HATA: FFmpeg bulunamadı!" -ForegroundColor Red
    Write-Host "Lütfen FFmpeg'i yükleyin: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "veya: winget install ffmpeg" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ FFmpeg bulundu" -ForegroundColor Green

# Video dosyası kontrolü
if (-not (Test-Path $inputVideo)) {
    Write-Host "HATA: $inputVideo bulunamadı!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Video dosyası bulundu: $inputVideo" -ForegroundColor Green

# Video bilgilerini al
Write-Host "`nVideo bilgileri alınıyor..." -ForegroundColor Yellow
$videoInfo = ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 $inputVideo 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "HATA: Video bilgileri alınamadı!" -ForegroundColor Red
    Write-Host $videoInfo
    exit 1
}

$dimensions = $videoInfo -split 'x'
$width = [int]$dimensions[0]
$height = [int]$dimensions[1]

Write-Host "  Boyut: ${width}x${height}" -ForegroundColor Cyan

# Overlay boyutları (height'in %30'u)
$gradientHeight = [math]::Floor($height * 0.3)

Write-Host "`nOverlay'ler uygulanıyor..." -ForegroundColor Yellow
Write-Host "  - Genel overlay: rgba(16, 20, 53, 0.56)" -ForegroundColor White
Write-Host "  - Üst gradient: rgba(139, 92, 246, 0.18) - ${width}x${gradientHeight}" -ForegroundColor White
Write-Host "  - Alt gradient: rgba(139, 92, 246, 0.6) - ${width}x${gradientHeight}" -ForegroundColor White
Write-Host ""

# FFmpeg komutu
# Sıra: 1. Base video scale, 2. Genel overlay, 3. Üst gradient, 4. Alt gradient

$ffmpegArgs = @(
    "-i", "`"$inputVideo`"",
    "-f", "lavfi", "-i", "color=0x101435@0.56:size=${width}x${height}:duration=1",
    "-f", "lavfi", "-i", "color=0x8b5cf6@0.18:size=${width}x${gradientHeight}:duration=1",
    "-f", "lavfi", "-i", "color=0x8b5cf6@0.6:size=${width}x${gradientHeight}:duration=1",
    "-filter_complex", "[0:v]scale=${width}:${height}[base]; [base][1:v]overlay=0:0:format=auto[tmp1]; [tmp1][2:v]overlay=0:0:format=auto[tmp2]; [tmp2][3:v]overlay=0:H-h:format=auto[out]",
    "-map", "[out]",
    "-map", "0:a",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "23",
    "-c:a", "copy",
    "-shortest",
    "-y",
    "`"$outputVideo`""
)

Write-Host "FFmpeg çalıştırılıyor... (Bu biraz zaman alabilir)" -ForegroundColor Yellow
Write-Host ""

& ffmpeg $ffmpegArgs

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ BAŞARILI!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Video oluşturuldu: $outputVideo" -ForegroundColor Cyan
    
    $fileSize = (Get-Item $outputVideo).Length / 1MB
    Write-Host "Dosya boyutu: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Bu video, sitenizde göründüğü gibi overlay'lerin uygulandığı versiyondur." -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "✗ HATA!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "FFmpeg hatası oluştu. Lütfen hata mesajını kontrol edin." -ForegroundColor Yellow
}

