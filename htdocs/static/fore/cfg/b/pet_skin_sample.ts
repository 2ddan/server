import { Pi } from "app/mod/pi";
var s, table,arr = [], min = 99999999, max = 0,
key=["sid","name","type","icon","attr","desc","quality","act_condition","goto","is_default"];
if(!Pi.sample) {
Pi.sample = {};
};
table = Pi.sample;

arr.push([2222228,
    "玄晶兽",
    "pet",
    "res_pet1",
    [['damage_multiple',0.1],['attack',8000]],
    "可以通过节日活动购买碎片，合成获得",
    6,
    [100030,20],
    null,
    1
    ]);
arr.push([2222221,
    "火麒麟",
    "pet",
    "res_pet2",
    null,
    "undefined",
    6,
    null,
    null,
    0
    ]);
for(var i=0,len = arr.length;i<len;i++){
s = {};
for(var k = 0,leng = key.length;k<leng;k++){
s[key[k]] = arr[i][k];
}
table[arr[i][0]] = s;
}

