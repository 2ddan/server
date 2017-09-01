/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const fs = require('fs');
//private modules
const {routerEvent} = require('./router');

/***** Module variables *****/
/**
 * @description handle table
 */
let wait = {};

/***** Module exports *****/
/**
 * @description init static folder, Cache the data in memory
 * @param path{string} folder name 
 */
exports.init = (path,callback) => {
    fs.watch(path+"/", { recursive:true }, (eventType, filename) => {
        console.log(eventType);
        if (filename) {
            console.log(filename);
            // 输出: <Buffer ...>
        }
    });
    callback && callback();
}
/***** local running ******/

// routerEvent.on("event", (type,msg) => {
//     console.log('trigger a httpRequest事件！');
//   });
