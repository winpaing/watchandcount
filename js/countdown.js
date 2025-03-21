class CountdownTimer {
    constructor() {
        this.targetDate = new Date('2025-03-22T00:00:00').getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.previousValues = {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
        
        this.initializeEffects();
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    initializeEffects() {
        Object.values(this.elements).forEach(element => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'countdown-particles';
            element.parentElement.appendChild(particlesContainer);
        });
    }

    updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;

        const times = {
            days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        };

        Object.entries(times).forEach(([unit, value]) => {
            const formattedValue = value.toString().padStart(2, '0');
            if (this.previousValues[unit] !== formattedValue) {
                this.animateNumberChange(unit, formattedValue);
                this.createParticles(unit);
            }
            this.previousValues[unit] = formattedValue;
        });
    }

    animateNumberChange(unit, value) {
        const element = this.elements[unit];
        const parent = element.parentElement;
        parent.classList.add('flip');
        element.textContent = value;
        
        setTimeout(() => {
            parent.classList.remove('flip');
        }, 600);
    }

    createParticles(unit) {
        const container = this.elements[unit].parentElement.querySelector('.countdown-particles');
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #FFD700;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFade 1s ease-out forwards;
            `;
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }
}

// Initialize countdown
const countdown = new CountdownTimer();