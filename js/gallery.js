class GalleryManager {
    constructor() {
        this.images = [
            { src: 'images/memory1.jpg', caption: 'First Day at Work' },
            { src: 'images/memory2.jpg', caption: 'College Graduation' },
            { src: 'images/memory3.jpg', caption: 'Family Vacation' },
            { src: 'images/memory4.jpg', caption: 'Birthday Party 2022' },
            { src: 'images/memory5.jpg', caption: 'Team Building' },
            { src: 'images/memory6.jpg', caption: 'Travel Adventures' }
        ];
        this.initializeGallery();
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.currentIndex = 0;
    }

    initializeGallery() {
        const galleryContainer = document.querySelector('.gallery-container');
        galleryContainer.innerHTML = '';

        this.images.forEach((image, index) => {
            const galleryItem = this.createGalleryItem(image, index);
            galleryContainer.appendChild(galleryItem);
        });

        this.setupLightbox();
    }

    createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="memory-card" data-index="${index}">
                <img src="${image.src}" alt="${image.caption}" loading="lazy">
                <div class="memory-overlay">
                    <h3>${image.caption}</h3>
                    <button class="view-btn">View Memory</button>
                </div>
            </div>
        `;
        return item;
    }

    setupLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="close-btn">&times;</button>
                <button class="nav-btn prev-btn">&lt;</button>
                <button class="nav-btn next-btn">&gt;</button>
                <img src="" alt="">
                <div class="caption"></div>
                <div class="swipe-indicator">Swipe to navigate</div>
            </div>
        `;
        document.body.appendChild(lightbox);

        this.setupTouchEvents(lightbox);
        this.setupClickEvents(lightbox);
    }

    setupTouchEvents(lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        lightbox.addEventListener('touchmove', (e) => {
            if (!lightbox.classList.contains('active')) return;
            e.preventDefault();
            const currentTouch = e.touches[0].clientX;
            const diff = this.touchStartX - currentTouch;
            const content = lightbox.querySelector('.lightbox-content');
            content.style.transform = `translateX(${-diff}px)`;
        });

        lightbox.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            const diff = this.touchStartX - this.touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.currentIndex = (this.currentIndex + 1) % this.images.length;
                } else {
                    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
                }
                this.showLightbox(this.currentIndex);
            }

            const content = lightbox.querySelector('.lightbox-content');
            content.style.transform = '';
        });
    }

    setupClickEvents(lightbox) {
        let currentIndex = 0;

        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', () => {
                currentIndex = parseInt(card.dataset.index);
                this.showLightbox(currentIndex);
            });
        });

        lightbox.querySelector('.close-btn').addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.querySelector('.prev-btn').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + this.images.length) % this.images.length;
            this.showLightbox(currentIndex);
        });

        lightbox.querySelector('.next-btn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % this.images.length;
            this.showLightbox(currentIndex);
        });
    }

    showLightbox(index) {
        const lightbox = document.querySelector('.lightbox');
        const image = this.images[index];
        this.currentIndex = index;
        
        const img = lightbox.querySelector('img');
        img.src = image.src;
        img.style.transform = 'scale(1)';
        
        lightbox.querySelector('.caption').textContent = image.caption;
        lightbox.classList.add('active');
    }
}