
var s, table={},arr = [],
key=["id","level","fight_power","exp","money","drop_id","drop_type","attr"],
key1=["max_hp", "attack", "defence", "un_defence","critical","un_critical","dodge","un_dodge","resist", "un_resist","health","stealHP", "damage_multiple","un_damage_multiple", "criticalDamage"];
arr = [
];
for(var i=0,len = arr.length;i<len;i++){
  s = {};
  for(var k = 0,leng = key.length;k<leng;k++){
    if(key[k]=="attr"){
      s[key[k]]={};
      for(var j=0;j<key1.length;j++){
        s[key[k]][key1[j]] = arr[i][k][j];
      }
    }else s[key[k]] = arr[i][k];
  }
  table[arr[i][0]+"-"+arr[i][1]] = s;
}

export const monster_attribute = table;


