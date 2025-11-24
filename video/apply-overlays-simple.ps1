# Basit PowerShell Script - Video Overlay Uygulama
# Daha basit ve çalışan versiyon

$inputVideo = "purple-abstract.mp4"
$outputVideo = "purple-abstract-with-overlays.mp4"

Write-Host "Video overlay'leri uygulanıyor..." -ForegroundColor Green

# Basit yöntem: drawbox ile overlay'leri çiz
# Not: FFmpeg'de alpha channel desteği için format belirtmek gerekir

$command = "ffmpeg -i `"$inputVideo`" -vf `"scale=1920:1080,format=yuva420p,colorchannelmixer=aa=0.44,drawbox=x=0:y=0:w=iw:h=ih*0.3:color=0x8b5cf6@0.18:t=fill,drawbox=x=0:y=ih*0.7:w=iw:h=ih*0.3:color=0x8b5cf6@0.6:t=fill,drawbox=x=0:y=0:w=iw:h=ih:color=0x101435@0.56:t=fill`" -c:v libx264 -preset medium -crf 23 -c:a copy -y `"$outputVideo`""

Write-Host "Komut: $command" -ForegroundColor Yellow
Invoke-Expression $command

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nVideo başarıyla oluşturuldu: $outputVideo" -ForegroundColor Green
} else {
    Write-Host "`nHata oluştu!" -ForegroundColor Red
    Write-Host "Alternatif yöntem deneyin: apply-overlays-advanced.ps1" -ForegroundColor Yellow
}

