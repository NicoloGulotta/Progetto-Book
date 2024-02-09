let buttonSearch = document.getElementById("starReserch");
let inputText = document.getElementById("input-text");

buttonSearch.addEventListener("click", function() {
  let inputTextValue = inputText.value;
  console.log(inputTextValue);
    const apiUrl = `https://striveschool-api.herokuapp.com/books?q=${inputTextValue}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const myDiv = document.getElementById('book-box');
        myDiv.innerHTML = '';
  
        data.forEach(book => {
          console.log(book);
          const bookCard =document.createElement('li');
          bookCard.classList.add('list-group-item')
          const bookImg = document.createElement('img');
          bookImg.src = book.image;
          bookCard.appendChild(bookImg);
          myDiv.appendChild(bookCard);
        });
      })
      .catch(error => console.error(error));
  });
