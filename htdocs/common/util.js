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
 * @description check type of a variable 
 * @param {any}v any type variable
 * @param {String}type expect: String Number Object Function Array ..
 * @example ([],"Array") => true;
 */
exports.checkType = (v,type) => {
    Object.prototype.toString.call(v) == `[object ${type}]`;
};

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
/**
 * @description majorization Function.prototype.apply()
 * @param {Function}func function of running
 * @param {Array}args arguments list
 * @example func => (a,b,c,d){a==1 && b ==2 && c == 3 && d == 4}; (func,[1,2,3,4])
 */
exports.funcApply = (func,args) => {
    if(!exports.checkType(args,"Array")) return func(args);
    let n = args.length;
    switch(n){
        case 0 :
            func();
            break;
        case 1 :
            func(args[0]);
            break;
        case 2 :
            func(args[0],args[1]);
            break; 
        case 3 :
            func(args[0],args[1],args[2]);
            break; 
        case 4 :
            func(args[0],args[1],args[2],args[3]);
            break;
        case 5 :
            func(args[0],args[1],args[2],args[3],args[4]);
            break; 
        case 6 :
            func(args[0],args[1],args[2],args[3],args[4],args[5]);
            break; 
        case 7 :
            func(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
            break; 
        case 8 :
            func(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
            break; 
        case 9 :
            func(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8]);
            break; 
        default : 
            func.apply(null,args);
    }
}

/**
 * @description Test performance of function
 * @param {Function}func function of running
 * @param {Array}args arguments list
 * @example func => (a,b,c,d){a==1 && b ==2 && c == 3 && d == 4}; (func,[1,2,3,4])
 */
exports.testPerformance = (func) => {
    let count = 0,
        _t = Date.now();
    while(Date.now()-_t < 1000){
        count = count + 1;
        func();
    }
    console.log(`Running: ${count}(counts)/s`);
}


/***** local running ******/
