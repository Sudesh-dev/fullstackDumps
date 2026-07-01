let puppyImage = document.getElementById('puppyImage');
let likeButton = document.getElementById('likeButton');
let likeIcon = document.getElementById('likeIcon');
let isImageLiked = false;
let puppyImageUrl = "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/white-puppy-img.png";
let likedPuppyImage = "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/white-puppy-liked-img.png";
function onClickLikeButton(){
    if (isImageLiked===false){
        puppyImage.src = likedPuppyImage;
        likeButton.style.backgroundColor = "#0967d2";
        likeButton.style.color = "#ffffff";
        likeIcon.style.color= "#0967d2";
        isImageLiked=true;
    }
    else{
        puppyImage.src = puppyImageUrl;
        likeButton.style.backgroundColor="#cbd2d9";
        likeButton.style.color = "#9aa5b1";
        likeIcon.style.color= "#9aa5b1";
        isImageLiked=false;
    }
}