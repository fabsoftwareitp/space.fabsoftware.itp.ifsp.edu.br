export default class Score {
  scoreNumber = 0;
  pointsToAdd = 50;
  multiplier = 1;

  constructor(canvas) {
    this.canvas = canvas;

    this.x = canvas.width - 50;
    this.y = canvas.height - 50;
  }

  addPoints() {
    this.scoreNumber += parseInt(this.pointsToAdd * this.multiplier);
  }

  decreaseMultiplier() {
    this.multiplier *= 0.87; 
  }

  draw(ctx) {
    ctx.fillText(this.scoreNumber, this.x, this.y);
  }
}