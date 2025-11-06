/* ====== Theme toggle (dark default) ====== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setThemeLight() {
  body.classList.remove('dark');
  body.classList.add('light-mode');
  themeToggle.textContent = 'Dark';
  // optional: change CSS variables for light if you want
}
function setThemeDark() {
  body.classList.remove('light-mode');
  body.classList.add('dark');
  themeToggle.textContent = 'Light';
}
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark')) setThemeLight();
  else setThemeDark();
});

// start in dark
setThemeDark();

/* ====== Typewriter effect (one-line) ====== */
(function typewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const text = el.getAttribute('data-text') || el.textContent;
  const speed = 40;
  let i = 0;
  el.textContent = '';

  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(step, speed);
    } else {
      // loop cursor blink - do not erase, keep
      el.style.borderRight = '2px solid rgba(190,239,243,0.18)';
    }
  }
  step();
})();

/* ====== Reveal on scroll ====== */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

reveals.forEach(r => io.observe(r));

/* ====== Particles (canvas) - light-weight, ciano+roxo ====== */
(function particles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const particles = [];
  const count = Math.max(40, Math.floor((w*h)/90000)); // scale with screen

  function rand(min, max){ return Math.random()*(max-min)+min; }

  class P {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0,w);
      this.y = rand(0,h);
      this.vx = rand(-0.2,0.6);
      this.vy = rand(-0.15,0.15);
      this.r = rand(0.7,2.6);
      this.life = rand(80,360);
      this.t = 0;
      this.hue = Math.random() > 0.5 ? 190 : 270; // ciano-ish or purple-ish
    }
    step(){
      this.x += this.vx;
      this.y += this.vy;
      this.t++;
      if (this.t > this.life || this.x < -20 || this.x > w+20 || this.y < -20 || this.y > h+20) this.reset();
    }
    draw(ctx){
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r*6);
      if (this.hue < 200) {
        gradient.addColorStop(0, 'rgba(102,248,255,0.85)');
        gradient.addColorStop(1, 'rgba(102,248,255,0.03)');
      } else {
        gradient.addColorStop(0, 'rgba(155,92,255,0.78)');
        gradient.addColorStop(1, 'rgba(155,92,255,0.02)');
      }
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.r*4, 0, Math.PI*2);
      ctx.fill();
    }
  }

  for(let i=0;i<count;i++) particles.push(new P());

  function loop(){
    ctx.clearRect(0,0,w,h);
    // subtle trails
    ctx.fillStyle = 'rgba(5,6,10,0.14)';
    ctx.fillRect(0,0,w,h);
    for (let p of particles) {
      p.step();
      p.draw(ctx);
    }
    requestAnimationFrame(loop);
  }
  loop();

  addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });
})();

/* ====== small accessibility helper: year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ==== Idiomas - gerar pontos dinamicamente ==== */
document.querySelectorAll('.dots').forEach(dotContainer => {
  const level = parseInt(dotContainer.dataset.level) || 0;
  const total = 5; // total de "níveis"
  for (let i = 1; i <= total; i++) {
    const span = document.createElement('span');
    if (i <= level) span.classList.add('active');
    dotContainer.appendChild(span);
  }
});
