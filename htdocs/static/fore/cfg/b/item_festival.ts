import { Pi } from "app/mod/pi";
var s,table, min = 99999999, max = 0;
if(!Pi.sample) {
		Pi.sample = {};
	};
    table = Pi.sample;

if(min==0)min = 190001;
if(max==9999999)max = 190001;
s = {};
s.sid=190001;
s.name="小嫩叶";
s.count=["$var",1];
s.quality=4;
s.describe="普通物品。可兑换常用物品，节日活动结束后将自动消失。";
s.icon="res_100019";
s.folder_pos="Item";
s.drop_module="test_dlwp01";
s.type="activity";
if(s.sid < min) min = s.sid;
if(s.sid > max) max = s.sid;
table[190001] = s;

if(min==0)min = 190002;
if(max==9999999)max = 190002;
s = {};
s.sid=190002;
s.name="人参果";
s.count=["$var",1];
s.quality=6;
s.describe="吃一口就是极致享受。可兑换稀有物品，节日活动结束后将自动消失。";
s.icon="res_100053";
s.folder_pos="Item";
s.drop_module="test_dlwp02";
s.type="activity";
if(s.sid < min) min = s.sid;
if(s.sid > max) max = s.sid;
table[190002] = s;
