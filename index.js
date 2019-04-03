var express = require('express');
const uuidv4 = require('uuid/v4');
var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var logged = {};
let mensagemNextId = 1;
var mensagens = [];
var users = {
  admin: {username: 'admin',password: '123',admin: true},
  usuario01: {username: 'usuario01',password: '123',admin: false},
  usuario02: {username: 'usuario02',password: '123',admin: false},
  usuario03: {username: 'usuario03',password: '123',admin: false},
  usuario04: {username: 'usuario04',password: '123',admin: false},
  usuario05: {username: 'usuario05',password: '123',admin: false},
  usuario06: {username: 'usuario06',password: '123',admin: false},
  usuario07: {username: 'usuario07',password: '123',admin: false},
  usuario08: {username: 'usuario08',password: '123',admin: false},
  usuario09: {username: 'usuario09',password: '123',admin: false},
  usuario10: {username: 'usuario10',password: '123',admin: false},
  usuario11: {username: 'usuario11',password: '123',admin: false},
  usuario12: {username: 'usuario12',password: '123',admin: false},
  usuario13: {username: 'usuario13',password: '123',admin: false},
  usuario14: {username: 'usuario14',password: '123',admin: false},
  usuario15: {username: 'usuario15',password: '123',admin: false},
  usuario16: {username: 'usuario16',password: '123',admin: false},
  usuario17: {username: 'usuario17',password: '123',admin: false},
  usuario18: {username: 'usuario18',password: '123',admin: false},
  usuario19: {username: 'usuario19',password: '123',admin: false},
  usuario20: {username: 'usuario20',password: '123',admin: false},
  usuario21: {username: 'usuario21',password: '123',admin: false},
  usuario22: {username: 'usuario22',password: '123',admin: false},
  usuario23: {username: 'usuario23',password: '123',admin: false},
  usuario24: {username: 'usuario24',password: '123',admin: false},
  usuario25: {username: 'usuario25',password: '123',admin: false},
  usuario26: {username: 'usuario26',password: '123',admin: false},
  usuario27: {username: 'usuario27',password: '123',admin: false},
  usuario28: {username: 'usuario28',password: '123',admin: false},
  usuario29: {username: 'usuario29',password: '123',admin: false},
  usuario30: {username: 'usuario30',password: '123',admin: false},
  usuario31: {username: 'usuario31',password: '123',admin: false},
  usuario32: {username: 'usuario32',password: '123',admin: false},
  usuario33: {username: 'usuario33',password: '123',admin: false},
  usuario34: {username: 'usuario34',password: '123',admin: false},
  usuario35: {username: 'usuario35',password: '123',admin: false},
  usuario36: {username: 'usuario36',password: '123',admin: false},
  usuario37: {username: 'usuario37',password: '123',admin: false},
  usuario38: {username: 'usuario38',password: '123',admin: false},
  usuario39: {username: 'usuario39',password: '123',admin: false},
  usuario40: {username: 'usuario40',password: '123',admin: false},
};
var categorias = {};
var tarefas = {};


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

var server = require('http').Server(app);
var io = require('socket.io')(server, {'Access-Control-Allow-Credentials': false});

const sockets = [];

server.listen(3008, function () {
  console.log('Socket listening on port 3008!');
});

io.on('connection', function(socket){
  console.log('a user connected!');
  
  sockets.push(socket);
  
  socket.on('msg', function(msg){
    let mensagem = {id: mensagemNextId, mensagem: msg};
    mensagens.push(mensagem);
    mensagemNextId++;
    broadcast(mensagem);
  });
  
});

const broadcast = (msg) => {
  sockets.forEach((socket) => {
    socket.emit('msg', msg);
  });
};


app.get('/api/mensagens/:num', function(req, res) {
  console.log('req headers: ',req.headers);
  let list = mensagens;
  if(req.params.num) {
    if(req.params.num < list.length) {
      list = list.slice(list.length - req.params.num, list.length );
    }
  }
  res.send(JSON.stringify(list));
});

app.get('/api/mensagens/since/:id', function(req, res) {
  console.log('req headers: ',req.headers);
  let list = [];
  if(req.params.id) {
    mensagens.forEach((mensagem) => {
      if(mensagem.id > req.params.id) {
	list.push(mensagem);
      }
    });
  }
  res.send(JSON.stringify(list));
});

app.post('/api/mensagens', function(req, res) {
    let mensagem = {id: mensagemNextId, mensagem: req.body.msg};
    mensagens.push(mensagem);
    mensagemNextId++;
    res.send(mensagem);
});

app.listen(3005, function () {
  console.log('Example app listening on port 3005!');
});
