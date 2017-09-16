/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const path = require('path');
const http = require('http');
const url = require("url");
const EventEmitter = require('events');
//private modules
const static = require('./static');
const hotfix = require("./hotfix");

/***** Module variables *****/
let serv,
    port,
    root,
    errorDefault;
//create event table
const routerEvent = new EventEmitter();
//response header content-type
const CONTENTTYPE = {
    "txt"      : "text/plain; charset=UTF-8",
    "html"     : "text/html; charset=UTF-8",
    "htm"      : "text/html; charset=UTF-8",
    'js'       : "application/javascript; charset=UTF-8",
    "css"      : "text/css; charset=UTF-8",
    "png"      : "application/x-png",
    "jpeg"     : "image/jpeg",
    "jpg"     : "image/jpeg",
    "manifest" : "text/cache-manifest; charset=UTF-8",
    "default"  : "application/octet-stream"
};
//error
const ERR = {
    "404":"error 404 :: No such file!"
};
/**
 * @description bind file content-type
 * @param {json}file
 */
const bindContentType  = (file,_path) => {
    let _ext = path.extname(_path).replace(".","");
    file.contenttype = CONTENTTYPE[_ext] || CONTENTTYPE.default;
};
/**
 * @description find root
 * @param {json}file
 */
const findRoot = (file) => {
    for(let _k of root){
        let _r = static.getFile(_k,"utf8"); 
        file.data = _r;
        if(_r){
            bindContentType(file,_k);
            return;
        }  
    }
};
/**
 * @description get the file data
 */
const getData = (url) => {
    let _name = url.replace("/",""),
        _r = {};
    if(_name)
        _r.data = static.getFile(_name,"utf8"); 
    else findRoot(_r);
    if(_r.data){
        _r.statue = 200;
        !_r.contenttype && bindContentType(_r,_name);
    }else{
        _r.statue = 404;
        _r.data = static.getFile(errorDefault["404"],"utf8");
        if(_r.data)
            bindContentType(_r,errorDefault["404"]);
        else{
            _r.data =  ERR["404"];
            _r.contenttype = CONTENTTYPE.txt;
        }
    }
    return _r;  
};

/***** Module exports *****/
/**
 * @description create http server
 * @param {string}path folder name 
 */
exports.init = (cfg,callback) => {
    root = cfg.router.root;
    errorDefault = cfg.router.error;
    port = cfg.port;
    serv = http.createServer(function (request, response) {
        let _url = url.parse(request.url);
        let _d = getData(_url.pathname);
        response.writeHead(_d.statue, { 'Content-Type': _d.contenttype });
        response.write(_d.data);
        response.end();
        routerEvent.emit("event","httpRequest",_url);
    });
    serv.listen(port);
    callback();
}
/**
 * @description regist router event handle
 * @param {string}path folder name 
 */
exports.routerEvent = routerEvent;
/***** local running ******/

