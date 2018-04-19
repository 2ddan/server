_$define("v8/util", function (require, exports, module) {
    Object.prototype.clone = function () {
        var Constructor = this.constructor;
        var obj = new Constructor();

        for (var attr in this) {
            if (this.hasOwnProperty(attr)) {
                if (typeof (this[attr]) !== "function") {
                    if (this[attr] === null) {
                        obj[attr] = null;
                    } else if (this[attr] === undefined) {
                        obj[attr] = undefined;
                    }
                    else {
                        obj[attr] = this[attr].clone();
                    }
                } else {
                    obj[attr] = this[attr];
                }
            }
        }
        return obj;
    };

    exports.isArray = function (value) {
        return Object.prototype.toString.apply(value) === "[object Array]";
    };

    /* Method of Array*/
    Array.prototype.clone = function () {
        var thisArr = this.valueOf();
        var newArr = [];
        for (var i = 0; i < thisArr.length; i++) {
            var r;
            if (thisArr[i] === null) {
                r = null;
            } else if (thisArr[i] === undefined) {
                r = undefined;
            } else {
                r = thisArr[i].clone();
            }
            newArr.push(r);
        }
        return newArr;
    };

    /* Method of Boolean, Number, String*/
    Boolean.prototype.clone = function () { return this.valueOf(); };
    Number.prototype.clone = function () { return this.valueOf(); };
    String.prototype.clone = function () { return this.valueOf(); };

    /* Method of Date*/
    Date.prototype.clone = function () { return new Date(this.valueOf()); };

    /* Method of RegExp*/
    RegExp.prototype.clone = function () {
        var pattern = this.valueOf();
        var flags = '';
        flags += pattern.global ? 'g' : '';
        flags += pattern.ignoreCase ? 'i' : '';
        flags += pattern.multiline ? 'm' : '';
        return new RegExp(pattern.source, flags);
    };
    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

});