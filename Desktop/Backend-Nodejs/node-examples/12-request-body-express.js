const http = require('http');
const express = require('express');
const bodyParser = require('body-parser'); 	//libreria necesaria para este ej, se instalo con npm install --save body-parser

const APP = express();

APP.use(bodyParser.urlencoded());
APP.use(bodyParser.json());	//tiene que declararse antes de declarar el servidor

const SERVER = http.createServer(APP);		//se declara el servidor

APP.post('/', (req, res) => {
console.log(req.body);
res.send('hola');
});

SERVER.listen(4000);