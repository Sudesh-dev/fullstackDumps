let groceryList = ["Apples", "Boost Drink", "Butterscotch Ice Cream", "Tomato Ketchup", "Dairy Milk Chocolates", "Pasta"];

let groceryListContainer= document.getElementById('groceryListContainer');
groceryListContainer.classList.add('grocery-list-container');

let groceryHeaderElement= document.createElement('h1');
groceryHeaderElement.textContent="Grocery List";
groceryHeaderElement.classList.add('grocery-header');
groceryListContainer.appendChild(groceryHeaderElement);

let groceryItemsContainer = document.createElement('ul');
groceryItemsContainer.classList.add('grocery-items-container');
groceryListContainer.appendChild(groceryItemsContainer);


for (let item of groceryList){
    let groceryItem = document.createElement('li');
    groceryItem.textContent = item;
    groceryItemsContainer.appendChild(groceryItem);
}

