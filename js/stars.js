const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let bigStars = [];
const STAR_COUNT = 120;
const BIG_STAR_COUNT = 5;
let mouse = { x: null, y: null };

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Small Star class
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.isBig = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.isBig ? "rgba(255,255,200,0.9)" : "rgba(255,255,255,0.8)";
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

// Big Star class
class BigStar extends Star {
  constructor() {
    super();
    this.radius = Math.random() * 3 + 2;
    this.isBig = true;
  }

  explode() {
    let particles = [];
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        life: 50
      });
    }
    return particles;
  }
}

// Init stars
for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
for (let i = 0; i < BIG_STAR_COUNT; i++) bigStars.push(new BigStar());

let particles = [];

// Draw lines to cursor for 15 closest stars
function drawLines() {
  if (!mouse.x || !mouse.y) return;

  const allStars = stars.concat(bigStars);
  // Sort stars by distance to mouse
  allStars.sort((a, b) => {
    const da = (a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2;
    const db = (b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2;
    return da - db;
  });

  for (let i = 0; i < 15 && i < allStars.length; i++) {
    const s = allStars[i];
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// Animate everything
function animate() {
  ctx.fillStyle = "rgba(11,15,26,0.6)"; // background fade
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => s.update());
  bigStars.forEach(b => b.update());

  // Draw lines from closest stars to cursor
  drawLines();

  // Update particles from explosions
  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,150,0.8)";
    ctx.fill();
    if (p.life <= 0) particles.splice(idx, 1);
  });

  // Check collisions: small stars hitting big stars
  stars.forEach((s, sIdx) => {
    bigStars.forEach((b, bIdx) => {
      const dist = Math.hypot(s.x - b.x, s.y - b.y);
      if (dist < s.radius + b.radius) {
        particles.push(...b.explode());
        // Reset big star to random position
        b.x = Math.random() * canvas.width;
        b.y = Math.random() * canvas.height;
      }
    });
  });

  requestAnimationFrame(animate);
}

// Track mouse
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Start animation
animate();
