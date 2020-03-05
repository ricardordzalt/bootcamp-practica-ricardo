const http = require('http');

http.createServer((req, res) => {  	//se levanta el request y se ? función callback 
const data = [];	//array vacío para guardar los strings
req.on('data', (chunk) => {		//cada vez que nodejs reciba un pedazo de ese string de datos, se va a poder obtener ahí disponible para poderlo manipular, chunk = pedacito de datos
console.log('chunk', chunk);
data.push(chunk);
});
req.on('end', () => {	//cuando ya no hay mas strings para recibir se termina la función
const body = Buffer.concat(data);	//los data los va a juntar en un body
console.log('buffer', body);
console.log('result', JSON.parse(body.toString()));
res.end('end request');
});
}).listen(3000);


