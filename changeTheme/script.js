let bgContainer = document.getElementById('bgContainer');
let heading = document.getElementById('heading');
let themeUserInput = document.getElementById('themeUserInput');

let darkBg = 'url(https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/change-theme-dark-bg.png)';
let lightBg = 'url(https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/change-theme-light-bg.png)';

function changeTheme(event){
    if (event.key==="Enter"){
        let text = themeUserInput.value;
    
    if (text==="Dark" && event.key==="Enter"){
    bgContainer.style.backgroundImage =darkBg;
    heading.style.color = 'white';
    text = "";
    }
    else if (text==="Light" && event.key==="Enter"){
    bgContainer.style.backgroundImage =lightBg;
    heading.style.color = 'black';
    text = "";
    }
    else{
        alert("Enter valid input");
    }
}
}




themeUserInput.addEventListener('keydown',changeTheme);