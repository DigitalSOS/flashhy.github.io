// Home button click animation
document.getElementById('home-button').addEventListener('click', function() {
    const homeIcon = this.querySelector('img');
    homeIcon.classList.add('clicked');
    setTimeout(() => {
        homeIcon.classList.remove('clicked');
        window.location.href = 'index.html'; // Redirect to home after animation
    }, 300);
});


