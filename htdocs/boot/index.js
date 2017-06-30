var http = require('http');
var port = 1224;
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
	console.log(request);
	console.log(response);
}).listen(1224);
console.log("server start ok");
console.log("listen port: ",port);