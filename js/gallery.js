class Gallery {
    constructor() {
        this.galleryContainer = document.querySelector('.gallery-container');
        this.lightbox = this.createLightbox();
        this.images = [
            'birthday1.jpg',
            'birthday2.jpg',
            'birthday3.jpg',
            'childhood1.jpg',
            'childhood2.jpg',
            'memories1.jpg',
            'memories2.jpg',
            'memories3.jpg'
        ];
        this.initializeGallery();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <img src="" alt="Gallery Image">
                <div class="lightbox-nav">
                    <button class="prev-btn">❮</button>
                    <button class="next-btn">❯</button>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
        return lightbox;
    }

    initializeGallery() {
        this.loadImages();
        this.setupMasonryLayout();
        this.setupLightboxEvents();
        this.addScrollAnimation();
    }

    loadImages() {
        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="images/${image}" alt="Memory ${index + 1}">
                <div class="gallery-item-overlay">
                    <span class="gallery-item-caption">Memory ${index + 1}</span>
                </div>
            `;
            this.galleryContainer.appendChild(item);
            
            item.addEventListener('click', () => this.openLightbox(index));
        });
    }

    setupMasonryLayout() {
        const masonryOptions = {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true,
            gutter: 20
        };
        new Masonry(this.galleryContainer, masonryOptions);
    }

    setupLightboxEvents() {
        let currentIndex = 0;
        
        this.lightbox.querySelector('.close-lightbox').onclick = () => {
            this.lightbox.classList.remove('active');
        };

        this.lightbox.querySelector('.prev-btn').onclick = () => {
            currentIndex = (currentIndex - 1 + this.images.length) % this.images.length;
            this.updateLightboxImage(currentIndex);
        };

        this.lightbox.querySelector('.next-btn').onclick = () => {
            currentIndex = (currentIndex + 1) % this.images.length;
            this.updateLightboxImage(currentIndex);
        };
    }

    openLightbox(index) {
        const img = this.lightbox.querySelector('img');
        img.src = `images/${this.images[index]}`;
        this.lightbox.classList.add('active');
    }

    updateLightboxImage(index) {
        const img = this.lightbox.querySelector('img');
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = `images/${this.images[index]}`;
            img.style.opacity = '1';
        }, 300);
    }

    addScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize gallery
const gallery = new Gallery();