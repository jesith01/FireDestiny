window.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const songTitle = document.getElementById('songTitle');
    const progressBarFill = document.querySelector('.progress-bar-fill'); // Seleccionar la barra de progreso que se llena

    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    function playSong() {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
        isPlaying = true;
        document.querySelector('.cover-container').classList.add('pulse');
    }

    function pauseSong() {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
        document.querySelector('.cover-container').classList.remove('pulse');
    }

    audioPlayer.addEventListener('loadedmetadata', () => {
        const totalTime = formatTime(audioPlayer.duration);
        document.querySelector('.time-display').textContent = `0:00 / ${totalTime}`;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const totalTime = audioPlayer.duration;
        const percentage = (currentTime / totalTime) * 100;
        progressBarFill.style.width = `${percentage}%`; // Actualizar el ancho de la barra de progreso
        document.querySelector('.time-display').textContent = `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = Math.floor(seconds % 60);
        const displaySeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds;
        return `${minutes}:${displaySeconds}`;
    }
});
