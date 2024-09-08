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
          "welcome": "Welcome to Flasshy",
          "colors": "Colors",
          "shapes": "Shapes",
          "fruits": "Fruits & Vegetables",
          "moreShapes": "Shapes",
          "test1": "Test",
          "test2": "Test",
          "test3": "Test",
          "test4": "Test"
        }
      },
      es: {
        translation: {
          "welcome": "Bienvenido a Flasshy",
          "colors": "Colores",
          "shapes": "Formas",
          "fruits": "Frutas y Verduras",
          "moreShapes": "Formas",
          "test1": "Prueba",
          "test2": "Prueba",
          "test3": "Prueba",
          "test4": "Prueba"
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
    document.getElementById('colors-btn').innerText = i18next.t('colors');
    document.getElementById('shapes-btn').innerText = i18next.t('shapes');
    document.getElementById('fruits-btn').innerText = i18next.t('fruits');
    document.getElementById('more-shapes-btn').innerText = i18next.t('moreShapes');
    document.getElementById('test-btn1').innerText = i18next.t('test1');
    document.getElementById('test-btn2').innerText = i18next.t('test2');
    document.getElementById('test-btn3').innerText = i18next.t('test3');
    document.getElementById('test-btn4').innerText = i18next.t('test4');
  }
  