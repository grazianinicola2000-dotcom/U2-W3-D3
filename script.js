const libraryURL = "https://striveschool-api.herokuapp.com/books";
const bookContainer = document.getElementById("cardsContainer");
const dropdownMenu = document.getElementById("dropdownMenu");

const getBooks = () => {
  fetch(libraryURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dati dei libri");
      }
    })
    .then((data) => {
      const books = data;
      for (let i = 0; i < books.length; i++) {
        const bookTitle = books[i].title;
        const bookCover = books[i].img;
        const bookPrice = books[i].price;
        const bookAsin = books[i].asin;

        bookContainer.innerHTML += `
        <div id="${bookAsin}" class="card col-12 col-md-6 col-lg-3 col-xxl-2 p-0">
          <img src="${bookCover}" class="card-img-top" alt="book_cover" />
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
                <p class="card-title">${bookTitle}</p>
                <h5 class="card-text p-0 m-0">${bookPrice}$</h5>
            </div>
            <div class="mt-2">
                <button type="button" class="btnDelete btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                <button type="button" class="btnCart btn btn-dark"><i class="fa-solid fa-cart-shopping text-light"></i></button>
            </div>
          </div>
        </div>
        `;
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
};

getBooks();

bookContainer.addEventListener("click", (e) => {
  const btnDelete = e.target.closest(".btnDelete");

  if (!btnDelete) {
    return;
  } else {
    const card = btnDelete.closest(".card");
    card.classList.add("d-none");
  }
});

// DROPDOWN CART

const LOCALSTORAGE_KEY = "cart-books";

let cart = [];

if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
  const savedCart = localStorage.getItem(LOCALSTORAGE_KEY);
  cart = JSON.parse(savedCart);
} else {
  cart = [];
}

const showCart = () => {
  dropdownMenu.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    const book = cart[i];
    dropdownMenu.innerHTML += `
            <li class="dropdown-item container bookCart">
            <button type="button" class="btnDelete btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
            <img style="width: 50px" src="${book.img}" alt="book_cover" />
            ${book.title}
            </li>
            `;
  }
};
showCart();

bookContainer.addEventListener("click", (e) => {
  const btnCart = e.target.closest(".btnCart");

  if (!btnCart) {
    return;
  } else {
    const card = btnCart.closest(".card");
    const img = card.querySelector(".card-img-top");
    const title = card.querySelector(".card-title");
    const price = card.querySelector(".card-text");
    const book = {};
    book.img = img.src;
    book.title = title.innerText;
    book.price = price.innerText;

    cart.push(book);

    dropdownMenu.innerHTML += `<li class="dropdown-item container bookCart">
            <button type="button" class="btnDelete btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
            <img style="width: 50px" src="${img.src}" alt="book_cover" />
            ${title.innerText}
          </li>`;

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cart));
  }
});

dropdownMenu.addEventListener("click", (e) => {
  const btnDelete = e.target.closest(".btnDelete");

  if (!btnDelete) {
    return;
  } else {
    const card = btnDelete.closest(".bookCart");
    card.classList.add("d-none");
    cart.pop(card);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cart));
  }
});
