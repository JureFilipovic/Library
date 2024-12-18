const myLibrary = [];

// function Book (title, author, pages, haveRead) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.haveRead = haveRead;
// }

class Book {
    constructor (title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

function addBookToLibrary (book) {
    if (!myLibrary.includes (book)) {
        myLibrary.push (book);
    }
}

function changeReadStatus (index) {
    myLibrary[index].haveRead = !myLibrary[index].haveRead;
}

function removeBookFromLibrary (index) {
    myLibrary.splice(index, 1);
}


function displayLibrary () {
    const bookList = document.getElementById ("bookList");
    bookList.innerHTML = "";

    myLibrary.forEach (function (book, index) {
        const bookDiv = document.createElement ("div");
        bookDiv.classList.add ("book");

        const title = document.createElement ("h3");
        title.textContent = book.title;

        const author = document.createElement ("p");
        author.textContent = "Author: " + book.author;

        const pages = document.createElement ("p");
        pages.textContent = "Number of pages: " + book.pages;

        const readStatus = document.createElement ("p");
        readStatus.textContent = `Read: ${book.haveRead ? "Yes" : "No"}`;

        const changeReadStatusButton = document.createElement ("button");
        changeReadStatusButton.textContent = "Change read status";
        changeReadStatusButton.setAttribute ("data-index", index);
        changeReadStatusButton.classList.add ("changeStatus")

        const removeButton = document.createElement ("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute ("data-index", index);
        removeButton.classList.add ("removeButton");
        removeButton.classList.add ("remove")

        bookDiv.appendChild (title);
        bookDiv.appendChild (author);
        bookDiv.appendChild (pages);
        bookDiv.appendChild (readStatus);
        bookDiv.appendChild (changeReadStatusButton);
        bookDiv.appendChild (removeButton);

        bookList.appendChild (bookDiv);

        changeReadStatusButton.addEventListener ("click", (e) => {
            const index = e.target.getAttribute ("data-index");
            changeReadStatus (index);
            displayLibrary ();
        });

        removeButton.addEventListener ("click", (e) => {
            const index = e.target.getAttribute ("data-index");
            removeBookFromLibrary (index);
            displayLibrary ();
        });
        
    });
}

const newBookButton = document.getElementById("newBookButton");
const formContainer = document.getElementById("formContainer");
const closeBtn = document.querySelector(".close");

newBookButton.addEventListener ("click", () => {

    closeBtn.addEventListener ("click", () => {
        formContainer.style.display = "none";
    });

    window.addEventListener ("click", (event) => {
        if (event.target === formContainer) {
            formContainer.style.display = "none";
        }
    })

    if(formContainer.style.display === "none" ||
        formContainer.style.display === "") {
            formContainer.style.display = "flex";

        } else {
            formContainer.style.display = "none";
        }
});

document.querySelector("form").addEventListener ("submit", function (e) {
    e.preventDefault ();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const selectedRadio = document.querySelector(`input[name="haveRead]:checked`);
    const haveRead = selectedRadio ? selectedRadio.id === "yes" : false;

    const newBook = new Book (title, author, pages, haveRead);
    addBookToLibrary (newBook);

    displayLibrary ();

    formContainer.style.display = "none";
    document.querySelector("form").reset();
});