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
        this.wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
        this.selectedTheme = 'theme1';
        this.initializeElements();
        this.setupEventListeners();
        this.renderWishes();
    }

    initializeElements() {
        this.form = document.querySelector('.card-form');
        this.cardsContainer = document.querySelector('.cards-container');
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }

    setupEventListeners() {
        document.getElementById('create-card').addEventListener('click', () => this.handleWishSubmit());
        
        this.themeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectedTheme = e.target.closest('.theme-btn').dataset.theme;
                this.updateThemeSelection();
            });
        });

        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterWishes(e.target.dataset.filter);
                this.updateFilterSelection(e.target);
            });
        });
    }

    handleWishSubmit() {
        const name = document.getElementById('sender-name').value.trim();
        const message = document.getElementById('wish-message').value.trim();

        if (!this.validateInput(name, message)) return;

        const wish = {
            id: Date.now(),
            name,
            message,
            theme: this.selectedTheme,
            timestamp: new Date().toISOString(),
            likes: 0
        };

        this.addWish(wish);
        this.resetForm();
        this.showSuccessMessage();
    }

    validateInput(name, message) {
        if (!name || !message) {
            this.showError('Please fill in all fields');
            return false;
        }
        if (message.length > 200) {
            this.showError('Message is too long (max 200 characters)');
            return false;
        }
        return true;
    }

    addWish(wish) {
        this.wishes.unshift(wish);
        localStorage.setItem('wishes', JSON.stringify(this.wishes));
        this.renderWish(wish, true);
    }

    renderWish(wish, isNew = false) {
        const card = document.createElement('div');
        card.className = `wish-card ${wish.theme} ${isNew ? 'new-wish' : ''}`;
        card.innerHTML = `
            <div class="wish-header">
                <h4>${this.escapeHtml(wish.name)}</h4>
                <span class="wish-time">${this.formatTime(wish.timestamp)}</span>
            </div>
            <p class="wish-message">${this.escapeHtml(wish.message)}</p>
            <div class="wish-footer">
                <button class="like-btn" data-id="${wish.id}">
                    <i class="fas fa-heart"></i>
                    <span>${wish.likes}</span>
                </button>
            </div>
        `;

        if (isNew) {
            this.cardsContainer.prepend(card);
        } else {
            this.cardsContainer.appendChild(card);
        }

        this.setupCardInteractions(card, wish.id);
    }

    setupCardInteractions(card, wishId) {
        const likeBtn = card.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => this.handleLike(wishId, likeBtn));

        card.addEventListener('mouseenter', () => this.addSparkleEffect(card));
    }

    handleLike(wishId, button) {
        const wish = this.wishes.find(w => w.id === wishId);
        if (wish) {
            wish.likes++;
            button.querySelector('span').textContent = wish.likes;
            localStorage.setItem('wishes', JSON.stringify(this.wishes));
            button.classList.add('liked');
        }
    }

    addSparkleEffect(card) {
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'card-sparkle';
            card.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    filterWishes(filter) {
        let filteredWishes = [...this.wishes];
        switch(filter) {
            case 'recent':
                filteredWishes = filteredWishes.slice(0, 5);
                break;
            case 'popular':
                filteredWishes.sort((a, b) => b.likes - a.likes);
                break;
        }
        this.cardsContainer.innerHTML = '';
        filteredWishes.forEach(wish => this.renderWish(wish));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(timestamp) {
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
            .format(-Math.round((Date.now() - new Date(timestamp)) / 60000), 'minutes');
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        this.form.prepend(error);
        setTimeout(() => error.remove(), 3000);
    }

    showSuccessMessage() {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = 'Your wish has been sent! ✨';
        this.form.prepend(success);
        setTimeout(() => success.remove(), 3000);
    }

    resetForm() {
        document.getElementById('sender-name').value = '';
        document.getElementById('wish-message').value = '';
    }
}

// Initialize wish manager
const wishManager = new WishManager();