let numbers = [17, 31, 77, 20, 63];

let indexOfNumberEl = document.getElementById('indexOfNumber');
let userInputEl = document.getElementById('userInput');
let findBtnEl = document.getElementById('findBtn');

function findIndex(){
    let number = userInputEl.value;
    if (number===""){
        alert("Enter valid element");
    }
    else{
        let index = numbers.indexOf(parseInt(number));
        indexOfNumberEl.textContent = index;
    }
}

findBtnEl.onclick = function(){
    findIndex();
}