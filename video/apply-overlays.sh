#!/bin/bash
# Bash Script - Video Overlay Uygulama
# FFmpeg ile overlay'leri video üzerine uygular

# FFmpeg'in yüklü olup olmadığını kontrol et
if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg bulunamadı! Lütfen FFmpeg'i yükleyin: https://ffmpeg.org/download.html"
    exit 1
fi

# Video dosya yolları
INPUT_VIDEO="purple-abstract.mp4"
OUTPUT_VIDEO="purple-abstract-with-overlays.mp4"

echo "Video overlay'leri uygulanıyor..."

# FFmpeg komutu - overlay'leri uygula
ffmpeg -i "$INPUT_VIDEO" \
  -f lavfi -i color=0x101435@0.56:size=1920x1080:duration=10 \
  -f lavfi -i color=0x8b5cf6@0.18:size=1920x324:duration=10 \
  -f lavfi -i color=0x8b5cf6@0.6:size=1920x324:duration=10 \
  -filter_complex "
    [0:v]scale=1920:1080[base];
    [base][1:v]overlay=0:0:format=auto[tmp1];
    [tmp1][2:v]overlay=0:H-h:format=auto[tmp2];
    [tmp2][3:v]overlay=0:0:format=auto[out]
  " \
  -map "[out]" \
  -map 0:a \
  -c:v libx264 -preset medium -crf 23 \
  -c:a copy \
  -shortest \
  -y "$OUTPUT_VIDEO"

if [ $? -eq 0 ]; then
    echo ""
    echo "Video başarıyla oluşturuldu: $OUTPUT_VIDEO"
else
    echo ""
    echo "Hata oluştu! FFmpeg çıktısını kontrol edin."
fi

