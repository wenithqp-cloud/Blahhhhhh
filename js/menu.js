// Get the side menu and its label
const menu = document.getElementById("sideMenu");
if (menu) {
  const label = menu.querySelector(".menu-label");

  if (label) {
    // Toggle 'locked' class when the label is clicked
    label.addEventListener("click", () => {
      menu.classList.toggle("locked");
    });
  } else {
    console.warn("Menu label not found inside #sideMenu.");
  }
} else {
  console.warn("#sideMenu element not found.");
}
