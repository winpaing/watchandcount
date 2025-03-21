// Balloon Animation
function createBalloon() {
    const colors = ['#FF69B4', '#FFD700', '#FF6B6B', '#4ECDC4', '#87CEEB'];
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.setProperty('--x-move', `${Math.random() * 100 - 50}px`);
    
    document.querySelector('.balloons').appendChild(balloon);
    
    setTimeout(() => {
        balloon.remove();
    }, 15000);
}

setInterval(createBalloon, 2000);

// Fireworks Animation
function createFirework(x, y) {
    const colors = ['#FF0000', '#FFD700', '#FF69B4', '#00FF00', '#4169E1'];
    const particles = 30;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i * 360) / particles;
        const velocity = 1 + Math.random() * 3;
        
        particle.style.animation = `explode 1s forwards`;
        particle.style.transform = `rotate(${angle}deg) translateY(${velocity}px)`;
        
        document.querySelector('.fireworks').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Create random fireworks
function randomFireworks() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    createFirework(x, y);
}

setInterval(randomFireworks, 3000);


class PartyAnimations {
    constructor() {
        this.animationContainer = document.querySelector('.animation-container');
        this.initializeEffects();
    }

    initializeEffects() {
        this.createSparkles();
        this.createConfetti();
        this.enhancedBalloons();
        this.addScrollEffects();
    }

    createSparkles() {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            this.animationContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }, 200);
    }

    createConfetti() {
        const colors = ['#FF69B4', '#FFD700', '#FF6B6B', '#4ECDC4', '#87CEEB'];
        
        setInterval(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            this.animationContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, 300);
    }

    enhancedBalloons() {
        setInterval(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
            balloon.style.animationDelay = `${Math.random() * 2}s`;
            
            this.animationContainer.appendChild(balloon);
            setTimeout(() => balloon.remove(), 15000);
        }, 2000);
    }

    addScrollEffects() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.8s ease-out';
            observer.observe(section);
        });
    }
}

// Initialize animations
const partyAnimations = new PartyAnimations();

// Add mouse trail effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'sparkle';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1000);
});