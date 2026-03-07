let subscribeFormEl = document.getElementById('subscribeForm');

let nameEl = document.getElementById('name');
let nameErrEl = document.getElementById('nameErrMsg');

let emailEl = document.getElementById('email');
let emailErrEl = document.getElementById('emailErrMsg');

let errMsg = "Required*";

nameEl.addEventListener('blur',function(event){
    if(event.target.value===""){
        nameErrEl.textContent = errMsg;
    }
    else{
        nameErrEl.textContent = "";
    }
});

emailEl.addEventListener('blur',function(event){
    if(event.target.value===""){
        emailErrEl.textContent = errMsg;
    }
    else{
        emailErrEl.textContent = "";
    }
});

subscribeFormEl.addEventListener('submit',function(event){
    event.preventDefault();
})