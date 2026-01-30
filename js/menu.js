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

  // Close menu when clicking a link
  mobileDropdown.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileDropdown.style.display = "none";
    });
  });
}

// ===============================
// SWIPE NAVIGATION FOR MOBILE
// ===============================
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");
  const threshold = 50;

  if (touchEndX < touchStartX - threshold && nextPage) {
    window.location.href = nextPage.href;
  }
  if (touchEndX > touchStartX + threshold && prevPage) {
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
