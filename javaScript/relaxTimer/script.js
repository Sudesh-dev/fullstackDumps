let twentySecondsBtn = document.getElementById('twentySecondsBtn');
let thirtySecondsBtn = document.getElementById('thirtySecondsBtn');
let fortySecondsBtn = document.getElementById('fortySecondsBtn');
let oneMinuteBtn = document.getElementById('oneMinuteBtn');

let timerText = document.getElementById('timerText');

let intervalId; 
function startCounter(time) {
    clearInterval(intervalId);   
    let counter = time;

    timerText.textContent = counter + " seconds left";

    intervalId = setInterval(function () {
        counter--;

        if (counter >= 0) {
            timerText.textContent = counter + " seconds left";
        } else {
            clearInterval(intervalId);
        }

    }, 1000);
}

twentySecondsBtn.onclick = function() {
    startCounter(20);
};

thirtySecondsBtn.onclick = function() {
    startCounter(30);
};

fortySecondsBtn.onclick = function() {
    startCounter(40);
};

oneMinuteBtn.onclick = function() {
    startCounter(60);
};