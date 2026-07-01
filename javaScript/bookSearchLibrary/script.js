let searchInputEl = document.getElementById('searchInput');
let searchResultseEl = document.getElementById('searchResults');
searchResultseEl.classList.add("row");
let spinnerEl = document.getElementById('spinner');


function searchForBooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove('d-none');
        searchResultseEl.classList.add('d-none');
        let title = searchInputEl.value;
        searchResultseEl.textContent = '';
        console.log(title);

        let options = {
            method: "GET"
        };

        let url = "https://apis.ccbp.in/book-store?title=" + title;

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinnerEl.classList.add('d-none');
                searchResultseEl.classList.remove('d-none');
                let total = jsonData.total;
                let noResults = document.createElement('h1');
                noResults.classList.add('mb-3','pl-3');
                if (total === 0) {
                    noResults.textContent = "No results found";
                    noResults.classList.add('text-center');
                    searchResultseEl.appendChild(noResults);
                } else {
                    noResults.textContent = "Search Results";
                    searchResultseEl.appendChild(noResults);

                    let bookList = jsonData.search_results;

                    for (let eachItem of bookList) {
                        let author = eachItem.author;
                        let imageLink = eachItem.imageLink;

                        let bookContainer = document.createElement('div');
                        bookContainer.classList.add('text-center','col-6');

                        let imageEL = document.createElement('img');
                        imageEL.src = imageLink;
                        bookContainer.appendChild(imageEL);

                        let authorEL = document.createElement('p');
                        authorEL.textContent = author;
                        bookContainer.appendChild(authorEL);

                        searchResultseEl.appendChild(bookContainer);
                    }
                }
            });



    }
}

searchInputEl.addEventListener("keydown", searchForBooks);