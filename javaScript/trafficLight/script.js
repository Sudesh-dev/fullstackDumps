let redLight = document.getElementById('stopLight');
let yellowLight = document.getElementById('readyLight');
let greenLight = document.getElementById('goLight');
let stopBtn = document.getElementById('stopButton');
let readyBtn = document.getElementById('readyButton');
let goBtn = document.getElementById('goButton');

function changeToRed(){
    redLight.style.backgroundColor = "#cf1124";
    yellowLight.style.backgroundColor = "#4b5069";
    greenLight.style.backgroundColor = "#4b5069";
    
    stopBtn.style.backgroundColor = "#cf1124";
    readyBtn.style.backgroundColor = "#1f1d41";
    goBtn.style.backgroundColor = "#1f1d41";
    
    
    
}
function changeToYellow(){
    yellowLight.style.backgroundColor = "#f7c948";
    redLight.style.backgroundColor = "#4b5069";
    greenLight.style.backgroundColor = "#4b5069";
    
    stopBtn.style.backgroundColor = "#1f1d41";
    readyBtn.style.backgroundColor = "#f7c948";
    goBtn.style.backgroundColor = "#1f1d41";
}
function changeToGreen(){
    greenLight.style.backgroundColor = "#199473";
    redLight.style.backgroundColor = "#4b5069";
    yellowLight.style.backgroundColor = "#4b5069";
    
    stopBtn.style.backgroundColor = "#1f1d41";
    readyBtn.style.backgroundColor = "#1f1d41";
    goBtn.style.backgroundColor = "#199473";
}