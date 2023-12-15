// script.js
document.getElementById('myButton').addEventListener('click', playButtonClickSound);

function playButtonClickSound() {
  // Get the audio element
  var audio = document.getElementById('clickSound');
  
  // Play the audio
  audio.play();
}