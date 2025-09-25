const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  renderLibrary();
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

function renderLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = ""; // Clear before rendering

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? "✅ Read" : "📖 Not read"}</p>
    `;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.classList.add("toggle");
    toggleBtn.onclick = () => {
      book.toggleRead();
      renderLibrary();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.onclick = () => removeBook(book.id);

    card.appendChild(toggleBtn);
    card.appendChild(removeBtn);

    libraryDiv.appendChild(card);
  });
}

const dialog = document.getElementById("bookDialog");
const form = document.getElementById("bookForm");
const newBookBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");

newBookBtn.addEventListener("click", () => dialog.showModal());

cancelBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  form.reset();
  dialog.close();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);
