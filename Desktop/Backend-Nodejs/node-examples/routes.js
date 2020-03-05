module.exports = (APP, users) => {
    APP.get('/', (req, res) => {
        console.log(req.query);
        res.send('hola');
    });

    APP.get('/users/:id', (req, res) => {
        const id = req.params.id;
        users.push(id);
        console.log(users);
        res.send(`Search user ${id}`);
    });
}