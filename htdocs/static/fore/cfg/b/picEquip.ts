import { Pi } from "app/mod/pi";
let table:any={},arr;
if(!Pi.pictures){
Pi.pictures = {};
};
table = Pi.pictures;
arr = [["res_4512011","app/scene_res/res/"+"Equip/res_4512011.png"],["res_4512012","app/scene_res/res/"+"Equip/res_4512012.png"],["res_4512013","app/scene_res/res/"+"Equip/res_4512013.png"],["res_451202","app/scene_res/res/"+"Equip/res_451202.png"],["res_451203","app/scene_res/res/"+"Equip/res_451203.png"],["res_451204","app/scene_res/res/"+"Equip/res_451204.png"],["res_451205","app/scene_res/res/"+"Equip/res_451205.png"],["res_451206","app/scene_res/res/"+"Equip/res_451206.png"],["res_451207","app/scene_res/res/"+"Equip/res_451207.png"],["res_451208","app/scene_res/res/"+"Equip/res_451208.png"],["res_451209","app/scene_res/res/"+"Equip/res_451209.png"],["res_451210","app/scene_res/res/"+"Equip/res_451210.png"],["res_4513011","app/scene_res/res/"+"Equip/res_4513011.png"],["res_4513012","app/scene_res/res/"+"Equip/res_4513012.png"],["res_451302","app/scene_res/res/"+"Equip/res_451302.png"],["res_451303","app/scene_res/res/"+"Equip/res_451303.png"],["res_451304","app/scene_res/res/"+"Equip/res_451304.png"],["res_451305","app/scene_res/res/"+"Equip/res_451305.png"],["res_451306","app/scene_res/res/"+"Equip/res_451306.png"],["res_451307","app/scene_res/res/"+"Equip/res_451307.png"],["res_451308","app/scene_res/res/"+"Equip/res_451308.png"],["res_451309","app/scene_res/res/"+"Equip/res_451309.png"],["res_451310","app/scene_res/res/"+"Equip/res_451310.png"],["res_4514011","app/scene_res/res/"+"Equip/res_4514011.png"],["res_4514012","app/scene_res/res/"+"Equip/res_4514012.png"],["res_451402","app/scene_res/res/"+"Equip/res_451402.png"],["res_451403","app/scene_res/res/"+"Equip/res_451403.png"],["res_451404","app/scene_res/res/"+"Equip/res_451404.png"],["res_451405","app/scene_res/res/"+"Equip/res_451405.png"],["res_451406","app/scene_res/res/"+"Equip/res_451406.png"],["res_451407","app/scene_res/res/"+"Equip/res_451407.png"],["res_451408","app/scene_res/res/"+"Equip/res_451408.png"],["res_451409","app/scene_res/res/"+"Equip/res_451409.png"],["res_451410","app/scene_res/res/"+"Equip/res_451410.png"],["res_4515011","app/scene_res/res/"+"Equip/res_4515011.png"],["res_4515012","app/scene_res/res/"+"Equip/res_4515012.png"],["res_451502","app/scene_res/res/"+"Equip/res_451502.png"],["res_451503","app/scene_res/res/"+"Equip/res_451503.png"],["res_451504","app/scene_res/res/"+"Equip/res_451504.png"],["res_451505","app/scene_res/res/"+"Equip/res_451505.png"],["res_451506","app/scene_res/res/"+"Equip/res_451506.png"],["res_451507","app/scene_res/res/"+"Equip/res_451507.png"],["res_451508","app/scene_res/res/"+"Equip/res_451508.png"],["res_451509","app/scene_res/res/"+"Equip/res_451509.png"],["res_451510","app/scene_res/res/"+"Equip/res_451510.png"],["res_4605011","app/scene_res/res/"+"Equip/res_4605011.png"],["res_4605012","app/scene_res/res/"+"Equip/res_4605012.png"],["res_460502","app/scene_res/res/"+"Equip/res_460502.png"],["res_460503","app/scene_res/res/"+"Equip/res_460503.png"],["res_460504","app/scene_res/res/"+"Equip/res_460504.png"],["res_460505","app/scene_res/res/"+"Equip/res_460505.png"],["res_460506","app/scene_res/res/"+"Equip/res_460506.png"],["res_460507","app/scene_res/res/"+"Equip/res_460507.png"],["res_460508","app/scene_res/res/"+"Equip/res_460508.png"],["res_460509","app/scene_res/res/"+"Equip/res_460509.png"],["res_460510","app/scene_res/res/"+"Equip/res_460510.png"]];
for(var k in arr){
var _abs = Pi.mod.absUrl(arr[k][1],Pi.appLibPath);
table[arr[k][0]] = _abs;
}