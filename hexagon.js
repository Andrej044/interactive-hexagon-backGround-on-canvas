const mainStage = document.querySelector(".canvas");
const ctx3 = mainStage.getContext("2d");
mainStage.width = innerWidth;
mainStage.height = innerHeight;
mainStage.style.backgroundColor = "rgba(0,0,0,.9)";

const mouse = {
  x: null,
  y: null,
  radius: 50,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
  mainStage.width = innerWidth;
  mainStage.height = innerHeight;
});

class Hexagon {
  constructor(x, y) {
    this.x = x;
    // x === 0 ? 40 : x * 100;
    this.y = y;
    this.size = 50;
    this.color = "rgba(50,50,50,.8)";
    this.colorStroke = "rgba(0,0,0,.8)";
    this.gradient = ctx3.createLinearGradient(
      0,
      0,
      mainStage.width,
      mainStage.height
    );
    this.gradient.addColorStop("0", "magenta");
    this.gradient.addColorStop("0.5", "blue");
    this.gradient.addColorStop("1.0", "red");

    this.baseX = this.x;
  }

  draw() {
    ctx3.fillStyle = this.color;

    ctx3.beginPath();
    ctx3.moveTo(
      this.x + this.size * Math.cos(0),
      this.y + this.size * Math.sin(0)
    );
    for (let i = 0; i < 7; i++) {
      ctx3.lineTo(
        this.x + this.size * Math.cos((i * 2 * Math.PI) / 6),
        this.y + this.size * Math.sin((i * 2 * Math.PI) / 6)
      );
    }
    ctx3.strokeStyle = this.colorStroke;
    ctx3.stroke();
    ctx3.closePath();
    ctx3.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    console.log(distance);
    if (distance < 50) {
      ctx3.lineWidth = 5;
      this.colorStroke = this.gradient;
      if (distance < mouse.radius / 1.1) this.x = this.x + 0.1;
    } else {
      ctx3.lineWidth = 1;
      this.colorStroke = "rgba(0,0,0,.8)";
      if (this.x != this.baseX) {
        this.x = this.x - 0.1;
      }
    }
  }
}
// mainStage.height / 85
let hexagonArr = [];
function init() {
  for (let i = 0; i <= mainStage.width / 100; i++) {
    for (let j = 0; j <= mainStage.height / 85; j++) {
      let x = i * 100;
      let y = j * 85;
      hexagonArr.push(new Hexagon(x, y));
    }
  }
}
init();

function animate() {
  let gradient = ctx3.createLinearGradient(
    mainStage.width / 4,
    0,
    mainStage.width / 1.1,
    0
  );
  gradient.addColorStop(0, "rgba(0,0,0)");
  gradient.addColorStop(0.1, "rgba(75,75,75)");
  gradient.addColorStop(0.5, "rgba(100,100,100)");
  gradient.addColorStop(1, "rgba(0,0,0)");
  ctx3.fillStyle = gradient;
  ctx3.fillRect(0, 0, mainStage.width, mainStage.height);
  for (let i = 0; i < hexagonArr.length; i++) {
    hexagonArr[i].update();
    hexagonArr[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();
