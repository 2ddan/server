import { Pi } from "app/mod/pi";
let table:any={},arr;
if(!Pi.pictures){
Pi.pictures = {};
};
table = Pi.pictures;
arr = [["skill1001","app_c/style/images/Skill/skill1001.png"],["skill1002","app_c/style/images/Skill/skill1002.png"],["skill1003","app_c/style/images/Skill/skill1003.png"],["skill1004","app_c/style/images/Skill/skill1004.png"],["skill1005","app_c/style/images/Skill/skill1005.png"],["skill2001","app_c/style/images/Skill/skill2001.png"],["skill2002","app_c/style/images/Skill/skill2002.png"],["skill2003","app_c/style/images/Skill/skill2003.png"],["skill2004","app_c/style/images/Skill/skill2004.png"],["skill2005","app_c/style/images/Skill/skill2005.png"],["skill3001","app_c/style/images/Skill/skill3001.png"],["skill3002","app_c/style/images/Skill/skill3002.png"],["skill3003","app_c/style/images/Skill/skill3003.png"],["skill3004","app_c/style/images/Skill/skill3004.png"],["skill3005","app_c/style/images/Skill/skill3005.png"]];
for(var k in arr){
var _abs = Pi.mod.absUrl(arr[k][1],Pi.appLibPath);
table[arr[k][0]] = _abs;
}
