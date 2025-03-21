class ProfileSection {
    constructor() {
        this.profileContainer = document.querySelector('.profile-container');
        this.profileImage = document.querySelector('.profile-image');
        this.initializeProfile();
    }

    initializeProfile() {
        this.addHoverEffects();
        this.addParallaxEffect();
        this.createAgeCalculator();
        this.addProfileAnimation();
    }

    addHoverEffects() {
        this.profileImage.addEventListener('mouseover', () => {
            this.profileImage.style.transform = 'scale(1.1) rotate(5deg)';
            this.createSparkleEffect();
        });

        this.profileImage.addEventListener('mouseout', () => {
            this.profileImage.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    createSparkleEffect() {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'profile-sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            this.profileContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    addParallaxEffect() {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            this.profileContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    createAgeCalculator() {
        const birthDate = new Date('1995-03-22');
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        const ageElement = document.createElement('div');
        ageElement.className = 'age-counter';
        ageElement.innerHTML = `
            <span class="age-number">${age}</span>
            <span class="age-text">Years of Amazing Journey</span>
        `;
        this.profileContainer.appendChild(ageElement);
    }

    addProfileAnimation() {
        this.profileContainer.classList.add('profile-animate');
        window.addEventListener('scroll', () => {
            const rect = this.profileContainer.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                this.profileContainer.classList.add('visible');
            }
        });
    }
}

// Initialize profile section
const profileSection = new ProfileSection();