document.addEventListener("DOMContentLoaded", () => {
  const nextPage = document.querySelector(".next-page");
  const prevPage = document.querySelector(".prev-page");
  let navigating = false;

  function atTop() { return window.scrollY <= 0; }
  function atBottom() { return window.innerHeight + window.scrollY >= document.body.scrollHeight - 2; }

  window.addEventListener("keydown", (e) => {
    if (navigating) return;

    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    // NEXT PAGE
    if ((e.key === "ArrowRight" || e.key.toLowerCase() === "d") || (e.key === "ArrowDown" && atBottom())) {
      if (!nextPage) return;
      navigating = true;
      document.body.classList.add("fade-out");
      setTimeout(() => { window.location.href = nextPage.href; }, 300);
    }

    // PREVIOUS PAGE
    if ((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") || (e.key === "ArrowUp" && atTop())) {
      if (!prevPage) return;
      navigating = true;
      document.body.classList.add("fade-out");
      setTimeout(() => { window.location.href = prevPage.href; }, 300);
    }
  });
});
