import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import appsdata from './info/appsdata';

dotenv.config();

const APP = express();

APP.use(bodyParser.urlencoded());
APP.use(bodyParser.json());

const SERVER = http.createServer(APP);

APP.get('/zona/:zoneid', (req, res) => {
    var num, i, msj = "Restaurantes disponibles en la zona elegida: ", zonaid = req.params.zoneid;
    var zonas =  appsdata.filter(function(Zone) {
        return Zone.zone == zonaid;
    });
    num = Object.keys(zonas).length;
    for(i=0;i<num;i++){
        msj += i+1 +".- " + zonas[i].name + " ";
    }
    res.send(msj);
});

APP.get('/restaurant/:restid', (req, resp) =>{
    var num, i, msj = "Los platillos son: ", rest = req.params.restid;
    var rests =  appsdata.filter(function(res) {
        return res.name == rest;
    });
    console.log(rests);
    num = Object.keys(rests[0].dishes).length;
    for(i=0;i<num;i++){
        msj += i+1 + ".- " + rests[0].dishes[i].dish + " ";
    }
    resp.send(msj);
});
    APP.get('/add/:food', (req, res) => {
        var bought = req.params.food, i, j, num1, num2;
        num1 = Object.keys(appsdata).length;
        for(i=0;i<num1;i++){
            num2 = Object.keys(appsdata[i].dishes).length;
            for(j=0;j<num2;j++){
                if(appsdata[i].dishes[j].dish == bought){
                    appsdata[i].dishes[j].cart += 1;
                    res.send("Compraste " +appsdata[i].dishes[j].cart + " " + bought);
                }
            }
        }
}); 
APP.get('/quit/:food', (req, res) => {
    var bought = req.params.food, i, j, num1, num2;
    num1 = Object.keys(appsdata).length;
    for(i=0;i<num1;i++){
        num2 = Object.keys(appsdata[i].dishes).length;
        for(j=0;j<num2;j++){
            if(appsdata[i].dishes[j].dish == bought && appsdata[i].dishes[j].cart > 0){
                appsdata[i].dishes[j].cart -= 1;
                res.send("Quitaste 1 " + bought);
            }
        }
    }
}); 

APP.get('/checkout', (req, res) => {
    var i, j, num1, num2, msj = "Tu pedido es de ", total = 0;
    num1 = Object.keys(appsdata).length;
    for(i=0;i<num1;i++){
        num2 = Object.keys(appsdata[i].dishes).length;
        for(j=0;j<num2;j++){
            if(appsdata[i].dishes[j].cart  > 0){
                total += appsdata[i].dishes[j].price * appsdata[i].dishes[j].cart;
                msj += appsdata[i].dishes[j].cart + " " + appsdata[i].dishes[j].dish + " ";
            }
        }
    }
    res.send(msj + "El total por ésta compra sería de: $" + total + "USD ");
}); 

APP.get('/cancelar', (req, res) => {
    var i, j, num1, num2;
    num1 = Object.keys(appsdata).length;
    for(i=0;i<num1;i++){
        num2 = Object.keys(appsdata[i].dishes).length;
        for(j=0;j<num2;j++){
            if(appsdata[i].dishes[j].cart  > 0){
                appsdata[i].dishes[j].cart = 0;
            }
        }
    }
    res.send("Orden cancelada");
}); 

APP.get('/confirmar', (req, res) => {
    var i, j, num1, num2, total = 0;
    num1 = Object.keys(appsdata).length;
    for(i=0;i<num1;i++){
        num2 = Object.keys(appsdata[i].dishes).length;
        for(j=0;j<num2;j++){
            if(appsdata[i].dishes[j].cart  > 0){
                total += appsdata[i].dishes[j].price * appsdata[i].dishes[j].cart;
                appsdata[i].dishes[j].cart = 0;
                console.log("Has comprado " + appsdata[i].dishes[j].cart + " " + appsdata[i].dishes[j].dish);
            }
        }
    }
    res.send("El total de la compra fue de: $" + total + "USD");
}); 

SERVER.listen(process.env.PORT); 