import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; 
import bearerToken from 'express-bearer-token';
import productsRoutes from './online-store/productsRoutes.js';
import productsList from './online-store/productsList';
import adminRoutes from './online-store/adminRoutes.js';
import setDate from './middlewares/setDate.js';
import logger from './middlewares/logger.js';
import userLogged from './middlewares/userLogged.js';
import hasProduct from './middlewares/hasProduct.js';
import { matchHash, createToken } from './hasher';
import authorize from './middlewares/authorize.js';
import usuarios from './users/usuarios.js';

dotenv.config();

const APP = express();
const PRODUCTS = express();
const ADMIN = express();

let total = 0;

APP.use(bodyParser.json());

APP.use('/products', PRODUCTS); //se define una ruta exclusiva para el prefix PRODCUTS
APP.use('/admin', ADMIN);

PRODUCTS.use(bearerToken());
PRODUCTS.use(setDate);
PRODUCTS.use(logger);
PRODUCTS.use(authorize);
PRODUCTS.use(userLogged);
//PRODUCTS.use(hasProduct(productsList));

const SERVER = http.createServer(APP);

APP.get('/', (req, res) =>{
    res.send('API HOME');
});

//APP.post('/login', (req, res) =>{
//    const { user, password } = req.body;
//    console.log(user, password);
//    if(user === users && matchHash(password,
//         process.env.PASSWORD)){
//        const newToken = createToken({ user });
//        res.json({ status: 'ok', result: newToken });
//    }
//    else{
//        res.sendStatus(401);
//    }
//});

APP.post('/login', (req, res) =>{
    const { user, password } = req.body;
    let validate = false;
    for(let i=0; i<usuarios.length; i++){
        if(user === usuarios[i].user && matchHash(password,usuarios[i].password) && usuarios[i].isActive === true){
        const newToken = createToken({ user });
        res.json({ status: 'ok', result: newToken });
        i=usuarios.length;
        validate = true;
    }
}
    validate === false ? res.sendStatus(401) : validate = false;
});


productsRoutes(PRODUCTS, productsList, total);
adminRoutes(ADMIN, productsList);
SERVER.listen(5000);