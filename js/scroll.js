document.addEventListener("DOMContentLoaded", () => {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");
  let navigating = false;

  window.addEventListener("keydown", (e) => {
    if (navigating) return;

    const tag = document.activeElement.tagName.toUpperCase();
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    const key = e.key.toLowerCase();

    // NEXT PAGE: ArrowRight, 'D', ArrowDown
    if (key === "arrowright" || key === "d" || key === "arrowdown") {
      if (!nextPage) return;
      navigating = true;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        if (nextPage.href) window.location.href = nextPage.href;
        else navigating = false;
      }, 300);
    }

    // PREVIOUS PAGE: ArrowLeft, 'A', ArrowUp
    if (key === "arrowleft" || key === "a" || key === "arrowup") {
      if (!prevPage) return;
      navigating = true;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        if (prevPage.href) window.location.href = prevPage.href;
        else navigating = false;
      }, 300);
    }
  });
});
