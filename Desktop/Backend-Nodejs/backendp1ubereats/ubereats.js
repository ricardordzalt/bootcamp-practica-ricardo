import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import dishesList from './info/dishesList.js';
import userRoutes from './uberRoutes/userRoutes';
import restRoutes from './uberRoutes/restRoutes';
import cartList from './info/cartList';
import deliveryList from './info/deliveryList';

dotenv.config();

const APP = express();
const UBERCLIENTE = express();
const UBERREST = express();

APP.use('/user', UBERCLIENTE);
APP.use('/rest', UBERREST);

const SERVER = http.createServer(APP);

APP.get('/', (req, res) =>{
    res.send('UBER EATS HOME');
});

userRoutes(UBERCLIENTE, dishesList, cartList);
restRoutes(UBERREST, cartList)
SERVER.listen(process.env.PORT);