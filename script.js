let searchButton = document.getElementById("starReserch");
let inputText = document.getElementById("input-text");

searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log('Clicked');
    let inputTextValue = inputText.value;

    const apiUrl = `https://striveschool-api.herokuapp.com/books`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const bookBox = document.getElementById('book-box');
            const row = bookBox.querySelector('.row');
            row.innerHTML = '';
            data.forEach(book => {
                if (book.title.toLowerCase().includes(inputTextValue)) {
                    renderBookItem(book, row);
                }
            });
        })
        .catch(error => console.error(error));
});

let cartItem;

function renderBookItem(book, row) {
    const bookItemBox = document.createElement('div');
    bookItemBox.classList.add('book-item', 'bg-dark', 'text-light', 'card', 'col-6', 'col-md-4', 'col-lg-3', 'm-1', 'p-2', 'shadow-lg');
    bookItemBox.style.width = '15rem';

    const bookItemImg = document.createElement('img');
    bookItemImg.classList.add('card-img-top');
    bookItemImg.src = book.img;
    bookItemImg.alt = 'Book Image';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const bookTitle = document.createElement('h5');
    bookTitle.classList.add('card-title');
    bookTitle.textContent = book.title;

    const bookPrice = document.createElement('p');
    bookPrice.classList.add('card-text');
    bookPrice.textContent = 'Price: ' + book.price + '$';

    const buttonContainer = document.createElement('div');

    const bookBtnShop = document.createElement('button');
    bookBtnShop.classList.add('btn', 'btn-light');
    bookBtnShop.textContent = 'Aggiungi';

    const bookBtnRemove = document.createElement('button');
    bookBtnRemove.classList.add('btn', 'btn-light');
    bookBtnRemove.textContent = 'Rimuovi';
    bookBtnRemove.style.display = 'none';

    const bookBtnVanish = document.createElement('button');
    bookBtnVanish.classList.add('btn', 'btn-light', 'ms-3');
    bookBtnVanish.textContent = 'Salta';

    const bookBtnDectails = document.createElement('button');
    bookBtnDectails.classList.add('btn', 'btn-light', 'ms-3');
    bookBtnDectails.textContent = 'Dettagli';

    bookBtnShop.addEventListener('click', function (event) {
        cartItem = document.createElement('li');
        cartItem.classList.add('dropdown-item');
        cartItem.textContent = book.title;
        let cart = document.getElementById('cart-dropdown');
        cart.appendChild(cartItem);
        bookBtnShop.style.display = 'none';
        bookBtnRemove.style.display = 'inline';
        bookPrice.textContent = 'AGGIUNTO AL CARRELLO !';
        bookPrice.style.color = 'red';
        bookPrice.style.margin = 'my-2';
    });
    bookBtnRemove.addEventListener('click', function (event) {
        if (cartItem) {
            document.getElementById('cart-dropdown').removeChild(cartItem);
            bookBtnShop.textContent = 'Aggiungi';
            bookBtnRemove.style.display = 'none';
            bookBtnShop.style.display = 'inline';
            bookPrice.textContent = 'Price: ' + book.price + '$';
            bookPrice.style.color = '';
        }
    });
    bookBtnVanish.addEventListener('click', function (event) {
        bookItemBox.style.display = 'none';
        if (bookBtnShop.style.display == 'none') {
            const cartItem = document.querySelector('.dropdown-item');
            document.getElementById('cart-dropdown').removeChild(cartItem);
        }
    });
    bookBtnDectails.addEventListener('click', function (event) {
        if (cartItem) {
            //svuoto la pg 
            // prendo la query selezionata
        }
    });
    cardBody.appendChild(bookTitle);
    cardBody.appendChild(bookPrice);
    cardBody.appendChild(buttonContainer);
    buttonContainer.appendChild(bookBtnShop);
    buttonContainer.appendChild(bookBtnRemove);
    buttonContainer.appendChild(bookBtnVanish);
    buttonContainer.appendChild(bookBtnDectails);
    bookItemBox.appendChild(bookItemImg);
    bookItemBox.appendChild(cardBody);
    row.appendChild(bookItemBox);
}
