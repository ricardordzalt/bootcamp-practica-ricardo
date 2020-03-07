import { v4 as uuidv4 } from 'uuid';

export default (ADMIN, productsList) => {
    ADMIN.post('/', (req, res) => {
        if(req.query.name && req.query.stock && req.query.value){
        productsList.push({
            "id": uuidv4(), 
            "name": req.query.name, 
            "stock": Number(req.query.stock), 
            "value": Number(req.query.value),
            "sold": Number(0)
        });
        res.json({ status: 'ok', products: productsList});
    }
    else{
        res.sendStatus(404);
    }
    });

    ADMIN.delete('/:id', (req, res) =>{
        const product = productsList.find (p => p.id === req.params.id);
        if(product){
            productsList = productsList.filter(p => p.id !== req.params.id);
            res.json({ status: 'ok', result: productsList});
        }
        else {
            res.sendStatus(404);
        }
    });

    ADMIN.put('/', (req, res) => {
        const guid = req.query.id;
        const product = productsList.find(p => p.id === guid);
        let i;
        if(product){
            for(i=0; i<productsList.length; i++){
                if(productsList[i].id === guid){
                    productsList[i].stock = Number(req.query.newStock);
                    res.json({ status: 'ok', products: productsList})
                }
            }
        }else{
            res.sendStatus(404);
        }
        res.send({ status: 'ok'})
    });

    ADMIN.get('/', (req, res) => {
        let sum = 0;
        const totalSold = productsList.map((sold) => {
            return sold.sold * sold.value;
        });
        for(let i=0; i<totalSold.length;i++){
            sum += totalSold[i];
        }
        res.send({status: 'ok', total: sum});
    })

    ADMIN.get('/:id', (req, res) => {
        const product = productsList.find(p => p.id === req.params.id);
        const total = product.sold * product.value;
        res.send({ status: 'ok', total_producto: total});
    });
}