var http = require('http');
http.createServer(function(req, res) {
if(req.url === '/info'){
res.end('Site info');
}
 else if(req.url === '/home'){
    res.end('Home info');
} 
else if(req.url === '/Ricardo'){
    res.end('Ricardo');
} 
else {     
res.end('Ultra light serve');
}
}).listen(3000);