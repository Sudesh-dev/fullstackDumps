let fromUserInputEl = document.getElementById('fromUserInput');
let toUserInputEl = document.getElementById('toUserInput');
let counterTextEl = document.getElementById('counterText');

let startBtnEl = document.getElementById('startBtn');


function displayCount(start, end) {
    let counter = start;
    counterTextEl.textContent = counter;
    let countInterval = setInterval(
        function(){
            counter += 1;
            counterTextEl.textContent = counter;
            if (counter===end){
                clearInterval(countInterval);
            }
        },1000
        );

}


function startCount() {
    let fromInput = fromUserInputEl.value;
    let toInput = toUserInputEl.value;
    if (fromInput === "") {
        alert("ENter from value");
    } else if (toInput === "") {
        alert("Enter to value");
    } else {
        let startValue = parseInt(fromInput);
        let endValue = parseInt(toInput);

        if (startValue > endValue) {
            alert("From value should be less than or equal to To value");
        } else {
            displayCount(startValue, endValue);
        }
    }
}

startBtnEl.addEventListener('click', startCount);