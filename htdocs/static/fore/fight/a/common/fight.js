
_$define("fight/a/common/fight",function (require, exports, exportsule) {
    "use strict";
    
    var mgr = exports;
    // 创建战斗者
    var fight_formula_1 = require("fight/a/common/fight_formula");
    var forefun_1 = require("fight/a/fore/forefight");
    //pi
    var vector3_1 = require("pi/math/vector3");
    var navMesh_1  =   require('pi/ecs/navmesh');
    
    //fight scene count
    mgr.count = 0;

    mgr.createFighter = function (fun) {//fun = app.yszzFight.fighter
        // 定义战斗者的基本属性：
        var fighter = {
            // id
            _id: 0,
            // 类型
            $class: "",
            /*
             // 最大血量
             max_hp: 0,
             // 攻击，一般用在普通攻击上
             attack: 0,
             // 防御
             defence: 0,
             // 破防
             un_defence: 0,
             // 暴击
             critical: 0,
             // 抗暴
             un_critical: 0,
             // 闪避-仅对物理攻击有效
             dodge: 0,
             // 命中
             un_dodge: 0,
             // 法术抗性
             resist: 0,
             // 法术穿透
             un_resist: 0,
             // 伤害加深
             damage_multiple: 0,
             // 伤害减免
             un_damage_multiple: 0,
             // 气势
             power: 0,
             // 最大能量
             max_energy: 0,
             */
            // 当前血量
            hp: 0,
            show_hp: 0,
            // 能量
            energy: 0,
            // 阵营， 1为己方，2为对方
            camp: 1,
            // 出场次序， 1是主角，以后为伙伴
            loc: 1,
            // fighters列表位置
            index: -1,
            // 仇恨
            taunt: 0,
            // 可释放的技能
            skill: [],
            //技能索引
            skill_index:{},
            //动作时间
            actionTime : 0,
            // 公共CD
            publicCDNextTime: 0,
            // 位置
            x: 0,
            y: 0,
            // 移动状态
            moving: false,
            // 无敌状态
            god: 0,
            // 晕眩状态
            stun: 0,
            // 免疫晕眩状态
            un_stun: 0,
            // 物理盾
            phyShield: { length: 0 },
            // 魔法盾
            magicShield: { length: 0 },
            // 物理魔法盾
            shield: { length: 0 },
            spreadCount:0,
            // buff
            buff: [],
            //连招上一段打击目标(神兵类技能)
            godPrevTargets:null,
            //连招上一段打击目标(普通技能)
            prevTargets:null,
            // 正在释放的技能
            spreadSkill: undefined,
            // 正在释放的技能目标
            spreadTargets: undefined,
            // 正在释放的技能等待时间
            spreadNextTime: 0,
            // 正在释放的技能等待时间
            useSkillTime: 0,
            // 手工移动的目的地
            handMove: undefined,
            // 当前选择的技能
            curSkill: undefined,
            // 当前选择的目标
            curTarget: null,
            //主目标选择条件[["sid",600022]]
            targetConds:null,
            // ui当前目标(头像)
            curHeadTarget: null,
            //自动战斗 控制个人目标
            ownTarget : undefined,
            ss: 0,
            // 记录fighter承受伤害对象，伤害
            damageList: {},
            //队伍id
            groupId: -1,
            //状态 1:手动选怪 1000:不参与战斗计算，最高限制状态
            status: 0,
            //战斗者显示类型 0-普通怪，1-boss，2-机器人，3-精英怪
            show_type:0,
            //是否是被动fighter
            passive: false,
            //是否显示
            hidden:false,
            // 随机数
            rand: 0
        };
        if (fun) {
            var o = new fun(fighter);
            Object.defineProperty(o, "state", {
                get: function () {
                    return this.ss;
                },
                set: function (value) {
                    this.ss = value;
                }
            });
            //fighter.__proto__ = fighterObj.prototype;
            return o;
        }
        return fighter;
    };
    // 创建技能
    mgr.createSkill = function () {
        // 定义技能的基本属性：
        var skill = {
            // id
            id: 0,
            // 名字
            name: "",
            // 类型
            $class: "",
            // 是否为手动技能，手动技能不会受到公共CD的限制，但仍然会产生公共CD
            // 1为普通手动技能：使用技能-释放技能 ; 2为手动立即释放技能：释放技能
            hand: 0,
            // 最大等级
            maxLevel: 0,
            // 优先级
            priority: 0,
            // 技能类型， 1物理 2法术
            skillType: 1,
            // 释放类型 1单次技能 2引导技能 3被动技能 4光环技能
            castType: 1,
            // 目标类型：
            // 1自己 2全体己方 3血最少的x个己方 4最近的x个队友（不包含自己） 5技能施放距离内随机的x个己方（参数为0表示全部）
            //11仇恨最高的敌人 12 全体敌人 13血最少的x个敌人 14最近的x个敌人 15技能施放距离内随机的x个敌人（参数为0表示全部）
            targetType: 11,
            // 目标类型AI参数
            targetAIParam: 0,
            // 技能施放距离
            distance: 0,
            // 是否范围技能
            isRangeSkill: 0,
            // 技能范围 半径
            range: 0,
            // 引导次数
            guideCount: 0,
            // 引导间隔
            guideInterval: 0,
            // 伤害类型 1伤害（如果是物理技能需要判断命中） 2治疗（不判断命中） 3没有伤害和治疗（不判断命中）
            damageType: 1,
            // 伤害加成
            damagePer: 1,
            // 固定伤害
            damage: 0,
            // 附带暴击率
            crit: 0,
            // 携带buff
            carryBuff: [],
            // 技能CD
            cdTime: 0,
            // 能量耗费
            energyCost: 0,
            // 释放延迟
            spreadDelay: 0,
            // 技能图标
            icon: "",
            // 震屏持续时间
            shakeTime: 0,
            // 技能特效
            skillEffect: 0,
            // 技能特效延迟
            skillEffectDelay: 0,
            // 技能特效位置 1当前目标（胸口） 2自己（胸口） 3场景上
            skillEffectPos: 0,
            // 击中特效
            hitEffect: 0,
            // 击中特效位置
            hitEffectPos: 0,
            // 技能音效
            skillSound: 0,
            // 技能音效延迟
            skillSoundDelay: 0,
            // 击中音效
            hitSound: "",
            //
            delaySpreadSkillTime : 0,
            // 等级
            level: 0,
            // 携带buff
            buff: undefined,
            // 冷却到期时间
            cdNextTime: 0
        };
        return mgr.copy(skill);
    };
    // 创建buff
    mgr.createBuff = function () {
        var buff = {
            // id
            id: 0,
            // 名字
            name: "",
            // 类型
            $class: "",
            // 目标类型 1是释放者，2是目标
            targetType: 1,
            // 生效几率
            probability: 1,
            // buff开始时间，1是技能计算前，2是技能计算后
            addTime: 1,
            // buff类型， 1增益，2减益
            buffType: 1,

            // buff生存时间
            lifeTime: 0,
            // 事件触发类型，1时间触发 2攻击前（连命中都没开始算-攻击者触发-每技能仅一次） 3攻击时伤害计算前（算完命中以后，扣血前-攻击者触发-群攻会触发多次） 4被攻击时伤害计算前（算完命中以后，扣血前-攻击目标触发） 5被攻击时伤害计算后（扣完血以后-攻击目标触发） 6攻击时伤害计算后（扣完血以后-攻击者触发-群攻会触发多次） 7攻击后（攻击者触发-每技能仅一次） 8叠加层数触发（叠加会重置启动时间，叠到要求层数时才触发效果） 9叠加每层触发（叠加会重置启动时间，每叠一次都多一层效果，超过最大次数不消失）
            eventType: 1,
            // 激发需要的触发次数
            excitationCount: 1,
            // 激发的最大作用次数，到达最大次数会清除该buff，除了类型9
            excitationMaxCount: 1,
            // 时间触发的作用间隔，如果为0表示立即触发1次，以后不再触发。为正数表示延迟该秒数，然后每该秒数增加1次触发计数
            timerInterval: 0,
            // 攻击类事件触发的血量参数的%，0为都触发, 正数表示小于指定的值才触发，负数表示大于指定的值才触发
            attackHP: 0,
            // 攻击类事件的触发冷却时间，冷却期间不增加触发
            attackCD: 0,
            // buff效果，每次激发都会执行一遍效果
            effect: [],
            // 图标
            icon: "",
            // 体型改变 需要配置变大的比例
            bodyType: 0,

            // 开始时间
            startTime: 0,
            // 触发次数
            eventCount: 0,
            // 冷却到期时间
            cdNextTime: 0,
            // 源buff
            src: undefined
        };
        return buff;
    };
    // 创建效果
    mgr.createEffect = function (fun) {//fun = app.yszzFight.effect
        var effect = {
            module: "",
            position: undefined
        };
        if (fun)
            effect = new fun(effect);
        return effect;
    };
    // 创建效果
    mgr.createOtherEffect = function (key, id, isOnce, fun) {//fun = app.yszzFight.otherEffect
        var effect = {
            effect: key,
            id: id,
            isOnce: isOnce || true
        };
        if (fun)
            effect = new fun(effect);
        return effect;
    };

    // 创建图片
    mgr.createMesh = function (fun) {//fun = app.yszzFight.mesh
        var mesh = {
            x: 0,
            y: 0,
            z: 0
        };
        if (fun)
            mesh = new fun(mesh);
        return mesh;
    };
    // 初始化战斗者的属性和技能
    mgr.initFighter = function (fun, db) {
        var fighter = mgr.createFighter(fun);
        for (var k in db) {
            fighter[k] = mgr.copy(db[k]);
        }
        return fighter;
    };
    // 创建战斗场景, 可以传入场景大小
    mgr.createScene = function (width, height, seed, name, fun, handScene,sceneData) {//fun = app.yszzFight.scene
        var scene = {
            // 每帧数的时间
            frameTime: 50,
            // 默认的狂暴模式的时间
            fastOverTime: 1000 * 60,
            // 场景大小
            width: width,
            height: height,
            // 随机种子
            seed: seed,
            // 默认移动速度，单位是米
            speed: 0.225,
            // 伙伴到主角的距离
            nearDist: 8,
            // 默认的公共CD配置
            publicCD: 1000,
            // 战斗者
            fighters: [],
            //其他模型
            otherMesh:[],
            // 己方人员
            own: [0, 0, 0, 0, 0],
            // 当前时间
            now: 0,
            // 单场战斗时间
            singleNow: 0,
            // 是否自动战斗
            autoFight: true,
            // 启动时间
            startTime: 0,
            // 战斗事件监听器
            listener: undefined,
            // 战斗事件列表
            listenEvent: [],
            // 战斗结束回调
            overCallback: undefined,
            // 战斗记录（手动释放技能时，被击时间记录）
            fightRecord: [],
            timerRef: undefined,
            isEndFight: 0,
            //警戒距离
            cordonDistanse: 2,
            //到达npc时的回调
            toNpcCallBack: undefined,
            //重合距离
            coincideDistanse: .8,
            //唯一id列表
            mapList: {},
            //ID
            mapCount: 1,
            //是否暂停
            pause: false,
            //战斗限时
            limitTime: Infinity,
            //场景名字 app.mod.scene.name,
            sceneName: "",
            //是否跳过战斗
            isSkipFight: false,
            // 队伍信息  默认0：[] 包含所有怪物  默认1包含玩家和伙伴
            group: {},
            //非同屏战斗 控制阵营目标
            campTarget : undefined,
            //是否为手动战斗场景
            handScene: handScene || false
        };
        
        if (fun)
            scene = new fun(scene);
        if(sceneData){
            scene.navMesh = new navMesh_1.NavMesh();
            //加载场景寻路配置   
            scene.navMesh.load(sceneData);
        }
        scene.setNavMesh = function(navMesh){
            scene.navMesh = navMesh;
        };
        scene.setPause = function (bool) {
            if (scene.pause == bool) return;
            scene.pause = bool;
            if (bool) scene.timerRef && clearTimeout(scene.timerRef);
            else scene.run();
        };

        // 插入战斗者
        scene.insert = function (fighter, index) {
            if (fighter.A)
                fight_formula_1.Fight_formula.count(fighter);
            if (fighter.hp === 0)
                fighter.hp = fighter.max_hpCount;
            fighter.show_hp = fighter.hp;
            //主城更新角色模型
            if (index || index == 0) {
                scene.fighters[index] = fighter;
            } else {
                scene.fighters.push(fighter);
            }

            //添加标志位，放入map列表中
            fighter.mapId = scene.mapCount;
            scene.mapList[scene.mapCount] = fighter;
            scene.mapCount++;

            //group
            if (!scene.group[fighter.groupId]) scene.group[fighter.groupId] = [];

            scene.group[fighter.groupId].push(fighter.mapId);

            // 计算技能的伤害
            for (var i = 0, len = fighter.skill.length; i < len; i++) {
                var s = fighter.skill[i];
                s.damage = mgr.getEffectValue(s.damage, fighter, s);
                s.damagePer = mgr.getEffectValue(s.damagePer, fighter, s);
                s.cdNextTime = s.initialCDTime + scene.now;
                
            }

            // 释放被动技能
            scene.autoSpread(fighter, 3);
            // 记录己方人员
            if (!scene.handScene && scene.own && fighter.camp === 1) {
                scene.own[0] = fighter;
            }
            scene.listener && scene.listenEvent.push({ type: "insert", fighter:fighter});
        };

        // 插入  
        scene.insertOther = function (mesh, parent) {
            scene.otherMesh.push(mesh);
            scene.listener && scene.listenEvent.push({ type: "create", mesh: scene.otherMesh[scene.otherMesh.length-1], "parent": parent });
        };

        //销毁场景
        scene.destroyScene = function (clearTO, cuurUi, fightSkill) {
            mgr.count -= 1;
            if (fightSkill) fightSkill();
            if (clearTO) clearTO();
            if (cuurUi) cuurUi();
            scene.setPause(true);
            scene.mapList = {};
            scene.otherMesh = [],
            scene.fighters = [];
            scene.own = [0, 0, 0, 0, 0];
            scene.listenEvent = [];
            scene.mapCount = 0;
            scene.group = {};
            scene.navMesh = undefined;
            //scene = null; 
        };
        // 移除战斗者
        scene.remove = function () {
            for (var i = 0; i < scene.fighters.length; i++) {
                var f = scene.fighters[i], mapId = f.mapId;
                if (f.remove) {
                    var group = scene.group[f.groupId];
                    group.splice(group.indexOf(mapId), 1);
                    scene.fighters.splice(i, 1);
                    delete scene.mapList[mapId];
                    i--;
                    scene.listener && scene.listenEvent.push({ type: "remove", mapId: mapId });
                }
            }
        }
      
        // 战斗循环
        scene.loop = function () {
            if (forefun_1.forefun && forefun_1.forefun.sceneTime) {
                forefun_1.forefun.sceneTime(scene);
            } else scene.now += scene.frameTime;
            if (scene.handScene) scene.remove();
            else scene.clearMapList();
            scene.calc();
            if (scene.listener) {
                var flag = scene.listener({ now: scene.now, events: scene.listenEvent });
                if (flag)
                    scene.listenEvent = [];
            }
            forefun_1.forefun && forefun_1.forefun.check && forefun_1.forefun.check(scene);
        };

        scene.clearMapList = function () {
            for (var i in scene.mapList) {
                var c = scene.mapList[i];
                if (c.hp <= 0 && c.type == "monster") {
                    delete scene.mapList[c.mapId];
                }
            }
        }

        // 战斗循环
        scene.run = function () {
            if (scene.pause) return;
            scene.loop();
            var d = scene.startTime + scene.now - (new Date()).getTime();
            if (scene.isSkipFight) {
                scene.run();
            } else {
                var t = d > 0 ? d : scene.frameTime - 16;
                scene.timerRef = setTimeout(scene.run, t);
            }
        };
        // 战斗开始
        scene.start = function () {
            scene.startTime = (new Date()).getTime();
            scene.timerRef = setTimeout(scene.run, 10);
            if (scene.listener) {
                scene.listener({ now: scene.now, events: scene.listenEvent });
                scene.listenEvent = [];
            }
            // console.log("scene.start:", scene.startTime);
        };
        // 战斗结束
        scene.stop = function () {
            scene.timerRef && clearTimeout(scene.timerRef);
            scene.overCallback && scene.overCallback(-1, scene);
        };
        // 战斗计算
        scene.calc = function () {
            for (var i = 0, len = scene.fighters.length; i < len; i++) {
                var f = scene.fighters[i];
                scene.fighterCalc(f);
            }
        };
        // 战斗者计算
        scene.fighterCalc = function (f) {
            if(f.status === 1000 || (f.autoDelay>scene.now && !f.handMove))
                return;
            var curTarget = scene.mapList[f.curTarget];
            if (f.hp <= 0 && f.max_hpCount > 0) {
                // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
                return;
            }
            //如果是眩晕状态，不能释放技能,不能移动
            if (f.stun) {
                return;
            }
            // 己方的手动移动
            if (f.handMove) {
                f.curSkill = undefined;
                scene.calcPath(f, f.handMove, f.handMove.near || 0);
                if (scene.fighterMove(f, f.handMove.x, f.handMove.y, f.handMove.near || 0)) {// f.loc === 1 ? 0 : scene.nearDist
                    //点击移动，延迟1s进入战斗状态
                    if(scene.handScene)f.autoDelay = scene.now + 1500;
                    f.handMove = undefined;
                    forefun_1.forefun && forefun_1.forefun.toNpcCallBack && forefun_1.forefun.toNpcCallBack(scene, f);
                }
                return;
            }

            if (f.passive === true) return;

            //释放光环技能        
            scene.autoSpread(f, 4);
            //检查buff是否该清除
            scene.buffTimerCalc(f);

            //每帧都判断是否有正在释放的技能，如果有，释放一次，
            //下次释放时间改为现在时间加上引导间隔，如果引导次数小于等于0，清除正在释放的技能和目标，下一帧将不再释放该技能
            if(f.godSkill){
                scene.releaseSkill(f,"god");
            }
            if (f.spreadSkill) {
                scene.releaseSkill(f,"spread");
                return;
            }
            if (!f.curSkill) {
                // 选取优先级最高的可用技能
                for (var i = 0, len = f.skill.length; i < len; i++) {
                    var s = f.skill[i];
                    // 非手动技能，则选择参与筛选
                    if (!s.hand)
                        scene.selectSkill(f, s);
                }
                //点击战斗默认技能为主角普攻
                // if (f.status === 1 && f.skill[0].cdNextTime < scene.now) f.curSkill = f.skill[0];
            }
            if (!f.curSkill && f.status !== 1){
                return;
            } 

            //释放加血技能后矫正攻击目标(同屏战斗中)
            if (f.status === 1 && f.curTarget == f.mapId && f.curSkill && f.curSkill.targetType > 10){
                f.curTarget = undefined;
                f.curTarget = scene.selectTarget(f, f.curSkill, true);
            }

            if (f.status !== 1 && (!curTarget || curTarget.hp <= 0)) {
                f.curTarget = scene.selectTarget(f, f.curSkill);//根据技能选择当前目标
            }

            curTarget = scene.mapList[f.curTarget];
            
            //避免战斗时怪物头像变为己方
            // if(f.curTarget && scene.mapList[f.curTarget] && scene.mapList[f.curTarget].camp != 1)f.curHeadTarget = f.curTarget;
            // if (!curTarget) f.curHeadTarget = undefined;
            if (curTarget && curTarget.hp > 0) {
                
                var flag,s = f.curSkill,dis = s?s.distance:f.skill[0].distance;
                // if (scene.handScene) {
                    flag = scene.calcPath(f, curTarget, dis) || scene.fighterMove(f, curTarget.x, curTarget.y, dis);
                // } else {
                //     flag = scene.pathFinding(f);
                // }
                if (s && (dis === 0 || flag)) {
                    scene.useSkill(f, s, curTarget);
                }
            }
            
        };
        /**
         * @description 技能释放
         * @param { Fighter } f 
         * @param { String } type "spread"普通释放技能 || "god"神兵类释放技能，不影响人物其它技能、动作
         */
        scene.releaseSkill = function(f,type){
            var s = type+"Skill",
                nextTime = type+"NextTime",
                targets = type+"Targets";
            if (f[nextTime] > scene.now)
                    return;
            f[s].delaySpreadSkillTime =  scene.now;
            scene.spreadSkill(f, mgr.mapFighter(f[targets], scene), f[s]);
            //连招技能
            if(f[s].backSkill){
                var bs = f[s].backSkill.slice(0) || [],
                    skill = mgr.getFighterSkill(f,bs.shift());
                if(skill){
                    skill.backSkill = bs;
                    f[nextTime] = scene.now + f[s].actionTime;
                    f[s] = skill;
                    return;
                }
            }
            f[nextTime] = scene.now;
            f[s] = f[targets] = undefined;
            return;
        };
        // 手动释放技能
        scene.handSkill = function (mapId, s) {
            var f = scene.mapList[mapId], flag;;
            if (!f) return;
            var curTarget = scene.mapList[f.curTarget],
                curSkill;
            if (f.hp <= 0 && f.max_hpCount > 0) {
                // 死亡不计算，不受攻击的战斗者（如神器）的最大血量为0
                return;
            }

            if (f.stun) {
                return;
            }
            // 己方的手动移动
            if (f.handMove) {
                f.curSkill = undefined;
                scene.calcPath(f, f.handMove, 0);
                if (scene.fighterMove(f, f.handMove.x, f.handMove.y, 0)) {
                    f.handMove = undefined;
                }
                if(!s.hand)
                    return;
            }

            if(s.hand !== 2){
                f.curSkill = undefined;
                scene.selectSkill(f, s, true);//判断改技能的cd时间，公共cd时间和能量等条件，满足条件即可选择该技能和技能锁定目标
                if (!f.curSkill)
                    return;
                curSkill = f.curSkill;
            }else{
                curSkill = s;
            }
            
            if ((!curTarget || curTarget.hp < 0)) {
                var c = scene.selectTarget(f, curSkill, true);
                if(s.hand !== 2)
                    f.curTarget = c;
                curTarget = scene.mapList[c];
                // if(f.curTarget && scene.mapList[f.curTarget] && scene.mapList[f.curTarget].camp != 1)f.curHeadTarget = f.curTarget;
            }

            //重新定位目标 应该 重新赋值
            // if(s.hand !== 2)curTarget = scene.mapList[f.curTarget];
            
            if (curTarget && curTarget.hp > 0) {
                if(curSkill.hand == 2){
                    flag = scene.useSkillNow(f,curSkill);
                    // delete f.curSkill;
                    return flag;
                }
                // if (scene.handScene) {
                //     scene.calcPath(f, curTarget, curSkill.distance);
                //     flag = scene.fighterMove(f, curTarget.x, curTarget.y, curSkill.distance);
                // } else {
                    flag = scene.pathFinding(f);
                // }
                if (curSkill.distance === 0 || flag) {
                    scene.useSkill(f, curSkill, curTarget);
                }
            }else
                delete f.curSkill;
        };
        scene.calcPath = function(f,t,near){
            if(Math.sqrt((f.x - t.x) * (f.x - t.x) + (f.y - t.y) * (f.y - t.y))<=near){
                return true;
            }
            //检查寻路坐标是否需要重新规划
            if(!f.moveend || (t.mapId != f.moveend.tid || !t.moving && (t.x != f.moveend.x || t.y != f.moveend.y))){
                f.moveend = {x:t.x,y:t.y,tid:t.mapId};
                f.path = getMovePath(scene.navMesh,f,{x:t.x,y:t.y},1.5);
                if(f.path && f.path.length>1){
                    f.path.shift();
                    // if(!f.moveto || (f.moveto.x !== f.path[0].x || f.moveto.z !== f.path[0].z)){
                        f.moveto = f.path[0];
                        f.moveto.near = near;
                        scene.listener && scene.listenEvent.push({ type: "moveto", fighter:f,tid:t.mapId||-1});
                    // }
                }
            }
        };
        // 战斗者移动, moving 0为停止 1为继续 2为开始
        scene.fighterMove = function (f, x, y, near) {
            if(f.actionTime && scene.now < f.actionTime){
                // return;
            }
            f.actionTime = 0;
            if(!f.path || f.path.length < 1)
                return true;
            //到达目标点检测，是否是最终点
            var checkLastPos = function(){
                if(f.path && f.path.length > 1){
                    f.path.shift();
                    f.moveto = f.path[0];
                    f.moveto.near = near;
                    return false;
                }
                clear();
                return true;
            };
            var clear = function(){
                delete f.path;
                delete f.moveend;
                f.moving = false;
            };
            //重置目标点
            var restTargetPos = function(){
                x = f.moveto.x;
                y = f.moveto.z;
                dist = Math.sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y));
            };
            var checkNear = function(){
                if (dist <= near) {
                    r = checkLastPos();
                    if(r)
                        return r;
                }
            };
            var dist = Math.sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y)), speed = f.speed,r;
            //靠近目标范围
            if(dist <= near){
                clear();
                return true;
            }
            else 
                restTargetPos();
            //距离目标点不足一步
            dist = speed / dist;
            if (dist >= 1) {
                f.x = x;
                f.y = y;
                return checkLastPos();
            }
            //按每步距离拆分
            f.x += (x - f.x) * dist;
            f.y += (y - f.y) * dist;
            restTargetPos();
            //移动之后再次检查是否靠近目标范围
            //修正目标移动中检查靠近目标失误
            if(checkNear()){
                f.moving = false;
                return true;
            }
            f.moving = true;
            return false;
        };
        //除了鼠标指定的位置，
        //趋近的寻路算法
        scene.pathFinding = function (fighter) {
            var target = scene.mapList[fighter.curTarget],
                tmpLoc = fighter.tmpLoc;
            if (!target) return false;
            //检查是否已经计算过临时坐标
            if (tmpLoc) {
                //目标静止
                if (!target.moving) {
                    if (nearCheck(fighter, tmpLoc)) {
                        if (fixTmpLoc(fighter, target, scene.fighters, tmpLoc, scene.coincideDistanse)) {
                            fighter.tmpLoc = undefined;
                        }
                    } else{
                        scene.calcPath(fighter, fighter.tmpLoc, 0);
                        if(scene.fighterMove(fighter, fighter.tmpLoc.x, fighter.tmpLoc.y, 0))
                            fighter.tmpLoc = undefined;
                        
                    }
                //目标移动，则继续修正
                } else if(fixTmpLoc(fighter, target, scene.fighters, tmpLoc, scene.coincideDistanse)) {
                    fighter.tmpLoc = undefined;
                }
            } else {
                //检查非主角是否进入警戒区域,是则开始修正自己位置f,loc != camp. == 1
                if (!(forefun_1.forefun && forefun_1.forefun.getPlayerId() == fighter.sid) && (fighter.camp != 1 || isLoc(fighter)) && nearCheck(fighter, target, fighter.curSkill.distance + scene.cordonDistanse)) {
                    tmpLoc = { life: 3 };
                    calcTmpLoc(fighter, target, tmpLoc, fighter.curSkill.distance);
                    fixTmpLoc(fighter, target, scene.fighters, tmpLoc, scene.coincideDistanse);
                    fighter.tmpLoc = tmpLoc;
                    scene.calcPath(fighter, fighter.tmpLoc, 0);
                    //向临时坐标靠拢
                    scene.fighterMove(fighter, fighter.tmpLoc.x, fighter.tmpLoc.y, 0);
                } else {
                    scene.calcPath(fighter, target, fighter.curSkill.distance);
                    //向目标靠拢
                    scene.fighterMove(fighter, target.x, target.y, fighter.curSkill.distance);
                }
            }
            if (!fighter.moving && nearCheck(fighter, target, fighter.curSkill.distance)) {
                return true;
            }else return false;
        };
        //判断是否是摄像机正对的人
        var isLoc = function (fighter) {
            for (var i = 0; i < scene.own.length; i++) {
                if (fighter.loc != scene.own[i].loc) {
                    return true;
                }
            }
            return false;
        }
        // 战斗自动释放技能，没有全局冷却。可以是战斗开始的被动技能，也可以是定时释放的光环技能
        scene.autoSpread = function (fighter, castType) {
            for (var i = 0, len = fighter.skill.length; i < len; i++) {
                var s = fighter.skill[i];
                if (s.castType !== castType || (s.cdTime > 0 && s.cdNextTime > scene.now))
                    continue;
                s.cdNextTime = scene.now + s.cdTime;
                scene.spreadSkill(fighter, scene.skillTarget(fighter, s), s);
            }

        };
        // 战斗buff定时事件计算
        scene.buffTimerCalc = function (f) {
            mgr.traversal(f.buff, function (b) {
                var c1, c2;
                if (b.timerInterval > 0) {
                    c1 = ((scene.now - b.startTime) / b.timerInterval) | 0;
                    c2 = ((scene.now + scene.frameTime - b.startTime) / b.timerInterval) | 0;
                    // 是否跨作用间隔
                    if (c2 - c1) {
                        scene.excitationBuff(f, f, b);
                    }
                }
                if (b.startTime + b.lifeTime > scene.now)
                    return;
                scene.clearBuff(f, b);
                return true;
            });
        };
        // 激发buff效果
        scene.excitationBuff = function (f, t, b, ev) {
            var arr = b.effect, r, v, per;
            if (b.attackCD){
                b.cdNextTime = scene.now + b.attackCD;
            }
            if (t.god && b.buffType === 2)
                return;
            // debugger;
            for (var i = 0, len = b.effect.length; i < len; i++) {
                var e = b.effect[i];
                r = mgr.getBuffEffectValue(e.value, b.F, b.T, b, scene);
                v = r;
                if (e.type === "phyShield") {
                    t.phyShield.length++;
                    t.phyShield[b.id] = r;
                    e.addValue = b.id;
                } else if (e.type === "magicShield") {
                    t.magicShield.length++;
                    t.magicShield[b.id] = r;
                    e.addValue = b.id;
                } else if (e.type === "shield") {
                    t.shield.length++;
                    t.shield[b.id] = r;
                    e.addValue = b.id;
                } else if (e.type === "skill") {
                    // TODO
                } else if (e.type === "repel") {
                    // TODO
                } else if (e.type === "hp") {
                    r = t.max_hpCount > t.hp + r ? r : t.max_hpCount - t.hp;
                    t[e.type] += r;
                } else if (e.type === "energy") {
                    r = t.max_energyCount > t.energy + r ? r : t.max_energyCount - t.energy;
                    t[e.type] += r;
                } else if (e.type === "max_hpCount") {
                    e.addValue += r;
                    per = r / t[e.type];
                    t["hp"] = t["hp"] * (1 + per);
                    t[e.type] += r;
                } else if (e.type === "per_attackCount") {
                    e.addValue += r;
                    t["attackCount"] = t["attackCount"] * (1 + r);
                    t[e.type] += r;
                } else if (e.type === "per_defenceCount") {
                    e.addValue += r;
                    t["defenceCount"] = t["defenceCount"] * (1 + r);
                    t[e.type] += r;
                } else if (e.type === "per_max_hpCount") {
                    e.addValue += r;
                    t["max_hpCount"] = t["max_hpCount"] * (1 + r);
                    t["hp"] = t["hp"] * (1 + r);
                    t[e.type] += r;
                } else if (e.type === "per_un_defenceCount") {
                    e.addValue += r;
                    t["un_defenceCount"] = t["un_defenceCount"] * (1 + r);
                    t[e.type] += r;
                } else {
                    e.addValue += r;
                    t[e.type] += r;
                }

                scene.listener && scene.listenEvent.push({
                    type: "effect",
                    fighter: f,
                    target: t,
                    proto: scene.mapList[b.F].sid,
                    effect: e.type,
                    value: r
                });
            }
        };
        // 清除buff
        scene.clearBuff = function (f, b) {
            var arr = b.effect, per;
            for (var i = 0, len = b.effect.length; i < len; i++) {
                var e = b.effect[i];
                if (!e.addValue)
                    continue;
                if (e.type === "phyShield") {
                    mgr.removeOArray(f.phyShield, e.addValue);
                } else if (e.type === "magicShield") {
                    mgr.removeOArray(f.magicShield, e.addValue);
                } else if (e.type === "shield") {
                    mgr.removeOArray(f.shield, e.addValue);
                } else if (e.type === "max_hpCount") {
                    per = e.addValue / (f[e.type] - e.addValue);
                    f["hp"] = f["hp"] / (1 + per);
                    f[e.type] -= e.addValue;
                } else if (e.type === "per_attackCount") {
                    f["attackCount"] = f["attackCount"] / (1 + e.addValue);
                    f[e.type] -= e.addValue;
                } else if (e.type === "per_defenceCount") {
                    f["defenceCount"] = f["defenceCount"] / (1 + e.addValue);
                    f[e.type] -= e.addValue;
                } else if (e.type === "per_max_hpCount") {
                    f["max_hpCount"] = f["max_hpCount"] / (1 + e.addValue);
                    f["hp"] = f["hp"] / (1 + e.addValue);
                    f[e.type] -= e.addValue;
                } else if (e.type === "per_un_defenceCount") {
                    f["un_defenceCount"] = f["un_defenceCount"] / (1 + e.addValue);
                    f[e.type] -= e.addValue;
                } else {
                    f[e.type] -= e.addValue;
                }
            }
            scene.listener && scene.listenEvent.push({ type: "clearBuff", fighter: f, buff: b });
        };

        /*释放技能
         * @param f-释放者，t-释放目标，s-释放技能*/
        scene.spreadSkill = function (f, t, s) {
            var probability, i, arg, r,
                cur = scene.mapList[f.curTarget]?f.curTarget:scene.selectTarget(f, s, true),
                curTarget = scene.mapList[cur],
                ts = curTarget?[curTarget]:[];
            f.curTarget = cur;
            // 根据技能的作用范围和目标类型，修正目标数组
            //圆形范围
            if (s.isRangeSkill === 1)
                t = scene.rangeTargets(ts, s.targetType, s.range, f.camp);
            //矩形范围
            else if(s.isRangeSkill === 2 && curTarget){
                t = scene.polygonTargets(ts, s.targetType , s.range, f.camp, f);
            }
            //继承目标
            t = scene.inheritTargets(f,t,s);
            //mgr.getMapId(targets, scene);//释放目标
            scene.listener && scene.listenEvent.push({ type: "spreadSkill", fighter: f, target: t, skill: s,time: scene.now  });
            scene.addSkillBuff(f, t, s, 1);
            //增加技能携带的被动buff addTime 3
            scene.addSkillBuff(f, t, s, 3);
            // 攻击前触发相应buff
            for (var i = 0; i < t.length; i++) {
                scene.fireBuff(f, t[i], 2);
            }
            for (var k = 0, len = t.length; k < len; k++) {
                i = t[k];
                arg = fight_formula_1.Fight_formula.getArgArr(f, i, s, true);
                //console.log("spreadSkill:", f.id);
                if (s.damageType === 1) {
                    probability = (s.skillType === 1) ? fight_formula_1.Fight_formula.skillCalc("hitFormula", arg) : 1;
                    if (scene.checkProbability(probability)) {
                        r = scene.calcAction(f, i, s, arg, scene.calcDamage);
                        //目标承受伤害记录到列表中
                        if (i.damageList[f.sid]) i.damageList[f.sid] += r.damage;
                        else i.damageList[f.sid] = r.damage;

                        //把人物造成的伤害累加绑在自己身上 参与buff吸血计算
                        if (f.damage !== undefined) f.damage += r.damage;
                        else f.damage = r.damage;
                    } else {
                        r = { dodge: true };
                    }
                    scene.listener && scene.listenEvent.push({
                        type: "damage",
                        fighter: f,
                        curTarget : curTarget,
                        target: i,
                        r: r,
                        skill: s,
                        time: s.bloodDelayTime + s.delaySpreadSkillTime
                    });
                    if(i.passive)
                        i.passive = false;
                } else if (s.damageType === 2) {
                    r = scene.calcAction(f, i, s, arg, scene.calcHealth);
                    scene.listener && scene.listenEvent.push({
                        type: "damage",
                        fighter: f,
                        curTarget : curTarget,
                        target: i,
                        r: r,
                        skill: s,
                        time: s.bloodDelayTime + s.delaySpreadSkillTime
                    });
                }
            }
            scene.addSkillBuff(f, t, s, 2);
            // 攻击后触发相应buff
            for (var i = 0; i < t.length; i++) {
                scene.fireBuff(f, t[i], 7);
            }
            scene.clearTempBuff(f);
            for (var k = 0, len = t.length; k < len; k++) {
                i = t[k];
                scene.clearTempBuff(i);
            }
            //单次伤害计算清空
            f.damage = 0;
        };
        //合并fighter列表
        scene.mergeFighters = function(a,b){
            var arr = a.concat(b),i,n = arr.length-1,m = {};
            for(i = n;i>=0;i--){
                if(arr[i].hp<0 && !m[arr[i].mapId]){
                    arr[i] = arr[n--];
                }
                m[arr[i].mapId] = 1;
            }
            arr.length = n + 1;
            return arr;
        };
        //目标继承
        scene.inheritTargets = function(f,t,s){
            var type = s.hand == 2?"godPrevTargets":"prevTargets";
            if(s.FollowTarget && f[type]){
                t = scene.mergeFighters(t,mgr.mapFighter(f[type]));
            }
            if(s.backSkill){
                f[type] = mgr.getMapId(t,scene);
            }else{
                f[type] = null;
            }
            return t;
        }
        // 根据技能的作用范围，扩大选择目标
        scene.rangeTargets = function (targets, targetType, distance, camp) {
            var arr, n, i, j, e, f, dd = distance * distance, len = targets.length - 1, camp = targetType > 10 ? mgr.enemy(camp) : camp, dist;
            arr = mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
            n = arr.length - 1;
            for (i = n; i >= 0; i--) {
                e = arr[i];
                for (j = len; j >= 0; j--) {
                    f = targets[j];
                    if (e === targets[j])
                        break;
                    dist = (f.x - e.x) * (f.x - e.x) + (f.y - e.y) * (f.y - e.y);
                    if (dist < dd)
                        break;
                }
                if (j < 0)
                    arr[i] = arr[n--];
            }
            arr.length = n + 1;
            return arr;
        };
        //矩形技能范围
        scene.polygonTargets = function(targets,targetType, rang,camp, f){
            var _x = rang[0]/2,_y = rang[1]/2,rp = [[-_x,_y],[_x,_y],[_x,-_y],[-_x,-_y]],
                _newRp = polygonTransform(rp,f,scene.mapList[f.curTarget],_y),
                len = targets.length - 1,
                i, j, e,
                arr,
                n;
                camp = targetType > 10 ? mgr.enemy(camp) : camp;
                arr = mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
                n = arr.length - 1;
            for (i = n; i >= 0; i--) {
                e = arr[i];
                for (j = len; j >= 0; j--) {
                    if (e === targets[j])
                        break;
                    if (!mgr.isOutPolygon(e,_newRp))
                        break;
                }
                if (j < 0)
                    arr[i] = arr[n--];
            }
            arr.length = n + 1;
            return arr;
        };
        // 根据添加时间（addTime--1：攻击前，2：攻击后），添加fighter, targets的buff（targetType--1：目标类型为目标，2：目标类型为自己）
        scene.addSkillBuff = function (fighter, targets, skill, addTime) {
            var b, t;
            for (var i = 0, leng = skill.buff.length; i < leng; i++) {
                b = skill.buff[i];
                if ((!b) || b.addTime !== addTime)
                    continue;
                //给自己加
                if (b.targetType === 2) {
                    scene.addBuff(fighter, fighter, skill, b);
                    continue;
                    //给目标加
                } else if (b.targetType === 1) {
                    for (var k = 0, len = targets.length; k < len; k++) {
                        t = targets[k];
                        scene.addBuff(fighter, t, skill, b);
                    }
                } else if (b.targetType === 3) {
                    //给全体队员加
                    var groups = mgr.mapFighter(scene.group[fighter.groupId], scene);
                    t = mgr.select(groups, [['camp', fighter.camp], ['hp', '>', 0]]);

                    for (var k = 0, len = t.length; k < len; k++) {
                        scene.addBuff(fighter, t[k], skill, b);
                    }
                } else if (b.targetType === 4) {
                    //给血最少的一个队员加
                    var groups = mgr.mapFighter(scene.group[fighter.groupId], scene);
                    t = mgr.select(groups, [['camp', fighter.camp], ['hp', '>', 0]]);
                    mgr.limit(t, 1, 'hp', false);
                    if(t && t.length>0)scene.addBuff(fighter, t[0], skill, b);
                }
            }
        };
        // 检查概率是否通过
        scene.checkProbability = function (probability) {
            if (probability < 1) {
                var r = scene.seed;
                scene.seed = randNumber(r);
                if (probability < r / 2147483647)
                    return false;
            }
            return true;
        };
        // 添加buff
        scene.addBuff = function (fighter, target, skill, buff) {
            var i = -1;
            var same = 0;
            skill = skill || {};
            if (!scene.checkProbability(buff.probability))//检查生效概率
                return;
            if (target.god && buff.buffType === 2)//bufftype---1:增益，2：减益 （如果目标无敌，减益不生效）
                return;
            //eventType为8、9时为叠加类buff，8：叠到要求层数时才触发效果，中途没效果，9：每叠一次都多一层效果

            //增加了一个 buff等级  取决于技能等级
            if (!buff.level) buff.level = skill.level || 1;
            if (!buff.star) buff.star = skill.star || 0;

            if (buff.eventType === 8 || buff.eventType === 9) {
                // 叠加计算，寻找是否有相同的buff
                i = mgr.indexByAttr(target.buff, "id", buff.id);
                if (i >= 0) {
                    buff = target.buff[i];
                    //增加释放buff技能的释放者 以及 目标
                    buff.T = target.mapId;
                    buff.F = fighter.mapId;
                    buff.eventCount++;
                }
            }
            if (i < 0) {
                buff = mgr.copy(buff);
                //增加释放buff技能的释放者 以及 目标
                buff.T = target.mapId;
                buff.F = fighter.mapId;
                //如果再次触发相同buff 应该覆盖旧buff
                var _i = mgr.indexByAttr(target.buff, "id", buff.id);
                if (_i < 0) {
                    target.buff.push(buff);
                } else {
                    target.buff[_i].startTime = scene.now;
                    return false
                }
                scene.listener && scene.listenEvent.push({
                    type: "addBuff",
                    fighter: fighter,
                    target: target,
                    skill: skill,
                    buff: buff
                });
            }
            buff.startTime = scene.now;//buff添加时间
            if (buff.eventType === 1 && buff.timerInterval >= 0) {
                // 立即执行的时间触发的buff
                scene.excitationBuff(fighter, target, buff);
            } else if ((buff.eventType === 8 || buff.eventType === 9) && buff.eventCount <= buff.excitationCount * buff.excitationMaxCount && buff.eventCount % buff.excitationCount === 0) {
                // 立即执行的叠加触发的buff
                scene.excitationBuff(fighter, target, buff);
            }
        };
        // 在fighter上触发buff
        scene.fireBuff = function (fighter, target, eventType, ev) {
            var b;
            for (var i = 0, len = fighter.buff.length; i < len; i++) {
                b = fighter.buff[i];
                if ((!b) || b.eventType !== eventType)
                    continue;
                if (b.cdNextTime > scene.now)
                    continue;
                if (b.attackHP > 0 && fighter.max_hpCount * b.attackHP >= fighter.hp)
                    continue;
                if (b.attackHP < 0 && fighter.max_hpCount * -b.attackHP < fighter.hp)
                    continue;
                b.eventCount++;
                if (b.eventCount <= b.excitationCount * b.excitationMaxCount && b.eventCount % b.excitationCount === 0) {
                    // 事件次数到了，触发buff  新增buff目标判断
                    b.triggerTarget == "T" ? scene.excitationBuff(fighter, target, b, ev) : scene.excitationBuff(fighter, fighter, b, ev);
                }
            }
        };
        // 计算技能的动作
        scene.calcAction = function (f, t, s, arg, action) {
            scene.fireBuff(f, t, 3);
            scene.fireBuff(t, f, 4);
            var r = action(f, t, s, arg);
            scene.fireBuff(t, f, 5, r);
            scene.fireBuff(f, t, 6, r);
            return r;
        };
        // 计算技能的伤害
        scene.calcDamage = function (f, t, s, arg) {
            var probability, damage, hp, steal, critical,isPvp = (t.type == "fighter");
            //debugger;
            // 计算防御减免
            fight_formula_1.Fight_formula.skillCalc("defenceReduceFormula", arg);
            // 计算伤害
            damage = fight_formula_1.Fight_formula.skillCalc(isPvp ? "pvp_damageFormula" : "damageFormula", arg) | 0;
            // 计算是否暴击
            probability = fight_formula_1.Fight_formula.skillCalc("criticalFormula", arg);
            if (scene.checkProbability(probability)) {
                critical = true;
                damage = fight_formula_1.Fight_formula.skillCalc(isPvp ? "pvp_criticalDamageFormula" : "criticalDamageFormula", arg) | 0;
            }
            // console.log("damage:"+damage+",seed:"+scene.seed+",id="+f._id);
            // console.log("s.cdNextTime = "+s.cdNextTime+",now = "+scene.now+",f.publicCDNextTime = "+f.publicCDNextTime+",s.id = " +s.id);
            if (s.skillType === 2) {
                // 如果是魔法伤害，要计算抗性和穿透
                fight_formula_1.Fight_formula.skillCalc("magicReduceFormula", arg);
                damage = fight_formula_1.Fight_formula.skillCalc(critical ? "criticalDamageFormula" : "magicDamageFormula", arg) | 0;
                //使用盾
                damage = mgr.useShield(t.magicShield, damage);
                damage = mgr.useShield(t.shield, damage);
            } else if (s.skillType === 1) {
                damage = mgr.useShield(t.phyShield, damage);
                damage = mgr.useShield(t.shield, damage);
                // 如果是物理伤害，要计算吸血
                if (!t.god)
                    steal = fight_formula_1.Fight_formula.skillCalc(critical ? (isPvp ? "pvp_criticalStealHPFormula" : "criticalStealHPFormula") : (isPvp ? "pvp_stealHPFormula" : "stealHPFormula"), arg) | 0;
            }
            hp = t.hp;
            if (t.god) {
                //无敌状态 免疫伤害 将伤害至为0 不抛出伤害效果
                damage = 0;
                scene.listener && scene.listenEvent.push({
                    type: "effect",
                    fighter: f,
                    target: t,
                    effect: "god",
                    value: damage
                });
            } else {
                if (damage) {
                    t.hp -= damage;
                    if (t.hp > t.max_hpCount)
                        t.hp = t.max_hpCount;
                } else {
                    //抛吸收
                    scene.listener && scene.listenEvent.push({
                        type: "effect",
                        fighter: f,
                        target: t,
                        effect: "shield",
                        value: damage
                    });
                }
            }
            hp = t.hp - hp;
            f.hp += steal | 0;
            if (f.hp > f.max_hpCount)
                f.hp = f.max_hpCount;
            return { critical: critical, damage: damage, hp: hp, steal: steal };
        };
        // 计算技能的治疗
        scene.calcHealth = function (f, t, s, arg) {
            var critical;
            // 计算治疗 除掉小数
            var health = fight_formula_1.Fight_formula.skillCalc("healthFormula", arg) | 0;
            // 计算是否暴击
            var probability = fight_formula_1.Fight_formula.skillCalc("healthCritFormula", arg);
            if (scene.checkProbability(probability)) {
                critical = true;
                health = fight_formula_1.Fight_formula.skillCalc("criticalHealthFormula", arg) | 0;
            }
            t.hp += health;
            if (t.hp > t.max_hpCount)
                t.hp = t.max_hpCount;
            return { critical: critical, health: health };
        };
        // 选中技能，能否被选中取决于：冷却，公共冷却，能量，优先级
        scene.selectSkill = function (f, s) {
            var r;
            if(s.priority == 0)
                return
            if (f.actionTime > scene.now ||  s.cdNextTime > scene.now || (f.publicCDNextTime  > scene.now && !s.hand) || s.energyCost > f.energy){
                return;
            }
            if (f.curSkill && f.curSkill.priority >= s.priority)
                return;
            f.curSkill = s;
            //if(!scene.handScene)f.curTarget = scene.selectTarget(f, s);
            if(f.status === 0){
                f.curTarget = scene.selectTarget(f, s);
            }
            // if(f.curTarget && scene.mapList[f.curTarget] && scene.mapList[f.curTarget].camp != 1)f.curHeadTarget = f.curTarget;
        };
        // 技能选择目标
        scene.selectTarget = function (f, s) {
            var r, camp = f.camp, con = f.targetConds || [], round = getMinNumber(f.round,s.targetLength) || Number.MAX_SAFE_INTEGER, t;
            //战斗结束,则返回原目标
            if (scene.check() != 0)
                return f.curTarget;
            // 1自己
            if (s.targetType <= 1)
                return f;
            // 己方或敌方
            if (s.targetType > 10) {
                camp = mgr.enemy(camp);
            }
            //对于主角在手动战斗场景 需要控制技能目标
            // if (scene.handScene && f.status === 1) {
            //     if(isHand && (!f.curTarget || !scene.mapList[f.curTarget] || scene.mapList[f.curTarget].hp < 0)){
            //         r = mgr.mapFighter(mgr.groupFighters(f, scene), scene);
            //     }else{
            //         r = mgr.selectGroup(scene, f, s.targetType);
            //     }
            //     if (!r.length) return undefined;
            // } else {
            //     //非同屏战斗，如果有玩家手动选择的目标 优先返回
            //     if(f.camp == 1 && !scene.handScene && scene.campTarget && scene.mapList[scene.campTarget] && scene.mapList[scene.campTarget].hp > 0){
            //         return scene.campTarget;
            //     }else if(f.camp == 1 && f.status !== 1 && scene.mapList[f.ownTarget] && scene.mapList[f.ownTarget].hp > 0){
            //         return f.ownTarget;
            //     }

                r = mgr.select(scene.fighters, con.concat([['camp', camp], ['hp', '>', 0]]));
            // }
            
            mgr.round(r, f, round, true);
            return scene.getCurTarget(r, f);
        };
        //获取当前主目标，可额外绑定选择条件
        scene.getCurTarget = function(r, f){
            var t;
            for(var i =0,len = r.length;i<len;i++){
                if(r[i].mapId == f.curTarget) return f.curTarget;
            }
            // t = (r.length > 0) ? r[0] : f;
            // return t.mapId;
            return (r.length > 0) ? r[0].mapId:null;
        };
        // 使用技能，将技能转入释放，并加冷却和扣除消耗
        scene.useSkill = function (f, s) {
            var targets = scene.skillTarget(f, s), curTarget;
            if (targets.length === 0)
                return;
            f.curSkill = undefined;
            s.cdNextTime = scene.now + s.cdTime;//下次cd时间
            f.spreadSkill = s;//释放技能
            f.spreadTargets = mgr.getMapId(targets, scene);//释放目标
            //当前目标的唯一id
            //f.curTarget = targets[0].mapId;
            //从列表中取到当前目标
            curTarget = scene.mapList[f.curTarget];
            // if(f.curTarget && scene.mapList[f.curTarget] && scene.mapList[f.curTarget].camp != 1)f.curHeadTarget = f.curTarget;

            f.spreadCount = s.guideCount;//引导次数
            f.spreadNextTime = scene.now;

            f.energy -= s.energyCost;
            s.useSkillTime = scene.now;//使用技能的时间

            f.publicCDNextTime = scene.now + scene.publicCD;//下次公共cd时间
            
            //临时代码
            var at = s.actionTime;
            if(s.combo){
                for(var j = 0, leng = s.backSkill.length;j<leng;j++){
                    at += mgr.getFighterSkill(f,s.backSkill[j]).actionTime;
                }
            }

            f.actionTime = scene.now + at;

            // scene.listener && scene.listenEvent.push({ type: "useSkill", fighter: f, target: targets, skill: s,time: scene.now });
            return true;
        };
        //立即释放技能，释放则计算伤害
        scene.useSkillNow = function(f,s){
            var targets = scene.skillTarget(f, s);
            if(targets.length === 0){
                return false;
            }
            f.godSkill = s;
            f.godTargets = targets;
            f.godNextTime = scene.now;
            return true;
        };
        // 清理临时buff
        scene.clearTempBuff = function (f) {
            mgr.traversal(f.buff, function (b) {
                // 类型9，或有生命周期并没有到达最大激发次数，不清除
                if (b.eventType === 9 || (b.lifeTime > 0 && b.eventCount < b.excitationCount * b.excitationMaxCount))
                    return;
                scene.clearBuff(f, b);
                return true;
            });
        };
        // 技能选择目标
        scene.skillTarget = function (f, s) {
            var r, t = s.targetType, camp = f.camp;
            // 1自己
            if (s.targetType <= 1)
                return [f];
            if (t > 10) {
                t -= 10;
                camp = mgr.enemy(camp);
            }
            // 2全体己方或敌人
            if (t === 2) {
                //对于主角在手动战斗场景 需要控制技能目标
                if (f.status === 1) {
                    return mgr.selectGroup(scene, f, s.targetType);
                }
                return mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
            }
            // 3血最少的x个己方或敌人
            if (t === 3) {
                if (f.status === 1) {
                    r = mgr.selectGroup(scene, f, s.targetType);
                } else {
                    r = mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
                }
                mgr.round(r, f, s.distance > 0 ? s.distance : Number.MAX_SAFE_INTEGER, false);
                //true 从大到小排列 false相反
                mgr.limit(r, s.targetAIParam, 'hp', false);
                return r;
            }
            // 4最近的x个队友或敌人
            if (t === 4) {
                if (f.status === 1) {
                    r = mgr.selectGroup(scene, f, s.targetType);
                } else {
                    r = mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
                }
                if (s.distance > 0) {
                    //最近的应该要排序 
                    mgr.round(r, f, s.distance, true);
                }

                if (r.length > s.targetAIParam)
                    r.length = s.targetAIParam;
                return r;
            }
            // 5技能施放距离内随机的x个己方或敌人（参数为0表示全部）
            if (t === 5) {
                if (f.status === 1) {
                    r = mgr.selectGroup(scene, f, s.targetType);
                } else {
                    r = mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
                }
                if (s.distance > 0) {
                    mgr.round(r, f, s.distance, false);
                }
                if (s.targetAIParam)
                    scene.seed = mgr.limit(r, s.targetAIParam, undefined, scene.seed);
                return r;
            }
            //技能 1 11 对于仇恨最高的敌人释放 如果是怪并且是手动战斗场景，怪的目标应该是当前目标。不再在敌对阵营中筛选
            //手动战斗的fighter 并且是玩家 限制目标为点击的目标
            if (f.status === 1) {
                r = mgr.selectGroup(scene, f, s.targetType);
            } else {
                //自动战斗的fighter 如果是玩家 应从列表取仇恨最高的怪，如果是怪，在手动战斗场景的话 应反击玩家
                if (scene.handScene && f.camp == 2) {
                    return [scene.mapList[f.curTarget]];
                }

                //非同屏战斗，如果有玩家手动选择的目标 优先返回
                // if(f.camp == 1 && !scene.handScene && scene.mapList[scene.campTarget] && scene.mapList[scene.campTarget].hp > 0){
                //     r = [scene.mapList[scene.campTarget]];
                //     mgr.round(r, f, s.distance > 0 ? s.distance : Number.MAX_SAFE_INTEGER, true);
                //     return r;
                // }else if(f.camp == 1 && f.status !== 1 && scene.mapList[f.ownTarget] && scene.mapList[f.ownTarget].hp > 0){
                //     r = [scene.mapList[f.ownTarget]];
                //     mgr.round(r, f, s.distance > 0 ? s.distance : Number.MAX_SAFE_INTEGER, true);
                //     return r;   
                // }

                r = mgr.select(scene.fighters, [['camp', camp], ['hp', '>', 0]]);
            } 
            
            //这里要排序 应该从近到远
            mgr.round(r, f, s.distance > 0 ? s.distance : Number.MAX_SAFE_INTEGER, true);
            //
            mgr.limit(r, 1, 'taunt', true,f.curTarget);
            return r;
        };

        // 战斗检查结果， 返回0表示继续，1表示左边胜利，2表示右边胜利 , 3表示超时
        scene.check = function () {
            //console.log((new Date()).getTime()-scene.singleNow);
            var limitTime = scene.limitTime || Infinity;
            if (scene.singleNow && (scene.now - scene.singleNow) >= limitTime) return 3;
            var left = 0, right = 0;
            for (var i = 0, len = scene.fighters.length; i < len; i++) {
                var f = scene.fighters[i];
                if (f.camp === 1 && f.hp > 0)
                    left++;
                if ((f.camp === 2 && f.hp > 0) || (f.camp === 0 && f.hp > 0))
                    right++;
            }
            if (left > 0 && right > 0)
                return 0;
            return left > 0 ? 1 : 2;
        };
        mgr.count += 1;
        return scene;
    };
    /**
     * @description 获取移动路径
     * @param {NavMesh}nm 寻路实例
     * @param {Vector3}start 起点
     * @param {Vector3}end 起点
     * @param {Number}box 包围盒半径
     */
    var getMovePath = function(nm,start,end,box){
        if(!nm)
            return [{x:start.x,y:0,z:start.y},{x:end.x,y:0,z:end.y}];
        start = new vector3_1.Vector3(start.x,0,start.y);
        end = new vector3_1.Vector3(end.x,0,end.y);
        box = box || 0;
        return nm.findPath(start,end,box);
    };
    //获取两点之间的距离
    var getPPDistance = function (p1, p2) {
        var xx = p1.x - p2.x, yy = p1.y - p2.y;
        var _d1 = (xx * xx + yy * yy)*1000000;
        var _d = Math.sqrt(_d1/1000000);
        return { xx: xx, yy: yy, d: _d };
    };
    //检查是否接近指定坐标点
    //@param fighter 指定对象
    //			  pos 指定坐标
    //			  error 误差
    var nearCheck = function (fighter, pos, error) {
        var error = error || 0,
            d = getPPDistance(fighter, pos);
        return d.d <= error;
    };
    //计算临时坐标
    //@param distance有效距离
    var calcTmpLoc = function (fighter, target, tmpLoc, distance) {
        var d = getPPDistance(fighter, target), xx = d.xx, yy = d.yy, dd = d.d;
        if (dd <= distance) {
            tmpLoc.x = fighter.x;
            tmpLoc.y = fighter.y;
        } else {
            tmpLoc.x = target.x + xx * distance / dd;
            tmpLoc.y = target.y + yy * distance / dd;
        }
    };
    //战斗站位计算
    //@param r 技能释放距离
    //@param coincideDistanse 人物重合距离
    //@ r > coincideDistanse
    var getRandomLoc = function (fighter, target, r, coincideDistanse) {
        // var rr = getPPDistance(fighter, target), r1,
        //     _pos, d1, d2;
        // //判断当前位置是否在r和coincideDistanse
        // r1 = (rr.d >= coincideDistanse && rr.d <= r) ? rr.d : r;
        // //判断当前获取的范围r1是否小于coincideDistanse，是则取coincideDistanse
        // r1 = r1 < coincideDistanse ? coincideDistanse : r1;
        // var fx = rr.xx ,
        //     fy = rr.yy;
        // var angle = Math.atan(fy/fx)*180/Math.PI;
        // var otangle = 90-angle;
        // return { x: fx, y: fy };

        var rr = getPPDistance(fighter, target), r1,
            _pos, d1, d2;
        //判断当前位置是否在r和coincideDistanse
        r1 = (rr.d >= coincideDistanse && rr.d <= r) ? rr.d : r;
        //判断当前获取的范围r1是否小于coincideDistanse，是则取coincideDistanse
        r1 = r1 < coincideDistanse ? coincideDistanse : r1;
        //随机获取在r1半径上离自己最近的坐标点
        _pos = randomOnCircle(target, r1);
        d1 = getPPDistance(fighter, { x: _pos[0], y: _pos[1] });
        d2 = getPPDistance(fighter, { x: _pos[2], y: _pos[3] });
        if (d1.d < d2.d) {
            return { x: _pos[0], y: _pos[1] };
        } else {
            return { x: _pos[2], y: _pos[3] };
        }

    };

    var randomAllRang = function () {
        var _base = Math.random() + "", _num = Math.ceil(Math.random() * 5);
        _base = _base.replace(".", "").split("");
        _base.splice(_num, 0, ".");
        return _base.join("") - 0;
    };

    var randomOnCircle = function (p, r, rang) {
        var mark = function () {
            return Math.random() > .5 ? -1 : 1
        },
            k = randomAllRang() * mark(),
            x = Math.sqrt(r * r / (k * k + 1)) * mark(),
            y = k * x;
        if (rang) {
            if (Math.abs(x) > (rang.width / 2)) {
                x = x > 0 ? rang.width / 2 : -rang.width / 2;
            }
            if (Math.abs(y) > (rang.height / 2)) {
                y = y > 0 ? rang.height / 2 : -rang.height / 2;
            }
        }
        return [p.x + x, p.y + y, p.x - x, p.y - y];
    };
    //修正临时坐标
    var fixTmpLoc = function (fighter, target, fighterList, tmpLoc, coincideDistanse) {
        if (tmpLoc.life < 1) {
            return true;
        }
        //根据临时坐标获得两个随机坐标,评估随机坐标和临时坐标谁更符合要求
        var d = getPPDistance(fighter, target).d,
            r = d < fighter.curSkill.distance ? d : fighter.curSkill.distance,//当前距离小于技能距离，则随机坐标半径取当前fighter之间的距离
            r1 = getRandomLoc(fighter, target, r, coincideDistanse), r2 = getRandomLoc(fighter, target, r, coincideDistanse), r1d = 0, r2d = 0, distance = 0;
        //console.log("r1 : ",r1);
        //console.log("r2 : ",r2);
        for (var i = fighterList.length - 1; i >= 0; i--) {
            var f = fighterList[i];
            if (f.camp == fighter.camp && f.loc == fighter.loc || f.hp<=0) continue;
            //计算和所有静止的并距离足够近的对象的距离总和
            if (!f.moving) {
                if (nearCheck(f, tmpLoc, coincideDistanse)) {
                    r1d += Math.sqrt(getPPDistance(f, r1).d);
                    r2d += Math.sqrt(getPPDistance(f, r2).d);
                    distance += (Math.sqrt(getPPDistance(f, tmpLoc).d) || 1);
                }
            } else if (f.tmpLoc) {
                if (nearCheck(f.tmpLoc, tmpLoc, coincideDistanse)) {
                    r1d += Math.sqrt(getPPDistance(f.tmpLoc, r1).d);
                    r2d += Math.sqrt(getPPDistance(f.tmpLoc, r2).d);
                    distance += (Math.sqrt(getPPDistance(f.tmpLoc, tmpLoc).d) || 1);
                }
            }
        }
        //没有距离足够近的对象，则临时坐标符合要求
        if (distance === 0) return true;
        //取距离总和最大的
        var md = Math.max(r1d, r2d, distance), result;
        if (md == r1d) result = r1;
        else if (md == r2d) result = r2;
        else return true;
        tmpLoc.x = result.x;
        tmpLoc.y = result.y;
        tmpLoc.life--;
    };
    // 条件变量
    var condValue = function (f, cond) {
        var i, n;
        if (typeof cond === typeof "") {
            return f[cond];
        }
        for (i = 0, n = cond.length; i < n; i++) {
            f = f[cond];
            if (f === undefined)
                return undefined;
        }
        return f;
    };
    // 条件判断表
    var condMap = {
        '>': function (a, b) {
            return a > b;
        },
        '>=': function (a, b) {
            return a >= b;
        },
        '<': function (a, b) {
            return a < b;
        },
        '=<': function (a, b) {
            return a <= b;
        },
        '!=': function (a, b) {
            return a !== b
        }
    };
    // 条件判断
    var condsCheck = function (f, conds) {
        var i, c;
        for (i = conds.length - 1; i >= 0; i--) {
            c = conds[i];
            if (c.length == 2) {
                if (condValue(f, c[0]) !== c[1])
                    return false;
            } else if (!condMap[c[1]](condValue(f, c[0]), c[2])) {
                return false;
            }
        }
        return true;
    };
    // 倍增同余算法
    var randNumber = function (seed) {
        var MAX_POSITIVE_INT32 = 2147483647;
        var RAND_A = 16807;
        var RAND_Q = 127773;
        var RAND_MASK = 123459876;
        // 防止种子为0
        var r = seed ^ RAND_MASK;
        // C语言的写法，可防止溢出
        seed = RAND_A * r - ((r / RAND_Q) | 0) * MAX_POSITIVE_INT32;
        return seed < 0 ? seed + MAX_POSITIVE_INT32 : seed;
    };
    /**
     * @description 计算多边形旋转、平移后新的坐标点
     * @param {Array}polygon [[1,2],[2,9],...]多边形位置坐标点
     * @param {Json}f 人物 {x:?,y:?}
     * @param {Json}look 人物朝向 {x:?,y:?}
     * @param {Number}r 多边形中心点到fighter之间的距离
     * @return {Array} 新的polygon坐标点
     */
    var polygonTransform = function (polygon, f, look, r) {
        //计算新的坐标原点
        var //f={x:45,y:5},look={x:-98,y:99},
            //r,
            _pl=[],
            fl_d_x = look.x-f.x,
            fl_d_y = look.y-f.y,
            fl = getPPDistance(f,look).d,
            //新原点坐标
            // dx = (r/fl)*fl_d_x+f.x,
            // dy = (r/fl)*fl_d_y+f.y,
            dx = fl_d_x*(fl+r)/fl+f.x,
            dy = fl_d_y*(fl+r)/fl+f.y,
            //斜率
            k = fl_d_y/fl_d_x,
            //通过斜率得到自身与朝向两点直线与x轴之间的夹角
            //该夹角则为多边形旋转的角度
            a = Math.PI/2-Math.abs(Math.atan(k));
        //顺时针旋转为正
        a = -(k/Math.abs(k))*a;
        for(var i=0,leng = polygon.length;i<leng;i++){
            var __p = polygon[i],
                _r = [];
            //通过极坐标运算得到新的旋转坐标
            //以及多边形平移的坐标，最终得到多边形各顶点新的坐标
            _r[0] = __p[0]*Math.cos(a)-__p[1]*Math.sin(a)+dx;
            _r[1] = __p[1]*Math.cos(a)+__p[0]*Math.sin(a)+dy;
            _pl[i] = _r;
        }
        return _pl;
    };
    var getMinNumber = function(a,b){
        if(a && b){
            return Math.min(a,b);
        }
        return a || b;
    };
    /**
     * @description 计算以原点为中心的九宫格坐标
     * @param {number} dimension 坐标维度（以目标点为中心）
     */
    var initRoundPos = function(dimension){
        var c = dimension,
            r = [];
        var func = function(n){
            for(var j=0;j<n*2+1;j++){
                var a = n,
                    b = n-j,
                    c = -n+j;
                r.push([-a,c]);
                if(-a != c){
                    r.push([c,-a]);
                }
                if(a!==c && b !== -a)r.push([a,b]);
                if(a != b && b !== -a && a !== c){
                    r.push([b,a]);
                }
            }
        };
        while (c > 0){
            func(c--);
        }
        return r;
    };
    /**
     * @description 计算以p点为中心的九宫格坐标
     * @param {Fighter} p 中心点
     * @param {Json} l 朝向点
     */
    var pointRound = function(p){
        
    };
    var realPointRound = function(src,target){

    };
    /**
     * @description 判断某点pt是否在任意多边形points内部
     * @return {Boolean}
     */
    mgr.isOutPolygon = function(pt, points) {
		//判断是否在最大四边形外
		var maxY = points[0][1], maxX = points[0][0], minY = maxY, minX = maxX;
		for (var i = 0, len = points.length; i < len; i++) {
			if (points[i][0] > maxX)
				maxX = points[i][0];
			else if (points[i][0] < minX)
				minX = points[i][0];

			if (points[i][1] > maxY)
				maxY = points[i][1];
			else if (points[i][1] < minY)
				minY = points[i][1];
		}
		if (pt.x < minX || pt.x > maxX || pt.y < minY || pt.y > maxY) {
			return true;
		}

		var p1, p2, ct = 0;
		for (var i = 0, len = points.length; i < len; i++) {
			p1 = points[i];
			if (i == len - 1) {
				p2 = points[0];
			} else {
				p2 = points[i + 1];
			}
			//如果pt.y小于p1.y,p2.y,这pt在直线下方，水平向右射线不想交
			if (pt.y < Math.min(p1[1], p2[1]) || pt.y > Math.max(p1[1], p2[1])) {
				continue;
			}

			//pt在直线上
			if ((pt.x - p1[0]) * (p2[1] - p1[1]) == (pt.y - p1[1]) * (p2[0] - p1[0])) {
				return false;
			}

			//直线水平,与水平向右射线重合
			if (pt.y == p1[1] && pt.y == p2[1] && pt.x < Math.min(p1[0], p2[0])) {
				var pf = (i == 0) ? p[len - 1] : p[i - 1];//pi-1
				var pn = ((len - i - 1) < 2) ? p[1 - (len - i - 1)] : p[i + 2];//pi+2
				if ((pf[1] > pt.y) == (pn[1] > pt.y)) {
					continue;
				} else {
					ct++;
					continue;
				}
			}

			//水平向右射线与顶点相交
			if (pt.y == p1[1] || pt.y == p2[1]) {
				var pf = (i == 0) ? p[len - 1] : p[i - 1];//pi-1
				var pn = ((len - 1 - i) < 1) ? p[0] : p[i + 1];//pi+1
				if ((pf[1] > pt.y) == (pn[1] > pt.y)) {
					continue;
				} else {
					ct++;
					continue;
				}
			}

			//非特殊情况
			var x = (pt.y - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
			if (x > pt.x)
				ct++; //如果交点在右边，统计加一。
		}

		if (ct % 2 == 1) {
			return false; //如果是奇数，说明在多边形里
		}
		else {
			return true; //否则在多边形外 或 边上
		}
	};
    // 选择战斗者
    mgr.select = function (arr, conds, result) {
        var i, result = result || [];
        for (i = arr.length - 1; i >= 0; i--) {
            if (condsCheck(arr[i], conds))
                result.push(arr[i]);
        }
        return result;
    };
    // 选择战斗者, 如果sortKey为undefined, ascending为随机种子, oldTarget上一次选定的目标
    mgr.limit = function (arr, n, sortKey, ascending,oldTarget) {
        var i;
        if (arr.length <= n)
            return arr;
        if (!sortKey) {
            for (i = arr.length - 1; i >= 0; i--) {
                arr[i].rand = ascending;
                ascending = randNumber(ascending);
            }
            sortKey = 'rand';
        }
        arr.sort(ascending ? function (a, b) {
          //  return a[sortKey] < b[sortKey];
          return b[sortKey] - a[sortKey];
        } : function (a, b) {
          //  return a[sortKey] > b[sortKey];
          return a[sortKey] - b[sortKey];
        });
        //把自己换到第一个位置
        if(oldTarget){
            for(var i=0,len=arr.length;i<len;i++){
                if(arr[i].mapId == oldTarget){
                    if(i!==0){
                        var o = arr[0];
                        arr[0] = arr[i];
                        arr[i] = o;
                    }
                    break;
                }
            }
        }
        arr.length = n;
        return ascending;
    };
    // 选择周围的人，如果排序则按距离近远  without 选不选自己
    mgr.round = function (arr, f, distance, sort, without) {
        var dd = distance * distance * 10000, n = arr.length - 1, i, e, dist;
        for (i = n; i >= 0; i--) {
            e = arr[i];
            if (e === f) {
                if (without)
                    arr[i] = arr[n--];
                else
                    f.rand = 0;
                continue;
            }
            dist = ((f.x - e.x) * (f.x - e.x) * 10000 + (f.y - e.y) * (f.y - e.y) * 10000) | 0;

            if (dist > dd) {
                arr[i] = arr[n--];
                continue;
            }
            e.rand = dist / 10000;
        }
        arr.length = n + 1;
        if (sort){
            arr.sort(function (a, b) {
                return a['rand'] - b['rand'];
            });
        }
    
    };
    // 复制
    mgr.copy = function (src) {
        if ((src !== null && typeof src === "object") || Object.prototype.toString.apply(src) === "[object Array]") {
            return JSON.parse(JSON.stringify(src));
        }
        return src;
    };
    // 获得敌人的阵营
    mgr.enemy = function (camp) {
        return camp === 1 ? 2 : 1;
    };
    // 从后往前遍历数组， 返回true表示移除该元素， 返回false表示停止遍历
    mgr.traversal = function (arr, func) {
        // TODO 用链表实现，可以更简单的处理删除、添加的问题
        if (!arr) return;
        var n = arr.length, delIndex = -1, i, el, r;
        for (i = n - 1; i >= 0; i--) {
            el = arr[i];
            if (el) {
                try {
                    r = func(el);
                } catch (ex) {
                    if (console) {
                        console.log("traversal, ex: ", ex, ", el:", el);
                    }
                }
                if (r === false)
                    break;
                if (r === true) {
                    arr[i] = undefined;
                    delIndex = i;
                }
            } else {
                delIndex = i;
            }
        }
        if (delIndex >= 0) {
            for (i = delIndex + 1; i < n; ++i) {
                el = arr[i];
                if (el)
                    arr[delIndex++] = el;
            }
            arr.length = delIndex;
        }
    }
    // 使用盾，返回剩下的伤害
    mgr.useShield = function (shield, damage) {
        var i, e;
        //需要找到scene
        // var scene = app.mod.fight.sceneTab.fight;
        if (shield.length === 0)
            return damage;
        for (i in shield) {
            if (i !== 'length' && shield.hasOwnProperty(i)) {
                e = shield[i];
                if (e > 0) {
                    if (damage < e) {
                        shield[i] -= damage;
                        return 0;
                    }
                    damage -= e;
                }
                delete shield[i];
                shield.length--;
            }
        }
        return damage;
    };
    // 移除用对象方式模拟的数组中的指定位置的元素
    mgr.removeOArray = function (oarr, i) {
        delete oarr[i];
        oarr.length--;
    };
    // 乱序
    mgr.shuffle = function (arr, rand) {
        var len = arr.length, i, idx, temp;
        for (i = len - 1; i > 0; i--) {
            idx = rand.randomInt(0, i); // 闭区间
            temp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = temp;
        }
        return arr;
    };
    // 查找指定键值对应元素的位置
    mgr.indexByAttr = function (arr, key, value) {
        var i;
        for (i = arr.length - 1; i >= 0 && arr[i][key] !== value; i--);
        return i;
    };
    // 分析字符串是否为数字
    mgr.parseNumber = function (s) {
        return /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/.test(s) ? parseFloat(s) : false;
    };

    // 获得效果的值，可能是直接的数字，也可能是公式计算的值
    mgr.getEffectValue = function (s, fighter, buff) {
        var r = mgr.parseNumber(s);
        if (r !== false)
            return r;
        return fight_formula_1.Fight_formula.effectCalc(s, fighter, fighter, buff);
    };

    // 获得buff效果的值，buff的计算会使用到技能释放者以及技能释放目标对象
    mgr.getBuffEffectValue = function (s, F, T, buff, scene) {
        var r = mgr.parseNumber(s), F = scene.mapList[F], T = scene.mapList[T];
        if (r !== false)
            return r;
        return fight_formula_1.Fight_formula.effectCalc(s, F, T, buff);
    };

    //根据队伍索引取得队伍成员
    mgr.selectGroup = function (scene, f, targetType) {
        var curTarget = scene.mapList[f.curTarget],
            enemyList = [];
        //打敌人
        if (targetType > 10) {
            //如果是针对敌方，没有目标 返回空数组
            if (!curTarget) return [];
            //如果是针对仇恨最高的敌方， 返回目标
            if (targetType == 11) {
                if ((f.groupId != curTarget.groupId) && curTarget.groupId >= 0) {
                    return [curTarget];
                } else {
                    return [];
                }
            };
            //如果是有条件筛选的技能，返回所有敌人列表
            enemyList = mgr.groupFighters(f, scene);
            //返回成fighters
            return mgr.mapFighter(enemyList, scene);
        }
        //己方
        return mgr.mapFighter(scene.group[f.groupId], scene);
    }

    //根据mapID取得fighter
    mgr.mapFighter = function (mapIds, scene) {
        var arr = [];
        for (var i = 0; i < mapIds.length; i++) {
            if (scene.mapList[mapIds[i]] && scene.mapList[mapIds[i]].hp > 0) {
                arr.push(scene.mapList[mapIds[i]]);
            }
        }
        return arr
    }

    //取得fighters的mapId
    mgr.getMapId = function (fighters, scene) {
        var arr = [];
        for (var i = 0; i < fighters.length; i++) {
            if (scene.mapList[fighters[i].mapId]) {
                arr.push(fighters[i].mapId);
            }
        }
        return arr
    }

    // 随机圆内坐标
    mgr.randomCirclePos = function (r, a, b) {
        while (true) {
            var x = Math.random() * 2 * r + (a - r),
                y = Math.random() * 2 * r + (b - r);
            if ((x - a) * (x - a) + (y - b) * (y - b) <= r * r) {
                return [x, y]
            }
        }
    }

    mgr.getFighterSkill = function(f,sid){
        var r = f.skill[f.skill_index[sid]];
        if(r)
            return r;
        else{
            f.skill_index = {};
            for(var i=0,len = f.skill.length;i<len;i++){
                f.skill_index[f.skill[i].id] = i;
                if(f.skill[i].id == sid)
                    r = f.skill[i];
            }
        }
        return r;
    }

    mgr.groupFighters = function (f, scene) {
        var i = f.groupId;
        var arr = [];
        for (var e in scene.group) {
            if (e >= 0 && e != i) {
                arr = arr.concat(scene.group[e]);
            }
        }
        //mapId
        return arr;
    }
    //return mgr;
    
});
