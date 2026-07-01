let startIndexInputEl = document.getElementById('startIndexInput');
let deleteCountInputEL = document.getElementById('deleteCountInput');
let itemToAddInputEl = document.getElementById('itemToAddInput');
let spliceBtnEl = document.getElementById('spliceBtn');
let updatedArrayEl = document.getElementById('updatedArray');

let arr = [1, 7, 3, 1, 0, 20, 77];

updatedArrayEl.textContent = JSON.stringify(arr);

function updateArray() {
    let startIndex = parseInt(startIndexInputEl.value);
    let deleteCount = parseInt(deleteCountInputEL.value);
    let itemToAdd = itemToAddInputEl.value;

    let updatedArray = arr;
    
    if (startIndex===""){
        alert('Please Enter start index');
    }
    if (deleteCount===""){
        deleteCount=0;
    }
    if (itemToAdd===""){
        updatedArray.splice(startIndex, deleteCount);
    }
    else{
        updatedArray.splice(startIndex, deleteCount, itemToAdd);
    }
    updatedArrayEl.textContent = JSON.stringify(updatedArray);

    startIndexInputEl.textContent = "";
    deleteCountInputEL.textContent = "";
    itemToAddInputEl.textContent = "";
}

spliceBtnEl.onclick = function() {
    updateArray();
};