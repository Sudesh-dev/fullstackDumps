let imageElement = document.getElementById("image");
let warningMessage = document.getElementById('warningMessage');
let imageWidthText = document.getElementById('imageWidth');
let defaultImageWidth = 200;
let imageWidth = defaultImageWidth;

imageWidthText.textContent = defaultImageWidth+"px";
imageElement.style.width = defaultImageWidth + "px";

function decrement() {
    
    
    if (imageWidth -5 < 100) {
        
        warningMessage.textContent = "Can't Visible. Increase the size of image";
    } else {
        imageWidth -= 5;
        imageElement.style.width = imageWidth + "px";
        warningMessage.textContent = "";
        imageWidthText.textContent = imageWidth+"px";
    }
}

function increment() {
    
    if (imageWidth+5 > 300) {
        warningMessage.textContent = "Too Big. Decrease the size of the Image";
    } else {
        imageWidth += 5;
        imageElement.style.width = imageWidth + "px";
        warningMessage.textContent = "";
        imageWidthText.textContent = imageWidth+"px";
    }
}