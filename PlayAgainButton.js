export default class PlayAgainButton {
  constructor(ctx, x, y, color) {
    this.x = x / 2;
    this.y = y / 2;
    this.width = 50;
    this.height = 30;
    this.color = color;
    this.render = this.draw(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}