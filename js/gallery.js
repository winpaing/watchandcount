class Gallery {
    constructor() {
        this.addPhotoBtn = document.getElementById('add-photo');
        this.fileInput = document.getElementById('photo-upload');
        this.galleryContainer = document.querySelector('.gallery-container');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.addPhotoBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        
        document.querySelector('.close').addEventListener('click', () => {
            this.lightbox.classList.remove('active');
        });
    }

    handleFileUpload(event) {
        const files = event.target.files;
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    this.addImageToGallery(e.target.result);
                };
                
                reader.readAsDataURL(file);
            }
        }
    }

    addImageToGallery(src) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Gallery Image';
        
        item.appendChild(img);
        this.galleryContainer.appendChild(item);
        
        item.addEventListener('click', () => {
            this.lightboxImg.src = src;
            this.lightbox.classList.add('active');
        });
    }
}

// Initialize gallery
const gallery = new Gallery();

// Add some demo images (remove this in production)
const demoImages = [
    'https://picsum.photos/500/500?random=1',
    'https://picsum.photos/500/500?random=2',
    'https://picsum.photos/500/500?random=3'
];

demoImages.forEach(src => gallery.addImageToGallery(src));