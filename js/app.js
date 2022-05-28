//UI

const iconslayer = document.getElementById('icons-layer');
const cd = document.getElementById('cd');
const songdetails = document.getElementById('song-details');

const openbtn = document.getElementById('open');
const modal = document.getElementById('modal')
const closebtn = document.getElementById('close');

const menubtn = document.getElementById('toggle');

const currentTimeUi = document.getElementById('current-time');
const durationTimeUi = document.getElementById('duration-time');


// Audio Player layer

const playerlayer = document.getElementById('player-layer');
const title = document.getElementById('title');
const progressarea = document.getElementById('progress-area');
const progressbar = document.getElementById('progress-bar');

const audio = document.getElementById('audio');
const cover = document.getElementById('cover');

const prevbtn = document.getElementById('prev'),
    playbtn = document.getElementById('play'),
    nextbtn = document.getElementById('next');

    
const userslayer = document.getElementById('users-layer');




menubtn.addEventListener('click',(e)=>{
    // console.log('hey')

    userslayer.classList.toggle('shownav');
    iconslayer.classList.toggle('active-btn');
    cd.classList.toggle("shrink");
    songdetails.classList.toggle("shrink");

    if(e.target.classList.contains("fa-bars")) {
        e.target.classList.remove("fa-bars");
        e.target.classList.add("fa-times");
    } else {
        e.target.classList.remove("fa-times");
        e.target.classList.add("fa-bars");
    }
});



//Show Modal

openbtn.addEventListener('click',()=>{
    modal.classList.add('showmodal');
});


//Close Modal

closebtn.addEventListener('click',()=>{
    modal.classList.remove('showmodal');
});


//Hide Modal on outside click

window.addEventListener('click',(e)=>{
    if(e.target === modal){
        modal.classList.remove('showmodal');
    }
});



let songindex = 0;

//Song Title

const songs = ["Nothing Gonna Change My Love For You","All Too Well","Betty","Cardigan","Stitches","Never Be Alone","Imagination","It Will Be Okay","Legends Never Die","Best of Me"];

    // console.log(songs[songindex]);

loadsong(songs[songindex]);

function loadsong(music){
    // console.log(music);

    title.innerText = music;
    audio.src=`music/${music}.mp3`;
    // cover.src=`/image/audio${songindex || "" }.jpg`;
    cover.src=`image/${music}.jpg`;
}

audio.addEventListener("loadedmetadata", (e) => {
    durationTimeUi.innerText = toTimeStr(e.target.duration);
})


//Event Listener for Play/Pause

playbtn.addEventListener('click',()=>{
    // console.log('hey');
    // playerlayer.classList.add('play');

    const isplaying = playerlayer.classList.contains('play');

    if(isplaying){
        pausesong();
    }else{
        playsong();
    }
});


//Play Song

function playsong(){
    playerlayer.classList.add('play');

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


//Pause Song

function pausesong(){
    playerlayer.classList.remove('play');

    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}


//Change Song

prevbtn.addEventListener('click',previoussong);
nextbtn.addEventListener('click',nextsong);


//Previous Song

function previoussong(){
    //console.log('hey');
    songindex--;

    if(songindex < 0){
        songindex = songs.length - 1;
    }

    loadsong(songs[songindex]);
    playsong();
}


//Next Song

function nextsong(){
    //console.log('hey');
    songindex++;

    if(songindex > songs.length - 1){
        songindex = 0
    }

    loadsong(songs[songindex]);
    playsong();
}


function toTimeStr(currentTime) {
    const time = Math.ceil(currentTime);
    return parseInt(time / 60) + ":" + parseInt(time % 60).toLocaleString("en", {minimumIntegerDigits:2});
}

//Update Progress Bar

function updateprogress(e){
    const {currentTime,duration} = e.target;
        const progresspercent = (currentTime / duration) * 100;
            //console.log(progresspercent);
        progressbar.style.width = `${progresspercent}%`;
        currentTimeUi.innerText = toTimeStr(currentTime);
}



//Time Play and Stop Update

audio.addEventListener('timeupdate',updateprogress);


//Click On Progress Bar

progressarea.addEventListener('click',setprogress);


//Set Progress Bar

function setprogress(e){

    // const width = e.target.clientWidth;
    const width = progressarea.clientWidth;
        //console.log(width);

    const clickx = e.offsetX;
        //console.log(clickx);

    const duration = audio.duration;
        //console.log(duration);

    audio.currentTime = (clickx / width) * duration;
}


//Song End

audio.addEventListener('ended',nextsong);



// Choose Music

function getLi(node) {
    if(node.nodeName === "LI" || node.nodeName === "li") {
        return node;
    } else return getLi(node.parentElement);
}

function songClicked(event) {
    const li = getLi(event.target);
    const ul = li.parentElement;
    let songIndx = null;

    const len = ul.childElementCount;
    for(let i = 0; i < len; i++) {
        if(ul.children.item(i).isSameNode(li)) {
            songIndx = i;
            break;
        }
    }

    songindex = songIndx;
    loadsong(songs[songindex]);
    playsong();
}