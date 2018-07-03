import { monster_attribute } from "fight/b/common/monster_attribute";
import { monster_base } from "fight/b/common/monsterBase";
import { role_base } from "fight/b/common/role_base";
import { skill as fight_skill } from "fight/b/common/skill";
import { buff } from "fight/b/common/buff";
import { Pet, Fighter } from "fight/a/class";

export class Init_Fighter {
    //创建monster
    static createMonster(_item, base_cfg) {
        let monster = new Fighter(),
            //boss_id
            boss_id = _item[0],
            //属性id
            attr_id = base_cfg[boss_id].attr_id,
            //等级
            level = _item[1],
            //isBoss?
            isBoss = _item[2];
        //属性
        monster.A = monster_attribute[attr_id + '-' + level].attr;
        monster.money = monster_attribute[attr_id + '-' + level].money;
        //经验
        monster.exp = monster_attribute[attr_id + '-' + level].exp;
        //掉落id
        monster.drop_id = monster_attribute[attr_id + '-' + level].drop_id;
        //掉落type
        monster.drop_type = monster_attribute[attr_id + '-' + level].drop_type;
        //战斗者显示类型 0-普通怪，1-boss，2-机器人，3-精英怪
        monster.show_type = _item[2];
        //技能
        monster.skill = [];
        let skillList = base_cfg[boss_id].skill;
        //  for(let i=0;i<skillList.length;i++){
        //     let ss = createSkill(skillList[i], 1, boss_id);
        //     if (fight_skill.table[skillList[i]]) monster.skill.push(ss);
        //  }

        for (let i = 0; i < skillList.length; i++) {

            let ss = createSkill(skillList[i], 1, base_cfg[boss_id]);
            if (fight_skill.table[skillList[i]]) monster.skill.push(ss);
            if (ss.combo && ss.backSkill) {
                for (let j = 0; j < ss.backSkill.length; j++) {
                    let _s = createSkill(ss.backSkill[j], 1);
                    monster.skill.push(_s);
                }
            }
        }

        //移动速度
        monster.speed = base_cfg[boss_id].speed;
        //回怪距离
        monster.maximum = base_cfg[boss_id].maximum;
        //怪物id
        monster.sid = boss_id;
        //hp
        monster.hp = monster.A.max_hp;
        //
        monster.max_hpCount = monster.A.max_hp;
        //阵营
        monster.camp = 2;
        //type
        monster.type = "monster";
        //name 
        monster.name = _item[3] ? (_item[3] && typeof(_item[3][0]) == "number" ? fromCharCode(_item[3]) : base_cfg[boss_id].name) : base_cfg[boss_id].name;
        //模型
        monster.module = base_cfg[boss_id].module;
        //缩放
        monster.scale = base_cfg[boss_id].scale;
        //怪物等级
        monster.level = level;
        //是否被动
        monster.passive = base_cfg[boss_id].passive;
        //寻找目标范围
        monster.round = base_cfg[boss_id].round || 0;
        
        monster.career_id = boss_id;

        monster.x = 0;
        monster.y = 0;
        monster.z = 0;
        return monster;
    };
    //创建fighter
    static createfighter(_item) {
        //创建fighter模板
        let fighter = new Fighter();
        //转换player数据
        let player: any = changeArrToJson(_item);
        player.attr = changeArrToJson(player.attr);
        player.info = changeArrToJson(player.info);

        //技能
        fighter.skill = [];
        let skillList = player.skill;

        //属性
        fighter.A = player.attr;
        //id
        fighter.sid = player.info.sid;
        //对应列表role_base的id
        fighter.career_id = player.info.career_id;
        //移动速度
        fighter.speed = role_base[fighter.career_id].speed;
        //hp
        fighter.hp = fighter.A.max_hp;
        //
        fighter.name = player.info.name;
        //
        fighter.max_hpCount = fighter.A.max_hp;
        //阵营
        fighter.camp = player.info.camp ? player.info.camp : 1;
        //类型
        fighter.type = player.type;
        //模型id
        fighter.module = role_base[fighter.career_id].module;
        //国家
        fighter.area = player.info.area;
        //宠物
        fighter.pet = player.info.pet;
        //时装
        fighter.clothes = player.info.clothes;
        //技能列表
        fighter.skillList = skillList;
        //buff列表
        fighter.buffList = this.initBuff(player.buff);
        //赋灵阶段
        fighter.ensoulClass = player.info.ensoul_class;
        //装备总星级
        fighter.equipStar = player.info.equip_star;
        //武器装备ID
        fighter.weaponId = player.info.equip[0] ? player.info.equip[0] : 0;
        fighter.x = 0;
        fighter.y = 0;
        fighter.z = 0;
        fighter.skill = initSkill(skillList, fighter);
        return fighter;
    };
    //根据怪物id lv 是否boss 构建一个怪物对象 不含表现模型
    static initMonster(monsterList, base_cfg?) {
        let _array = [];
        base_cfg = base_cfg || monster_base;
        for (let i = 0; i < monsterList.length; i++) {
            let f;
            //玩家镜像
            if (isArray(monsterList[i][0])) {
                f = Init_Fighter.createfighter(monsterList[i]);
                f.camp = 2;
                //机器人或怪物
            } else
                f = Init_Fighter.createMonster(monsterList[i], base_cfg);
                if(monsterList[i][3] && typeof(monsterList[i][3][0]) != "number"){
                    f.show_award = monsterList[i][3];
                }
            //机器人重新设置type
            if (monsterList[i][2] == 2)
                f.type = "fighter";
            _array.push(f);
        }
        return _array;
    }
    //初始化buff列表
    static initBuff(buffs){
        const bs = [];
        for (let i = 0; i < buffs.length; i++) {
            bs.push(getBuff(buffs[i][0]));
        }
        return bs;
    }
    //创建fighter对象
    static initFighter(fighterList) {
        let _array = [];
        for (let i = 0; i < fighterList.length; i++) {
            _array.push(Init_Fighter.createfighter(fighterList[i]));
        }
        return _array;
    }

    //创建宠物
    static initPet(o,n,f){
        let r : Pet = new Pet(n),
            setxyz = (x,y) => {
                r.x = x;
                r.y = y;
            };
        if(o){
            setxyz(o.x,o.y);
        }else{
            setxyz(f.x,f.y);
        }
        r.id = f.mapId;
        r.lookat = {value:[r.x,r.y,0],sign:Date.now()};
        r.parent = f;
        return r;
    }
}

export const initSkill = function (skillList, fighter) {
    var _skillList = [];
    for (let i = 0; i < skillList.length; i++) {
        let s = skillList[i];
        if (s[1] > 0) {
            let ss = createSkill(s[0], s[1], role_base[fighter.career_id]);
            if (fight_skill.table[s[0]]) _skillList.push(ss);
            if (ss.combo && ss.backSkill) {
                for (let j = 0; j < ss.backSkill.length; j++) {
                    let _s = createSkill(ss.backSkill[j], s[1]);
                    _skillList.push(_s);
                }
            }
        }
    }
    return _skillList;
}
/**
 * @description 获取buff配置数据
 * @param {Number}bid 
 * @example
 */
export const getBuff = (bid) => {
    return buff[bid];
}

export const createSkill = function (id, level, m?) {
    // 创建指定id的技能
    let i, s = s_clone(fight_skill.table[id]);
    if (!s) {
        console.log("没有该技能" + id);
    }
    if (!s.buff) {
        s.buff = [];
        for (i = 0; i < s.carryBuff.length && s.carryBuff[i] > 0; i++) {
            s.buff.push(buff[s.carryBuff[i]]);
        }
    }
    let lv = level ? level : 1;
    s.level = lv;
    if (m) {
        //绑上技能对应动作
        //let m = monster_base[module_id] ? monster_base[module_id] : role_base[module_id];
        s.skillAction = m.skill_action[s.id];
    }
    return s;

}


//将数组转化成json对象
//data [["key",value],……]
//返回 {key:value,……}
const changeArrToJson = function (data1, kf?) {
    if (!data1) return 0;
    let _data = {}, data = data1 || [];
    for (let i = 0, len = data.length; i < len; i++) {
        if (!kf) {
            if (data[i].length == 2) _data[data[i][0]] = data[i][1];
            else if (data[i].length > 2) {
                _data[data[i][0]] = data[i].slice(1, data[i].length);
            }
        } else {
            if (!_data[data[i][0]]) {
                _data[data[i][0]] = [];
            }
            let o = data[i].slice(1, data[i].length);
            o.push(i);
            _data[data[i][0]].push(o);

        }
    }
    return _data;
}

const s_clone = function (obj) {
    /* 深度克隆
    * @param  {object} obj 待克隆的对象
    * @return {object}     生成的对象
    */
    let o, i = 0,
        len = 0,
        k;
    switch (typeof obj) {
        case 'undefined':
            break;
        case 'string':
            o = obj.toString();
            break;
        case 'number':
            o = obj - 0;
            break;
        case 'boolean':
            o = obj;
            break;
        case 'object':
            if (obj === null) {
                o = null;
            } else {
                if (isArray(obj)) {
                    o = [];
                    for (i = 0, len = obj.length; i < len; i++) {
                        o.push(s_clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (k in obj) {
                        if (obj.hasOwnProperty(k)) {
                            o[k] = s_clone(obj[k]);
                        }
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
}

/**
 * 判断value是否为Array
 * @param  {js value} value 合法的js值
 * @return {boolean} value是否为Array
 */
const isArray = function (value) {
    return Object.prototype.toString.apply(value) === "[object Array]";
}

const fromCharCode = function (arr) {
    let str = "";
    for (let k = 0, len = arr.length; k < len; k++) {
        str += String.fromCharCode(arr[k]);
    }
    return str;
}