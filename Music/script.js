let playlist = [];
let currentIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const widget = document.querySelector(".music-widget");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");

async function loadPlaylist() {
    try {
        const response = await fetch("playlist.json");
        playlist = await response.json();
        if (playlist.length > 0) loadSong(0);
    } catch (error) {
        console.error("Playlist sync failed:", error);
    }
}

function loadSong(index) {
    currentIndex = index;
    const song = playlist[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

function updateState(isPlaying) {
    if (isPlaying) {
        widget.classList.add("playing");
        playBtn.style.display = "none";
        pauseBtn.style.display = "flex";
    } else {
        widget.classList.remove("playing");
        playBtn.style.display = "flex";
        pauseBtn.style.display = "none";
    }
}

playBtn.addEventListener("click", () => {
    audio.play();
    updateState(true);
});

pauseBtn.addEventListener("click", () => {
    audio.pause();
    updateState(false);
});

document.getElementById("stop").addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    updateState(false);
});

document.getElementById("prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
    audio.play();
    updateState(true);
});

document.getElementById("next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    audio.play();
    updateState(true);
});

audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    audio.play();
    updateState(true);
});

window.onload = loadPlaylist;


