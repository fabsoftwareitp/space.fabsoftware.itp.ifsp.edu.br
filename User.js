export class User {
  name = '';
  score = 0;

  constructor() {}

  setName(name) {
    this.name = name;  
  }

  setScore(score) {
    if (score > this.score) {
      this.score = score;
    }
  }
}