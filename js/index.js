let books = [
];

function BookModel(title, author){
    this.title = title;
    this.author = author;
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
		removeBook(book);
	});

	const hrTag = document.createElement('hr');

	bookElement.appendChild(titleElement);
	bookElement.appendChild(authorElement);
	bookElement.appendChild(removeButton);
	bookElement.appendChild(hrTag);

	return bookElement;
}

const booksElement = document.querySelector('.books');

function renderBooks(books) {
    books = JSON.parse(localStorage.getItem("dataBooks") || "[]");
	for (let book of books) {
		const bookElement = createBook(book);
		booksElement.appendChild(bookElement);
	}
}

function addBook(book) {
	books.push(book);
	const bookElement = createBook(book);
	booksElement.appendChild(bookElement);
    saveData();
}

// remove function using filter method


function removeBook(book) {
    books = books.filter((item) => item.title !== book.title);
    booksElement.innerHTML = '';
    saveData();
	renderBooks(books);
}

//form

const form = document.getElementById('addBook');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const newBook = new BookModel(title, author);
	addBook(newBook);
});



function saveData (){
    localStorage.setItem('dataBooks', JSON.stringify(books));
}

window.onload = renderBooks(books);