export default (UBERCLIENT, data, newCart) => {
    UBERCLIENT.get('/zona/:id', (req, res) => {
        const zonas = data.filter(dish => dish.idZone === req.params.id); //filtra los arrays que hagan match de las zonas con el id puesto en el url
        if(zonas.length > 0){  //si el id de params.id encuentra hace match con 1 o más elementos se entra en este ciclo
            const rests = zonas.map(rests => rests.name) //filtra la información del objeto name para cada array de zonas
            res.send({ status: 'ok', zona: zonas[0].zone,  resturantes: rests}); //manda un json con status ok, con el objeto zone del primer array, aquí no hay problema pues siempre será la misma zona y si entró en este condicional siempre habrá al menos un elemento, y los restaurantes 
        }
        else{
            res.sendStatus(404); //si params.id no hace match con alguna zona entonces se devuelve un 404
        }
    });

    
    UBERCLIENT.get('/rest/', (req, res) => {
        const rest = data.find(restaurant => restaurant.idRest === req.query.idRest); //filtra el primer array que haga match con query.id
        if(rest !== undefined){  //si find no encuentra un match, entonces devolvera un undefined, en caso de que no devuelva un undefined se entrará en ésta condición
            res.send({ status: 'ok', restaurant: rest.name, platillos: rest.dishes}); //manda un json con ok y con los platillos del restaurant
        }
        else{
            res.sendStatus(404); //si query id no se encuentra, es decir, si rest devuelve undefined, se envía un 404
        }
    });
    

    UBERCLIENT.put('/agregar/:dishId', (req, res) => {
        let i, dish;
        for(i=0; i<data.length;i++){    //for para revisar cada elemento del array
            dish = data[i].dishes.find(platillo => platillo.idDish === req.params.dishId);  //busca para cada array si params coincide con el objeto dishes.idDish
            if(dish !== undefined){ //si es diferente de undefined, es decir, si encuentra un elemento
                i=data.length;  //i = el largo del array, para salir del for en ésta iteración
                dish.cart++;    //se aumenta 1 a dishes.cart
                res.send({ status: 'ok', Platillo: dish});  //devuelve json con status ok y con el platillo seleccionado
            }
            else if(dish === undefined && i===data.length-1){ //si no se ha encontrado un platillo, y si es la última iteraccion entra en el condicional
                res.sendStatus(404); //devuelve un not found si se cumple la condición mencionada
            }
        }
    });

    UBERCLIENT.put('/quitar/:dishId', (req, res) => {
        let i=0, dish;
        for(i=0; i<data.length;i++){   //for para revisar cada elemento del array
            dish = data[i].dishes.find(platillo => platillo.idDish === req.params.dishId);  //busca para cada array si params coincide con el objeto dishes.idDish
            if(dish !== undefined && dish.cart > 0){ //si es diferente de undefined, es decir, si encuentra un elemento, y además si ya había al menos un platillo seleccionado en cart
                i=data.length;  //i = el largo del array, para salir del for en ésta iteración
                dish.cart--;    //se disminuye 1 a dishes.cart
                res.send({ status: 'ok', Platillo: dish});  //devuelve json con status ok y con el platillo seleccionado
            }
            else if(dish !== undefined && dish.cart === 0){ //si existe el platillo, pero no se había seleccionado ninguno, cart === 0
                res.send({ status: 'error', alerta: 'No has agregado éste platillo' }); //se envía json con status de error y con alerta de que no se ha agregado el platilo
            }
        }
    });

   
    UBERCLIENT.put('/cancelar/', (req, res) => {
        data.map(info => info.dishes.map(info2 => info2.cart = 0));
        res.send({ status: 'ok', platillos: data})
    });

    UBERCLIENT.put('/confirmar', (req, res) => {
        let i, j;
        for(i=0;i<data.length;i++){
            for(j=0;j<data[i].dishes.length;j++){
                if(data[i].dishes[j].cart>0){
                    newCart.push(data[i]);
                }
            }
        }
        console.log(newCart);
        if(newCart.length === 1){
            res.send(newCart);
        }
        else{
            res.send( {status: 'error', alerta: 'Debes seleccionar 1 platillo solamente, vuelve a comenzar'});
            data.map(info => info.dishes.map(info2 => info2.cart = 0));
            newCart.length=0;
        }
    });

    UBERCLIENT.put('/check', (req,res) => {
        res.send(newCart);
    });
};