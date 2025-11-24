# Form Setup Guide - Application Form

## Form Submission Options for Static Site

Bu static site için form submission'ı çalıştırmak için aşağıdaki seçeneklerden birini kullanabilirsiniz:

### Option 1: Formspree (Önerilen - En Kolay)

**Adımlar:**

1. **Formspree Hesabı Oluştur:**
   - https://formspree.io adresine gidin
   - Ücretsiz hesap oluşturun
   - "New Form" butonuna tıklayın

2. **Form ID'yi Al:**
   - Form oluşturulduktan sonra size bir form ID verilecek
   - Örnek: `https://formspree.io/f/xpzgkqyz`

3. **application.html'de Güncelle:**
   - `application.html` dosyasını açın
   - Satır 1063'te şu satırı bulun:
     ```html
     <form id="applicationForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```
   - `YOUR_FORM_ID` kısmını Formspree'den aldığınız ID ile değiştirin
   - Örnek: `action="https://formspree.io/f/xpzgkqyz"`

4. **Email Ayarları:**
   - Formspree dashboard'unda email adresinizi ayarlayın
   - Form gönderimlerini bu email'e alacaksınız

**Avantajları:**
- ✅ Ücretsiz plan (50 submission/ay)
- ✅ Kolay kurulum
- ✅ Spam koruması
- ✅ Email bildirimleri
- ✅ Form verilerini dashboard'da görüntüleme

---

### Option 2: EmailJS (Alternatif)

**Adımlar:**

1. **EmailJS Hesabı Oluştur:**
   - https://www.emailjs.com adresine gidin
   - Ücretsiz hesap oluşturun

2. **Email Service Bağla:**
   - Gmail, Outlook, vb. email servisinizi bağlayın

3. **Template Oluştur:**
   - Email template oluşturun
   - Form alanlarını template'e ekleyin

4. **JavaScript Kodunu Güncelle:**
   - `application.html` içindeki form submission kodunu EmailJS API'sine göre güncelleyin

**Avantajları:**
- ✅ Ücretsiz plan (200 email/ay)
- ✅ Direkt email gönderimi
- ✅ Özelleştirilebilir email template'leri

---

### Option 3: Netlify Forms (Netlify Deploy İçin)

Eğer siteyi Netlify'da deploy ediyorsanız:

1. **Form'a `netlify` attribute ekle:**
   ```html
   <form id="applicationForm" netlify>
   ```

2. **Netlify Dashboard:**
   - Netlify dashboard'unda form submission'ları otomatik görünecek
   - Email bildirimleri ayarlanabilir

**Avantajları:**
- ✅ Netlify kullanıyorsanız ekstra kurulum gerekmez
- ✅ Ücretsiz
- ✅ Spam koruması

---

### Option 4: Google Sheets (Veri Toplama)

Form verilerini Google Sheets'e kaydetmek için:

1. **Google Apps Script kullanın**
2. **Webhook endpoint oluşturun**
3. **Form submission'ı webhook'a gönderin**

---

## Mevcut Form Yapısı

Form şu alanları topluyor:

### Team Leader:
- Full Name
- Email
- Phone Number
- University
- Department/Major
- Education Level
- LinkedIn/CV Link

### Team Member 1:
- Full Name
- Email
- Phone Number
- University
- Department/Major
- Education Level
- LinkedIn/CV Link

### Team Member 2:
- Full Name
- Email
- Phone Number
- University
- Department/Major
- Education Level
- LinkedIn/CV Link

### Additional Information:
- Why do you want to participate?
- Relevant Experience
- Confirmation checkbox

---

## Test Etme

Formu test etmek için:

1. Formspree/EmailJS hesabınızı kurun
2. `application.html` dosyasını güncelleyin
3. Local'de test edin veya deploy edin
4. Test submission gönderin
5. Email'inizi kontrol edin

---

## Önemli Notlar

- ⚠️ Formspree kullanıyorsanız, form ID'yi mutlaka güncelleyin
- ⚠️ Production'da spam koruması aktif olmalı
- ⚠️ Email adreslerini doğru ayarlayın
- ⚠️ Form validation client-side'da çalışıyor, backend validation da eklenebilir

---

## Destek

Sorun yaşarsanız:
- Formspree: https://help.formspree.io
- EmailJS: https://www.emailjs.com/docs
- Email: emusoft.ai@emu.edu.tr

