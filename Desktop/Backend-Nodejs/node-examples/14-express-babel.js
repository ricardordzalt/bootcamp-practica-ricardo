import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const APP = express();

const SERVER = http.createServer(APP);

APP.get('/', (req, res) => {
    console.log(req.headers);
    res.send('end request on GET');
});

APP.post(['/', '/users'], (req, res) => {   //hace la misma operación en / y /users
    console.log(req.headers);
    res.send('end request');
});

SERVER.listen(process.env.PORT);