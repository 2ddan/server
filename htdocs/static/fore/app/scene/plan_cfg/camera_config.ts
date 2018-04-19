
let table = {} ; 

table["city_camera"] = {x:0,y:0,z:0,rotate:[Math.PI/8,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,6,10.5]};

table["wild_camera"] = {x:0,y:0,z:0,rotate:[Math.PI/5,Math.PI,0],perspective:[50, 0.66667, 0.5, 10000],position:[0,10,12]};

table["uiscene_camera"] = {x:0,y:0,z:0,rotate:[0,3.14,0],perspective:[30, 0.600000023841858, 0.300000011920929, 1000],position:[0,0,16]};

table["loginscene_camera"] = {x:0,y:0,z:0,rotate:[0.2,3.14,0],perspective:[38, 0.6, 0.3, 10000],position:[0,1.67,5.8]};

export const camera_cfg:any = table;