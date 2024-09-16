const items = document.querySelectorAll('.game-container .item');
let selectedItem = null;
let matchedCount = 0;
let gameWon = false;
let isCheckingMatch = false;

const clickSound = new Audio('select.wav');
const correctSound = new Audio('correct.wav');
const wrongSound = new Audio('wrong.mp3');
const winSound = new Audio('win.wav');

// Handle card clicks
function handleItemClick(item) {
    if (gameWon || isCheckingMatch || item.classList.contains('correct') || item === selectedItem) return;

    // Play click sound
    clickSound.play();

    // If no card is selected, select the current card
    if (!selectedItem) {
        selectedItem = item;
        item.classList.add('selected');  // This will trigger the "selected" animation
    } else {
        isCheckingMatch = true;  // Disable interaction during match check
        const selectedMatch = selectedItem.getAttribute('data-match');
        const currentMatch = item.getAttribute('data-match');

        // Check if the selected items match
        if (selectedMatch === currentMatch) {
            // Match found
            selectedItem.classList.add('correct');
            item.classList.add('correct');

            // Play the correct sound and delay further action
            correctSound.play();
            
            // Delay continuation until part of the audio has played (1 second delay)
            setTimeout(() => {
                matchedCount += 2;  // Increment matched items count

                // Reset selection
                selectedItem = null;
                isCheckingMatch = false;

                // Check for game completion
                checkGameCompletion();
            }, 1000);  // 1 second delay before allowing next action
        } else {
            // No match
            selectedItem.classList.add('wrong');
            item.classList.add('wrong');
            wrongSound.play();

            setTimeout(() => {
                // Reset wrong selections
                selectedItem.classList.remove('wrong', 'selected');
                item.classList.remove('wrong', 'selected');
                selectedItem = null;
                isCheckingMatch = false;  // Re-enable interactions
            }, 800);  // Delay for the wrong match animation
        }
    }
}


// Attach event listeners
function attachItemClickListeners() {
    const items = document.querySelectorAll('.game-container .item');
    items.forEach(item => {
        item.removeEventListener('click', handleItemClick);  // Clear previous listeners
        item.addEventListener('click', () => handleItemClick(item));  // Attach event listener
    });
}

// Shuffle and randomize items
function randomizeCards() {
    const gameContainer = document.querySelector('.game-container');
    const columns = gameContainer.querySelectorAll('.column');
    let itemsArray = [];

    // Collect all items in an array
    columns.forEach(column => {
        itemsArray = itemsArray.concat(Array.from(column.querySelectorAll('.item')));
    });

    // Shuffle items
    itemsArray = shuffleArray(itemsArray);

    // Re-distribute items back into columns
    columns.forEach(column => column.innerHTML = '');
    itemsArray.forEach((item, index) => {
        columns[index % columns.length].appendChild(item);
    });

    // Re-attach click listeners after shuffling
    attachItemClickListeners();
}

// Check if the game is won
function checkGameCompletion() {
    const totalItems = document.querySelectorAll('.game-container .item').length;
    if (matchedCount === totalItems) {
        const congratsMessage = document.getElementById('congrats-message');
        congratsMessage.style.display = 'block';
        winSound.play();
        gameWon = true;

        // Disable further interactions
        disableGameButtons();
    }
}

// Disable all item interactions (used on win)
function disableGameButtons() {
    const items = document.querySelectorAll('.game-container .item');
    items.forEach(item => {
        item.style.pointerEvents = 'none';  // Prevent further clicks
    });
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

// Initialize the game on page load
window.addEventListener('load', randomizeCards);

// Redirect to home
function goHome() {
    window.location.href = 'index.html';  // Replace with the actual home page
}
