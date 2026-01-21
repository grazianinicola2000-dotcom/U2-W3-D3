const libraryURL = "https://striveschool-api.herokuapp.com/books";
const bookContainer = document.getElementById("cardsContainer");

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
          <img src="${bookCover}" class="card-img-top" alt="" />
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
  const card = btnDelete.closest(".card");
  if (!btnDelete) {
    return;
  } else {
    card.classList.add("d-none");
  }
});
