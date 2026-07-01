let wordCloud = ["Hello", "hii", "how", "what", "you", "yourself", "name", "victory", "food", "lovely", "beautiful", "written", "where", "who", "awesome"];

let wordsContainerEl = document.getElementById('wordsContainer');
let errorMsgEl = document.getElementById('errorMsg');
let userInputEl = document.getElementById('userInput');
let addBtnEl = document.getElementById('addBtn');

function appendWord(items){
    let randomnumber = Math.ceil(Math.random()*50);
    let span = document.createElement('span');
    span.textContent = items;
    span.style.fontSize = randomnumber+'px';
    span.style.padding = '10px';
    wordsContainerEl.appendChild(span);
}

for(let item of wordCloud){
    appendWord(item);
}

addBtnEl.onclick = function(){
    let text = userInputEl.value;
    if (text===''){
        errorMsgEl.textContent = 'Please enter a word';
    }
    else{
    errorMsgEl.textContent = "";
    let spanEl = document.createElement('span');
    spanEl.textContent = text;
    let randomnumber = Math.ceil(Math.random()*50);
    spanEl.style.fontSize = randomnumber+'px';
    spanEl.style.padding = '10px';
    wordsContainerEl.appendChild(spanEl);
    userInputEl.value = "";
    }
};

