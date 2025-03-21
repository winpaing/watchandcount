class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: 'Happy Birthday Song',
                artist: 'Birthday Classics',
                // Update path for GitHub Pages
                file: 'music/happy_birthday.mp3'
            }
        ];
        
        this.audio = new Audio();
        this.currentTrack = 0;
        this.isPlaying = false;
        
        this.initPlayer();
        this.setupEventListeners();
    }

    initPlayer() {
        // Use absolute path for local and relative path for GitHub Pages
        const isGitHubPages = window.location.hostname === 'winpaing.github.io';
        const baseUrl = isGitHubPages ? 'https://winpaing.github.io/watchandcount/' : '';
        
        this.audio.src = baseUrl + this.playlist[this.currentTrack].file;
        this.audio.preload = 'auto';
        this.audio.load();
        
        // Enhanced error handling
        this.audio.addEventListener('canplaythrough', () => {
            console.log('Audio ready to play');
        });
        
        this.audio.addEventListener('error', (e) => {
            const errors = [
                'MEDIA_ERR_ABORTED',
                'MEDIA_ERR_NETWORK',
                'MEDIA_ERR_DECODE',
                'MEDIA_ERR_SRC_NOT_SUPPORTED'
            ];
            console.error('Audio Error:', errors[this.audio.error.code - 1]);
            console.log('Audio source:', this.audio.src);
        });

        // Add loading state
        this.audio.addEventListener('loadstart', () => {
            const playBtn = document.querySelector('.play-btn');
            if (playBtn) playBtn.disabled = true;
        });

        this.audio.addEventListener('canplay', () => {
            const playBtn = document.querySelector('.play-btn');
            if (playBtn) playBtn.disabled = false;
        });
    }

    setupEventListeners() {
        const playBtn = document.querySelector('.play-btn');
        if (!playBtn) {
            console.error('Play button not found');
            return;
        }

        playBtn.addEventListener('click', () => {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        });
    }

    play() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.isPlaying = true;
                    document.querySelector('.play-btn i').className = 'fas fa-pause';
                })
                .catch(error => {
                    console.error('Playback failed:', error);
                });
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        document.querySelector('.play-btn i').className = 'fas fa-play';
    }
}

// Initialize player when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});