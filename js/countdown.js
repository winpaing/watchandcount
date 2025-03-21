class CountdownTimer {
    constructor() {
        this.targetDate = new Date('2025-03-22T00:00:00').getTime();
        this.countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.initializeCountdown();
    }

    initializeCountdown() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
        this.addHoverEffects();
        this.addParticleEffects();
    }

    updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;

        if (timeLeft < 0) {
            this.showBirthdayMessage();
            return;
        }

        const time = {
            days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        };

        Object.entries(time).forEach(([unit, value]) => {
            const element = this.countdownElements[unit];
            const newValue = String(value).padStart(2, '0');
            
            if (element.textContent !== newValue) {
                this.animateNumber(element, newValue);
            }
        });
    }

    animateNumber(element, newValue) {
        element.className = 'countdown-number';
        element.textContent = newValue;
        element.classList.add('animate');
        
        setTimeout(() => {
            element.classList.remove('animate');
        }, 500);
    }

    addHoverEffects() {
        const items = document.querySelectorAll('.countdown-item');
        items.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.classList.add('hover');
                this.createSparkles(item);
            });
            
            item.addEventListener('mouseout', () => {
                item.classList.remove('hover');
            });
        });
    }

    createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'countdown-sparkle';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    addParticleEffects() {
        const container = document.querySelector('.countdown-container');
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'countdown-particle';
            particle.style.left = `${Math.random() * 100}%`;
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }, 200);
    }

    showBirthdayMessage() {
        const container = document.querySelector('.countdown-container');
        container.innerHTML = `
            <div class="birthday-message">
                <h2>🎉 Happy Birthday! 🎉</h2>
                <p>The big day is here!</p>
            </div>
        `;
    }
}

// Initialize countdown
const countdown = new CountdownTimer();