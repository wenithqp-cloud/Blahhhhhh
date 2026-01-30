// ===============================
// MOBILE MENU JS
// ===============================
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileDropdown = document.getElementById("mobileDropdown");

mobileBtn.addEventListener("click", () => {
  mobileDropdown.style.display =
    mobileDropdown.style.display === "flex" ? "none" : "flex";
});

// Close menu when clicking a link
mobileDropdown.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileDropdown.style.display = "none";
  });
});

// ===============================
// SWIPE NAVIGATION
// ===============================
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");

  const threshold = 50; // minimum px to trigger swipe

  if (touchEndX < touchStartX - threshold && nextPage) {
    // swipe left → next page
    window.location.href = nextPage.href;
  }
  if (touchEndX > touchStartX + threshold && prevPage) {
    // swipe right → previous page
    window.location.href = prevPage.href;
  }
}

window.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

window.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});
