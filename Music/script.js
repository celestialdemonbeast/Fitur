let playlist = [];
let currentIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

async function loadPlaylist() {
  const response = await fetch("playlist.json");
  playlist = await response.json();
  loadSong(0);
}

function loadSong(index) {
  currentIndex = index;
  const song = playlist[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

document.getElementById("play").addEventListener("click", () => {
  audio.play();
});

document.getElementById("pause").addEventListener("click", () => {
  audio.pause();
});

document.getElementById("stop").addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  audio.play();
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  audio.play();
});

window.onload = loadPlaylist;


