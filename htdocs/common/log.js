/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
//private modules

/***** Module variables *****/
let root;
/**
 * @description error wait table
 */
let wait=[];

/**
 * @description write the error in file
 */
const writeError = (data) => {
    let _d = new Date(),
        _err = `========================\n${_d.toString()}\n`;
    fs.write(`${root}/${d.toString()}.error`, `${_err}ERROR ::: \n ${data}\n`,null,"utf8",()=>{
        wait.shift();
        wait.length && writeError(wait[0]);
    });
};

/***** Module exports *****/
/**
 * @description set global error listener
 * @param {String}path log directory's path 
 * @example (1,"common/util.js") return "common/"
 */
exports.init = (path) => {
    root = path;
    process.on('uncaughtException', (err) => {
        console.log(`uncaughtException :::: ${err}`);
        wait.push(err);
        if(wait.length == 1)
            writeError();
    });
};

/***** local running ******/

// routerEvent.on("event", (type,msg) => {
//     console.log('trigger a httpRequest事件！');
//   });
