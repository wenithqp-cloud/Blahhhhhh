
/* STAR BACKGROUND */
const canvas=document.getElementById("starCanvas");
const ctx=canvas.getContext("2d");
let stars=[],mouse={x:window.innerWidth/2,y:window.innerHeight/2};
const MAX_SPEED=1.5;

function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas(); window.addEventListener("resize",resizeCanvas);

class Star{
  constructor(isLarge=false){
    this.isLarge=isLarge;
    this.size=isLarge?Math.random()*4+3:Math.random()*1.5+0.5;
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.vx=(Math.random()-0.5)*(isLarge?0.8:1.2);
    this.vy=(Math.random()-0.5)*(isLarge?0.8:1.2);
    this.color="white"; this.exploding=false;
  }
  limitSpeed(){
    const speed=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
    if(speed>MAX_SPEED){ const scale=MAX_SPEED/speed; this.vx*=scale; this.vy*=scale; }
  }
  update(){
    if(this.exploding) return;
    this.x+=this.vx; this.y+=this.vy;
    if(this.x<=0||this.x>=canvas.width) this.vx*=-1;
    if(this.y<=0||this.y>=canvas.height) this.vy*=-1;
    stars.forEach(s=>{
      if(s!==this&&!s.exploding){
        const dx=this.x-s.x, dy=this.y-s.y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        const minDist=this.size+s.size;
        if(dist<minDist){
          const angle=Math.atan2(dy,dx), force=0.3;
          this.vx+=Math.cos(angle)*force;
          this.vy+=Math.sin(angle)*force;
          s.vx-=Math.cos(angle)*force;
          s.vy-=Math.sin(angle)*force;
          if(this.isLarge||s.isLarge) this.explode();
        }
      }
    });
    this.limitSpeed();
  }
  explode(){
    this.exploding=true;
    for(let i=0;i<6;i++){
      const p=new Star(false);
      p.x=this.x; p.y=this.y;
      const angle=(Math.PI*2/6)*i;
      p.vx=Math.cos(angle)*1.5; p.vy=Math.sin(angle)*1.5;
      stars.push(p);
    }
    this.size=0;
  }
  draw(){
    if(this.exploding&&this.size<=0) return;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle=this.color; ctx.fill();
  }
}

for(let i=0;i<80;i++) stars.push(new Star());
setInterval(()=>{if(stars.length<160)stars.push(new Star(Math.random()<0.1));},150);
window.addEventListener("mousemove",e=>{ mouse.x=e.clientX; mouse.y=e.clientY; });

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{s.update();s.draw();});
  requestAnimationFrame(animate);
}
animate();

