// JavaScript for the matching game with fireworks and sounds
const items = document.querySelectorAll('.game-grid .card');  // Select all items
let selectedItem = null;  // Holds the currently selected item
let matchedCount = 0;
let gameWon = false;  // This flag will prevent further playing once the game is won

// Load sound files
const clickSound = new Audio('sounds/select.wav');
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');

// Function to handle item click
function handleItemClick(item) {
    if (gameWon || item.classList.contains('correct') || item === selectedItem) return;  // Prevent further clicks if the game is won or item is already matched

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

            // Play correct sound
            correctSound.play();

            matchedCount++;
            checkGameCompletion();
        } else {
            // Wrong match
            item.classList.add('wrong');
            selectedItem.classList.add('wrong');

            // Play wrong sound
            wrongSound.play();

            setTimeout(() => {
                item.classList.remove('wrong');
                selectedItem.classList.remove('wrong');
                // Reset the selection
                selectedItem.classList.remove('selected');
                selectedItem = null;
            }, 500);
        }

        // Deselect the selected item
        selectedItem.classList.remove('selected');
        selectedItem = null;
    }
}

// Add event listeners for all items
items.forEach(item => {
    item.addEventListener('click', () => handleItemClick(item));
});

// Check if all items are matched and trigger fireworks
function checkGameCompletion() {
    if (matchedCount === items.length / 2) {  // Since there are pairs, matchedCount should be half the number of items
        const congratsMessage = document.getElementById('congrats-message');
        congratsMessage.classList.remove('hidden');

        triggerFireworks();
        gameWon = true;
    }
}

let fireworksInterval = null;

// Function to create and trigger firework animations continuously
function triggerFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.classList.remove('hidden');

    fireworksInterval = setInterval(() => {
        createFirework();
    }, 500);
}

// Function to create a single firework burst
function createFirework() {
    const fireworksContainer = document.getElementById('fireworks-container');
    const firework = document.createElement('div');
    firework.classList.add('firework');

    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        firework.appendChild(circle);
    }

    // Position firework randomly on the screen
    firework.style.top = Math.random() * 100 + '%';
    firework.style.left = Math.random() * 100 + '%';

    fireworksContainer.appendChild(firework);

    // Remove each firework after its animation is complete
    setTimeout(() => {
        firework.remove();
    }, 1500);
}
