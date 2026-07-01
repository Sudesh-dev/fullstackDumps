let profileContainerElement = document.getElementById('profileContainer');
let imgContainerElement = document.getElementById('imgContainer');
profileContainerElement.classList.add('d-flex','flex-column','justify-content-center','text-center');
let profileDetails = {
    imgSrc: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/user-profile-img.png",
    name: "Gitae Kim",
    age: 25
};

let profileImage = document.createElement('img');
profileImage.src = profileDetails.imgSrc;
imgContainerElement.appendChild(profileImage);

let nameElement = document.createElement('h1');
nameElement.textContent = profileDetails.name;
nameElement.classList.add('name-element');
imgContainerElement.appendChild(nameElement);

let ageElement = document.createElement('p');
ageElement.textContent = "Age : "+profileDetails.age;
ageElement.classList.add('age-element');
imgContainerElement.appendChild(ageElement);