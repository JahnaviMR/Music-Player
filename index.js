// Front Page Elements
const frontPageContainer = document.getElementById("front-page-container");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function() {
  frontPageContainer.style.display = "none";
  loginContainer.style.display = "flex";
});

// Existing code below

// Login Elements
const loginContainer = document.getElementById("login-container");
const playerContainer = document.getElementById("player-container");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if (name && mobile) {
    loginContainer.style.display = "none";
    playerContainer.style.display = "flex";
  } else {
    loginMessage.textContent = "Please enter both name and mobile number.";
    loginMessage.style.display = "block";
  }
});

const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");

// Check if playing
let isPlaying = false;
// Current Song Index
let songIndex = 0;

// Music
const songs = [
  {
    name: "song-1",
    displayName: "Thuli Thuli",
    artist: "Yuvan shankar raja",
  },
  {
    name: "song-2",
    displayName: "Tell me",
    artist: "Atanas Kolev",
  },
  {
    name: "song-3",
    displayName: "Faded",
    artist: "Alan walker",
  },
  {
    name: "song-4",
    displayName: "The adventures of Mr.Hardy",
    artist: "Roman Dudchyk",
  },
  {
    name: "song-5",
    displayName: "Heeriye ",
    artist: "Arijit Singh",
  },
  {
    name: "song-6",
    displayName: "nazm nazm",
    artist: "Arko pravo Mukherjee",
  },
  {
    name: "song-7",
    displayName: "Remarks",
    artist: "Dim4ou",
  },
  {
    name: "song-8",
    displayName: "bombe heluthaithe",
    artist: "Vijay prakash",
  }
];

// Random Background Color
const randomBgColor = function () {
  // Get a random number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 192) + 64;
  let green = Math.floor(Math.random() * 192) + 64;
  let blue = Math.floor(Math.random() * 192) + 64;

  // Construct a color with the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
};

// Update DOM
const loadSong = function (song) {
  title.textContent = song.displayName || song.name;
  artist.textContent = song.artist;
 music.src = `MP_songs/${song.name}.mp3`; // Update path to match directory structure
  img.src = `MP_images/${song.name}.jpg`;  // Update path to match directory structure
  randomBgColor();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

// Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Mute/Unmute
const toggleMute = function () {
  if (music.muted) {
    music.muted = false;
    volumeSlider.value = 50;
    volumeBtn.classList.replace("fa-volume-mute", "fa-volume-up");
    volumeBtn.setAttribute("title", "Mute");
  } else {
    music.muted = true;
    volumeSlider.value = 0;
    volumeBtn.classList.replace("fa-volume-up", "fa-volume-mute");
    volumeBtn.setAttribute("title", "Unmute");
  }
};

// Update Progress Bar & Time
const updateProgressBar = function (e) {
    if (isPlaying) {
      const { duration, currentTime } = e.srcElement;
  
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
  
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
  
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
  
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
  

// Next Song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Previous Song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Set Progress Bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
};

// Set Volume
const setVolume = function () {
  music.volume = volumeSlider.value / 100;
};

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
volumeBtn.addEventListener("click", toggleMute);
progressContainer.addEventListener("click", setProgressBar);

// Add search functionality
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchMessage = document.getElementById("search-message");

const searchSong = function () {
  const searchTerm = searchInput.value.toLowerCase();
  const song = songs.find(song => song.displayName.toLowerCase().includes(searchTerm));

  if (song) {
    songIndex = songs.indexOf(song);
    loadSong(song);
    playSong();
    searchMessage.style.display = "none"; // Hide the message if a song is found
  } else {
    searchMessage.textContent = "No such song available";
    searchMessage.style.display = "block"; // Show the message if no song is found
  }
};

searchButton.addEventListener("click", searchSong);

// Add these elements
const listButton = document.getElementById("list-button");
const listContainer = document.getElementById("list-container");
const songList = document.getElementById("song-list");

// Function to populate song list
const populateSongList = function () {
  songList.innerHTML = ''; // Clear existing list

  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.displayName || song.name;
    li.dataset.index = index; // Store the song index
    songList.appendChild(li);
  });
};

// Event listener for song list button
listButton.addEventListener("click", function () {
  populateSongList();
  listContainer.style.display = "flex";
  playerContainer.style.display = "none";
});

// Event listener for song list items
songList.addEventListener("click", function (event) {
  const li = event.target;
  if (li.tagName === 'LI') {
    songIndex = li.dataset.index;
    loadSong(songs[songIndex]);
    playSong();
    listContainer.style.display = "none";
    playerContainer.style.display = "flex";
  }
});
