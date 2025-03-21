class BirthdayWishes {
    constructor() {
        this.initializeWishes();
        this.setupEventListeners();
    }

    initializeWishes() {
        this.form = document.querySelector('.card-form');
        this.cardsContainer = document.querySelector('.cards-container');
        this.wishes = [];
    }

    setupEventListeners() {
        document.getElementById('create-card').addEventListener('click', (e) => {
            e.preventDefault();
            this.createWishCard();
        });
    }

    createWishCard() {
        const name = document.getElementById('sender-name').value;
        const message = document.getElementById('wish-message').value;
        const theme = document.getElementById('card-theme').value;

        if (!name || !message) {
            this.showError('Please fill in all fields');
            return;
        }

        const card = document.createElement('div');
        card.className = `wish-card ${theme}`;
        card.innerHTML = `
            <h3>${name}</h3>
            <p>${message}</p>
            <div class="card-decorations"></div>
        `;

        this.cardsContainer.prepend(card);
        this.addCardDecorations(card);
        this.resetForm();
        this.saveWish({ name, message, theme });
    }

    addCardDecorations(card) {
        const decorations = card.querySelector('.card-decorations');
        for (let i = 0; i < 5; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'card-decoration';
            decoration.style.setProperty('--delay', `${i * 0.2}s`);
            decorations.appendChild(decoration);
        }
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        this.form.prepend(error);
        setTimeout(() => error.remove(), 3000);
    }

    resetForm() {
        document.getElementById('sender-name').value = '';
        document.getElementById('wish-message').value = '';
    }

    saveWish(wish) {
        this.wishes.push(wish);
        localStorage.setItem('birthdayWishes', JSON.stringify(this.wishes));
    }
}

class WishManager {
    constructor() {
        this.wishes = [];
        this.selectedTheme = 'theme1';
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.senderName = document.getElementById('sender-name');
        this.wishMessage = document.getElementById('wish-message');
        this.sendButton = document.getElementById('create-card');
        this.cardsContainer = document.querySelector('.cards-container');
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => {
            this.handleWishSubmit();
        });
    }

    handleWishSubmit() {
        const name = this.senderName.value.trim();
        const message = this.wishMessage.value.trim();

        if (!name || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const wish = {
            id: Date.now(),
            name: name,
            message: message,
            timestamp: new Date().toISOString()
        };

        this.addWishToDisplay(wish);
        this.showThankYouCard(name);
        this.resetForm();
    }

    addWishToDisplay(wish) {
        const wishCard = document.createElement('div');
        wishCard.className = 'wish-card';
        wishCard.innerHTML = `
            <div class="wish-content">
                <h4>${this.escapeHtml(wish.name)}</h4>
                <p>${this.escapeHtml(wish.message)}</p>
                <span class="wish-time">${this.formatTime(wish.timestamp)}</span>
            </div>
        `;

        this.cardsContainer.insertBefore(wishCard, this.cardsContainer.firstChild);
        wishCard.classList.add('card-appear');
    }

    showThankYouCard(name) {
        const messages = [
            "Thank you for your wonderful birthday wish!",
            "I appreciate your kind birthday message!",
            "Thanks for making my birthday special!",
            "Your birthday wish means a lot to me!",
            "Thank you for being part of my celebration!"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const thankYouCard = document.createElement('div');
        thankYouCard.className = 'thank-you-modal';
        thankYouCard.innerHTML = `
            <div class="thank-you-card">
                <div class="card-content">
                    <i class="fas fa-gift gift-icon"></i>
                    <h3>Dear ${this.escapeHtml(name)}</h3>
                    <p>${randomMessage}</p>
                    <p class="signature">Win Paing</p>
                    <button class="close-card">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(thankYouCard);
        setTimeout(() => thankYouCard.classList.add('show'), 100);

        thankYouCard.querySelector('.close-card').addEventListener('click', () => {
            thankYouCard.classList.remove('show');
            setTimeout(() => thankYouCard.remove(), 300);
        });
    }

    resetForm() {
        this.senderName.value = '';
        this.wishMessage.value = '';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

class LetterGenerator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.templates = [
            "Dear {name},\n\nThank you for being part of my 30th birthday celebration! Your presence and wishes make this day truly special. I'm grateful for your kindness and friendship.\n\nWith appreciation,\nWin Paing",
            "Dear {name},\n\nI wanted to express my heartfelt gratitude for celebrating my 30th birthday with me. Your participation means the world to me, and I'm touched by your thoughtfulness.\n\nBest regards,\nWin Paing",
            "Dear {name},\n\nWhat a joy it is to have you join my 30th birthday celebration! Thank you for making this milestone even more memorable with your presence.\n\nWarmly,\nWin Paing"
        ];
    }

    initializeElements() {
        this.generateBtn = document.getElementById('generate-letter');
        this.nameInput = document.getElementById('sender-name');
        this.letterDisplay = document.querySelector('.letter-display');
    }

    setupEventListeners() {
        this.generateBtn.addEventListener('click', () => this.generateLetter());
    }

    generateLetter() {
        const name = this.nameInput.value.trim();
        if (!name) {
            this.showError('Please enter your name');
            return;
        }

        const template = this.templates[Math.floor(Math.random() * this.templates.length)];
        const letter = template.replace('{name}', this.escapeHtml(name));
        
        this.displayLetter(letter);
        this.nameInput.value = '';
    }

    displayLetter(content) {
        this.letterDisplay.innerHTML = `
            <div class="letter-content">
                <div class="letter-stamp">
                    <span>30th</span>
                </div>
                <div class="letter-header">
                    ${new Date().toLocaleDateString()}
                </div>
                <div class="letter-body">
                    ${content.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
        this.letterDisplay.style.display = 'block';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        this.nameInput.parentElement.prepend(error);
        setTimeout(() => error.remove(), 3000);
    }
}

// Initialize letter generator
const letterGenerator = new LetterGenerator();

// Add this function to create sparkle effects
function addSparkles() {
    const wishBox = document.querySelector('.wish-box');
    const decoration = document.createElement('div');
    decoration.className = 'wish-decoration';
    wishBox.appendChild(decoration);

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        decoration.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    }, 300);
}

// Initialize sparkles when document is loaded
document.addEventListener('DOMContentLoaded', addSparkles);