document.addEventListener("DOMContentLoaded", function () {
    const fruits = document.querySelectorAll(".fruit");

    // Function to generate random positions
    function randomPosition() {
        const randomX = (Math.random() * 200 - 100) + 'vw'; // From -100vw to 100vw
        const randomY = (Math.random() * 200 - 100) + 'vh'; // From -100vh to 100vh
        return { x: randomX, y: randomY };
    }

    fruits.forEach(fruit => {
        // Initial random starting position
        let startPos = randomPosition();
        let nextPos = randomPosition();

        // Set custom properties for the initial position
        fruit.style.setProperty('--random-x', startPos.x);
        fruit.style.setProperty('--random-y', startPos.y);
        fruit.style.setProperty('--next-random-x', nextPos.x);
        fruit.style.setProperty('--next-random-y', nextPos.y);

        // Update position after each animation cycle
        fruit.addEventListener('animationiteration', () => {
            startPos = nextPos;
            nextPos = randomPosition();

            fruit.style.setProperty('--random-x', startPos.x);
            fruit.style.setProperty('--random-y', startPos.y);
            fruit.style.setProperty('--next-random-x', nextPos.x);
            fruit.style.setProperty('--next-random-y', nextPos.y);
        });
    });
});