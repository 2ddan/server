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
const log = require("../common/log");

/***** Module variables *****/
const cfg = JSON.parse(fs.readFileSync("./.cfg","utf-8").replace(/\/\*.+\*\//g,""));
let serv;
//current file directory
let currPath = process.cwd();
//hot fix directory
let hotfixDir = path.resolve(currPath,"../");
/***** Module exports *****/

/***** local running ******/
/**
 * @description init static folder, Cache the data in RAM
 */
static.init(cfg.static,()=>{
    console.log("OK!!! Init static folder.");
});
/**
 * @description init router
 */
router.init(cfg,()=>{
    console.log("OK!!! server start.");
    console.log("Listen port: ",cfg.port);
});
/**
 * @description set hot-fix
 */
hotfix.init(hotfixDir,() => {
    console.log("OK!!! Set watching of hot-fixing modules.");
    console.log("hotfixDir: "+hotfixDir);
});
/**
 * @description init log
 */
log.init(path.resolve(cfg.log));