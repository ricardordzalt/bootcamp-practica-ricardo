import http, { Server } from 'http';
import express from 'express';
import path from 'path';
import getImages from './getImages';

const port = 5000;
const APP = express();

APP.set('views', './views');
APP.set('view engine', 'pug');

APP.use(express.static('public'));  //carpeta public para todos los archivos estaticos

const SERVER = http.createServer(APP);

APP.get('/', (req, res) =>{
    const data = {title: 'home'};
res.render('index', data);
});

APP.get('/images', (req, res)=>{
    const images = getImages();
    res.render('images', { images, title: 'Image Gallery'});
});

APP.get('/download/:image', (req, res) => {
    const file = path.join(__dirname + '/public/images/' + req.params.image);
    res.download(file);
});
SERVER.listen(port); 