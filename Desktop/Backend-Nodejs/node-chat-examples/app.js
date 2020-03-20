import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import socketio from 'socket.io';
import bodyParser from 'body-parser';
import socketHandler from './src/server/socketHandler';
import connection from './modules/connection';
import {EVENTS} from './constants';

dotenv.config();

const APP = express();
const SERVER = http.createServer(APP);

APP.use(express.static('dist'));
APP.set('views', './src/server/views');
APP.set('view engine', 'pug');
APP.use(bodyParser.json());

const io = socketio(SERVER);

let chatHistory = [];
const activeUsers = [];

connection.query('select * from messages', (error, results) => {
    chatHistory = results.map(message => {
        return{
            userName: message.userName, 
            value: message.message,
            dateNow: message.dateTime 
        }
    });
    io.on('connection', socketHandler(io, activeUsers, chatHistory, connection));
});
io.set('transports', ['websocket', 'polling']);

APP.get('/', (req, res) => {
    res.render('home');
});




SERVER.listen(5000);