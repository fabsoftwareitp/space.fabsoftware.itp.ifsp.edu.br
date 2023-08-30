const host = window.location.origin;

export class User {
  name = '';
  score = 0;
  sended = false;

  constructor() {}

  setName(name) {
    this.name = name;  
  }

  setScore(score) {
    if (score > this.score) {
      this.score = score;
    }
  }

  send() {
    if (!this.sended) {
      fetch(`${host}/ranking`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.name, score: this.score})
      });
      this.sended = true;
    }
  }

  reset() {
    this.sended = false;
  }
}