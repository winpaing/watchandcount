class ShareManager {
    constructor() {
        this.initializeSharing();
    }

    initializeSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const platform = e.currentTarget.classList[1];
                this.shareContent(platform);
            });
        });
    }

    shareContent(platform) {
        const shareData = {
            title: "Win Paing Soe's 30th Birthday Celebration",
            text: "Join me in celebrating my 30th birthday! 🎉",
            url: window.location.href
        };

        switch(platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
                break;
            case 'instagram':
                // Open Instagram sharing dialog if available
                if (navigator.share) {
                    navigator.share(shareData);
                }
                break;
        }
    }
}

// Initialize sharing
const shareManager = new ShareManager();