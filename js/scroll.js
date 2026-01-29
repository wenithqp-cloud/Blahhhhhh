/* ===============================
   SMART KEYBOARD PAGE NAVIGATION
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");

  let navigating = false;

  function atTop() {
    return window.scrollY <= 0;
  }

  function atBottom() {
    return window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
  }

  window.addEventListener("keydown", (e) => {
    if (navigating) return;

    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (
      (e.key === "ArrowRight" || e.key === "d" || e.key === "D") ||
      (e.key === "ArrowDown" && atBottom())
    ) {
      if (!nextPage) return;
      navigating = true;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = nextPage.href;
      }, 300);
    }

    if (
      (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") ||
      (e.key === "ArrowUp" && atTop())
    ) {
      if (!prevPage) return;
      navigating = true;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = prevPage.href;
      }, 300);
    }
  });
});
