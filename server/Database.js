const fs = require('fs');
const path = require('path');
const jsonPath = path.join('https://ranking.fabsoftware.itp.ifsp.edu.br/ranking/space');

class Database {
  static insert(req, res) {
    try {
      const newData = req.body;
      const data = JSON.parse(fs.readFileSync(jsonPath));
      fs.writeFileSync(jsonPath, JSON.stringify([...data, newData]))
      return res.send('inserido com sucesso!');
    } catch (error) {
      return res.send(error.message);
    }
  }

  static read(req, res) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath));
      res.send(data);
    } catch (error) {
      return res.send(error.message);
    }
  }
}

module.exports = Database;