let updatePasswordFormEl = document.getElementById('updatePasswordForm');

let newPasswordEl = document.getElementById('newPassword');
let newPasswordErrMsgEl = document.getElementById('newPasswordErrMsg');

let confirmPasswordEl = document.getElementById('confirmPassword');
let confirmPasswordErrMsgEl = document.getElementById('confirmPasswordErrMsg');

let updateBtnEl = document.getElementById('updateBtn');

let errMsg = "Required*";

newPasswordEl.addEventListener('blur',function(event){
    if(event.target.value===''){
        newPasswordErrMsgEl.textContent = errMsg;
    }
    else{
        newPasswordErrMsgEl.textContent = '';
    }
});

confirmPasswordEl.addEventListener('blur',function(event){
    if(event.target.value===''){
        confirmPasswordErrMsgEl.textContent = errMsg;
    }
    else{
        confirmPasswordErrMsgEl.textContent = '';
    }
});

updatePasswordFormEl.addEventListener('submit',function(event){
    event.preventDefault();
    
    if (newPasswordEl.value === '') {
        newPasswordErrMsgEl.textContent = "Required*";
    } else {
        newPasswordErrMsgEl.textContent = '';
    }
    
    if (confirmPasswordEl.value === '') {
        confirmPasswordErrMsgEl.textContent = "Required*";
    } else {
        confirmPasswordErrMsgEl.textContent = '';
    }

    if (newPasswordEl.value !== confirmPasswordEl.value) {
        confirmPasswordErrMsgEl.textContent = "Passwords must be the same";
    }
});