let firstNumberElement = document.getElementById('firstNumber');
let secondNumberElement = document.getElementById('secondNumber');
let gameResultElement = document.getElementById('gameResult');
let userInputElement = document.getElementById('userInput');
let restartButtonElement = document.getElementById('restartButton');
let checkButtonElement = document.getElementById('checkButton');

let randomNumber1 = Math.ceil(Math.random() * 100);
let randomNumber2 = Math.ceil(Math.random() * 100);


function showRandom() {
    firstNumberElement.textContent = randomNumber1;
    secondNumberElement.textContent = randomNumber2;
}
showRandom();

restartButtonElement.onclick = function() {
    let randomNumber1 = Math.ceil(Math.random() * 100);
    let randomNumber2 = Math.ceil(Math.random() * 100);
    firstNumberElement.textContent = randomNumber1;
    secondNumberElement.textContent = randomNumber2;
    gameResultElement.textContent = "";
    userInputElement.value = "";
}
checkButtonElement.onclick = function() {
    let num1 = parseInt(firstNumberElement.textContent);
    let num2 = parseInt(secondNumberElement.textContent);
    let result = num1 + num2;
    let sum = parseInt(userInputElement.value);
    if (result === sum) {
        gameResultElement.textContent = "Congratulations! You got it right.";
        gameResultElement.style.backgroundColor = "#028a0f";
    } else {
        gameResultElement.textContent = "Please try again!";
        gameResultElement.style.backgroundColor = "#1e217c";
    }
}