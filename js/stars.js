const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let bigStars = [];
const STAR_COUNT = 200;
const BIG_STAR_COUNT = 15;
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

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

for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());
for (let i = 0; i < BIG_STAR_COUNT; i++) bigStars.push(new BigStar());

let particles = [];

function drawLines() {
  if (!mouse.x || !mouse.y) return;
  const allStars = stars.concat(bigStars);
  allStars.sort((a, b) => ((a.x - mouse.x)**2 + (a.y - mouse.y)**2) - ((b.x - mouse.x)**2 + (b.y - mouse.y)**2));
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

function animate() {
  ctx.fillStyle = "rgba(11,15,26,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => s.update());
  bigStars.forEach(b => b.update());
  drawLines();

  particles.forEach((p, idx) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,150,0.8)";
    ctx.fill();
    if(p.life <= 0) particles.splice(idx,1);
  });

  stars.forEach(s => {
    bigStars.forEach(b => {
      const dist = Math.hypot(s.x - b.x, s.y - b.y);
      if(dist < s.radius + b.radius){
        particles.push(...b.explode());
        b.x = Math.random() * canvas.width;
        b.y = Math.random() * canvas.height;
      }
    });
  });

  requestAnimationFrame(animate);
}

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

animate();
