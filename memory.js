let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

const cardsArray = [
    { name: 'A', img: 'circle_f.png' }, 
    { name: 'B', img: 'diamond_f.png' }, 
    { name: 'C', img: 'hexagon_f.png' }, 
    { name: 'D', img: 'pentagon_f.png' },
    { name: 'E', img: 'lighteningbolt_f.png' }, 
    { name: 'F', img: 'moon_f.png' }, 
    { name: 'G', img: 'oval_f.png' }, 
    { name: 'H', img: 'heart_f.png' },
];

let lastAudio = null;

// Preload audio files
const audioFiles = {
    flip: new Audio('select.wav'),
    match: new Audio('correct.wav'),
    noMatch: new Audio('wrong.mp3'),
    win: new Audio('win.wav')
};

// Shuffle cards
function shuffleCards() {
    return [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
}

// Create game board
function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = ''; // Clear existing cards
    matches = 0; // Reset matches count
    const shuffledCards = shuffleCards();
    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-inner" data-name="${card.name}">
                <div class="card-front">${card.name}</div>
                <div class="card-back">
                    <img src="${card.img}" alt="${card.name}" />
                </div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    document.getElementById('congrats-message').style.display = 'none'; // Hide congrats message
}

// Flip card logic
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched') || this.classList.contains('disabled')) return; // Prevent same card double-click

    this.classList.add('flipped'); // Add flip class for the animation
    const cardInner = this.querySelector('.card-inner');
    cardInner.classList.toggle('flipped'); // Toggle the flipping effect

    // Add glow effect to the currently flipped card
    this.classList.add('glow-select');

    playSound('flip'); // Play sound when flipping the card

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check for match
function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-inner').dataset.name === 
                    secondCard.querySelector('.card-inner').dataset.name;

    if (isMatch) {
        correctMatch();
    } else {
        lockBoard = true; // Lock the board while checking for a match
        // Delay for the wrong match
        setTimeout(() => {
            wrongMatch();
        }, 1000); // Adjust this timing as needed for visual feedback
    }
}

// Handle correct match
function correctMatch() {
    playSound('match'); // Play sound for a correct match
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Add glow effect for matched cards
    firstCard.classList.add('glow-match');
    secondCard.classList.add('glow-match');

    // Set a timeout to apply the disappear animation after a short delay
    setTimeout(() => {
        firstCard.classList.add('disappear');
        secondCard.classList.add('disappear');

        // Disable interactions on matched cards
        firstCard.classList.add('disabled');
        secondCard.classList.add('disabled');

        // Remove glow effect after the disappear animation
        setTimeout(() => {
            firstCard.classList.remove('glow-match');
            resetBoard(); // Reset the board state after handling the match
        }, 600); // Duration of the disappear animation
    }, 1000); // Delay to show the matched cards before they disappear
    matches++;

    // Check for win condition
    if (matches === cardsArray.length) winGame();
}

// Handle incorrect match
function wrongMatch() {
    playSound('noMatch'); // Play sound for an incorrect match
    firstCard.classList.add('shake'); // Add shake animation
    secondCard.classList.add('shake'); // Add shake animation

    // Set a timeout to reset cards after shaking
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.classList.remove('shake');
        secondCard.classList.remove('shake');

        // Remove glow effect from both cards after wrong match
        firstCard.classList.remove('glow-select');
        secondCard.classList.remove('glow-select');

        resetBoard();
    }, 1000); // Time for shake animation
}

// Reset board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Handle game win
function winGame() {
    playSound('win'); // Play win sound
    const congratsMessage = document.getElementById('congrats-message');
    congratsMessage.style.display = 'flex'; // Show congratulations message
}

// Unified function to play sound
function playSound(type) {
    // Stop previous audio if it's still playing
    if (lastAudio) {
        lastAudio.pause();
        lastAudio.currentTime = 0;
    }

    // Select and play the appropriate sound
    const audio = audioFiles[type];
    if (audio) {
        lastAudio = audio;
        audio.play();
    }
}

// Event listener for the restart button
document.getElementById('restart-button').addEventListener('click', createBoard);

// Initialize the game
createBoard();
