const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let bigStars = [];
let particles = [];

const STAR_COUNT = 200;
const BIG_STAR_COUNT = 15;
const MAX_STARS = 600;

let mouse = { x: null, y: null };

// ===============================
// RESIZE
// ===============================
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ===============================
// STAR CLASSES
// ===============================
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
    ctx.fillStyle = this.isBig
      ? "rgba(255,255,200,0.9)"
      : "rgba(255,255,255,0.8)";
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

class BigStar extends Star {
  constructor() {
    super();
    this.radius = Math.random() * 3 + 2;
    this.isBig = true;
  }

  explode() {
    let out = [];

    const PARTICLE_COUNT = 30;
    const NEW_STARS = 6;

    // Explosion particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      out.push({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 2 + 1,
        life: 60
      });
    }

    // Spawn new stars
    for (let i = 0; i < NEW_STARS; i++) {
      const s = new Star();
      s.x = this.x;
      s.y = this.y;
      s.vx = (Math.random() - 0.5) * 1.5;
      s.vy = (Math.random() - 0.5) * 1.5;
      s.radius = Math.random() * 1.2 + 0.4;
      stars.push(s);
    }

    return out;
  }
}

// ===============================
// INIT
// ===============================
for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
for (let i = 0; i < BIG_STAR_COUNT; i++) bigStars.push(new BigStar());

// ===============================
// CURSOR LINES
// ===============================
function drawLines() {
  if (!mouse.x || !mouse.y) return;

  const allStars = stars.concat(bigStars);
  allStars.sort(
    (a, b) =>
      (a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2 -
      ((b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2)
  );

  for (let i = 0; i < 20 && i < allStars.length; i++) {
    const s = allStars[i];
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.stroke();
  }
}

// ===============================
// STAR NETWORK
// ===============================
function drawStarConnections() {
  const allStars = stars.concat(bigStars);

  for (let i = 0; i < allStars.length; i += 2) {
    const s = allStars[i];
    const other = allStars[i + 1];
    if (!other) continue;

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(other.x, other.y);
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.stroke();
  }
}

// ===============================
// ANIMATE
// ===============================
function animate() {
  ctx.fillStyle = "rgba(11,15,26,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => s.update());
  bigStars.forEach(b => b.update());

  drawLines();
  drawStarConnections();

  // Particles
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,150,0.8)";
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  });

  // Collisions → explosions
  stars.forEach(s => {
    bigStars.forEach(b => {
      const d = Math.hypot(s.x - b.x, s.y - b.y);
      if (d < s.radius + b.radius) {
        particles.push(...b.explode());
        b.x = Math.random() * canvas.width;
        b.y = Math.random() * canvas.height;
      }
    });
  });

  // Star cap (prevents lag)
  if (stars.length > MAX_STARS) {
    stars.splice(0, stars.length - MAX_STARS);
  }

  requestAnimationFrame(animate);
}

// ===============================
// MOUSE
// ===============================
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

animate();
