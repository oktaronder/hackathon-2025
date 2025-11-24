// ============================================
// SCHEMA.ORG STRUCTURED DATA
// SEO enhancement with structured data markup
// ============================================

(function() {
    'use strict';
    
    function addSchemaMarkup() {
        // Event Schema
        const eventSchema = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Future Minds Hackathon 2025",
            "description": "Construction AI Challenge - Solve real construction problems with AI. ₺150,000 prize pool.",
            "startDate": "2025-12-05T17:00:00+02:00",
            "endDate": "2025-12-07T23:59:59+02:00",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
                "@type": "Place",
                "name": "Cyprus Construction",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kıbrıs",
                    "addressCountry": "CY"
                }
            },
            "organizer": {
                "@type": "Organization",
                "name": "EMU Software & AI Development Club",
                "email": "emusoft.ai@emu.edu.tr"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY",
                "availability": "https://schema.org/InStock",
                "url": "https://futuremindshackathon.com/application.html",
                "validFrom": "2025-01-01T00:00:00+02:00"
            },
            "image": "https://futuremindshackathon.com/images/logo-emusoft.png"
        };
        
        // Organization Schema
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EMU Software & AI Development Club",
            "url": "https://futuremindshackathon.com",
            "logo": "https://futuremindshackathon.com/images/logo-emusoft.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "email": "emusoft.ai@emu.edu.tr",
                "contactType": "Customer Service"
            }
        };
        
        // Add schemas to page
        const eventScript = document.createElement('script');
        eventScript.type = 'application/ld+json';
        eventScript.textContent = JSON.stringify(eventSchema);
        document.head.appendChild(eventScript);
        
        const orgScript = document.createElement('script');
        orgScript.type = 'application/ld+json';
        orgScript.textContent = JSON.stringify(organizationSchema);
        document.head.appendChild(orgScript);
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSchemaMarkup);
    } else {
        addSchemaMarkup();
    }
})();

