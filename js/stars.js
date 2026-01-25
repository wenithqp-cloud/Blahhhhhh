/* ===============================
   STARFIELD + MOUSE TRAILS
   =============================== */
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;   // number of stars
let mouse = { x: null, y: null };

// Resize canvas to fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Star constructor
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap stars around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

    this.draw();
  }
}

// Initialize stars
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

// Track mouse
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

// Draw lines between nearby stars & cursor
function connectStars() {
  const maxDistance = 120;

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / maxDistance})`;
        ctx.lineWidth = 0.7;
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }

    // Connect stars to cursor
    if (mouse.x !== null && mouse.y !== null) {
      const dx = stars[i].x - mouse.x;
      const dy = stars[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1 - dist / maxDistance})`;
        ctx.lineWidth = 0.7;
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(11,15,26,0.6)"; // semi-transparent to create trails
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => star.update());
  connectStars();

  requestAnimationFrame(animate);
}

animate();
