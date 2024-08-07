export class RankingButton {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = canvas.width / 3 * 2 - 125;
    this.y = canvas.height / 2 + 50;
    this.w = 250;
    this.h = 50;
  }

  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "black";
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText("Ver Ranking", this.x + 40, this.y + 32);
  }

  isClicked(evt) {
    let pos = {
      x: evt.touches[0].clientX,
      y: evt.touches[0].clientY,
    };

    if (
      pos.x > this.x + 20 &&
      pos.x < this.x + this.w &&
      pos.y > this.y &&
      pos.y < this.y + this.h 
    ) {
      console.log(pos);
      console.log('clicou');
      return true;
    }
    console.log(pos);
    return false;
  }
}