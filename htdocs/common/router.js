
let CONTENTTYPE = {
    "TXT" : "text/plain; charset=UTF-8",
    "HTML" : "text/html; charset=UTF-8",
    "HTM" : "text/html; charset=UTF-8",
    'JS': "application/javascript; charset=UTF-8",
    "CSS" : "text/css; charset=UTF-8",
    "MANIFEST" : "text/cache-manifest; charset=UTF-8",
    "DEFAULT" : "application/octet-stream"
};

var requestHandlers = {};

var handlerEvent = (request, response) => {

};

/**
 * @description Set deal net message function
 * @param type{string} A key(like url or path) what distinguish net  , like: "app/user" || "app/user@login"
 *      handler{Function} 
 * @example
 */
exports.setHandler = (type,handler) => {
    requestHandlers[type] = handler;
}

/**
 * @description get the requestHandlers
 * @return  requestHandlers
 */
exports.getHandlerList = () => {
    return requestHandlers;
}

/**
 * @description response GET request
 */
exports.GET = (request, response) => {
    
}
