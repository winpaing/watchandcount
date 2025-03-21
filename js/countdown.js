const birthdayDate = new Date('2025-03-22T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = birthdayDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (timeLeft < 0) {
        clearInterval(countdownTimer);
        document.querySelector('.countdown-container').innerHTML = '<h2>Happy Birthday! 🎉</h2>';
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();