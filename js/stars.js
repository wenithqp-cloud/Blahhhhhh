const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let bigStars = [];
let particles = [];

const STAR_COUNT = 150;
const BIG_STAR_COUNT = 10;
const MAX_STARS = 175;
const MAX_CONNECTIONS = 0; // each star connects to 0 closest stars max
const CONNECTION_UPDATE_INTERVAL = 3500; // 3.5 seconds

let mouse = { x: null, y: null };

// ===============================
// RESIZE CANVAS
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

    const speed = Math.random() * 0.2 + 0.1; // consistent speed
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.isBig = false;
    this.closestStars = [];
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

    // Bounce off edges
    if (this.x - this.radius < 0) { this.x = this.radius; this.vx = Math.abs(this.vx); }
    if (this.x + this.radius > canvas.width) { this.x = canvas.width - this.radius; this.vx = -Math.abs(this.vx); }
    if (this.y - this.radius < 0) { this.y = this.radius; this.vy = Math.abs(this.vy); }
    if (this.y + this.radius > canvas.height) { this.y = canvas.height - this.radius; this.vy = -Math.abs(this.vy); }

    this.draw();
  }
}

class BigStar extends Star {
  constructor() {
    super();
    this.radius = Math.random() * 3 + 2;
    this.isBig = true;

    const speed = Math.random() * 0.5 + 0.2;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
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
      const speed = Math.random() * 0.3 + 0.2;
      const angle = Math.random() * Math.PI * 2;
      s.vx = Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.radius = Math.random() * 1.2 + 0.4;
      stars.push(s);
    }

    return out;
  }
}

// ===============================
// INIT STARS
// ===============================
for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
for (let i = 0; i < BIG_STAR_COUNT; i++) bigStars.push(new BigStar());

// ===============================
// CURSOR CONNECTIONS
// ===============================
function drawCursorLines() {
  if (!mouse.x || !mouse.y) return;

  const allStars = stars.concat(bigStars);
  allStars.sort(
    (a, b) =>
      (a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2 -
      ((b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2)
  );

  const maxConnections = Math.min(20, allStars.length);

  for (let i = 0; i < maxConnections; i++) {
    const s = allStars[i];
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(mouse.x, mouse.y);

    const opacity = window.innerWidth < 600 ? 0.05 : 0.1;
    ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// ===============================
// STAR CONNECTIONS (closest 2, updated every 2s)
// ===============================
let lastConnectionUpdate = 0;

function drawStarConnections(timestamp) {
  if (!lastConnectionUpdate || timestamp - lastConnectionUpdate > CONNECTION_UPDATE_INTERVAL) {
    lastConnectionUpdate = timestamp;
    // Calculate closest stars for each star
    const allStars = stars.concat(bigStars);
    allStars.forEach(s => {
      const closest = allStars
        .filter(o => o !== s)
        .map(o => ({ star: o, dist: Math.hypot(o.x - s.x, o.y - s.y) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, MAX_CONNECTIONS)
        .map(p => p.star);
      s.closestStars = closest;
    });
  }

  // Draw lines
  const allStars = stars.concat(bigStars);
  allStars.forEach(s => {
    s.closestStars.forEach(other => {
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(other.x, other.y);

      const opacity = window.innerWidth < 600 ? 0.05 : 0.07;
      const width = window.innerWidth < 600 ? 0.5 : 1;
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = width;
      ctx.stroke();
    });
  });
}

// ===============================
// ANIMATION LOOP
// ===============================
function animate(timestamp) {
  ctx.fillStyle = "rgba(11,15,26,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => s.update());
  bigStars.forEach(b => b.update());

  drawCursorLines();
  drawStarConnections(timestamp);

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

  // Big star collisions → explosions
  stars.forEach(s => {
    bigStars.forEach(b => {
      const dist = Math.hypot(s.x - b.x, s.y - b.y);
      if (dist < s.radius + b.radius) {
        particles.push(...b.explode());
        b.x = Math.random() * canvas.width;
        b.y = Math.random() * canvas.height;
      }
    });
  });

  // Cap stars for performance
  if (stars.length > MAX_STARS) {
    stars.splice(0, stars.length - MAX_STARS);
  }

  requestAnimationFrame(animate);
}

// ===============================
// MOUSE TRACKING
// ===============================
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

animate();
