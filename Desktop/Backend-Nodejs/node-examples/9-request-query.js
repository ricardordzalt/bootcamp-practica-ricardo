const url = require('url');  //const porque la url no cambia
const http = require('http');  //esto es como el import

http.createServer((req, res) => {  //recibe como parámetros request y response
console.log(req.url, req.method);  //lo accesible es la url y el método

const params = url.parse(req.url, true);

console.log(params);

//res.end(params.query.id); 
res.end(JSON.stringify(params));  //se usa un método para transformar un objeto en string e imprimirlo
}).listen(5000);