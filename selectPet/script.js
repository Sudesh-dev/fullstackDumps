let petsImageUrls = {
  dog: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-dog-img.png",
  cat: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-cat-img.png",
  parrot: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-parrot-img.png",
  spider: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-spider-img.png",
  rabbit: "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/select-your-pet-rabbit-img.png"
};

let petSelectWl = document.getElementById('petSelect');
let petImgEl = document.getElementById('petImg');

petSelectWl.addEventListener('change',function(event){
    let pet = event.target.value;
    let petUrl = petsImageUrls[pet];
    petImgEl.src = petUrl;
});