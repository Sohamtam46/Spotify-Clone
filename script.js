console.log("Welcome to spotify");

//iniialize the variables 
let audioElement = new Audio('songs/1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let previousSong = document.getElementById('previousSong');
let nextSong = document.getElementById('nextSong');
let currentSong = document.getElementById('currentSong');


let songs = [
    {songName: "Look What You Made Me Do", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Shake it off", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "It Was Always You", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "We Dont Talk Anymore", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Dangerous (feat. Sam Martin)", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//music play and pause
masterPlay.addEventListener('click', ()=>{
    currentSong.innerText = songs[songIndex].songName;
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
        gif.style.opacity=0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress
})


myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlay = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}


songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime <= 0){
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.currentTime = 0;
            gif.style.opacity=1;
            currentSong.innerText = songs[songIndex].songName;
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');  
        }
        else{
            // e.target.classList.remove('fa-pause');
            // e.target.classList.add('fa-play');
            audioElement.currentTime = 0;
            gif.style.opacity=0;
            currentSong.innerText = songs[songIndex].songName;
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        }
        
    })
})

previousSong.addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 4;
    }
    else{
        songIndex -= 1;  
    }
    audioElement.currentTime = 0;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

nextSong.addEventListener('click',()=>{
    if(songIndex >= 4){
        songIndex = 0;
    }
    else{
        songIndex += 1;  
    }
    audioElement.currentTime = 0;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    currentSong.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

