//import http from 'http';
//import express from 'express';

const http = require('http');
const express = require('express');

const APP = express();


const SERVER = http.createServer(APP);

APP.get('/', (req, res) => {
    console.log(req.headers);
    res.send('end request');
});

APP.post(['/', '/users'], (req, res) => {   //hace la misma operación en / y /users
    console.log(req.headers);
    res.send('end request');
});


SERVER.listen(5000);