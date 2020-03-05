import http from 'http';
import express from 'express';
import productsRoutes from './online-store/productsRoutes.js';
import productsList from './online-store/productsList';
import adminRoutes from './online-store/adminRoutes.js';

const APP = express();
const PRODUCTS = express();
const ADMIN = express();

let total = 0;

APP.use('/products', PRODUCTS); //se define una ruta exclusiva para el prefix PRODCUTS
APP.use('/admin', ADMIN);

const SERVER = http.createServer(APP);

APP.get('/', (req, res) =>{
    res.send('API HOME');
})

productsRoutes(PRODUCTS, productsList, total);
adminRoutes(ADMIN, productsList);
SERVER.listen(4000);