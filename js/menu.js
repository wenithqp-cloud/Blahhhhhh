/* ===============================
   SIDE MENU HOVER + TOUCH SUPPORT
   =============================== */
/* SIDE MENU HOVER */
const sideMenu = document.getElementById("sideMenu");
sideMenu.addEventListener("mouseenter", () => sideMenu.classList.add("expanded"));
sideMenu.addEventListener("mouseleave", () => sideMenu.classList.remove("expanded"));

document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.getElementById("sideMenu");

  if (!sideMenu) return; // Exit if menu not found

  // Expand/collapse on mouse hover
  sideMenu.addEventListener("mouseenter", () => sideMenu.classList.add("expanded"));
  sideMenu.addEventListener("mouseleave", () => sideMenu.classList.remove("expanded"));

  // Optional: toggle menu on click for touch devices
  const menuLabel = sideMenu.querySelector(".menu-label");
  menuLabel.addEventListener("click", () => {
    sideMenu.classList.toggle("expanded");
  });

  // Highlight active menu link based on current page
  const currentPath = window.location.pathname.split("/").pop(); // get file name
  const links = sideMenu.querySelectorAll(".menu-content a");

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
