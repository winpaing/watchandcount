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
        this.addProgressBars();
        this.addAnimatedBackground();
        this.addSoundEffects();
        this.addGlowEffect();
        this.addPulseAnimation();
        this.addInteractiveHover();
    }

    addProgressBars() {
        const containers = document.querySelectorAll('.countdown-item');
        containers.forEach(container => {
            const progressRing = document.createElement('svg');
            progressRing.className = 'progress-ring';
            progressRing.innerHTML = `
                <circle class="progress-ring-circle"
                    stroke="#FFD700"
                    stroke-width="4"
                    fill="transparent"
                    r="48"
                    cx="50"
                    cy="50"/>
            `;
            container.appendChild(progressRing);
        });
    }

    addAnimatedBackground() {
        const background = document.createElement('div');
        background.className = 'animated-background';
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            background.appendChild(particle);
        }
        document.querySelector('.countdown-container').prepend(background);
    }

    addSoundEffects() {
        const tickSound = new Audio('/assets/sounds/tick.mp3');
        tickSound.volume = 0.1;
        
        // Play tick sound every second
        setInterval(() => {
            if (this.targetDate - new Date().getTime() > 0) {
                tickSound.currentTime = 0;
                tickSound.play();
            }
        }, 1000);
    }

    addGlowEffect() {
        const numbers = document.querySelectorAll('.countdown-number');
        numbers.forEach(number => {
            number.innerHTML = `
                <div class="glow-wrapper">
                    <span class="glow-number">${number.textContent}</span>
                    <div class="glow-effect"></div>
                </div>
            `;
        });
    }

    addPulseAnimation() {
        const labels = document.querySelectorAll('.countdown-label');
        labels.forEach(label => {
            label.classList.add('pulse-text');
        });
    }

    addInteractiveHover() {
        const items = document.querySelectorAll('.countdown-item');
        items.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.classList.add('hover-effect');
            });
            item.addEventListener('mouseout', () => {
                item.classList.remove('hover-effect');
            });
        });
    }
}

    updateCountdown() {
        updateTimer() {
            const now = new Date().getTime();
            const distance = this.targetDate - now;
        
            // Stop counting when time is up
            if (distance <= 0) {
                clearInterval(this.timer);
                this.displayTimeElements(0, 0, 0, 0);
                this.handleCompletion();
                return;
            }
        
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            this.displayTimeElements(days, hours, minutes, seconds);
        }
        
        displayTimeElements(days, hours, minutes, seconds) {
            document.querySelector('.days').textContent = Math.max(0, days);
            document.querySelector('.hours').textContent = Math.max(0, hours);
            document.querySelector('.minutes').textContent = Math.max(0, minutes);
            document.querySelector('.seconds').textContent = Math.max(0, seconds);
        }
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

    handleCompletion() {
        // Play celebration music
        const audio = new Audio('/assets/music/birthday.mp3');
        audio.play();
    
        // Create celebration container
        const celebrationContainer = document.createElement('div');
        celebrationContainer.className = 'celebration-container';
        celebrationContainer.innerHTML = `
            <div class="celebration-content">
                <div class="birthday-cake">🎂</div>
                <h1 class="celebration-title">Happy Birthday!</h1>
                <p class="celebration-subtitle">Celebrating 30 Amazing Years!</p>
                <div class="celebration-effects">
                    <div class="fireworks"></div>
                    <div class="balloons"></div>
                    <div class="stars"></div>
                </div>
            </div>
        `;
        document.body.appendChild(celebrationContainer);
    
        // Add multiple celebration effects
        this.createConfetti();
        this.createFireworks();
        this.createBalloons();
        this.createStars();
    }

    createFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * 100 + 'vw';
                document.querySelector('.fireworks').appendChild(firework);
                
                setTimeout(() => firework.remove(), 2000);
            }, i * 1000);
        }
    }

    createBalloons() {
        const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];
        for (let i = 0; i < 10; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.animationDelay = Math.random() * 3 + 's';
            document.querySelector('.balloons').appendChild(balloon);
        }
    }

    createStars() {
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDelay = Math.random() * 2 + 's';
            document.querySelector('.stars').appendChild(star);
        }
    }

    createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// Initialize countdown
const countdown = new CountdownTimer();