/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
//private modules

/***** Module variables *****/
/**
 * @description self require modules function
 * @param {String}path 
 */
global.$require = (path) => {
    console.log(path);
}

/***** Module exports *****/
/**
 * @description Test performance of function
 * @param {Function}func function of running
 * @param {Array}args arguments list
 * @example func => (a,b,c,d){a==1 && b ==2 && c == 3 && d == 4}; (func,[1,2,3,4])
 */


/***** local running ******/
// console.log(require.main.filename);
// console.log(require.cache);