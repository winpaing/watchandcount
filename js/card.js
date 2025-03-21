document.getElementById('create-card').addEventListener('click', createCard);

function createCard() {
    const senderName = document.getElementById('sender-name').value;
    const message = document.getElementById('wish-message').value;
    const theme = document.getElementById('card-theme').value;

    if (!senderName || !message) {
        alert('Please fill in all fields');
        return;
    }

    const card = document.createElement('div');
    card.className = `card ${theme}`;
    card.innerHTML = `
        <div class="card-message">${message}</div>
        <div class="card-sender">- ${senderName}</div>
    `;

    const cardContainer = document.querySelector('.card-container');
    cardContainer.insertBefore(card, cardContainer.firstChild);

    // Reset form
    document.getElementById('sender-name').value = '';
    document.getElementById('wish-message').value = '';

    // Add animation
    card.style.animation = 'cardAppear 0.5s ease-out';
}

// Add this CSS to your animations.css
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes cardAppear {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
`);