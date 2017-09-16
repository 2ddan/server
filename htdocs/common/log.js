/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const fs = require('fs');

//private modules
const util = require('util');

/***** Module variables *****/
let root;
/**
 * @description error wait table
 */
let wait=[];

/**
 * @description log
 * @param {String}type log type (will be suffix of the log file) : "error","warn","info"...
 * @param {String}title the log message's title
 * @param {String}msg detail of the log
 */
const Log = (type,msg) => {
    let _d = new Date();
    return {
        date: _d.toString(),
        name: `${_d.getFullYear()}-${_d.getMonth()}-${_d.getDate()}`,
        type: type,
        msg: msg
    };
}

/**
 * @description write next
 */
const writeNext = (err) => {
    wait.shift();
    wait.length && _write(wait[0]);
    if(err)
        throw err;
};

/**
 * @description write log
 */
const _write = (data) => {
    let _n = `${root}/${data.name}.${data.type}`,
        _err = `========================\r\n${data.date}\r\n`;
    fs.appendFile(_n,`${_err}${data.msg}\r\n`,writeNext);
}

/***** Module exports *****/
/**
 * @description set global error listener
 * @param {String}path log directory's path 
 * @example (1,"common/util.js") return "common/"
 */
exports.init = (path) => {
    root = path;
    process.on('uncaughtException', (err) => {
        wait.push(Log("error",err.stack));
        if(wait.length == 1)
            _write(wait[0]);
    });
};

/***** local running ******/

// routerEvent.on("event", (type,msg) => {
//     console.log('trigger a httpRequest事件！');
//   });
