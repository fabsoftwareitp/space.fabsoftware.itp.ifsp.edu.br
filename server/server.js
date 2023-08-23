const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);

const porta1 = 9091;
app.set('trust proxy', true);
app.use(express.static('game'));

