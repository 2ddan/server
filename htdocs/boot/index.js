/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const http = require('http');
const url = require('url');
const path = require("path");
const fs = require('fs');
//private modules
const router = require("../common/router");
console.log(router);
const static = require("../common/static");

/***** Module variables *****/
const cfg = JSON.parse(fs.readFileSync("./.cfg","utf-8"));
let serv;

/***** Module exports *****/

/***** local running ******/
/**
 * @description init static folder, Cache the data in RAM
 */
static.init(path.resolve(cfg.static),()=>{
    console.log("OK!!! Init static folder.");
});

/**
 * @description create http server module, distribute http events
 */
serv = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
	console.log(request.url);
	//console.log(response);
    router.GET(request, response);
});
serv.listen(cfg.port);
console.log("OK!!! server start.");
console.log("Listen port: ",cfg.port);