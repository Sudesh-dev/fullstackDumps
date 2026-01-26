let counterElement = document.getElementById('counterValue');
function incriment(){
    let num = counterElement.textContent;
    let inc = parseInt(num) + 1 ;
    counterElement.textContent = inc;
    if (inc > 0){
        counterElement.style.color = "Green";
    }
    else if (inc < 0){
        counterElement.style.color = "Red";
        
    }
    else{
        counterElement.style.color = "Black";
        
    }
}
function reset(){
        counterElement.textContent = 0;
        counterElement.style.color = "Black";
}
function decrement(){
    let num = counterElement.textContent;
    let dec = parseInt(num) - 1 ;
    counterElement.textContent =dec;
    if (dec > 0){
        counterElement.style.color = "Green";
    }
    else if (dec < 0){
        counterElement.style.color = "Red";
        
    }
    else{
        counterElement.style.color = "Black";
        
    }
}
