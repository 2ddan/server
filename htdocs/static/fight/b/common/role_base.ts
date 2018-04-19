export const role_base  = {};


role_base["700001"] = {
"id":700001,
"name":"天威",
"speed":0.44,

"skill":[901001,901101,901201,901301,901401,901501],

"show_skill":[901101,901201,901301,901401,901501],
"normal_during":1500,
"skill_action":{
"901001":["act_rolem_attack"]
,"901101":["act_rolem_sk1"],"901201":["act_rolem_sk2"],"901301":["act_rolem_sk3"],"901401":["act_rolem_sk4"],"901501":["act_rolem_sk5"]
},
"module":41111,
"head":"playerhead700001",
"desc":"男枪",
"dieSound":"maledie005"
}


role_base["700002"] = {
"id":700002,
"name":"影刃",
"speed":0.44,

"skill":[902001,902101,902201,902301,902401,902501],

"show_skill":[902101,902201,902301,902401,902501],
"normal_during":1500,
"skill_action":{
"902001":["act_rolef_attack"]
,"902101":["act_rolef_sk1"],"902201":["act_rolef_sk2"],"902301":["act_rolef_sk3"],"902401":["act_rolef_sk4"],"902501":["act_rolef_sk5"]
},
"module":42222,
"head":"playerhead700002",
"desc":"女刀",
"dieSound":"femaledie001"
}


role_base["700003"] = {
"id":700003,
"name":"灵月",
"speed":0.44,

"skill":[903001,903101,903201,903301,903401,903501],

"show_skill":[903101,903201,903301,903401,903501],
"normal_during":1500,
"skill_action":{
"903001":["act_roleg_attack"]
,"903101":["act_roleg_sk1"],"903201":["act_roleg_sk2"],"903301":["act_roleg_sk3"],"903401":["act_roleg_sk4"],"903501":["act_roleg_sk5"]
},
"module":43333,
"head":"playerhead700003",
"desc":"女锤",
"dieSound":"femaledie001"
}





