import { Common } from "app/mod/common";
import { checkTypeof } from "app/mod/db";
import { blendOne } from "../analyze";

var str = "";
var totalStr = "";
var time = new Date().getTime();
export const analyseData = function (data,check?) {
    // console.log("======================================",data.status,data.data);
    if (data.status == 1 || (!data.status && data.status != 0) || data.status < 0) {
        str = data.data;
        totalStr += data.data;
    }
    if (data.status == 0 || data.status == 2) {
        str += data.data;
        totalStr += data.data;
    }
    if ((((new Date().getTime() - time) / 1000) | 0) > 0) {
        time = new Date().getTime();
        var a = sizeof(totalStr, "utf-8") / 1024;
        // console.log("str size = ", a);
        totalStr = "";
    }
    if (data.status < 0 || (!data.status && data.status != 0) || data.status == 2) {
        var events = Common.fromCharCode(str);
        var obj = JSON.parse(events),
            arr = [];
        for (var i = 0; i < obj.event.length; i++) {
            var event = blendOne(obj.event[i]);
            if(!check || check(event))
                arr.push(event);
            if (event.type == "insert") {
                var f = event.fighter;
                f.name = Common.fromCharCode(f.name);
            }
        }
        obj.event = arr;
        return obj;
    }
    
}

export const analyseFighter = function (data) {
    var obj: any,arr;
    if (checkTypeof(data, "Array")) {
        obj = Common.changeArrToJson(data);
    } else {
        obj = data;
    }
    var str = Common.fromCharCode(obj.fighter);
    if (str) {
        obj = JSON.parse(str),
        arr = [];
        for (var i = 0; i < obj.event.length; i++) {
            var event = blendOne(obj.event[i]);
            arr.push(event);
            var f = event.fighter;
            f.name = Common.fromCharCode(f.name);
        }
        obj.event = arr;
        return obj;
    };
    return str;
}


export const sizeof = function (str, charset) {
    var total = 0,
        charCode: any,
        i: any,
        len: any;
    charset = charset ? charset.toLowerCase() : '';
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0xffff) {
                total += 2;
            } else {
                total += 4;
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode <= 0x007f) {
                total += 1;
            } else if (charCode <= 0x07ff) {
                total += 2;
            } else if (charCode <= 0xffff) {
                total += 3;
            } else {
                total += 4;
            }
        }
    }
    return total;
}
