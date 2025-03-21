class CardGenerator {
    constructor() {
        this.thankYouMessages = [
            "Thank you so much for your wonderful birthday wish! 🎉",
            "Your kind words made my day even more special! 💝",
            "I'm touched by your thoughtful birthday message! 🎈",
            "Thanks for being part of my birthday celebration! 🎊",
            "Your wish means the world to me! 🌟"
        ];

        this.cardDesigns = [
            { background: 'linear-gradient(45deg, #FFB6C1, #FFD700)', border: '2px solid gold' },
            { background: 'linear-gradient(135deg, #87CEEB, #98FB98)', border: '2px solid silver' },
            { background: 'linear-gradient(225deg, #DDA0DD, #87CEEB)', border: '2px solid #FFB6C1' },
            { background: 'linear-gradient(315deg, #98FB98, #FFD700)', border: '2px solid #87CEEB' }
        ];

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('create-card').addEventListener('click', () => this.handleCardCreation());
    }

    handleCardCreation() {
        const senderName = document.getElementById('sender-name').value;
        const message = document.getElementById('wish-message').value;

        if (!senderName || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Create wish card
        this.createWishCard(senderName, message);
        
        // Generate thank you card
        setTimeout(() => this.createThankYouCard(senderName), 1000);
    }

    createWishCard(senderName, message) {
        const card = document.createElement('div');
        card.className = 'card wish-card';
        card.innerHTML = `
            <div class="card-message">${message}</div>
            <div class="card-sender">- ${senderName}</div>
        `;
        this.applyRandomDesign(card);
        this.addCardToContainer(card);
    }

    createThankYouCard(senderName) {
        const thankYouMessage = this.thankYouMessages[Math.floor(Math.random() * this.thankYouMessages.length)];
        const card = document.createElement('div');
        card.className = 'card thank-you-card';
        card.innerHTML = `
            <div class="card-header">Thank You Card</div>
            <div class="card-message">${thankYouMessage}</div>
            <div class="card-recipient">Dear ${senderName}</div>
            <div class="card-sender">- Win Paing Soe</div>
        `;
        this.applyRandomDesign(card);
        this.addCardToContainer(card, true);
    }

    applyRandomDesign(card) {
        const design = this.cardDesigns[Math.floor(Math.random() * this.cardDesigns.length)];
        card.style.background = design.background;
        card.style.border = design.border;
    }

    addCardToContainer(card, isThankYou = false) {
        const container = document.querySelector('.card-container');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        if (isThankYou) {
            container.appendChild(card);
        } else {
            container.insertBefore(card, container.firstChild);
        }

        // Trigger animation
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Initialize card generator
const cardGenerator = new CardGenerator();


class ThankYouCardGenerator {
    constructor() {
        this.messages = [
            "Your birthday wish means the world to me! Thank you for being part of my special day! 🎉",
            "I'm truly touched by your wonderful message. Thanks for making my birthday extra special! 💝",
            "Your kind words brought a huge smile to my face. Thank you so much! 🌟",
            "I feel blessed to receive such a heartwarming birthday wish. Thank you! 🎈",
            "Your message made my 30th birthday celebration even more memorable! 🎊"
        ];

        this.designs = [
            { background: "linear-gradient(45deg, #FFB6C1, #FFD700)", textColor: "#000" },
            { background: "linear-gradient(135deg, #87CEEB, #98FB98)", textColor: "#000" },
            { background: "linear-gradient(225deg, #DDA0DD, #87CEEB)", textColor: "#000" },
            { background: "linear-gradient(315deg, #98FB98, #FFD700)", textColor: "#000" }
        ];
    }

    generateCard(recipientName) {
        const message = this.messages[Math.floor(Math.random() * this.messages.length)];
        const design = this.designs[Math.floor(Math.random() * this.designs.length)];
        
        const cardHTML = `
            <div class="thank-you-card" style="background: ${design.background}; color: ${design.textColor}">
                <div class="profile-logo"></div>
                <div class="card-header">Thank You!</div>
                <div class="card-message">${message}</div>
                <div class="card-recipient">Dear ${recipientName}</div>
                <div class="card-sender">
                    <img src="images/profile.jpg" class="sender-logo" alt="Win Paing Soe">
                    <span>Win Paing Soe</span>
                </div>
                <button class="download-card" onclick="thankYouCard.downloadCard(this.parentElement)">
                    Download Card
                </button>
            </div>
        `;
        
        return cardHTML;
    }

    async downloadCard(cardElement) {
        try {
            const canvas = await html2canvas(cardElement, {
                backgroundColor: null,
                scale: 2,
                logging: false,
                removeContainer: true
            });

            const link = document.createElement('a');
            link.download = `thank_you_card_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Error generating card:', error);
        }
    }
}

// Initialize the thank you card generator
const thankYouCard = new ThankYouCardGenerator();