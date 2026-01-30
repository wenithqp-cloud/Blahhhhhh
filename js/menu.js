// ===============================
// DESKTOP SIDE MENU TOGGLE
// ===============================
const menu = document.getElementById("sideMenu");
if (menu) {
  const label = menu.querySelector(".menu-label");
  if (label) {
    label.addEventListener("click", () => {
      menu.classList.toggle("locked");
    });
  } else { console.warn("Menu label not found inside #sideMenu."); }
} else { console.warn("#sideMenu element not found."); }

// ===============================
// MOBILE MENU TOGGLE
// ===============================
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileDropdown = document.getElementById("mobileDropdown");

if (mobileBtn && mobileDropdown) {
  mobileBtn.addEventListener("click", () => {
    mobileDropdown.style.display =
      mobileDropdown.style.display === "flex" ? "none" : "flex";
    mobileDropdown.style.flexDirection = "column";
  });

  mobileDropdown.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileDropdown.style.display = "none";
    });
  });
}

// ===============================
// SWIPE NAVIGATION FOR MOBILE
// ===============================
let touchStartX = 0, touchEndX = 0;

function handleGesture() {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");
  const threshold = 50;

  if (touchEndX < touchStartX - threshold && nextPage) window.location.href = nextPage.href;
  if (touchEndX > touchStartX + threshold && prevPage) window.location.href = prevPage.href;
}

window.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; });
window.addEventListener("touchend", e => { touchEndX = e.changedTouches[0].screenX; handleGesture(); });

// ===============================
// RESPONSIVE: SHOW/HIDE MOBILE MENU BUTTON
// ===============================
function checkMobileMenu() {
  if (window.innerWidth > 768) {
    if (mobileBtn) mobileBtn.style.display = "none";
    if (mobileDropdown) mobileDropdown.style.display = "none";
  } else {
    if (mobileBtn) mobileBtn.style.display = "block";
  }
}

window.addEventListener("load", checkMobileMenu);
window.addEventListener("resize", checkMobileMenu);
