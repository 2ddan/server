/*global pi */
/*
 * base58.js
 *  - encodes integers to and decodes from a base58 (or your own) base58 alphabet
 *  - based on Flickr's url shortening
 * 
 * usage:
 *   base58.encode(bigi);
 *   base58.decode(string);
 * 
 * (c) 2012 inflammable/raromachine
 * Licensed under the MIT License.
 * 
 */
_$define("v8/base58", function (require, exports, module) {
    var bigi = require("./bigi");
/** @exports module as pi.math.base58 */
var table = [], alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
	base = alphabet.length;
var isInt = function (value) {
	return typeof value === 'number' && parseFloat(value) === parseInt(value, 10) && !isNaN(value);
};
var isString = function (value) {
	return typeof value === typeof "";
};
(function(){
	var i = base - 1;
	table.length = alphabet.charCodeAt(i) + 1;
	for(i = base - 1; i >= 0; i--) {
		table[alphabet.charCodeAt(i)] = i;
	}
}());

exports.encode=function(bi) {
	var s, divRem;
	if(isInt(bi)) {
		bi = bigi.create(bi);
	} else if(bigi.isBigi(bi)) {
	}else{
		throw "encode only accepts integers or bigi";
	}
	s = [];
	while(bi.isPositive()) {
		divRem = bi.divRem(base);
		s.push(alphabet[divRem[1].toJSValue()]);
		bi = divRem[0];
	}
	return s.reverse().join('');
};
exports.decode = function(s) {
	var bi, c, i, n;
	if(!isString(s)) {
		throw "decode only accepts strings";
	}
	c = table[s.charCodeAt(0)];
	if (c === undefined) {
		throw "decode can't find \"" + s +"\" index of " + 0 + " in the alphabet";
	}
	bi = bigi.create(c);
	for (i = 1, n = s.length; i < n; i++) {
		c = table[s.charCodeAt(i)];
		if (c === undefined) {
			throw "decode can't find \"" + s +"\" index of " + i + " in the alphabet";
		}
		bi = bi.multiply(base).add(c);
	}
	return bi;
};
});