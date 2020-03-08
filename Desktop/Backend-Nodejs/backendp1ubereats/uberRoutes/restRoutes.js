import { v4 as uuidv4 } from 'uuid';

export default (UBERREST, dishesList, confirmedList, preparingList, deliveryList) => {

    UBERREST.put('/aceptar/', (req, res) => {       //aceptar pedido
        let msj = "", aceptada = "";
        const accepted = req.query.value; // se acepta con /?value=true y se rechaza con /?value=false
        if(JSON.parse(accepted) === true){
            confirmedList.forEach(datos => preparingList.push(datos));
            msj = JSON.stringify(preparingList);
            aceptada = "ok";
        }
        else{
            msj = '{"orden": "rechazada"}';
            aceptada = "error";
            confirmedList = [];
        }
        msj = JSON.parse(msj);
        res.send({ status: aceptada, orden: 'aceptada', orden: msj});
    });

    UBERREST.post('/terminar', (req, res) =>{        //terminar pedido y pasarlo al repartidor
        let msj = "";
        if(preparingList.length > 0){
        preparingList.forEach(datos2 => deliveryList.push(datos2));
        msj = JSON.stringify(deliveryList);
        }
        else{
            msj += "Orden: sin confirmar";
        }
        msj = JSON.parse(msj);
        res.send({ status: 'ok', pedido: msj}); 
    })

    UBERREST.get('/pedidos', (req, res) => {        //ver pedidos
        res.send({ status: 'ok', pedido: confirmedList});
        console.log("=");
    });

    UBERREST.get('/total', (req, res) => {          //calcular el total una vez que están terminado el platillo
        let total = 0, msj = "", status = "";
        if(deliveryList.length > 0){
            deliveryList.forEach(datos3 => total += datos3.price);
            total *= .65;
            msj = JSON.stringify(total);
            status = 'ok';
        }
        else{
            msj = '{"orden": "sin terminar/aceptar"}';
            status = 'error';
        }
        msj = JSON.parse(msj);
        res.send({ status: status, total: msj})
    });

    UBERREST.post('/agregar/', (req, res) => {     // agregar platillo nuevo ?name=nombreRestaurant&?dish=nombreplatillo&price=precioplatillo
        const name = req.query.name, 
        dish = req.query.dish, 
        price = Number(req.query.price);
        let idRest = "",
        idZone = "",
        zone = "",
        idDish = "",
        msj = "", status = "",
        jsoning = "";
        let restaurante = dishesList.filter(datos => datos.name === name);
        if(restaurante.length > 0 && name && dish && price){
            restaurante = restaurante[0];
            idRest = restaurante.idRest;
            idZone = restaurante.idZone;
            zone = restaurante.zone;
            idDish = uuidv4();
            jsoning = `{ "idRest": "${idRest}", "name": "${name}", "idZone": "${idZone}", "zone": "${zone}", "idDish": "${idDish}", "dish": "${dish}", "price": ${price} }`;
            jsoning = JSON.parse(jsoning);
            dishesList.push(jsoning);
            status = 'ok';
            msj = jsoning;
        }
        else{
            status = 'error';
            msj = 'Ingresar correctamente los datos';
        }
        res.send({ status: status, agregado: msj});
    });

    UBERREST.put('/quitar/:id', (req, res) => {         //quitar un platillo del menú que ve el cliente
        const dish = req.params.id;
        let status;
        dishesList = dishesList.filter(datos => datos.idDish !== dish)
        res.send({ status: 'ok', platillos: dishesList});
    });

    UBERREST.get('/ver', (req, res) => {            //ver pedidos
        res.send({platillos: dishesList})
    });
}