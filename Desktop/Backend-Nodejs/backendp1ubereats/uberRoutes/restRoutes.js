export default (UBERREST, userCart, confirmedCart) => {
    
    UBERREST.put('/pedidos/', (req, res) => {
        console.log("---");
        console.log(userCart);
        if(userCart.length === 1){
            res.send( {status: 'ok', platillo: userCart});
        }
        else{
            res.send( {status: 'error', alerta: 'No hay pedidos confirmados'});
        }
    });

    UBERREST.post('/confirm/', (req, res) => {
        const dec = JSON.parse(req.query.decision);
        if(dec === true){
            confirmedCart = [...userCart];
            res.send({ status: 'ok', alerta: 'Pedido aceptado'});
        }
        else if (dec === false){
            userCart.length = 0;
            res.send({ status: 'ok', alerta: 'Pedido rechazado'});
        }
        else{
            res.send({ status: 'error', alerta: 'Ingresar true o false'});
        }
        console.log(confirmedCart);
    });

    //UBERREST.post('')
};