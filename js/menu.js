document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DESKTOP SIDE MENU LOCK
     =============================== */
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu) {
    const label = sideMenu.querySelector(".menu-label");
    if (label) {
      label.addEventListener("click", () => {
        sideMenu.classList.toggle("locked");
      });
    }
  }

  /* ===============================
     MOBILE MENU TOGGLE
     =============================== */
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileDropdown = document.getElementById("mobileDropdown");

  if (mobileBtn && mobileDropdown) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileDropdown.style.display =
        mobileDropdown.style.display === "block" ? "none" : "block";
    });

    mobileDropdown.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileDropdown.style.display = "none";
      });
    });

    document.addEventListener("click", () => {
      mobileDropdown.style.display = "none";
    });
  }

  /* ===============================
     MOBILE EXPERIENCE DROPDOWNS
     =============================== */
  document.querySelectorAll(".exp-title").forEach(title => {
    title.addEventListener("click", () => {
      title.parentElement.classList.toggle("active");
    });
  });

  /* ===============================
     SWIPE NAVIGATION
     =============================== */
  let startX = 0;

  function showSwipe(symbol) {
    const el = document.createElement("div");
    el.textContent = symbol;
    el.style.position = "fixed";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%, -50%)";
    el.style.fontSize = "48px";
    el.style.opacity = "0.8";
    el.style.color = "#fff";
    el.style.zIndex = "3000";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 500);
  }

  window.addEventListener("touchstart", e => {
    startX = e.changedTouches[0].screenX;
  });

  window.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - startX;
    const threshold = 50;

    const next = document.querySelector(".next-page");
    const prev = document.querySelector(".prev-page");

    if (diff < -threshold && next) {
      showSwipe(">");
      setTimeout(() => location.href = next.href, 300);
    }

    if (diff > threshold && prev) {
      showSwipe("<");
      setTimeout(() => location.href = prev.href, 300);
    }
  });

});
