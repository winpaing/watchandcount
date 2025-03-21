class MusicPlayer {
    constructor() {
        this.songs = [
            { title: 'Happy Birthday Traditional', file: 'happy-birthday.mp3' },
            { title: 'Birthday Party Mix', file: 'party-mix.mp3' },
            { title: 'Celebration Time', file: 'celebration.mp3' },
            { title: 'Birthday Wishes', file: 'wishes.mp3' }
        ];
        
        this.currentSongIndex = 0;
        this.isPlaying = false;
        
        this.initializePlayer();
        this.setupEventListeners();
    }

    initializePlayer() {
        this.audio = document.createElement('audio');
        this.songTitle = document.getElementById('song-title');
        this.progressBar = document.querySelector('.progress');
        this.playBtn = document.getElementById('play');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        
        this.loadSong(this.songs[this.currentSongIndex]);
        this.addVisualizer();
    }

    setupEventListeners() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
        
        document.querySelector('.progress-bar').addEventListener('click', (e) => {
            const width = e.currentTarget.clientWidth;
            const clickX = e.offsetX;
            const duration = this.audio.duration;
            this.audio.currentTime = (clickX / width) * duration;
        });
    }

    loadSong(song) {
        this.songTitle.textContent = song.title;
        this.audio.src = `music/${song.file}`;
        this.updateVisualizer();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pauseSong();
        } else {
            this.playSong();
        }
    }

    playSong() {
        this.isPlaying = true;
        this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.audio.play();
        this.startVisualizer();
    }

    pauseSong() {
        this.isPlaying = false;
        this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.audio.pause();
        this.stopVisualizer();
    }

    prevSong() {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0) {
            this.currentSongIndex = this.songs.length - 1;
        }
        this.loadSong(this.songs[this.currentSongIndex]);
        if (this.isPlaying) this.playSong();
    }

    nextSong() {
        this.currentSongIndex++;
        if (this.currentSongIndex >= this.songs.length) {
            this.currentSongIndex = 0;
        }
        this.loadSong(this.songs[this.currentSongIndex]);
        if (this.isPlaying) this.playSong();
    }

    updateProgress() {
        const { duration, currentTime } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
    }

    addVisualizer() {
        this.visualizer = document.createElement('canvas');
        this.visualizer.className = 'music-visualizer';
        document.querySelector('.music-player').appendChild(this.visualizer);
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
    }

    updateVisualizer() {
        if (!this.isPlaying) return;
        
        const canvas = this.visualizer;
        const ctx = canvas.getContext('2d');
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            requestAnimationFrame(draw);
            this.analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFD700';
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        
        draw();
    }
}

// Initialize music player
const musicPlayer = new MusicPlayer();