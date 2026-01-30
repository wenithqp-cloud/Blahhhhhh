document.addEventListener("DOMContentLoaded", () => {
  // Only apply dropdown behavior on mobile
  if (window.innerWidth > 768) return;

  const paragraphs = document.querySelectorAll(".main-content p");

  paragraphs.forEach(p => {
    const strong = p.querySelector("strong");
    if (!strong) return;

    const titleText = strong.innerHTML;
    const contentText = p.innerHTML.replace(strong.outerHTML, "").trim();

    const wrapper = document.createElement("div");
    wrapper.className = "exp-item";

    const title = document.createElement("div");
    title.className = "exp-title";
    title.innerHTML = titleText;

    const content = document.createElement("div");
    content.className = "exp-content";
    content.innerHTML = contentText;

    title.addEventListener("click", () => {
      wrapper.classList.toggle("active");
    });

    wrapper.appendChild(title);
    wrapper.appendChild(content);

    p.replaceWith(wrapper);
  });
});
