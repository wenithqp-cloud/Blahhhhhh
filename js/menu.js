/* ===============================
   SIDE MENU HOVER + TOUCH SUPPORT
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const sideMenu = document.getElementById("sideMenu");
  if (!sideMenu) return;

  const menuLabel = sideMenu.querySelector(".menu-label");
  const links = sideMenu.querySelectorAll(".menu-content a");

  /* ---------- HOVER (DESKTOP) ---------- */
  sideMenu.addEventListener("mouseenter", () => {
    sideMenu.classList.add("expanded");
  });

  sideMenu.addEventListener("mouseleave", () => {
    sideMenu.classList.remove("expanded");
  });

  /* ---------- TOUCH / CLICK (MOBILE) ---------- */
  if (menuLabel) {
    menuLabel.addEventListener("click", (e) => {
      e.preventDefault();
      sideMenu.classList.toggle("expanded");
    });
  }

  /* ---------- ACTIVE LINK HIGHLIGHT ---------- */
  let currentPage = window.location.pathname.split("/").pop();

  // Fix for GitHub Pages root (/)
  if (currentPage === "") currentPage = "index.html";

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
