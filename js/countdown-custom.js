jQuery(document).ready(function() {
        $(function () {
            // Set countdown to December 5, 2025 at 17:00 (5 PM)
            $('#defaultCountdown').countdown({until: new Date(2025, 12-1, 5, 17)}); // year, month, date, hour
        });
});		

