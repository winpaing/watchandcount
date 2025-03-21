class LetterGenerator {
    constructor() {
        this.letterTemplates = [
            {
                body: "Your presence in my 30th birthday celebration means the world to me! Thank you for being part of this special milestone. Your kindness and friendship make this celebration truly memorable.",
                closing: "With heartfelt gratitude,"
            },
            {
                body: "I am deeply touched by your participation in my 30th birthday celebration. Your presence adds so much joy to this special occasion. Thank you for being here to share this moment.",
                closing: "Sincerely yours,"
            },
            {
                body: "What a blessing it is to have you join my 30th birthday celebration! Your presence makes this milestone even more meaningful. Thank you for being part of this wonderful day.",
                closing: "With appreciation,"
            },
            {
                body: "As I celebrate my 30th birthday, I'm reminded of how fortunate I am to have wonderful people like you in my life. Your presence makes this celebration extra special.",
                closing: "Warmest regards,"
            },
            {
                body: "Thank you for making my 30th birthday celebration unforgettable! Your presence brings joy and makes this milestone moment even more meaningful. I'm truly grateful for your participation.",
                closing: "With sincere thanks,"
            },
            {
                body: "Having you at my 30th birthday celebration fills my heart with joy! Your presence makes this day truly special, and I'm thankful for your friendship and support.",
                closing: "Best wishes,"
            },
            {
                body: "As I step into my 30th year, I'm grateful to have you celebrating with me. Your presence adds warmth and happiness to this memorable occasion.",
                closing: "Gratefully yours,"
            },
            {
                body: "Your participation in my 30th birthday celebration means so much to me. Thank you for being part of this significant milestone and making it extra special.",
                closing: "With warm regards,"
            },
            {
                body: "I feel blessed to have you join my 30th birthday celebration. Your presence makes this day more meaningful and fills it with wonderful memories.",
                closing: "Many thanks,"
            },
            {
                body: "Thank you for being part of my journey as I celebrate my 30th birthday. Your presence adds joy and makes this milestone truly unforgettable.",
                closing: "Yours truly,"
            },
            {
                body: "Your presence at my 30th birthday celebration brings immense happiness to my heart. Thank you for sharing this special moment and making it extraordinary.",
                closing: "With deepest appreciation,"
            },
            {
                body: "Words cannot express how grateful I am to have you at my 30th birthday celebration. Your presence makes this milestone celebration truly complete.",
                closing: "Forever grateful,"
            },
            {
                body: "As I mark this special milestone of turning 30, I'm deeply thankful for your presence and participation in making this day memorable.",
                closing: "With sincere gratitude,"
            },
            {
                body: "Your presence at my 30th birthday celebration adds a special sparkle to this milestone moment. Thank you for being part of this joyous occasion.",
                closing: "Warmly yours,"
            },
            {
                body: "I'm truly blessed to have you celebrate this special milestone with me. Your presence at my 30th birthday makes this day even more meaningful and cherished.",
                closing: "With heartfelt thanks,"
            }
        ];
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.generateButton = document.getElementById('generate-letter');
        this.nameInput = document.getElementById('sender-name');
        this.letterDisplay = document.querySelector('.letter-display');
    }

    setupEventListeners() {
        if (this.generateButton) {
            this.generateButton.addEventListener('click', () => {
                this.handleGenerateLetter();
            });
        }
    }

    handleGenerateLetter() {
        const name = this.nameInput.value.trim();

        if (!name) {
            this.showNotification('Please enter your name', 'error');
            return;
        }

        const template = this.getRandomTemplate();
        this.createLetterDisplay(name, template);
        this.showNotification('Letter generated successfully!', 'success');
    }

    getRandomTemplate() {
        const randomIndex = Math.floor(Math.random() * this.letterTemplates.length);
        return this.letterTemplates[randomIndex];
    }

    createLetterDisplay(name, template) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const letterHTML = `
            <div class="letter-content">
                <div class="letter-stamp">
                    <span>30th</span>
                </div>
                <div class="letter-header">
                    ${currentDate}
                </div>
                <div class="letter-body">
                    <p>Dear ${this.escapeHtml(name)},</p>
                    <p>${template.body}</p>
                    <p>${template.closing}</p>
                    <p class="letter-signature">Win Paing</p>
                </div>
                <button class="download-btn" onclick="letterGenerator.downloadLetter('${this.escapeHtml(name)}')">
                    <i class="fas fa-download"></i> Download Letter
                </button>
            </div>
        `;

        this.letterDisplay.innerHTML = letterHTML;
        this.letterDisplay.style.display = 'block';
        this.letterDisplay.scrollIntoView({ behavior: 'smooth' });
    }

    // Update the downloadLetter method
    downloadLetter(name) {
        const letterContent = document.querySelector('.letter-content');
        const downloadBtn = letterContent.querySelector('.download-btn');
        downloadBtn.style.display = 'none';

        html2canvas(letterContent, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            useCORS: true,
            quality: 1.0
        }).then(canvas => {
            // Show download button again
            downloadBtn.style.display = 'block';

            // Convert to high quality JPEG
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

            // Create download link
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `thank_you_letter_${name.toLowerCase().replace(/\s+/g, '_')}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }).catch(error => {
            console.error('Error generating image:', error);
            this.showNotification('Error generating image. Please try again.', 'error');
            downloadBtn.style.display = 'block';
        });
    }

    // Update the createLetterDisplay method's button section
    createLetterDisplay(name, template) {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const letterHTML = `
            <div class="letter-content">
                <div class="letter-stamp">
                    <span>30th</span>
                </div>
                <div class="letter-header">
                    ${currentDate}
                </div>
                <div class="letter-body">
                    <p>Dear ${this.escapeHtml(name)},</p>
                    <p>${template.body}</p>
                    <p>${template.closing}</p>
                    <p class="letter-signature">Win Paing</p>
                </div>
                <button class="download-btn" onclick="letterGenerator.downloadLetter('${this.escapeHtml(name)}')">
                    <i class="fas fa-download"></i> Download Letter
                </button>
            </div>
        `;

        this.letterDisplay.innerHTML = letterHTML;
        this.letterDisplay.style.display = 'block';
        this.letterDisplay.scrollIntoView({ behavior: 'smooth' });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the letter generator
let letterGenerator;
document.addEventListener('DOMContentLoaded', () => {
    letterGenerator = new LetterGenerator();
});