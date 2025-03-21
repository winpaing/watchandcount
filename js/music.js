class MusicPlayer {
    constructor() {
        this.playlist = [
            {
                title: 'Happy Birthday Song',
                artist: 'Birthday Classics',
                file: '/music/happy_birthday.mp3' // Update this path
            }
        ];
        
        this.audio = new Audio();
        this.currentTrack = 0;
        this.isPlaying = false;
        
        // Add error handling
        this.audio.addEventListener('error', (e) => {
            console.error('Audio Error:', e);
            console.log('Audio source:', this.audio.src);
        });
        
        this.initPlayer();
        this.setupEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});