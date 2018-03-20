/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const fs = require('fs');
const path = require('path');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const zlib = require("zlib");
const querystring = require('querystring');
const process = require("process");

//private modules
const { hotFixEvent } = require('./hotfix');

/***** Module variables *****/
//Cache the files as binary of static folder
let staticTable = {};
//init total
let initTotal = 0;
//init count
let initCount = 0;
//static root "workspace/server/static/"
let root = "";
//static directory "static/"
let dir = "";
//static config
let config;
//decode binary to string
const decoder = new StringDecoder('utf8');
//response header content-type
const CONTENTTYPE = {
    "css"      : "text/css",
    "gif"      : "image/gif",
    "html"     : "text/html",
    "ico"      : "image/x-icon",
    "jpeg"     : "image/jpeg",
    "jpg"      : "image/jpeg",
    "js"       : "text/javascript",
    "json"     : "application/json",
    "pdf"      : "application/pdf",
    "png"      : "image/png",
    "svg"      : "image/svg+xml",
    "swf"      : "application/x-shockwave-flash",
    "tiff"     : "image/tiff",
    "txt"      : "text/plain",
    "wav"      : "audio/x-wav",
    "wma"      : "audio/x-ms-wma",
    "wmv"      : "video/x-ms-wmv",
    "xml"      : "text/xml",
    "manifest" : "text/cache-manifest; charset=UTF-8",
    "default"  : "application/octet-stream"
};
//response set
const SET = {
    expires : {
        fileMatch: /^(gif|png|jpg|js|css)$/ig,
        maxAge: 60*60*24*365
    },
    compress : {
        match: /css|js|html/ig
    }
};
//error
const ERR = {
    "404":"error 404 :: No such file!"
};
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
 * @param {Json}cfg static config 
 */
exports.init = (cfg,callback) => {
    config = cfg;
    root = path.resolve(cfg.path);
    dir = cfg.path.replace(/\.\.\//g,"");
    console.log(root,dir);
    readdir(root,() => {
        //check finish state
        if(initCount === initTotal){
            callback && callback();
        }
    });
}
/**
 * @description get static file data
 * @param {string}path file name 
 * @param {string}encode "utf8" or null(return binary)
 */
exports.getFile = (path,encode) => {
    // if(staticTable[path] && encode === "utf8")
    //     return decoder.write(staticTable[path]);
    // return 
    staticTable[path];
}

exports.response = (request,response, callback) => {
    // console.log(process.uptime(),request.url,"===========================");
    var qs = querystring.unescape(request.url);
    var pathname = url.parse(qs).pathname;
    var realPath = path.resolve(path.join("../static", pathname));
    // console.log(qs,realPath);
    fs.exists(realPath, function (exists) {
        // console.log( realPath + ' %d', exists ? 200 : 404 );
        if (!exists) {
            response.writeHead(404, "Not Found", {'Content-Type': 'text/plain'});
            response.write(ERR[404]);
            response.end();
        } else {
            var ext = path.extname(realPath);
            ext = ext ? ext.slice(1) : 'unknown';
            var contentType = CONTENTTYPE[ext] || CONTENTTYPE.default;
            response.setHeader("Content-Type", contentType);
            fs.stat(realPath, function (err, stat) {
                var lastModified = stat.mtime.toUTCString();
                var ifModifiedSince = "If-Modified-Since".toLowerCase();
                response.setHeader("Last-Modified", lastModified);
                if (ext.match(SET.expires.fileMatch)) {
                    var expires = new Date();
                    expires.setTime(expires.getTime() + SET.expires.maxAge * 1000);
                    response.setHeader("Expires", expires.toUTCString());
                    response.setHeader("Cache-Control", "max-age=" + SET.expires.maxAge);
                }
                if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                    response.writeHead(304, "Not Modified");
                    response.end();
                } else {
                    var raw = fs.createReadStream(realPath);
                    var acceptEncoding = request.headers['accept-encoding'] || "";
                    var matched = ext.match(SET.compress.match);
                    if (matched && acceptEncoding.match(/\bgzip\b/)) {
                        response.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
                        raw.pipe(zlib.createGzip()).pipe(response);
                    } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                        response.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
                        raw.pipe(zlib.createDeflate()).pipe(response);
                    } else {
                        response.writeHead(200, "Ok");
                        raw.pipe(response);
                    }
                }
            });

        }

    });
}

/***** local running ******/

hotFixEvent.on("event",(type,filename)=>{
    if(type === dir){
        readfile(root+"/"+filename.replace(dir,""));
    }
})