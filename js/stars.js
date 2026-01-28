const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Star class
class Star {
  constructor() {
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

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

    this.draw();
  }
}

// Init stars
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

// Animate
function animate() {
  ctx.fillStyle = "rgba(11,15,26,0.6)"; // background fade
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => star.update());

  requestAnimationFrame(animate);
}

animate();
