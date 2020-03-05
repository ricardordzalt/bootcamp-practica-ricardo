const http = require('http');	//ya viene con nodejs
const express = require('express'); 	//tiene que instalarse en el proyecto con el comando npm

const APP = express(); 	//inicializar express

const SERVER = http.createServer(APP);	//se inicializa el servidor, en vez de mandarsele un callback se le manda express?

const users = [];

APP.get('/', (req, res) => {		//args ruta y callback que se manda a hacer
console.log(req.query);
res.send('hola');
});

APP.get('/users/:id', (req, res) => {
    const id = req.params.id
    users.push(id);
    console.log(users);
    res.send(`Search user ${id}`);
    });

SERVER.listen(4000);