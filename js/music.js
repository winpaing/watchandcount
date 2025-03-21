class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: 'Happy Birthday Song',
                artist: 'Birthday Classics',
                file: '../assets/music/happy_birthday.mp3'
            }
        ];
        
        this.audio = new Audio();
        this.currentTrack = 0;
        this.isPlaying = false;
        
        this.initPlayer();
        this.setupEventListeners();
    }

    initPlayer() {
        this.audio.src = this.playlist[this.currentTrack].file;
        this.audio.load();
        
        // Debug audio loading
        this.audio.addEventListener('canplaythrough', () => {
            console.log('Audio loaded successfully');
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Audio Error:', e);
            console.log('Current audio source:', this.audio.src);
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