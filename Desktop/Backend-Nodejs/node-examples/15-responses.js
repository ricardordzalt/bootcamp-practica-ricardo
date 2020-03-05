import http from 'http';
import path from 'path';
import express from 'express';

const APP = express();

const SERVER = http.createServer(APP);

APP.get('/', (req, res) => {
res.send('<h1>Hello World<h1/>');
});

APP.get('/hello', (req, res) =>{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

APP.get('/jinx', (req, res) =>{
    res.sendFile(path.join(__dirname + '/images/jinx.jpg'));
});
    
APP.get('/cookies', (req, res) => {
    res.cookie('i-follow-you', 'hello', { expires: new Date(Date.now() + 10000)});
    res.end();
});

APP.get('/headers', (req, res) => {
    res.set({
    a: 1,
    b: 2,
    c: 3
});
    res.end();
    });
APP.get('/redirect', (req, res) => {
    res.redirect('/hello');
});

APP.get('/users/:id', (req, res) => {
    if(Number(req.params.id) === 1) {
        res.send('user found');
    }
    else{
        res.sendStatus(404);
    }
});

APP.get('/download', (req, res) => {
    const file = path.join(__dirname + '/images/jinx.jpg')
    res.download(file);
});

SERVER.listen(3000);
