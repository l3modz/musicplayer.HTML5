document.addEventListener('DOMContentLoaded', () => {
    const folderInput = document.getElementById('folderInput');
    const audioPlayer = document.getElementById('audioPlayer');
    const playlistElement = document.getElementById('playlist');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let files = [];
    let currentTrackIndex = 0;

    // Listen for the user selecting a folder
    folderInput.addEventListener('change', (event) => {
        files = Array.from(event.target.files).filter(file => file.type.startsWith('audio/'));
        if (files.length > 0) {
            buildPlaylist();
            currentTrackIndex = 0;
            loadTrack(currentTrackIndex);
            playPauseBtn.textContent = 'Play'; // Reset button text
        }
    });

    // Handle the end of a track to play the next one automatically
    audioPlayer.addEventListener('ended', () => {
        playNextTrack();
    });

    // Control buttons
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    nextBtn.addEventListener('click', () => {
        playNextTrack();
    });

    prevBtn.addEventListener('click', () => {
        playPreviousTrack();
    });

    function buildPlaylist() {
        playlistElement.innerHTML = '';
        files.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            li.setAttribute('data-index', index);
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                audioPlayer.play();
                playPauseBtn.textContent = 'Pause';
            });
            playlistElement.appendChild(li);
        });
    }

    function loadTrack(index) {
        const file = files[index];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            audioPlayer.src = objectURL;
            updateActiveTrack(index);
        }
    }

    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % files.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }

    function playPreviousTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + files.length) % files.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }

    function updateActiveTrack(index) {
        const tracks = playlistElement.querySelectorAll('li');
        tracks.forEach(track => {
            track.classList.remove('active');
        });
        if (tracks[index]) {
            tracks[index].classList.add('active');
        }
    }
});

