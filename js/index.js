let books = [];
const booksElement = document.querySelector('.books');

function BookModel(title, author) {
  this.title = title;
  this.author = author;
}

function saveData() {
  localStorage.setItem('dataBooks', JSON.stringify(books));
}

function createBook(book) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('title');
  titleElement.textContent = book.title;

  const authorElement = document.createElement('h3');
  authorElement.classList.add('author');
  authorElement.textContent = book.author;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    removeBook(book);  // eslint-disable-line
  });

  const hrTag = document.createElement('hr');

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorElement);
  bookElement.appendChild(removeButton);
  bookElement.appendChild(hrTag);

  return bookElement;
}

function renderBooks(books) {
  books = JSON.parse(localStorage.getItem('dataBooks') || '[]');
  books.forEach((book) => {
    const bookElement = createBook(book);
    booksElement.appendChild(bookElement);
  });
}

function removeBook(book) {
  if (localStorage.getItem('dataBooks')) {
    books = JSON.parse(localStorage.getItem('dataBooks'));
  }
  books = books.filter((item) => item.title !== book.title);
  booksElement.innerHTML = '';
  saveData();
  renderBooks(books);
}

function addBook(book) {
  books.push(book);
  const bookElement = createBook(book);
  booksElement.appendChild(bookElement);
  saveData();
}

// form

const form = document.getElementById('addBook');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const newBook = new BookModel(title, author);
  addBook(newBook);
});

window.onload = renderBooks(books);
