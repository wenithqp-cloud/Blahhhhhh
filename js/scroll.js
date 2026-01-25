// Scroll to next/previous pages using hidden links
const nextPage = document.querySelector(".next-page");
const prevPage = document.querySelector(".prev-page");

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" && nextPage) window.location.href = nextPage.href;
  if (e.key === "ArrowLeft" && prevPage) window.location.href = prevPage.href;
});
