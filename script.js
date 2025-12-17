console.log("Welcome to Spotify");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/happy.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Happy", filePath: "song/happy.mp3", coverPath: "cover/happy1.jpg" },
    { songName: "I'm So Sorry", filePath: "song/ISS.mp3", coverPath: "cover/ISS.jpg" },
    { songName: "My Mistake", filePath: "song/MM.mp3", coverPath: "cover/MM.jpg" },
    { songName: "Don't Wake Me Up", filePath: "song/DWMU.mp3", coverPath: "cover/dwmu.jpg" },
    { songName: "Head In Her Heart", filePath: "song/HIHH.mp3", coverPath: "cover/hinh.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play / pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        makeAllPlays();
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');

        gif.style.opacity = 1;
    } else {
        audioElement.pause();

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');

        gif.style.opacity = 0;
    }
});


// Smooth progress bar update
function smoothUpdate() {
    if (audioElement.duration) {
        myProgressBar.value =
            (audioElement.currentTime / audioElement.duration) * 100;
    }
    requestAnimationFrame(smoothUpdate);
}
requestAnimationFrame(smoothUpdate);

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(el => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
    });
};

// Individual song click
Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// Next
document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();

    songIndex = (songIndex >= 4) ? 0 : songIndex + 1;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});


// Previous
document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays();

    songIndex = (songIndex <= 0) ? 0 : songIndex - 1;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
