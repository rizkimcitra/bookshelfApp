document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("add-books");
  const checkbox = document.getElementById("isRead");

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const backDrop = document.querySelector(".backdrop");
    backDrop.remove();
    closeForm();
    if (checkbox.checked) {
      addToCompletedList();
    } else {
      addToReadList();
    }
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
document.addEventListener("ondataloaded", () => {
  refreshData();
});
