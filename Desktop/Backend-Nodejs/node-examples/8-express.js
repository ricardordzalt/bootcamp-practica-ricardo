var http = require('http');
var express = require('express');

var APP = express ();					//se inicializa express

var SERVER = http. createServer(APP);			//se inicializa el servidor?**  **antes se enviaba una función, ahora se envía la función express

var port = 4000;					//se inicializa el puerto 4000
  		
APP.get('/', function(req, res) {			//se hacen "las paginas default" con los request? get y post
res.send('Home page');
});

APP.get('/users', function(req, res) {
res.send('Users page');
});

APP.post('/save', function(req, res) {
res.send('Save info');
})

APP.post('/Ricardo', function(req, res) {
res.send('Ricardo info');
})

SERVER.listen(4000, function(err){
if(err){
console.log(err);
return;
}
console.log('Server liste on ', port);
});