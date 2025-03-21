class GalleryManager {
    constructor() {
        this.images = [
            {
                src: '/images/profile.jpg',
                title: 'Profile',
                description: 'Win Paing Soe'
            },
            {
                src: '/images/child.jpg',
                title: 'Childhood Memories',
                description: 'Sweet memories from early days'
            },
            {
                src: '/images/flower.jpg',
                title: 'Beautiful Flowers',
                description: 'Nature\'s beauty in full bloom'
            },
            {
                src: '/images/student_uniform.jpg',
                title: 'Student Days',
                description: 'Memorable school moments'
            },
            {
                src: '/images/uni_team.jpg',
                title: 'University Team',
                description: 'Together with amazing teammates'
            },
            {
                src: '/images/view.jpg',
                title: 'Scenic View',
                description: 'Beautiful landscapes'
            },
            {
                src: '/images/water.jpg',
                title: 'Water Adventures',
                description: 'Moments by the water'
            },
            {
                src: '/images/yangonnight.jpg',
                title: 'Yangon Nights',
                description: 'City lights and urban beauty'
            }
        ];
        this.initializeGallery();
    }

    initializeGallery() {
        const galleryContainer = document.querySelector('.gallery-container');
        
        this.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="image-wrapper">
                    <img src="${image.src}" alt="${image.title}" loading="lazy">
                    <div class="image-overlay">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </div>
                </div>
            `;

            galleryItem.addEventListener('click', () => this.openLightbox(index));
            galleryContainer.appendChild(galleryItem);
        });

        this.createLightbox();
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-nav prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-nav next"><i class="fas fa-chevron-right"></i></button>
                <img src="" alt="">
                <div class="lightbox-caption">
                    <h3></h3>
                    <p></p>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);

        this.setupLightboxControls(lightbox);
    }

    setupLightboxControls(lightbox) {
        const close = lightbox.querySelector('.lightbox-close');
        const prev = lightbox.querySelector('.prev');
        const next = lightbox.querySelector('.next');

        close.addEventListener('click', () => lightbox.classList.remove('active'));
        prev.addEventListener('click', () => this.navigateLightbox(-1));
        next.addEventListener('click', () => this.navigateLightbox(1));
    }

    openLightbox(index) {
        const lightbox = document.querySelector('.lightbox');
        this.currentImageIndex = index;
        this.updateLightboxImage();
        lightbox.classList.add('active');
    }

    updateLightboxImage() {
        const lightbox = document.querySelector('.lightbox');
        const image = this.images[this.currentImageIndex];
        const img = lightbox.querySelector('img');
        const caption = lightbox.querySelector('.lightbox-caption');

        img.src = image.src;
        caption.querySelector('h3').textContent = image.title;
        caption.querySelector('p').textContent = image.description;
    }

    navigateLightbox(direction) {
        this.currentImageIndex = (this.currentImageIndex + direction + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }

    // Add intersection observer for lazy loading
    this.setupLazyLoading();
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        // Add loading state before image loads
        item.classList.add('loading');

        img.addEventListener('load', () => {
            // Remove loading state after image loads
            item.classList.remove('loading');
            
            // Add fade-in animation
            img.style.animation = 'fadeIn 0.5s ease forwards';
        });
    });
});

// Add this to your existing CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
new GalleryManager();

// Add these styles to your CSS
const style = document.createElement('style');
style.textContent = `
    .gallery-item.loading {
        position: relative;
        min-height: 200px;
        background: #f0f0f0;
    }

    .loading-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #FFD700;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }

    .fade-in {
        opacity: 1;
    }

    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style);

setupLazyLoading() {
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, options);

    // Observe all gallery images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.classList.add('lazy');
        img.dataset.src = img.src;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Placeholder
        observer.observe(img);
    });
}
