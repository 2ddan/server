/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const url = require('url');
const path = require("path");
const fs = require('fs');
//private modules
const router = require("../common/router");
const static = require("../common/static");
const hotfix = require("../common/hotfix");

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
 * @description init routers
 */
router.init(cfg,()=>{
    console.log("OK!!! server start.");
    console.log("Listen port: ",cfg.port);
});