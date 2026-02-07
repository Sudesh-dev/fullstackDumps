let greeting = '{"greetText":"Wishing that the new year will bring joy, love, peace, and happiness to you.","from":"Rahul","to":"Varakumar"}';

let fromElement = document.getElementById('fromElement');
let toElement = document.getElementById('toElement');
let greetTextElement = document.getElementById('greetText');

let parsedGreeting = JSON.parse(greeting);
function greet(){
    fromElement.textContent = 'From: '+ parsedGreeting.from;
    toElement.textContent = parsedGreeting.to;
    greetTextElement.textContent = parsedGreeting.greetText;
}

greet();
