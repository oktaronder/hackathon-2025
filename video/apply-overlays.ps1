# PowerShell Script - Video Overlay Uygulama
# FFmpeg ile overlay'leri video üzerine uygular

# FFmpeg'in yüklü olup olmadığını kontrol et
$ffmpegPath = Get-Command ffmpeg -ErrorAction SilentlyContinue

if (-not $ffmpegPath) {
    Write-Host "FFmpeg bulunamadı! Lütfen FFmpeg'i yükleyin: https://ffmpeg.org/download.html" -ForegroundColor Red
    exit 1
}

# Video dosya yolları
$inputVideo = "purple-abstract.mp4"
$outputVideo = "purple-abstract-with-overlays.mp4"

# Renk değerleri (RGBA formatında FFmpeg için)
# Genel Overlay: rgba(16, 20, 53, 0.56) -> #101435 with 0.56 opacity
# Üst Gradient: rgba(139, 92, 246, 0.18) -> #8b5cf6 with 0.18 opacity  
# Alt Gradient: rgba(139, 92, 246, 0.6) -> #8b5cf6 with 0.6 opacity

Write-Host "Video overlay'leri uyguluyor..." -ForegroundColor Green

# FFmpeg komutu - 3 katmanlı overlay
# 1. Genel koyu overlay (tüm video)
# 2. Üst mor gradient
# 3. Alt mor gradient

$ffmpegCommand = @"
ffmpeg -i "$inputVideo" `
  -vf "
    color=color=0x101435@0.56:size=1920x1080:duration=1[overlay1];
    [in][overlay1]overlay=0:0:format=auto[tmp1];
    color=color=0x8b5cf6@0.18:size=1920x324:duration=1[gradient_top];
    [tmp1][gradient_top]overlay=0:0:format=auto[tmp2];
    color=color=0x8b5cf6@0.6:size=1920x324:duration=1[gradient_bottom];
    [tmp2][gradient_bottom]overlay=0:H-h:format=auto[out]
  " `
  -c:v libx264 -preset medium -crf 23 `
  -c:a copy `
  -y "$outputVideo"
"@

# Daha basit ve doğru yöntem - colorchannelmixer ve overlay kullanarak
$ffmpegCommand = @"
ffmpeg -i "$inputVideo" `
  -vf "
    scale=1920:1080,
    colorchannelmixer=aa=0.44,
    drawbox=x=0:y=0:w=iw:h=ih*0.3:color=0x8b5cf6@0.18:t=fill,
    drawbox=x=0:y=ih*0.7:w=iw:h=ih*0.3:color=0x8b5cf6@0.6:t=fill,
    drawbox=x=0:y=0:w=iw:h=ih:color=0x101435@0.56:t=fill
  " `
  -c:v libx264 -preset medium -crf 23 `
  -c:a copy `
  -y "$outputVideo"
"@

# En doğru yöntem - overlay filter ile
$ffmpegCommand = @"
ffmpeg -i "$inputVideo" `
  -f lavfi -i color=0x101435@0.56:size=1920x1080:duration=10 `
  -f lavfi -i color=0x8b5cf6@0.18:size=1920x324:duration=10 `
  -f lavfi -i color=0x8b5cf6@0.6:size=1920x324:duration=10 `
  -filter_complex "
    [0:v]scale=1920:1080[base];
    [base][1:v]overlay=0:0:format=auto[tmp1];
    [tmp1][2:v]overlay=0:H-h:format=auto[tmp2];
    [tmp2][3:v]overlay=0:0:format=auto[out]
  " `
  -map "[out]" `
  -map 0:a `
  -c:v libx264 -preset medium -crf 23 `
  -c:a copy `
  -shortest `
  -y "$outputVideo"
"@

Write-Host "FFmpeg komutu çalıştırılıyor..." -ForegroundColor Yellow
Write-Host $ffmpegCommand

# Komutu çalıştır
Invoke-Expression $ffmpegCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nVideo başarıyla oluşturuldu: $outputVideo" -ForegroundColor Green
} else {
    Write-Host "`nHata oluştu! FFmpeg çıktısını kontrol edin." -ForegroundColor Red
}

