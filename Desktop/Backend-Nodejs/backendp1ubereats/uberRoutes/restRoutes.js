export default (UBERREST, confirmedList, preparingList, deliveryList) => {
    //preparingList = [];
    //deliveryList = [];
    UBERREST.get('/aceptar/', (req, res) => {
        const accepted = req.query.value; // se acepta con /?value=true y se rechaza con /?value=false
        if(JSON.parse(accepted) === true){
            confirmedList.map(datos => preparingList.push(datos));
            res.send({ status: 'ok', orden: 'aceptada', confirmado: preparingList});
        }
        else{
            res.send({ status: 'ok', orden: 'rechazada'});
        }
    });

    UBERREST.get('/terminar', (req, res) =>{
        console.log();
        preparingList.length > 0 
        ? (preparingList.map(datos2 => deliveryList.push(datos2),
        res.send({ status: 'ok', orden: 'enviada', enviado: deliveryList})))
        : res.send({ status: 'error', orden: 'sin confirmar'});
        console.log("---");
        console.log(deliveryList)
    })

    UBERREST.get('/pedidos', (req, res) => {
        res.send({ status: 'ok', pedido: confirmedList});
        console.log("=");
    });

    UBERREST.get('/total', (req, res) => {
        let total = 0;
        deliveryList.map(datos3 => total += datos3.price);
        console.log(total);
        res.send({ status: 'ok', total});
    });

}