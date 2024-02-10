
//creazione card prendendo dati da API 
const bookBox = document.getElementById('book-box');
const row = bookBox.querySelector('.row');

const apiUrl = `https://striveschool-api.herokuapp.com/books`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(book => {
            const bookItemBox = document.createElement('div');
            bookItemBox.classList.add('book-item', 'card', 'col-md-4', 'm-1');
            bookItemBox.style.width = '13rem';
            // bookItemBox.style.height = 'max-content';

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

            const bookBtnShoop = document.createElement('button');
            bookBtnShoop.classList.add('btn', 'btn-primary');
            bookBtnShoop.textContent = 'Aggiungi al carrello';

            bookBtnShoop.addEventListener('click', function (event) {
                const cartItem = document.createElement('li');
                cartItem.classList.add('dropdown-item');
                cartItem.textContent = book.title;
                document.getElementById('cart-dropdown').appendChild(cartItem);
            });

            cardBody.appendChild(bookTitle);
            cardBody.appendChild(bookPrice);
            cardBody.appendChild(bookBtnShoop);
            bookItemBox.appendChild(bookItemImg);
            bookItemBox.appendChild(cardBody);
            row.appendChild(bookItemBox);
        })
    })
    .catch(error => console.error(error));

