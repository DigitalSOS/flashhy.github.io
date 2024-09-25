let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

const cardsArray = [
    { name: 'A', img: 'red-apple.png' }, 
    { name: 'B', img: 'grape.jpg' }, 
    { name: 'C', img: 'hexagon_f.png' }, 
    { name: 'D', img: 'pentagon_f.png' }
];

let shuffledCards;

function shuffleCards() {
    shuffledCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    shuffleCards();
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
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped', 'glow-select'); // Add glow effect on selection

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-inner').dataset.name === 
                    secondCard.querySelector('.card-inner').dataset.name;

    isMatch ? correctMatch() : wrongMatch();
}

function correctMatch() {
    disableMatchedCards(); // Disable further clicks on matched cards
    firstCard.classList.add('matched', 'glow-match'); // Add glow for matched cards
    secondCard.classList.add('matched', 'glow-match'); // Add glow for matched cards

    playSound('match');

    resetBoard();
    matches++;
    if (matches === cardsArray.length) winGame();
}

function wrongMatch() {
    lockBoard = true;

    firstCard.classList.add('shake', 'glow-wrong'); // Add glow effect for wrong match
    secondCard.classList.add('shake', 'glow-wrong'); // Add glow effect for wrong match
    playSound('no-match');

    setTimeout(() => {
        firstCard.classList.remove('flipped', 'shake', 'glow-wrong'); // Remove glow after shaking
        secondCard.classList.remove('flipped', 'shake', 'glow-wrong'); // Remove glow after shaking
        resetBoard();
    }, 1000);
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function winGame() {
    playSound('win');

    const congratsMessage = document.getElementById('congrats-message');
    congratsMessage.style.display = 'flex';

    document.getElementById('closeModal').addEventListener('click', () => {
        congratsMessage.style.display = 'none';
        matches = 0;
        createBoard();
    }, { once: true });
}

let lastAudio = null;

function playSound(type) {
    if (lastAudio) {
        lastAudio.pause();
        lastAudio.currentTime = 0;
    }

    let audio;
    if (type === 'match') {
        audio = new Audio('match-sound.mp3');
    } else if (type === 'no-match') {
        audio = new Audio('no-match-sound.mp3');
    } else if (type === 'win') {
        audio = new Audio('win-sound.mp3');
    }

    lastAudio = audio;
    audio.play();
}

document.getElementById('restart-button').addEventListener('click', () => {
    matches = 0;
    createBoard();
});

// Initialize the game
createBoard();
