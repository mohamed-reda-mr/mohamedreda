// ══════════════════════════════════════════
//  PARTICLES ENGINE
// ══════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => { resize(); spawnAll(); });
  resize();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.size = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.baseAlpha = this.alpha;
      this.color = Math.random() > 0.7 ? '#06b6d4' : '#2563EB';
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      // mouse repulsion
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
      }
      // max speed
      const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
      if (speed > 1.5) { this.vx = (this.vx/speed)*1.5; this.vy = (this.vy/speed)*1.5; }

      this.alpha = this.baseAlpha * (this.life / this.maxLife);
      if (this.life <= 0 || this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnAll() {
    const count = Math.min(Math.floor((W * H) / 14000), 90);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  spawnAll();

  // draw connection lines between nearby particles
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - d/110) * 0.1;
          ctx.strokeStyle = '#2563EB';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();


// ══════════════════════════════════════════
//  HERO ORBIT ANIMATION
// ══════════════════════════════════════════
(function heroOrbit() {
  const dot1 = document.querySelector('.orbit-dot:not(.orbit-dot-2)');
  const dot2 = document.querySelector('.orbit-dot-2');
  if (!dot1 || !dot2) return;

  let angle1 = 0, angle2 = 90;
  const R1 = 185, R2 = 155;
  const cx = 180, cy = 180;

  function tick() {
    angle1 += 0.4;
    angle2 -= 0.6;
    const r1 = angle1 * Math.PI / 180;
    const r2 = angle2 * Math.PI / 180;
    dot1.style.left = (cx + R1 * Math.cos(r1)) + 'px';
    dot1.style.top  = (cy + R1 * Math.sin(r1)) + 'px';
    dot2.style.left = (cx + R2 * Math.cos(r2)) + 'px';
    dot2.style.top  = (cy + R2 * Math.sin(r2)) + 'px';
    requestAnimationFrame(tick);
  }
  tick();
})();


// ══════════════════════════════════════════
//  ANIMATED SVG PATHS (draw-on)
// ══════════════════════════════════════════
function animateSVGPaths() {
  document.querySelectorAll('.draw-path').forEach(path => {
    const len = path.getTotalLength ? path.getTotalLength() : 200;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.transition = 'stroke-dashoffset 1.4s var(--ease-out)';
  });
}
animateSVGPaths();

// trigger draw when card enters viewport
const pathObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.draw-path').forEach(p => {
        p.style.strokeDashoffset = '0';
      });
    } else {
      e.target.querySelectorAll('.draw-path').forEach(p => {
        const len = p.getTotalLength ? p.getTotalLength() : 200;
        p.style.strokeDashoffset = len;
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.art-card, .guide-card').forEach(c => pathObs.observe(c));


// ══════════════════════════════════════════
//  COUNTER ANIMATION
// ══════════════════════════════════════════
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = target < 10 ? (target * ease).toFixed(1) : Math.round(target * ease);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(animateCounter);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hero-stats, .split-stats').forEach(el => counterObs.observe(el));


// ══════════════════════════════════════════
//  TILT EFFECT ON CARDS
// ══════════════════════════════════════════
document.querySelectorAll('.art-card, .guide-card, .cat-tile').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});