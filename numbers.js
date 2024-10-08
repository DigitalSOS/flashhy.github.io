let currentNumber = 1;
const numbers = [
  { value: 1, text: 'One', audio: 'one.mp3', items: 1 },
  { value: 2, text: 'Two', audio: 'two.mp3', items: 2 },
  { value: 3, text: 'Three', audio: 'three.mp3', items: 3 },
  { value: 4, text: 'Four', audio: 'four.mp3', items: 4 },
  { value: 5, text: 'Five', audio: 'five.mp3', items: 5 },
  { value: 6, text: 'Six', audio: 'six.mp3', items: 6 },
  { value: 7, text: 'Seven', audio: 'seven.mp3', items: 7 },
  { value: 8, text: 'Eight', audio: 'eight.mp3', items: 8 },
  { value: 9, text: 'Nine', audio: 'nine.mp3', items: 9 },
  { value: 10, text: 'Ten', audio: 'ten.mp3', items: 10 },
  { value: 11, text: 'Eleven', audio: 'eleven.mp3', items: 11 },
  { value: 12, text: 'Twelve', audio: 'twelve.mp3', items: 12 },
  { value: 13, text: 'Thirteen', audio: 'thirteen.mp3', items: 13 },
  { value: 14, text: 'Fourteen', audio: 'fourteen.mp3', items: 14 },
  { value: 15, text: 'Fiften', audio: 'fiften.mp3', items: 15 },
  { value: 16, text: 'Sixteen', audio: 'sixteen.mp3', items: 16 },
  { value: 17, text: 'Seventeen', audio: 'seventeen.mp3', items: 17 },
  { value: 18, text: 'Eighteen', audio: 'eighteen.mp3', items: 18 },
  { value: 19, text: 'Nineteen', audio: 'nineteen.mp3', items: 19 },
  { value: 20, text: 'Twenty', audio: 'twenty.mp3', items: 20 }

];

function displayNumber() {
  const number = numbers[currentNumber - 1];

  // Trigger flip, zoom, and slide-out animations
  document.getElementById('numberDisplay').classList.add('flip-out');
  document.getElementById('textDisplay').classList.add('zoom-out');
  document.getElementById('itemsContainer').classList.add('slide-out');

  setTimeout(() => {
    // Update content
    document.getElementById('numberDisplay').textContent = number.value;
    document.getElementById('textDisplay').textContent = number.text;

    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';
    for (let i = 0; i < number.items; i++) {
      const item = document.createElement('div');
      item.classList.add('item');
      itemsContainer.appendChild(item);
    }

    const audio = document.getElementById('numberAudio');
    audio.src = number.audio;
    audio.play();

    // Remove 'out' animations and add 'in' animations
    document.getElementById('numberDisplay').classList.remove('flip-out');
    document.getElementById('textDisplay').classList.remove('zoom-out');
    document.getElementById('itemsContainer').classList.remove('slide-out');

    document.getElementById('numberDisplay').classList.add('flip-in');
    document.getElementById('textDisplay').classList.add('zoom-in');
    document.getElementById('itemsContainer').classList.add('slide-in');
  }, 1000);  // Adjust the delay to match the animation duration
}

function nextNumber() {
  currentNumber = (currentNumber % numbers.length) + 1;
  displayNumber();
}

window.onload = displayNumber;


let fireworksInterval = null;

function triggerFireworks() {
  const fireworksContainer = document.createElement('div');
  fireworksContainer.id = 'fireworks';
  document.body.appendChild(fireworksContainer);

  function createFireworks() {
    // Clear existing fireworks
    fireworksContainer.innerHTML = '';

    // Create 20 fireworks
    for (let i = 0; i < 20; i++) {
      const firework = document.createElement('div');
      firework.classList.add('firework');
      firework.style.left = `${Math.random() * 100}%`;
      firework.style.top = `${Math.random() * 100}%`;
      fireworksContainer.appendChild(firework);
    }
  }

  createFireworks(); // Initial trigger

  // Set a recurring interval to keep creating fireworks
  fireworksInterval = setInterval(createFireworks, 1500); // Duration for fireworks animation
}

function stopFireworks() {
  if (fireworksInterval) {
    clearInterval(fireworksInterval); // Stop the loop
    fireworksInterval = null;
    const fireworksContainer = document.getElementById('fireworks');
    if (fireworksContainer) {
      fireworksContainer.remove(); // Remove fireworks from the DOM
    }
  }
}

function displayNumber() {
  const number = numbers[currentNumber - 1];

  // Trigger flip, zoom, and slide-out animations
  document.getElementById('numberDisplay').classList.add('flip-out');
  document.getElementById('textDisplay').classList.add('zoom-out');
  document.getElementById('itemsContainer').classList.add('slide-out');

  setTimeout(() => {
    // Update content
    document.getElementById('numberDisplay').textContent = number.value;
    document.getElementById('textDisplay').textContent = number.text;

    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = '';
    for (let i = 0; i < number.items; i++) {
      const item = document.createElement('div');
      item.classList.add('item');
      itemsContainer.appendChild(item);
    }

    // Handle audio
    const audio = document.getElementById('numberAudio');
    audio.pause(); // Stop any ongoing audio
    audio.currentTime = 0; // Reset the audio
    audio.src = number.audio;
    audio.load(); // Preload the audio file
    audio.play().catch((error) => {
      console.log('Audio autoplay blocked:', error);
      // Trigger audio play after user interaction
      document.addEventListener('click', () => {
        audio.play();
      }, { once: true });
    });

    // Fireworks when number is 1 (restart fireworks)
    if (number.value === 1) {
      triggerFireworks();
    }

    // Remove 'out' animations and add 'in' animations
    document.getElementById('numberDisplay').classList.remove('flip-out');
    document.getElementById('textDisplay').classList.remove('zoom-out');
    document.getElementById('itemsContainer').classList.remove('slide-out');

    document.getElementById('numberDisplay').classList.add('flip-in');
    document.getElementById('textDisplay').classList.add('zoom-in');
    document.getElementById('itemsContainer').classList.add('slide-in');
  }, 1000); // Adjust the delay to match the animation duration
}

function nextNumber() {
  stopFireworks(); // Stop fireworks when "Next" is clicked
  currentNumber = (currentNumber % numbers.length) + 1;
  displayNumber();
}

window.onload = displayNumber;

  
  
  function displayNumber() {
    const number = numbers[currentNumber - 1];
  
    // Trigger flip, zoom, and slide-out animations
    document.getElementById('numberDisplay').classList.add('flip-out');
    document.getElementById('textDisplay').classList.add('zoom-out');
    document.getElementById('itemsContainer').classList.add('slide-out');
  
    setTimeout(() => {
      // Update content
      document.getElementById('numberDisplay').textContent = number.value;
      document.getElementById('textDisplay').textContent = number.text;
  
      const itemsContainer = document.getElementById('itemsContainer');
      itemsContainer.innerHTML = '';
      for (let i = 0; i < number.items; i++) {
        const item = document.createElement('div');
        item.classList.add('item');
        itemsContainer.appendChild(item);
      }
  
      // Handle audio
      const audio = document.getElementById('numberAudio');
      audio.pause(); // Stop any ongoing audio
      audio.currentTime = 0; // Reset the audio
  
      // Preload and handle errors
      audio.src = number.audio;
      audio.load(); // Preload the audio file
  
      audio.play().catch((error) => {
        console.log('Audio autoplay blocked:', error);
        // Trigger audio play after user interaction
        document.addEventListener('click', () => {
          audio.play();
        }, { once: true });
      });
  
      // Add an error event listener to detect audio loading issues
      audio.addEventListener('error', function () {
        console.log(`Error loading audio for number ${number.value}`);
      });
  
      // Fireworks when number 20 is reached
      if (number.value === 20) {
        triggerFireworks();
      }
  
      // Remove 'out' animations and add 'in' animations
      document.getElementById('numberDisplay').classList.remove('flip-out');
      document.getElementById('textDisplay').classList.remove('zoom-out');
      document.getElementById('itemsContainer').classList.remove('slide-out');
  
      document.getElementById('numberDisplay').classList.add('flip-in');
      document.getElementById('textDisplay').classList.add('zoom-in');
      document.getElementById('itemsContainer').classList.add('slide-in');
    }, 1000);  // Adjust the delay to match the animation duration
  }
  
  