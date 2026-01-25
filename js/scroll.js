/* ===============================
   SCROLL NAVIGATION
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  // Find hidden next/prev page links
  const nextPageLink = document.querySelector("a.next-page");
  const prevPageLink = document.querySelector("a.prev-page");

  // Use arrow keys or swipe to navigate
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && nextPageLink) {
      window.location.href = nextPageLink.getAttribute("href");
    } else if (e.key === "ArrowLeft" && prevPageLink) {
      window.location.href = prevPageLink.getAttribute("href");
    }
  });

  // Optional: smooth scroll to top when navigating
  const links = document.querySelectorAll(".menu-content a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // prevent default jump
      const href = link.getAttribute("href");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        window.location.href = href;
      }, 200); // small delay to allow smooth scroll
    });
  });
});
