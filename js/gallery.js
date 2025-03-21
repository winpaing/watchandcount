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
            src: '/images/gallery/Graduation.jpg',
            title: 'Graduation Day',
            category: 'achievement'
        },
        {
            src: '/images/gallery/child.jpg',
            title: 'Childhood Memories',
            category: 'memory'
        },
        {
            src: '/images/gallery/flower.jpg',
            title: 'Flowers',
            category: 'nature'
        },
        {
            src: '/images/gallery/night.jpg',
            title: 'Night Out',
            category: 'lifestyle'
        },
        {
            src: '/images/gallery/office2.jpg',
            title: 'Office Life',
            category: 'work'
        },
        {
            src: '/images/gallery/office3.jpg',
            title: 'Office Moments',
            category: 'work'
        },
        {
            src: '/images/gallery/party.jpg',
            title: 'Party Time',
            category: 'celebration'
        },
        {
            src: '/images/gallery/show.jpg',
            title: 'Special Event',
            category: 'event'
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
            src: '/images/gallery/student_uniform.jpg',
            title: 'Student Days',
            category: 'education'
        },
        {
            src: '/images/gallery/uni_team.jpg',
            title: 'University Team',
            category: 'education'
        },
        {
            src: '/images/gallery/view.jpg',
            title: 'Scenic View',
            category: 'nature'
        },
        {
            src: '/images/gallery/water.jpg',
            title: 'Water Festival',
            category: 'celebration'
        },
        {
            src: '/images/gallery/yangonnight.jpg',
            title: 'Yangon Night',
            category: 'city'
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

    // Update the filter buttons to match new categories
    const filterButtons = `
        <button class="filter-btn active" data-filter="all">All Photos</button>
        <button class="filter-btn" data-filter="celebration">Celebrations</button>
        <button class="filter-btn" data-filter="work">Work Life</button>
        <button class="filter-btn" data-filter="education">Education</button>
        <button class="filter-btn" data-filter="memory">Memories</button>
        <button class="filter-btn" data-filter="nature">Nature</button>
        <button class="filter-btn" data-filter="city">City Life</button>
        <button class="filter-btn" data-filter="achievement">Achievements</button>
    `;

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