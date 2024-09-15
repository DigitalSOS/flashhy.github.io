// Function to navigate to other html pages

function navigateTo(page) {
  window.location.href = page;
}

// Function to toggle the visibility of the language banner and rotate the globe
function toggleLanguageBanner() {
  const globe = document.getElementById('globe-button').querySelector('img');
  const banner = document.getElementById('language-banner');

  // Toggle the globe rotation
  globe.classList.toggle('rotate-globe');

  // Toggle the banner visibility with scroll down animation
  banner.classList.toggle('show-banner');
}

// Initialize i18next with language resources
i18next.init({
  lng: 'en', // Default language remains English
  fallbackLng: 'en', // Ensure fallback is English if any issues
  resources: {
    en: {
      translation: {
        "welcome": "Welcome to Flashhy",
        "fruits": "Fruits & Veggies",
        "shapes": "Shapes",
        "about": "About"
      }
    },
    es: {
      translation: {
        "welcome": "Bienvenido a Flashhy",
        "fruits": "Frutas y Verduras",
        "shapes": "Formas",
        "about": "Información"
      }
    },
    ar: {
      translation: {
        "welcome": "مرحبا بكم في Flashhy",
        "fruits": "الفواكه والخضروات",
        "shapes": "الأشكال",
        "about": "معلومة"
      }
    }
  }
}, function(err, t) {
  // Update the text content with the default language (English)
  updateContent(); 
});

// Function to change language when a user selects a language from the banner
function changeLanguage(lng) {
  i18next.changeLanguage(lng, function(err, t) {
    if (err) return console.error('something went wrong loading', err);
    updateContent(); // Update the content after selecting the language
    toggleLanguageBanner(); // Hide the banner after selecting the language
  });
}

// Function to update the text content dynamically based on the current language
function updateContent() {
  document.getElementById('welcome-text').innerText = i18next.t('welcome');
  document.getElementById('fruits-btn').innerText = i18next.t('fruits');
  document.getElementById('shapes-btn').innerText = i18next.t('shapes');
  document.getElementById('about-btn').innerText = i18next.t('about');

  // Change the text direction based on the language (RTL for Arabic)
  const isArabic = i18next.language === 'ar';
  document.body.style.direction = isArabic ? 'rtl' : 'ltr'; // Set direction to 'rtl' for Arabic, 'ltr' for others
}
