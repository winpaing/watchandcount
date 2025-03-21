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

class ProfileEnhancer {
    constructor() {
        this.initializeEnhancements();
    }

    initializeEnhancements() {
        this.add3DCardEffect();
        this.addTypewriterEffect();
        this.addProfileParticles();
        this.addMouseTrailEffect();
        this.addProfileStats();
    }

    add3DCardEffect() {
        const profile = document.querySelector('.profile-container');
        profile.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = profile.getBoundingClientRect();
            const x = (e.clientX - left - width/2) / 20;
            const y = (e.clientY - top - height/2) / 20;
            
            profile.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
            this.updateGlare(e, profile);
        });

        profile.addEventListener('mouseleave', () => {
            profile.style.transform = 'rotateY(0) rotateX(0)';
        });
    }

    updateGlare(e, element) {
        const glare = element.querySelector('.glare');
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)`;
    }

    addTypewriterEffect() {
        const text = "Celebrating 30 Amazing Years!";
        const element = document.querySelector('.celebration-text');
        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        type();
    }

    addProfileParticles() {
        const canvas = document.createElement('canvas');
        canvas.className = 'profile-particles';
        document.querySelector('.profile-container').appendChild(canvas);
        
        // Particle animation implementation
        this.initParticles(canvas);
    }

    addMouseTrailEffect() {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);

        document.addEventListener('mousemove', (e) => {
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
        });
    }

    addProfileStats() {
        const stats = document.createElement('div');
        stats.className = 'profile-stats';
        stats.innerHTML = `
            <div class="stat" data-value="30">
                <span class="stat-number">0</span>
                <span class="stat-label">Years</span>
            </div>
            <div class="stat" data-value="365">
                <span class="stat-number">0</span>
                <span class="stat-label">Days</span>
            </div>
            <div class="stat" data-value="8760">
                <span class="stat-number">0</span>
                <span class="stat-label">Hours</span>
            </div>
        `;
        document.querySelector('.profile-container').appendChild(stats);
        this.animateStats();
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat');
        stats.forEach(stat => {
            const targetValue = parseInt(stat.dataset.value);
            const numberElement = stat.querySelector('.stat-number');
            this.countUp(numberElement, targetValue);
        });
    }

    countUp(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }
    // Add this to your existing ProfileEnhancer class
    addSparkleEffect() {
        document.addEventListener('DOMContentLoaded', () => {
            const profileContainer = document.querySelector('.profile-container');
            const sparklesContainer = document.createElement('div');
            sparklesContainer.className = 'profile-sparkles';
            
            // Create rotating rings
            const ringsContainer = document.createElement('div');
            ringsContainer.className = 'profile-rings';
            for (let i = 0; i < 3; i++) {
                const ring = document.createElement('div');
                ring.className = 'ring';
                ringsContainer.appendChild(ring);
            }
            
            // Create sparkles
            function createSparkle() {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                sparklesContainer.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 2000);
            }
            
            // Add sparkles periodically
            setInterval(createSparkle, 300);
            
            profileContainer.appendChild(ringsContainer);
            profileContainer.appendChild(sparklesContainer);
        });
    }
}

// Initialize profile section
const profileSection = new ProfileSection();

document.addEventListener('DOMContentLoaded', () => {
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    
    profileWrapper.addEventListener('click', () => {
        profileWrapper.classList.add('rotating');
        
        setTimeout(() => {
            profileWrapper.classList.remove('rotating');
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.querySelector('.profile-container');
    
    // Add sparkle effect on hover
    profileContainer.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Get position relative to container
        const rect = profileContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Random movement
        sparkle.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
        sparkle.style.setProperty('--ty', (Math.random() * -100 - 20) + 'px');
        
        sparkle.style.animation = 'sparkle 1s ease-in-out forwards';
        
        profileContainer.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => sparkle.remove(), 1000);
    });
});