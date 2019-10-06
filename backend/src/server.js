const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ayr1y.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
    
    /*pega o id so socket */
    connectedUsers[user_id] = socket.id;
});

/*adiciona uma funcionalidade em tds as reqs de tds as rotas, independente do metodo.
next diz p continuar o fluxo, ele continua executando o restante das linhas. sem ele n teria retorno da funcao */
app.use((req, res, next) => {
    //adiciona na rota o io e os usuarios conectados p ser acessados
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

/*permite q qualquer applicacao acesse a api. '{origin:"http://localhost:3333"}' permite somente esse endereço*/
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);