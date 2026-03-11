// Example Valid URLs: https://learning.ccbp.in/, https://www.google.com/

let bookmarkFormEl = document.getElementById('bookmarkForm');

let siteNameInputEl = document.getElementById('siteNameInput');
let siteNameErrMsgEl = document.getElementById('siteNameErrMsg');
let siteUrlInputEl = document.getElementById('siteUrlInput');
let siteUrlErrMsgEl = document.getElementById('siteUrlErrMsg');
let submitBtnEl = document.getElementById('submitBtn');
let bookmarksListEl = document.getElementById('bookmarksList');
let ErrMsg = "Required";


siteNameInputEl.addEventListener('change', function(event) {
    if (event.target.value === '') {
        siteNameErrMsgEl.textContent = ErrMsg;
    } else {
        siteNameErrMsgEl.textContent = '';
    }
});

siteUrlInputEl.addEventListener('change', function(event) {
    if (event.target.value === '') {
        siteUrlErrMsgEl.textContent = ErrMsg;
    } else {
        siteUrlErrMsgEl.textContent = '';
    }
});

function createAndAppendBookmark(){
    let siteName = siteNameInputEl.value;
    let url = siteUrlInputEl.value;
    
    if (siteName===""){
        siteNameErrMsgEl.textContent = ErrMsg;
    }
    if(url === ""){
        siteUrlErrMsgEl.textContent = ErrMsg;
    } 
    if(siteName!=="" && url!==""){
    siteNameErrMsgEl.textContent = '';
    siteUrlErrMsgEl.textContent = '';
    let bookMarkLi = document.createElement('li');
    bookMarkLi.classList.add('bookmark-item','mb-3');
    
    let bmSite = document.createElement('p');
    bmSite.classList.add('bm-site-name');
    bmSite.textContent = siteName;
    bookMarkLi.appendChild(bmSite);
    
    let bmUrl = document.createElement('a');
    bmUrl.href = url;
    bmUrl.textContent = url;
    bmUrl.target = '_blank';
    bookMarkLi.appendChild(bmUrl);
    
    bookmarksListEl.appendChild(bookMarkLi);
    }
}

submitBtnEl.addEventListener('click', createAndAppendBookmark);

bookmarkFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
});