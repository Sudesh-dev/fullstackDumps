let gameResult = document.getElementById("gameResult");
let userInput = document.getElementById("userInput");

let randomNumber = Math.ceil(Math.random() * 100);
console.log(randomNumber);

function checkGuess() {
    let guessNumber = parseInt(userInput.value);
    gameResult.style.backgroundColor = "#1e217c";

    if (guessNumber > randomNumber) {
        gameResult.textContent = "Too high!! try again";
        gameResult.style.backgroundColor = "#1e217c";
    } else if (guessNumber < randomNumber) {
        gameResult.textContent = "Too low!! try again";
        gameResult.style.backgroundColor = "#1e217c";
    } else if (guessNumber === randomNumber) {
        gameResult.textContent = "Congratulations!!! You got it right.";
        gameResult.style.backgroundColor = "Green";

    } else {
        gameResult.textContent = "Provide a valid input";
        gameResult.style.backgroundColor = "Red";

    }

}