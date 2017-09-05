/**
 * @description just finish the static folder updata temporarily
 * @private 
 */

/***** Module dependencies *****/
//node modules
const fs = require('fs');
const EventEmitter = require('events');
//private modules
const util = require('./util');

/***** Module variables *****/
//create event table
const hotFixEvent = new EventEmitter();
/**
 * @description handle table
 */
let wait = {};

/***** Module exports *****/
/**
 * @description set watching folders
 * @param {string}path folder name 
 */
exports.init = (path,callback) => {
    fs.watch(path+"/", { recursive:true }, (eventType, filename) => {
        console.log(eventType);
        if (filename) {
            let _dir = util.getDirectory(1,filename);
            //console.log(filename);
            // 输出: <Buffer ...>
            hotFixEvent.emit("event",_dir,filename);
        }
    });
    callback && callback();
};
/**
 * @description regist hotfix handle
 */
exports.hotFixEvent = hotFixEvent;

/***** local running ******/

// routerEvent.on("event", (type,msg) => {
//     console.log('trigger a httpRequest事件！');
//   });
