class SpecialFeatures {
    constructor() {
        this.initializeFeatures();
    }

    initializeFeatures() {
        this.addBirthdayWish3DEffect();
        this.createFloatingMemories();
        this.addParallaxEffect();
        this.initializePhotoRain();
    }

    addBirthdayWish3DEffect() {
        const wishes = document.querySelector('#wishes');
        wishes.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = wishes.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            wishes.style.transform = `
                perspective(1000px)
                rotateY(${x * 10 - 5}deg)
                rotateX(${y * -10 + 5}deg)
            `;
        });
    }

    createFloatingMemories() {
        setInterval(() => {
            const memory = document.createElement('div');
            memory.className = 'floating-memory';
            memory.style.backgroundImage = `url('images/memory${Math.floor(Math.random() * 5) + 1}.jpg')`;
            document.body.appendChild(memory);
            
            setTimeout(() => memory.remove(), 8000);
        }, 3000);
    }

    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const speed = section.dataset.speed || 0.5;
                const yPos = -(window.pageYOffset * speed);
                section.style.backgroundPositionY = yPos + 'px';
            });
        });
    }

    initializePhotoRain() {
        document.addEventListener('click', (e) => {
            this.createPhotoRainDrop(e.clientX, e.clientY);
        });
    }

    createPhotoRainDrop(x, y) {
        const drop = document.createElement('div');
        drop.className = 'photo-rain-drop';
        drop.style.left = x + 'px';
        drop.style.top = y + 'px';
        document.body.appendChild(drop);
        
        setTimeout(() => drop.remove(), 2000);
    }
}