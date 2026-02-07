let bikes = ["Hero", "Honda", "Bajaj", "Suzuki", "Yamaha"];
let person = {
    name: "Rahul",
    age: 25,
    gender: "Male",
};
let todos = [{
        todo: "Task 1",
        todoStatus: "Completed",
    },
    {
        todo: "Task 2",
        todoStatus: "Not Completed",
    },
    {
        todo: "Task 3",
        todoStatus: "Completed",
    },
];

let allLists = [bikes,person,todos];

let jsonContainerElement = document.getElementById('jsonContainer');

function createAndAppend(items){
    let detailsContainerElement = document.createElement('div');
    detailsContainerElement.classList.add('details-container');
    jsonContainerElement.appendChild(detailsContainerElement);
    
    let detailsElement = document.createElement('span');
    let details = JSON.stringify(items);
    detailsElement.textContent = details;
    detailsContainerElement.appendChild(detailsElement);
}

for (let item of allLists){
    createAndAppend(item);
}

