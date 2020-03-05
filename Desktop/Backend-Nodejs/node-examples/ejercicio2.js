import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const APP = express();

const SERVER = http.createServer(APP);

const normal = Number(process.env.seats_normal);
const vip = Number(process.env.seats_vip) ;

APP.get(['/', '/rooms'], (req, res) => {
    var normal=Number(process.env.normal_rooms);
    var vips=Number(process.env.vip_rooms);
    var i;
    var sending, nuevosend = "Salas disponibles: <br/>";
    for(i=1;i<=normal;i++){
        sending = "Sala normal " + i + "<br/>";
        nuevosend = nuevosend.concat(sending);
    }
    for(i=1;i<=vips;i++){
        sending = "Sala Vip " + i + "<br/>";
        nuevosend = nuevosend.concat(sending);
    }
    res.send(nuevosend);
});

APP.post('/buy/:type/:num', (req, res) => {
    var type = req.params.type;
    var response;
    var num=req.params.num;
    var stock;
    if (!isNaN(num)){
        if (type == "normal" && (process.env.seats_normal - num) >= 0){
            process.env.seats_normal -= num;
            response = "Quedan "+ process.env.seats_normal + " boletos normales y " + process.env.seats_vip + " boletos vip"
        }
        else if(type == "vip" && (process.env.seats_vip - num) >= 0){
            process.env.seats_vip -= num;
            response = "Quedan "+ process.env.seats_normal + " boletos normales y " + process.env.seats_vip + " boletos vip"
        }
        else{
            response = "No quedan suficientes boletos disponibles requeridos para el tipo de sala " + type;
        }
    }
else{
    response = "No ingresaste un número válido";
}
res.send(response);
});

APP.get('/total', (req, res) => {
    var msj;
    var income_normal, income_vip;
    income_normal = normal - process.env.seats_normal;
    income_normal *= process.env.price_normal;
    income_vip = vip - process.env.seats_vip;
    income_vip *= process.env.price_vip;
    msj = "Ganancias de sala normal: $" + income_normal + "<br/> Ganancias de la sala vip: $" + income_vip;
    res.send(msj);
});

SERVER.listen(process.env.PORT);