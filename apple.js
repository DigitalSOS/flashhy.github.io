//apple.js
document.getElementById('myButton').addEventListener('click', playButtonClickSound);

function playButtonClickSound() {
  // Create an Audio object and provide the path to your sound file
  var audio = new Audio('apple.mp3');
  
  // Play the audio
  audio.play();
}
