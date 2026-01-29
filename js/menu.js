const menu = document.getElementById("sideMenu");
const label = menu.querySelector(".menu-label");

label.addEventListener("click", () => {
  menu.classList.toggle("locked");
});
