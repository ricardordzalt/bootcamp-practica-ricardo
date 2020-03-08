import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import dishesList from './info/dishesList.js';
import userRoutes from './uberRoutes/userRoutes';
import restRoutes from './uberRoutes/restRoutes';
import deliverRoutes from './uberRoutes/deliverRoutes';
import cartList from './info/cartList';
import confirmedList from './info/confirmedList';
import preparingList from './info/preparingList';
import deliveryList from './info/deliveryList';
import acceptedList from './info/acceptedList';

dotenv.config();

const APP = express();
const UBERCLIENTE = express();
const UBERREST = express();
const UBERDELIVER = express();

APP.use('/user', UBERCLIENTE);
APP.use('/rest', UBERREST);
APP.use('/deliver', UBERDELIVER);

const SERVER = http.createServer(APP);

APP.get('/', (req, res) =>{
    res.send('UBER EATS HOME');
});

userRoutes(UBERCLIENTE, dishesList, cartList, confirmedList);
restRoutes(UBERREST, dishesList, confirmedList, preparingList, deliveryList);
deliverRoutes(UBERDELIVER, deliveryList, acceptedList);
SERVER.listen(process.env.PORT);