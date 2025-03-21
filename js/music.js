class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: 'Happy Birthday Song',
                file: '/music/happy_birthday.mp3'
            }
        ];
        
        this.audio = new Audio(this.playlist[0].file);
        this.currentTrack = 0;
        this.isPlaying = false;
        
        this.initPlayer();
        this.setupEventListeners();
    }

    initPlayer() {
        this.audio.src = this.playlist[this.currentTrack].file;
        this.audio.load();
    }

    setupEventListeners() {
        // Fix play button selector and event listener
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

        // Add error handling for audio
        this.audio.addEventListener('error', (e) => {
            console.error('Audio Error:', e);
            alert('Unable to play audio. Please check if the audio file exists.');
        });

        // Add loading state
        this.audio.addEventListener('loadstart', () => {
            playBtn.disabled = true;
        });

        this.audio.addEventListener('canplay', () => {
            playBtn.disabled = false;
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
                    console.error('Playback error:', error);
                    this.isPlaying = false;
                });
        }
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        document.querySelector('.play-btn i').className = 'fas fa-play';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});