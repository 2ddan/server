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
 * @description free the memory
 */

/***** Module exports *****/
/**
 * @description init static folder, Cache the data in memory
 * @param path{string} folder name 
 */
exports.init = (path,callback) => {
    
}
/***** local running ******/

routerEvent.on("event", (type,msg) => {
    console.log('trigger a httpRequest事件！');
  });