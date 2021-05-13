const deleteItemBtn = document.querySelector("#delete-item");
const modalWrapper = document.querySelector("#modal-wrapper");
const cancelBtn = modalWrapper.querySelector("#cancel");
const deleteBtn = modalWrapper.querySelector("#delete");

deleteItemBtn.addEventListener("click", onDeleteItem);
cancelBtn.addEventListener("click", onClick);
deleteBtn.addEventListener("click", onClick);
window.addEventListener("click", onClick);

function onDeleteItem(evt) {
  modalWrapper.classList.add("active");
}

function onClick(evt) {
  if (!evt || !evt.target) return;
  
  const isOpen = modalWrapper.classList.contains("active");
  if (isOpen && (
      evt.target.matches("#modal-wrapper") ||
      evt.target.matches("#cancel") ||
      evt.target.matches("#delete")
    )
  ) {
    modalWrapper.classList.remove("active");
  }
}
