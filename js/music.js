class MusicPlayer {
    constructor() {
        this.musicContainer = document.querySelector('.music-container');
        this.playBtn = document.getElementById('play');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.audio = document.getElementById('audio');
        this.progress = document.querySelector('.progress');
        this.progressContainer = document.querySelector('.progress-container');
        this.title = document.getElementById('song-title');

        this.songs = [
            'happy-birthday',
            'celebration',
            'birthday-party'
        ];

        this.songIndex = 0;
        this.isPlaying = false;

        this.initializeEventListeners();
        this.loadSong(this.songs[this.songIndex]);
    }

    initializeEventListeners() {
        this.playBtn.addEventListener('click', () => {
            this.isPlaying ? this.pauseSong() : this.playSong();
        });

        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());

        this.audio.addEventListener('timeupdate', (e) => this.updateProgress(e));
        this.progressContainer.addEventListener('click', (e) => this.setProgress(e));

        this.audio.addEventListener('ended', () => this.nextSong());
    }

    loadSong(song) {
        this.title.innerText = song.replace(/-/g, ' ');
        this.audio.src = `music/${song}.mp3`;
    }

    playSong() {
        this.musicContainer.classList.add('play');
        this.playBtn.querySelector('i.fas').classList.remove('fa-play');
        this.playBtn.querySelector('i.fas').classList.add('fa-pause');
        this.audio.play();
        this.isPlaying = true;
    }

    pauseSong() {
        this.musicContainer.classList.remove('play');
        this.playBtn.querySelector('i.fas').classList.add('fa-play');
        this.playBtn.querySelector('i.fas').classList.remove('fa-pause');
        this.audio.pause();
        this.isPlaying = false;
    }

    prevSong() {
        this.songIndex--;
        if (this.songIndex < 0) {
            this.songIndex = this.songs.length - 1;
        }
        this.loadSong(this.songs[this.songIndex]);
        this.playSong();
    }

    nextSong() {
        this.songIndex++;
        if (this.songIndex > this.songs.length - 1) {
            this.songIndex = 0;
        }
        this.loadSong(this.songs[this.songIndex]);
        this.playSong();
    }

    updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
    }

    setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }
}

// Initialize music player
const musicPlayer = new MusicPlayer();