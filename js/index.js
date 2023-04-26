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

const menuList = document.getElementById('menu-list');
const menuAddNew = document.getElementById('menu-add-new');
const menuContact = document.getElementById('menu-contact');

const listSection = document.getElementById('list-section');
const addNewSection = document.getElementById('add-new');
const contactSection = document.getElementById('contact-section');

addNewSection.style.display = 'none';
contactSection.style.display = 'none';

function displayList() {
  listSection.style.display = 'flex';
  contactSection.style.display = 'none';
  addNewSection.style.display = 'none';
}

function displayAddNew() {
  listSection.style.display = 'none';
  addNewSection.style.display = 'flex';
  contactSection.style.display = 'none';
}

function displayContact() {
  listSection.style.display = 'none';
  addNewSection.style.display = 'none';
  contactSection.style.display = 'flex';
}

menuList.addEventListener('click', displayList);
menuAddNew.addEventListener('click', displayAddNew);
menuContact.addEventListener('click', displayContact);

document.addEventListener('DOMContentLoaded', bookList.displayBooks());

// date

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const date = new Date();
const month = months[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();
let hour = date.getHours();
let minutes = date.getMinutes();
const seconds = date.getSeconds();
const ampm = hour >= 12 ? 'pm' : 'am';
hour %= 12;
hour = hour || 12;
minutes = minutes < 10 ? `0${minutes}` : minutes;
const time = `${hour}:${minutes}:${seconds} ${ampm}`;
const formattedDate = `${month} ${day}${day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'} ${year}, ${time}`; // eslint-disable-line

const dateDiv = document.querySelector('.date');
dateDiv.innerHTML = formattedDate;
dateDiv.style.textAlign = 'right';
dateDiv.style.marginRight = '0.9em';
