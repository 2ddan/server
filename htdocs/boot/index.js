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
const _require = require("../common/require");
const router = require("../common/router");
const static = require("../common/static");
const hotfix = require("../common/hotfix");
const log = require("../common/log");
const mongodb = require("../common/mongodb");
//app modules
const ports = require("../app/port");
//cfg
const cfg = require("./cfg.json");


/***** Module variables *****/
// const cfg = JSON.parse(fs.readFileSync("./.cfg","utf-8").replace(/\/\*.+\*\//g,""));
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
    console.log("Listen port: ",cfg.port);
    console.log("OK!!! server start.");
});
/**
 * @description set hot-fix
 */
hotfix.init(hotfixDir,() => {
    console.log("hotfixDir: "+hotfixDir);
    console.log("OK!!! Set watching of hot-fixing modules.");
});
/**
 * @description init mongodb connect
 */
mongodb.init(cfg.dbpath,(err)=>{
    if(err)console.log("Fail!!! Mongodb connect.",err);
    else console.log("OK!!! Mongodb connect.");
});
/**
 * @description init log
 */
log.init(path.resolve(cfg.log));
/**
 * @description listen the process exit Press Control-D/Control-C
 */
process.on('SIGINT', function() {
    console.log('Got SIGINT.  Press Control-D/Control-C to exit.');
    mongodb.close();
    process.exit(0);
});