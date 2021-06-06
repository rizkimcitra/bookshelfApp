const btnShowForm = document.getElementById("showingForm");
const btnClose = document.getElementById("closeForm");
const BOOK_ISNT_READ = "books";
const BOOK_IS_READ = "completed-books";
const BOOK_ID = "itemId";

const openForm = () => {
  const formArea = document.getElementById("hiddenForm");
  if (formArea) {
    return formArea.classList.add("show");
  }
};

const closeForm = () => {
  const formArea = document.getElementById("hiddenForm");
  if (formArea) {
    return formArea.classList.remove("show");
  }
};

const fixedNav = () => {
  const header = document.getElementById("headerNav");
  let yScroll = window.scrollY;
  if (yScroll >= 150) {
    header.className = "header isSmaller shadow";
  } else {
    header.className = "header isNormal shadow";
  }
};

const makeBooks = (title, author, yearReleased, descBook, isRead) => {
  const imageBook = document.createElement("img");
  imageBook.setAttribute("src", "./assets/icons/book-icon.svg");
  imageBook.classList.add("imageBook");

  const textTitle = document.createElement("h2");
  textTitle.innerText = title;

  const textAuthor = document.createElement("h5");
  textAuthor.innerText = author;

  const textYearReleased = document.createElement("p");
  textYearReleased.classList.add("book-rlsd");
  textYearReleased.innerText = yearReleased;

  const textDescription = document.createElement("p");
  textDescription.classList.add("desc-book");
  textDescription.innerText = descBook;

  const textContainer = document.createElement("div");
  textContainer.classList.add("content");
  textContainer.append(imageBook, textTitle, textAuthor, textYearReleased, textDescription);

  const container = document.createElement("div");
  container.classList.add("item", "shadowLight", "bd-rad");
  container.append(textContainer);

  if (isRead) {
    container.append(createUnreadButton(), createDeleteButton());
  } else {
    container.append(createReadButton(), createDeleteButton());
  }

  return container;
};

// membuat button undo bahwa buku batal ditandai sudah dibaca
const createUnreadButton = () => {
  return createButton("Tandai Belum Dibaca", "btn-unread", (event) => {
    changeToUnreadlist(event.target.parentElement);
  });
};

// membuat button chekclist baha buku sudah dibaca
const createReadButton = () => {
  return createButton("Tandai Selesai Dibaca", "btn-read", (event) => {
    changeToReadlist(event.target.parentElement);
  });
};

// membuat button untuk menghapus buku
const createDeleteButton = () => {
  return createButton("Hapus Buku", "btn-delete", (event) => {
    removeBookList(event.target.parentElement);
  });
};

// membuat blueprint button
const createButton = (textButton, buttonClass, eventListener) => {
  const button = document.createElement("button");
  button.innerText = textButton;
  button.classList.add(buttonClass);
  button.addEventListener("click", (event) => {
    eventListener(event);
  });
  return button;
};

const addToReadList = () => {
  const bookIsntReadYet = document.getElementById(BOOK_ISNT_READ);
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;
  const textDescription = document.getElementById("description").value;

  const book = makeBooks(titleBook, authorBook, yearBook, textDescription, false);
  const bookObject = composeBooksObject(titleBook, authorBook, yearBook, textDescription, false);

  book[BOOK_ID] = bookObject.id;
  booksData.push(bookObject);

  bookIsntReadYet.append(book);
  updateDataToStorage();
};

const addToCompletedList = () => {
  const bookHasBeenRead = document.getElementById(BOOK_IS_READ);
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;
  const textDescription = document.getElementById("description").value;

  const book = makeBooks(titleBook, authorBook, yearBook, textDescription, true);
  const bookObject = composeBooksObject(titleBook, authorBook, yearBook, textDescription, true);

  book[BOOK_ID] = bookObject.id;
  booksData.push(bookObject);

  bookHasBeenRead.append(book);
  updateDataToStorage();
};

const changeToReadlist = (booksElement) => {
  const bookHasBeenRead = document.getElementById([BOOK_IS_READ]);
  const titleBook = booksElement.querySelector(".content > h2").innerText;
  const authorBook = booksElement.querySelector(".content > h5").innerText;
  const yearBook = booksElement.querySelector(".content > .book-rlsd").innerText;
  const textDescription = booksElement.querySelector(".content > .desc-book").innerText;

  const newBook = makeBooks(titleBook, authorBook, yearBook, textDescription, true);
  const book = findBook(booksElement[BOOK_ID]);

  book.isRead = true;
  newBook[BOOK_ID] = book.id;

  bookHasBeenRead.append(newBook);
  booksElement.remove();

  updateDataToStorage();
};

const changeToUnreadlist = (booksElement) => {
  const bookIsntReadYet = document.getElementById([BOOK_ISNT_READ]);
  const titleBook = booksElement.querySelector(".content > h2").innerText;
  const authorBook = booksElement.querySelector(".content > h5").innerText;
  const yearBook = booksElement.querySelector(".content > .book-rlsd").innerText;
  const textDescription = booksElement.querySelector(".content > .desc-book").innerText;

  const newBook = makeBooks(titleBook, authorBook, yearBook, textDescription, false);
  const book = findBook(booksElement[BOOK_ID]);

  book.isRead = false;
  newBook[BOOK_ID] = book.id;

  bookIsntReadYet.append(newBook);
  booksElement.remove();

  updateDataToStorage();
};
const removeBookList = (booksElement) => {
  const bookPositon = findBookIndex(booksElement[BOOK_ID]);
  booksData.splice(bookPositon, 1);

  booksElement.remove();
  updateDataToStorage();
};

const refreshData = () => {
  const bookIsntReadYet = document.getElementById(BOOK_ISNT_READ);
  const bookHasBeenRead = document.getElementById(BOOK_IS_READ);

  for (book of booksData) {
    const newBook = makeBooks(book.title, book.author, book.yearReleased, book.desc, book.isRead);
    newBook[BOOK_ID] = book.id;

    if (book.isRead) {
      bookHasBeenRead.append(newBook);
    } else {
      bookIsntReadYet.append(newBook);
    }
  }
};

btnShowForm.addEventListener("click", () => {
  const mainSection = document.getElementById("main");
  const backDrop = document.createElement("div");
  backDrop.classList.add("backdrop");

  mainSection.append(backDrop);

  openForm();
});
btnClose.addEventListener("click", () => {
  const backDrop = document.querySelector(".backdrop");
  backDrop.remove();
  closeForm();
});
window.addEventListener("scroll", fixedNav);
