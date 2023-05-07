// class Particle {
//   constructor(effect) {
//     this.effect = effect;
//     this.rad = 10;
//     this.velocity = 5;
//     this.x = Math.random() * this.effect.width;
//     this.y = Math.random() * this.effect.height;
//     this.vy = Math.random() * this.velocity;
//     this.vx = Math.random() * this.velocity;
//   }

//   update() {
//     this.y += this.vy;
//     this.x += this.vx;
//     this.recallParticleInBothDirection();
//   }
//   recallParticleInBothDirection() {
//     if (this.y > this.effect.height || this.y < 0) {
//       this.vy *= -1;
//     }
//     if (this.x > this.effect.width || this.x < 0) {
//       this.vx *= -1;
//     }
//   }
//   draw() {
//     this.effect.ctx.beginPath();
//     this.effect.ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
//     this.effect.ctx.fill();
//   }
// }

// class Effect {
//   constructor(canvas, ctx) {
//     this.canvas = canvas;
//     this.ctx = ctx;
//     this.width = this.canvas.width;
//     this.height = this.canvas.height;
//     this.particles = [];
//     this.noOfParticles = 20;
//     this.mouse = {
//       x: undefined,
//       y: undefined,
//     };
//     window.addEventListener("mousemove", (e) => {
//       this.mouse.x = e.x;
//       this.mouse.y = e.y;
//     });
//   }

//   init() {
//     for (let i = 0; i < this.noOfParticles; i++) {
//       this.particles.push(new Particle(this));
//     }
//   }

//   draw() {
//     this.particles.forEach((particle) => {
//       particle.draw();
//       particle.update();
//     });
//   }
// }

// function main() {
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   ctx.fillStyle = "white";

//   const effect = new Effect(canvas, ctx);
//   effect.init();
// //   animate();

//   function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     effect.draw();
//     requestAnimationFrame(animate);
//   }
// }

function removeBg(image, bg) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = image;
  img.onload = function () {
    canvas.width = img.width * 0.155;
    canvas.height = img.height * 0.155;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const av = (r + b + g) / 3;
      const alpha = data[i + 3];

      if (av > 225) {
        switch (bg) {
          case "transparent":
            data[i + 3] = 0;

            break;
          case "green":
            data[i] = 0;
            data[i + 1] = 255;
            data[i + 2] = 0;
            data[i + 3] = 255;

            break;
          case "blue":
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 255;
            data[i + 3] = 255;

            break;
          case "white":
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;

            break;
          case "black":
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;

            break;
          case "red":
            data[i] = 255;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 255;

            break;

          default:
            break;
        }
      }

      // data[i] = av
      // data[i+1] = av
      // data[i+2] = av
    }
    imgData.data = data;

    ctx.putImageData(imgData, 0, 0);

    const rf = document.createElement("img");
    rf.src = canvas.toDataURL(canvas.width, canvas.height);
    document.body.appendChild(rf);
  };
}

function main() {
 
removeBg("image.jpg", "black");
removeBg("image.jpg", "white");
removeBg("image.jpg", "black");
removeBg("image.jpg", "red");
removeBg("image.jpg", "green");
removeBg("image.jpg", "blue");
   
}