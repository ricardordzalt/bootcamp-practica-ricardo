const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const APP = express();
const ropa = [
    {
    id: 1,
    clothing: 'tenis',
    price: 100,
    },
    {
    id: 2,
    clothing: 'shirt',
    price: 30,
    },
    {
    id: 3,
    clothing: 'pants',
    price: 60,
    },
    {
    id: 4,
    clothing: 'dress',
    price: 200,
    }
];

APP.use(bodyParser.urlencoded());
APP.use(bodyParser.json());

const SERVER = http.createServer(APP);

APP.get('/', (req, res) => {
res.send(ropa);
console.log(ropa);
});

APP.get('/ropa/:id', (req, res) => {
const id= req.params.id;
res.send(ropa[id]);
console.log(ropa[id]);
});

APP.get('/buy/:id', (req, res) => {
const id= req.params.id-1;
ropa.splice(id, 1);
console.log(ropa);
});

SERVER.listen(4000);