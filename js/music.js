class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: 'Happy Birthday Song',
                artist: 'Birthday Classics',
                file: 'https://winpaing.github.io/watchandcount/assets/music/birthday.mp3'
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
            this.audio.src = this.playlist[this.currentTrack].file;
            this.audio.preload = 'auto';
            this.audio.crossOrigin = 'anonymous';
            this.audio.load();
            
            this.audio.addEventListener('loadeddata', () => {
                console.log('Audio data loaded');
                const playBtn = document.querySelector('.play-btn');
                if (playBtn) playBtn.disabled = false;
            });
            
            this.audio.addEventListener('error', (e) => {
                const errorTypes = {
                    1: 'MEDIA_ERR_ABORTED',
                    2: 'MEDIA_ERR_NETWORK',
                    3: 'MEDIA_ERR_DECODE',
                    4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
                };
                const error = this.audio.error;
                console.error('Audio Error:', errorTypes[error.code], error.message);
                alert('Unable to load audio. Please try again later.');
            });
        } catch (error) {
            console.error('Audio initialization error:', error);
        }
    }
}

// Initialize player when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});