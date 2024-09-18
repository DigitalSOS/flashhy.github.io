// Array of facts with corresponding images and sounds
const facts = [
    { text: "Square", imgSrc: "square_f.png", audioSrc: "square_f.mp3" },
    { text: "Circle", imgSrc: "circle_f.png", audioSrc: "square_f.mp3" },
    { text: "Triangle", imgSrc: "triangle_f.png", audioSrc: "square_f.mp3" },
    { text: "Fact 4: A rectangle has opposite sides equal!", imgSrc: "rectangle.jpg", audioSrc: "square_f.mp3" }
];

let currentFactIndex = 0;
let isSoundPlayedForCurrentFact = false; // Track whether the sound has played for the current fact

// Select the fact, image, and audio elements
const factElement = document.getElementById('fact');
const cardImageElement = document.getElementById('card-image');
const nextButton = document.getElementById('next-button');
const card = document.getElementById('card');
let currentAudio = null; // Variable to keep track of the currently playing audio

// Function to update the image (card starts with the image first)
function updateImage() {
    const fact = facts[currentFactIndex];
    cardImageElement.src = fact.imgSrc; // Update the card image

    // Ensure the card is showing the image side
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    }

    // Reset the sound-played flag for the new fact
    isSoundPlayedForCurrentFact = false;
}

// Function to update the fact text
function showFact() {
    const fact = facts[currentFactIndex];
    factElement.textContent = fact.text; // Update the fact text when card flips
}

// Function to flip the card to the fact side
function flipCardToFact() {
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        showFact(); // Show the fact when the card flips
        playFactSound(); // Play the sound after the fact side is revealed
    }
}

// Play the fact sound if it hasn't already played for this fact
function playFactSound() {
    if (!isSoundPlayedForCurrentFact) {
        const fact = facts[currentFactIndex];
        
        if (currentAudio) {
            currentAudio.pause(); // Stop any currently playing sound
            currentAudio.currentTime = 0; // Reset the audio to the beginning
        }
        currentAudio = new Audio(fact.audioSrc);

        currentAudio.play().then(() => {
            console.log('Fact audio started playing');
        }).catch((error) => {
            console.error('Error playing fact audio:', error);
        });

        // Mark the sound as played for the current fact
        isSoundPlayedForCurrentFact = true;

        // Re-enable the "Next" button once audio is done
        currentAudio.addEventListener('ended', () => {
            nextButton.disabled = false;
            console.log('Next button enabled');
        });
    }
}

// Event listener for card click
card.addEventListener('click', () => {
    flipCardToFact(); // Flip the card and reveal fact with sound
});

// Event listener for "Next" button to navigate to the next fact
nextButton.addEventListener('click', () => {
    // Flip the card back to the image side before changing the content
    card.classList.remove('flipped');
    
    // Use a slight delay to ensure the card flip transition finishes
    setTimeout(() => {
        // Update to the next fact/image
        currentFactIndex = (currentFactIndex + 1) % facts.length; // Cycle through facts

        // Update the card with the new image
        updateImage();
        
        nextButton.disabled = true; // Disable the "Next" button until the sound is played
    }, 500); // Adjust the delay to match the card flip animation duration
});

// Initialize with the first image (no sound or fact on initial load)
updateImage();
