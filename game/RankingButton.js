export class RankingButton {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = (canvas.width / 3) * 2 - 100;
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
    const rect = this.canvas.getBoundingClientRect();
    let pos = {
      x: evt.touches ? evt.touches[0].clientX : evt.clientX,
      y: evt.touches ? evt.touches[0].clientY : evt.clientY,
    };
  
    pos.x = (pos.x - rect.left) * (this.canvas.width / rect.width);
    pos.y = (pos.y - rect.top) * (this.canvas.height / rect.height);
  
    return (
      pos.x > this.x &&
      pos.x < this.x + this.w &&
      pos.y > this.y &&
      pos.y < this.y + this.h
    );
  }
  
}
