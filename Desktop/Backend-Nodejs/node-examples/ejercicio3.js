import http from 'http';
import path from 'path';
import express from 'express';

const port = 4000;
const APP = express();

const SERVER = http.createServer(APP);

APP.get('/download/', (req, res)=> {
    var fileid = req.query.image;
    var file = path.join(__dirname + `/images/${fileid}`)
    res.download(file);
});

APP.get('/files', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/downloads.html'));
});


SERVER.listen(port);