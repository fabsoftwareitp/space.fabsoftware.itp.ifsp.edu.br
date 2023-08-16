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

  async click(evt) {
    evt.preventDefault();
    let pos = await {
      x: evt.clientX,
      y: evt.clientY
    }; 

    if(
      pos.x > this.x && 
      pos.x < (this.x + this.w) && 
      pos.y > this.y && 
      pos.y < (this.y + this.h)
    ) {
      await console.log("click", pos);
    }
  }
}