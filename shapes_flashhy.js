const facts = [
    { text: "Fact 1: Square"},
    { text: "Fact 2: Circle"},


    // Add more facts as needed
];

let currentFactIndex = 0;

const factElement = document.getElementById('fact');
const nextButton = document.getElementById('next-button');
const card = document.getElementById('card');
const flipSound = new Audio('red_apples.m4a');

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
