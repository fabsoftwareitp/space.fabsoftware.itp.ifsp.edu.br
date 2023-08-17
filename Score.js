export default class Score {
  scoreNumber = 0;
  pointsToAdd = 150;
  multiplier = 1;

  addPoints() {
    this.scoreNumber += parseInt(this.pointsToAdd * this.multiplier);
  }

  decreaseMultiplier() {
    this.multiplier *= 0.87; 
  }

  draw(ctx, x = 50, y = 50) {
    ctx.font = "24px 'Press Start 2P'";
    ctx.fillText(this.scoreNumber, x, y);
  }
}