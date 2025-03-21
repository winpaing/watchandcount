// Profile Image Handler
class ProfileManager {
    constructor() {
        this.profileImage = document.querySelector('.profile-image');
        this.setupProfileImage();
    }

    setupProfileImage() {
        // Set your profile image
        this.profileImage.style.backgroundImage = "url('images/profile.jpg')";
        
        // Add hover effect
        this.profileImage.addEventListener('mouseenter', () => {
            this.profileImage.style.transform = 'scale(1.1)';
            this.profileImage.style.transition = 'transform 0.3s ease';
        });

        this.profileImage.addEventListener('mouseleave', () => {
            this.profileImage.style.transform = 'scale(1)';
        });
    }
}

// Initialize Profile Manager
const profileManager = new ProfileManager();