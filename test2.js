const items = document.querySelectorAll('.game-container .item');
let selectedItem = null;
let matchedCount = 0;
let gameWon = false;

const clickSound = new Audio('sounds/select.wav');
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');
const winSound = new Audio('sounds/win.mp3');  // Added win sound

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to randomize card positions
function randomizeCards() {
    const gameContainer = document.querySelector('.game-container');
    const columns = gameContainer.querySelectorAll('.column');

    // Create an array to hold all card items
    let items = [];
    columns.forEach(column => {
        items = items.concat(Array.from(column.querySelectorAll('.item')));
    });

    // Shuffle the card items
    items = shuffleArray(items);

    // Remove all items from the columns
    columns.forEach(column => {
        while (column.firstChild) {
            column.removeChild(column.firstChild);
        }
    });

    // Re-distribute the shuffled items into columns
    items.forEach((item, index) => {
        columns[index % columns.length].appendChild(item);
    });
}

// Call the randomizeCards function when the page loads
window.addEventListener('load', () => {
    randomizeCards();
});

// Function to handle item click
function handleItemClick(item) {
    if (gameWon || item.classList.contains('correct') || item === selectedItem) return;  // Prevent further clicks if game is won or item already matched

    // Play click sound
    clickSound.play();

    // Check if an item is already selected
    if (!selectedItem) {
        // No item selected yet, select the clicked one
        selectedItem = item;
        item.classList.add('selected');
    } else {
        // An item is already selected, compare the two
        const selectedMatch = selectedItem.getAttribute('data-match');
        const currentMatch = item.getAttribute('data-match');

        if (selectedItem !== item && selectedMatch === currentMatch) {
            // Correct match
            item.classList.add('correct');
            selectedItem.classList.add('correct');
            correctSound.play();
            matchedCount += 2;
            checkGameCompletion();
            selectedItem = null;  // Reset selected item after match
        } else {
            // Wrong match
            item.classList.add('wrong');
            selectedItem.classList.add('wrong');
            wrongSound.play();

            setTimeout(() => {
                // Remove wrong and selected classes after a brief delay
                item.classList.remove('wrong', 'selected');
                selectedItem.classList.remove('wrong', 'selected');
                selectedItem = null;
            }, 500);
        }
    }
}

items.forEach(item => {
    item.addEventListener('click', () => handleItemClick(item));
});

function checkGameCompletion() {
    if (matchedCount === items.length) {
        const congratsMessage = document.getElementById('congrats-message');
        congratsMessage.style.display = 'block'; // Make it visible
        congratsMessage.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale it up with animation
        winSound.play(); // Play win sound
        gameWon = true;
        disableGameButtons(); // Disable further clicks
    }
}



// Disable further clicks on all game items
function disableGameButtons() {
    items.forEach(item => {
        item.style.pointerEvents = 'none'; // Disable item clicks
    });
}

function goHome() {
    window.location.href = 'index.html';  // Replace 'index.html' with your actual home page URL
}
