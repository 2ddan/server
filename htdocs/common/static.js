/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const fs = require('fs');
const { StringDecoder } = require('string_decoder');
//private modules
const { hotFixEvent } = require('./hotfix');

/***** Module variables *****/
//Cache the files as binary of static folder
let staticTable = {};
//init total
let initTotal = 0;
//init count
let initCount = 0;
//static root
let root = "";
//decode binary to string
const decoder = new StringDecoder('utf8');
/**
 * @description read file
 * @param path{string} file name 
 */
const readfile = (path,callback) => {
    initTotal += 1;
    fs.readFile(path,{},(err,data) => {
        if(err){
            delete staticTable[path.replace(root+"/","")];
            console.error(`Init static folder ::::: Read file "${path}" fail::${err}`);
            return;
        }
        staticTable[path.replace(root+"/","")] = data;
        initCount += 1;
        callback && callback();
    });
};
/**
 * @description read folder
 * @param {string}dir folder name 
 */
const readdir = (dir,callback) => {
    let files = fs.readdirSync(dir);
    for(let i=0,len = files.length;i<len;i++){
        let _f = files[i],
            _index  = _f.indexOf("."),
            _url = dir+"/"+_f;
        //Ignore the file which name start with a "." 
        if(_index === 0)
            continue;
        //Read subdirectory
        else if(_index > 0)
            readfile(_url,callback);
        else readdir(_url);
    }
};
/**
 * @description free the memory
 */

/***** Module exports *****/
/**
 * @description init static folder, Cache the data in memory
 * @param {string}path folder name 
 */
exports.init = (path,callback) => {
    root = path;
    readdir(root,() => {
        //check finish state
        if(initCount === initTotal){
            callback && callback();
            console.log(staticTable);
        }
    });
}
/**
 * @description get static file data
 * @param {string}path file name 
 * @param {string}encode "utf8" or null(return binary)
 */
exports.getFile = (path,encode) => {
    if(staticTable[path] && encode === "utf8")
        return decoder.write(staticTable[path]);
    return staticTable[path];
}


/***** local running ******/

hotFixEvent.on("event",(type,filename)=>{
    if(type === "static/"){
        readfile(root+"/"+filename.replace("static/",""));
    }
})