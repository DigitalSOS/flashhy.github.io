window.onload = function() {
    const fruits = document.querySelectorAll('.fruit');
    fruits.forEach(fruit => {
        fruit.style.animationDelay = `${Math.random() * 2}s`;
    });

    // Create fireworks
    createFireworks();
};

function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    
    setInterval(() => {
        let firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.bottom = `${Math.random() * 50}%`;
        
        fireworksContainer.appendChild(firework);

        // Remove the firework after animation ends
        setTimeout(() => {
            firework.remove();
        }, 2000);
    }, 500);
}
