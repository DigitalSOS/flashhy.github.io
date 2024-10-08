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
    if (banner.classList.contains('show-banner')) {
      banner.classList.remove('show-banner');
    } else {
      banner.classList.add('show-banner');
    }
  }
  
  // Initialize i18next with language resources
  i18next.init({
    lng: 'en', // default language
    resources: {
      en: {
        translation: {
          "welcome": "Developed by Digital SOS",
          "version": "Flashhy Version 1.5",
          "home": "Go to Home",
          "beta": "Beta"
        }
      },
      es: {
        translation: {
          "welcome": "Desarrollado por Digital SOS",
          "version": "Flashhy Versión 1.5",
          "home": "Ir a casa",
          "beta": "Beta"

        }
      }
    }
  }, function(err, t) {
    // Update the text content with the default language
    updateContent();
  });
  
  // Function to change language
  function changeLanguage(lng) {
    i18next.changeLanguage(lng, function(err, t) {
      if (err) return console.error('something went wrong loading', err);
      updateContent();
      toggleLanguageBanner(); // Hide banner after selecting the language
    });
  }
  
  // Function to update the text content dynamically
  function updateContent() {
    document.getElementById('welcome-text').innerText = i18next.t('welcome');
    document.getElementById('version-text').innerText = i18next.t('version');
    document.getElementById('beta-btn').innerText = i18next.t('beta');
    document.getElementById('return-home-btn').innerText = i18next.t('home');

  }
  