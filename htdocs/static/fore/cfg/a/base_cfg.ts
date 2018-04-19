
var table = {} ; 

table["lowDiamondUnit"] = {"value":10};

table["duamondToMoneyCount"] = {"value":10000};

table["wingClass"] = {"value":1};

table["undefined"] = {};

table["undefined"] = {};

table["damageP"] = {"value":[40,5,5,5,0,0,0,10,15,15,15,20,20,20]};

table["damageA"] = {"value":[254,254]};

table["damageS"] = {"value":[ 0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75]};

table["publicCd"] = {"value":1000};

table["buffValueP"] = {"value":[40,5,5,5,0,0,0,10,15,15,15,20,20,20]};

table["buffValueA"] = {"value":[254,254]};

table["buffValueS"] = {"value":[0.2,0.4,0.6,1.1,1.8,1.8,1,1,1,1,1,1,1,1]};

table["wildRange"] = {"value":[[-10.24,10.24],[-10.24,-10.24],[10.24,-10.24],[10.24,10.24]]};

table["enemyP"] = {"value":[[6,-9],[0,-6.5],[-4,-8],[-6,0],[3,0],[-7,12],[4,4],[8,-4],[9.5,6],[-9,4],[-11.9],[0.5,10]]};

table["city_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/8,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,6,10.5]}};

table["wild_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["fight_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["uiscene_camera"] = {"value":{x:0,y:0,z:0,rotate:[0.1,3.13,0],perspective:[55, 0.6, 0.3, 10000],position:[0,1.3,4.5]}};

table["loginscene_camera"] = {"value":{x:0,y:500,z:200,lookatOnce:{value:[0,40,0],sign:0},perspective:[50, 0.66667,0.5, 10000],position:[0,0,0]}};

table["dropP"] = {"value":[80,0,0,0,10,10,20,20,20,30,30,30,30,30,30,0,0,0,0,0]};

table["dropA"] = {"value":[1,100,150,254,254,254,254,254,254,254,254,254,254,254,220,180,140,100,60,1]};

table["dropS"] = {"value":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};

table["drop_time"] = {"value":1000};

table["wildMapChange"] = {"value":10};

table["fightPosition"] = {"value":[[[0,3],[-2,4],[2,4],[-4,4]],[4,4],[[0,-3],[2,-4],[-2,-4],[4,-4]],[-4,-4]]};

table["login_action_space"] = {"value":10000};

table["monster_position"] = {"value":[[1.5,-4.5],[-1.5,-4.5],[3,-4],[-3,-4],[4.5,-3.5],[-4.5,-3.5],[6,-3],[-6,-3]]};

table["rebel_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["chat_time"] = {"value":4};

table["chat_num"] = {"value":15};

table["gang_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/8,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,6,10.5]}};

table["chat_position_camera"] = {"value":{rebel:115,team:130,team_fight:115,gang_fight:115,city:150,gang_ready:115,gang_war:115,gang:150}};

table["team_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/8,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,6,10.5]}};

table["team_fight_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["gang_fight_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["gang_war_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["gang_ready_camera"] = {"value":{x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]}};

table["normal_ui_scene_camera"] = {"value":{x:0,y:0,z:0,rotate:[0,3.14,0],perspective:[60, 0.600000023841858, 0.300000011920929, 10000],position:[0,3,8.5]}};

table["ui_effect_camera"] = {"value":{x:0,y:0,z:0,rotate:[0,3.14,0],perspective:[60, 0.600000023841858, 0.300000011920929, 10000],position:[0,0,2.5]}};
//伤害冒字
table["damage_type"] = [
    { //左上飘
        "damagePX":{"value":[35,20,16,16,12,12,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4]},
        "damagePZ":{"value":[60,24,20,20,16,16,12,12,8,8,4,4,4,4,4,4,4,4,4,4,4]},
        "scale":{"value":[ 0.5, 1, 1.75 , 2.5, 2.5, 2.25, 2, 1.75, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]},
        "opacity":{"value":[ 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.05, 0]}
    },
    { //右上飘
        "damagePX":{"value":[35,-20,-16,-16,-12,-12,-8,-8,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4]},
        "damagePZ":{"value":[60,24,20,20,16,16,12,12,8,8,4,4,4,4,4,4,4,4,4,4,4]},
        "scale":{"value":[ 0.5, 1, 1.75 , 2.5, 2.5, 2.25, 2, 1.75, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]},
        "opacity":{"value":[ 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.05, 0]}
    },
    { //左下飘
        "damagePX":{"value":[35,20,16,16,12,12,8,8,4,4,4,4,4,4,4,4,4,4,4,4,4]},
        "damagePZ":{"value":[60,-24,-20,-20,-16,-16,-12,-12,-8,-8,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4]},
        "scale":{"value":[ 0.5, 1, 1.75 , 2.5, 2.5, 2.25, 2, 1.75, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]},
        "opacity":{"value":[ 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.05, 0]}
    },
    { //右下飘
        "damagePX":{"value":[35,-20,-16,-16,-12,-12,-8,-8,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4]},
        "damagePZ":{"value":[60,-24,-20,-20,-16,-16,-12,-12,-8,-8,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4]},
        "scale":{"value":[ 0.5, 1, 1.75 , 2.5, 2.5, 2.25, 2, 1.75, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5]},
        "opacity":{"value":[ 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0.05, 0]}
    }
];

//自己伤害冒字
table["damageM_type"] = [
    { //左下飘
        "damagePX":{"value":[15,12,10,10,8,8,6,6,4,4,2,2,2,2,2,2,2,2,2,2,2]},
        "damagePZ":{"value":[40,-24,-20,-20,-16,-16,-12,-12,-8,-8,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4]},
        "scale":{"value":[ 0.5, 0.75, 1 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
        "opacity":{"value":[ 0.6, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]}
    }
];

//暴击冒字
table["critical_type"] = [
    { //左上飘
        "damagePX":{"value":[0,-4,-4,-3,-3,-2,-2,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0]},
        "damagePZ":{"value":[60,8,8,6,6,4,4,2,2,2,2,2,2,0,0,0,0,0,0,0,0]},
        "scale":{"value":[ 0.5, 1.75 , 3 , 3, 3, 2.5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]},
        "opacity":{"value":[ 0.6, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]}
    }
];

//stealHP
table["stealHP_type"] = [
    { //左上飘
        "damagePX":{"value":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        "damagePZ":{"value":[40,5,5,5,0,0,0,0,10,15,15,15,15,20,20,20,20,20,20,20,20]},
        "scale":{"value":[ 0.5, 0.6, 0.7, 0.7, 2, 2, 2, 2, 2, 1.1, 1.05, 0.95, 0.85, 0.75,0.75, 0.75,0.75, 0.75,0.75, 0.75,0.75]},
        "opacity":{"value":[ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]}
    }
];


export const base_cfg:any = table;