/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const http = require('http');
const url = require('url');
const fs = require('fs');
//private modules
const router = require("../common/router");
console.log(router);

/***** Module variables *****/

const port = 1224;
let serv;

/***** Module exports *****/

/***** local running ******/

serv = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
	console.log(request);
	console.log(response);
    router.GET(request, response);
});
serv.listen(port);
console.log("server start ok");
console.log("listen port: ",port);