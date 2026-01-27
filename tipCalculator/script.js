let billAmountElement = document.getElementById('billAmount');
let percentagerTipElement = document.getElementById('percentageTip');
let tipAmountElement = document.getElementById('tipAmount');
let totalAmountElement = document.getElementById('totalAmount');
let errorMessageElement = document.getElementById('errorMessage');
let errorMessage = "Please Enter a Valid Input";
function calculate(){
    let percentageTip = percentagerTipElement.value;
    let billAmount = billAmountElement.value;
    
    if (billAmount ===""){
        errorMessageElement.textContent = errorMessage;
    }
    else if(percentageTip===""){
        errorMessageElement.textContent = errorMessage;
    }
    else{
    billAmount = parseInt(billAmount);
    percentageTip = parseInt(percentageTip);
    let calculatedTip = (percentageTip/100) * billAmount;
    let totalAmount = billAmount + calculatedTip;
    tipAmountElement.value = calculatedTip;
    totalAmountElement.value = totalAmount;
    errorMessageElement.textContent = "";
    }
}