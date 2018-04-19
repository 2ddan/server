import { nameWare } from "fight/b/common/name_ware_house";
import { Common } from "app/mod/common";


export const playerName = function () {
	var num1 = nameWare[0].length;
	var num2 = nameWare[1].length;
	var name="";
	name= Common.fromCharCode(nameWare[0][Math.floor(Math.random()*num1)])+ Common.fromCharCode(nameWare[1][Math.floor(Math.random()*num2)]);
	return name;

};