let hoursInput = document.getElementById('hoursInput');
let minutesInput = document.getElementById('minutesInput');
let convertBtn = document.getElementById('convertBtn');
let errorMsg = document.getElementById('errorMsg');
let timeInSeconds = document.getElementById('timeInSeconds'); 

errorMsg.textContent = "";

function convertToSeconds(hr,min){
    let seconds = 0;
    seconds = (hr*3600)+(min*60);
    timeInSeconds.classList.add('time-in-seconds');
    timeInSeconds.textContent = seconds+'s';
}

function onButtonClick(){
    if (hoursInput.value===""){
        errorMsg.textContent = "Please enter a valid number of hours";
        timeInSeconds.classList.remove('time-in-seconds');
        timeInSeconds.textContent="";
    }
    else if (minutesInput.value===""){
        errorMsg.textContent = "Please enter a valid number of minutes";
        timeInSeconds.classList.remove('time-in-seconds');
        timeInSeconds.textContent="";
    }
    else{
        errorMsg.textContent = "";
        let hours = parseInt(hoursInput.value);
        let minutes = parseInt(minutesInput.value);
        convertToSeconds(hours,minutes);
        hoursInput.value="";
        minutesInput.value="";
    }
}

convertBtn.addEventListener('click',onButtonClick);
