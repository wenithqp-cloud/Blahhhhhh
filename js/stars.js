const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;
const BIG_STAR_CHANCE = 0.05; // 5% of stars are big
const MAX_LINES = 15;

let mouse = { x: null, y: null };

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
    this.isBig = Math.random() < BIG_STAR_CHANCE;
    if (this.isBig) this.radius *= 3;
    this.exploding = false;
    this.explodeFrame = 0;
  }

  draw() {
    ctx.beginPath();
    if (this.exploding) {
      ctx.arc(this.x, this.y, this.radius + this.explodeFrame, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.explodeFrame / 20})`;
    } else {
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
    }
    ctx.fill();
  }

  update() {
    if (this.exploding) {
      this.explodeFrame++;
      if (this.explodeFrame > 20) {
        this.exploding = false;
        this.explodeFrame = 0;
        this.radius = Math.random() * 1.5 + 0.5;
        this.isBig = Math.random() < BIG_STAR_CHANCE;
        if (this.isBig) this.radius *= 3;
      }
      this.draw();
      return;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

    this.draw();
  }

  explode() {
    this.exploding = true;
    this.explodeFrame = 0;
  }
}

// Init stars
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

// Mouse interaction
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Draw lines to cursor
function drawLines() {
  if (!mouse.x || !mouse.y) return;

  let distances = stars.map(star => {
    let dx = star.x - mouse.x;
    let dy = star.y - mouse.y;
    return { star, dist: dx * dx + dy * dy };
  });

  distances.sort((a, b) => a.dist - b.dist);
  for (let i = 0; i < Math.min(MAX
