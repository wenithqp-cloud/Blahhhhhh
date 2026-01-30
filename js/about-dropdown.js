document.addEventListener("DOMContentLoaded", () => {
  // Only apply on mobile
  if (window.innerWidth > 768) return;

  const paragraphs = document.querySelectorAll(".main-content p");

  paragraphs.forEach(p => {
    // Skip if no strong element
    const strong = p.querySelector("strong");
    
    // Wrap all paragraphs for dropdown if you want full paragraph clickable
    const wrapper = document.createElement("div");
    wrapper.className = "exp-item";

    // If <strong> exists, make it the clickable title
    if (strong) {
      const titleText = strong.innerHTML;
      const contentText = p.innerHTML.replace(strong.outerHTML, "").trim();

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
    } else {
      // If no <strong>, just show paragraph as content
      const content = document.createElement("div");
      content.className = "exp-content";
      content.innerHTML = p.innerHTML;
      wrapper.appendChild(content);
      wrapper.classList.add("active"); // expanded by default
    }

    p.replaceWith(wrapper);
  });
});
