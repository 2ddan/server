/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
//private modules

/***** Module variables *****/
/**
 * @description 
 */

/***** Module exports *****/
/**
 * @description get the directory
 * @param {Number}n directory's level
 * @param {String}path directory's path 
 * @example (1,"common/util.js") return "common/"
 */
exports.getDirectory = (n,path) => {
    let r = "",
        c = 0;
    for(let i=0,leng=path.length;i<leng;i++){
        r = r+path[i];
        if(path[i] === "/"){
            c = c+1;
        }
        if(c === n)break;
    }
    return r;
};

/***** local running ******/

// routerEvent.on("event", (type,msg) => {
//     console.log('trigger a httpRequest事件！');
//   });
