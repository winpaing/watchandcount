class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: 'Happy Birthday Song',
                artist: 'Birthday Classics',
                file: '/assets/music/birthday.mp3'
            }
        ];
        
        this.audio = new Audio();
        this.currentTrack = 0;
        this.isPlaying = false;
        
        this.initPlayer();
        this.setupEventListeners();
    }

    initPlayer() {
        try {
            const basePath = window.location.hostname === 'winpaing.github.io' 
                ? '/watchandcount' 
                : '';
            this.audio.src = basePath + this.playlist[this.currentTrack].file;
            this.audio.preload = 'auto';
            this.audio.loop = true;
            this.audio.volume = 0.5;

            // Setup play button functionality
            const playBtn = document.querySelector('.play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    if (this.isPlaying) {
                        this.pause();
                    } else {
                        this.play();
                    }
                });
            }

            // Update button state on audio events
            this.audio.addEventListener('playing', () => {
                this.isPlaying = true;
                const icon = document.querySelector('.play-btn i');
                if (icon) icon.className = 'fas fa-pause';
            });

            this.audio.addEventListener('pause', () => {
                this.isPlaying = false;
                const icon = document.querySelector('.play-btn i');
                if (icon) icon.className = 'fas fa-play';
            });

        } catch (error) {
            console.error('Audio initialization error:', error);
        }
    }

    play() {
        if (this.audio.readyState >= 2) {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Playback failed:', error);
                    this.isPlaying = false;
                    const icon = document.querySelector('.play-btn i');
                    if (icon) icon.className = 'fas fa-play';
                });
            }
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton(false);
    }
}

// Initialize player when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});