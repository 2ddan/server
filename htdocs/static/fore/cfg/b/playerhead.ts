import { Pi } from "app/mod/pi";
let table:any={},arr;
if(!Pi.pictures){
Pi.pictures = {};
};
table = Pi.pictures;
arr = [["playerhead700001","app/scene_res/res/"+"playerhead/playerhead700001.png"],["playerhead700002","app/scene_res/res/"+"playerhead/playerhead700002.png"],["playerhead700003","app/scene_res/res/"+"playerhead/playerhead700003.png"]];
for(var k in arr){
var _abs = Pi.mod.absUrl(arr[k][1],Pi.appLibPath);
table[arr[k][0]] = _abs;
}
