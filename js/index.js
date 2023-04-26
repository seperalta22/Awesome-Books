const booksContainer = document.querySelector('.books');
const form = document.getElementById('addBook');
const title = document.getElementById('title');
const author = document.getElementById('author');

class BookList {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (localStorage.getItem('localData') === null) {
      localStorage.setItem('localData', JSON.stringify([]));
      this.books.push(book);
      localStorage.setItem('localData', JSON.stringify(this.books));
      window.location = window.location.pathname;
    } else {
      this.books = JSON.parse(localStorage.getItem('localData'));
      this.books.push(book);
      localStorage.setItem('localData', JSON.stringify(this.books));
      window.location = window.location.pathname;
    }
  }

  removeBook(title) {
    this.books = JSON.parse(localStorage.getItem('localData'));
    this.books.forEach((book, index) => {
      if (book.title === title) {
        this.books.splice(index, 1);
      }
    });
    localStorage.setItem('localData', JSON.stringify(this.books));
    window.location = window.location.pathname;
  }

  displayBooks() {
    this.books = JSON.parse(localStorage.getItem('localData'));
    this.books.forEach((book) => {
      const div = document.createElement('div');
      div.classList.add('book');
      div.innerHTML = `
            <h3 class="title" >${book.title}</h3>
            <p>by ${book.author}</p>
            <button class="remove">Remove</button>
            `;
      booksContainer.appendChild(div);
    });
  }

  clearFields() {
    this.title.value = '';
    this.author.value = '';
  }
}

const bookList = new BookList();

// event listeners

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = {
    title: title.value,
    author: author.value,
  };
  bookList.addBook(book);
  bookList.clearFields();
});

booksContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    bookList.removeBook(
      e.target.previousElementSibling.previousElementSibling.textContent,
    );
  }
});

// display windows

const menuList = document.getElementById("menu-list");
const menuAddNew = document.getElementById("menu-add-new");
const menuContact = document.getElementById("menu-contact");

const listSection = document.getElementById("list-section");
const addNewSection = document.getElementById("add-new");
const contactSection = document.getElementById("contact-section");

function displayList () {
    contactSection.style.display = "none";
    addNewSection.style.display = "none";
}

menuList.addEventListener('click', displayList);

document.addEventListener('DOMContentLoaded', bookList.displayBooks());