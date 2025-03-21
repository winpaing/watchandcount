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