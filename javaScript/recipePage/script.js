let recipeObj = {
    title: "Tomato Pasta",
    imgSrc: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/recipe-img.png",
    ingredients: ["Pasta", "Oil", "Onions", "Salt", "Tomato Pasta Sauce", "Cheese"]
};

let headerElement = document.getElementById('header');
headerElement.classList.add('recipe-title');
headerElement.textContent = recipeObj.title;

let sauceImgElement = document.getElementById('sauceImg');
sauceImgElement.src = recipeObj.imgSrc;

let IngredientsListElement = document.getElementById('IngredientsList');

let ingredient = recipeObj.ingredients;

for (let item of ingredient){
    let listItem = document.createElement('li');
    listItem.textContent=item;
    listItem.classList.add('list-item');
    IngredientsListElement.appendChild(listItem);
}