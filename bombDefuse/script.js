let timerEl = document.getElementById('timer');
let defuserEl = document.getElementById('defuser');

let countDown = 10;
let intervalId = setInterval(
    function(){
        countDown-=1;
        timerEl.textContent = countDown;
        if(countDown===0){
            timerEl.textContent = 'BOOM';
            clearInterval(intervalId);
        }
    },1000
);

function diffuse(event){
    let defuserValue = defuserEl.value;
    if(event.key==='Enter' && defuserValue==='defuse' && countDown!==0){
        timerEl.textContent = "Bomb Defused Successfully!";
        clearInterval(intervalId);
    }
}

defuserEl.addEventListener('keydown',diffuse);