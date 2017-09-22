/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//node modules
const MongoClient = require('mongodb').MongoClient;

//private modules
const util = require('util');

/***** Module variables *****/
let mongodb;

/***** Module exports *****/
/**
 * @description init db connect
 */
exports.init = (url,callback) => {
    MongoClient.connect(url, function(err, db) {
        callback && callback(err);
        if(err)throw err;
        console.log("Connected correctly to server.");
        db.close();
        mongodb = db;
      });
};
/**
 * @description close db
 */
exports.close = () => {
    mongodb.close();
}
/**
 * @description insertOne
 * @param {String}doc document name
 * @param {any} data default data
 * @reference https://docs.mongodb.com/getting-started/node/insert/
 */
exports.insertOne = (doc, data, callback) => {
    mongodb.collection(doc).insertOne(data, function(err, result) {
        callback && callback(err);
        if(err) throw err;
    });
}
/**
 * @description find data
 * @param {String}doc document name
 * @param {Json}condition like { "address.zipcode": "10075" }
 * @reference https://docs.mongodb.com/getting-started/node/query/
 */
exports.find = (doc,condition) => {
    return mongodb.collection(doc).find(condition);
}
/**
 * @description update data
 * @param {String}doc document name
 * @param {String}type "updateOne","updateMany","replaceOne"
 * @param {Json}condition like { "address.zipcode": "10075" }
 * @param {any} data new data
 * @reference https://docs.mongodb.com/getting-started/node/update/
 */
exports.update = (doc,type,condition,data,callback) => {
    return mongodb.collection(doc)[type](condition,data,(err, result)=>{
        callback && callback(err);
        if(err) throw err;
    });
}
/**
 * @description remove data
 * @param {String}doc document name
 * @param {String}type "deleteMany","deleteOne"
 * @param {Json}condition like { "address.zipcode": "10075" }
 * @reference https://docs.mongodb.com/getting-started/node/remove/
 */
exports.delete = (doc,type,condition,callback) => {
    return mongodb.collection(doc)[type](condition,(err, result)=>{
        callback && callback(err);
        if(err) throw err;
    });
}
/**
 * @description drop document
 * @param {String}doc document name
 * @reference https://docs.mongodb.com/getting-started/node/remove/
 */
exports.drop = (doc,callback) => {
    return mongodb.collection(doc).drop( function(err, response) {
        console.log(response)
        callback && callback(err);
        if(err) throw err;
     });
}
/***** local running ******/


