// Array of facts with corresponding images and sounds
const facts = [
    { text: "Fact 1: A square has four equal sides!", imgSrc: "square_f.jpg", audioSrc: "correct.wav" },
    { text: "Fact 2: A circle is round with no corners!", imgSrc: "square.jpg", audioSrc: "wrong.mp3" },
    { text: "Fact 3: A triangle has three sides!", imgSrc: "star.png", audioSrc: "win.wav" },
    { text: "Fact 4: A rectangle has opposite sides equal!", imgSrc: "strawberry.jpg", audioSrc: "wrong.mp3" }
];

let currentFactIndex = 0;
let isSoundPlayedForCurrentFact = false; // Track whether the sound has played for the current fact

// Select the fact, image, and audio elements
const factElement = document.getElementById('fact');
const cardImageElement = document.getElementById('card-image');
const nextButton = document.getElementById('next-button');
const card = document.getElementById('card');
const flipSound = new Audio('correct.wav'); // Flip sound

let currentAudio = null; // Variable to keep track of the currently playing audio

// Function to update the fact text and image
function updateFact() {
    const fact = facts[currentFactIndex];

    // Update text and image
    factElement.textContent = fact.text;
    cardImageElement.src = fact.imgSrc;

    // Reset the sound-played flag for the new fact
    isSoundPlayedForCurrentFact = false;

    // Ensure the card is flipped to the image side when clicking "Next"
    if (!card.classList.contains('flipped')) {
        flipCardToImage();
    } else {
        flipCardToImageAndFact();
    }
    
    // Disable the "Next" button while flipping
    nextButton.disabled = true;
    console.log('Next button disabled');
}

// Function to flip the card to the image side first
function flipCardToImage() {
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped'); // Flip back to the image side
    }

    // After a short delay, flip to the fact side
    setTimeout(() => {
        card.classList.add('flipped');
        playFactSound(); // Play the sound after the fact side is revealed
    }, 1000); // 1-second delay before flipping to fact side
}

// Function to flip the card to the fact side (when already showing the image)
function flipCardToImageAndFact() {
    card.classList.remove('flipped'); // Flip back to image side

    // After a short delay, flip to fact side
    setTimeout(() => {
        card.classList.add('flipped');
        playFactSound(); // Play the sound after the fact side is revealed
    }, 1500);
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
    // Only play sound if the card hasn't already been flipped for this fact
    if (!card.classList.contains('flipped')) {
        playFlipSound(); // Play flip sound and fact sound when the card is flipped
    }
    card.classList.toggle('flipped'); // Flip the card
});

// Event listener for "Next" button to navigate to the next fact
nextButton.addEventListener('click', () => {
    currentFactIndex = (currentFactIndex + 1) % facts.length; // Cycle through facts
    updateFact();  // Update the fact text and image, but no sound
});

// Initialize with the first fact (no sound on initial load)
updateFact();
