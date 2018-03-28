/**
 * @description Module dependencies.
 * @private 
 */

/***** Module dependencies *****/
//common modules
const router = require("../common/router");
const db = require("../common/mongodb");
//app modules


/***** Module variables *****/

/***** local running ******/

router.routerEvent.on("test",(param,response)=>{
    let test = db.find("test");
    console.log(test);
    if(!test)db.insertOne("test",{count:1})
    else db.update("test","updateOne")
})
router.routerEvent.on("closedb",(param,response)=>{
    console.log(db.find({}))
    db.close(true);
})