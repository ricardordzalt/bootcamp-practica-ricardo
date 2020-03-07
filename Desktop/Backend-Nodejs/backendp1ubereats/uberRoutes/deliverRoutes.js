export default (UBERDELIVER, deliveryList) => {

    UBERDELIVER.get('/pedidos', (req, res) => {
        res.send({ status: 'ok', pedido: deliveryList});
        console.log(deliveryList);
    });



}