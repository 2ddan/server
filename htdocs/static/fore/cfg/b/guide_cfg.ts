import {function_open} from "cfg/b/function_open";
export const guide_cfg = {};
let s:any = {};

    s = {};
    guide_cfg["1"] = guide_cfg["1"] || [];
    s.widget = "app_b-wild-wild";guide_cfg["1"].music = "music-playermission";guide_cfg["1"].count = 10;guide_cfg["1"].trigger = `playermission.guide&&player.level<20&&chat.guide&&!wild.flagHitBoss`;guide_cfg["1"].widget = "app_b-wild-wild";guide_cfg["1"].guide_text = "去完成新手任务";
    s = {};
    guide_cfg["1"] = guide_cfg["1"] || [];
    s.type = "force";s.name = "playermission";
    s.purpose = (db) => {
        return db.player.level>20;
    };
    
    guide_cfg["1"].push(s);
    
    s = {};
    guide_cfg["2"] = guide_cfg["2"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["2"].music = "music-wildboss";guide_cfg["2"].count = 1;guide_cfg["2"].trigger = `wild.flagHitBoss&&wild.wild_max_mission==1&&wild.autoNotFight&&chat.guide&&wild.wild_history==wild.wild_max_mission`;guide_cfg["2"].widget = "app_b-wild-wild";guide_cfg["2"].guide_text = "挑战BOSS";
    s = {};
    guide_cfg["2"] = guide_cfg["2"] || [];
    s.type = "force";s.name = "wildBoss";s.net_ok = "app/pve/wild@start";
    s.purpose = (db) => {
        return db.wild.wild_max_mission>=2;
    };
    
    guide_cfg["2"].push(s);
    
    s = {};
    guide_cfg["3"] = guide_cfg["3"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["3"].music = "music-wildboss";guide_cfg["3"].count = 1;guide_cfg["3"].trigger = `wild.flagHitBoss&&wild.wild_max_mission==2&&wild.autoNotFight&&chat.guide&&wild.wild_history==wild.wild_max_mission`;guide_cfg["3"].widget = "app_b-wild-wild";guide_cfg["3"].guide_text = "挑战BOSS";
    s = {};
    guide_cfg["3"] = guide_cfg["3"] || [];
    s.type = "force";s.name = "wildBoss";s.net_ok = "app/pve/wild@start";
    s.purpose = (db) => {
        return db.wild.wild_max_mission>=3;
    };
    
    guide_cfg["3"].push(s);
    
    s = {};
    guide_cfg["4"] = guide_cfg["4"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["4"].count = 1;guide_cfg["4"].trigger = `open_fun.id==${function_open.exp_fb.id-1}`;guide_cfg["4"].widget = "app_b-wild-wild";guide_cfg["4"].guide_text = "开放试炼副本";guide_cfg["4"].fun_key = "exp_fb";guide_cfg["4"].need = "1";guide_cfg["4"].need_map = "1";guide_cfg["4"].next_guide = 46;
    s = {};
    guide_cfg["4"] = guide_cfg["4"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["4"].push(s);
    
    s = {};
    guide_cfg["4"] = guide_cfg["4"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.exp_fb.id;
    };
    
    guide_cfg["4"].push(s);
    
    s = {};
    guide_cfg["5"] = guide_cfg["5"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["5"].music = "music-wildboss";guide_cfg["5"].count = 1;guide_cfg["5"].trigger = `wild.flagHitBoss&&wild.wild_max_mission==3&&wild.autoNotFight&&chat.guide&&wild.wild_history==wild.wild_max_mission`;guide_cfg["5"].widget = "app_b-wild-wild";guide_cfg["5"].guide_text = "挑战BOSS";
    s = {};
    guide_cfg["5"] = guide_cfg["5"] || [];
    s.type = "force";s.name = "wildBoss";s.net_ok = "app/pve/wild@start";
    s.purpose = (db) => {
        return db.wild.wild_max_mission>=4;
    };
    
    guide_cfg["5"].push(s);
    
    s = {};
    guide_cfg["8"] = guide_cfg["8"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["8"].count = 1;guide_cfg["8"].trigger = `open_fun.id>=${function_open.skill2.id}`;guide_cfg["8"].widget = "app_b-wild-wild";guide_cfg["8"].guide_text = "升级技能";guide_cfg["8"].fun_key = "skill2";
    s = {};
    guide_cfg["8"] = guide_cfg["8"] || [];
    s.type = "force";s.name = "menu_role_icon";
    guide_cfg["8"].push(s);
    
    s = {};
    guide_cfg["8"] = guide_cfg["8"] || [];
    s.type = "force";s.name = "skill_btn";s.ignore = true;s.widget = "app_b-role-role";
    guide_cfg["8"].push(s);
    
    s = {};
    guide_cfg["8"] = guide_cfg["8"] || [];
    s.type = "force";s.name = "skill_up";s.fix = "su";s.net_ok = "app/role/skill@level_up";s.widget = "app_b-skill_up-skill_up";
    guide_cfg["8"].push(s);
    
    s = {};
    guide_cfg["8"] = guide_cfg["8"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["8"].push(s);
    
    s = {};
    guide_cfg["9"] = guide_cfg["9"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["9"].count = 1;guide_cfg["9"].trigger = `open_fun.id==${function_open.equip_gem.id-1}`;guide_cfg["9"].widget = "app_b-wild-wild";guide_cfg["9"].guide_text = "开放宝石";guide_cfg["9"].fun_key = "equip_gem";guide_cfg["9"].need = "1";guide_cfg["9"].need_map = "1";guide_cfg["9"].next_guide = 44;
    s = {};
    guide_cfg["9"] = guide_cfg["9"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["9"].push(s);
    
    s = {};
    guide_cfg["9"] = guide_cfg["9"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.equip_gem.id;
    };
    
    guide_cfg["9"].push(s);
    
    s = {};
    guide_cfg["10"] = guide_cfg["10"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["10"].count = 1;guide_cfg["10"].trigger = `open_fun.id==${function_open.magic_activate.id-1}`;guide_cfg["10"].widget = "app_b-wild-wild";guide_cfg["10"].guide_text = "开放神兵";guide_cfg["10"].fun_key = "magic_activate";guide_cfg["10"].need = "1";guide_cfg["10"].need_map = "1";guide_cfg["10"].next_guide = 41;
    s = {};
    guide_cfg["10"] = guide_cfg["10"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["10"].push(s);
    
    s = {};
    guide_cfg["10"] = guide_cfg["10"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.magic_activate.id;
    };
    
    guide_cfg["10"].push(s);
    
    s = {};
    guide_cfg["11"] = guide_cfg["11"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["11"].count = 1;guide_cfg["11"].trigger = `open_fun.id==${function_open.pet.id-1}`;guide_cfg["11"].widget = "app_b-wild-wild";guide_cfg["11"].guide_text = "开放宠物";guide_cfg["11"].fun_key = "pet";guide_cfg["11"].need = "1";guide_cfg["11"].need_map = "1";guide_cfg["11"].next_guide = 45;
    s = {};
    guide_cfg["11"] = guide_cfg["11"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["11"].push(s);
    
    s = {};
    guide_cfg["11"] = guide_cfg["11"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.pet.id;
    };
    
    guide_cfg["11"].push(s);
    
    s = {};
    guide_cfg["12"] = guide_cfg["12"] || [];
    s.type = "force";s.widget = "app_b-fight-account";guide_cfg["12"].count = 1;guide_cfg["12"].trigger = `player.level`;guide_cfg["12"].widget = "app_b-fight-account";guide_cfg["12"].guide_text = "退出副本";
    s = {};
    guide_cfg["12"] = guide_cfg["12"] || [];
    s.type = "force";s.name = "close_account";
    guide_cfg["12"].push(s);
    
    s = {};
    guide_cfg["12"] = guide_cfg["12"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["12"].push(s);
    
    s = {};
    guide_cfg["13"] = guide_cfg["13"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["13"].count = 1;guide_cfg["13"].trigger = `open_fun.id==${function_open.daily_fb.id-1}`;guide_cfg["13"].widget = "app_b-wild-wild";guide_cfg["13"].guide_text = "开放材料副本";guide_cfg["13"].fun_key = "daily_fb";guide_cfg["13"].need = "1";guide_cfg["13"].need_map = "1";guide_cfg["13"].next_guide = 51;
    s = {};
    guide_cfg["13"] = guide_cfg["13"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["13"].push(s);
    
    s = {};
    guide_cfg["13"] = guide_cfg["13"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.daily_fb.id;
    };
    
    guide_cfg["13"].push(s);
    
    s = {};
    guide_cfg["14"] = guide_cfg["14"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["14"].count = 1;guide_cfg["14"].trigger = `open_fun.id==${function_open.arena.id-1}`;guide_cfg["14"].widget = "app_b-wild-wild";guide_cfg["14"].guide_text = "开放竞技场";guide_cfg["14"].fun_key = "arena";guide_cfg["14"].need = "1";guide_cfg["14"].need_map = "1";guide_cfg["14"].next_guide = 47;
    s = {};
    guide_cfg["14"] = guide_cfg["14"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["14"].push(s);
    
    s = {};
    guide_cfg["14"] = guide_cfg["14"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.arena.id;
    };
    
    guide_cfg["14"].push(s);
    
    s = {};
    guide_cfg["16"] = guide_cfg["16"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["16"].count = 1;guide_cfg["16"].trigger = `open_fun.id==${function_open.gang.id-1}`;guide_cfg["16"].widget = "app_b-wild-wild";guide_cfg["16"].guide_text = "开放门派";guide_cfg["16"].fun_key = "gang";guide_cfg["16"].need = "1";guide_cfg["16"].need_map = "1";
    s = {};
    guide_cfg["16"] = guide_cfg["16"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["16"].push(s);
    
    s = {};
    guide_cfg["16"] = guide_cfg["16"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.gang.id;
    };
    
    guide_cfg["16"].push(s);
    
    s = {};
    guide_cfg["17"] = guide_cfg["17"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["17"].count = 1;guide_cfg["17"].trigger = `open_fun.id==${function_open.equip_fb.id-1}`;guide_cfg["17"].widget = "app_b-wild-wild";guide_cfg["17"].guide_text = "开放装备副本";guide_cfg["17"].fun_key = "equip_fb";guide_cfg["17"].need = "1";guide_cfg["17"].need_map = "1";guide_cfg["17"].next_guide = 48;
    s = {};
    guide_cfg["17"] = guide_cfg["17"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["17"].push(s);
    
    s = {};
    guide_cfg["17"] = guide_cfg["17"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.equip_fb.id;
    };
    
    guide_cfg["17"].push(s);
    
    s = {};
    guide_cfg["18"] = guide_cfg["18"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["18"].count = 1;guide_cfg["18"].trigger = `open_fun.id==${function_open.random_boss.id-1}`;guide_cfg["18"].widget = "app_b-wild-wild";guide_cfg["18"].guide_text = "开放宝箱守卫";guide_cfg["18"].fun_key = "random_boss";guide_cfg["18"].need = "1";guide_cfg["18"].need_map = "1";
    s = {};
    guide_cfg["18"] = guide_cfg["18"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["18"].push(s);
    
    s = {};
    guide_cfg["18"] = guide_cfg["18"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.random_boss.id;
    };
    
    guide_cfg["18"].push(s);
    
    s = {};
    guide_cfg["19"] = guide_cfg["19"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["19"].count = 1;guide_cfg["19"].trigger = `open_fun.id==${function_open.tower.id-1}`;guide_cfg["19"].widget = "app_b-wild-wild";guide_cfg["19"].guide_text = "开放天庭秘境";guide_cfg["19"].fun_key = "tower";guide_cfg["19"].need = "1";guide_cfg["19"].need_map = "1";guide_cfg["19"].next_guide = 49;
    s = {};
    guide_cfg["19"] = guide_cfg["19"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["19"].push(s);
    
    s = {};
    guide_cfg["19"] = guide_cfg["19"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.tower.id;
    };
    
    guide_cfg["19"].push(s);
    
    s = {};
    guide_cfg["20"] = guide_cfg["20"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["20"].count = 1;guide_cfg["20"].trigger = `open_fun.id==${function_open.equip_star.id-1}`;guide_cfg["20"].widget = "app_b-wild-wild";guide_cfg["20"].guide_text = "开放装备升星";guide_cfg["20"].fun_key = "equip_star";guide_cfg["20"].need = "1";guide_cfg["20"].need_map = "1";
    s = {};
    guide_cfg["20"] = guide_cfg["20"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["20"].push(s);
    
    s = {};
    guide_cfg["20"] = guide_cfg["20"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.equip_star.id;
    };
    
    guide_cfg["20"].push(s);
    
    s = {};
    guide_cfg["21"] = guide_cfg["21"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["21"].count = 1;guide_cfg["21"].trigger = `open_fun.id==${function_open.instance_fb.id-1}`;guide_cfg["21"].widget = "app_b-wild-wild";guide_cfg["21"].guide_text = "开放九幽幻境";guide_cfg["21"].fun_key = "instance_fb";guide_cfg["21"].need = "1";guide_cfg["21"].need_map = "1";guide_cfg["21"].next_guide = 50;
    s = {};
    guide_cfg["21"] = guide_cfg["21"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["21"].push(s);
    
    s = {};
    guide_cfg["21"] = guide_cfg["21"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.instance_fb.id;
    };
    
    guide_cfg["21"].push(s);
    
    s = {};
    guide_cfg["22"] = guide_cfg["22"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["22"].count = 1;guide_cfg["22"].trigger = `open_fun.id==${function_open.gest.id-1}`;guide_cfg["22"].widget = "app_b-wild-wild";guide_cfg["22"].guide_text = "开放阵法";guide_cfg["22"].fun_key = "gest";guide_cfg["22"].need = "1";guide_cfg["22"].need_map = "1";
    s = {};
    guide_cfg["22"] = guide_cfg["22"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["22"].push(s);
    
    s = {};
    guide_cfg["22"] = guide_cfg["22"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.gest.id;
    };
    
    guide_cfg["22"].push(s);
    
    s = {};
    guide_cfg["23"] = guide_cfg["23"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["23"].count = 1;guide_cfg["23"].trigger = `open_fun.id==${function_open.gest_fb.id-1}`;guide_cfg["23"].widget = "app_b-wild-wild";guide_cfg["23"].guide_text = "开放心法奇遇";guide_cfg["23"].fun_key = "gest_fb";guide_cfg["23"].need = "1";guide_cfg["23"].need_map = "1";
    s = {};
    guide_cfg["23"] = guide_cfg["23"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["23"].push(s);
    
    s = {};
    guide_cfg["23"] = guide_cfg["23"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.gest_fb.id;
    };
    
    guide_cfg["23"].push(s);
    
    s = {};
    guide_cfg["24"] = guide_cfg["24"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["24"].count = 1;guide_cfg["24"].trigger = `open_fun.id==${function_open.equip_red_forge.id-1}`;guide_cfg["24"].widget = "app_b-wild-wild";guide_cfg["24"].guide_text = "开放神装锻造";guide_cfg["24"].fun_key = "equip_red_forge";guide_cfg["24"].need = "1";guide_cfg["24"].need_map = "1";
    s = {};
    guide_cfg["24"] = guide_cfg["24"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["24"].push(s);
    
    s = {};
    guide_cfg["24"] = guide_cfg["24"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.equip_red_forge.id;
    };
    
    guide_cfg["24"].push(s);
    
    s = {};
    guide_cfg["25"] = guide_cfg["25"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["25"].count = 1;guide_cfg["25"].trigger = `open_fun.id==${function_open.equip_red_wash.id-1}`;guide_cfg["25"].widget = "app_b-wild-wild";guide_cfg["25"].guide_text = "开放神装洗练";guide_cfg["25"].fun_key = "equip_red_wash";guide_cfg["25"].need = "1";guide_cfg["25"].need_map = "1";
    s = {};
    guide_cfg["25"] = guide_cfg["25"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["25"].push(s);
    
    s = {};
    guide_cfg["25"] = guide_cfg["25"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.equip_red_wash.id;
    };
    
    guide_cfg["25"].push(s);
    
    s = {};
    guide_cfg["27"] = guide_cfg["27"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["27"].count = 1;guide_cfg["27"].trigger = `open_fun.id==${function_open.soul.id-1}`;guide_cfg["27"].widget = "app_b-wild-wild";guide_cfg["27"].guide_text = "开放龙魂";guide_cfg["27"].fun_key = "soul";guide_cfg["27"].need = "1";guide_cfg["27"].need_map = "1";
    s = {};
    guide_cfg["27"] = guide_cfg["27"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["27"].push(s);
    
    s = {};
    guide_cfg["27"] = guide_cfg["27"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.soul.id;
    };
    
    guide_cfg["27"].push(s);
    
    s = {};
    guide_cfg["28"] = guide_cfg["28"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["28"].count = 1;guide_cfg["28"].trigger = `open_fun.id==${function_open.weapon_soul.id-1}`;guide_cfg["28"].widget = "app_b-wild-wild";guide_cfg["28"].guide_text = "开放赋灵";guide_cfg["28"].fun_key = "weapon_soul";guide_cfg["28"].need = "1";guide_cfg["28"].need_map = "1";
    s = {};
    guide_cfg["28"] = guide_cfg["28"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["28"].push(s);
    
    s = {};
    guide_cfg["28"] = guide_cfg["28"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.weapon_soul.id;
    };
    
    guide_cfg["28"].push(s);
    
    s = {};
    guide_cfg["29"] = guide_cfg["29"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["29"].count = 1;guide_cfg["29"].trigger = `open_fun.id==${function_open.equip_level.id-1}`;guide_cfg["29"].widget = "app_b-wild-wild";guide_cfg["29"].guide_text = "开放装备强化";guide_cfg["29"].fun_key = "equip_level";guide_cfg["29"].need = "1";guide_cfg["29"].need_map = "1";guide_cfg["29"].next_guide = 42;
    s = {};
    guide_cfg["29"] = guide_cfg["29"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["29"].push(s);
    
    s = {};
    guide_cfg["29"] = guide_cfg["29"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.equip_level.id;
    };
    
    guide_cfg["29"].push(s);
    
    s = {};
    guide_cfg["30"] = guide_cfg["30"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["30"].count = 1;guide_cfg["30"].trigger = `open_fun.id==${function_open.reclaim.id-1}`;guide_cfg["30"].widget = "app_b-wild-wild";guide_cfg["30"].guide_text = "开放熔炼";guide_cfg["30"].fun_key = "reclaim";guide_cfg["30"].need = "1";guide_cfg["30"].need_map = "1";guide_cfg["30"].next_guide = 43;
    s = {};
    guide_cfg["30"] = guide_cfg["30"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["30"].push(s);
    
    s = {};
    guide_cfg["30"] = guide_cfg["30"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.reclaim.id;
    };
    
    guide_cfg["30"].push(s);
    
    s = {};
    guide_cfg["31"] = guide_cfg["31"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["31"].count = 1;guide_cfg["31"].trigger = `open_fun.id==${function_open.store.id-1}`;guide_cfg["31"].widget = "app_b-wild-wild";guide_cfg["31"].guide_text = "开放商店";guide_cfg["31"].fun_key = "store";guide_cfg["31"].need_map = "1";
    s = {};
    guide_cfg["31"] = guide_cfg["31"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["31"].push(s);
    
    s = {};
    guide_cfg["31"] = guide_cfg["31"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.store.id;
    };
    
    guide_cfg["31"].push(s);
    
    s = {};
    guide_cfg["32"] = guide_cfg["32"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["32"].count = 1;guide_cfg["32"].trigger = `open_fun.id==${function_open.money_tree.id-1}`;guide_cfg["32"].widget = "app_b-wild-wild";guide_cfg["32"].guide_text = "开放摇钱树";guide_cfg["32"].fun_key = "money_tree";guide_cfg["32"].need_map = "1";
    s = {};
    guide_cfg["32"] = guide_cfg["32"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["32"].push(s);
    
    s = {};
    guide_cfg["32"] = guide_cfg["32"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.money_tree.id;
    };
    
    guide_cfg["32"].push(s);
    
    s = {};
    guide_cfg["33"] = guide_cfg["33"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["33"].count = 1;guide_cfg["33"].trigger = `open_fun.id==${function_open.off_line.id-1}`;guide_cfg["33"].widget = "app_b-wild-wild";guide_cfg["33"].guide_text = "开放离线收益";guide_cfg["33"].fun_key = "off_line";guide_cfg["33"].need_map = "1";
    s = {};
    guide_cfg["33"] = guide_cfg["33"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["33"].push(s);
    
    s = {};
    guide_cfg["33"] = guide_cfg["33"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.off_line.id;
    };
    
    guide_cfg["33"].push(s);
    
    s = {};
    guide_cfg["34"] = guide_cfg["34"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["34"].count = 1;guide_cfg["34"].trigger = `open_fun.id==${function_open.investment.id-1}`;guide_cfg["34"].widget = "app_b-wild-wild";guide_cfg["34"].guide_text = "开放成长基金";guide_cfg["34"].fun_key = "investment";guide_cfg["34"].need_map = "1";
    s = {};
    guide_cfg["34"] = guide_cfg["34"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["34"].push(s);
    
    s = {};
    guide_cfg["34"] = guide_cfg["34"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.investment.id;
    };
    
    guide_cfg["34"].push(s);
    
    s = {};
    guide_cfg["34"] = guide_cfg["34"] || [];
    s.type = "force";s.name = "gotoActivities";s.ignore = true;
    guide_cfg["34"].push(s);
    
    s = {};
    guide_cfg["34"] = guide_cfg["34"] || [];
    s.type = "force";s.name = "investment";s.ignore = true;
    guide_cfg["34"].push(s);
    
    s = {};
    guide_cfg["35"] = guide_cfg["35"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["35"].count = 1;guide_cfg["35"].trigger = `open_fun.id==${function_open.sevendays.id-1}`;guide_cfg["35"].widget = "app_b-wild-wild";guide_cfg["35"].guide_text = "七日活动";guide_cfg["35"].fun_key = "sevendays";guide_cfg["35"].need = "1";guide_cfg["35"].need_map = "1";guide_cfg["35"].next_guide = 52;
    s = {};
    guide_cfg["35"] = guide_cfg["35"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["35"].push(s);
    
    s = {};
    guide_cfg["35"] = guide_cfg["35"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.sevendays.id;
    };
    
    guide_cfg["35"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["36"].count = 2;guide_cfg["36"].trigger = `reclaim.bagFull`;guide_cfg["36"].widget = "app_b-wild-wild";guide_cfg["36"].guide_text = "熔炼";guide_cfg["36"].need = "1";
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "menu_bag_icon";
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "reclaim";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "reclaim_1";s.fix = "re";s.net_ok = "app/prop/melt@melt";
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "close";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["36"] = guide_cfg["36"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["36"].push(s);
    
    s = {};
    guide_cfg["37"] = guide_cfg["37"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["37"].music = "music_auto_fight";guide_cfg["37"].count = 1;guide_cfg["37"].trigger = `wild.wild_max_mission>=4&&wild.autoNotFight`;guide_cfg["37"].widget = "app_b-wild-wild";guide_cfg["37"].guide_text = "设置自动挑战BOSS";guide_cfg["37"].need = "1";
    s = {};
    guide_cfg["37"] = guide_cfg["37"] || [];
    s.type = "force";s.name = "auto_reclaim_head";
    guide_cfg["37"].push(s);
    
    s = {};
    guide_cfg["37"] = guide_cfg["37"] || [];
    s.type = "force";s.name = "auto_reclaim_gou";s.fix = "wd";
    guide_cfg["37"].push(s);
    
    s = {};
    guide_cfg["37"] = guide_cfg["37"] || [];
    s.type = "force";s.name = "close";s.ignore = true;
    guide_cfg["37"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["38"].count = 1;guide_cfg["38"].trigger = `reclaim.bagFull&&reclaim.reclaim_guide`;guide_cfg["38"].widget = "app_b-wild-wild";guide_cfg["38"].guide_text = "熔炼";guide_cfg["38"].need = "1";
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "menu_bag_icon";
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "reclaim";s.ignore = true;s.widget = "app_b-bag-main-bag";
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "reclaim_1";s.fix = "re";s.net_ok = "app/prop/melt@melt";s.widget = "app_c-reclaim_share-reclaim_bg1";
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "close";s.ignore = true;
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["38"] = guide_cfg["38"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["38"].push(s);
    
    s = {};
    guide_cfg["39"] = guide_cfg["39"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["39"].music = "music-first_recharge";guide_cfg["39"].count = 1;guide_cfg["39"].trigger = `player.level>=10&&recharge.first_pay_gift_state.length==0&&!wild.flagHitBoss`;guide_cfg["39"].widget = "app_b-wild-wild";guide_cfg["39"].guide_text = "点击首充";
    s = {};
    guide_cfg["39"] = guide_cfg["39"] || [];
    s.type = "force";s.name = "gotoFirstGift";
    guide_cfg["39"].push(s);
    
    s = {};
    guide_cfg["39"] = guide_cfg["39"] || [];
    s.type = "force";s.name = "weapon_click";s.ignore = true;
    guide_cfg["39"].push(s);
    
    s = {};
    guide_cfg["40"] = guide_cfg["40"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["40"].music = "music-online_gift";guide_cfg["40"].count = 1;guide_cfg["40"].trigger = `online_gift.get_award&&chat.guide`;guide_cfg["40"].widget = "app_b-wild-wild";guide_cfg["40"].guide_text = "领取在线礼包";
    s = {};
    guide_cfg["40"] = guide_cfg["40"] || [];
    s.type = "force";s.name = "online_gift";s.net_ok = "app/activity/online_gift@award";
    guide_cfg["40"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["41"].count = 1;guide_cfg["41"].trigger = `open_fun.id>=${function_open.magic_activate.id}&&chat.guide&&!wild.flagHitBoss`;guide_cfg["41"].widget = "app_b-wild-wild";guide_cfg["41"].guide_text = "神兵界面操作";
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "magic_release";s.timeout = 3;
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "menu_role_icon";s.ignore = true;s.widget = "app_b-wild-wild";
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "magic_btn";s.ignore = true;s.widget = "app_b-role-role";
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "treasure_up";s.fix = "mu";s.net_ok = "app/prop/treasure@hexagram_level_up";s.widget = "app_b-magic-main";
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "treasure_up";s.net_ok = "app/prop/treasure@hexagram_level_up";s.ignore = true;
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "treasure_up";s.net_ok = "app/prop/treasure@hexagram_level_up";s.ignore = true;
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["41"] = guide_cfg["41"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["41"].push(s);
    
    s = {};
    guide_cfg["42"] = guide_cfg["42"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["42"].count = 1;guide_cfg["42"].trigger = `open_fun.id>=${function_open.equip_level.id}`;guide_cfg["42"].widget = "app_b-wild-wild";guide_cfg["42"].guide_text = "强化界面操作";
    s = {};
    guide_cfg["42"] = guide_cfg["42"] || [];
    s.type = "force";s.name = "menu_equip_icon";
    guide_cfg["42"].push(s);
    
    s = {};
    guide_cfg["42"] = guide_cfg["42"] || [];
    s.type = "force";s.name = "level_up";s.fix = "lu";s.net_ok = "app/prop/equip@level_up";s.widget = "app_c-forge-main-main";
    guide_cfg["42"].push(s);
    
    s = {};
    guide_cfg["42"] = guide_cfg["42"] || [];
    s.type = "force";s.name = "level_up";s.net_ok = "app/prop/equip@level_up";s.ignore = true;
    guide_cfg["42"].push(s);
    
    s = {};
    guide_cfg["42"] = guide_cfg["42"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["42"].push(s);
    
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["43"].count = 1;guide_cfg["43"].trigger = `open_fun.id>=${function_open.reclaim.id}`;guide_cfg["43"].widget = "app_b-wild-wild";guide_cfg["43"].guide_text = "熔炼界面操作";
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.name = "menu_bag_icon";
    guide_cfg["43"].push(s);
    
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.name = "reclaim";s.ignore = true;s.widget = "app_b-bag-main-bag";
    guide_cfg["43"].push(s);
    
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.name = "reclaim_1";s.fix = "re";s.net_ok = "app/prop/melt@melt";s.widget = "app_c-reclaim_share-reclaim_bg1";
    guide_cfg["43"].push(s);
    
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.name = "reclaim_1";s.net_ok = "app/prop/melt@melt";s.ignore = true;
    guide_cfg["43"].push(s);
    
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.name = "close";s.ignore = true;
    guide_cfg["43"].push(s);
    
    s = {};
    guide_cfg["43"] = guide_cfg["43"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["43"].push(s);
    
    s = {};
    guide_cfg["44"] = guide_cfg["44"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["44"].count = 1;guide_cfg["44"].trigger = `open_fun.id>=${function_open.equip_gem.id}`;guide_cfg["44"].widget = "app_b-wild-wild";guide_cfg["44"].guide_text = "宝石界面操作";
    s = {};
    guide_cfg["44"] = guide_cfg["44"] || [];
    s.type = "force";s.name = "menu_equip_icon";
    guide_cfg["44"].push(s);
    
    s = {};
    guide_cfg["44"] = guide_cfg["44"] || [];
    s.type = "force";s.name = "gem_btn";s.ignore = true;s.widget = "app_c-forge-main-main";
    guide_cfg["44"].push(s);
    
    s = {};
    guide_cfg["44"] = guide_cfg["44"] || [];
    s.type = "force";s.name = "gem_up";s.fix = "gu";s.net_ok = "app/prop/equip@level_up_diam";
    guide_cfg["44"].push(s);
    
    s = {};
    guide_cfg["44"] = guide_cfg["44"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["44"].push(s);
    
    s = {};
    guide_cfg["45"] = guide_cfg["45"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["45"].count = 1;guide_cfg["45"].trigger = `open_fun.id>=${function_open.pet.id}`;guide_cfg["45"].widget = "app_b-wild-wild";guide_cfg["45"].guide_text = "宠物界面操作";
    s = {};
    guide_cfg["45"] = guide_cfg["45"] || [];
    s.type = "force";s.name = "menu_role_icon";
    guide_cfg["45"].push(s);
    
    s = {};
    guide_cfg["45"] = guide_cfg["45"] || [];
    s.type = "force";s.name = "pet_btn";s.ignore = true;s.widget = "app_b-role-role";
    guide_cfg["45"].push(s);
    
    s = {};
    guide_cfg["45"] = guide_cfg["45"] || [];
    s.type = "force";s.name = "pet_up";s.fix = "pu";s.net_ok = "app/prop/pet@star_up";s.widget = "app_b-surface-pet";
    guide_cfg["45"].push(s);
    
    s = {};
    guide_cfg["45"] = guide_cfg["45"] || [];
    s.type = "force";s.name = "pet_up";s.net_ok = "app/prop/pet@star_up";s.ignore = true;
    guide_cfg["45"].push(s);
    
    s = {};
    guide_cfg["45"] = guide_cfg["45"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["45"].push(s);
    
    s = {};
    guide_cfg["46"] = guide_cfg["46"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["46"].count = 1;guide_cfg["46"].trigger = `open_fun.id>=${function_open.exp_fb.id}&&exp_fb&&exp_fb.total_count`;guide_cfg["46"].widget = "app_b-wild-wild";guide_cfg["46"].guide_text = "去试炼副本战斗";
    s = {};
    guide_cfg["46"] = guide_cfg["46"] || [];
    s.type = "force";s.name = "menu_fb_icon";
    guide_cfg["46"].push(s);
    
    s = {};
    guide_cfg["46"] = guide_cfg["46"] || [];
    s.type = "force";s.name = "exp_fb";s.ignore = true;s.widget = "app_b-explore-explore";
    guide_cfg["46"].push(s);
    
    s = {};
    guide_cfg["46"] = guide_cfg["46"] || [];
    s.type = "force";s.name = "exp_fb_open";s.fix = "exp_fix";s.net_ok = "app/pve/exp_instance@start_fight";s.widget = "app_c-exp_fb-exp_fb";
    guide_cfg["46"].push(s);
    
    s = {};
    guide_cfg["47"] = guide_cfg["47"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["47"].count = 1;guide_cfg["47"].trigger = `open_fun.id>=${function_open.arena.id}&&arena&&arena.fight_times<=2`;guide_cfg["47"].widget = "app_b-wild-wild";guide_cfg["47"].guide_text = "去竞技场战斗";
    s = {};
    guide_cfg["47"] = guide_cfg["47"] || [];
    s.type = "force";s.name = "menu_fb_icon";
    guide_cfg["47"].push(s);
    
    s = {};
    guide_cfg["47"] = guide_cfg["47"] || [];
    s.type = "force";s.name = "arena";s.ignore = true;s.widget = "app_b-explore-explore";
    guide_cfg["47"].push(s);
    
    s = {};
    guide_cfg["47"] = guide_cfg["47"] || [];
    s.type = "force";s.name = "arena_open";s.fix = "arena_fix";s.net_ok = "app/pvp/jjc@start_fight";s.widget = "app_c-arena-arena";
    guide_cfg["47"].push(s);
    
    s = {};
    guide_cfg["48"] = guide_cfg["48"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["48"].count = 1;guide_cfg["48"].trigger = `open_fun.id>=${function_open.equip_fb.id}&&equip_fb&&equip_fb.use_times<=2`;guide_cfg["48"].widget = "app_b-wild-wild";guide_cfg["48"].guide_text = "去装备副本战斗";
    s = {};
    guide_cfg["48"] = guide_cfg["48"] || [];
    s.type = "force";s.name = "menu_fb_icon";
    guide_cfg["48"].push(s);
    
    s = {};
    guide_cfg["48"] = guide_cfg["48"] || [];
    s.type = "force";s.name = "equip_fb";s.ignore = true;s.widget = "app_b-explore-explore";
    guide_cfg["48"].push(s);
    
    s = {};
    guide_cfg["48"] = guide_cfg["48"] || [];
    s.type = "force";s.name = "equip_curr";s.ignore = true;s.widget = "app_c-equip_fb-equip_fb";
    guide_cfg["48"].push(s);
    
    s = {};
    guide_cfg["48"] = guide_cfg["48"] || [];
    s.type = "force";s.name = "equip_ch";s.fix = "equip_fix";s.net_ok = "app/pve/equip_instance@start_fight";s.widget = "app_c-equip_fb-mission-mission";
    guide_cfg["48"].push(s);
    
    s = {};
    guide_cfg["49"] = guide_cfg["49"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["49"].count = 1;guide_cfg["49"].trigger = `open_fun.id>=${function_open.tower.id}`;guide_cfg["49"].widget = "app_b-wild-wild";guide_cfg["49"].guide_text = "去天庭秘境战斗";
    s = {};
    guide_cfg["49"] = guide_cfg["49"] || [];
    s.type = "force";s.name = "menu_fb_icon";
    guide_cfg["49"].push(s);
    
    s = {};
    guide_cfg["49"] = guide_cfg["49"] || [];
    s.type = "force";s.name = "tower";s.ignore = true;s.widget = "app_b-explore-explore";
    guide_cfg["49"].push(s);
    
    s = {};
    guide_cfg["49"] = guide_cfg["49"] || [];
    s.type = "force";s.name = "tower_ch";s.fix = "tower_fix";s.net_ok = "app/pve/tower@start_fight";s.widget = "app_c-tower-tower";
    guide_cfg["49"].push(s);
    
    s = {};
    guide_cfg["50"] = guide_cfg["50"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["50"].count = 1;guide_cfg["50"].trigger = `open_fun.id>=${function_open.instance_fb.id}&&instance_fb&&instance_fb.use_times<=2`;guide_cfg["50"].widget = "app_b-wild-wild";guide_cfg["50"].guide_text = "去九幽幻境战斗";
    s = {};
    guide_cfg["50"] = guide_cfg["50"] || [];
    s.type = "force";s.name = "menu_fb_icon";
    guide_cfg["50"].push(s);
    
    s = {};
    guide_cfg["50"] = guide_cfg["50"] || [];
    s.type = "force";s.name = "instance_fb";s.ignore = true;s.widget = "app_b-explore-explore";
    guide_cfg["50"].push(s);
    
    s = {};
    guide_cfg["50"] = guide_cfg["50"] || [];
    s.type = "force";s.name = "instance_curr";s.ignore = true;s.widget = "app_c-instance_fb-instance_fb";
    guide_cfg["50"].push(s);
    
    s = {};
    guide_cfg["50"] = guide_cfg["50"] || [];
    s.type = "force";s.name = "instance_ch";s.fix = "instance_fix";s.net_ok = "app/pve/instance@start_fight";s.widget = "app_c-instance_fb-mission-mission";
    guide_cfg["50"].push(s);
    
    s = {};
    guide_cfg["51"] = guide_cfg["51"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["51"].count = 1;guide_cfg["51"].trigger = `open_fun.id>=${function_open.daily_fb.id}`;guide_cfg["51"].widget = "app_b-wild-wild";guide_cfg["51"].guide_text = "去材料副本战斗";
    s = {};
    guide_cfg["51"] = guide_cfg["51"] || [];
    s.type = "force";s.name = "menu_fb_icon";
    guide_cfg["51"].push(s);
    
    s = {};
    guide_cfg["51"] = guide_cfg["51"] || [];
    s.type = "force";s.name = "daily_fb";s.ignore = true;s.widget = "app_b-explore-explore";
    guide_cfg["51"].push(s);
    
    s = {};
    guide_cfg["51"] = guide_cfg["51"] || [];
    s.type = "force";s.name = "daily_task";s.ignore = true;s.widget = "app_c-daily_fb-daily_fb";
    guide_cfg["51"].push(s);
    
    s = {};
    guide_cfg["51"] = guide_cfg["51"] || [];
    s.type = "force";s.name = "daily_ch";s.fix = "daily_fix";s.net_ok = "app/pve/daily_instance@start_fight";s.widget = "app_c-daily_fb-task-task";
    guide_cfg["51"].push(s);
    
    s = {};
    guide_cfg["52"] = guide_cfg["52"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["52"].count = 1;guide_cfg["52"].trigger = `open_fun.id>=${function_open.sevendays.id}&&sevendays&&!sevendays.record["1"]&&!wild.flagHitBoss`;guide_cfg["52"].widget = "app_b-wild-wild";guide_cfg["52"].guide_text = "七日活动";
    s = {};
    guide_cfg["52"] = guide_cfg["52"] || [];
    s.type = "force";s.name = "gotoSevendaysAct";
    s.purpose = (db) => {
        return db.sevendays.record["1"];
    };
    
    guide_cfg["52"].push(s);
    
    s = {};
    guide_cfg["52"] = guide_cfg["52"] || [];
    s.type = "force";s.name = "seven_btn";s.fix = "seven_fix";s.net_ok = "app/activity/7day@award";s.widget = "app_c-sevendays-sevendays";
    guide_cfg["52"].push(s);
    
    s = {};
    guide_cfg["52"] = guide_cfg["52"] || [];
    s.type = "force";s.name = "close_all";s.ignore = true;
    guide_cfg["52"].push(s);
    
    s = {};
    guide_cfg["53"] = guide_cfg["53"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["53"].count = 1;guide_cfg["53"].trigger = `open_fun.id==${function_open.skill2.id-1}`;guide_cfg["53"].widget = "app_b-wild-wild";guide_cfg["53"].guide_text = "开放技能2";guide_cfg["53"].fun_key = "skill2";guide_cfg["53"].next_guide = 8;
    s = {};
    guide_cfg["53"] = guide_cfg["53"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["53"].push(s);
    
    s = {};
    guide_cfg["53"] = guide_cfg["53"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.skill2.id;
    };
    
    guide_cfg["53"].push(s);
    
    s = {};
    guide_cfg["54"] = guide_cfg["54"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["54"].count = 1;guide_cfg["54"].trigger = `open_fun.id==${function_open.skill3.id-1}`;guide_cfg["54"].widget = "app_b-wild-wild";guide_cfg["54"].guide_text = "开放技能3";guide_cfg["54"].fun_key = "skill3";
    s = {};
    guide_cfg["54"] = guide_cfg["54"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["54"].push(s);
    
    s = {};
    guide_cfg["54"] = guide_cfg["54"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.skill3.id;
    };
    
    guide_cfg["54"].push(s);
    
    s = {};
    guide_cfg["55"] = guide_cfg["55"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["55"].count = 1;guide_cfg["55"].trigger = `open_fun.id==${function_open.skill4.id-1}`;guide_cfg["55"].widget = "app_b-wild-wild";guide_cfg["55"].guide_text = "开放技能4";guide_cfg["55"].fun_key = "skill4";
    s = {};
    guide_cfg["55"] = guide_cfg["55"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["55"].push(s);
    
    s = {};
    guide_cfg["55"] = guide_cfg["55"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.skill4.id;
    };
    
    guide_cfg["55"].push(s);
    
    s = {};
    guide_cfg["56"] = guide_cfg["56"] || [];
    s.type = "force";s.widget = "app_b-wild-wild";guide_cfg["56"].count = 1;guide_cfg["56"].trigger = `open_fun.id==${function_open.public_boss.id-1}`;guide_cfg["56"].widget = "app_b-wild-wild";guide_cfg["56"].guide_text = "开放荒野降魔";guide_cfg["56"].fun_key = "public_boss";guide_cfg["56"].need = "1";guide_cfg["56"].need_map = "1";
    s = {};
    guide_cfg["56"] = guide_cfg["56"] || [];
    s.type = "force";s.name = "fun_open";
    guide_cfg["56"].push(s);
    
    s = {};
    guide_cfg["56"] = guide_cfg["56"] || [];
    s.type = "force";s.name = "mission08";s.fix = "fo";s.net_ok = "app/activity@open_function";
    s.purpose = (db) => {
        return db.open_fun.id>=function_open.public_boss.id;
    };
    
    guide_cfg["56"].push(s);
    