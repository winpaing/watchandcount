document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Update the image paths in your gallery configuration
    // Add these new images to your existing images array
    const images = [
        {
            src: '/images/gallery/birthday.jpg',
            title: 'Birthday Celebration',
            category: 'celebration'
        },
        {
            src: '/images/gallery/child.jpg',
            title: 'Childhood Memories',
            category: 'memory'
        },
        {
            src: '/images/gallery/office2.jpg',
            title: 'Office Life',
            category: 'work'
        },
        {
            src: '/images/gallery/party.jpg',
            title: 'Party Time',
            category: 'celebration'
        },
        {
            src: '/images/gallery/staff.jpg',
            title: 'With Staff',
            category: 'work'
        },
        {
            src: '/images/gallery/staff2.jpg',
            title: 'Team Memories',
            category: 'work'
        },
        {
            src: '/images/gallery/show.jpg',
            title: 'Special Event',
            category: 'event'
        },
        {
            src: '/images/gallery/night.jpg',
            title: 'Night Out',
            category: 'celebration'
        },
        {
            src: '/images/gallery/image1.jpg',
            title: 'Special Moment 1',
            category: 'memory'
        },
        {
            src: '/images/gallery/image2.jpg',
            title: 'Special Moment 2',
            category: 'memory'
        },
        {
            src: '/images/gallery/image3.jpg',
            title: 'Special Moment 3',
            category: 'memory'
        },
        {
            src: '/images/gallery/image4.jpg',
            title: 'Special Moment 4',
            category: 'memory'
        },
        {
            src: '/images/gallery/image5.jpg',
            title: 'Special Moment 5',
            category: 'memory'
        },
        {
            src: '/images/gallery/flower.jpg',
            title: 'Beautiful Flowers',
            category: 'moments',
            date: '2024'
        },
        {
            src: '/images/gallery/Graduation.jpg',
            title: 'Graduation Day',
            category: 'achievement',
            date: '2024'
        }
    ];

    // Create gallery items
    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="gallery-overlay">
                <h3>${image.title}</h3>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);
    });
});

// Add this function to your existing GalleryManager class
animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Call this function after creating gallery items
this.animateGalleryItems();

// Add smooth transition when filtering
filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const shouldShow = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            item.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            }
        }, 300);
    });
}