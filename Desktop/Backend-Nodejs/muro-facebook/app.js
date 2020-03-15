import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import socketHandler from './src/server/socketHandler';

const APP = express ();
const SERVER = http.createServer(APP);

APP.use(express.static('dist'));
APP.set('views', './src/server/views');
APP.set('view engine', 'pug');

const io = socketio(SERVER);

const users = [], statesSaved = [], liked = [];

io.set('transports', ['websockets', 'polling']);
io.on('connection', socketHandler(io, users, statesSaved, liked));

APP.get('/', (req, res) => {
    res.render('home');
});

SERVER.listen(4000);