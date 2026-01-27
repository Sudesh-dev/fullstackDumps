let bgColour = document.getElementById('colorPickerContainer');
let spenElement = document.getElementById('selectedColorHexCode');
function changeToGrey(){
    bgColour.style.backgroundColor ="#e0e0e0";
    spenElement.textContent = "#e0e0e0";
}
function changeToGreen(){
    bgColour.style.backgroundColor ="#6fcf97";
    spenElement.textContent = "#6fcf97";
}
function changeToBlue(){
    bgColour.style.backgroundColor ="#56ccf2";
    spenElement.textContent = "#56ccf2";
}
function changeToPurple(){
    bgColour.style.backgroundColor ="#bb6bd9";
    spenElement.textContent = "#bb6bd9";
}