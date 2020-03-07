export default (UBERCLIENT, data, newCart, confirmedList) => {

    UBERCLIENT.get('/zona/:id', (req, res) => {
        let filteredRests = [], filteredRests2 =[];
        const zonaId = req.params.id;
        const showRests = data.filter(datos => datos.idZone === zonaId)
        for(let i=0;i<showRests.length;i++){
            filteredRests.push(showRests[i].name);
        }
        filteredRests.map(x => { if(!filteredRests2.includes(x)) {
            filteredRests2.push(x)
            }})
        showRests.length > 1 ? res.send( {status: 'ok', zona: showRests[0].zone, restaurantes: filteredRests2}) : res.send({ status: 'error', alerta: 'Zona no encontrada' });
    });

    UBERCLIENT.get('/rest/:id', (req, res) => {
        let filteredDishes = [], filteredDishes2 =[];
        const restId = req.params.id;
        const showDishes = data.filter(datos => datos.idRest === restId)
        for(let i=0;i<showDishes.length;i++){
            filteredDishes.push(showDishes[i].dish);
        }
        filteredDishes.map(x => { if(!filteredDishes2.includes(x)) {
            filteredDishes2.push(x)
            }})
            showDishes.length > 1 ? res.send( {status: 'ok', restaurante: showDishes[0].name, platillos: filteredDishes2}) : res.send({ status: 'error', alerta: 'Restaurate no encontrado' });
    });
    
    UBERCLIENT.get('/agregar/:id', (req, res) => {
        const dishId = req.params.id;
        const dishSel = data.filter(datos => datos.idDish === dishId);
        console.log(dishSel);
        if(newCart.length > 0){
                if(newCart[0].idRest === dishSel[0].idRest){
                    newCart.push(dishSel[0]);
                    res.send({ status: 'ok', agregado: dishSel[0].dish})
                }
                else{
                    res.send({ status: 'error', alerta: 'Debes seleccionar un platillo del mismo restaurant antes seleccionado'});
                }
        }
        else if (newCart.length === 0){
            newCart = [...dishSel];
            res.send({ status: 'ok', agregado: dishSel[0].dish})
        }
    });

    UBERCLIENT.get('/quitar/:id', (req, res) => {
        const dishId = req.params.id; 
        let name = 1;
        for(let i=0;i<newCart.length;i++){
            if(newCart[i].idDish === dishId){
                name = newCart[i].dish;
                newCart.splice(i, 1);
                i=newCart.length;
            }
            }
            if(name === 1){
                res.send({ status: 'error', alerta: 'No haz seleccionado ese platillo'})
            }
            else{
                res.send({ removido: name});
            }
    });
    UBERCLIENT.get('/cancelar', (req, res) => {
        newCart = [];
        res.send({ status: 'ok', pedido: "cancelado"})
    });

    UBERCLIENT.get('/confirmar', (req, res) => {
        newCart.length > 0 
        ? (newCart.map(datos => confirmedList.push(datos)), res.send({ status: 'ok', pedido: 'confirmado'}), newCart = []) // confirmedList.push(newCart
        : (newCart = [], res.send({ status: 'error', alerta: 'No haz seleccionado platillos'}));
    });


    UBERCLIENT.get('/checkout', (req, res) => {
        res.send({ status: 'ok', pedido: newCart });
    });
}