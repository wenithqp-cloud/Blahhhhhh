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
// SWIPE NAVIGATION WITH SYMBOL FEEDBACK
// ===============================
let touchStartX = 0;
let touchEndX = 0;

function showSwipeSymbol(symbol) {
  // Remove previous symbol if any
  let existing = document.getElementById("swipe-symbol");
  if (existing) existing.remove();

  // Create symbol element
  const div = document.createElement("div");
  div.id = "swipe-symbol";
  div.textContent = symbol;
  div.style.position = "fixed";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.fontSize = "48px";
  div.style.color = "#fff";
  div.style.opacity = "0.8";
  div.style.pointerEvents = "none";
  div.style.zIndex = "2000";
  div.style.transition = "opacity 0.5s ease";

  document.body.appendChild(div);

  // Fade out after 0.5s
  setTimeout(() => {
    div.style.opacity = "0";
    setTimeout(() => div.remove(), 500);
  }, 300);
}

function handleGesture() {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");
  const threshold = 50;

  if (touchEndX < touchStartX - threshold && nextPage) {
    showSwipeSymbol(">"); // Right arrow → next
    setTimeout(() => { window.location.href = nextPage.href; }, 300);
  }
  if (touchEndX > touchStartX + threshold && prevPage) {
    showSwipeSymbol("<"); // Left arrow → previous
    setTimeout(() => { window.location.href = prevPage.href; }, 300);
  }
}

window.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

window.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

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
