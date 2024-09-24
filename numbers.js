let currentNumber = 1;
const numbers = [
  { value: 1, text: 'One', audio: 'audio/one.mp3', items: 1 },
  { value: 2, text: 'Two', audio: 'audio/two.mp3', items: 2 },
  { value: 3, text: 'Three', audio: 'audio/three.mp3', items: 3 },
  { value: 4, text: 'Four', audio: 'audio/four.mp3', items: 4 },
  { value: 5, text: 'Five', audio: 'audio/five.mp3', items: 5 },
  { value: 6, text: 'Six', audio: 'audio/six.mp3', items: 6 },
  { value: 7, text: 'Seven', audio: 'audio/seven.mp3', items: 7 },
  { value: 8, text: 'Eight', audio: 'audio/eight.mp3', items: 8 },
  { value: 9, text: 'Nine', audio: 'audio/nine.mp3', items: 9 },
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
