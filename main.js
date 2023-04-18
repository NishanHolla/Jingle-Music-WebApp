const audio = document.querySelector("#audio"); 
const cover = document.querySelector("#cover");
const player = document.querySelector("#player");
const pl =document.querySelector("#play");
const p3 =document.querySelector(".play3");
const pa =document.querySelector("#pause");
const nxt =document.querySelector("#nextsong");
const prev =document.querySelector("#prevsong");
const title =document.querySelector("#song");
const rec11=document.querySelector(".rec1");
const rec22=document.querySelector(".rec2");
const rec33=document.querySelector(".rec3");
const songs=["onmyway","ghost","onedance"];
const tit1 =document.querySelector("#tit1");
const tit2 =document.querySelector("#tit2");
const tit3 =document.querySelector("#tit3");
const progress =document.querySelector(".progress");
const progresscont =document.querySelector(".progress-container");
const search =document.querySelector("#searchbar");
const recomend =document.querySelector("#recomend");
tit1.innerHTML=songs[0];
tit2.innerHTML=songs[1];
tit3.innerHTML=songs[2];
rec11.addEventListener("click",()=> clicknplay(0));
rec22.addEventListener("click",()=> clicknplay(1));
rec33.addEventListener("click",()=> clicknplay(2));
var songindex;
songindex=0;
loadsong();
function clicknplay(songindex){
    getsong(songindex);
    play();
}
function nextsong(){
    songindex++;
    if(songindex>songs.length-1){
        songindex=0;
    }
    loadsong();
    play();    
}    
function prevsong(){
    songindex--;
    if(songindex<0){ 
        songindex=songs.length-1;
    }    
    loadsong();
    play();
}
function play(){
    pl.style.display="none";
    pa.style.display="block";
    audio.play();   
}
function loadsong(){
    title.innerHTML=songs[songindex];
    audio.src=`./music/${songs[songindex]}.mp3`;
    cover.src=`./images/${songs[songindex]}.jpg`;
}
function getsong(songindex){
    title.innerHTML=songs[songindex];
    audio.src=`./music/${songs[songindex]}.mp3`;
    cover.src=`./images/${songs[songindex]}.jpg`;
}
function pause(){
    pa.style.display="none";
    pl.style.display="block";
    audio.pause();
}
function UpdateProgress(e){
    const { duration,currentTime }=e.srcElement;
    const progressperc = (currentTime/duration) *100;
    progress.style.width=`${progressperc}%`;
}
function setprogress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width)*duration;
}
audio.addEventListener('timeupdate',UpdateProgress)        
pa.addEventListener("click",pause);
pl.addEventListener("click",play);
nxt.addEventListener("click",nextsong);
prev.addEventListener("click",prevsong);
rec11.addEventListener("mouseover",()=>
{
    p3.style.display="block"
    p3.style.left="170px";
});
rec11.addEventListener("mouseout",()=>{p3.style.display="none"});
rec22.addEventListener("mouseover",()=>
{
    p3.style.display="block";
    p3.style.left="500px";
});
rec22.addEventListener("mouseout",()=>{p3.style.display="none"});
rec33.addEventListener("mouseover",()=>
{
    p3.style.display="block"
    p3.style.left="830px";
});
rec33.addEventListener("mouseout",()=>{p3.style.display="none"});
progresscont.addEventListener('click',setprogress);
audio.addEventListener('ended',nextsong);

// function search(){
//      if(search.value!==0){
        
//      }
// }
function recommendations(){
    let len=search.value;
    for(let j=0;j<3;j++){
            if(songs[j].includes(len)){
                const rec=document.createElement("li");
                rec.innerHTML=songs[j];
                recomend.appendChild(rec);
                setTimeout(()=>{
                    recomend.removeChild(rec);
                },3000);
            }
    }
}
search.addEventListener('keypress',function(event){
    if(event.key==='Enter'){
        recommendations();
    }
});