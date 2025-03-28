class BackgroundAnimations {
    constructor() {
        this.animationContainer = document.querySelector('.animation-container');
        this.init();
    }

    // Add these methods to the BackgroundAnimations class
    createSparkles() {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
            this.animationContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 4000);
        }, 200);
    }

    createGifts() {
        setInterval(() => {
            const gift = document.createElement('div');
            gift.className = 'gift';
            gift.innerHTML = '🎁';
            gift.style.left = `${Math.random() * 100}%`;
            gift.style.top = `${Math.random() * 100}%`;
            this.animationContainer.appendChild(gift);
            
            setTimeout(() => gift.remove(), 3000);
        }, 4000);
    }

    createConfetti() {
        class ConfettiAnimation {
            constructor() {
                this.confetti = [];
                this.container = document.querySelector('.confetti-container');
                this.colors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#98FB98'];
                this.createConfetti();
                this.animate();
            }

            createConfetti() {
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    confetti.style.opacity = Math.random();
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                    
                    this.container.appendChild(confetti);
                    this.confetti.push({
                        element: confetti,
                        x: Math.random() * 100,
                        y: -20,
                        speed: Math.random() * 3 + 2,
                        rotation: Math.random() * 360,
                        rotationSpeed: Math.random() * 10 - 5
                    });
                }
            }

            animate() {
                this.confetti.forEach(conf => {
                    conf.y += conf.speed;
                    conf.rotation += conf.rotationSpeed;
                    
                    if (conf.y > 120) {
                        conf.y = -20;
                        conf.x = Math.random() * 100;
                    }
                    
                    conf.element.style.transform = `translate(${conf.x}%, ${conf.y}%) rotate(${conf.rotation}deg)`;
                });
                
                requestAnimationFrame(() => this.animate());
            }
        }
        
        // Initialize animations when document is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ConfettiAnimation();
        });
    }

    // Add to init() method
    init() {
        this.createBalloons();
        this.createStars();
        this.createFireworks();
        this.createDiamonds();
        this.createCakes();
        this.createCandles();
        this.createSparkles();
        this.createGifts();
        this.createConfetti();
    }

    createBalloons() {
        setInterval(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
            this.animationContainer.querySelector('.balloons').appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 10000);
        }, 2000);
    }

    createFireworks() {
        setInterval(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 50}%`;
            this.animationContainer.querySelector('.fireworks').appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, 3000);
    }

    createStars() {
        for(let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            this.animationContainer.querySelector('.stars').appendChild(star);
        }
    }

    createDiamonds() {
        setInterval(() => {
            const diamond = document.createElement('div');
            diamond.className = 'diamond';
            diamond.style.left = `${Math.random() * 100}%`;
            this.animationContainer.querySelector('.diamonds').appendChild(diamond);
            
            setTimeout(() => diamond.remove(), 8000);
        }, 4000);
    }

    createCakes() {
        setInterval(() => {
            const cake = document.createElement('div');
            cake.className = 'cake';
            cake.style.left = `${Math.random() * 100}%`;
            cake.innerHTML = '🎂';
            cake.style.fontSize = `${Math.random() * 20 + 20}px`;
            this.animationContainer.querySelector('.cakes').appendChild(cake);
            
            setTimeout(() => cake.remove(), 6000);
        }, 5000);
    }

    createCandles() {
        setInterval(() => {
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.style.left = `${Math.random() * 100}%`;
            candle.innerHTML = '🕯️';
            this.animationContainer.querySelector('.candles').appendChild(candle);
            
            setTimeout(() => candle.remove(), 7000);
        }, 3500);
    }
}

// Initialize animations
const backgroundAnimations = new BackgroundAnimations();