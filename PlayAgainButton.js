export default class PlayAgainButton {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = canvas.width / 2 - 180;
    this.y = canvas.height / 2 + 50;
    this.w = 360;
    this.h = 70;
  }

  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "black";
    ctx.font = "24px 'Press Start 2P'";
    ctx.fillText("Jogar Novamente", this.x + 1, this.y + 47);
  }

  isClicked(evt, ctx) {
    let pos = {
      x: evt.touches[0].clientX,
      y: evt.touches[0].clientY,
    };

    if (
      pos.x > this.x + 20 &&
      pos.x < this.x + this.w &&
      pos.y > this.y - 40 &&
      pos.y < this.y + this.h 
    ) {
      console.log(pos);
      console.log(this.x, this.y, this.w + this.x, this.h + this.y);

      return true;
    }
    console.log(pos);
    return false;
  }
}
