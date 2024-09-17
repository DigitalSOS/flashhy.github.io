const facts = [
    { text: "Each corner of a square has a right angle, which is exactly 90 degrees. It’s like the corner of a book or the edge of a piece of paper!"},
    // Add more facts as needed
];

let currentFactIndex = 0;

const factElement = document.getElementById('fact');
const nextButton = document.getElementById('next-button');
const card = document.getElementById('card');
const flipSound = new Audio('red_apples.m4a');
const showSound = new Audio('correct.wav');

// Function to update fact text
function updateFact() {
    const fact = facts[currentFactIndex];
    factElement.textContent = fact.text;
}

// Function to play the flip sound
function playFlipSound() {
    flipSound.play();
}

// Function to play the fact audio
function playFactAudio(audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play();
}

// Play the show sound once the page loads
window.addEventListener('load', () => {
    showSound.play();
});

// Event listener for card click to play flip sound, flip the card, and play the fact audio
card.addEventListener('click', () => {
    if (!card.classList.contains('flipped')) {
        playFlipSound(); // Play flip sound when the card is flipped
        playFactAudio(facts[currentFactIndex].audioSrc); // Play the fact audio when the card is flipped
    }
    card.classList.toggle('flipped');
});

// Event listener for next button to navigate to the next page
nextButton.addEventListener('click', () => {
    // Redirect to the next page
    window.location.href = "next-page.html"; // Change to your target page URL
});

// Initialize with the first fact
updateFact();
