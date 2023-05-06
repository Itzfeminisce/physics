const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = "2";
ctx.strokeStyle = `white`;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

gradient.addColorStop(0, "purple");
gradient.addColorStop(0.5, "red");
gradient.addColorStop(1, "orange");

ctx.fillStyle = gradient;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.rad = Math.random() * 20 + 1;
    this.x = this.rad + Math.random() * (effect.canvas.width - this.rad * 2);
    this.y = this.rad + Math.random() * (effect.canvas.height - this.rad * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    context.fill();
  }

  update(ctx) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.effect.width - this.rad || this.x < this.rad) {
      this.vx *= -1;
    }
    if (this.y > this.effect.height - this.rad || this.y < this.rad) {
      this.vy *= -1;
    }
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.particles = [];
    this.noOfParticles = 50;
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.noOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.connectParticles(context);
    this.particles.forEach((particle, i) => {
      particle.draw(context);
      particle.update(context);
    });
  }
  trackMouse(ctx, e) {
    this.mouse = {
      x: e.x,
      y: e.y,
    };

    for (let a = 0; a < this.particles.length; a++) {
      const particle = this.particles[a];

      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 50) {
        ctx.save()
        ctx.arc(this.mouse.x, this.mouse.y, 10, 0, Math.PI *2);
        ctx.strokeStyle = 'white'
        ctx.stroke();
        ctx.restore()
      }
    }
  }
  connectParticles(context) {
    const maxDist = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[b].x - this.particles[a].x;
        const dy = this.particles[b].y - this.particles[a].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          context.save();
          const opacity = 1 - dist / maxDist;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
}

const effect = new Effect(canvas);
function animate() {
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
canvas.addEventListener(
  "mousemove",
  function (e) {
    effect.trackMouse(ctx, e);
  }.bind(effect)
);
animate();
