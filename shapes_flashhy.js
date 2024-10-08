// Array of facts with corresponding images and sounds
const facts = [
    { text: "Square", imgSrc: "square_f.png", audioSrc: "square_f.mp3" },
    { text: "Circle", imgSrc: "circle_f.png", audioSrc: "circle_f.mp3" },
    { text: "Triangle", imgSrc: "triangle_f.png", audioSrc: "triangle_f.mp3" },
    { text: "Rectangle", imgSrc: "rectangle_f.png", audioSrc: "rectangle_f.mp3" },
    { text: "Diamond", imgSrc: "diamond_f.png", audioSrc: "diamond_f.mp3" },
    { text: "Parellelogram", imgSrc: "parellelogram_f.png", audioSrc: "parellelogram_f.mp3" },
    { text: "Ocatgon", imgSrc: "octagon_f.png", audioSrc: "octagon_f.mp3" },
    { text: "Hexagon", imgSrc: "hexagon_f.png", audioSrc: "hexagon_f.mp3" },
    { text: "Oval", imgSrc: "oval_f.png", audioSrc: "oval_f.mp3" },
    { text: "Pentagon", imgSrc: "pentagon_f.png", audioSrc: "pentagon_f.mp3" },
    { text: "Cloud", imgSrc: "cloud_f.png", audioSrc: "cloud_f.mp3" },
    { text: "Cross", imgSrc: "cross_f.png", audioSrc: "cross_f.mp3" },
    { text: "Heart", imgSrc: "heart_f.png", audioSrc: "heart_f.mp3" },
    { text: "Moon", imgSrc: "moon_f.png", audioSrc: "moon_f.mp3" },
    { text: "Trapezoid", imgSrc: "trapezoid_f.png", audioSrc: "trapezoid_f.mp3" },
    { text: "Sun", imgSrc: "sun_f.png", audioSrc: "sun_f.mp3" },
    { text: "Lightening Bolt", imgSrc: "lighteningbolt_f.png", audioSrc: "lighteningbolt_f.mp3" },
    { text: "Star", imgSrc: "star_f.png", audioSrc: "star_f.mp3" },
    { text: "Smiley Face", imgSrc: "smiley_f.png", audioSrc: "smiley_f.mp3" }

];  

let currentFactIndex = 0;
let currentAudio = null; // Variable to keep track of the currently playing audio
let isCardFlipped = false; // Track whether the card is flipped
let canFlipCard = true; // Flag to allow or disallow card flip

// Select the fact, image, and audio elements
const factElement = document.getElementById('fact');
const cardImageElement = document.getElementById('card-image');
const card = document.getElementById('card');

// Function to update the image (card starts with the image first)
function updateImage() {
    const fact = facts[currentFactIndex];
    cardImageElement.src = fact.imgSrc; // Update the card image

    // Ensure the card is showing the image side
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    }

    // Reset the flag for card flip
    isCardFlipped = false;
}

// Function to update the fact text
function showFact() {
    const fact = facts[currentFactIndex];
    factElement.textContent = fact.text; // Update the fact text when card flips
}

// Function to flip the card to the fact side and play sound
function flipCardToFact() {
    if (!isCardFlipped && canFlipCard) {
        card.classList.add('flipped');
        showFact(); // Show the fact when the card flips
        playFactSound(); // Play the sound after the fact side is revealed
        isCardFlipped = true; // Mark the card as flipped
        canFlipCard = false; // Disable card flip until audio ends

        // Move to the next card after the audio has finished
        currentAudio.addEventListener('ended', () => {
            setTimeout(() => {
                goToNextCard();
                canFlipCard = true; // Re-enable card flip for the next round
            }, 100); // Delay before moving to the next card to give time for animations
        });
    }
}

// Play the fact sound (only when card is flipped)
function playFactSound() {
    const fact = facts[currentFactIndex];

    // Stop any previously playing sound
    if (currentAudio) {
        currentAudio.pause(); // Stop any currently playing sound
        currentAudio.currentTime = 0; // Reset the audio to the beginning
    }

    currentAudio = new Audio(fact.audioSrc);

    // Play the audio and handle errors gracefully
    currentAudio.play().then(() => {
        console.log('Fact audio started playing');
    }).catch((error) => {
        console.error('Error playing fact audio:', error);
    });
}

// Function to go to the next card
function goToNextCard() {
    card.classList.remove('flipped'); // Flip the card back to the image side
    isCardFlipped = false; // Reset the flip state for the next fact

    // Update to the next fact/image
    currentFactIndex = (currentFactIndex + 1) % facts.length; // Cycle through facts

    // Update the card with the new image
    updateImage();
}

// Event listener for card click (flip card and play sound)
card.addEventListener('click', () => {
    flipCardToFact(); // Flip the card and reveal fact with sound
});

// Initialize with the first image (no sound or fact on initial load)
updateImage();
