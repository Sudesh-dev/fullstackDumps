let timerEl = document.getElementById('timer');
let quoteInputEl = document.getElementById('quoteInput');
let quoteDisplayEl = document.getElementById('quoteDisplay');
let submitBtnEl = document.getElementById('submitBtn');
let resultEl = document.getElementById('result');
let resetBtnEl = document.getElementById('resetBtn');
let spinnerEl = document.getElementById('spinner');
let speedTypingTest = document.getElementById('speedTypingTest');
let countDown = 0;
let intervalId;
let quote = "";

function getQuote() {

    spinnerEl.classList.remove('d-none');
    speedTypingTest.classList.add('d-none');

    fetch("https://apis.ccbp.in/random-quote")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            quote = data.content;
            quoteDisplayEl.textContent = quote;

            spinnerEl.classList.add('d-none');
            speedTypingTest.classList.remove('d-none');

            intervalId = setInterval(function() {
                countDown++;
                timerEl.textContent = countDown;
            }, 1000);
        });
}

submitBtnEl.addEventListener('click', function(event) {

    event.preventDefault();

    let typedText = quoteInputEl.value;

    if (typedText === quote) {
        resultEl.textContent = "You typed in " + countDown + " seconds";
        clearInterval(intervalId);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});

resetBtnEl.addEventListener('click', function() {

    clearInterval(intervalId);

    countDown = 0;
    timerEl.textContent = 0;

    quoteInputEl.value = "";
    resultEl.textContent = "";

    spinnerEl.classList.remove('d-none');

    getQuote();
});

getQuote();