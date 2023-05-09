const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const request = require('request');
const connectedUsers = {};

const { Server } = require("socket.io");
const io = new Server(server);

const porta1 = 9091;
app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/controle.html');
});

app.get('/tela', (req, res2) => {
  res2.sendFile(__dirname + '/tela.html');
});

app.get('/lotado', (req, res3) => {
  res3.sendFile(__dirname + '/lotado.html');
});

app.get('/obrigado', (req, res4) => {
  res4.sendFile(__dirname + '/obrigado.html');
});

app.use(express.static('img'));
app.use(express.static('game'));
app.use(express.static('css'));

function saveConnectedUsers() {
  const jsonData = {
    usuario: Object.values(connectedUsers).filter(user => user !== connectedUsers['server'])[0] || '',
    server: connectedUsers['server'] || '',
    banidos: getBanidosData() // retorna o valor 'banidos' do arquivo JSON
  };

  fs.writeFile('json/usuarios.json', JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo JSON:', err);
    } else {
      console.log('Usuários conectados salvos em usuarios.json');
    }
  });
}

function getBanidosData() {
  const jsonData = fs.readFileSync('json/usuarios.json', 'utf8');
  var data = JSON.parse(jsonData);
  return data.banidos || [];
}

//tudo começa aqui!

io.on('connection', (socket) => {
  const clientSocketId = socket.id;

  // Obter o IP externo do cliente usando um serviço de terceiros
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      const clientIp = data.ip;

      // Carrega o conteúdo do arquivo JSON
      const jsonData = fs.readFileSync('json/usuarios.json', 'utf8');
      const usersData = JSON.parse(jsonData);

      if (usersData.banidos && usersData.banidos.includes(clientIp)) {
        // Se o IP do cliente está na lista de banidos, bloqueia a conexão
        console.log('Tentativa de conexão bloqueada:', clientIp);
        socket.disconnect(true);
        return;
      }

      if (!connectedUsers['server']) {
        // Se o IP do servidor ainda não foi definido, definir o IP externo do cliente atual como servidor
        connectedUsers['server'] = clientIp;
        console.log('Servidor conectado:', clientIp);
      } else if (connectedUsers['server'] && Object.values(connectedUsers).includes(clientIp)) {
        // Se o IP do servidor e o IP do cliente já estão presentes nos usuários conectados
        console.log('Lotação máxima atingida. Não é possível conectar:', clientIp);
        socket.emit('lotado'); // Emitir evento 'lotado' para o cliente
        return;
      } else {
        connectedUsers[clientSocketId] = clientIp;
        console.log('Usuário conectado:', clientIp);
      }

      saveConnectedUsers();
    } else {
      console.error('Erro ao obter o IP externo:', error);
    }
  });

  socket.on('disconnect', () => {
    const clientIp = connectedUsers[clientSocketId];
    delete connectedUsers[clientSocketId];

    if (clientIp === connectedUsers['server']) {
      console.log('Servidor desconectado:', clientIp);
    } else {
      console.log('Usuário desconectado:', clientIp);
    }

    saveConnectedUsers();
  });

  socket.on('beta', (beta) => {
    request('https://api.ipify.org?format=json', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      const clientIp = data.ip;

      // Carrega o conteúdo do arquivo JSON
      const jsonData = fs.readFileSync('json/usuarios.json', 'utf8');
      const usersData = JSON.parse(jsonData);

      if (usersData.banidos && usersData.banidos.includes(clientIp)) {
        // Se o IP do cliente está na lista de banidos, bloqueia a conexão
        console.log('Tentativa de conexão bloqueada:', clientIp);
        socket.emit('ban'); // Emite um evento 'banido' para o cliente
        socket.disconnect(true);
        return;
      }
    } else {
      console.error('Erro ao obter o IP externo:', error);
    }
  });
    io.emit('coordenada', beta);
  });

  socket.on('tiro', (tiro) => {
    request('https://api.ipify.org?format=json', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      const clientIp = data.ip;

      // Carrega o conteúdo do arquivo JSON
      const jsonData = fs.readFileSync('json/usuarios.json', 'utf8');
      const usersData = JSON.parse(jsonData);

      if (usersData.banidos && usersData.banidos.includes(clientIp)) {
        // Se o IP do cliente está na lista de banidos, bloqueia a conexão
        console.log('Tentativa de conexão bloqueada:', clientIp);
        socket.emit('ban'); // Emite um evento 'banido' para o cliente
        socket.disconnect(true);
        return;
      }
    } else {
      console.error('Erro ao obter o IP externo:', error);
    }
  });
    io.emit('atirar', tiro);
  });
  
  socket.on('ban', () => {
    // Banir usuario e colocalo na lista de banidos do JSON
    var jsonData = fs.readFileSync('json/usuarios.json', 'utf8');
    var data = JSON.parse(jsonData);
  
    const bannedIp = data.usuario;
  
    // Move o IP banido do 'usuario' para 'banidos'
    if (bannedIp) {
      // Quantidade de ips baninos  armazenados por vez
      if (data.banidos.length > 0) {
        data.banidos = [];
        console.log('Lista de banidos limpa');
      }
      if (!data.banidos) {
        data.banidos = [];
      }
      data.banidos.push(bannedIp);
      data.usuario = '';
    }
    
    fs.writeFileSync('json/usuarios.json', JSON.stringify(data));
  
    // desconecta os usuarios banidos pelo IP
    Object.keys(io.sockets.sockets).forEach((socketId) => {
      const socketIp = connectedUsers[socketId];
      if (socketIp === bannedIp) {
        io.sockets.sockets[socketId].disconnect(true);
        console.log('Usuário banido:', socketIp);
      }
    socket.emit('banido');
    });
  });
});

server.listen(porta1, () => {
  console.log(`Listening on *:${porta1}`);
});