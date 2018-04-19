import { Pi } from "app/mod/pi";
var s, table,arr = [], min = 99999999, max = 0,
key=["sid","name","type","icon","attr","desc","quality","act_condition","goto"];
if(!Pi.sample) {
Pi.sample = {};
};
table = Pi.sample;

arr.push([10001,
    "undefined",
    "cloth",
    "undefined",
    [['pvp_damage_multiple',0.1],['pvp_un_damage_multiple',0.1],['attack',10000],['defence',5000]],
    "可在节日活动中获取锦缎合成",
    6,
    [100040,20],
    null
    ]);
for(var i=0,len = arr.length;i<len;i++){
s = {};
for(var k = 0,leng = key.length;k<leng;k++){
s[key[k]] = arr[i][k];
}
table[arr[i][0]] = s;
}

