let questionsFormEl = document.getElementById('questionsForm');

let resultMsgEl = document.getElementById('resultMsg');
let errorMsg = "Please select the answer!";
let correctMsg = "Correct answer!";
let wrongMsg = "Wrong answer!";

let answer = "";

let cityHyderabadEL = document.getElementById('cityHyderabad');
cityHyderabadEL.addEventListener('change',function(event){
    answer = event.target.value;
});
let cityChennaiEl = document.getElementById('cityChennai');
cityChennaiEl.addEventListener('change',function(event){
    answer = event.target.value;
});
let cityDelhiEl = document.getElementById('cityDelhi');
cityDelhiEl.addEventListener('change',function(event){
    answer = event.target.value;
});
let cityMumbaiEl = document.getElementById('cityMumbai');
cityMumbaiEl.addEventListener('change',function(event){
    answer = event.target.value;
});

questionsFormEl.addEventListener('submit',function(event){
    event.preventDefault();
    
    if(answer===""){
        resultMsgEl.textContent = errorMsg;
    }
    else if(answer==="delhi"){
        resultMsgEl.textContent = correctMsg;
    }
    else{
        resultMsgEl.textContent = wrongMsg;
    }
});