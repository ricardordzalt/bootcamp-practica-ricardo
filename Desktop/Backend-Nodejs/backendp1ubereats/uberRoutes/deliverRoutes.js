export default (UBERDELIVER, deliveryList, acceptedList) => {

    UBERDELIVER.get('/pedidos', (req, res) => {
        console.log(deliveryList);
        res.send({ status: 'ok', pedido: deliveryList});
    });

    UBERDELIVER.get('/aceptar/', (req, res) => {
        let msj = "", aceptada = "";
        const accepted = req.query.value; // se acepta con /?value=true y se rechaza con /?value=false
        if(JSON.parse(accepted) === true){
            deliveryList.forEach(datos => acceptedList.push(datos));
            msj = JSON.stringify(acceptedList);
            aceptada = "ok";
        }
        else{
            msj = '{"orden": "No aceptada"}';
            aceptada = "error";
            deliveryList = [];
        }
        msj = JSON.parse(msj);
        res.send({ status: aceptada, orden: msj});
    });

    UBERDELIVER.get('/finalizar', (req, res) =>{
        let total = 0, status = "", msj;
        if(acceptedList.length > 0){
            acceptedList.forEach(datos => total += datos.price)
            total = (.15 * total) + 2;
            msj = JSON.stringify(total);
            status = 'ok';
            acceptedList = [];
        }
        else{
            status = 'error';
        }
        res.send({ status: status, ganancias: total})
    })

}