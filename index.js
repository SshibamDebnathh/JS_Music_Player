let playBtn = document.querySelector('#playPause')
let nowPlaying = document.querySelector('.nowPlaying')
let songPic = document.querySelector('#icon')
let songName = document.querySelector('#songName')
let artist = document.querySelector('#artistName')
let currTime = document.querySelector("#currentTime")
let totalTime = document.querySelector("#totalTime")

let nextBtn = document.querySelector('#next')
let prevBtn = document.querySelector('#previous')
let songSlider = document.querySelector('.songSlide')
let volumeSlider = document.querySelector('.volumeSlide')

let isPlaying = false
let layout = document.querySelector('.player')
let songIndex = 0
let updateTime

let currSong = document.createElement('audio')


let toggleBtn = document.querySelector('.fa-toggle-off')

playBtn.addEventListener('click',playPause)
toggleBtn.addEventListener('click',toggle)
// let songArr = []
// console.log(songArr)

let butn = document.querySelector('#btnGroup')
butn.style.marginTop = '23px';

// let iTags = document.querySelectorAll('.fa-solid')
// // console.log(iTags)
// iTags.forEach((e) => {e.style.color = "#0c4463";})





//to pause or play a song
let playb = document.querySelector('.fa-circle-play')

function playPause(){
    
    if(!isPlaying) playSong()
    else pauseSong()
    
    
}

function playSong(){
    playBtn.innerHTML = '<i class="fa-solid fa-circle-pause fa-4x"></i>'
    currSong.play()
    isPlaying = true

}

function pauseSong(){
    playBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-4x"></i>'
    currSong.pause()
    isPlaying = false
}


//array containing all the songs
let songArr = [
    
    {
        name: 'Lonesome Journey.mp3',
        artist:"keys of Moon music",
        image:'./imgs/1.jpg',
        path:"./songs/Lonesome Journey.mp3"
    },
    
    {
        name: 'Digital Information.mp3',
        artist:"keys of Moon music",
        image:'./imgs/2.jpg',
        path:"./songs/digital information.mp3"
    },
    
    {
        name: 'Inspiring Technology.mp3',
        artist:"keys of Moon music",
        image:'./imgs/3.jpg',
        path:"./songs/Inspiring Technology.mp3"
    },
    
    {
        name: 'Mystery music.mp3',
        artist:"scott buckley",
        image:'./imgs/4.jpg',
        path:"./songs/Mystery music.mp3"
    }

    ]

    let song = new Audio('./songs/Lonesome Journey.mp3')

    

    

// to toggle the screen color to dark or light mode    
let toggleText = document.getElementById("mode")
console.log(toggleText)

function toggle(){
    let musicPlayer = document.querySelector(".player")

    if(toggleBtn.classList.contains('fa-toggle-off')){
        toggleBtn.classList.replace("fa-toggle-off","fa-toggle-on")
        document.body.style.backgroundColor='#062738'
        toggleText= "Dark"
        musicPlayer.style.border = "2px solid red";
        console.log(toggleText)
        // alert("Dark mode activated")

    }
    else{
        toggleBtn.classList.replace("fa-toggle-on","fa-toggle-off")
        document.body.style.backgroundColor='white'
        musicPlayer.style.border = "2px solid #0c4463";

        toggleText = 'Light'
        console.log(toggleText)



    }}
// here we are loading the song
    function loadSong(songIndex){

        clearInterval(updateTime)
        resetValues()


        nowPlaying.textContent = "Playing " + (songIndex + 1) + ' of ' + songArr.length

        currSong.load()

        currSong.src = songArr[songIndex].path

        songPic.style.backgroundImage = 'url(' + songArr[songIndex].image + ')'
        artist.textContent = songArr[songIndex].artist
        songName.textContent =songArr[songIndex].name

        updateTime = setInterval(updating,1000)

        currSong.addEventListener('ended',nextSong)

        bcgUpdate()


    }
    //updating the background color randomly
    function bcgUpdate(){
        let red = Math.floor(Math.random()*256 + 64)
        let green = Math.floor(Math.random()*256 + 64)
        let blue = Math.floor(Math.random()*256 + 64)

        let bgColor = `rgb(${red}+${green}+${blue})`

        layout.style.backgroundColor = bgColor

        
    }
    //reseting all the values
    function resetValues(){
        currTime.textContent = "00:00"
        totalTime.textContent = '00:00'
        songSlider.value = 0
    }

   // playing next song
   function nextSong(){
        if(songIndex<songArr.length-1){
            songIndex += 1
        }
        else{
            songIndex = 0
        }
        loadSong(songIndex)
        playSong()
   }
   // playing previous song
   function prevSong(){
        if(songIndex===0){
            songIndex = songArr.length-1
        }
        else{
            songIndex -= 1
        }
        loadSong(songIndex)
        playSong()
   }
   //song sliding and updating
   
   
   function slideTime(){
        let slide = currSong.duration *(songSlider.value/100)

        currSong.currentTime = slide
   }

   function setVolume(){
        currSong.volume = volumeSlider.value/100
   }

   //updating the values in timer of the current song
   function updating(){

       let songPosition = 0

       if(isFinite(currSong.duration)){
        songPosition = currSong.currentTime*(100/currSong.duration)
        songSlider.value = songPosition

        let currMinutes = Math.floor(currSong.currentTime/60) 
        let currSeconds = Math.floor(currSong.currentTime - currMinutes*60)
        let totalMinutes= Math.floor(currSong.duration/60)
        let totalSeconds = Math.floor(currSong.duration - totalMinutes*60)


        if(currSeconds<10){currSeconds = "0"+currSeconds}
        if(totalSeconds<10){totalSeconds = "0"+totalSeconds}
        if(totalMinutes<10){totalMinutes = "0"+totalMinutes}
        if(currMinutes<10){currMinutes = "0"+currMinutes}

       currTime.textContent = currMinutes + ":" + currSeconds
       totalTime.textContent = totalMinutes + ":" + totalSeconds
        
    }
   
   }
loadSong(songIndex)
    
   //volume sliding and updating


    // if(playBtn.innerHTML==='<i class="fa-solid fa-circle-play fa-4x"></i>'){
    //     playBtn.innerHTML = '<i class="fa-solid fa-circle-pause fa-4x"></i>'
    // }
    // else{
    //     playBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-4x"></i>'

    // }
    // iTags.forEach((e) => {e.style.color = "#0c4463";})}


//function to play the next track

