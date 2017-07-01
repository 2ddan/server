var http = require('http');
var router = require("../common/router");
console.log(router);

var port = 1224;
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
	console.log(request);
	console.log(response);
    router.GET(request, response);
}).listen(1224);
console.log("server start ok");
console.log("listen port: ",port);