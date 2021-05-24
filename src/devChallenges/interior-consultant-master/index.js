// Variables
const menuItems = document.querySelector(".hamburger-menus");
const menuBtn = document.querySelector(".hamburger-menu-btn");
const menuClose = document.querySelector("#close");

// Events
menuBtn.addEventListener("click", handleMenuClick);
menuClose.addEventListener("click", handleMenuClose);

// Event handlers
function handleMenuClick(evt) {
  menuItems.classList.add("active");
}

function handleMenuClose(evt) {
  menuItems.classList.remove("active");
}
