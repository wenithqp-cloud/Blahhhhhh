document.addEventListener("DOMContentLoaded", () => {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");
  let navigating = false;

  // Smooth scroll helper
  function smoothScroll(amount) {
    window.scrollBy({
      top: amount,
      left: 0,
      behavior: "smooth"
    });
  }

  window.addEventListener("keydown", (e) => {
    if (navigating) return;

    const tag = document.activeElement.tagName.toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    const key = e.key.toLowerCase();

    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;

    // NEXT PAGE: Right/D/Down
    if (key === "arrowright" || key === "d" || key === "arrowdown") {
      if (!nextPage) return;

      if (scrollY + viewport < scrollHeight - 2) {
        // Scroll halfway down first
        smoothScroll(viewport / 2);
      } else {
        navigating = true;
        document.body.classList.add("fade-out");
        setTimeout(() => {
          if (nextPage.href) window.location.href = nextPage.href;
          else navigating = false;
        }, 300);
      }
    }

    // PREVIOUS PAGE: Left/A/Up
    if (key === "arrowleft" || key === "a" || key === "arrowup") {
      if (!prevPage) return;

      if (scrollY > 2) {
        // Scroll halfway up first
        smoothScroll(-viewport / 2);
      } else {
        navigating = true;
        document.body.classList.add("fade-out");
        setTimeout(() => {
          if (prevPage.href) window.location.href = prevPage.href;
          else navigating = false;
        }, 300);
      }
    }
  });
});
