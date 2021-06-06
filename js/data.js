const STORAGE_KEY = "BOOKSHELF_DATA";

let booksData = [];

const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Mohon Maaf, Browser anda tidak mendukung Local Storage.");
    return false;
  }
  return true;
};
const saveData = () => {
  const parsed = JSON.stringify(booksData);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) booksData = data;
  document.dispatchEvent(new Event("ondataloaded"));
};

const updateDataToStorage = () => {
  if (isStorageExist()) {
    saveData();
  }
};

const composeBooksObject = (title, author, yearReleased, desc, isRead) => {
  return {
    id: +new Date(),
    title,
    author,
    yearReleased,
    desc,
    isRead,
  };
};

const findBook = (booksId) => {
  for (book of booksData) {
    if (book.id === booksId) return book;
  }
  return null;
};

const findBookIndex = (booksId) => {
  let index = 0;
  for (book of booksData) {
    if (book.id === booksId) return index;
    index++;
  }

  return -1;
};
