document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Update the image paths in your gallery configuration
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