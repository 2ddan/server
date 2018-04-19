import { Pi } from "app/mod/pi";
let table:any={},arr;
if(!Pi.pictures){
Pi.pictures = {};
};
table = Pi.pictures;
arr = [["res_200001","app/scene_res/res/"+"Soul/res_200001.png"],["res_200002","app/scene_res/res/"+"Soul/res_200002.png"],["res_200003","app/scene_res/res/"+"Soul/res_200003.png"],["res_200004","app/scene_res/res/"+"Soul/res_200004.png"],["res_200005","app/scene_res/res/"+"Soul/res_200005.png"],["res_200006","app/scene_res/res/"+"Soul/res_200006.png"],["res_200007","app/scene_res/res/"+"Soul/res_200007.png"],["res_200008","app/scene_res/res/"+"Soul/res_200008.png"],["res_200009","app/scene_res/res/"+"Soul/res_200009.png"],["res_200010","app/scene_res/res/"+"Soul/res_200010.png"],["res_200011","app/scene_res/res/"+"Soul/res_200011.png"],["res_200012","app/scene_res/res/"+"Soul/res_200012.png"],["res_200013","app/scene_res/res/"+"Soul/res_200013.png"],["res_200014","app/scene_res/res/"+"Soul/res_200014.png"],["res_200015","app/scene_res/res/"+"Soul/res_200015.png"],["res_200016","app/scene_res/res/"+"Soul/res_200016.png"],["res_200017","app/scene_res/res/"+"Soul/res_200017.png"],["res_200018","app/scene_res/res/"+"Soul/res_200018.png"],["res_200019","app/scene_res/res/"+"Soul/res_200019.png"],["res_200020","app/scene_res/res/"+"Soul/res_200020.png"],["res_200021","app/scene_res/res/"+"Soul/res_200021.png"],["res_200022","app/scene_res/res/"+"Soul/res_200022.png"],["res_200023","app/scene_res/res/"+"Soul/res_200023.png"],["res_200024","app/scene_res/res/"+"Soul/res_200024.png"],["res_200025","app/scene_res/res/"+"Soul/res_200025.png"],["res_200026","app/scene_res/res/"+"Soul/res_200026.png"],["res_200027","app/scene_res/res/"+"Soul/res_200027.png"],["res_200028","app/scene_res/res/"+"Soul/res_200028.png"],["res_200029","app/scene_res/res/"+"Soul/res_200029.png"],["res_200030","app/scene_res/res/"+"Soul/res_200030.png"]];
for(var k in arr){
var _abs = Pi.mod.absUrl(arr[k][1],Pi.appLibPath);
table[arr[k][0]] = _abs;
}
